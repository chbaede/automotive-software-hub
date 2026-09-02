/**
 * Stack Path Relevance & Journey Ranking for Knowledge Graph Intelligence
 *
 * Identifies and ranks end-to-end vehicle execution paths containing a given technology.
 */

import {
  technologyById,
  pathsByTechnologyId,
} from '../index';
import { calculatePathRelevance } from '../scoring';
import { StackPathInsightItem } from './types';

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

    const relevanceScore = calculatePathRelevance(totalHops, hopIndex);

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

