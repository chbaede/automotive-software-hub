/**
 * Architecture Discovery View Model Mapper
 *
 * Pure display-friendly view model mapper for transforming ArchitectureDiscoveryResult
 * into structured presentation models for decision support, coverage breakdown, and gap analysis.
 *
 * Strictly non-mutating and contains no new ranking or scoring logic.
 */

import { StackTechnology, StackLayer, StackLayerId } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { LocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import { technologyById } from '../graph';
import {
  ArchitectureDiscoveryResult,
  ArchitectureMatchResult,
  StackPathMatchResult,
  TechnologyRecommendation,
  StackAlternativeOption,
  BridgeTechnologyCandidate,
} from './types';

export type GapCategory = 'architecture-gap' | 'layer-gap' | 'connectivity-gap';

export interface ActionableGapItem {
  id: string;
  category: GapCategory;
  title: LocalizedText;
  description: LocalizedText;
  technology?: StackTechnology;
  layerId?: StackLayerId;
  layerName?: LocalizedText;
  actionLabel?: LocalizedText;
}

export interface LayerCoverageItem {
  layer: StackLayer;
  matched: StackTechnology[];
  missing: StackTechnology[];
}

export interface PathHopView {
  technologyId: string;
  technology: StackTechnology | null;
  isSelected: boolean;
}

export interface StackPathViewItem {
  path: StackPath;
  hops: PathHopView[];
  matchedCount: number;
  totalCount: number;
  overlapPercentage: number;
}

export interface ArchitectureDiscoveryViewModel {
  isEmptySelection: boolean;
  isWeakMatch: boolean;
  isStrongMatch: boolean;
  totalSelectedCount: number;

  // Primary architecture match (Top ranking match from existing engine)
  primaryArchitecture: ArchitectureMatchResult | null;

  // Up to 3 top architecture matches for side-by-side comparison
  topMatches: ArchitectureMatchResult[];

  // Layer-by-layer coverage of reference technologies in the primary architecture
  primaryLayerCoverage: LayerCoverageItem[];

  // Actionable categorized gaps (architecture-gap, layer-gap, connectivity-gap)
  gaps: ActionableGapItem[];

  // Stack Path execution journeys with highlighted hops
  stackPaths: StackPathViewItem[];

  // Structured Next Exploration items
  exploreNext: {
    missingArchitectureComponents: StackTechnology[];
    recommendedTechnologies: TechnologyRecommendation[];
    alternativeOptions: StackAlternativeOption[];
    bridgeOpportunities: BridgeTechnologyCandidate[];
  };
}

/**
 * Maps an ArchitectureDiscoveryResult into an ArchitectureDiscoveryViewModel.
 */
export function buildArchitectureDiscoveryViewModel(
  discovery: ArchitectureDiscoveryResult
): ArchitectureDiscoveryViewModel {
  const {
    selection,
    totalSelectedCount,
    architectureMatches,
    missingCoreLayers,
    recommendedTechnologies,
    alternativeOptions,
    stackPathMatches,
    validation,
    bridgeOpportunities,
  } = discovery;

  const isEmptySelection = totalSelectedCount === 0;

  // Top ranking architecture from existing matchArchitectures()
  const primaryArchitecture = architectureMatches.length > 0 ? architectureMatches[0] : null;

  // Strong match determination: at least 2 technologies matched and coverage >= 30%
  const isStrongMatch = Boolean(
    !isEmptySelection &&
      primaryArchitecture &&
      primaryArchitecture.matchedTechnologies.length >= 2 &&
      primaryArchitecture.profileCoveragePercentage >= 30
  );

  const isWeakMatch = !isEmptySelection && !isStrongMatch;

  // Top 3 matches for quick comparison
  const topMatches = architectureMatches.slice(0, 3);

  // 1. Layer-by-Layer Coverage for Primary Architecture
  const primaryLayerCoverage: LayerCoverageItem[] = [];
  if (primaryArchitecture) {
    const profile = primaryArchitecture.profile;
    const profileTechs = profile.technologyIds
      .map((id) => technologyById.get(id))
      .filter((t): t is StackTechnology => Boolean(t));

    const matchedSet = new Set(primaryArchitecture.matchedTechnologies.map((t) => t.id));

    // Group by layer in canonical stack layer order
    stackLayers.forEach((layer) => {
      const layerProfileTechs = profileTechs.filter((t) => t.layerId === layer.id);
      if (layerProfileTechs.length > 0) {
        const matched = layerProfileTechs.filter((t) => matchedSet.has(t.id));
        const missing = layerProfileTechs.filter((t) => !matchedSet.has(t.id));
        primaryLayerCoverage.push({
          layer,
          matched,
          missing,
        });
      }
    });
  }

  // 2. Actionable Gap Analysis
  const gaps: ActionableGapItem[] = [];

  // A. Architecture Gaps (Technologies in primary matched architecture that are missing)
  if (primaryArchitecture && primaryArchitecture.missingTechnologies.length > 0) {
    primaryArchitecture.missingTechnologies.forEach((tech) => {
      const layer = stackLayers.find((l) => l.id === tech.layerId);
      gaps.push({
        id: `arch-gap-${tech.id}`,
        category: 'architecture-gap',
        title: {
          en: `Missing ${tech.name}`,
          ko: `${tech.name} 누락`,
        },
        description: {
          en: `Part of the matched ${primaryArchitecture.profile.name.en} reference architecture.`,
          ko: `매칭된 ${primaryArchitecture.profile.name.ko} 참조 아키텍처의 구성 요소입니다.`,
        },
        technology: tech,
        layerId: tech.layerId as StackLayerId,
        layerName: layer?.name,
        actionLabel: {
          en: 'Add to Stack',
          ko: '스택에 추가',
        },
      });
    });
  }

  // B. Layer Gaps (Unpopulated mandatory core runtime layers)
  missingCoreLayers.forEach((layerId) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    if (layer) {
      gaps.push({
        id: `layer-gap-${layerId}`,
        category: 'layer-gap',
        title: {
          en: `Unpopulated Layer: ${layer.name.en}`,
          ko: `미선택 계층: ${layer.name.ko}`,
        },
        description: {
          en: `Core runtime software layer required for vehicle execution.`,
          ko: `차량 런타임 구동에 필요한 필수 코어 소프트웨어 계층입니다.`,
        },
        layerId: layer.id as StackLayerId,
        layerName: layer.name,
        actionLabel: {
          en: 'Select Component',
          ko: '기술 선택',
        },
      });
    }
  });

  // C. Connectivity Gaps (Selected components with unverified relationships)
  const unverifiedItems = validation.items.filter((item) => item.status === 'warning');
  if (unverifiedItems.length > 0 && totalSelectedCount >= 2) {
    unverifiedItems.slice(0, 3).forEach((item, idx) => {
      gaps.push({
        id: `conn-gap-${idx}`,
        category: 'connectivity-gap',
        title: {
          en: `Unverified Link: ${item.sourceTech.name} ↔ ${item.targetTech.name}`,
          ko: `미검증 연계: ${item.sourceTech.name} ↔ ${item.targetTech.name}`,
        },
        description: {
          en: `No canonical knowledge graph integration documented between these selected layers.`,
          ko: `선택된 두 계층 간에 문서화된 직접 지식 그래프 연계가 없습니다.`,
        },
        technology: item.sourceTech,
        actionLabel: {
          en: 'Review Alternatives',
          ko: '대안 검토',
        },
      });
    });
  }

  // 3. Stack Paths with Hops View
  const selectedTechIds = new Set<string>();
  Object.values(selection).forEach((techList) => {
    (techList || []).forEach((id) => selectedTechIds.add(id));
  });

  const stackPaths: StackPathViewItem[] = stackPathMatches.slice(0, 4).map((match) => {
    const hops: PathHopView[] = match.path.hops.map((hop) => ({
      technologyId: hop.technologyId,
      technology: technologyById.get(hop.technologyId) || null,
      isSelected: selectedTechIds.has(hop.technologyId),
    }));

    return {
      path: match.path,
      hops,
      matchedCount: match.matchedHopsCount,
      totalCount: match.totalHopsCount,
      overlapPercentage: match.overlapPercentage,
    };
  });

  return {
    isEmptySelection,
    isWeakMatch,
    isStrongMatch,
    totalSelectedCount,
    primaryArchitecture,
    topMatches,
    primaryLayerCoverage,
    gaps,
    stackPaths,
    exploreNext: {
      missingArchitectureComponents: primaryArchitecture ? primaryArchitecture.missingTechnologies : [],
      recommendedTechnologies,
      alternativeOptions,
      bridgeOpportunities,
    },
  };
}
