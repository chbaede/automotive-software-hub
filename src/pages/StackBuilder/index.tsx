import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Layers,
  Wrench,
  Share2,
  Trash2,
  Check,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Info,
  Compass,
  ArrowRightLeft,
} from 'lucide-react';
import {
  CORE_STACK_LAYER_IDS,
  SUPPORTING_STACK_LAYER_IDS,
  StackSelection,
  getSelectedTechIds,
  encodeStackToSearchParams,
  decodeStackFromSearchParams,
} from '../../lib/builder/stackBuilderEngine';
import { discoverArchitecture } from '../../lib/architecture/discovery';
import { buildArchitectureDiscoveryViewModel } from '../../lib/architecture/discoveryViewModel';
import { stackLayers } from '../../data/stackLayers';
import { technologyById } from '../../lib/graph';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { LayerTechSelector } from '../../components/builder/LayerTechSelector';
import { StackPreviewLadder } from '../../components/builder/StackPreviewLadder';
import { StackValidationPanel } from '../../components/builder/StackValidationPanel';
import { SuggestedTechPanel } from '../../components/builder/SuggestedTechPanel';
import { RelatedPathsPanel } from '../../components/builder/RelatedPathsPanel';
import { WhatIfModal } from '../../components/builder/WhatIfModal';
import { DiscoveryEmptyState } from '../../components/discovery/DiscoveryEmptyState';
import { ArchitectureDiscoverySummary } from '../../components/discovery/ArchitectureDiscoverySummary';
import { ArchitectureComparisonTable } from '../../components/discovery/ArchitectureComparisonTable';
import { ArchitectureGapPanel } from '../../components/discovery/ArchitectureGapPanel';

