/**
 * Canonical Stack Validation & Architecture / Path Matching Engine
 *
 * Provides pure, deterministic domain algorithms for:
 * - Stack Layer definitions (Core 7 layers, Mandatory vs Optional Hypervisor, Supporting layers)
 * - Multi-technology stack validation against knowledge graph rules and layer adjacency
 * - Architecture profile matching (precision, coverage, composite scoring)
 * - Stack Path journey matching (overlap, contiguous sequence hops)
 * - Deterministic candidate suggestions
 */

import { StackLayerId, StackTechnology } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { TechnologyRelationship } from '../../types/relationship';
import { LocalizedText } from '../../types/i18n';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackPaths } from '../../data/stackPaths';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  graphAdjacencyByTechnologyId,
} from './index';
import {
  RELATIONSHIP_PRIORITY,
  calculateArchitectureMatchScore,
  calculateStackPathMatchScore,
} from './scoring';

// ==========================================
// CANONICAL STACK LAYER DEFINITIONS
// ==========================================

/**
 * The 5 mandatory core runtime layers required for a complete vehicle software stack.
 */
export const MANDATORY_CORE_STACK_LAYER_IDS: StackLayerId[] = [
  'hardware-compute',
  'operating-systems',
  'build-platform',
  'vehicle-services',
  'middleware-communication',
];

/**
 * Optional core runtime layer: Hypervisor is optional for Bare-Metal / direct-host OS architectures.
 */
export const OPTIONAL_CORE_STACK_LAYER_IDS: StackLayerId[] = [
  'hypervisor-virtualization',
];

/**
 * All 6 vertical core runtime layers in hierarchical order.
 */
export const CORE_STACK_LAYER_IDS: StackLayerId[] = [
  'hardware-compute',
  'hypervisor-virtualization',
  'operating-systems',
  'build-platform',
  'vehicle-services',
  'middleware-communication',
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

// ==========================================
// DATA STRUCTURES
// ==========================================

/**
 * StackSelection maps each layer to an array of selected technology IDs.
 * Supports multi-technology selection per layer (e.g. multiple OSes, multiple middlewares).
 */
export type StackSelection = Partial<Record<StackLayerId, string[]>>;

/**
 * Flexible input type supporting both single tech ID (string) and multi tech IDs (string[]).
 */
export type FlexibleStackSelection = Partial<Record<StackLayerId, string[] | string>>;

/**
 * Normalizes any FlexibleStackSelection into canonical StackSelection (Record<LayerId, string[]>).
 */
export function normalizeStackSelection(selection: FlexibleStackSelection): StackSelection {
  const normalized: StackSelection = {};
  Object.entries(selection).forEach(([layerId, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      const validIds = value.filter(Boolean);
      if (validIds.length > 0) {
        normalized[layerId as StackLayerId] = Array.from(new Set(validIds));
      }
    } else if (typeof value === 'string' && value.trim()) {
      normalized[layerId as StackLayerId] = [value.trim()];
    }
  });
  return normalized;
}

/**
 * Returns a flattened array of unique technology IDs selected across all layers.
 */
export function getSelectedTechIds(selection: FlexibleStackSelection): string[] {
  const ids: string[] = [];
  Object.values(selection).forEach((val) => {
    if (Array.isArray(val)) {
      ids.push(...val);
    } else if (typeof val === 'string' && val.trim()) {
      ids.push(val.trim());
    }
  });
  return Array.from(new Set(ids));
}

/**
 * Returns the array of technology IDs selected for a specific layer.
 */
export function getLayerTechIds(selection: FlexibleStackSelection, layerId: StackLayerId): string[] {
  const val = selection[layerId];
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === 'string' && val.trim()) return [val.trim()];
  return [];
}

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
  maxContiguousHops: number;
  matchScore: number;
  matchStrength: PathMatchStrength;
}

export interface TechnologyCandidate {
  technology: StackTechnology;
  layerId: StackLayerId;
  connectedToTech?: StackTechnology;
  relationship?: TechnologyRelationship;
  priority: number;
  reason: LocalizedText;
}

// ==========================================
// DOMAIN ALGORITHMS
// ==========================================

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
 * Supports multi-technology selection per layer and optional Bare-Metal (no Hypervisor) architectures.
 */
