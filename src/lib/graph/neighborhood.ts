import { stackTechnologies } from '../../data/stackTechnologies';
import { StackTechnology } from '../../types/stack';
import { TechnologyRelationship, RelationshipType, RELATIONSHIP_METADATA } from '../../types/relationship';
import { technologyById } from '../domain';
import {
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  getTechnologyDegree,
} from './index';

export interface NeighborhoodGraphNode {
  technology: StackTechnology;
  distance: 0 | 1 | 2;
  direction: 'focal' | 'outgoing' | 'incoming' | 'both';
  relationshipTypes: RelationshipType[];
  connectionCount: number;
  layerId: string;
  isHub: boolean;
}

export interface NeighborhoodGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: TechnologyRelationship;
  isForward: boolean;
  isSymmetric: boolean;
  distance: 1 | 2;
}

export interface NeighborhoodGraphSummary {
  totalNeighbors: number;
  depth1Count: number;
  depth2Count: number;
  relationshipsByType: Record<RelationshipType, number>;
  layersCount: number;
  connectedLayers: string[];
}

export interface NeighborhoodGraphData {
  focalTechnology: StackTechnology;
  nodes: NeighborhoodGraphNode[];
  edges: NeighborhoodGraphEdge[];
  summary: NeighborhoodGraphSummary;
}

export interface NeighborhoodOptions {
  depth?: 1 | 2;
  relationshipType?: RelationshipType | 'all';
  layerId?: string | 'all';
  direction?: 'all' | 'outgoing' | 'incoming';
  maxDepth2Nodes?: number;
}

/**
 * Extracts the 1-hop or 2-hop neighborhood graph centered around a focal technology.
 * 100% derived from canonical stackRelationships and stackTechnologies datasets.
 */
