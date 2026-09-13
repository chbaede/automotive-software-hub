/**
 * Canonical re-export bridge for backwards compatibility.
 *
 * Architectural boundary:
 * - Domain entities, lookup maps & selectors -> import from 'src/lib/domain'
 * - Graph relationships, traversal & intelligence -> import from 'src/lib/graph'
 */
export * from '../lib/domain';
export * from '../lib/graph';

