import React from 'react';
import { Compass, Sparkles, Layers, Route, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface DiscoveryEmptyStateProps {
  type: 'empty' | 'weak';
  onExploreArchitecture?: () => void;
}

export const DiscoveryEmptyState: React.FC<DiscoveryEmptyStateProps> = ({ type }) => {
  const { t } = useLanguage();

  if (type === 'empty') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center border border-indigo-500/20">
          <Compass className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t.decisionSupport.emptyStateTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.decisionSupport.emptyStateDesc}
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5 pt-1">
          <Info className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t.decisionSupport.inferenceNotice}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-500/30 p-5 space-y-3">
      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
        <Sparkles className="w-4 h-4 shrink-0" />
        <h4 className="text-xs font-bold">
          {t.decisionSupport.weakStateTitle}
        </h4>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        {t.decisionSupport.weakStateDesc}
      </p>
      <div className="pt-1 text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1">
        <div className="text-[11px] text-slate-500 font-normal">{t.decisionSupport.weakNextSteps}</div>
        <ul className="list-disc list-inside text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
          <li>{t.decisionSupport.addCoreTech}</li>
          <li>{t.decisionSupport.exploreMatchingPaths}</li>
          <li>{t.decisionSupport.viewRecommendations}</li>
        </ul>
      </div>
    </div>
  );
};
