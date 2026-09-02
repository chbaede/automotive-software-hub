/**
 * Next-Technology Exploration Recommendation Engine for Knowledge Graph Intelligence
 *
 * Generates explainable, deterministic technology recommendations for what
 * a user investigating a specific technology should explore next.
 */

import { StackTechnology } from '../../../types/stack';
import {
  TechnologyRelationship,
  RELATIONSHIP_METADATA,
} from '../../../types/relationship';
import { LocalizedText } from '../../../types/i18n';
import {
  technologyById,
  graphAdjacencyByTechnologyId,
  profilesByTechnologyId,
  pathsByTechnologyId,
  getTechnologyDegree,
} from '../index';
import {
  calculateRelationshipScore,
  calculateRecommendationScore,
} from '../scoring';
import { TechnologyRecommendation, DiscoveryOptions } from './types';

/**
 * Generates explainable, deterministic technology recommendations
 * for what a user looking at technologyId should explore next.
 */
export function getNextTechnologiesToExplore(
  technologyId: string,
  options?: DiscoveryOptions
): TechnologyRecommendation[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const maxResults = options?.maxRecommendations ?? 6;
  const excludeIds = new Set<string>([technologyId, ...(options?.excludeTechIds || [])]);

  const candidateScores = new Map<
    string,
    {
      technology: StackTechnology;
      score: number;
      primaryRelationship?: TechnologyRelationship;
      reasons: LocalizedText[];
    }
  >();

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];

  // 1. Direct Graph Relationships (Excluding Alternatives)
  edges.forEach((edge) => {
    // Alternatives are architectural choices, NOT additive next-exploration recommendations
    if (edge.relationship.type === 'alternative') return;
    if (excludeIds.has(edge.neighborId)) return;

    const neighbor = technologyById.get(edge.neighborId);
    if (!neighbor) return;

    const baseRelScore = calculateRelationshipScore(
      edge.relationship.type,
      edge.relationship.confidence || 'community'
    );

    const relLabelMeta = RELATIONSHIP_METADATA[edge.relationship.type];
    const relLabelEn = relLabelMeta?.label.en || edge.relationship.type;
    const relLabelKo = relLabelMeta?.label.ko || edge.relationship.type;

    const reasons: LocalizedText[] = [
      {
        en: `Direct connection: ${relLabelEn} with ${currentTech.name}`,
        ko: `직접 연계: ${currentTech.name}와(과) ${relLabelKo}`,
      },
    ];

    const isDifferentLayer = neighbor.layerId !== currentTech.layerId;
    const initialScore = baseRelScore + (isDifferentLayer ? 15 : 0);

    candidateScores.set(neighbor.id, {
      technology: neighbor,
      score: initialScore,
      primaryRelationship: edge.relationship,
      reasons,
    });
  });

  // 2. Co-occurrence in Architecture Profiles
  const directProfiles = profilesByTechnologyId.get(technologyId) || [];
  directProfiles.forEach((prof) => {
    prof.technologyIds.forEach((tid) => {
      if (excludeIds.has(tid)) return;
      const tech = technologyById.get(tid);
      if (!tech) return;

      const existing = candidateScores.get(tid);
      if (existing) {
        existing.score += 15;
        existing.reasons.push({
          en: `Co-occurs in ${prof.name.en} architecture profile`,
          ko: `${prof.name.ko || prof.name.en} 아키텍처 프로필에 공동 포함`,
        });
      } else {
        candidateScores.set(tid, {
          technology: tech,
          score: 30,
          reasons: [
            {
              en: `Co-occurs in ${prof.name.en} architecture profile`,
              ko: `${prof.name.ko || prof.name.en} 아키텍처 프로필에 공동 포함`,
            },
          ],
        });
      }
    });
  });

  // 3. Co-occurrence in Stack Paths
  const directPaths = pathsByTechnologyId.get(technologyId) || [];
  directPaths.forEach((path) => {
    path.hops.forEach((hop) => {
      if (excludeIds.has(hop.technologyId)) return;
      const tech = technologyById.get(hop.technologyId);
      if (!tech) return;

      const existing = candidateScores.get(hop.technologyId);
      if (existing) {
        existing.score += 12;
        existing.reasons.push({
          en: `Part of ${path.name.en} execution path`,
          ko: `${path.name.ko || path.name.en} 실행 탐색 경로에 포함`,
        });
      }
    });
  });

  // 4. Hub Centrality Bonus
  candidateScores.forEach((item) => {
    const degree = getTechnologyDegree(item.technology.id);
    if (degree.connectionCount >= 5) {
      item.score += 8;
    }
  });

  return Array.from(candidateScores.values())
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.technology.name.localeCompare(b.technology.name) ||
        a.technology.id.localeCompare(b.technology.id)
    )
    .slice(0, maxResults)
    .map((item) => ({
      technology: item.technology,
      layerId: item.technology.layerId,
      score: item.score,
      primaryRelationship: item.primaryRelationship,
      reasons: item.reasons,
    }));
}

