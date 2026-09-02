import { stackTechnologies } from '../../data/stackTechnologies';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackRelationships } from '../../data/stackRelationships';
import { stackPaths } from '../../data/stackPaths';
import { StackTechnology } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { TechnologyRelationship, RelationshipType } from '../../types/relationship';

// ==========================================
// CORE GRAPH INDEXES (Authoritative Knowledge Graph)
// ==========================================

// Index: Technology by ID
export const technologyById = new Map<string, StackTechnology>(
  stackTechnologies.map((tech) => [tech.id, tech])
);

// Index: Architecture Profile by ID
export const profileById = new Map<string, ArchitectureProfile>(
  architectureProfiles.map((prof) => [prof.id, prof])
);

// Index: Architecture Profiles by Technology ID
export const profilesByTechnologyId = new Map<string, ArchitectureProfile[]>();
architectureProfiles.forEach((profile) => {
  profile.technologyIds.forEach((techId) => {
    const list = profilesByTechnologyId.get(techId) || [];
    list.push(profile);
    profilesByTechnologyId.set(techId, list);
  });
});

// Index: Stack Paths by ID
export const pathById = new Map<string, StackPath>(
  stackPaths.map((path) => [path.id, path])
);

// Index: Stack Paths by Technology ID
export const pathsByTechnologyId = new Map<string, StackPath[]>();
stackPaths.forEach((path) => {
  path.hops.forEach((hop) => {
    const list = pathsByTechnologyId.get(hop.technologyId) || [];
    if (!list.some((p) => p.id === path.id)) {
      list.push(path);
      pathsByTechnologyId.set(hop.technologyId, list);
    }
  });
});

// Adjacency Edge Definition for Graph Traversal
export interface AdjacencyEdge {
  neighborId: string;
  relationship: TechnologyRelationship;
  isForward: boolean;
}

// Index: Canonical Undirected Adjacency by Technology ID
export const graphAdjacencyByTechnologyId = new Map<string, AdjacencyEdge[]>();

// Index: Outgoing Relationships by Source Technology ID
export const outgoingRelationshipsByTechnologyId = new Map<string, TechnologyRelationship[]>();

// Index: Incoming Relationships by Target Technology ID
export const incomingRelationshipsByTechnologyId = new Map<string, TechnologyRelationship[]>();

// Build canonical relationship & adjacency indexes in a single optimized pass
stackRelationships.forEach((rel) => {
  // Outgoing
  const outList = outgoingRelationshipsByTechnologyId.get(rel.sourceId) || [];
  outList.push(rel);
  outgoingRelationshipsByTechnologyId.set(rel.sourceId, outList);

  // Incoming
  const inList = incomingRelationshipsByTechnologyId.get(rel.targetId) || [];
  inList.push(rel);
  incomingRelationshipsByTechnologyId.set(rel.targetId, inList);

  // Undirected Adjacency (Forward & Reverse edges)
  const fwdList = graphAdjacencyByTechnologyId.get(rel.sourceId) || [];
  fwdList.push({ neighborId: rel.targetId, relationship: rel, isForward: true });
  graphAdjacencyByTechnologyId.set(rel.sourceId, fwdList);

  const revList = graphAdjacencyByTechnologyId.get(rel.targetId) || [];
  revList.push({ neighborId: rel.sourceId, relationship: rel, isForward: false });
  graphAdjacencyByTechnologyId.set(rel.targetId, revList);
});

// Index: Unique Neighbor Technologies by Technology ID (Canonical Source: stackRelationships)
export const neighborsByTechnologyId = new Map<string, StackTechnology[]>();

stackTechnologies.forEach((tech) => {
  const edges = graphAdjacencyByTechnologyId.get(tech.id) || [];
  const uniqueNeighborsMap = new Map<string, StackTechnology>();

  edges.forEach((edge) => {
    if (edge.neighborId !== tech.id) {
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        uniqueNeighborsMap.set(edge.neighborId, neighbor);
      }
    }
  });

  neighborsByTechnologyId.set(tech.id, Array.from(uniqueNeighborsMap.values()));
});

// Index: Technologies by Layer ID
export const technologiesByLayerId = new Map<string, StackTechnology[]>();
stackTechnologies.forEach((tech) => {
  const list = technologiesByLayerId.get(tech.layerId) || [];
  list.push(tech);
  technologiesByLayerId.set(tech.layerId, list);
});

// ==========================================
// GRAPH TRAVERSAL & QUERY OPERATIONS
// ==========================================

/**
 * Returns the technology matching the ID, or undefined.
 */
export function getTechnology(id: string): StackTechnology | undefined {
  return technologyById.get(id);
}

/**
 * Returns outgoing relationships from a technology node.
 */
