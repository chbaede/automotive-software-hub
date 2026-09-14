import React, { useMemo } from 'react';
import { StackTechnology } from '../../types/stack';
import { NeighborhoodGraphEdge } from '../../lib/graph/neighborhood';
import {
  getTechnology,
  getStrategiesForTechnology,
  getToolsForTechnology,
  getResourcesForTechnology,
  getProjectsForTechnology,
} from '../../lib/domain';
import {
  getArchitecturesForTechnology,
  getStackPathsForTechnology,
  getTechnologyDiscoveryResult,
  getExploreNextTechnologies,
} from '../../lib/graph';
import { SelectedTechSummary } from './SelectedTechSummary';
import { SelectedTechEdgeInspector } from './SelectedTechEdgeInspector';
import { SelectedTechRelationships } from './SelectedTechRelationships';
import { SelectedTechStrategyContext } from './SelectedTechStrategyContext';
import { SelectedTechArchitectureContext } from './SelectedTechArchitectureContext';
import { SelectedTechEcosystemContext } from './SelectedTechEcosystemContext';
import { SelectedTechExploreNext } from './SelectedTechExploreNext';

export interface SelectedTechDetailPanelProps {
  technology: StackTechnology;
  selectedEdge: NeighborhoodGraphEdge | null;
  onClearSelectedEdge: () => void;
  onSelectTech: (tech: StackTechnology) => void;
  onCenterOnTech: (techId: string) => void;
}

export const SelectedTechDetailPanel: React.FC<SelectedTechDetailPanelProps> = ({
  technology,
  selectedEdge,
  onClearSelectedEdge,
  onSelectTech,
  onCenterOnTech,
}) => {
  // Direct Semantic Discovery Result
  const discoveryResult = useMemo(() => {
    return getTechnologyDiscoveryResult(technology.id);
  }, [technology.id]);

  // Linked Architectures & Stack Paths
  const architectures = useMemo(() => {
    return getArchitecturesForTechnology(technology.id);
  }, [technology.id]);

  const stackPaths = useMemo(() => {
    return getStackPathsForTechnology(technology.id);
  }, [technology.id]);

  // Linked Company Strategy References
  const strategyReferences = useMemo(() => {
    return getStrategiesForTechnology(technology.id);
  }, [technology.id]);

  // Ecosystem linked objects
  const linkedTools = useMemo(() => getToolsForTechnology(technology), [technology]);
  const linkedResources = useMemo(() => getResourcesForTechnology(technology), [technology]);
  const linkedProjects = useMemo(() => getProjectsForTechnology(technology), [technology]);

  // Explore Next Recommendations (Deduplicated)
  const exploreNextList = useMemo(() => {
    const displayedIds = new Set<string>([technology.id]);
    if (discoveryResult) {
      const add = (items: Array<{ technology: StackTechnology }>) =>
        items.forEach((it) => displayedIds.add(it.technology.id));
      add(discoveryResult.dependencies);
      add(discoveryResult.dependents);
      add(discoveryResult.platforms);
      add(discoveryResult.hostedTechnologies);
      add(discoveryResult.integrations);
      add(discoveryResult.alternatives);
      add(discoveryResult.compatibleWith);
      add(discoveryResult.usedWith);
      add(discoveryResult.coexistsWith);
      add(discoveryResult.related);
    }
    return getExploreNextTechnologies({
      technologyId: technology.id,
      alreadyDisplayedTechnologyIds: Array.from(displayedIds),
      maxResults: 4,
    });
  }, [technology.id, discoveryResult]);

  // Resolve Edge Source & Target
  const edgeSourceTech = useMemo(() => {
    return selectedEdge ? getTechnology(selectedEdge.sourceId) : null;
  }, [selectedEdge]);

  const edgeTargetTech = useMemo(() => {
    return selectedEdge ? getTechnology(selectedEdge.targetId) : null;
  }, [selectedEdge]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 divide-y divide-slate-100 dark:divide-slate-800/80">
        {/* Section 1: Summary & Actions */}
        <SelectedTechSummary
          technology={technology}
          onCenterOnTech={onCenterOnTech}
        />

        {/* Section 2: Active Edge Inspector */}
        {selectedEdge && edgeSourceTech && edgeTargetTech && (
          <SelectedTechEdgeInspector
            selectedEdge={selectedEdge}
            sourceTech={edgeSourceTech}
            targetTech={edgeTargetTech}
            onClearSelectedEdge={onClearSelectedEdge}
          />
        )}

        {/* Section 3: Semantic Relationships */}
        {discoveryResult && (
          <SelectedTechRelationships
            discoveryResult={discoveryResult}
            onSelectTech={onSelectTech}
          />
        )}

        {/* Section 4: Company Strategies */}
        <SelectedTechStrategyContext
          strategyReferences={strategyReferences}
        />

        {/* Section 5 & 6: Architecture Profiles & Stack Paths */}
        <SelectedTechArchitectureContext
          technologyId={technology.id}
          architectures={architectures}
          stackPaths={stackPaths}
        />

        {/* Section 7: Connected Ecosystem */}
        <SelectedTechEcosystemContext
          linkedTools={linkedTools}
          linkedProjects={linkedProjects}
          linkedResources={linkedResources}
        />

        {/* Section 8: Explore Next Recommendations */}
        <SelectedTechExploreNext
          exploreNextList={exploreNextList}
          onSelectTech={onSelectTech}
        />
      </div>
    </div>
  );
};
