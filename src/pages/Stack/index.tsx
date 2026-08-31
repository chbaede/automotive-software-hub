import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layers, Search, RotateCcw, Compass, Wrench, Cpu, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { stackLayers } from '../../data/stackLayers';
import { stackTechnologies } from '../../data/stackTechnologies';
import { StackTechnology } from '../../types/stack';
import { TOPIC_TAXONOMY } from '../../data/taxonomy';
import { StackLayerBlock } from '../../components/stack/StackLayerBlock';
import { TechDetailDrawer } from '../../components/stack/TechDetailDrawer';
import { ToolRunnerModal } from '../../components/tools/ToolRunnerModal';
import { GoogleAdBanner } from '../../components/ads/GoogleAdBanner';
import { getLocalizedText } from '../../types/i18n';
import { Tool } from '../../types/tool';

export const StackPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [layerFilter, setLayerFilter] = useState<string>(searchParams.get('layer') || 'all');
  const [topicFilter, setTopicFilter] = useState<string>(searchParams.get('topic') || 'all');

  const [selectedTech, setSelectedTech] = useState<StackTechnology | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  // Sync URL ?tech=android-automotive parameter
  useEffect(() => {
    const techIdParam = searchParams.get('tech');
    if (techIdParam) {
      const found = stackTechnologies.find((st) => st.id === techIdParam);
      if (found) {
        setSelectedTech(found);
      }
    }
  }, [searchParams]);

  const handleSelectTech = (tech: StackTechnology) => {
    setSelectedTech(tech);
    setSearchParams((prev) => {
      prev.set('tech', tech.id);
      return prev;
    });
  };

  const handleCloseTechDrawer = () => {
    setSelectedTech(null);
    setSearchParams((prev) => {
      prev.delete('tech');
      return prev;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setLayerFilter('all');
    setTopicFilter('all');
    setSearchParams({});
  };

  // Compute Highlighted Technology IDs (when a tech is selected)
  const highlightedTechIds = new Set<string>();
  if (selectedTech) {
    highlightedTechIds.add(selectedTech.id);
    (selectedTech.relatedTechnologyIds || []).forEach((id) => highlightedTechIds.add(id));
  }

  // Filter Technologies
  const filteredTechs = stackTechnologies.filter((tech) => {
    const name = tech.name.toLowerCase();
    const desc = getLocalizedText(tech.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery =
      !query ||
      name.includes(query) ||
      desc.includes(query) ||
      (tech.tags && tech.tags.some((t) => t.includes(query)));

    const matchesLayer = layerFilter === 'all' || tech.layerId === layerFilter;
    const matchesTopic = topicFilter === 'all' || tech.topics.includes(topicFilter as any);

    return matchesQuery && matchesLayer && matchesTopic;
  });

  // Separate Core Stack Layers vs Cross-Cutting Pillars
  const coreLayers = stackLayers
    .filter((l) => l.layerType === 'core')
    .filter((l) => layerFilter === 'all' || l.id === layerFilter)
    .sort((a, b) => a.order - b.order); // Order 1 (App at top) -> Order 6 (Hardware at base)

  const crossCuttingLayers = stackLayers
    .filter((l) => l.layerType === 'cross-cutting')
    .filter((l) => layerFilter === 'all' || l.id === layerFilter)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <LayoutGrid className="w-4 h-4" />
          <span>Layered Architecture Diagram Map</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.stack.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.stack.subtitle}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.stack.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Layer Filter */}
          <select
            value={layerFilter}
            onChange={(e) => setLayerFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.stack.allLayers}</option>
            {stackLayers.map((l) => (
              <option key={l.id} value={l.id}>
                {getLocalizedText(l.name, language)}
              </option>
            ))}
          </select>

          {/* Topic Select */}
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.stack.allTopics}</option>
            {Object.entries(TOPIC_TAXONOMY).map(([id, meta]) => (
              <option key={id} value={id}>
                {language === 'ko' ? meta.label.ko : meta.label.en}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          {(searchQuery || layerFilter !== 'all' || topicFilter !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.stack.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Info Tip */}
      <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg text-xs text-brand-700 dark:text-brand-300 flex items-center gap-2">
        <Compass className="w-4 h-4 shrink-0 text-brand-600" />
        <span>{t.stack.selectTechToInspect}</span>
      </div>

      {/* 2-Column Architecture Diagram Grid Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (75%): Core Vehicle Stack (App -> Hardware Base Foundation at bottom) */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-500" />
              <span>Core Vehicle Software Stack (Top → Silicon Base)</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              Hardware/SoC at Base Foundation
            </span>
          </div>

          <div className="space-y-4">
            {coreLayers.map((layer) => {
              const layerTechs = filteredTechs.filter((st) => st.layerId === layer.id);
              return (
                <StackLayerBlock
                  key={layer.id}
                  layer={layer}
                  technologies={layerTechs}
                  selectedTechId={selectedTech?.id}
                  highlightedTechIds={highlightedTechIds}
                  onSelectTech={handleSelectTech}
                  variant="core"
                />
              );
            })}
          </div>
        </div>

        {/* Right Column (25%): Vertical Cross-Cutting Column (Build, Tools, Cloud spanning all layers) */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-brand-500" />
              <span>Cross-Cutting Pillars</span>
            </h2>
            <span className="text-[10px] font-mono text-slate-500">Spans All Layers</span>
          </div>

          <div className="space-y-4 bg-slate-100/70 dark:bg-slate-950/70 p-3.5 rounded-2xl border border-slate-300 dark:border-slate-800">
            {crossCuttingLayers.map((layer) => {
              const layerTechs = filteredTechs.filter((st) => st.layerId === layer.id);
              return (
                <StackLayerBlock
                  key={layer.id}
                  layer={layer}
                  technologies={layerTechs}
                  selectedTechId={selectedTech?.id}
                  highlightedTechIds={highlightedTechIds}
                  onSelectTech={handleSelectTech}
                  variant="cross-cutting"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Technology Detail Drawer */}
      <TechDetailDrawer
        technology={selectedTech}
        onClose={handleCloseTechDrawer}
        onSelectTech={handleSelectTech}
        onOpenTool={(tool) => setActiveTool(tool)}
      />

      {/* Google AdSense Banner (Non-intrusive bottom unit) */}
      <GoogleAdBanner slot="9426228178" />

      {/* Tool Runner Modal */}
      <ToolRunnerModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
};
