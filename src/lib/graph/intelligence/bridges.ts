/**
 * Cross-Layer Bridge Technology Detection for Knowledge Graph Intelligence
 *
 * Identifies technologies that serve as architectural bridges connecting
 * the currently inspected technology to two or more different stack layers.
 */

import { technologyById, graphAdjacencyByTechnologyId } from '../index';
import { RELATIONSHIP_PRIORITY, calculateBridgeScore } from '../scoring';
import { BridgeTechnologyCandidate } from './types';

/**
 * Identifies technologies connected to the given technology that act as multi-layer bridges,
 * connecting this technology to different layers in the automotive stack.
 */
export function getBridgeTechnologies(
  technologyId: string,
  options?: { minBridgedLayers?: number; maxResults?: number }
): BridgeTechnologyCandidate[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const minBridgedLayers = options?.minBridgedLayers ?? 2;
  const maxResults = options?.maxResults ?? 6;

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const candidates: BridgeTechnologyCandidate[] = [];
  const seenNeighborIds = new Set<string>();

  edges.forEach((edge) => {
    // Exclude alternatives from bridge discovery
    if (edge.relationship.type === 'alternative') return;
    if (seenNeighborIds.has(edge.neighborId)) return;
    seenNeighborIds.add(edge.neighborId);

    const neighbor = technologyById.get(edge.neighborId);
    if (!neighbor) return;

    // Discover what OTHER layers this neighbor connects to (excluding current tech's layer)
    const neighborEdges = graphAdjacencyByTechnologyId.get(neighbor.id) || [];
    const connectedLayersSet = new Set<string>();

    neighborEdges.forEach((nEdge) => {
      // Only meaningful relationship edges contribute to layer bridging
      if (nEdge.relationship.type === 'alternative') return;
      const nNeighbor = technologyById.get(nEdge.neighborId);
      if (nNeighbor && nNeighbor.layerId !== currentTech.layerId) {
        connectedLayersSet.add(nNeighbor.layerId);
      }
    });

    const bridgedLayers = Array.from(connectedLayersSet).sort();

    if (bridgedLayers.length >= minBridgedLayers) {
      const relPriority = RELATIONSHIP_PRIORITY[edge.relationship.type] || 1;
      const score = calculateBridgeScore(
        bridgedLayers.length,
        neighborEdges.length,
        relPriority,
        edge.relationship.confidence || 'community'
      );

      candidates.push({
        technology: neighbor,
        layerId: neighbor.layerId,
        relationship: edge.relationship,
        isOutgoing: edge.isForward,
        bridgedLayers,
        bridgedLayersCount: bridgedLayers.length,
        score,
        reason: {
          en: `Connects ${currentTech.name} to ${bridgedLayers.length} other stack layers (${bridgedLayers.join(', ')})`,
          ko: `${currentTech.name}을(를) ${bridgedLayers.length}개의 다른 스택 계층(${bridgedLayers.join(', ')})과 연결하는 브리지 기술`,
        },
      });
    }
  });

  return candidates
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.technology.name.localeCompare(b.technology.name) ||
        a.technology.id.localeCompare(b.technology.id)
    )
    .slice(0, maxResults);
}

