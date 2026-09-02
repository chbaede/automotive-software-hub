import { StackLayerId, StackTechnology } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { TechnologyRelationship, RelationshipType } from '../../types/relationship';
import { LocalizedText } from '../../types/i18n';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackPaths } from '../../data/stackPaths';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  graphAdjacencyByTechnologyId,
} from '../graph';

export const CORE_STACK_LAYER_IDS: StackLayerId[] = [
  'hardware-compute',
  'hypervisor-virtualization',
  'operating-systems',
  'build-platform',
  'middleware-communication',
  'vehicle-services',
  'application-experience',
];

export const SUPPORTING_STACK_LAYER_IDS: StackLayerId[] = [
  'cloud-devops',
  'development-testing',
  'process-compliance-security',
];

export const ALL_BUILDER_LAYER_IDS: StackLayerId[] = [
  ...CORE_STACK_LAYER_IDS,
  ...SUPPORTING_STACK_LAYER_IDS,
];

export type StackSelection = Partial<Record<StackLayerId, string>>;

export type ValidationStatus = 'verified' | 'warning' | 'alternative';

export interface ValidationItem {
  id: string;
  sourceTech: StackTechnology;
  targetTech: StackTechnology;
  status: ValidationStatus;
  relationship?: TechnologyRelationship;
  isAdjacentLayerPair: boolean;
  explanation: LocalizedText;
}

export type StackHealthStatus =
  | 'validated'
  | 'partially-validated'
  | 'needs-review'
  | 'incomplete';

export interface StackValidationSummary {
  health: StackHealthStatus;
  totalSelected: number;
  verifiedCount: number;
  warningCount: number;
  alternativeCount: number;
  items: ValidationItem[];
}

export interface ArchitectureMatchResult {
  profile: ArchitectureProfile;
  matchedTechnologies: StackTechnology[];
  missingTechnologies: StackTechnology[];
  overlapPercentage: number; // matched / selected (what % of user's selection matches this architecture)
  profileCoveragePercentage: number; // matched / profile total (what % of this architecture is covered)
  matchScore: number; // Explainable composite ranking score
}

export type PathMatchStrength = 'strong' | 'related' | 'weak';

export interface StackPathMatchResult {
  path: StackPath;
  matchedHopsCount: number;
  totalHopsCount: number;
  matchedTechnologies: StackTechnology[];
  overlapPercentage: number;
  matchStrength: PathMatchStrength;
}

export interface TechnologyCandidate {
  technology: StackTechnology;
  layerId: StackLayerId;
  connectedToTech: StackTechnology;
  relationship: TechnologyRelationship;
  priority: number;
  reason: LocalizedText;
}

/**
 * Returns the direct relationship between two technologies if one exists in the knowledge graph.
 */
export function findRelationshipBetween(
  techAId: string,
  techBId: string
): { relationship: TechnologyRelationship; isForward: boolean } | null {
  const outgoingA = outgoingRelationshipsByTechnologyId.get(techAId) || [];
  const forwardRel = outgoingA.find((rel) => rel.targetId === techBId);
  if (forwardRel) {
    return { relationship: forwardRel, isForward: true };
  }

  const outgoingB = outgoingRelationshipsByTechnologyId.get(techBId) || [];
  const reverseRel = outgoingB.find((rel) => rel.targetId === techAId);
  if (reverseRel) {
    return { relationship: reverseRel, isForward: false };
  }

  return null;
}

/**
 * Validates the currently selected stack against canonical knowledge graph relationships.
 */