export function getOutgoingRelationships(id: string): TechnologyRelationship[] {
  return outgoingRelationshipsByTechnologyId.get(id) || [];
}

/**
 * Returns incoming relationships targeting a technology node.
 */
export function getIncomingRelationships(id: string): TechnologyRelationship[] {
  return incomingRelationshipsByTechnologyId.get(id) || [];
}

/**
 * Returns all relationships (outgoing and incoming) associated with a technology node.
 */
export function getRelationshipsForTechnology(id: string): {
  outgoing: TechnologyRelationship[];
  incoming: TechnologyRelationship[];
  all: TechnologyRelationship[];
} {
  const outgoing = getOutgoingRelationships(id);
  const incoming = getIncomingRelationships(id);
  return {
    outgoing,
    incoming,
    all: [...outgoing, ...incoming],
  };
}

export const getTechnologyRelationships = getRelationshipsForTechnology;

/**
 * Returns all 1-hop unique neighbor technologies directly connected via relationships.
 * Canonical Source: stackRelationships.
 */
export function getNeighbors(id: string): StackTechnology[] {
  return neighborsByTechnologyId.get(id) || [];
}

/**
 * Returns neighbors filtered by a specific relationship type.
 */
export function getNeighborsByRelationshipType(
  id: string,
  type: RelationshipType
): { outgoing: StackTechnology[]; incoming: StackTechnology[] } {
  const outgoingTechs: StackTechnology[] = [];
  const incomingTechs: StackTechnology[] = [];

  const outgoing = getOutgoingRelationships(id);
  outgoing.forEach((rel) => {
    if (rel.type === type) {
      const target = technologyById.get(rel.targetId);
      if (target) outgoingTechs.push(target);
    }
  });

  const incoming = getIncomingRelationships(id);
  incoming.forEach((rel) => {
    if (rel.type === type) {
      const source = technologyById.get(rel.sourceId);
      if (source) incomingTechs.push(source);
    }
  });

  return { outgoing: outgoingTechs, incoming: incomingTechs };
}

/**
 * Returns all technologies belonging to a specific stack layer.
 */
export function getTechnologiesByLayer(layerId: string): StackTechnology[] {
  return technologiesByLayerId.get(layerId) || [];
}

/**
 * Returns all Architecture Profiles referencing this technology.
 */
export function getArchitecturesForTechnology(id: string): ArchitectureProfile[] {
  return profilesByTechnologyId.get(id) || [];
}

/**
 * Returns all Stack Paths containing this technology.
 */
export function getStackPathsForTechnology(id: string): StackPath[] {
  return pathsByTechnologyId.get(id) || [];
}

/**
 * Fast graph traversal helper returning all directly connected Stack Technologies
 * from the canonical relationship dataset (stackRelationships).
 */
export function getRelatedTechnologies(techId: string): StackTechnology[] {
  return getNeighbors(techId);
}

export interface GroupedRelationshipItem {
  relationship: TechnologyRelationship;
  targetOrSourceTech: StackTechnology;
  isOutgoing: boolean;
}

/**
 * Returns all relationships for a given technology grouped by relationship type.
 */
export function getGroupedTechnologyRelationships(techId: string): Map<string, GroupedRelationshipItem[]> {
  const groups = new Map<string, GroupedRelationshipItem[]>();

  const outgoing = outgoingRelationshipsByTechnologyId.get(techId) || [];
  outgoing.forEach((rel) => {
    const targetTech = technologyById.get(rel.targetId);
    if (targetTech) {
      const list = groups.get(rel.type) || [];
      list.push({ relationship: rel, targetOrSourceTech: targetTech, isOutgoing: true });
      groups.set(rel.type, list);
    }
  });

  const incoming = incomingRelationshipsByTechnologyId.get(techId) || [];
  incoming.forEach((rel) => {
    const sourceTech = technologyById.get(rel.sourceId);
    if (sourceTech) {
      const list = groups.get(rel.type) || [];
      list.push({ relationship: rel, targetOrSourceTech: sourceTech, isOutgoing: false });
      groups.set(rel.type, list);
    }
  });

  return groups;
}

// ==========================================
// GRAPH METRICS & CONTEXT
// ==========================================

export interface TechnologyDegreeInfo {
  connectionCount: number; // Unique connected neighbor technologies
  relationshipCount: number; // Total relationship records (inDegree + outDegree)
  inDegree: number; // Incoming relationship records
  outDegree: number; // Outgoing relationship records
  connectedLayers: string[];
  connectedLayersCount: number;
  totalDegree: number; // Compatibility alias to connectionCount
}

/**
 * Returns accurate graph connection metrics for a specific technology.
 */
