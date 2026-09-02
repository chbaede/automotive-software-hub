/**
 * Architecture Discovery Engine
 *
 * Orchestrates canonical knowledge graph matching, stack insights, gap analysis,
 * and path exploration into a single deterministic discovery domain result.
 */

import {
  FlexibleStackSelection,
  normalizeStackSelection,
  getSelectedTechIds,
  validateStack,
  matchArchitectures,
  matchStackPaths,
} from '../graph/matching';
import { getStackInsights } from '../graph/intelligence/stackInsights';
import { ArchitectureDiscoveryResult } from './types';

/**
 * Discovers architectures, missing layers, execution journeys, and recommendations
 * for any given automotive software stack selection.
 *
 * 100% deterministic, client-side, and reuses canonical knowledge graph engines.
 */
export function discoverArchitecture(rawSelection: FlexibleStackSelection): ArchitectureDiscoveryResult {
  const selection = normalizeStackSelection(rawSelection);
  const totalSelectedCount = getSelectedTechIds(selection).length;

  // Re-use canonical Stack Intelligence Report
  const insights = getStackInsights(selection);

  // Re-use canonical Stack Builder Matching & Validation engines
  const architectureMatches = matchArchitectures(selection);
  const stackPathMatches = matchStackPaths(selection);
  const validation = validateStack(selection);

  return {
    selection,
    totalSelectedCount,
    architectureMatches,
    missingCoreLayers: insights.gapAnalysis.missingCoreLayers,
    populatedCoreLayers: insights.gapAnalysis.populatedCoreLayers,
    isCompleteCoreStack: insights.gapAnalysis.isCompleteCoreStack,
    recommendedTechnologies: insights.candidateRecommendations,
    alternativeOptions: insights.alternativeOptions,
    stackPathMatches,
    validation,
    bridgeOpportunities: insights.bridgeOpportunities,
  };
}

