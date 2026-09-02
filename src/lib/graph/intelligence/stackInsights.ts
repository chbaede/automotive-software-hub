/**
 * Partial-Stack Gap Analysis & Intelligence for Knowledge Graph
 *
 * Evaluates partial or full Stack Builder selections against canonical graph rules,
 * identifying missing core layers (with optional Hypervisor for bare-metal architectures),
 * targeted recommendations, alternatives, and bridge opportunities with multi-select support.
 */

import { StackLayerId, StackTechnology } from '../../../types/stack';
import {
  TechnologyRelationship,
  RELATIONSHIP_METADATA,
} from '../../../types/relationship';
import { LocalizedText } from '../../../types/i18n';
import {
  technologyById,
  graphAdjacencyByTechnologyId,
} from '../index';
import {
  CORE_STACK_LAYER_IDS,
  MANDATORY_CORE_STACK_LAYER_IDS,
  StackSelection,
  FlexibleStackSelection,
  normalizeStackSelection,
  getSelectedTechIds,
  getLayerTechIds,
  validateStack,
  matchArchitectures,
  matchStackPaths,
} from '../matching';
import { calculateRelationshipScore } from '../scoring';
import {
  StackGapAnalysis,
  StackAlternativeOption,
  StackIntelligenceReport,
  TechnologyRecommendation,
  BridgeTechnologyCandidate,
} from './types';
import { getAlternatives } from './relationships';
import { getBridgeTechnologies } from './bridges';

/**
 * Performs comprehensive intelligence analysis for a partially or fully selected stack.
 * Supports multi-technology selection and optional Hypervisor (Bare-Metal) architectures.
 */