export function validateStack(selection: StackSelection): StackValidationSummary {
  const selectedEntries = Object.entries(selection)
    .map(([layerId, techId]) => ({
      layerId: layerId as StackLayerId,
      tech: techId ? technologyById.get(techId) : undefined,
    }))
    .filter((entry): entry is { layerId: StackLayerId; tech: StackTechnology } => Boolean(entry.tech));

  const totalSelected = selectedEntries.length;

  if (totalSelected <= 1) {
    return {
      health: 'incomplete',
      totalSelected,
      verifiedCount: 0,
      warningCount: 0,
      alternativeCount: 0,
      items: [],
    };
  }

  const items: ValidationItem[] = [];
  const processedPairs = new Set<string>();

  // 1. Check all pairs of selected technologies for documented relationships
  for (let i = 0; i < selectedEntries.length; i++) {
    for (let j = i + 1; j < selectedEntries.length; j++) {
      const entryA = selectedEntries[i];
      const entryB = selectedEntries[j];
      const pairKey = [entryA.tech.id, entryB.tech.id].sort().join('::');

      if (processedPairs.has(pairKey)) continue;

      const relResult = findRelationshipBetween(entryA.tech.id, entryB.tech.id);
      if (relResult) {
        processedPairs.add(pairKey);
        const { relationship, isForward } = relResult;
        const sourceTech = isForward ? entryA.tech : entryB.tech;
        const targetTech = isForward ? entryB.tech : entryA.tech;

        if (relationship.type === 'alternative') {
          items.push({
            id: pairKey,
            sourceTech,
            targetTech,
            status: 'alternative',
            relationship,
            isAdjacentLayerPair: false,
            explanation: {
              en: `${sourceTech.name} and ${targetTech.name} serve as direct architectural alternatives. They fulfill similar domain roles.`,
              ko: `${sourceTech.name}와(과) ${targetTech.name}은(는) 동일 도메인 역할을 수행하는 상호 대체 가능한 아키텍처 대안 솔루션입니다.`,
            },
          });
        } else {
          items.push({
            id: pairKey,
            sourceTech,
            targetTech,
            status: 'verified',
            relationship,
            isAdjacentLayerPair: false,
            explanation: relationship.description || {
              en: `Verified ${relationship.type} relationship documented in the knowledge graph.`,
              ko: `지식 그래프에 검증된 ${relationship.type} 관계가 등록되어 있습니다.`,
            },
          });
        }
      }
    }
  }

  // 2. Check genuinely adjacent canonical core layers where BOTH layers are populated
  for (let i = 0; i < CORE_STACK_LAYER_IDS.length - 1; i++) {
    const upperLayerId = CORE_STACK_LAYER_IDS[i];
    const lowerLayerId = CORE_STACK_LAYER_IDS[i + 1];
    const upperTechId = selection[upperLayerId];
    const lowerTechId = selection[lowerLayerId];

    if (upperTechId && lowerTechId) {
      const upperTech = technologyById.get(upperTechId);
      const lowerTech = technologyById.get(lowerTechId);

      if (upperTech && lowerTech) {
        const pairKey = [upperTech.id, lowerTech.id].sort().join('::');
        if (!processedPairs.has(pairKey)) {
          processedPairs.add(pairKey);
          items.push({
            id: pairKey,
            sourceTech: upperTech,
            targetTech: lowerTech,
            status: 'warning',
            isAdjacentLayerPair: true,
            explanation: {
              en: `No explicit verified relationship documented between ${upperTech.name} and ${lowerTech.name} across adjacent layers. This indicates unverified combination evidence, but does not imply incompatibility.`,
              ko: `인접 계층의 ${upperTech.name}와(과) ${lowerTech.name} 사이에 지식 그래프상 명시적으로 등록된 검증 관계가 없습니다. 이는 결합 근거가 미검증되었음을 의미하며, 기술적 비호환을 의미하지 않습니다.`,
            },
          });
        }
      }
    }
  }

  const verifiedCount = items.filter((item) => item.status === 'verified').length;
  const warningCount = items.filter((item) => item.status === 'warning').length;
  const alternativeCount = items.filter((item) => item.status === 'alternative').length;

  let health: StackHealthStatus = 'partially-validated';
  if (verifiedCount > 0 && warningCount === 0 && alternativeCount === 0) {
    health = 'validated';
  } else if (verifiedCount === 0 && warningCount > 0) {
    health = 'needs-review';
  } else if (alternativeCount > 0) {
    health = 'needs-review';
  }

  return {
    health,
    totalSelected,
    verifiedCount,
    warningCount,
    alternativeCount,
    items,
  };
}

/**
 * Calculates overlap and similarity against canonical architecture profiles.
 * Uses an explainable deterministic composite ranking score considering
 * both technology overlap (precision) and profile coverage (recall).
 */
export function matchArchitectures(selection: StackSelection): ArchitectureMatchResult[] {
  const selectedTechIds = Object.values(selection).filter((id): id is string => Boolean(id));
  if (selectedTechIds.length === 0) return [];

  const results: ArchitectureMatchResult[] = [];

  architectureProfiles.forEach((profile) => {
    const profileTechSet = new Set(profile.technologyIds);
    const matchedTechs: StackTechnology[] = [];
    const missingTechs: StackTechnology[] = [];

    selectedTechIds.forEach((techId) => {
      if (profileTechSet.has(techId)) {
        const tech = technologyById.get(techId);
        if (tech) matchedTechs.push(tech);
      }
    });

    profile.technologyIds.forEach((techId) => {
      if (!selectedTechIds.includes(techId)) {
        const tech = technologyById.get(techId);
        if (tech) missingTechs.push(tech);
      }
    });

    if (matchedTechs.length > 0) {
      const overlapPercentage = Math.round((matchedTechs.length / selectedTechIds.length) * 100);
      const profileCoveragePercentage = Math.round(
        (matchedTechs.length / Math.max(profile.technologyIds.length, 1)) * 100
      );

      // Composite match score:
      // - overlapPercentage (60% weight): precision of user's stack matching this profile
      // - profileCoveragePercentage (40% weight): completeness of the profile
      // - bonus for absolute matched technology count
      const matchScore = Math.round(
        overlapPercentage * 0.6 + profileCoveragePercentage * 0.4 + matchedTechs.length * 3
      );

      results.push({
        profile,
        matchedTechnologies: matchedTechs,
        missingTechnologies: missingTechs,
        overlapPercentage,
        profileCoveragePercentage,
        matchScore,
      });
    }
  });

  return results.sort(
    (a, b) =>
      b.matchScore - a.matchScore ||
      b.matchedTechnologies.length - a.matchedTechnologies.length ||
      b.overlapPercentage - a.overlapPercentage
  );
}

