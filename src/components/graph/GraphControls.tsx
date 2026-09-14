import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Layers,
  Filter,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  RotateCcw,
  Network,
  List,
  ChevronDown,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { stackTechnologies } from '../../data/stackTechnologies';
import { stackLayers } from '../../data/stackLayers';
import { RelationshipType } from '../../types/relationship';
import { RELATIONSHIP_VISUALS } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

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
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered technology list for search dropdown
  const filteredTechs = React.useMemo(() => {
    if (!searchQuery.trim()) return stackTechnologies.slice(0, 8);
    const q = searchQuery.toLowerCase();
    return stackTechnologies.filter(
      (tech) =>
        tech.name.toLowerCase().includes(q) ||
        getLocalizedText(tech.description, language).toLowerCase().includes(q) ||
        tech.layerId.toLowerCase().includes(q)
    );
  }, [searchQuery, language]);

  const hasActiveFilters =
    relTypeFilter !== 'all' ||
    layerFilter !== 'all' ||
    directionFilter !== 'all' ||
    depth !== 1;

  return (
    <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Top Bar: Search + View Mode Switcher */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Technology Search & Autocomplete */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={t.graphExplorer.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <ChevronDown className="absolute right-3 top-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-30 py-1.5 divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredTechs.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400 italic">
                  {language === 'ko' ? '검색 결과가 없습니다' : 'No matching technologies'}
                </div>
              ) : (
                filteredTechs.map((tech) => (
                  <button
                    key={tech.id}
                    onClick={() => {
                      onSelectTech(tech);
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-2 transition ${
                      tech.id === currentTech.id
                        ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">{tech.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {tech.layerId}
                      </div>
                    </div>
                    {tech.id === currentTech.id && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-brand-500 text-white rounded font-mono font-bold">
                        Focus
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* View Mode Toggle: Canvas vs Accessible List */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={() => onChangeViewMode('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'canvas'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{t.graphExplorer.viewModeCanvas}</span>
          </button>
          <button
            onClick={() => onChangeViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>{t.graphExplorer.viewModeList}</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Depth + Relationship Type + Layer + Direction + Reset */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        {/* Exploration Depth Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1.5">
            {t.graphExplorer.depthLabel}:
          </span>
          <button
            onClick={() => onChangeDepth(1)}
            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition ${
              depth === 1
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.graphExplorer.depth1}
          </button>
          <button
            onClick={() => onChangeDepth(2)}
            className={`px-2.5 py-1 rounded-lg font-bold text-xs transition ${
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
            className="pl-3 pr-7 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">{t.graphExplorer.allRelationships}</option>
            {Object.entries(RELATIONSHIP_VISUALS).map(([type, meta]) => (
              <option key={type} value={type}>
                {language === 'ko' ? meta.label.ko : meta.label.en}
              </option>
            ))}
          </select>
        </div>

        {/* Layer Filter */}
        <div className="relative">
          <select
            value={layerFilter}
            onChange={(e) => onChangeLayer(e.target.value)}
            className="pl-3 pr-7 py-1.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-500"
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
        <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => onChangeDirection('all')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
              directionFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title={t.graphExplorer.allDirections}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeDirection('outgoing')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
              directionFilter === 'outgoing'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title={t.graphExplorer.outgoingOnly}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onChangeDirection('incoming')}
            className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
              directionFilter === 'incoming'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-800'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title={t.graphExplorer.incomingOnly}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200 dark:border-rose-800 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.graphExplorer.resetFilters}</span>
          </button>
        )}
      </div>
    </div>
  );
};
