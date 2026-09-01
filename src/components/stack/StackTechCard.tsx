import React from 'react';
import { StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { Layers, Sparkles } from 'lucide-react';

interface StackTechCardProps {
  technology: StackTechnology;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  isInActiveProfile?: boolean;
  onSelect: (tech: StackTechnology) => void;
}

export const StackTechCard: React.FC<StackTechCardProps> = ({
  technology,
  isSelected,
  isHighlighted,
  isDimmed,
  isInActiveProfile,
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
          ? 'bg-brand-600 text-white border-brand-700 shadow-lg ring-2 ring-brand-400/60 scale-[1.02] z-10'
          : isHighlighted
          ? 'bg-brand-500/15 border-brand-500 text-slate-900 dark:text-slate-100 ring-2 ring-brand-400/60 shadow-md scale-[1.01] z-10'
          : isInActiveProfile
          ? 'bg-white dark:bg-slate-900 border-brand-500/60 text-slate-900 dark:text-slate-100 ring-1 ring-brand-500/30 shadow-sm'
          : isPlatform
          ? 'bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-blue-950/20 border-indigo-300 dark:border-indigo-700/60 hover:border-indigo-500 dark:hover:border-indigo-400 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-sm'
      } ${
        isDimmed && !isSelected && !isHighlighted
          ? 'opacity-40 hover:opacity-100 filter grayscale-[25%] hover:grayscale-0'
          : 'opacity-100'
      }`}
    >
      <div>
        <div className="flex flex-col gap-1.5 mb-2">
          <div className="flex items-start justify-between gap-1">
            <span
              className={`font-bold text-sm leading-snug transition-colors ${
                isSelected
                  ? 'text-white'
                  : isPlatform
                  ? 'text-indigo-950 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                  : 'text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400'
              }`}
            >
              {technology.name}
            </span>

            {isInActiveProfile && !isSelected && !isHighlighted && (
              <span className="shrink-0 p-0.5 text-brand-500" title="Core Profile Node">
                <Sparkles className="w-3 h-3" />
              </span>
            )}
          </div>

          {(technology.asilLevel || technology.licenseType || isPlatform) && (
            <div className="flex flex-wrap items-center gap-1">
              {(technology.functionalSafety || technology.asilLevel) && (() => {
                const fs = technology.functionalSafety;
                const asil = fs?.asilLevel || technology.asilLevel;
                const claimType = fs?.claimType;

                let safetyLabel = asil || 'ISO 26262';
                if (claimType === 'certified' && asil) {
                  safetyLabel = `${asil} · Certified`;
                } else if (claimType === 'capable' && asil) {
                  safetyLabel = `${asil} · Capable`;
                } else if (claimType === 'compliant' && asil) {
                  safetyLabel = `${asil} · Compliant`;
                } else if (claimType === 'supports' && asil) {
                  safetyLabel = `Supports ${asil}`;
                } else if (claimType === 'suitable') {
                  safetyLabel = `ISO 26262`;
                }

                return (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      asil === 'ASIL-D'
                        ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-400/40'
                        : asil === 'ASIL-C' || asil === 'ASIL-B'
                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/40'
                        : 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-400/40'
                    }`}
                    title={fs?.standard ? `${fs.standard} Functional Safety (${claimType || 'context'})` : 'Functional Safety'}
                  >
                    {safetyLabel}
                  </span>
                );
              })()}
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
          )}
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
