import React from 'react';
import { StackLayer, StackTechnology } from '../../types/stack';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { StackTechCard } from './StackTechCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StackLayerBlockProps {
  layer: StackLayer;
  technologies: StackTechnology[];
  selectedTechId?: string;
  highlightedTechIds?: Set<string>;
  onSelectTech: (tech: StackTechnology) => void;
  isExpandedMobile?: boolean;
  onToggleMobileExpand?: () => void;
}

export const StackLayerBlock: React.FC<StackLayerBlockProps> = ({
  layer,
  technologies,
  selectedTechId,
  highlightedTechIds,
  onSelectTech,
  isExpandedMobile = true,
  onToggleMobileExpand,
}) => {
  const { language } = useLanguage();
  const title = getLocalizedText(layer.name, language);
  const description = getLocalizedText(layer.description, language);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition">
      {/* Header Bar */}
      <div
        onClick={onToggleMobileExpand}
        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 cursor-pointer sm:cursor-default"
      >
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <span className="text-[10px] font-mono font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-0.5 rounded">
              {technologies.length} Techs
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">{description}</p>
        </div>

        {onToggleMobileExpand && (
          <button className="sm:hidden p-1 text-slate-400">
            {isExpandedMobile ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Technologies Grid Container */}
      {isExpandedMobile && (
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {technologies.length === 0 ? (
            <div className="py-4 text-center text-xs text-slate-400 font-mono">
              No matching technologies in this layer.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
