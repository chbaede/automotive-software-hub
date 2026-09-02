/**
 * Architecture Profile Relevance & Ranking for Knowledge Graph Intelligence
 *
 * Identifies and ranks curated reference architecture profiles relevant to a given technology.
 */

import { StackTechnology } from '../../../types/stack';
import {
  technologyById,
  profilesByTechnologyId,
  graphAdjacencyByTechnologyId,
} from '../index';
import { calculateArchitectureRelevance } from '../scoring';
import { ArchitectureInsightItem } from './types';

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

    const relevanceScore = calculateArchitectureRelevance(true, profile.technologyIds.length);

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

        const relevanceScore = calculateArchitectureRelevance(false, matchedTechs.length);

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

