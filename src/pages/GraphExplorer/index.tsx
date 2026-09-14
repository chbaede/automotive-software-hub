import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { Network, AlertCircle, Share2, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getTechnology, getTechnologies } from '../../lib/domain';
import { getNeighborhoodGraph } from '../../lib/graph';
import { StackTechnology } from '../../types/stack';
import { RelationshipType } from '../../types/relationship';
import { NeighborhoodGraphEdge } from '../../lib/graph/neighborhood';
import { KnowledgeGraphCanvas } from '../../components/graph/KnowledgeGraphCanvas';
import { GraphControls } from '../../components/graph/GraphControls';
import { SelectedTechDetailPanel } from '../../components/graph/SelectedTechDetailPanel';
import { AccessibleGraphListView } from '../../components/graph/AccessibleGraphListView';

export const GraphExplorerPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { technologyId: pathTechId } = useParams<{ technologyId?: string }>();
  const navigate = useNavigate();

  // URL state resolution
  const initialTechId = pathTechId || searchParams.get('tech') || 'nvidia-drive-thor';
  const initialDepth = (parseInt(searchParams.get('depth') || '1', 10) === 2 ? 2 : 1) as 1 | 2;
  const initialRelType = (searchParams.get('rel') as RelationshipType) || 'all';
  const initialLayer = searchParams.get('layer') || 'all';
  const initialDirection =
    (searchParams.get('dir') as 'all' | 'outgoing' | 'incoming') || 'all';

  const [focalTechId, setFocalTechId] = useState<string>(initialTechId);
  const [depth, setDepth] = useState<1 | 2>(initialDepth);
  const [relTypeFilter, setRelTypeFilter] = useState<RelationshipType | 'all'>(initialRelType);
  const [layerFilter, setLayerFilter] = useState<string | 'all'>(initialLayer);
  const [directionFilter, setDirectionFilter] = useState<'all' | 'outgoing' | 'incoming'>(initialDirection);
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');
  const [mobileTab, setMobileTab] = useState<'canvas' | 'details'>('canvas');

  const [selectedTech, setSelectedTech] = useState<StackTechnology | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<NeighborhoodGraphEdge | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync state from URL
  useEffect(() => {
    const techParam = pathTechId || searchParams.get('tech');
    if (techParam && getTechnology(techParam)) {
      setFocalTechId(techParam);
    }
  }, [pathTechId, searchParams]);

  // Sync state to URL
  const updateUrlParams = (newTechId?: string, newDepth?: 1 | 2, newRel?: string, newLayer?: string, newDir?: string) => {
    const params = new URLSearchParams(searchParams);
    if (newTechId) {
      if (pathTechId) {
        navigate(`/graph/${newTechId}?${params.toString()}`, { replace: true });
        return;
      }
      params.set('tech', newTechId);
    }
    if (newDepth) params.set('depth', newDepth.toString());
    if (newRel) {
      if (newRel === 'all') params.delete('rel');
      else params.set('rel', newRel);
    }
    if (newLayer) {
      if (newLayer === 'all') params.delete('layer');
      else params.set('layer', newLayer);
    }
    if (newDir) {
      if (newDir === 'all') params.delete('dir');
      else params.set('dir', newDir);
    }
    setSearchParams(params, { replace: true });
  };

  // Focal Technology Object (guaranteed non-null fallback via domain)
  const focalTech = useMemo(() => {
    return getTechnology(focalTechId) || getTechnologies()[0];
  }, [focalTechId]);

  // Active Selected Technology (defaults to focalTech)
  const activeTech = useMemo(() => {
    return selectedTech || focalTech;
  }, [selectedTech, focalTech]);

  // Page title
  useEffect(() => {
    if (focalTech) {
      document.title = `${focalTech.name} | ${t.graphExplorer.title} | Automotive Software Hub`;
    }
  }, [focalTech, t.graphExplorer.title]);

  // Neighborhood Graph Computation (Pure & Deterministic)
  const neighborhoodData = useMemo(() => {
    if (!focalTech) return null;
    return getNeighborhoodGraph(focalTech.id, {
      depth,
      relationshipType: relTypeFilter,
      layerId: layerFilter,
      direction: directionFilter,
    });
  }, [focalTech, depth, relTypeFilter, layerFilter, directionFilter]);

  // Handlers
  const handleSelectTech = (tech: StackTechnology) => {
    setSelectedTech(tech);
    setSelectedEdge(null);
    setMobileTab('details');
  };

  const handleCenterOnTech = (techId: string) => {
    const found = getTechnology(techId);
    if (found) {
      setFocalTechId(techId);
      setSelectedTech(found);
      setSelectedEdge(null);
      updateUrlParams(techId);
    }
  };

  const handleSelectEdge = (edge: NeighborhoodGraphEdge | null) => {
    setSelectedEdge(edge);
    if (edge) {
      setMobileTab('details');
    }
  };

  const handleDepthChange = (newDepth: 1 | 2) => {
    setDepth(newDepth);
    updateUrlParams(undefined, newDepth);
  };

  const handleRelTypeChange = (newRel: RelationshipType | 'all') => {
    setRelTypeFilter(newRel);
    updateUrlParams(undefined, undefined, newRel);
  };

  const handleLayerChange = (newLayer: string | 'all') => {
    setLayerFilter(newLayer);
    updateUrlParams(undefined, undefined, undefined, newLayer);
  };

  const handleDirectionChange = (newDir: 'all' | 'outgoing' | 'incoming') => {
    setDirectionFilter(newDir);
    updateUrlParams(undefined, undefined, undefined, undefined, newDir);
  };

  const handleResetFilters = () => {
    setDepth(1);
    setRelTypeFilter('all');
    setLayerFilter('all');
    setDirectionFilter('all');
    setSelectedEdge(null);
    if (pathTechId) {
      navigate(`/graph/${focalTechId}`, { replace: true });
    } else {
      setSearchParams({ tech: focalTechId });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!focalTech || !neighborhoodData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          {t.graphExplorer.techNotFound}
        </h2>
        <button
          type="button"
          onClick={() => handleCenterOnTech('nvidia-drive-thor')}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {t.graphExplorer.resetToThor}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-5">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80 rounded-lg text-brand-700 dark:text-brand-300 text-xs font-bold mb-1.5 shadow-2xs">
            <Network className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Knowledge Graph Explorer 2.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.graphExplorer.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {t.graphExplorer.subtitle}
          </p>
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleShare}
            aria-label={copied ? t.graphExplorer.copied : t.graphExplorer.shareView}
            className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold shadow-xs transition focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.graphExplorer.copied}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" aria-hidden="true" />
                <span>{t.graphExplorer.shareView}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <GraphControls
        currentTech={focalTech}
        onSelectTech={(tech) => handleCenterOnTech(tech.id)}
        depth={depth}
        onChangeDepth={handleDepthChange}
        relTypeFilter={relTypeFilter}
        onChangeRelType={handleRelTypeChange}
        layerFilter={layerFilter}
        onChangeLayer={handleLayerChange}
        directionFilter={directionFilter}
        onChangeDirection={handleDirectionChange}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onResetFilters={handleResetFilters}
      />

      {/* Mobile Tab Switcher (< 1024px) */}
      <div
        role="tablist"
        aria-label={t.graphExplorer.title}
        className="lg:hidden flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'canvas'}
          onClick={() => setMobileTab('canvas')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg text-center transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            mobileTab === 'canvas'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {viewMode === 'canvas' ? t.graphExplorer.viewModeCanvas : t.graphExplorer.viewModeList}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mobileTab === 'details'}
          onClick={() => setMobileTab('details')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg text-center transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            mobileTab === 'details'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {activeTech ? `${activeTech.name} ${t.graphExplorer.techDetails}` : t.graphExplorer.technologyDetails}
        </button>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Visual Canvas or Accessible List (60% / 7 cols) */}
        <div
          className={`lg:col-span-7 xl:col-span-7 ${
            mobileTab === 'details' ? 'hidden lg:block' : 'block'
          }`}
        >
          {viewMode === 'canvas' ? (
            <KnowledgeGraphCanvas
              data={neighborhoodData}
              selectedTechId={activeTech.id}
              selectedEdgeId={selectedEdge?.id || null}
              onSelectTech={handleSelectTech}
              onSelectEdge={handleSelectEdge}
              depth={depth}
              onToggleDepth={() => handleDepthChange(depth === 1 ? 2 : 1)}
            />
          ) : (
            <AccessibleGraphListView
              data={neighborhoodData}
              selectedTechId={activeTech.id}
              onSelectTech={handleSelectTech}
              onCenterOnTech={handleCenterOnTech}
            />
          )}
        </div>

        {/* Right Column: Contextual Detail Panel (40% / 5 cols) */}
        <div
          className={`lg:col-span-5 xl:col-span-5 ${
            mobileTab === 'canvas' ? 'hidden lg:block' : 'block'
          } h-[600px] sm:h-[640px] md:h-[700px]`}
        >
          <SelectedTechDetailPanel
            technology={activeTech}
            selectedEdge={selectedEdge}
            onClearSelectedEdge={() => setSelectedEdge(null)}
            onSelectTech={handleSelectTech}
            onCenterOnTech={handleCenterOnTech}
          />
        </div>
      </div>
    </div>
  );
};