export function getTechnologyDegree(id: string): TechnologyDegreeInfo {
  const outgoing = getOutgoingRelationships(id);
  const incoming = getIncomingRelationships(id);
  const uniqueNeighbors = getNeighbors(id);

  const connectedLayersSet = new Set<string>();
  uniqueNeighbors.forEach((neighbor) => {
    connectedLayersSet.add(neighbor.layerId);
  });

  const connectionCount = uniqueNeighbors.length;
  const relationshipCount = outgoing.length + incoming.length;

  return {
    connectionCount,
    relationshipCount,
    inDegree: incoming.length,
    outDegree: outgoing.length,
    connectedLayers: Array.from(connectedLayersSet),
    connectedLayersCount: connectedLayersSet.size,
    totalDegree: connectionCount,
  };
}

export interface TechnologyGraphContext {
  technology: StackTechnology;
  connectionCount: number; // Unique neighboring technologies
  relationshipCount: number; // Total relationship records
  degree: number; // Compatibility alias to connectionCount
  inDegree: number;
  outDegree: number;
  connectedLayers: string[];
  connectedLayersCount: number;
  architectures: ArchitectureProfile[];
  stackPaths: StackPath[];
  isHub: boolean; // connectionCount >= 5
  isCrossLayer: boolean; // connectedLayersCount >= 3
  isBridge: boolean; // Compatibility alias for isCrossLayer
}

/**
 * Returns comprehensive graph context for a technology node.
 */
export function getTechnologyGraphContext(id: string): TechnologyGraphContext | null {
  const tech = technologyById.get(id);
  if (!tech) return null;

  const degreeInfo = getTechnologyDegree(id);
  const architectures = getArchitecturesForTechnology(id);
  const stackPaths = getStackPathsForTechnology(id);

  return {
    technology: tech,
    connectionCount: degreeInfo.connectionCount,
    relationshipCount: degreeInfo.relationshipCount,
    degree: degreeInfo.connectionCount,
    inDegree: degreeInfo.inDegree,
    outDegree: degreeInfo.outDegree,
    connectedLayers: degreeInfo.connectedLayers,
    connectedLayersCount: degreeInfo.connectedLayersCount,
    architectures,
    stackPaths,
    isHub: degreeInfo.connectionCount >= 5,
    isCrossLayer: degreeInfo.connectedLayersCount >= 3,
    isBridge: degreeInfo.connectedLayersCount >= 3,
  };
}

// ==========================================
// SHORTEST GRAPH PATH FINDER (BFS with Relationship Filtering)
// ==========================================

export interface GraphPathStep {
  fromTechnology: StackTechnology;
  toTechnology: StackTechnology;
  relationship: TechnologyRelationship;
  isForward: boolean;
}

export interface ShortestPathResult {
  sourceId: string;
  targetId: string;
  found: boolean;
  nodes: StackTechnology[];
  steps: GraphPathStep[];
  hopCount: number;
}

export interface ShortestPathOptions {
  relationshipTypes?: RelationshipType[];
}

/**
 * Finds the shortest graph traversal path between sourceId and targetId using Breadth-First Search (BFS).
 * Supports optional filtering by relationshipTypes.
 * Works across both forward and reverse typed relationships using precomputed undirected adjacency.
 * Implements an indexed queue pointer for O(1) dequeue performance.
 */
export function findShortestPath(
  sourceId: string,
  targetId: string,
  options?: ShortestPathOptions
): ShortestPathResult {
  const sourceTech = technologyById.get(sourceId);
  const targetTech = technologyById.get(targetId);

  if (!sourceTech || !targetTech) {
    return { sourceId, targetId, found: false, nodes: [], steps: [], hopCount: 0 };
  }

  if (sourceId === targetId) {
    return { sourceId, targetId, found: true, nodes: [sourceTech], steps: [], hopCount: 0 };
  }

  const allowedTypes = options?.relationshipTypes && options.relationshipTypes.length > 0
    ? new Set(options.relationshipTypes)
    : null;

  // BFS Queue: [currentId, pathSoFar, stepsSoFar]
  const queue: Array<{
    currentId: string;
    path: string[];
    steps: GraphPathStep[];
  }> = [{ currentId: sourceId, path: [sourceId], steps: [] }];

  let queueIndex = 0;
  const visited = new Set<string>([sourceId]);

  while (queueIndex < queue.length) {
    const current = queue[queueIndex++];

    if (current.currentId === targetId) {
      const nodes = current.path
        .map((id) => technologyById.get(id))
        .filter((t): t is StackTechnology => t !== undefined);
      return {
        sourceId,
        targetId,
        found: true,
        nodes,
        steps: current.steps,
        hopCount: current.steps.length,
      };
    }

    const edges = graphAdjacencyByTechnologyId.get(current.currentId) || [];
    for (const edge of edges) {
      // Filter by relationship type if specified
      if (allowedTypes && !allowedTypes.has(edge.relationship.type)) {
        continue;
      }

      if (!visited.has(edge.neighborId)) {
        visited.add(edge.neighborId);
        const fromTech = technologyById.get(current.currentId);
        const toTech = technologyById.get(edge.neighborId);

        if (fromTech && toTech) {
          const newStep: GraphPathStep = {
            fromTechnology: fromTech,
            toTechnology: toTech,
            relationship: edge.relationship,
            isForward: edge.isForward,
          };
          queue.push({
            currentId: edge.neighborId,
            path: [...current.path, edge.neighborId],
            steps: [...current.steps, newStep],
          });
        }
      }
    }
  }

  return { sourceId, targetId, found: false, nodes: [], steps: [], hopCount: 0 };
}

