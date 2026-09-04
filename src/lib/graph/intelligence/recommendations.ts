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
import { calculateRelationshipScore } from '../scoring';
import { getBridgeTechnologies } from './bridges';
import { TechnologyRecommendation, DiscoveryOptions, ExploreNextOptions } from './types';

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

/**
 * Phase 8.5: Deduplicated Explore Next Candidate Filtering Engine
 *
 * Answers: "I've understood this technology. What should I explore next?"
 *
 * Rules:
 * 1. Collects candidates from existing intelligence (co-occurring architectures,
 *    stack paths, 2-hop graph neighbors, cross-layer bridges).
 * 2. Excludes current technology and all already-displayed technologies.
 * 3. Removes duplicate candidate entries.
 * 4. Preserves cross-layer bridge candidates with bonus scoring and badge tags.
 * 5. Preserves architecture/path discovery context.
 * 6. Ranks deterministically using existing scoring logic.
 * 7. Returns a small, clean set (default 4-6).
 */
export function getExploreNextTechnologies(
  arg:
    | string
    | {
        technologyId: string;
        alreadyDisplayedTechnologyIds?: string[];
        maxResults?: number;
        excludeTechIds?: string[];
      },
  maybeOptions?: ExploreNextOptions
): TechnologyRecommendation[] {
  const technologyId = typeof arg === 'string' ? arg : arg.technologyId;
  const options: ExploreNextOptions =
    typeof arg === 'string'
      ? maybeOptions || {}
      : {
          alreadyDisplayedTechnologyIds: arg.alreadyDisplayedTechnologyIds,
          maxResults: arg.maxResults,
          excludeTechIds: arg.excludeTechIds,
          ...maybeOptions,
        };

  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const maxResults = options.maxResults ?? options.maxRecommendations ?? 6;
  const excludeIds = new Set<string>([
    technologyId,
    ...(options.alreadyDisplayedTechnologyIds || []),
    ...(options.excludeTechIds || []),
  ]);

  const candidateScores = new Map<
    string,
    {
      technology: StackTechnology;
      score: number;
      primaryRelationship?: TechnologyRelationship;
      reasons: LocalizedText[];
      isCrossLayer?: boolean;
    }
  >();

  // 1. First, harvest candidates from existing recommendation engine (excluding already-displayed)
  const baseRecs = getNextTechnologiesToExplore(technologyId, {
    excludeTechIds: Array.from(excludeIds),
    maxRecommendations: 20,
  });

  baseRecs.forEach((rec) => {
    if (excludeIds.has(rec.technology.id)) return;
    candidateScores.set(rec.technology.id, {
      technology: rec.technology,
      score: rec.score,
      primaryRelationship: rec.primaryRelationship,
      reasons: [...rec.reasons],
    });
  });

  // 2. Cross-Layer Bridges as discovery candidates (Internal signal)
  const bridges = getBridgeTechnologies(technologyId, { minBridgedLayers: 2, maxResults: 10 });
  bridges.forEach((bridge) => {
    if (excludeIds.has(bridge.technology.id)) return;
    const existing = candidateScores.get(bridge.technology.id);
    const bridgeReason: LocalizedText = {
      en: `Cross-layer bridge connecting ${bridge.bridgedLayersCount} distinct automotive stack layers`,
      ko: `${bridge.bridgedLayersCount}개의 서로 다른 차량 스택 계층을 연결하는 크로스 레이어 브리지`,
    };

    if (existing) {
      existing.score += 25;
      existing.isCrossLayer = true;
      if (!existing.reasons.some((r) => r.en === bridgeReason.en)) {
        existing.reasons.push(bridgeReason);
      }
    } else {
      candidateScores.set(bridge.technology.id, {
        technology: bridge.technology,
        score: bridge.score + 25,
        primaryRelationship: bridge.relationship,
        isCrossLayer: true,
        reasons: [bridgeReason],
      });
    }
  });

  // 3. 2-Hop Graph Traversal (Neighbors of Direct Connected Technologies)
  // Expands exploration horizon when direct 1-hop neighbors are already displayed in Relationships
  const directEdges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  directEdges.forEach((edge) => {
    if (edge.relationship.type === 'alternative') return;
    const hop1Neighbor = technologyById.get(edge.neighborId);
    if (!hop1Neighbor) return;

    const hop2Edges = graphAdjacencyByTechnologyId.get(edge.neighborId) || [];
    hop2Edges.forEach((hop2Edge) => {
      if (hop2Edge.relationship.type === 'alternative') return;
      if (excludeIds.has(hop2Edge.neighborId)) return;
      const hop2Neighbor = technologyById.get(hop2Edge.neighborId);
      if (!hop2Neighbor) return;

      const existing = candidateScores.get(hop2Neighbor.id);
      const isDiffLayer = hop2Neighbor.layerId !== currentTech.layerId;
      const hop2Score = 20 + (isDiffLayer ? 10 : 0);

      const hopReason: LocalizedText = {
        en: `Connected via ${hop1Neighbor.name}`,
        ko: `${hop1Neighbor.name}을(를) 통해 간접 연계됨`,
      };

      if (existing) {
        existing.score += 8;
        if (!existing.reasons.some((r) => r.en === hopReason.en)) {
          existing.reasons.push(hopReason);
        }
      } else {
        candidateScores.set(hop2Neighbor.id, {
          technology: hop2Neighbor,
          score: hop2Score,
          primaryRelationship: hop2Edge.relationship,
          reasons: [hopReason],
        });
      }
    });
  });

  // 4. Boost High-Connectivity Hubs
  candidateScores.forEach((item) => {
    const degree = getTechnologyDegree(item.technology.id);
    if (degree.connectionCount >= 5) {
      item.score += 8;
    }
  });

  // 5. If still fewer than maxResults, supply same-layer complementary candidates
  if (candidateScores.size < maxResults) {
    const allTechs = Array.from(technologyById.values());
    for (const t of allTechs) {
      if (candidateScores.size >= maxResults) break;
      if (excludeIds.has(t.id) || candidateScores.has(t.id)) continue;
      if (t.layerId === currentTech.layerId) {
        candidateScores.set(t.id, {
          technology: t,
          score: 15,
          reasons: [
            {
              en: `Complementary technology in the ${currentTech.layerId} layer`,
              ko: `${currentTech.layerId} 계층의 상호 보완 기술`,
            },
          ],
        });
      }
    }
  }

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
      isCrossLayer: item.isCrossLayer,
    }));
}