export const StackBuilderPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [highlightLayerId, setHighlightLayerId] = useState<string | null>(null);

  // What-if Simulation Modal State
  const [isWhatIfOpen, setIsWhatIfOpen] = useState(false);
  const [whatIfTargetId, setWhatIfTargetId] = useState<string | undefined>(undefined);

  // Initialize selection from URL Search Params (supports multi-selection per layer)
  const selection: StackSelection = useMemo(() => {
    return decodeStackFromSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    document.title = `${t.stackBuilder.title} | Automotive Software Hub`;
  }, [t.stackBuilder.title]);

  // Toggle technology in a layer (supports multi-selection)
  const handleToggleTechnology = useCallback(
    (layerId: string, techId: string) => {
      const newSelection: StackSelection = { ...selection };
      const currentList = newSelection[layerId as keyof StackSelection] || [];
      if (currentList.includes(techId)) {
        const nextList = currentList.filter((id) => id !== techId);
        if (nextList.length > 0) {
          newSelection[layerId as keyof StackSelection] = nextList;
        } else {
          delete newSelection[layerId as keyof StackSelection];
        }
      } else {
        newSelection[layerId as keyof StackSelection] = [...currentList, techId];
      }
      const newParams = encodeStackToSearchParams(newSelection);
      setSearchParams(newParams, { replace: true });
    },
    [selection, setSearchParams]
  );

  // Remove technology from a layer
  const handleRemoveTechnology = useCallback(
    (layerId: string, techId: string) => {
      const newSelection: StackSelection = { ...selection };
      const currentList = newSelection[layerId as keyof StackSelection] || [];
      const nextList = currentList.filter((id) => id !== techId);
      if (nextList.length > 0) {
        newSelection[layerId as keyof StackSelection] = nextList;
      } else {
        delete newSelection[layerId as keyof StackSelection];
      }
      const newParams = encodeStackToSearchParams(newSelection);
      setSearchParams(newParams, { replace: true });
    },
    [selection, setSearchParams]
  );

  // Quick add for suggestions and architecture missing items
  const handleAddTechnology = useCallback(
    (techId: string) => {
      const tech = technologyById.get(techId);
      if (tech) {
        handleToggleTechnology(tech.layerId, tech.id);
      }
    },
    [handleToggleTechnology]
  );

  // What-if Open Handler
  const handleOpenWhatIf = useCallback((techId?: string) => {
    setWhatIfTargetId(techId);
    setIsWhatIfOpen(true);
  }, []);

  // What-if Apply Replacement Handler
  const handleApplyReplacement = useCallback(
    (targetTechId: string, replacementTechId: string) => {
      const targetTech = technologyById.get(targetTechId);
      const replTech = technologyById.get(replacementTechId);
      if (!targetTech || !replTech) return;

      const newSelection: StackSelection = { ...selection };

      // Remove target tech from its layer
      const currentTargetList = newSelection[targetTech.layerId as keyof StackSelection] || [];
      const updatedTargetList = currentTargetList.filter((id) => id !== targetTechId);
      if (updatedTargetList.length > 0) {
        newSelection[targetTech.layerId as keyof StackSelection] = updatedTargetList;
      } else {
        delete newSelection[targetTech.layerId as keyof StackSelection];
      }

      // Add replacement tech to its layer
      const currentReplList = newSelection[replTech.layerId as keyof StackSelection] || [];
      if (!currentReplList.includes(replacementTechId)) {
        newSelection[replTech.layerId as keyof StackSelection] = [...currentReplList, replacementTechId];
      }

      const newParams = encodeStackToSearchParams(newSelection);
      setSearchParams(newParams, { replace: true });
    },
    [selection, setSearchParams]
  );

  const handleClearStack = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Perform Architecture Discovery & build display view model
  const discoveryResult = useMemo(() => discoverArchitecture(selection), [selection]);
  const discoveryViewModel = useMemo(
    () => buildArchitectureDiscoveryViewModel(discoveryResult),
    [discoveryResult]
  );

  const totalSelectedCount = discoveryResult.totalSelectedCount;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.stackBuilder.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.stackBuilder.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.stackBuilder.subtitle}
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleShareLink}
              disabled={totalSelectedCount === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-slate-900 dark:bg-indigo-600 dark:text-white hover:bg-slate-100 dark:hover:bg-indigo-500 transition text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? t.stackBuilder.linkCopied : t.stackBuilder.shareStack}</span>
            </button>

            {totalSelectedCount > 0 && (
              <>
                <button
                  onClick={() => handleOpenWhatIf()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-500 text-white border border-indigo-400/30 transition text-xs font-bold shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.whatIf.simulateButton}</span>
                </button>

                <button
                  onClick={handleClearStack}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-rose-400 hover:bg-slate-800 border border-slate-700 transition text-xs font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.stackBuilder.clearStack}</span>
                </button>
              </>
            )}

            <span className="text-xs font-mono text-slate-400 pl-2">
              {totalSelectedCount === 1
                ? t.stackBuilder.technologiesCountSingular
                : t.stackBuilder.technologiesCount.replace('{count}', String(totalSelectedCount))}
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Layer-by-Layer Technology Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Core Runtime Stack Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                <span>{t.stackBuilder.coreLayersTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.stackBuilder.coreLayersSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {CORE_STACK_LAYER_IDS.map((layerId) => {
                const layer = stackLayers.find((l) => l.id === layerId);
                if (!layer) return null;

                return (
                  <LayerTechSelector
                    key={layer.id}
                    layer={layer}
                    selectedTechIds={selection[layer.id] || []}
                    onToggle={(techId) => handleToggleTechnology(layer.id, techId)}
                    onRemove={(techId) => handleRemoveTechnology(layer.id, techId)}
                    onOpenWhatIf={handleOpenWhatIf}
                    highlight={highlightLayerId === layer.id}
                  />
                );
              })}
            </div>
          </div>

          {/* Supporting & Cross-Cutting Layers Section */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setShowSupporting(!showSupporting)}
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 flex items-center justify-between transition text-left"
            >
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{t.stackBuilder.supportingLayersTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.stackBuilder.supportingLayersSubtitle}
                </p>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showSupporting ? 'rotate-180' : ''}`} />
            </button>

            {showSupporting && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                {SUPPORTING_STACK_LAYER_IDS.map((layerId) => {
                  const layer = stackLayers.find((l) => l.id === layerId);
                  if (!layer) return null;

                  return (
                    <LayerTechSelector
                      key={layer.id}
                      layer={layer}
                      selectedTechIds={selection[layer.id] || []}
                      onToggle={(techId) => handleToggleTechnology(layer.id, techId)}
                      onRemove={(techId) => handleRemoveTechnology(layer.id, techId)}
                      onOpenWhatIf={handleOpenWhatIf}
                      highlight={highlightLayerId === layer.id}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Preview, Architecture Discovery, Gap Analysis & Paths (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* 1. Stack Visual Preview Ladder */}
          <StackPreviewLadder
            selection={selection}
            onSelectLayer={(layerId) => setHighlightLayerId(layerId)}
          />

          {/* 2. Architecture Discovery Summary & Decision Support */}
          {discoveryViewModel.isEmptySelection ? (
            <DiscoveryEmptyState type="empty" />
          ) : discoveryViewModel.isWeakMatch ? (
            <>
              <DiscoveryEmptyState type="weak" />
              <StackValidationPanel summary={discoveryResult.validation} />
              <SuggestedTechPanel
                candidates={discoveryResult.recommendedTechnologies.map((r) => ({
                  technology: r.technology,
                  layerId: r.layerId as any,
                  relationship: r.primaryRelationship,
                  priority: r.score,
                  reason: r.reasons[0] || { en: 'Recommended component', ko: '추천 구성요소' },
                }))}
                onAddTechnology={handleAddTechnology}
              />
            </>
          ) : (
            <>
              {/* Primary Architecture Summary & Layer Coverage */}
              <ArchitectureDiscoverySummary
                viewModel={discoveryViewModel}
                onAddTechnology={handleAddTechnology}
                onOpenWhatIf={handleOpenWhatIf}
              />

              {/* Actionable Gap Analysis */}
              <ArchitectureGapPanel
                gaps={discoveryViewModel.gaps}
                onAddTechnology={handleAddTechnology}
              />

              {/* Side-by-Side Top Matches Comparison */}
              {discoveryViewModel.topMatches.length > 1 && (
                <ArchitectureComparisonTable matches={discoveryViewModel.topMatches} />
              )}

              {/* Knowledge Graph Relationship Validation */}
              <StackValidationPanel summary={discoveryResult.validation} />

              {/* Execution Journeys (Stack Paths) */}
              <RelatedPathsPanel matches={discoveryResult.stackPathMatches} />

              {/* Suggested Next Technologies */}
              <SuggestedTechPanel
                candidates={discoveryResult.recommendedTechnologies.map((r) => ({
                  technology: r.technology,
                  layerId: r.layerId as any,
                  relationship: r.primaryRelationship,
                  priority: r.score,
                  reason: r.reasons[0] || { en: 'Recommended component', ko: '추천 구성요소' },
                }))}
                onAddTechnology={handleAddTechnology}
              />
            </>
          )}
        </div>
      </div>

      {/* What-if Replacement Simulation Modal */}
      <WhatIfModal
        isOpen={isWhatIfOpen}
        onClose={() => setIsWhatIfOpen(false)}
        selection={selection}
        initialTargetTechId={whatIfTargetId}
        onApplyReplacement={handleApplyReplacement}
      />
    </div>
  );
};
