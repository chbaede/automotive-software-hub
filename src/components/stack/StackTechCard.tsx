import React from 'react';
import { StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

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

  return (
    <button
      onClick={() => onSelect(technology)}
      className={`group text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full ${
        isSelected
          ? 'bg-brand-600 text-white border-brand-700 shadow-md ring-2 ring-brand-400/50'
          : isHighlighted
          ? 'bg-brand-500/10 border-brand-500 text-slate-900 dark:text-slate-100 ring-1 ring-brand-400'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-sm'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className={`font-bold text-sm leading-tight transition-colors ${
              isSelected
                ? 'text-white'
                : 'text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400'
            }`}
          >
            {technology.name}
          </span>
        </div>

        <p
          className={`text-xs line-clamp-2 leading-relaxed mb-3 ${
            isSelected ? 'text-brand-100' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {technology.categories.slice(0, 2).map((cat) => (
          <span
            key={cat}
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
              isSelected
                ? 'bg-brand-700 text-brand-100'
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
