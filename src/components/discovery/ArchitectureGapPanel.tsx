import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Plus, ArrowRight, Layers, Network, Compass } from 'lucide-react';
import { ActionableGapItem } from '../../lib/architecture/discoveryViewModel';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ArchitectureGapPanelProps {
  gaps: ActionableGapItem[];
  onAddTechnology: (techId: string) => void;
}

export const ArchitectureGapPanel: React.FC<ArchitectureGapPanelProps> = ({
  gaps,
  onAddTechnology,
}) => {
  const { language, t } = useLanguage();

  if (!gaps || gaps.length === 0) return null;

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'architecture-gap':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
            <Compass className="w-2.5 h-2.5" />
            <span>{t.decisionSupport.architectureGap}</span>
          </span>
        );
      case 'layer-gap':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            <Layers className="w-2.5 h-2.5" />
            <span>{t.decisionSupport.layerGap}</span>
          </span>
        );
      case 'connectivity-gap':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
            <Network className="w-2.5 h-2.5" />
            <span>{t.decisionSupport.connectivityGap}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              {t.decisionSupport.actionableGaps}
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.decisionSupport.actionableGapsDesc}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {gaps.length} Gaps
        </span>
      </div>

      <div className="space-y-2.5">
        {gaps.slice(0, 5).map((gap) => {
          const title = getLocalizedText(gap.title, language);
          const desc = getLocalizedText(gap.description, language);
          const actionLabel = gap.actionLabel ? getLocalizedText(gap.actionLabel, language) : undefined;

          return (
            <div
              key={gap.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getCategoryBadge(gap.category)}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {gap.technology && (
                  <Link
                    to={`/stack/${gap.technology.id}`}
                    className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                  >
                    {t.decisionSupport.exploreTechnology}
                  </Link>
                )}

                {gap.technology && (
                  <button
                    onClick={() => onAddTechnology(gap.technology!.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xs transition"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{actionLabel || t.decisionSupport.addToStack}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

