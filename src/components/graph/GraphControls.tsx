import React from 'react';
import { Network, List } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { RelationshipType } from '../../types/relationship';
import { TechnologySearch } from './TechnologySearch';
import { GraphFilterControls } from './GraphFilterControls';
import { useLanguage } from '../../i18n/LanguageContext';

interface GraphControlsProps {
  currentTech: StackTechnology;
  onSelectTech: (tech: StackTechnology) => void;
  depth: 1 | 2;
  onChangeDepth: (depth: 1 | 2) => void;
  relTypeFilter: RelationshipType | 'all';
  onChangeRelType: (relType: RelationshipType | 'all') => void;
  layerFilter: string | 'all';
  onChangeLayer: (layerId: string | 'all') => void;
  directionFilter: 'all' | 'outgoing' | 'incoming';
  onChangeDirection: (dir: 'all' | 'outgoing' | 'incoming') => void;
  viewMode: 'canvas' | 'list';
  onChangeViewMode: (mode: 'canvas' | 'list') => void;
  onResetFilters: () => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  currentTech,
  onSelectTech,
  depth,
  onChangeDepth,
  relTypeFilter,
  onChangeRelType,
  layerFilter,
  onChangeLayer,
  directionFilter,
  onChangeDirection,
  viewMode,
  onChangeViewMode,
  onResetFilters,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top Bar: Search + View Mode Switcher */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Technology Search & Autocomplete */}
        <TechnologySearch
          currentTech={currentTech}
          onSelectTech={onSelectTech}
        />

        {/* View Mode Toggle: Canvas vs Accessible List */}
        <div
          className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
          role="group"
          aria-label={t.graphExplorer.title}
        >
          <button
            type="button"
            onClick={() => onChangeViewMode('canvas')}
            aria-label={t.graphExplorer.viewModeCanvas}
            aria-pressed={viewMode === 'canvas'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              viewMode === 'canvas'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.graphExplorer.viewModeCanvas}</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('list')}
            aria-label={t.graphExplorer.viewModeList}
            aria-pressed={viewMode === 'list'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.graphExplorer.viewModeList}</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Depth + Relationship Type + Layer + Direction + Reset */}
      <GraphFilterControls
        depth={depth}
        onChangeDepth={onChangeDepth}
        relTypeFilter={relTypeFilter}
        onChangeRelType={onChangeRelType}
        layerFilter={layerFilter}
        onChangeLayer={onChangeLayer}
        directionFilter={directionFilter}
        onChangeDirection={onChangeDirection}
        onResetFilters={onResetFilters}
      />
    </div>
  );
};
