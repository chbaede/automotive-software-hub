/**
 * Knowledge Graph Intelligence & Discovery Engine for Automotive Software Hub
 *
 * Provides pure, deterministic, strongly-typed analytical functions
 * built on top of the canonical automotive software knowledge graph.
 *
 * Core Capabilities:
 * 1. Directed relationship semantics (dependencies, platforms, integrations, implementations, alternatives)
 * 2. Cross-layer bridge technology detection
 * 3. Architecture profile relevance and ranking
 * 4. Stack Path journey relevance and ranking
 * 5. Explainable next-technology exploration recommendations
 * 6. Partial-stack intelligence and gap analysis
 */

import { StackLayerId, StackTechnology } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import {
  TechnologyRelationship,
  RelationshipType,
  RelationshipConfidence,
  RELATIONSHIP_METADATA,
} from '../../types/relationship';
import { LocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackPaths } from '../../data/stackPaths';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  graphAdjacencyByTechnologyId,
  profilesByTechnologyId,
  pathsByTechnologyId,
  technologiesByLayerId,
  getTechnologyDegree,
} from './index';
import {
  CORE_STACK_LAYER_IDS,
  StackSelection,
  validateStack,
  matchArchitectures,
  matchStackPaths,
  StackValidationSummary,
  ArchitectureMatchResult,
  StackPathMatchResult,
} from '../builder/stackBuilderEngine';

// ==========================================
// SCORING CONSTANTS & PRIORITY TAXONOMY
// ==========================================

export const RELATIONSHIP_PRIORITY: Record<RelationshipType, number> = {
  'runs-on': 10,
  'depends-on': 9,
  'integrates-with': 8,
  'compatible-with': 7,
  'used-with': 6,
  'implemented-by': 5,
  'coexists-with': 4,
  'related': 2,
  'alternative': 1,
};

export const CONFIDENCE_WEIGHT: Record<RelationshipConfidence, number> = {
  official: 1.0,
  vendor: 0.85,
  community: 0.7,
};

// ==========================================
// TYPED INTELLIGENCE DATA STRUCTURES
// ==========================================

export interface TechnologyInsightItem {
  technology: StackTechnology;
  relationship: TechnologyRelationship;
  isOutgoing: boolean;
  confidence: RelationshipConfidence;
  score: number;
  reason: LocalizedText;
}

export interface BridgeTechnologyCandidate {
  technology: StackTechnology;
  layerId: string;
  relationship: TechnologyRelationship;
  isOutgoing: boolean;
  bridgedLayers: string[];
  bridgedLayersCount: number;
  score: number;
  reason: LocalizedText;
}

export interface ArchitectureInsightItem {
  profile: ArchitectureProfile;
  isExplicitMember: boolean;
  matchedTechnologies: StackTechnology[];
  overlapPercentage: number;
  profileCoveragePercentage: number;
  relevanceScore: number;
  reason: LocalizedText;
}

export interface StackPathInsightItem {
  path: StackPath;
  isDirectHop: boolean;
  hopIndex: number;
  totalHops: number;
  matchStrength: 'strong' | 'related' | 'weak';
  relevanceScore: number;
  reason: LocalizedText;
}

export interface TechnologyRecommendation {
  technology: StackTechnology;
  layerId: string;
  score: number;
  primaryRelationship?: TechnologyRelationship;
  reasons: LocalizedText[];
}

export interface TechnologyDiscoveryResult {
  technology: StackTechnology;
  // Directed graph categorizations
  dependencies: TechnologyInsightItem[];        // outgoing depends-on (what this requires)
  dependents: TechnologyInsightItem[];          // incoming depends-on (what requires this)
  platforms: TechnologyInsightItem[];           // outgoing runs-on (underlying execution platforms)
  hostedTechnologies: TechnologyInsightItem[];   // incoming runs-on (software hosted on this platform)
  integrations: TechnologyInsightItem[];         // integrates-with (direct API/middleware interfaces)
  implementations: TechnologyInsightItem[];      // implemented-by (standards & reference implementations)
  alternatives: TechnologyInsightItem[];         // alternative (competing architectural choices)
  compatibleWith: TechnologyInsightItem[];       // compatible-with
  coexistsWith: TechnologyInsightItem[];         // coexists-with
  usedWith: TechnologyInsightItem[];             // used-with
  related: TechnologyInsightItem[];              // related
  // Higher-order discovery insights
  bridgeTechnologies: BridgeTechnologyCandidate[]; // technologies bridging different layers
  architectures: ArchitectureInsightItem[];      // ranked reference architectures
  stackPaths: StackPathInsightItem[];            // ranked execution paths
  recommendations: TechnologyRecommendation[];   // explainable next exploration candidates
  // Graph metrics
  hubScore: number;
  crossLayerScore: number;
}

