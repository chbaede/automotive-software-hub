/**
 * Stack Builder Engine & URL State Integration
 *
 * Re-exports canonical graph validation and matching domain algorithms from `src/lib/graph/matching.ts`
 * and provides URL serialization/deserialization for deep links with multi-technology support.
 */

import { StackLayerId } from '../../types/stack';
import { technologyById } from '../graph';
import {
  StackSelection,
  FlexibleStackSelection,
  normalizeStackSelection,
} from '../graph/matching';

// Re-export all canonical layer constants, domain types, and matching algorithms
export * from '../graph/matching';

/**
 * Encodes FlexibleStackSelection into URLSearchParams for shareable deep links.
 * Supports multi-technology selections per layer via comma-separated IDs.
 */
export function encodeStackToSearchParams(rawSelection: FlexibleStackSelection): URLSearchParams {
  const selection = normalizeStackSelection(rawSelection);
  const params = new URLSearchParams();

  Object.entries(selection).forEach(([layerId, techIds]) => {
    if (techIds && techIds.length > 0) {
      params.set(layerId, techIds.join(','));
    }
  });

  return params;
}

/**
 * Decodes URLSearchParams into a validated StackSelection.
 * Supports both comma-separated lists and repeated query parameters.
 * Ignores non-existent technology IDs and mismatched layer IDs.
 */
export function decodeStackFromSearchParams(searchParams: URLSearchParams): StackSelection {
  const rawSelection: Partial<Record<StackLayerId, string[]>> = {};

  searchParams.forEach((value, layerKey) => {
    const rawIds = value.split(',').map((s) => s.trim()).filter(Boolean);
    rawIds.forEach((techId) => {
      const tech = technologyById.get(techId);
      if (tech && tech.layerId === layerKey) {
        const list = rawSelection[tech.layerId] || [];
        if (!list.includes(tech.id)) {
          list.push(tech.id);
        }
        rawSelection[tech.layerId] = list;
      }
    });
  });

  return normalizeStackSelection(rawSelection);
}
