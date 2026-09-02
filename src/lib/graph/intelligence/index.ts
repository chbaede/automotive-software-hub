/**
 * Knowledge Graph Intelligence Engine Aggregator
 *
 * Provides a unified entry point for all intelligence, discovery, and gap analysis operations.
 */

import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  getTechnologyDegree,
} from '../index';
import { calculateRelationshipScore } from '../scoring';
import {
  TechnologyDiscoveryResult,
  TechnologyInsightItem,
  DiscoveryOptions,
} from './types';
import {
  getDependencies,
  getDependents,
  getPlatforms,
  getHostedTechnologies,
  getIntegrations,
  getImplementations,
  getAlternatives,
  getCompatibleTechnologies,
  getCoexistingTechnologies,
  getUsedWithTechnologies,
} from './relationships';
import { getBridgeTechnologies } from './bridges';
import { getRelatedArchitectures } from './architectures';
import { getRelatedStackPaths } from './paths';
import { getNextTechnologiesToExplore } from './recommendations';

// Export all child submodules and types
export * from './types';
export * from './relationships';
export * from './bridges';
export * from './architectures';
export * from './paths';
export * from './recommendations';
export * from './stackInsights';

/**
 * Computes a comprehensive 360-degree knowledge graph discovery profile for a technology.
 * Returns null if the technology does not exist in the canonical dataset.
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
          ? ({
              technology: target,
              relationship: r,
              isOutgoing: true,
              confidence: r.confidence || 'community',
              score: calculateRelationshipScore(r.type, r.confidence || 'community'),
              reason: {
                en: `Related in ecosystem`,
                ko: `에코시스템 연계 기술`,
              },
            } as TechnologyInsightItem)
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

