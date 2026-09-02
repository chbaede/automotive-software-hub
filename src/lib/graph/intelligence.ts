/**
 * Knowledge Graph Intelligence & Discovery Engine (Compatibility Facade)
 *
 * Re-exports the modularized submodules:
 * - scoring: Centralized priority and deterministic scoring formulas
 * - intelligence/types: Strongly-typed data structures
 * - intelligence/relationships: Directed relationship selectors
 * - intelligence/bridges: Cross-layer bridge detection
 * - intelligence/architectures: Architecture relevance & ranking
 * - intelligence/paths: Stack Path relevance & journey ranking
 * - intelligence/recommendations: Explainable next-technology recommendations
 * - intelligence/stackInsights: Partial-stack gap analysis & builder intelligence
 * - intelligence/index: Unified 360-degree discovery profile aggregator
 */

export * from './scoring';
export * from './intelligence/index';
