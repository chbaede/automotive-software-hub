/**
 * Shared Type Definitions for Knowledge Graph Intelligence & Discovery Engine
 */

import { StackLayerId, StackTechnology } from '../../../types/stack';
import { ArchitectureProfile, StackPath } from '../../../types/architecture';
import {
  TechnologyRelationship,
  RelationshipConfidence,
} from '../../../types/relationship';
import { LocalizedText } from '../../../types/i18n';
import {
  StackSelection,
  StackValidationSummary,
  ArchitectureMatchResult,
  StackPathMatchResult,
} from '../../builder/stackBuilderEngine';

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