export interface StackGapAnalysis {
  missingCoreLayers: StackLayerId[];
  populatedCoreLayers: StackLayerId[];
  isCompleteCoreStack: boolean;
}

export interface StackAlternativeOption {
  layerId: StackLayerId;
  currentTechnology: StackTechnology;
  alternatives: StackTechnology[];
}

export interface StackIntelligenceReport {
  selection: StackSelection;
  gapAnalysis: StackGapAnalysis;
  validationSummary: StackValidationSummary;
  architectureMatches: ArchitectureMatchResult[];
  stackPathMatches: StackPathMatchResult[];
  candidateRecommendations: TechnologyRecommendation[];
  alternativeOptions: StackAlternativeOption[];
  bridgeOpportunities: BridgeTechnologyCandidate[];
}

export interface DiscoveryOptions {
  maxRecommendations?: number;
  maxBridges?: number;
  maxArchitectures?: number;
  maxPaths?: number;
  excludeTechIds?: string[];
}

// ==========================================
// DIRECTED RELATIONSHIP SELECTORS
// ==========================================

function formatInsightItem(
  rel: TechnologyRelationship,
  isOutgoing: boolean,
  otherTech: StackTechnology,
  reason: LocalizedText
): TechnologyInsightItem {
  const priority = RELATIONSHIP_PRIORITY[rel.type] || 1;
  const confWeight = CONFIDENCE_WEIGHT[rel.confidence || 'community'] || 0.7;
  const score = Math.round(priority * 10 * confWeight);

  return {
    technology: otherTech,
    relationship: rel,
    isOutgoing,
    confidence: rel.confidence || 'community',
    score,
    reason,
  };
}

/**
 * Returns technologies that this technology fundamentally depends on (outgoing 'depends-on').
 */