// ==========================================
// GRAPH TOPOLOGY INSIGHTS
// ==========================================

export interface GraphHubInsight {
  technology: StackTechnology;
  connectionCount: number; // Unique neighbor technologies
  relationshipCount: number; // Total relationship records
  degree: number; // Compatibility alias to connectionCount
  connectedLayersCount: number;
  connectedLayers: string[];
  architecturesCount: number;
  stackPathsCount: number;
}

export interface CrossLayerTechnologyInsight {
  technology: StackTechnology;
  connectedLayersCount: number;
  connectedLayers: string[];
  connectionCount: number;
  relationshipCount: number;
  degree: number; // Compatibility alias
}

export type BridgeTechnologyInsight = CrossLayerTechnologyInsight;

export interface GraphInsightsData {
  totalNodes: number;
  totalEdges: number;
  averageConnections: number; // Average unique connections per node
  averageDegree: number; // Compatibility alias to averageConnections
  averageRelationships: number; // Average relationship records per node
  topHubs: GraphHubInsight[];
  crossLayerTechnologies: CrossLayerTechnologyInsight[];
  bridgeTechnologies: BridgeTechnologyInsight[]; // Compatibility alias
  layerDistribution: Array<{ layerId: string; count: number }>;
}

/**
 * Computes high-level topology insights across the entire knowledge graph.
 */
export function getGraphInsights(): GraphInsightsData {
  const totalNodes = stackTechnologies.length;
  const totalEdges = stackRelationships.length;

  const allNodeMetrics = stackTechnologies.map((tech) => {
    const degreeInfo = getTechnologyDegree(tech.id);
    const archs = getArchitecturesForTechnology(tech.id);
    const paths = getStackPathsForTechnology(tech.id);
    return {
      technology: tech,
      connectionCount: degreeInfo.connectionCount,
      relationshipCount: degreeInfo.relationshipCount,
      degree: degreeInfo.connectionCount,
      connectedLayersCount: degreeInfo.connectedLayersCount,
      connectedLayers: degreeInfo.connectedLayers,
      architecturesCount: archs.length,
      stackPathsCount: paths.length,
    };
  });

  const totalConnections = allNodeMetrics.reduce((sum, item) => sum + item.connectionCount, 0);
  const totalRelationships = allNodeMetrics.reduce((sum, item) => sum + item.relationshipCount, 0);

  const averageConnections = totalNodes > 0 ? parseFloat((totalConnections / totalNodes).toFixed(2)) : 0;
  const averageRelationships = totalNodes > 0 ? parseFloat((totalRelationships / totalNodes).toFixed(2)) : 0;

  // Top Hubs (Most Connected Technologies): sorted by connectionCount descending, then relationshipCount
  const topHubs = [...allNodeMetrics]
    .sort((a, b) => b.connectionCount - a.connectionCount || b.relationshipCount - a.relationshipCount)
    .slice(0, 10);

  // Cross-Layer Technologies: connected to 3 or more distinct stack layers
  const crossLayerTechnologies = [...allNodeMetrics]
    .filter((m) => m.connectedLayersCount >= 3)
    .sort((a, b) => b.connectedLayersCount - a.connectedLayersCount || b.connectionCount - a.connectionCount)
    .slice(0, 10)
    .map((m) => ({
      technology: m.technology,
      connectedLayersCount: m.connectedLayersCount,
      connectedLayers: m.connectedLayers,
      connectionCount: m.connectionCount,
      relationshipCount: m.relationshipCount,
      degree: m.connectionCount,
    }));

  // Layer Distribution
  const layerDistribution = Array.from(technologiesByLayerId.entries()).map(([layerId, techs]) => ({
    layerId,
    count: techs.length,
  }));

  return {
    totalNodes,
    totalEdges,
    averageConnections,
    averageDegree: averageConnections,
    averageRelationships,
    topHubs,
    crossLayerTechnologies,
    bridgeTechnologies: crossLayerTechnologies,
    layerDistribution,
  };
}
