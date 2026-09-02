import React from 'react';
import { Layers, ArrowDown, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { StackSelection, CORE_STACK_LAYER_IDS, findRelationshipBetween } from '../../lib/builder/stackBuilderEngine';
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
            .replace('{selected}', String(Object.keys(selection).length))
            .replace('{total}', String(CORE_STACK_LAYER_IDS.length))}
        </span>
      </div>

      <div className="space-y-2 relative">
        {coreLayersReversed.map((layerId, idx) => {
          const layer = stackLayers.find((l) => l.id === layerId);
          if (!layer) return null;

          const techId = selection[layerId];
          const tech = techId ? technologyById.get(techId) : undefined;
          const nextLayerId = coreLayersReversed[idx + 1];
          const nextTechId = nextLayerId ? selection[nextLayerId] : undefined;

          // Check relationship with adjacent layer technology below it in the ladder
          let adjacentRelInfo: { label: string; isVerified: boolean } | null = null;
          if (tech && nextTechId) {
            const relResult = findRelationshipBetween(tech.id, nextTechId);
            if (relResult) {
              const meta = RELATIONSHIP_METADATA[relResult.relationship.type];
              adjacentRelInfo = {
                label: getLocalizedText(meta?.label, language) || relResult.relationship.type,
                isVerified: relResult.relationship.type !== 'alternative',
              };
            }
          }

          const layerName = getLocalizedText(layer.name, language);

          return (
            <React.Fragment key={layer.id}>
              {/* Layer Card */}
              <div
                onClick={() => onSelectLayer && onSelectLayer(layer.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  tech
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/40 hover:border-indigo-500 shadow-2xs'
                    : 'bg-slate-50/40 dark:bg-slate-950/30 border-dashed border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                      {layer.order}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase font-semibold text-slate-400 tracking-wider truncate">
                        {layerName}
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {tech ? tech.name : t.stackBuilder.notSelected}
                      </div>
                    </div>
                  </div>

                  {tech && tech.functionalSafety?.asilLevel && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 shrink-0">
                      {tech.functionalSafety.asilLevel}
                    </span>
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

