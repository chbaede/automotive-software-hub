import React from 'react';
import { Sparkles } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { TechnologyRecommendation } from '../../lib/graph';

interface SelectedTechExploreNextProps {
  exploreNextList: TechnologyRecommendation[];
  onSelectTech: (tech: StackTechnology) => void;
}

export const SelectedTechExploreNext: React.FC<SelectedTechExploreNextProps> = ({
  exploreNextList,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();

  if (exploreNextList.length === 0) return null;

  return (
    <div className="pt-4 space-y-2.5">
      <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        <span>{t.graphExplorer.exploreNext}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {exploreNextList.map((rec) => (
          <button
            key={rec.technology.id}
            type="button"
            onClick={() => onSelectTech(rec.technology)}
            className="text-left p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
              {rec.technology.name}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {rec.reasons[0] ? getLocalizedText(rec.reasons[0], language) : ''}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
