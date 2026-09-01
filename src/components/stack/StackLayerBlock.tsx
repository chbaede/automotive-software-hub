import React from 'react';
import { StackLayer, StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { StackTechCard } from './StackTechCard';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';

interface StackLayerBlockProps {
  layer: StackLayer;
  technologies: StackTechnology[];
  selectedTechId?: string;
  highlightedTechIds?: Set<string>;
  activeProfileTechIds?: Set<string>;
  isFilterActive?: boolean;
  onSelectTech: (tech: StackTechnology) => void;
  isExpandedMobile?: boolean;
  onToggleMobileExpand?: () => void;
  variant?: 'core' | 'cross-cutting';
}

const themeStyles: Record<string, { block: string; header: string; badge: string; title: string }> = {
  purple: {
    block: 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/60',
    header: 'bg-purple-100/70 dark:bg-purple-950/80 border-purple-200 dark:border-purple-900',
    badge: 'bg-purple-600 text-white',
    title: 'text-purple-950 dark:text-purple-100',
  },
  emerald: {
    block: 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60',
    header: 'bg-emerald-100/70 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900',
    badge: 'bg-emerald-600 text-white',
    title: 'text-emerald-950 dark:text-emerald-100',
  },
  indigo: {
    block: 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/60',
    header: 'bg-indigo-100/70 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-900',
    badge: 'bg-indigo-600 text-white',
    title: 'text-indigo-950 dark:text-indigo-100',
  },
  sky: {
    block: 'bg-sky-50/40 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/60',
    header: 'bg-sky-100/70 dark:bg-sky-950/80 border-sky-200 dark:border-sky-900',
    badge: 'bg-sky-600 text-white',
    title: 'text-sky-950 dark:text-sky-100',
  },
  amber: {
    block: 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60',
    header: 'bg-amber-100/70 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900',
    badge: 'bg-amber-600 text-white',
    title: 'text-amber-950 dark:text-amber-100',
  },
  slate: {
    block: 'bg-slate-900 border-brand-500/60 ring-2 ring-brand-500/30',
    header: 'bg-slate-950 text-white border-slate-800',
    badge: 'bg-brand-500 text-white',
    title: 'text-white',
  },
  rose: {
    block: 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60',
    header: 'bg-rose-100/70 dark:bg-rose-950/80 border-rose-200 dark:border-rose-900',
    badge: 'bg-rose-600 text-white',
    title: 'text-rose-950 dark:text-rose-100',
  },
  teal: {
    block: 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/60',
    header: 'bg-teal-100/70 dark:bg-teal-950/80 border-teal-200 dark:border-teal-900',
    badge: 'bg-teal-600 text-white',
    title: 'text-teal-950 dark:text-teal-100',
  },
  violet: {
    block: 'bg-violet-50/40 dark:bg-violet-950/20 border-violet-200 dark:border-violet-900/60',
    header: 'bg-violet-100/70 dark:bg-violet-950/80 border-violet-200 dark:border-violet-900',
    badge: 'bg-violet-600 text-white',
    title: 'text-violet-950 dark:text-violet-100',
  },
};

export const StackLayerBlock: React.FC<StackLayerBlockProps> = ({
  layer,
  technologies,
  selectedTechId,
  highlightedTechIds,
  activeProfileTechIds,
  isFilterActive,
  onSelectTech,
  isExpandedMobile = true,
  onToggleMobileExpand,
  variant = 'core',
}) => {
  const { language } = useLanguage();
  const title = getLocalizedText(layer.name, language);
  const description = getLocalizedText(layer.description, language);

  const isBaseHardware = layer.id === 'hardware-compute';
  const theme = themeStyles[layer.colorTheme] || themeStyles.indigo;

  return (
    <div className={`rounded-xl border shadow-sm overflow-hidden transition relative ${theme.block}`}>
      {/* Base Hardware Silicon Chip Badge */}
      {isBaseHardware && (
        <div className="bg-brand-600 text-white text-[10px] font-mono font-bold px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Silicon Processor & Compute Base Foundation</span>
        </div>
      )}

      {/* Header Bar */}
      <div
        onClick={onToggleMobileExpand}
        className={`flex items-center justify-between p-3.5 border-b cursor-pointer sm:cursor-default ${theme.header}`}
      >
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`text-sm font-extrabold truncate ${theme.title}`}>{title}</h3>
            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${theme.badge}`}>
              {technologies.length} Techs
            </span>
          </div>
          <p
            className={`text-[11px] line-clamp-1 ${
              isBaseHardware ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {description}
          </p>
        </div>

        {onToggleMobileExpand && (
          <button className="sm:hidden p-1 text-slate-400 shrink-0">
            {isExpandedMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Technologies Grid Container */}
      {isExpandedMobile && (
        <div className="p-3.5">
          {technologies.length === 0 ? (
            <div className="py-3 text-center text-xs text-slate-400 font-mono">
              No matching technologies in this layer.
            </div>
          ) : (
            <div
              className={
                variant === 'cross-cutting'
                  ? 'grid grid-cols-1 gap-2.5'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'
              }
            >
              {technologies.map((tech) => {
                const isSelected = selectedTechId === tech.id;
                const isHighlighted = highlightedTechIds?.has(tech.id);
                const isInActiveProfile = activeProfileTechIds?.has(tech.id);

                // If a profile or selection is active, dim technologies that are not highlighted or in profile
                const isDimmed = isFilterActive
                  ? !isSelected && !isHighlighted && !isInActiveProfile
                  : false;

                return (
                  <StackTechCard
                    key={tech.id}
                    technology={tech}
                    isSelected={isSelected}
                    isHighlighted={isHighlighted}
                    isDimmed={isDimmed}
                    isInActiveProfile={isInActiveProfile}
                    onSelect={onSelectTech}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