/**
 * Calculates overlap and similarity against canonical stack paths.
 */
export function matchStackPaths(selection: StackSelection): StackPathMatchResult[] {
  const selectedTechIds = Object.values(selection).filter((id): id is string => Boolean(id));
  if (selectedTechIds.length === 0) return [];

  const results: StackPathMatchResult[] = [];

  stackPaths.forEach((path) => {
    const matchedTechs: StackTechnology[] = [];
    const pathTechIds = path.hops.map((h) => h.technologyId);

    pathTechIds.forEach((techId) => {
      if (selectedTechIds.includes(techId)) {
        const tech = technologyById.get(techId);
        if (tech && !matchedTechs.some((t) => t.id === tech.id)) {
          matchedTechs.push(tech);
        }
      }
    });

    if (matchedTechs.length >= 1) {
      const overlapPercentage = Math.round((matchedTechs.length / path.hops.length) * 100);
      let matchStrength: PathMatchStrength = 'weak';
      if (overlapPercentage >= 60 || matchedTechs.length >= 3) {
        matchStrength = 'strong';
      } else if (overlapPercentage >= 30 || matchedTechs.length >= 2) {
        matchStrength = 'related';
      }

      results.push({
        path,
        matchedHopsCount: matchedTechs.length,
        totalHopsCount: path.hops.length,
        matchedTechnologies: matchedTechs,
        overlapPercentage,
        matchStrength,
      });
    }
  });

  return results.sort(
    (a, b) =>
      b.matchedHopsCount - a.matchedHopsCount ||
      b.overlapPercentage - a.overlapPercentage
  );
}

const RELATIONSHIP_PRIORITY: Record<RelationshipType, number> = {
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

/**
 * Deterministically recommends next technology candidates based on existing graph relationships.
 */
export function getSuggestedCandidates(selection: StackSelection): TechnologyCandidate[] {
  const selectedTechIds = new Set(
    Object.values(selection).filter((id): id is string => Boolean(id))
  );

  if (selectedTechIds.size === 0) return [];

  const candidatesMap = new Map<string, TechnologyCandidate>();

  selectedTechIds.forEach((techId) => {
    const currentTech = technologyById.get(techId);
    if (!currentTech) return;

    const edges = graphAdjacencyByTechnologyId.get(techId) || [];
    edges.forEach((edge) => {
      const neighborId = edge.neighborId;
      if (selectedTechIds.has(neighborId)) return;

      const neighborTech = technologyById.get(neighborId);
      if (!neighborTech) return;

      // Do not recommend technologies for layers that are already populated
      if (selection[neighborTech.layerId]) return;
      // Exclude 'alternative' from additive suggestions
      if (edge.relationship.type === 'alternative') return;

      const priority = RELATIONSHIP_PRIORITY[edge.relationship.type] || 0;
      const existing = candidatesMap.get(neighborId);

      if (!existing || existing.priority < priority) {
        const relType = edge.relationship.type;
        candidatesMap.set(neighborId, {
          technology: neighborTech,
          layerId: neighborTech.layerId,
          connectedToTech: currentTech,
          relationship: edge.relationship,
          priority,
          reason: {
            en: `Connected via ${relType} with ${currentTech.name}`,
            ko: `${currentTech.name}와(과) ${relType} 관계로 연계`,
          },
        });
      }
    });
  });

  return Array.from(candidatesMap.values())
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);
}

/**
 * Encodes StackSelection into URLSearchParams for shareable deep links.
 */
export function encodeStackToSearchParams(selection: StackSelection): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(selection).forEach(([layerId, techId]) => {
    if (techId) {
      params.set(layerId, techId);
    }
  });
  return params;
}

/**
 * Decodes URLSearchParams into a validated StackSelection.
 * Ignores non-existent technology IDs and mismatched layer IDs.
 */
export function decodeStackFromSearchParams(searchParams: URLSearchParams): StackSelection {
  const selection: StackSelection = {};

  searchParams.forEach((techId, layerKey) => {
    const tech = technologyById.get(techId);
    if (tech && tech.layerId === layerKey) {
      selection[tech.layerId] = tech.id;
    }
  });

  return selection;
}

