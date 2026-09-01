import React from 'react';
import { StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { Layers } from 'lucide-react';

interface StackTechCardProps {
  technology: StackTechnology;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onSelect: (tech: StackTechnology) => void;
}

export const StackTechCard: React.FC<StackTechCardProps> = ({
  technology,
  isSelected,
  isHighlighted,
  onSelect,
}) => {
  const { language } = useLanguage();
  const description = getLocalizedText(technology.description, language);

  const isPlatform =
    technology.categories.includes('Automotive Platform') ||
    technology.categories.includes('Linux Platform');

  return (
    <button
      onClick={() => onSelect(technology)}
      className={`group relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full ${
        isSelected
          ? 'bg-brand-600 text-white border-brand-700 shadow-md ring-2 ring-brand-400/50'
          : isHighlighted
          ? 'bg-brand-500/10 border-brand-500 text-slate-900 dark:text-slate-100 ring-1 ring-brand-400'
          : isPlatform
          ? 'bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-blue-950/20 border-indigo-300 dark:border-indigo-700/60 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span
            className={`font-bold text-sm leading-tight transition-colors ${
              isSelected
                ? 'text-white'
                : isPlatform
                ? 'text-indigo-950 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                : 'text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400'
            }`}
          >
            {technology.name}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {technology.licenseType && (
              <span
                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                  technology.licenseType === 'oss'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30'
                    : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/30'
                }`}
              >
                {technology.licenseType === 'oss' ? 'OSS' : 'Commercial'}
              </span>
            )}
            {isPlatform && (
              <span
                className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-xs'
                }`}
                title="Automotive Full Platform"
              >
                <Layers className="w-2.5 h-2.5" />
                Platform
              </span>
            )}
          </div>
        </div>

        <p
          className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
            isSelected
              ? 'text-brand-100'
              : isPlatform
              ? 'text-indigo-900/80 dark:text-indigo-200/70'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {description}
        </p>
      </div>

      <div
        className={`flex flex-wrap gap-1 pt-2 border-t ${
          isSelected
            ? 'border-brand-500/50'
            : isPlatform
            ? 'border-indigo-200/60 dark:border-indigo-800/40'
            : 'border-slate-100 dark:border-slate-800/80'
        }`}
      >
        {technology.categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
              isSelected
                ? 'bg-brand-700 text-brand-100'
                : cat === 'Automotive Platform' || cat === 'Linux Platform'
                ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>
    </button>
  );
};
