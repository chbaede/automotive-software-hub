import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  RotateCcw,
} from 'lucide-react';
import { RelationshipType } from '../../types/relationship';
import { getStackLayers } from '../../lib/domain';
import { RELATIONSHIP_VISUALS } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface GraphFilterControlsProps {
  depth: 1 | 2;
  onChangeDepth: (depth: 1 | 2) => void;
  relTypeFilter: RelationshipType | 'all';
  onChangeRelType: (relType: RelationshipType | 'all') => void;
  layerFilter: string | 'all';
  onChangeLayer: (layerId: string | 'all') => void;
  directionFilter: 'all' | 'outgoing' | 'incoming';
  onChangeDirection: (dir: 'all' | 'outgoing' | 'incoming') => void;
  onResetFilters: () => void;
}

export const GraphFilterControls: React.FC<GraphFilterControlsProps> = ({
  depth,
  onChangeDepth,
  relTypeFilter,
  onChangeRelType,
  layerFilter,
  onChangeLayer,
  directionFilter,
  onChangeDirection,
  onResetFilters,
}) => {
  const { language, t } = useLanguage();
  const stackLayers = getStackLayers();

  const hasActiveFilters =
    relTypeFilter !== 'all' ||
    layerFilter !== 'all' ||
    directionFilter !== 'all' ||
    depth !== 1;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
      {/* Exploration Depth Switcher */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1.5">
          {t.graphExplorer.depthLabel}:
        </span>
        <button
          onClick={() => onChangeDepth(1)}
          aria-label={t.graphExplorer.depth1}
          className={`px-2.5 py-1 rounded-lg font-bold text-xs transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            depth === 1
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {t.graphExplorer.depth1}
        </button>
        <button
          onClick={() => onChangeDepth(2)}
          aria-label={t.graphExplorer.depth2}
          className={`px-2.5 py-1 rounded-lg font-bold text-xs transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            depth === 2
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          {t.graphExplorer.depth2}
        </button>
      </div>

      {/* Relationship Type Filter */}
      <div className="relative">
        <select
          value={relTypeFilter}
          onChange={(e) => onChangeRelType(e.target.value as RelationshipType | 'all')}
          aria-label={t.graphExplorer.relFilterLabel}
          className="pl-3 pr-7 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">{t.graphExplorer.allRelationships}</option>
          {Object.entries(RELATIONSHIP_VISUALS).map(([type, meta]) => (
            <option key={type} value={type}>
              {language === 'ko' ? meta.label.ko : meta.label.en}
            </option>
          ))}
        </select>
      </div>

      {/* Layer Filter (Zero direct data imports) */}
      <div className="relative">
        <select
          value={layerFilter}
          onChange={(e) => onChangeLayer(e.target.value)}
          aria-label={t.graphExplorer.layerFilterLabel}
          className="pl-3 pr-7 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="all">{t.graphExplorer.allLayers}</option>
          {stackLayers.map((layer) => (
            <option key={layer.id} value={layer.id}>
              {getLocalizedText(layer.name, language)}
            </option>
          ))}
        </select>
      </div>

      {/* Direction Filter */}
      <div
        className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800"
        role="group"
        aria-label={t.graphExplorer.directionLabel}
      >
        <button
          onClick={() => onChangeDirection('all')}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            directionFilter === 'all'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-800'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          title={t.graphExplorer.allDirections}
          aria-label={t.graphExplorer.allDirections}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <button
          onClick={() => onChangeDirection('outgoing')}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            directionFilter === 'outgoing'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          title={t.graphExplorer.outgoingOnly}
          aria-label={t.graphExplorer.outgoingOnly}
        >
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        <button
          onClick={() => onChangeDirection('incoming')}
          className={`px-2 py-1 rounded-lg text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            directionFilter === 'incoming'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          title={t.graphExplorer.incomingOnly}
          aria-label={t.graphExplorer.incomingOnly}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200 dark:border-rose-800 transition focus:outline-none focus:ring-2 focus:ring-rose-500"
          aria-label={t.graphExplorer.resetFilters}
        >
          <RotateCcw className="w-3 h-3" aria-hidden="true" />
          <span>{t.graphExplorer.resetFilters}</span>
        </button>
      )}
    </div>
  );
};
