/**
 * Architecture Profile Comparison & Selection Conversion
 *
 * Provides pure domain algorithms for:
 * - Comparing two automotive software architecture profiles (shared vs unique technologies, layers, paths)
 * - Converting an ArchitectureProfile into canonical StackSelection for Stack Builder deep linking
 */

import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { StackLayer, StackTechnology, StackLayerId } from '../../types/stack';
import { architectureProfiles } from '../../data/architectureProfiles';
import { stackLayers } from '../../data/stackLayers';
import { stackPaths } from '../../data/stackPaths';
import { technologyById } from '../graph';
import { StackSelection } from '../graph/matching';

export interface ArchitectureComparisonResult {
  architectureA: ArchitectureProfile;
  architectureB: ArchitectureProfile;

  // Technology comparisons
  sharedTechnologies: StackTechnology[];
  onlyTechnologiesInA: StackTechnology[];
  onlyTechnologiesInB: StackTechnology[];

  // Layer comparisons
  sharedLayers: StackLayer[];
  onlyLayersInA: StackLayer[];
  onlyLayersInB: StackLayer[];

  // Stack Path comparisons
  sharedPaths: StackPath[];
  onlyPathsInA: StackPath[];
  onlyPathsInB: StackPath[];

  // Topics & Tags
  sharedTopics: string[];
  onlyTopicsInA: string[];
  onlyTopicsInB: string[];
}

/**
 * Compares two architecture profiles and returns a deterministic differential analysis.
 *
 * Strictly pure and non-mutating.
 */
export function compareArchitectures(
  archAId: string,
  archBId: string
): ArchitectureComparisonResult {
  const profileA = architectureProfiles.find((p) => p.id === archAId);
  const profileB = architectureProfiles.find((p) => p.id === archBId);

  if (!profileA) {
    throw new Error(`Architecture profile "${archAId}" not found`);
  }
  if (!profileB) {
    throw new Error(`Architecture profile "${archBId}" not found`);
  }

  // 1. Technologies
  const techsA = profileA.technologyIds
    .map((id) => technologyById.get(id))
    .filter((t): t is StackTechnology => Boolean(t));
  const techsB = profileB.technologyIds
    .map((id) => technologyById.get(id))
    .filter((t): t is StackTechnology => Boolean(t));

  const techIdsA = new Set(profileA.technologyIds);
  const techIdsB = new Set(profileB.technologyIds);

  const sharedTechnologies = techsA.filter((t) => techIdsB.has(t.id));
  const onlyTechnologiesInA = techsA.filter((t) => !techIdsB.has(t.id));
  const onlyTechnologiesInB = techsB.filter((t) => !techIdsA.has(t.id));

  // 2. Layers
  const layerIdsA = new Set(techsA.map((t) => t.layerId));
  const layerIdsB = new Set(techsB.map((t) => t.layerId));

  const allLayers = stackLayers;
  const sharedLayers = allLayers.filter((l) => layerIdsA.has(l.id) && layerIdsB.has(l.id));
  const onlyLayersInA = allLayers.filter((l) => layerIdsA.has(l.id) && !layerIdsB.has(l.id));
  const onlyLayersInB = allLayers.filter((l) => !layerIdsA.has(l.id) && layerIdsB.has(l.id));

  // 3. Stack Paths
  const pathsA = stackPaths.filter((path) =>
    path.hops.some((hop) => techIdsA.has(hop.technologyId))
  );
  const pathsB = stackPaths.filter((path) =>
    path.hops.some((hop) => techIdsB.has(hop.technologyId))
  );

  const pathIdsA = new Set(pathsA.map((p) => p.id));
  const pathIdsB = new Set(pathsB.map((p) => p.id));

  const sharedPaths = pathsA.filter((p) => pathIdsB.has(p.id));
  const onlyPathsInA = pathsA.filter((p) => !pathIdsB.has(p.id));
  const onlyPathsInB = pathsB.filter((p) => !pathIdsA.has(p.id));

  // 4. Topics & Tags
  const topicsA = new Set([...(profileA.topics || []), ...(profileA.tags || [])]);
  const topicsB = new Set([...(profileB.topics || []), ...(profileB.tags || [])]);

  const sharedTopics = Array.from(topicsA).filter((t) => topicsB.has(t));
  const onlyTopicsInA = Array.from(topicsA).filter((t) => !topicsB.has(t));
  const onlyTopicsInB = Array.from(topicsB).filter((t) => !topicsA.has(t));

  return {
    architectureA: profileA,
    architectureB: profileB,
    sharedTechnologies,
    onlyTechnologiesInA,
    onlyTechnologiesInB,
    sharedLayers,
    onlyLayersInA,
    onlyLayersInB,
    sharedPaths,
    onlyPathsInA,
    onlyPathsInB,
    sharedTopics,
    onlyTopicsInA,
    onlyTopicsInB,
  };
}

/**
 * Converts an ArchitectureProfile's technology IDs into a canonical StackSelection
 * for Stack Builder initialization and URL serialization.
 */
export function convertArchitectureToStackSelection(
  profile: ArchitectureProfile
): StackSelection {
  const selection: StackSelection = {};

  profile.technologyIds.forEach((techId) => {
    const tech = technologyById.get(techId);
    if (!tech) return;

    const layerId = tech.layerId as StackLayerId;
    const currentList = selection[layerId] || [];
    if (!currentList.includes(tech.id)) {
      selection[layerId] = [...currentList, tech.id];
    }
  });

  return selection;
}
