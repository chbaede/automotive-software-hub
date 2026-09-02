/**
 * What-if Stack Hypothetical Comparison Engine
 *
 * Simulates technology replacements in an automotive software stack without mutating
 * original user state, providing explainable differential analysis across architecture profiles,
 * directional graph relationships, execution paths, and functional safety claims.
 */

import { StackLayerId, StackTechnology } from '../../types/stack';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
} from '../graph';
import {
  StackSelection,
  FlexibleStackSelection,
  normalizeStackSelection,
  getSelectedTechIds,
  findRelationshipBetween,
} from '../graph/matching';
import {
  WhatIfComparisonResult,
  WhatIfArchitectureImpact,
  WhatIfRelationshipChange,
  WhatIfPathImpact,
  WhatIfLayerImpact,
  WhatIfSafetyImpact,
  WhatIfImpactType,
} from './types';
import { discoverArchitecture } from './discovery';

/**
 * Compares the current automotive software stack against a hypothetical stack
 * where targetTechnology is replaced by replacementTechnology.
 *
 * Strictly pure and non-mutating.
 */
export function compareWhatIfStack(
  rawCurrentSelection: FlexibleStackSelection,
  targetTechId: string,
  replacementTechId: string
): WhatIfComparisonResult {
  const originalSelection = normalizeStackSelection(rawCurrentSelection);

  const targetTechnology = technologyById.get(targetTechId);
  const replacementTechnology = technologyById.get(replacementTechId);

  if (!targetTechnology) {
    throw new Error(`Target technology "${targetTechId}" not found in knowledge graph`);
  }
  if (!replacementTechnology) {
    throw new Error(`Replacement technology "${replacementTechId}" not found in knowledge graph`);
  }

  // 1. Construct Hypothetical Selection (Pure Clone & Replace)
  const hypotheticalSelection: StackSelection = {};
  Object.entries(originalSelection).forEach(([lId, techList]) => {
    hypotheticalSelection[lId as StackLayerId] = [...(techList || [])];
  });

  // Remove targetTechnology from its layer
  const targetLayerList = hypotheticalSelection[targetTechnology.layerId] || [];
  const updatedTargetList = targetLayerList.filter((id) => id !== targetTechnology.id);
  if (updatedTargetList.length > 0) {
    hypotheticalSelection[targetTechnology.layerId] = updatedTargetList;
  } else {
    delete hypotheticalSelection[targetTechnology.layerId];
  }

  // Add replacementTechnology to its layer
  const replLayerList = hypotheticalSelection[replacementTechnology.layerId] || [];
  if (!replLayerList.includes(replacementTechnology.id)) {
    hypotheticalSelection[replacementTechnology.layerId] = [...replLayerList, replacementTechnology.id];
  }

  // 2. Compute Discovery Results for Both Stacks
  const originalDiscovery = discoverArchitecture(originalSelection);
  const hypotheticalDiscovery = discoverArchitecture(hypotheticalSelection);

  // 3. Differential Architecture Impact
  const originalArchMap = new Map(originalDiscovery.architectureMatches.map((m) => [m.profile.id, m]));
  const hypotheticalArchMap = new Map(hypotheticalDiscovery.architectureMatches.map((m) => [m.profile.id, m]));
  const allProfileIds = Array.from(new Set([...originalArchMap.keys(), ...hypotheticalArchMap.keys()]));

  const rank: Record<WhatIfImpactType, number> = { added: 1, improved: 2, unchanged: 3, reduced: 4, removed: 5 };

  const architectureImpacts: WhatIfArchitectureImpact[] = allProfileIds.map((pId): WhatIfArchitectureImpact => {
    const before = originalArchMap.get(pId);
    const after = hypotheticalArchMap.get(pId);
    const profile = (before || after)!.profile;

    if (!before && after) {
      return {
        profile,
        impactType: 'added' as WhatIfImpactType,
        beforeScore: 0,
        afterScore: after.matchScore,
        beforeCoverage: 0,
        afterCoverage: after.profileCoveragePercentage,
        explanation: {
          en: `Hypothetical stack now matches ${profile.name.en} with ${after.profileCoveragePercentage}% coverage.`,
          ko: `가상 스택이 ${profile.name.ko || profile.name.en} 아키텍처와 새롭게 ${after.profileCoveragePercentage}% 일치합니다.`,
        },
      };
    }

    if (before && !after) {
      return {
        profile,
        impactType: 'removed' as WhatIfImpactType,
        beforeScore: before.matchScore,
        afterScore: 0,
        beforeCoverage: before.profileCoveragePercentage,
        afterCoverage: 0,
        explanation: {
          en: `Replacing ${targetTechnology.name} removes all overlapping components for ${profile.name.en}.`,
          ko: `${targetTechnology.name} 교체로 인해 ${profile.name.ko || profile.name.en} 아키텍처와의 일치 구성요소가 사라집니다.`,
        },
      };
    }

    // Present in both
    const beforeScore = before!.matchScore;
    const afterScore = after!.matchScore;
    const beforeCoverage = before!.profileCoveragePercentage;
    const afterCoverage = after!.profileCoveragePercentage;

    let impactType: WhatIfImpactType = 'unchanged';
    if (afterScore > beforeScore) impactType = 'improved';
    else if (afterScore < beforeScore) impactType = 'reduced';

    return {
      profile,
      impactType,
      beforeScore,
      afterScore,
      beforeCoverage,
      afterCoverage,
      explanation: {
        en:
          impactType === 'improved'
            ? `Architecture relevance for ${profile.name.en} increased (${beforeCoverage}% -> ${afterCoverage}% coverage).`
            : impactType === 'reduced'
            ? `Architecture relevance for ${profile.name.en} decreased (${beforeCoverage}% -> ${afterCoverage}% coverage).`
            : `Architecture relevance for ${profile.name.en} remains unchanged.`,
        ko:
          impactType === 'improved'
            ? `${profile.name.ko || profile.name.en} 아키텍처 연계율 상승 (${beforeCoverage}% -> ${afterCoverage}% 커버리지).`
            : impactType === 'reduced'
            ? `${profile.name.ko || profile.name.en} 아키텍처 연계율 하락 (${beforeCoverage}% -> ${afterCoverage}% 커버리지).`
            : `${profile.name.ko || profile.name.en} 아키텍처 연계율이 동일하게 유지됩니다.`,
      },
    };
  }).sort((a, b) => {
    return rank[a.impactType] - rank[b.impactType] || b.afterScore - a.afterScore;
  });

  // 4. Directional Graph Relationship Changes
  const relationshipChanges: WhatIfRelationshipChange[] = [];
  const otherOriginalTechIds = getSelectedTechIds(originalSelection).filter((id) => id !== targetTechnology.id);

  // Check removed relationships (connected to targetTechnology)
  otherOriginalTechIds.forEach((otherId) => {
    const otherTech = technologyById.get(otherId);
    if (!otherTech) return;

    const relResult = findRelationshipBetween(targetTechnology.id, otherTech.id);
    if (relResult) {
      const sourceTech = relResult.isForward ? targetTechnology : otherTech;
      const targetTech = relResult.isForward ? otherTech : targetTechnology;
      relationshipChanges.push({
        sourceTech,
        targetTech,
        relationship: relResult.relationship,
        impactType: 'removed',
        isDirectTargetLink: true,
        explanation: {
          en: `Removed ${relResult.relationship.type} relationship between ${sourceTech.name} and ${targetTech.name}.`,
          ko: `${sourceTech.name}와(과) ${targetTech.name} 사이의 ${relResult.relationship.type} 연계 관계가 해제됩니다.`,
        },
      });
    }
  });

  // Check added relationships (connected to replacementTechnology)
  const otherHypotheticalTechIds = getSelectedTechIds(hypotheticalSelection).filter((id) => id !== replacementTechnology.id);
  otherHypotheticalTechIds.forEach((otherId) => {
    const otherTech = technologyById.get(otherId);
    if (!otherTech) return;

    const relResult = findRelationshipBetween(replacementTechnology.id, otherTech.id);
    if (relResult) {
      const sourceTech = relResult.isForward ? replacementTechnology : otherTech;
      const targetTech = relResult.isForward ? otherTech : replacementTechnology;
      relationshipChanges.push({
        sourceTech,
        targetTech,
        relationship: relResult.relationship,
        impactType: 'added',
        isDirectTargetLink: true,
        explanation: {
          en: `Added ${relResult.relationship.type} relationship between ${sourceTech.name} and ${targetTech.name}.`,
          ko: `${sourceTech.name}와(과) ${targetTech.name} 사이의 ${relResult.relationship.type} 연계 관계가 새롭게 형성됩니다.`,
        },
      });
    }
  });

  // 5. Differential Stack Path Impact
  const originalPathMap = new Map(originalDiscovery.stackPathMatches.map((p) => [p.path.id, p]));
  const hypotheticalPathMap = new Map(hypotheticalDiscovery.stackPathMatches.map((p) => [p.path.id, p]));
  const allPathIds = Array.from(new Set([...originalPathMap.keys(), ...hypotheticalPathMap.keys()]));

  const pathImpacts: WhatIfPathImpact[] = allPathIds.map((pathId): WhatIfPathImpact => {
    const before = originalPathMap.get(pathId);
    const after = hypotheticalPathMap.get(pathId);
    const path = (before || after)!.path;

    if (!before && after) {
      return {
        path,
        impactType: 'added' as WhatIfImpactType,
        beforeScore: 0,
        afterScore: after.matchScore,
        beforeHopsMatched: 0,
        afterHopsMatched: after.matchedHopsCount,
        explanation: {
          en: `New relevant execution journey: ${path.name.en} (${after.matchedHopsCount}/${after.totalHopsCount} hops).`,
          ko: `새로운 실행 여정 매칭: ${path.name.ko || path.name.en} (${after.matchedHopsCount}/${after.totalHopsCount} 단계 일치).`,
        },
      };
    }

    if (before && !after) {
      return {
        path,
        impactType: 'removed' as WhatIfImpactType,
        beforeScore: before.matchScore,
        afterScore: 0,
        beforeHopsMatched: before.matchedHopsCount,
        afterHopsMatched: 0,
        explanation: {
          en: `Relevance lost for journey: ${path.name.en}.`,
          ko: `${path.name.ko || path.name.en} 실행 여정과의 연계가 해제됩니다.`,
        },
      };
    }

    const beforeScore = before!.matchScore;
    const afterScore = after!.matchScore;
    let impactType: WhatIfImpactType = 'unchanged';
    if (afterScore > beforeScore) impactType = 'improved';
    else if (afterScore < beforeScore) impactType = 'reduced';

    return {
      path,
      impactType,
      beforeScore,
      afterScore,
      beforeHopsMatched: before!.matchedHopsCount,
      afterHopsMatched: after!.matchedHopsCount,
      explanation: {
        en:
          impactType === 'improved'
            ? `Journey match score increased for ${path.name.en}.`
            : impactType === 'reduced'
            ? `Journey match score decreased for ${path.name.en}.`
            : `Journey match score for ${path.name.en} remains unchanged.`,
        ko:
          impactType === 'improved'
            ? `${path.name.ko || path.name.en} 여정 일치율 상승.`
            : impactType === 'reduced'
            ? `${path.name.ko || path.name.en} 여정 일치율 하락.`
            : `${path.name.ko || path.name.en} 여정 일치율이 동일하게 유지됩니다.`,
      },
    };
  }).sort((a, b) => {
    return rank[a.impactType] - rank[b.impactType] || b.afterScore - a.afterScore;
  });

  // 6. Layer Completeness Impact
  const missingLayersBefore = originalDiscovery.missingCoreLayers;
  const missingLayersAfter = hypotheticalDiscovery.missingCoreLayers;
  const isCompletenessPreserved =
    originalDiscovery.isCompleteCoreStack === hypotheticalDiscovery.isCompleteCoreStack;

  const layerImpact: WhatIfLayerImpact = {
    missingLayersBefore,
    missingLayersAfter,
    isCompletenessPreserved,
    explanation: {
      en: isCompletenessPreserved
        ? 'Runtime stack layer completeness status is preserved.'
        : originalDiscovery.isCompleteCoreStack
        ? 'Hypothetical stack creates missing core layer gaps.'
        : 'Hypothetical stack resolves missing core layer gaps.',
      ko: isCompletenessPreserved
        ? '런타임 스택 계층 완성 상태가 동일하게 유지됩니다.'
        : originalDiscovery.isCompleteCoreStack
        ? '가상 스택 교체로 인해 필수 코어 계층에 결손이 발생합니다.'
        : '가상 스택 교체로 필수 코어 계층 결손이 해소되었습니다.',
    },
  };

  // 7. Functional Safety Comparison (Exact Claim Evidence)
  const targetSafety = targetTechnology.functionalSafety;
  const replacementSafety = replacementTechnology.functionalSafety;
  const isSameAsil = (targetSafety?.asilLevel || 'None') === (replacementSafety?.asilLevel || 'None');

  const safetyImpact: WhatIfSafetyImpact = {
    targetSafety,
    replacementSafety,
    isSameAsilLevel: isSameAsil,
    explanation: {
      en: `${targetTechnology.name} (${targetSafety?.asilLevel || 'None'} / ${targetSafety?.claimType || 'None'}) -> ${replacementTechnology.name} (${replacementSafety?.asilLevel || 'None'} / ${replacementSafety?.claimType || 'None'}).`,
      ko: `${targetTechnology.name} (${targetSafety?.asilLevel || '없음'} / ${targetSafety?.claimType || '없음'}) -> ${replacementTechnology.name} (${replacementSafety?.asilLevel || '없음'} / ${replacementSafety?.claimType || '없음'}).`,
    },
  };

  return {
    targetTechnology,
    replacementTechnology,
    originalSelection,
    hypotheticalSelection,
    originalDiscovery,
    hypotheticalDiscovery,
    architectureImpacts,
    relationshipChanges,
    pathImpacts,
    layerImpact,
    safetyImpact,
  };
}

