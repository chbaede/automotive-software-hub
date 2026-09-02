/**
 * Architecture Discovery & What-if Stack Domain Types
 *
 * Core data models for orchestrating knowledge graph intelligence,
 * architecture matching, partial stack gap analysis, and hypothetical stack comparison.
 */

import { StackLayerId, StackTechnology, FunctionalSafetyInfo } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { TechnologyRelationship } from '../../types/relationship';
import { LocalizedText } from '../../types/i18n';
import {
  StackSelection,
  FlexibleStackSelection,
  ArchitectureMatchResult,
  StackPathMatchResult,
  TechnologyCandidate,
  StackValidationSummary,
} from '../graph/matching';
import {
  TechnologyRecommendation,
  StackAlternativeOption,
  BridgeTechnologyCandidate,
} from '../graph/intelligence/types';

export type {
  StackSelection,
  FlexibleStackSelection,
  ArchitectureMatchResult,
  StackPathMatchResult,
  TechnologyCandidate,
  StackValidationSummary,
  TechnologyRecommendation,
  StackAlternativeOption,
  BridgeTechnologyCandidate,
};

/**
 * Aggregated Architecture Discovery result for a partial or complete automotive software stack.
 */
export interface ArchitectureDiscoveryResult {
  selection: StackSelection;
  totalSelectedCount: number;

  // 1. Matched Reference Architecture Profiles
  architectureMatches: ArchitectureMatchResult[];

  // 2. Core Runtime Layer Progress & Gap Analysis
  missingCoreLayers: StackLayerId[];
  populatedCoreLayers: StackLayerId[];
  isCompleteCoreStack: boolean;

  // 3. Recommended Next Technologies (Additive recommendations based on graph edges)
  recommendedTechnologies: TechnologyRecommendation[];

  // 4. Architectural Alternatives (Only explicit alternative relationships)
  alternativeOptions: StackAlternativeOption[];

  // 5. Relevant Automotive Stack Paths / Execution Journeys
  stackPathMatches: StackPathMatchResult[];

  // 6. Direct Knowledge Graph Relationship Validation
  validation: StackValidationSummary;

  // 7. Cross-Layer Bridge Opportunities
  bridgeOpportunities: BridgeTechnologyCandidate[];
}

/**
 * Objective change categories for What-if hypothetical comparisons.
 */
export type WhatIfImpactType = 'added' | 'removed' | 'improved' | 'reduced' | 'unchanged';

export interface WhatIfArchitectureImpact {
  profile: ArchitectureProfile;
  impactType: WhatIfImpactType;
  beforeScore: number;
  afterScore: number;
  beforeCoverage: number;
  afterCoverage: number;
  explanation: LocalizedText;
}

export interface WhatIfRelationshipChange {
  sourceTech: StackTechnology;
  targetTech: StackTechnology;
  relationship: TechnologyRelationship;
  impactType: 'added' | 'removed';
  isDirectTargetLink: boolean;
  explanation: LocalizedText;
}

export interface WhatIfPathImpact {
  path: StackPath;
  impactType: WhatIfImpactType;
  beforeScore: number;
  afterScore: number;
  beforeHopsMatched: number;
  afterHopsMatched: number;
  explanation: LocalizedText;
}

export interface WhatIfLayerImpact {
  missingLayersBefore: StackLayerId[];
  missingLayersAfter: StackLayerId[];
  isCompletenessPreserved: boolean;
  explanation: LocalizedText;
}

export interface WhatIfSafetyImpact {
  targetSafety?: FunctionalSafetyInfo;
  replacementSafety?: FunctionalSafetyInfo;
  isSameAsilLevel: boolean;
  explanation: LocalizedText;
}

/**
 * Full What-if hypothetical comparison result between current selection and hypothetical selection.
 */
export interface WhatIfComparisonResult {
  targetTechnology: StackTechnology;
  replacementTechnology: StackTechnology;
  originalSelection: StackSelection;
  hypotheticalSelection: StackSelection;

  originalDiscovery: ArchitectureDiscoveryResult;
  hypotheticalDiscovery: ArchitectureDiscoveryResult;

  architectureImpacts: WhatIfArchitectureImpact[];
  relationshipChanges: WhatIfRelationshipChange[];
  pathImpacts: WhatIfPathImpact[];
  layerImpact: WhatIfLayerImpact;
  safetyImpact: WhatIfSafetyImpact;
}