export function getStackInsights(rawSelection: FlexibleStackSelection): StackIntelligenceReport {
  const selection = normalizeStackSelection(rawSelection);
  const selectedTechIds = getSelectedTechIds(selection);

  // 1. Gap Analysis across Mandatory Core Stack Layers (Hypervisor is optional for Bare Metal)
  const populatedCoreLayers: StackLayerId[] = [];
  const missingCoreLayers: StackLayerId[] = [];

  CORE_STACK_LAYER_IDS.forEach((layerId) => {
    const techIds = getLayerTechIds(selection, layerId);
    if (techIds.length > 0) {
      populatedCoreLayers.push(layerId);
    }
  });

  MANDATORY_CORE_STACK_LAYER_IDS.forEach((layerId) => {
    const techIds = getLayerTechIds(selection, layerId);
    if (techIds.length === 0) {
      missingCoreLayers.push(layerId);
    }
  });

  const isCompleteCoreStack = missingCoreLayers.length === 0;

  const gapAnalysis: StackGapAnalysis = {
    missingCoreLayers,
    populatedCoreLayers,
    isCompleteCoreStack,
  };

  // 2. Re-use canonical Stack Builder Validation & Matching Engines
  const validationSummary = validateStack(selection);
  const architectureMatches = matchArchitectures(selection);
  const stackPathMatches = matchStackPaths(selection);

  // 3. Next Candidate Recommendations Targeted for Missing or Complementary Layers
  const candidateScores = new Map<
    string,
    {
      technology: StackTechnology;
      score: number;
      primaryRelationship?: TechnologyRelationship;
      reasons: LocalizedText[];
    }
  >();

  const selectedSet = new Set(selectedTechIds);

  selectedTechIds.forEach((techId) => {
    const tech = technologyById.get(techId);
    if (!tech) return;

    const edges = graphAdjacencyByTechnologyId.get(techId) || [];
    edges.forEach((edge) => {
      // Exclude alternatives from additive recommendations
      if (edge.relationship.type === 'alternative') return;
      if (selectedSet.has(edge.neighborId)) return;

      const neighbor = technologyById.get(edge.neighborId);
      if (!neighbor) return;

      // In partial-stack insights, recommendations target unpopulated layers
      if (populatedCoreLayers.includes(neighbor.layerId as any)) return;

      const baseScore = calculateRelationshipScore(
        edge.relationship.type,
        edge.relationship.confidence || 'community'
      );

      const relMeta = RELATIONSHIP_METADATA[edge.relationship.type];
      const relLabelEn = relMeta?.label.en || edge.relationship.type;
      const relLabelKo = relMeta?.label.ko || edge.relationship.type;

      const isMissingCore = missingCoreLayers.includes(neighbor.layerId as any);

      const existing = candidateScores.get(neighbor.id);
      if (existing) {
        existing.score += baseScore;
        existing.reasons.push({
          en: `Connects via ${relLabelEn} with selected ${tech.name}`,
          ko: `선택된 ${tech.name}와(과) ${relLabelKo} 관계로 연계`,
        });
      } else {
        candidateScores.set(neighbor.id, {
          technology: neighbor,
          score: baseScore + (isMissingCore ? 20 : 0),
          primaryRelationship: edge.relationship,
          reasons: [
            {
              en: `Connects via ${relLabelEn} with selected ${tech.name}`,
              ko: `선택된 ${tech.name}와(과) ${relLabelKo} 관계로 연계`,
            },
          ],
        });
      }
    });
  });

  // Architecture profile completion bonus
  architectureMatches.slice(0, 3).forEach((match) => {
    match.missingTechnologies.forEach((missingTech) => {
      if (selectedSet.has(missingTech.id)) return;
      const existing = candidateScores.get(missingTech.id);
      if (existing) {
        existing.score += 25;
        existing.reasons.push({
          en: `Completes ${match.profile.name.en} reference architecture`,
          ko: `${match.profile.name.ko || match.profile.name.en} 참조 아키텍처 완성 구성요소`,
        });
      } else {
        candidateScores.set(missingTech.id, {
          technology: missingTech,
          score: 35,
          reasons: [
            {
              en: `Completes ${match.profile.name.en} reference architecture`,
              ko: `${match.profile.name.ko || match.profile.name.en} 참조 아키텍처 완성 구성요소`,
            },
          ],
        });
      }
    });
  });

  const candidateRecommendations: TechnologyRecommendation[] = Array.from(candidateScores.values())
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.technology.name.localeCompare(b.technology.name) ||
        a.technology.id.localeCompare(b.technology.id)
    )
    .slice(0, 6)
    .map((item) => ({
      technology: item.technology,
      layerId: item.technology.layerId,
      score: item.score,
      primaryRelationship: item.primaryRelationship,
      reasons: item.reasons,
    }));

  // 4. Alternatives for Populated Layers (Isolated from Additive Recommendations)
  const alternativeOptions: StackAlternativeOption[] = [];
  Object.entries(selection).forEach(([layerId, techIds]) => {
    (techIds || []).forEach((techId) => {
      const currentTech = technologyById.get(techId);
      if (!currentTech) return;

      const altInsights = getAlternatives(techId);
      if (altInsights.length > 0) {
        alternativeOptions.push({
          layerId: layerId as StackLayerId,
          currentTechnology: currentTech,
          alternatives: altInsights.map((alt) => alt.technology),
        });
      }
    });
  });

  // 5. Bridge Opportunities
  const bridgeMap = new Map<string, BridgeTechnologyCandidate>();
  selectedTechIds.forEach((techId) => {
    const bridges = getBridgeTechnologies(techId, { minBridgedLayers: 2, maxResults: 3 });
    bridges.forEach((b) => {
      if (!selectedSet.has(b.technology.id) && !bridgeMap.has(b.technology.id)) {
        bridgeMap.set(b.technology.id, b);
      }
    });
  });

  return {
    selection,
    gapAnalysis,
    validationSummary,
    architectureMatches,
    stackPathMatches,
    candidateRecommendations,
    alternativeOptions,
    bridgeOpportunities: Array.from(bridgeMap.values()).slice(0, 4),
  };
}
