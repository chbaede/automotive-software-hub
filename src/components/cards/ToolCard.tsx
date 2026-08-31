import React from 'react';
import { Wrench, Clock, Play } from 'lucide-react';
import { Tool } from '../../types/tool';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ToolCardProps {
  tool: Tool;
  onOpen: (tool: Tool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpen }) => {
  const { language, t } = useLanguage();
  const name = getLocalizedText(tool.name, language);
  const description = getLocalizedText(tool.description, language);
  const isAvailable = tool.status === 'available';

  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
            {tool.category}
          </span>

          {isAvailable ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.tools.availableBadge}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3" />
              {t.tools.plannedBadge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        {isAvailable ? (
          <button
            onClick={() => onOpen(tool)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.tools.openTool}</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.tools.plannedBadge}</span>
          </button>
        )}
      </div>
    </div>
  );
};

