import React from 'react';
import { Sparkles, Plus, ArrowRight } from 'lucide-react';
import { TechnologyCandidate } from '../../lib/builder/stackBuilderEngine';
import { stackLayers } from '../../data/stackLayers';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { RELATIONSHIP_METADATA } from '../../types/relationship';

interface SuggestedTechPanelProps {
  candidates: TechnologyCandidate[];
  onAddTechnology: (techId: string) => void;
}

export const SuggestedTechPanel: React.FC<SuggestedTechPanelProps> = ({
  candidates,
  onAddTechnology,
}) => {
  const { language, t } = useLanguage();

  if (candidates.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.stackBuilder.suggestedCandidatesTitle}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {candidates.length} {language === 'ko' ? '개 추천' : 'Candidates'}
        </span>
      </div>

      <div className="space-y-2.5">
        {candidates.map(({ technology, layerId, connectedToTech, relationship }) => {
          const layer = stackLayers.find((l) => l.id === layerId);
          const layerName = layer ? getLocalizedText(layer.name, language) : layerId;
          const relMeta = RELATIONSHIP_METADATA[relationship.type];
          const relLabel = relMeta ? getLocalizedText(relMeta.label, language) : relationship.type;

          return (
            <div
              key={technology.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 group hover:border-indigo-400 transition"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {technology.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    ({layerName})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <span>{relLabel}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
                  <span className="truncate">{connectedToTech.name}</span>
                </div>
              </div>

              <button
                onClick={() => onAddTechnology(technology.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white border border-indigo-200 dark:border-indigo-800 transition shrink-0"
              >
                <Plus className="w-3 h-3" />
                <span>{t.stackBuilder.addCandidate}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

