import { stackTechnologies } from '../data/stackTechnologies';
import { architectureProfiles } from '../data/architectureProfiles';
import { stackRelationships } from '../data/stackRelationships';
import { stackPaths } from '../data/stackPaths';
import { StackTechnology } from '../types/stack';
import { ArchitectureProfile, StackPath } from '../types/architecture';
import { TechnologyRelationship } from '../types/relationship';

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

/**
 * Returns structured outgoing & incoming relationships with resolved target/source entities.
 */
export function getTechnologyRelationships(techId: string) {
  const outgoing = outgoingRelationshipsByTechnologyId.get(techId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(techId) || [];
  return { outgoing, incoming };
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