export function getDependencies(technologyId: string): TechnologyInsightItem[] {
  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  outgoing.forEach((rel) => {
    if (rel.type === 'depends-on') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Required dependency for ${technologyById.get(technologyId)?.name || 'this technology'}`,
            ko: `${technologyById.get(technologyId)?.name || '이 기술'} 동작을 위한 필수 의존성`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns technologies that depend on this technology (incoming 'depends-on').
 */
export function getDependents(technologyId: string): TechnologyInsightItem[] {
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  incoming.forEach((rel) => {
    if (rel.type === 'depends-on') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `${source.name} fundamentally depends on this technology`,
            ko: `${source.name}이(가) 이 기술에 의존합니다`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns hardware, hypervisor, or OS platforms that this technology executes on (outgoing 'runs-on').
 */
export function getPlatforms(technologyId: string): TechnologyInsightItem[] {
  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  outgoing.forEach((rel) => {
    if (rel.type === 'runs-on') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Underlying execution platform or runtime environment`,
            ko: `구동 환경 및 기반 실행 플랫폼`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns software technologies that execute on top of this platform/OS (incoming 'runs-on').
 */
export function getHostedTechnologies(technologyId: string): TechnologyInsightItem[] {
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  incoming.forEach((rel) => {
    if (rel.type === 'runs-on') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `${source.name} executes on top of this platform`,
            ko: `${source.name}이(가) 이 플랫폼 상에서 구동됩니다`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns direct API/middleware integrations (outgoing and incoming 'integrates-with').
 */
export function getIntegrations(technologyId: string): TechnologyInsightItem[] {
  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  outgoing.forEach((rel) => {
    if (rel.type === 'integrates-with' && !seenIds.has(rel.targetId)) {
      seenIds.add(rel.targetId);
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Directly integrates with ${target.name}`,
            ko: `${target.name}와(과) 직접 인터페이스 연동`,
          })
        );
      }
    }
  });

  incoming.forEach((rel) => {
    if (rel.type === 'integrates-with' && !seenIds.has(rel.sourceId)) {
      seenIds.add(rel.sourceId);
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `Directly integrates with ${source.name}`,
            ko: `${source.name}와(과) 직접 인터페이스 연동`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns specification implementations or realized standards ('implemented-by').
 */
export function getImplementations(technologyId: string): TechnologyInsightItem[] {
  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  // If this tech is a standard/spec implemented by target
  outgoing.forEach((rel) => {
    if (rel.type === 'implemented-by') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Implemented by software implementation ${target.name}`,
            ko: `${target.name} 구현체에 의해 실체화됨`,
          })
        );
      }
    }
  });

  // If this tech is an implementation realizing source specification
  incoming.forEach((rel) => {
    if (rel.type === 'implemented-by') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `Realizes specification / standard of ${source.name}`,
            ko: `${source.name} 표준 규격의 구현체`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns direct architectural alternatives ('alternative').
 */
export function getAlternatives(technologyId: string): TechnologyInsightItem[] {
  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'alternative' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `Architectural alternative for ${neighbor.name}`,
            ko: `${neighbor.name}의 아키텍처 대안 솔루션`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns compatible technologies ('compatible-with').
 */
export function getCompatibleTechnologies(technologyId: string): TechnologyInsightItem[] {
  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'compatible-with' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `Verified technical compatibility with ${neighbor.name}`,
            ko: `${neighbor.name}와(과) 기술적 호환성 검증`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns coexisting technologies in multi-ECU/domain vehicle architectures ('coexists-with').
 */
export function getCoexistingTechnologies(technologyId: string): TechnologyInsightItem[] {
  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'coexists-with' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `Coexists in complementary vehicle ECU domains`,
            ko: `차량 내 이종 제어기 도메인에서 상호 보완적 공존`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

/**
 * Returns technologies commonly used with this technology ('used-with').
 */
export function getUsedWithTechnologies(technologyId: string): TechnologyInsightItem[] {
  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  outgoing.forEach((rel) => {
    if (rel.type === 'used-with' && !seenIds.has(rel.targetId)) {
      seenIds.add(rel.targetId);
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Commonly combined with ${target.name}`,
            ko: `${target.name}와(과) 통상 결합 활용`,
          })
        );
      }
    }
  });

  incoming.forEach((rel) => {
    if (rel.type === 'used-with' && !seenIds.has(rel.sourceId)) {
      seenIds.add(rel.sourceId);
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `Commonly combined with ${source.name}`,
            ko: `${source.name}와(과) 통상 결합 활용`,
          })
        );
      }
    }
  });

  return results.sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name));
}

// ==========================================
// CROSS-LAYER BRIDGE DETECTION
// ==========================================

/**
 * Identifies technologies connected to the given technology that act as multi-layer bridges,
 * connecting this technology to different layers in the automotive stack.
 */
export function getBridgeTechnologies(
  technologyId: string,
  options?: { minBridgedLayers?: number; maxResults?: number }
): BridgeTechnologyCandidate[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const minBridgedLayers = options?.minBridgedLayers ?? 2;
  const maxResults = options?.maxResults ?? 6;

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const candidates: BridgeTechnologyCandidate[] = [];

  edges.forEach((edge) => {
    // Exclude alternatives from bridge discovery
    if (edge.relationship.type === 'alternative') return;

    const neighbor = technologyById.get(edge.neighborId);
    if (!neighbor) return;

    // Discover what OTHER layers this neighbor connects to
    const neighborEdges = graphAdjacencyByTechnologyId.get(neighbor.id) || [];
    const connectedLayersSet = new Set<string>();

    neighborEdges.forEach((nEdge) => {
      const nNeighbor = technologyById.get(nEdge.neighborId);
      if (nNeighbor && nNeighbor.layerId !== currentTech.layerId) {
        connectedLayersSet.add(nNeighbor.layerId);
      }
    });

    const bridgedLayers = Array.from(connectedLayersSet);

    if (bridgedLayers.length >= minBridgedLayers) {
      const relPriority = RELATIONSHIP_PRIORITY[edge.relationship.type] || 1;
      const confWeight = CONFIDENCE_WEIGHT[edge.relationship.confidence || 'community'] || 0.7;

      // Score based on diversity of bridged layers, connection count, and direct relationship weight
      const score = Math.round(
        bridgedLayers.length * 20 +
          neighborEdges.length * 3 +
          relPriority * 5 * confWeight
      );

      candidates.push({
        technology: neighbor,
        layerId: neighbor.layerId,
        relationship: edge.relationship,
        isOutgoing: edge.isForward,
        bridgedLayers,
        bridgedLayersCount: bridgedLayers.length,
        score,
        reason: {
          en: `Connects ${currentTech.name} to ${bridgedLayers.length} other stack layers (${bridgedLayers.join(', ')})`,
          ko: `${currentTech.name}을(를) ${bridgedLayers.length}개의 다른 스택 계층(${bridgedLayers.join(', ')})과 연결하는 브리지 기술`,
        },
      });
    }
  });

  return candidates
    .sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name))
    .slice(0, maxResults);
}

// ==========================================
// ARCHITECTURE RELEVANCE
// ==========================================

/**
 * Returns and ranks Architecture Profiles relevant to the given technology.
 */
export function getRelatedArchitectures(
  technologyId: string,
  options?: { maxResults?: number }
): ArchitectureInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const maxResults = options?.maxResults ?? 6;
  const directProfiles = profilesByTechnologyId.get(technologyId) || [];
  const results: ArchitectureInsightItem[] = [];
  const seenProfileIds = new Set<string>();

  // 1. Direct Explicit Member Profiles
  directProfiles.forEach((profile) => {
    seenProfileIds.add(profile.id);
    const matchedTechs = profile.technologyIds
      .map((id) => technologyById.get(id))
      .filter((t): t is StackTechnology => Boolean(t));

    const overlapPercentage = 100;
    const profileCoveragePercentage = Math.round(
      (1 / Math.max(profile.technologyIds.length, 1)) * 100
    );

    // Score based on explicit membership and profile richness
    const relevanceScore = Math.round(80 + profile.technologyIds.length * 3);

    results.push({
      profile,
      isExplicitMember: true,
      matchedTechnologies: matchedTechs,
      overlapPercentage,
      profileCoveragePercentage,
      relevanceScore,
      reason: {
        en: `Core architectural component in ${profile.name.en}`,
        ko: `${profile.name.ko || profile.name.en} 아키텍처의 핵심 구성 기술`,
      },
    });
  });

  // 2. Neighboring Profiles (where 1-hop connected technologies are members)
  const neighborTechs = (graphAdjacencyByTechnologyId.get(technologyId) || [])
    .map((e) => technologyById.get(e.neighborId))
    .filter((t): t is StackTechnology => Boolean(t));

  neighborTechs.forEach((neighbor) => {
    const nProfiles = profilesByTechnologyId.get(neighbor.id) || [];
    nProfiles.forEach((profile) => {
      if (!seenProfileIds.has(profile.id)) {
        seenProfileIds.add(profile.id);
        const matchedTechs = profile.technologyIds
          .map((id) => technologyById.get(id))
          .filter((t): t is StackTechnology => Boolean(t));

        const relevanceScore = Math.round(40 + matchedTechs.length * 2);

        results.push({
          profile,
          isExplicitMember: false,
          matchedTechnologies: matchedTechs,
          overlapPercentage: 50,
          profileCoveragePercentage: Math.round(
            (1 / Math.max(profile.technologyIds.length, 1)) * 100
          ),
          relevanceScore,
          reason: {
            en: `Connected via ${neighbor.name} which is part of ${profile.name.en}`,
            ko: `${profile.name.ko || profile.name.en}에 포함된 ${neighbor.name}와(과) 연계`,
          },
        });
      }
    });
  });

  return results
    .sort(
      (a, b) =>
        b.relevanceScore - a.relevanceScore ||
        b.matchedTechnologies.length - a.matchedTechnologies.length ||
        a.profile.id.localeCompare(b.profile.id)
    )
    .slice(0, maxResults);
}

// ==========================================
// STACK PATH RELEVANCE
// ==========================================

/**
 * Returns and ranks Stack Paths containing or relevant to the given technology.
 */
export function getRelatedStackPaths(
  technologyId: string,
  options?: { maxResults?: number }
): StackPathInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const maxResults = options?.maxResults ?? 6;
  const directPaths = pathsByTechnologyId.get(technologyId) || [];
  const results: StackPathInsightItem[] = [];

  directPaths.forEach((path) => {
    const hopIndex = path.hops.findIndex((h) => h.technologyId === technologyId);
    const totalHops = path.hops.length;

    let matchStrength: 'strong' | 'related' | 'weak' = 'related';
    if (totalHops <= 4 || hopIndex === 0 || hopIndex === totalHops - 1) {
      matchStrength = 'strong';
    }

    const relevanceScore = Math.round(70 + (totalHops - hopIndex) * 5);

    results.push({
      path,
      isDirectHop: true,
      hopIndex: hopIndex >= 0 ? hopIndex : 0,
      totalHops,
      matchStrength,
      relevanceScore,
      reason: {
        en: `Direct execution hop #${hopIndex + 1} of ${totalHops} in ${path.name.en}`,
        ko: `${path.name.ko || path.name.en} 실행 경로의 #${hopIndex + 1}/${totalHops}번째 핵심 홉`,
      },
    });
  });

  return results
    .sort(
      (a, b) =>
        b.relevanceScore - a.relevanceScore ||
        a.hopIndex - b.hopIndex ||
        a.path.id.localeCompare(b.path.id)
    )
    .slice(0, maxResults);
}

// ==========================================
// "WHAT SHOULD I EXPLORE NEXT?" RECOMMENDATIONS
// ==========================================

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

  // 1. Direct Graph Relationships
  edges.forEach((edge) => {
    // Alternatives are architectural alternatives, NOT next-exploration recommendations
    if (edge.relationship.type === 'alternative') return;
    if (excludeIds.has(edge.neighborId)) return;

    const neighbor = technologyById.get(edge.neighborId);
    if (!neighbor) return;

    const relPriority = RELATIONSHIP_PRIORITY[edge.relationship.type] || 1;
    const confWeight = CONFIDENCE_WEIGHT[edge.relationship.confidence || 'community'] || 0.7;
    const baseRelScore = Math.round(relPriority * 10 * confWeight);

    const relLabelMeta = RELATIONSHIP_METADATA[edge.relationship.type];
    const relLabelEn = relLabelMeta?.label.en || edge.relationship.type;
    const relLabelKo = relLabelMeta?.label.ko || edge.relationship.type;

    const reasons: LocalizedText[] = [
      {
        en: `Direct connection: ${relLabelEn} with ${currentTech.name}`,
        ko: `직접 연계: ${currentTech.name}와(과) ${relLabelKo}`,
      },
    ];

    // Cross-layer diversity bonus
    let crossLayerBonus = 0;
    if (neighbor.layerId !== currentTech.layerId) {
      crossLayerBonus = 15;
    }

    const initialScore = baseRelScore + crossLayerBonus;

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
    .sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name))
    .slice(0, maxResults)
    .map((item) => ({
      technology: item.technology,
      layerId: item.technology.layerId,
      score: item.score,
      primaryRelationship: item.primaryRelationship,
      reasons: item.reasons,
    }));
}

// ==========================================
// PARTIAL-STACK GAP ANALYSIS & INTELLIGENCE
// ==========================================

/**
 * Performs comprehensive intelligence analysis for a partially or fully selected stack.
 */
export function getStackInsights(selection: StackSelection): StackIntelligenceReport {
  const selectedTechIds = Object.values(selection).filter((id): id is string => Boolean(id));

  // 1. Identify Gap Analysis across 7 Core Stack Layers
  const populatedCoreLayers: StackLayerId[] = [];
  const missingCoreLayers: StackLayerId[] = [];

  CORE_STACK_LAYER_IDS.forEach((layerId) => {
    if (selection[layerId]) {
      populatedCoreLayers.push(layerId);
    } else {
      missingCoreLayers.push(layerId);
    }
  });

  const isCompleteCoreStack = missingCoreLayers.length === 0;

  const gapAnalysis: StackGapAnalysis = {
    missingCoreLayers,
    populatedCoreLayers,
    isCompleteCoreStack,
  };

  // 2. Validation & Matching
  const validationSummary = validateStack(selection);
  const architectureMatches = matchArchitectures(selection);
  const stackPathMatches = matchStackPaths(selection);

  // 3. Next Candidate Recommendations Targeted for Missing Layers
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

      // Only recommend technologies for layers that are currently MISSING in the selection
      if (selection[neighbor.layerId]) return;

      const relPriority = RELATIONSHIP_PRIORITY[edge.relationship.type] || 1;
      const confWeight = CONFIDENCE_WEIGHT[edge.relationship.confidence || 'community'] || 0.7;
      const baseScore = Math.round(relPriority * 10 * confWeight);

      const relMeta = RELATIONSHIP_METADATA[edge.relationship.type];
      const relLabelEn = relMeta?.label.en || edge.relationship.type;
      const relLabelKo = relMeta?.label.ko || edge.relationship.type;

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
          score: baseScore + (missingCoreLayers.includes(neighbor.layerId as any) ? 20 : 0),
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

  // Architecture profile co-occurrence bonus
  architectureMatches.slice(0, 3).forEach((match) => {
    match.missingTechnologies.forEach((missingTech) => {
      if (selection[missingTech.layerId]) return;
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
    .sort((a, b) => b.score - a.score || a.technology.name.localeCompare(b.technology.name))
    .slice(0, 6)
    .map((item) => ({
      technology: item.technology,
      layerId: item.technology.layerId,
      score: item.score,
      primaryRelationship: item.primaryRelationship,
      reasons: item.reasons,
    }));

  // 4. Alternatives for Populated Layers (Separated from Additive Candidates)
  const alternativeOptions: StackAlternativeOption[] = [];
  Object.entries(selection).forEach(([layerId, techId]) => {
    if (!techId) return;
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

// ==========================================
// 360-DEGREE TECHNOLOGY DISCOVERY AGGREGATOR
// ==========================================

/**
 * Computes a comprehensive 360-degree knowledge graph discovery profile for a technology.
 */
export function getTechnologyDiscoveryResult(
  technologyId: string,
  options?: DiscoveryOptions
): TechnologyDiscoveryResult | null {
  const technology = technologyById.get(technologyId);
  if (!technology) return null;

  const degreeInfo = getTechnologyDegree(technologyId);

  return {
    technology,
    dependencies: getDependencies(technologyId),
    dependents: getDependents(technologyId),
    platforms: getPlatforms(technologyId),
    hostedTechnologies: getHostedTechnologies(technologyId),
    integrations: getIntegrations(technologyId),
    implementations: getImplementations(technologyId),
    alternatives: getAlternatives(technologyId),
    compatibleWith: getCompatibleTechnologies(technologyId),
    coexistsWith: getCoexistingTechnologies(technologyId),
    usedWith: getUsedWithTechnologies(technologyId),
    related: (outgoingRelationshipsByTechnologyId.get(technologyId) || [])
      .filter((r) => r.type === 'related')
      .map((r) => {
        const target = technologyById.get(r.targetId);
        return target
          ? formatInsightItem(r, true, target, {
              en: `Related in ecosystem`,
              ko: `에코시스템 연계 기술`,
            })
          : null;
      })
      .filter((item): item is TechnologyInsightItem => Boolean(item)),
    bridgeTechnologies: getBridgeTechnologies(technologyId, {
      maxResults: options?.maxBridges ?? 6,
    }),
    architectures: getRelatedArchitectures(technologyId, {
      maxResults: options?.maxArchitectures ?? 6,
    }),
    stackPaths: getRelatedStackPaths(technologyId, {
      maxResults: options?.maxPaths ?? 6,
    }),
    recommendations: getNextTechnologiesToExplore(technologyId, options),
    hubScore: degreeInfo.connectionCount,
    crossLayerScore: degreeInfo.connectedLayersCount,
  };
}

