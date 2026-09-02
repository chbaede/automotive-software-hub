import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowDown,
  ExternalLink,
  Cpu,
  Info,
} from 'lucide-react';
import {
  StackSelection,
  CORE_STACK_LAYER_IDS,
  MANDATORY_CORE_STACK_LAYER_IDS,
  getLayerTechIds,
  getSelectedTechIds,
  findRelationshipBetween,
} from '../../lib/builder/stackBuilderEngine';
import { stackLayers } from '../../data/stackLayers';
import { technologyById } from '../../lib/graph';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { RELATIONSHIP_METADATA } from '../../types/relationship';

interface StackPreviewLadderProps {
  selection: StackSelection;
  onSelectLayer?: (layerId: string) => void;
}

export const StackPreviewLadder: React.FC<StackPreviewLadderProps> = ({
  selection,
  onSelectLayer,
}) => {
  const { language, t } = useLanguage();

  // Core vertical stack in hierarchical order (from Top: Application to Bottom: Hardware)
  const coreLayersReversed = [...CORE_STACK_LAYER_IDS].reverse();
  const selectedTechCount = getSelectedTechIds(selection).length;

  const populatedCoreCount = CORE_STACK_LAYER_IDS.filter(
    (lId) => getLayerTechIds(selection, lId).length > 0
  ).length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.stackBuilder.stackPreview}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {t.stackBuilder.layersSelected
            .replace('{selected}', String(populatedCoreCount))
            .replace('{total}', String(CORE_STACK_LAYER_IDS.length))}
        </span>
      </div>

      <div className="space-y-2 relative">
        {coreLayersReversed.map((layerId, idx) => {
          const layer = stackLayers.find((l) => l.id === layerId);
          if (!layer) return null;

          const isHypervisor = layerId === 'hypervisor-virtualization';
          const techIds = getLayerTechIds(selection, layerId);
          const techs = techIds
            .map((id) => technologyById.get(id))
            .filter((t): t is (typeof technologyById extends Map<any, infer V> ? V : never) => Boolean(t));

          const nextLayerId = coreLayersReversed[idx + 1];
          const nextTechIds = nextLayerId ? getLayerTechIds(selection, nextLayerId) : [];

          // Check if any technology in this layer connects to any technology in the layer below
          let adjacentRelInfo: { label: string; isVerified: boolean } | null = null;
          if (techs.length > 0 && nextTechIds.length > 0) {
            for (const currentT of techs) {
              for (const nextTId of nextTechIds) {
                const relResult = findRelationshipBetween(currentT.id, nextTId);
                if (relResult) {
                  const meta = RELATIONSHIP_METADATA[relResult.relationship.type];
                  adjacentRelInfo = {
                    label: getLocalizedText(meta?.label, language) || relResult.relationship.type,
                    isVerified: relResult.relationship.type !== 'alternative',
                  };
                  break;
                }
              }
              if (adjacentRelInfo) break;
            }
          }

          const layerName = getLocalizedText(layer.name, language);

          return (
            <React.Fragment key={layer.id}>
              {/* Layer Card */}
              <div
                onClick={() => onSelectLayer && onSelectLayer(layer.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  techs.length > 0
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/40 hover:border-indigo-500 shadow-2xs'
                    : isHypervisor
                    ? 'bg-slate-50/70 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    : 'bg-slate-50/40 dark:bg-slate-950/30 border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                        {layer.order}
                      </span>
                      <div className="text-[10px] font-mono uppercase font-semibold text-slate-400 tracking-wider truncate">
                        {layerName}
                      </div>
                    </div>

                    {isHypervisor && techs.length === 0 && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t.stackBuilder.optionalLayer}
                      </span>
                    )}
                  </div>

                  {/* Selected Technologies Chips or Bare Metal / Empty State */}
                  {techs.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {techs.map((tech) => (
                        <span
                          key={tech.id}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-800 text-xs font-bold text-slate-900 dark:text-white shadow-2xs"
                        >
                          <Link
                            to={`/stack/${tech.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                            title={t.techDetail.viewTechnology}
                          >
                            <span>{tech.name}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </Link>
                          {tech.functionalSafety?.asilLevel && (
                            <span className="text-[8px] font-mono font-bold px-1 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300">
                              {tech.functionalSafety.asilLevel}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : isHypervisor ? (
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pl-7">
                      <Cpu className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.stackBuilder.bareMetalDirect}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 pl-7">
                      {t.stackBuilder.notSelected}
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Link Badge between Layers */}
              {idx < coreLayersReversed.length - 1 && (
                <div className="flex items-center justify-center py-0.5">
                  {adjacentRelInfo ? (
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        adjacentRelInfo.isVerified
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                      }`}
                    >
                      <ArrowDown className="w-2.5 h-2.5" />
                      <span>{adjacentRelInfo.label}</span>
                    </div>
                  ) : (
                    <div className="w-0.5 h-3 bg-slate-200 dark:bg-slate-800" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
