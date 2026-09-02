import { stackTechnologies } from '../../data/stackTechnologies';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackRelationships } from '../../data/stackRelationships';
import { stackPaths } from '../../data/stackPaths';
import { StackTechnology } from '../../types/stack';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { TechnologyRelationship, RelationshipType } from '../../types/relationship';

// ==========================================
// CORE GRAPH INDEXES
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

// Index: Outgoing Relationships by Source Technology ID
export const outgoingRelationshipsByTechnologyId = new Map<string, TechnologyRelationship[]>();

// Index: Incoming Relationships by Target Technology ID
export const incomingRelationshipsByTechnologyId = new Map<string, TechnologyRelationship[]>();

stackRelationships.forEach((rel) => {
  // Outgoing
  const outList = outgoingRelationshipsByTechnologyId.get(rel.sourceId) || [];
  outList.push(rel);
  outgoingRelationshipsByTechnologyId.set(rel.sourceId, outList);

  // Incoming
  const inList = incomingRelationshipsByTechnologyId.get(rel.targetId) || [];
  inList.push(rel);
  incomingRelationshipsByTechnologyId.set(rel.targetId, inList);
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
 * Returns all 1-hop neighbor technologies directly connected via relationships.
 */
export function getNeighbors(id: string): StackTechnology[] {
  const neighborsMap = new Map<string, StackTechnology>();

  const outgoing = getOutgoingRelationships(id);
  outgoing.forEach((rel) => {
    const target = technologyById.get(rel.targetId);
    if (target && target.id !== id) {
      neighborsMap.set(target.id, target);
    }
  });

  const incoming = getIncomingRelationships(id);
  incoming.forEach((rel) => {
    const source = technologyById.get(rel.sourceId);
    if (source && source.id !== id) {
      neighborsMap.set(source.id, source);
    }
  });

  return Array.from(neighborsMap.values());
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
 * via semantic relationships or fallback related IDs.
 */
export function getRelatedTechnologies(techId: string): StackTechnology[] {
  const currentTech = technologyById.get(techId);
  if (!currentTech) return [];

  const resultSet = new Map<string, StackTechnology>();

  // Outgoing targets
  const outgoing = outgoingRelationshipsByTechnologyId.get(techId) || [];
  outgoing.forEach((rel) => {
    const targetTech = technologyById.get(rel.targetId);
    if (targetTech) resultSet.set(targetTech.id, targetTech);
  });

  // Incoming sources
  const incoming = incomingRelationshipsByTechnologyId.get(techId) || [];
  incoming.forEach((rel) => {
    const sourceTech = technologyById.get(rel.sourceId);
    if (sourceTech) resultSet.set(sourceTech.id, sourceTech);
  });

  // Fallback explicit related IDs
  (currentTech.relatedTechnologyIds || []).forEach((relId) => {
    const relTech = technologyById.get(relId);
    if (relTech) resultSet.set(relTech.id, relTech);
  });

  return Array.from(resultSet.values());
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

/**
 * Returns graph metrics for a specific technology.
 */
export function getTechnologyDegree(id: string): {
  totalDegree: number;
  inDegree: number;
  outDegree: number;
  connectedLayers: string[];
} {
  const outgoing = getOutgoingRelationships(id);
  const incoming = getIncomingRelationships(id);

  const connectedLayersSet = new Set<string>();

  outgoing.forEach((rel) => {
    const tgt = technologyById.get(rel.targetId);
    if (tgt) connectedLayersSet.add(tgt.layerId);
  });

  incoming.forEach((rel) => {
    const src = technologyById.get(rel.sourceId);
    if (src) connectedLayersSet.add(src.layerId);
  });

  return {
    totalDegree: outgoing.length + incoming.length,
    inDegree: incoming.length,
    outDegree: outgoing.length,
    connectedLayers: Array.from(connectedLayersSet),
  };
}

export interface TechnologyGraphContext {
  technology: StackTechnology;
  degree: number;
  inDegree: number;
  outDegree: number;
  connectedLayers: string[];
  connectedLayersCount: number;
  architectures: ArchitectureProfile[];
  stackPaths: StackPath[];
  isHub: boolean;
  isBridge: boolean;
}

/**
 * Returns comprehensive graph context for a technology node.
 */
export function getTechnologyGraphContext(id: string): TechnologyGraphContext | null {
  const tech = technologyById.get(id);
  if (!tech) return null;

  const { totalDegree, inDegree, outDegree, connectedLayers } = getTechnologyDegree(id);
  const architectures = getArchitecturesForTechnology(id);
  const stackPaths = getStackPathsForTechnology(id);

  return {
    technology: tech,
    degree: totalDegree,
    inDegree,
    outDegree,
    connectedLayers,
    connectedLayersCount: connectedLayers.length,
    architectures,
    stackPaths,
    isHub: totalDegree >= 5,
    isBridge: connectedLayers.length >= 3,
  };
}

// ==========================================
// SHORTEST GRAPH PATH FINDER (BFS)
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

/**
 * Finds the shortest graph traversal path between sourceId and targetId using Breadth-First Search (BFS).
 * Works across both forward and reverse typed relationships in the undirected graph representation.
 */
export function findShortestPath(sourceId: string, targetId: string): ShortestPathResult {
  const sourceTech = technologyById.get(sourceId);
  const targetTech = technologyById.get(targetId);

  if (!sourceTech || !targetTech) {
    return { sourceId, targetId, found: false, nodes: [], steps: [], hopCount: 0 };
  }

  if (sourceId === targetId) {
    return { sourceId, targetId, found: true, nodes: [sourceTech], steps: [], hopCount: 0 };
  }

  // Build undirected adjacency with edge references
  interface AdjacencyEdge {
    neighborId: string;
    relationship: TechnologyRelationship;
    isForward: boolean;
  }

  const adj = new Map<string, AdjacencyEdge[]>();
  stackRelationships.forEach((rel) => {
    // Forward edge
    const fwdList = adj.get(rel.sourceId) || [];
    fwdList.push({ neighborId: rel.targetId, relationship: rel, isForward: true });
    adj.set(rel.sourceId, fwdList);

    // Reverse edge
    const revList = adj.get(rel.targetId) || [];
    revList.push({ neighborId: rel.sourceId, relationship: rel, isForward: false });
    adj.set(rel.targetId, revList);
  });

  // BFS Queue: [currentId, pathSoFar, stepsSoFar]
  const queue: Array<{
    currentId: string;
    path: string[];
    steps: GraphPathStep[];
  }> = [{ currentId: sourceId, path: [sourceId], steps: [] }];

  const visited = new Set<string>([sourceId]);

  while (queue.length > 0) {
    const current = queue.shift()!;
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

    const edges = adj.get(current.currentId) || [];
    for (const edge of edges) {
      if (!visited.has(edge.neighborId)) {
        visited.add(edge.neighborId);
        const fromTech = technologyById.get(current.currentId)!;
        const toTech = technologyById.get(edge.neighborId)!;
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

  return { sourceId, targetId, found: false, nodes: [], steps: [], hopCount: 0 };
}

// ==========================================
// GRAPH TOPOLOGY INSIGHTS
// ==========================================

export interface GraphHubInsight {
  technology: StackTechnology;
  degree: number;
  connectedLayersCount: number;
  connectedLayers: string[];
  architecturesCount: number;
  stackPathsCount: number;
}

export interface BridgeTechnologyInsight {
  technology: StackTechnology;
  connectedLayersCount: number;
  connectedLayers: string[];
  degree: number;
}

export interface GraphInsightsData {
  totalNodes: number;
  totalEdges: number;
  averageDegree: number;
  topHubs: GraphHubInsight[];
  bridgeTechnologies: BridgeTechnologyInsight[];
  layerDistribution: Array<{ layerId: string; count: number }>;
}

/**
 * Computes high-level topology insights across the entire knowledge graph.
 */
export function getGraphInsights(): GraphInsightsData {
  const totalNodes = stackTechnologies.length;
  const totalEdges = stackRelationships.length;

  const allNodeMetrics = stackTechnologies.map((tech) => {
    const { totalDegree, connectedLayers } = getTechnologyDegree(tech.id);
    const archs = getArchitecturesForTechnology(tech.id);
    const paths = getStackPathsForTechnology(tech.id);
    return {
      technology: tech,
      degree: totalDegree,
      connectedLayersCount: connectedLayers.length,
      connectedLayers,
      architecturesCount: archs.length,
      stackPathsCount: paths.length,
    };
  });

  const totalDegrees = allNodeMetrics.reduce((sum, item) => sum + item.degree, 0);
  const averageDegree = totalNodes > 0 ? parseFloat((totalDegrees / totalNodes).toFixed(2)) : 0;

  // Top Hubs: sorted by degree descending
  const topHubs = [...allNodeMetrics]
    .sort((a, b) => b.degree - a.degree)
    .slice(0, 10);

  // Bridge Technologies: sorted by connectedLayersCount descending
  const bridgeTechnologies = [...allNodeMetrics]
    .filter((m) => m.connectedLayersCount >= 3)
    .sort((a, b) => b.connectedLayersCount - a.connectedLayersCount || b.degree - a.degree)
    .slice(0, 10)
    .map((m) => ({
      technology: m.technology,
      connectedLayersCount: m.connectedLayersCount,
      connectedLayers: m.connectedLayers,
      degree: m.degree,
    }));

  // Layer Distribution
  const layerDistribution = Array.from(technologiesByLayerId.entries()).map(([layerId, techs]) => ({
    layerId,
    count: techs.length,
  }));

  return {
    totalNodes,
    totalEdges,
    averageDegree,
    topHubs,
    bridgeTechnologies,
    layerDistribution,
  };
}
