import React from 'react';
import { StackLayer, StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { StackTechCard } from './StackTechCard';
import { ChevronDown, ChevronUp, Cpu, ShieldAlert, Layers } from 'lucide-react';

interface StackLayerBlockProps {
  layer: StackLayer;
  technologies: StackTechnology[];
  selectedTechId?: string;
  highlightedTechIds?: Set<string>;
  onSelectTech: (tech: StackTechnology) => void;
  isExpandedMobile?: boolean;
  onToggleMobileExpand?: () => void;
  variant?: 'core' | 'cross-cutting';
}

export const StackLayerBlock: React.FC<StackLayerBlockProps> = ({
  layer,
  technologies,
  selectedTechId,
  highlightedTechIds,
  onSelectTech,
  isExpandedMobile = true,
  onToggleMobileExpand,
  variant = 'core',
}) => {
  const { language } = useLanguage();
  const title = getLocalizedText(layer.name, language);
  const description = getLocalizedText(layer.description, language);

  const isBaseHardware = layer.id === 'hardware-compute';

  return (
    <div
      className={`rounded-xl border shadow-sm overflow-hidden transition relative ${
        isBaseHardware
          ? 'bg-slate-900 border-brand-500/50 dark:border-brand-500/60 ring-2 ring-brand-500/30'
          : variant === 'cross-cutting'
          ? 'bg-slate-900/90 dark:bg-slate-950/90 border-slate-700 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Base Hardware Chip Badge */}
      {isBaseHardware && (
        <div className="bg-brand-600 text-white text-[10px] font-mono font-bold px-3 py-1 flex items-center gap-1.5 uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Silicon & Hardware Base Foundation</span>
        </div>
      )}

      {/* Header Bar */}
      <div
        onClick={onToggleMobileExpand}
        className={`flex items-center justify-between p-3.5 border-b cursor-pointer sm:cursor-default ${
          isBaseHardware
            ? 'bg-slate-950 text-white border-slate-800'
            : variant === 'cross-cutting'
            ? 'bg-slate-800/80 text-white border-slate-700'
            : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-sm font-extrabold truncate ${
                isBaseHardware || variant === 'cross-cutting'
                  ? 'text-white'
                  : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {title}
            </h3>
            <span
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                isBaseHardware
                  ? 'bg-brand-500 text-white'
                  : variant === 'cross-cutting'
                  ? 'bg-slate-700 text-slate-200'
                  : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
              }`}
            >
              {technologies.length} Techs
            </span>
          </div>
          <p
            className={`text-[11px] line-clamp-1 ${
              isBaseHardware || variant === 'cross-cutting'
                ? 'text-slate-300'
                : 'text-slate-600 dark:text-slate-400'
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
        <div
          className={`p-3.5 ${
            isBaseHardware
              ? 'bg-slate-900/90'
              : variant === 'cross-cutting'
              ? 'bg-slate-900/60'
              : 'bg-slate-50/40 dark:bg-slate-900/40'
          }`}
        >
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
              {technologies.map((tech) => (
                <StackTechCard
                  key={tech.id}
                  technology={tech}
                  isSelected={selectedTechId === tech.id}
                  isHighlighted={highlightedTechIds?.has(tech.id)}
                  onSelect={onSelectTech}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
