import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { TechnologyStrategyReferenceItem } from '../../lib/domain';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface SelectedTechStrategyContextProps {
  strategyReferences: TechnologyStrategyReferenceItem[];
}

export const SelectedTechStrategyContext: React.FC<SelectedTechStrategyContextProps> = ({
  strategyReferences,
}) => {
  const { language, t } = useLanguage();

  if (strategyReferences.length === 0) return null;

  return (
    <div className="pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
          <span>{t.graphExplorer.companyStrategies}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {strategyReferences.length} {t.graphExplorer.references}
        </span>
      </div>

      <div className="space-y-2">
        {strategyReferences.map(({ strategy, reference }) => (
          <div
            key={strategy.companyId}
            className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="font-bold text-slate-900 dark:text-white">
                {strategy.companyName}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                {strategy.category}
              </span>
            </div>

            {reference?.reason && (
              <div className="text-slate-600 dark:text-slate-300 text-xs italic">
                "{getLocalizedText(reference.reason, language)}"
              </div>
            )}

            <div className="flex items-center justify-between pt-1 text-[10px]">
              {reference?.evidenceLevel && (
                <span className="px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-mono">
                  {reference.evidenceLevel}
                </span>
              )}
              <Link
                to={`/companies/strategy?company=${strategy.companyId}`}
                className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline font-semibold ml-auto focus:outline-none focus:ring-1 focus:ring-brand-500 rounded"
              >
                <span>{t.graphExplorer.viewCompanyStrategy}</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
