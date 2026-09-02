/**
 * Canonical Scoring Model & Priority Taxonomy for Automotive Software Knowledge Graph
 *
 * Provides pure, deterministic, explainable scoring formulas used across:
 * - Direct relationship ranking
 * - Cross-layer bridge detection
 * - Architecture profile relevance
 * - Stack Path relevance
 * - Exploration candidate recommendations
 *
 * NOTE: Numeric scores are strictly internal deterministic ranking signals,
 * NOT probabilities, quality ratings, adoption metrics, or factual certainty.
 */

import { RelationshipType, RelationshipConfidence } from '../../types/relationship';

// ==========================================
// CANONICAL PRIORITY CONSTANTS
// ==========================================

/**
 * Priority weights reflecting the architectural criticality and directness
 * of each semantic relationship type in automotive software systems.
 */
export const RELATIONSHIP_PRIORITY: Record<RelationshipType, number> = {
  'runs-on': 10,        // Execution platform / runtime host foundation
  'depends-on': 9,      // Hard architectural requirement
  'integrates-with': 8, // Direct API / protocol / bridge interface
  'compatible-with': 7, // Verified technical compatibility
  'used-with': 6,       // Common deployment combination
  'implemented-by': 5,  // Realization of standard specification
  'coexists-with': 4,   // Multi-ECU domain complementary coexistence
  'related': 2,         // General ecosystem association
  'alternative': 1,     // Architectural alternative (isolated from additive recommendations)
};

/**
 * Confidence multipliers derived strictly from verified relationship documentation evidence.
 * Official specification = 1.0, Vendor product documentation = 0.85, Ecosystem verified = 0.7.
 */
export const CONFIDENCE_WEIGHT: Record<RelationshipConfidence, number> = {
  official: 1.0,
  vendor: 0.85,
  community: 0.7,
};

// ==========================================
// SCORING FORMULAS
// ==========================================

/**
 * Calculates deterministic direct relationship strength score.
 * Formula: priority * 10 * confidenceWeight
 */
export function calculateRelationshipScore(
  relType: RelationshipType,
  confidence: RelationshipConfidence = 'community'
): number {
  const priority = RELATIONSHIP_PRIORITY[relType] || 1;
  const weight = CONFIDENCE_WEIGHT[confidence] || 0.7;
  return Math.round(priority * 10 * weight);
}

/**
 * Calculates cross-layer bridge technology score.
 * Rewards diversity of bridged layers, total connectivity, and primary edge priority.
 */
export function calculateBridgeScore(
  bridgedLayersCount: number,
  neighborConnectionCount: number,
  relPriority: number,
  confidence: RelationshipConfidence = 'community'
): number {
  const weight = CONFIDENCE_WEIGHT[confidence] || 0.7;
  return Math.round(
    bridgedLayersCount * 20 +
      neighborConnectionCount * 3 +
      relPriority * 5 * weight
  );
}

/**
 * Calculates architecture profile relevance score for a given technology.
 * Explicit profile members receive a baseline score of 80 + profile member count bonus.
 * 1-hop connected neighbors receive a baseline score of 40 + matched technology count bonus.
 */
export function calculateArchitectureRelevance(
  isExplicitMember: boolean,
  memberOrMatchedCount: number
): number {
  if (isExplicitMember) {
    return Math.round(80 + memberOrMatchedCount * 3);
  }
  return Math.round(40 + memberOrMatchedCount * 2);
}

/**
 * Calculates Stack Path relevance score for a given technology.
 * Earlier and central execution hops in concise paths receive higher scores.
 */
export function calculatePathRelevance(
  totalHops: number,
  hopIndex: number
): number {
  const safeHopIndex = Math.max(0, hopIndex);
  return Math.round(70 + Math.max(0, totalHops - safeHopIndex) * 5);
}

/**
 * Calculates composite next-technology exploration recommendation score.
 * Combines direct edge score, cross-layer diversity bonus, architecture co-occurrence,
 * stack path co-occurrence, and hub centrality.
 */
export function calculateRecommendationScore(params: {
  baseRelationshipScore: number;
  isDifferentLayer: boolean;
  architectureCoOccurrenceCount: number;
  stackPathCoOccurrenceCount: number;
  isHub: boolean;
}): number {
  let score = params.baseRelationshipScore;
  if (params.isDifferentLayer) score += 15;
  score += params.architectureCoOccurrenceCount * 15;
  score += params.stackPathCoOccurrenceCount * 12;
  if (params.isHub) score += 8;
  return score;
}