export function getNeighborhoodGraph(
  technologyId: string,
  options?: NeighborhoodOptions
): NeighborhoodGraphData | null {
  const focalTech = technologyById.get(technologyId);
  if (!focalTech) return null;

  const depth = options?.depth ?? 1;
  const relTypeFilter = options?.relationshipType || 'all';
  const layerFilter = options?.layerId || 'all';
  const directionFilter = options?.direction || 'all';
  const maxDepth2 = options?.maxDepth2Nodes ?? 35;

  const nodesMap = new Map<string, NeighborhoodGraphNode>();
  const edgesMap = new Map<string, NeighborhoodGraphEdge>();
  const relationshipsByTypeCount: Record<RelationshipType, number> = {
    'depends-on': 0,
    'runs-on': 0,
    'implemented-by': 0,
    'used-with': 0,
    'integrates-with': 0,
    'coexists-with': 0,
    'alternative': 0,
    'compatible-with': 0,
    'related': 0,
  };

  // 1. Add Focal Node (Distance 0)
  const focalDegree = getTechnologyDegree(focalTech.id);
  nodesMap.set(focalTech.id, {
    technology: focalTech,
    distance: 0,
    direction: 'focal',
    relationshipTypes: [],
    connectionCount: focalDegree.connectionCount,
    layerId: focalTech.layerId,
    isHub: focalDegree.connectionCount >= 5,
  });

  const outgoingFromFocal = outgoingRelationshipsByTechnologyId.get(focalTech.id) || [];
  const incomingToFocal = incomingRelationshipsByTechnologyId.get(focalTech.id) || [];

  const depth1Ids = new Set<string>();
  const neighborDirections = new Map<string, { outgoing: boolean; incoming: boolean }>();
  const neighborRelTypes = new Map<string, Set<RelationshipType>>();

  // Process Outgoing Relationships from Focal
  if (directionFilter === 'all' || directionFilter === 'outgoing') {
    outgoingFromFocal.forEach((rel) => {
      if (relTypeFilter !== 'all' && rel.type !== relTypeFilter) return;

      const targetTech = technologyById.get(rel.targetId);
      if (!targetTech) return;
      if (layerFilter !== 'all' && targetTech.layerId !== layerFilter) return;

      depth1Ids.add(targetTech.id);
      const dirs = neighborDirections.get(targetTech.id) || { outgoing: false, incoming: false };
      dirs.outgoing = true;
      neighborDirections.set(targetTech.id, dirs);

      const rTypes = neighborRelTypes.get(targetTech.id) || new Set<RelationshipType>();
      rTypes.add(rel.type);
      neighborRelTypes.set(targetTech.id, rTypes);

      const edgeId = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
      if (!edgesMap.has(edgeId)) {
        edgesMap.set(edgeId, {
          id: edgeId,
          sourceId: rel.sourceId,
          targetId: rel.targetId,
          relationship: rel,
          isForward: true,
          isSymmetric: Boolean(RELATIONSHIP_METADATA[rel.type]?.isSymmetric),
          distance: 1,
        });
        relationshipsByTypeCount[rel.type]++;
      }
    });
  }

  // Process Incoming Relationships to Focal
  if (directionFilter === 'all' || directionFilter === 'incoming') {
    incomingToFocal.forEach((rel) => {
      if (relTypeFilter !== 'all' && rel.type !== relTypeFilter) return;

      const sourceTech = technologyById.get(rel.sourceId);
      if (!sourceTech) return;
      if (layerFilter !== 'all' && sourceTech.layerId !== layerFilter) return;

      depth1Ids.add(sourceTech.id);
      const dirs = neighborDirections.get(sourceTech.id) || { outgoing: false, incoming: false };
      dirs.incoming = true;
      neighborDirections.set(sourceTech.id, dirs);

      const rTypes = neighborRelTypes.get(sourceTech.id) || new Set<RelationshipType>();
      rTypes.add(rel.type);
      neighborRelTypes.set(sourceTech.id, rTypes);

      const edgeId = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
      if (!edgesMap.has(edgeId)) {
        edgesMap.set(edgeId, {
          id: edgeId,
          sourceId: rel.sourceId,
          targetId: rel.targetId,
          relationship: rel,
          isForward: true,
          isSymmetric: Boolean(RELATIONSHIP_METADATA[rel.type]?.isSymmetric),
          distance: 1,
        });
        relationshipsByTypeCount[rel.type]++;
      }
    });
  }

  // Add 1-Hop Nodes to Map
  depth1Ids.forEach((id) => {
    const tech = technologyById.get(id);
    if (!tech) return;

    const dirs = neighborDirections.get(id);
    let direction: 'outgoing' | 'incoming' | 'both' = 'both';
    if (dirs?.outgoing && !dirs?.incoming) direction = 'outgoing';
    else if (!dirs?.outgoing && dirs?.incoming) direction = 'incoming';

    const degree = getTechnologyDegree(tech.id);
    nodesMap.set(tech.id, {
      technology: tech,
      distance: 1,
      direction,
      relationshipTypes: Array.from(neighborRelTypes.get(id) || []),
      connectionCount: degree.connectionCount,
      layerId: tech.layerId,
      isHub: degree.connectionCount >= 5,
    });
  });

  // Cross-Edges between 1-Hop Neighbors
  depth1Ids.forEach((id1) => {
    const outgoing = outgoingRelationshipsByTechnologyId.get(id1) || [];
    outgoing.forEach((rel) => {
      if (depth1Ids.has(rel.targetId)) {
        if (relTypeFilter !== 'all' && rel.type !== relTypeFilter) return;
        const edgeId = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
        if (!edgesMap.has(edgeId)) {
          edgesMap.set(edgeId, {
            id: edgeId,
            sourceId: rel.sourceId,
            targetId: rel.targetId,
            relationship: rel,
            isForward: true,
            isSymmetric: Boolean(RELATIONSHIP_METADATA[rel.type]?.isSymmetric),
            distance: 1,
          });
          relationshipsByTypeCount[rel.type]++;
        }
      }
    });
  });

  // 2-Hop Traversal (if depth === 2)
  let depth2Count = 0;
  if (depth === 2) {
    const depth2Candidates = new Map<string, { neighborOf: string; rel: TechnologyRelationship }>();

    depth1Ids.forEach((d1Id) => {
      const outRels = outgoingRelationshipsByTechnologyId.get(d1Id) || [];
      outRels.forEach((rel) => {
        if (rel.targetId === focalTech.id || depth1Ids.has(rel.targetId)) return;
        if (relTypeFilter !== 'all' && rel.type !== relTypeFilter) return;

        const targetTech = technologyById.get(rel.targetId);
        if (!targetTech) return;
        if (layerFilter !== 'all' && targetTech.layerId !== layerFilter) return;

        if (!depth2Candidates.has(targetTech.id) && depth2Candidates.size < maxDepth2) {
          depth2Candidates.set(targetTech.id, { neighborOf: d1Id, rel });
        }
      });

      const inRels = incomingRelationshipsByTechnologyId.get(d1Id) || [];
      inRels.forEach((rel) => {
        if (rel.sourceId === focalTech.id || depth1Ids.has(rel.sourceId)) return;
        if (relTypeFilter !== 'all' && rel.type !== relTypeFilter) return;

        const srcTech = technologyById.get(rel.sourceId);
        if (!srcTech) return;
        if (layerFilter !== 'all' && srcTech.layerId !== layerFilter) return;

        if (!depth2Candidates.has(srcTech.id) && depth2Candidates.size < maxDepth2) {
          depth2Candidates.set(srcTech.id, { neighborOf: d1Id, rel });
        }
      });
    });

    depth2Candidates.forEach(({ neighborOf, rel }, d2Id) => {
      const tech = technologyById.get(d2Id);
      if (!tech) return;

      const degree = getTechnologyDegree(tech.id);
      nodesMap.set(tech.id, {
        technology: tech,
        distance: 2,
        direction: rel.sourceId === neighborOf ? 'outgoing' : 'incoming',
        relationshipTypes: [rel.type],
        connectionCount: degree.connectionCount,
        layerId: tech.layerId,
        isHub: degree.connectionCount >= 5,
      });
      depth2Count++;

      const edgeId = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
      if (!edgesMap.has(edgeId)) {
        edgesMap.set(edgeId, {
          id: edgeId,
          sourceId: rel.sourceId,
          targetId: rel.targetId,
          relationship: rel,
          isForward: true,
          isSymmetric: Boolean(RELATIONSHIP_METADATA[rel.type]?.isSymmetric),
          distance: 2,
        });
        relationshipsByTypeCount[rel.type]++;
      }
    });
  }

  const nodes = Array.from(nodesMap.values());
  const edges = Array.from(edgesMap.values());

  const connectedLayersSet = new Set<string>();
  nodes.forEach((n) => {
    if (n.distance > 0) {
      connectedLayersSet.add(n.layerId);
    }
  });

  return {
    focalTechnology: focalTech,
    nodes,
    edges,
    summary: {
      totalNeighbors: depth1Ids.size + depth2Count,
      depth1Count: depth1Ids.size,
      depth2Count,
      relationshipsByType: relationshipsByTypeCount,
      layersCount: connectedLayersSet.size,
      connectedLayers: Array.from(connectedLayersSet),
    },
  };
}