export function validateStack(rawSelection: FlexibleStackSelection): StackValidationSummary {
  const selection = normalizeStackSelection(rawSelection);

  // Flatten all selected technologies across all layers
  const selectedEntries: { layerId: StackLayerId; tech: StackTechnology }[] = [];
  Object.entries(selection).forEach(([layerId, techIds]) => {
    (techIds || []).forEach((tId) => {
      const tech = technologyById.get(tId);
      if (tech) {
        selectedEntries.push({ layerId: layerId as StackLayerId, tech });
      }
    });
  });

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

  // 1. Check all pairwise combinations of selected technologies for documented relationships
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
          // If in the same layer (e.g. 2 OSes or 2 Hypervisors), they act as alternative / multi-domain components
          items.push({
            id: pairKey,
            sourceTech,
            targetTech,
            status: 'alternative',
            relationship,
            isAdjacentLayerPair: false,
            explanation: {
              en: `${sourceTech.name} and ${targetTech.name} serve as architectural alternatives or multi-domain components in this stack.`,
              ko: `${sourceTech.name}와(과) ${targetTech.name}은(는) 이 스택 내에서 아키텍처 대안 또는 다중 도메인 분할 구성요소로 공존합니다.`,
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

  // 2. Check Adjacent Layers (with smart Hypervisor optionality / Bare Metal bypass)
  const hypervisorTechIds = getLayerTechIds(selection, 'hypervisor-virtualization');
  const hasHypervisor = hypervisorTechIds.length > 0;

  const adjacentLayerPairsToCheck: [StackLayerId, StackLayerId][] = [
    // If hypervisor is present: Hardware <-> Hypervisor <-> OS
    // If hypervisor is absent: Hardware <-> OS directly (Bare Metal!)
    ...(hasHypervisor
      ? [
          ['hardware-compute', 'hypervisor-virtualization'] as [StackLayerId, StackLayerId],
          ['hypervisor-virtualization', 'operating-systems'] as [StackLayerId, StackLayerId],
        ]
      : [['hardware-compute', 'operating-systems'] as [StackLayerId, StackLayerId]]),
    ['operating-systems', 'build-platform'],
    ['operating-systems', 'vehicle-services'],
    ['operating-systems', 'middleware-communication'],
    ['vehicle-services', 'middleware-communication'],
  ];

  adjacentLayerPairsToCheck.forEach(([upperLayerId, lowerLayerId]) => {
    const upperTechIds = getLayerTechIds(selection, upperLayerId);
    const lowerTechIds = getLayerTechIds(selection, lowerLayerId);

    if (upperTechIds.length > 0 && lowerTechIds.length > 0) {
      upperTechIds.forEach((uId) => {
        lowerTechIds.forEach((lId) => {
          const uTech = technologyById.get(uId);
          const lTech = technologyById.get(lId);
          if (!uTech || !lTech) return;

          const pairKey = [uTech.id, lTech.id].sort().join('::');
          if (!processedPairs.has(pairKey)) {
            processedPairs.add(pairKey);
            items.push({
              id: pairKey,
              sourceTech: uTech,
              targetTech: lTech,
              status: 'warning',
              isAdjacentLayerPair: true,
              explanation: {
                en: `No explicit verified relationship documented between ${uTech.name} and ${lTech.name} across adjacent layers (${upperLayerId} <-> ${lowerLayerId}). This indicates unverified combination evidence, but does not imply incompatibility.`,
                ko: `인접 계층(${upperLayerId} <-> ${lowerLayerId})의 ${uTech.name}와(과) ${lTech.name} 사이에 명시적으로 등록된 검증 관계가 없습니다. 이는 결합 근거가 미검증되었음을 의미하며, 기술적 비호환을 의미하지 않습니다.`,
              },
            });
          }
        });
      });
    }
  });

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
 * Supports multi-technology selection per layer.
 */
export function matchArchitectures(rawSelection: FlexibleStackSelection): ArchitectureMatchResult[] {
  const selectedTechIds = getSelectedTechIds(rawSelection);
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

      const matchScore = calculateArchitectureMatchScore(
        overlapPercentage,
        profileCoveragePercentage,
        matchedTechs.length
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
      b.overlapPercentage - a.overlapPercentage ||
      a.profile.id.localeCompare(b.profile.id)
  );
}

/**
 * Calculates overlap, contiguous step continuity, and similarity against canonical stack paths.
 * Supports multi-technology selection per layer.
 */
export function matchStackPaths(rawSelection: FlexibleStackSelection): StackPathMatchResult[] {
  const selectedTechIds = getSelectedTechIds(rawSelection);
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

      // Calculate longest contiguous sequence of matched hops in path sequence
      let maxContiguousHops = 0;
      let currentContiguous = 0;
      path.hops.forEach((hop) => {
        if (selectedTechIds.includes(hop.technologyId)) {
          currentContiguous++;
          if (currentContiguous > maxContiguousHops) {
            maxContiguousHops = currentContiguous;
          }
        } else {
          currentContiguous = 0;
        }
      });

      const matchScore = calculateStackPathMatchScore(
        overlapPercentage,
        matchedTechs.length,
        maxContiguousHops
      );

      let matchStrength: PathMatchStrength = 'weak';
      if (overlapPercentage >= 60 || maxContiguousHops >= 3 || (matchedTechs.length >= 3 && overlapPercentage >= 50)) {
        matchStrength = 'strong';
      } else if (overlapPercentage >= 30 || maxContiguousHops >= 2 || matchedTechs.length >= 2) {
        matchStrength = 'related';
      }

      results.push({
        path,
        matchedHopsCount: matchedTechs.length,
        totalHopsCount: path.hops.length,
        matchedTechnologies: matchedTechs,
        overlapPercentage,
        maxContiguousHops,
        matchScore,
        matchStrength,
      });
    }
  });

  return results.sort(
    (a, b) =>
      b.matchScore - a.matchScore ||
      b.matchedHopsCount - a.matchedHopsCount ||
      b.overlapPercentage - a.overlapPercentage ||
      a.path.id.localeCompare(b.path.id)
  );
}

/**
 * Deterministically recommends next technology candidates based on existing graph relationships.
 */
export function getSuggestedCandidates(rawSelection: FlexibleStackSelection): TechnologyCandidate[] {
  const selectedTechIds = new Set(getSelectedTechIds(rawSelection));
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
    .sort(
      (a, b) =>
        b.priority - a.priority ||
        a.technology.name.localeCompare(b.technology.name)
    )
    .slice(0, 6);
}
