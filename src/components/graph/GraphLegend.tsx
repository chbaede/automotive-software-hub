import React, { useState, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { RELATIONSHIP_VISUALS } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';

export const GraphLegend: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="absolute top-3 left-3 z-20">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-700 shadow-md transition focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={t.graphExplorer.legend}
      >
        <Info className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
        <span>{t.graphExplorer.legend}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={t.graphExplorer.legend}
          className="mt-2 p-3.5 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl text-xs space-y-2.5 max-w-xs text-slate-200 animate-in fade-in duration-150 relative"
        >
          <div className="flex items-center justify-between">
            <div className="font-bold text-[11px] uppercase tracking-wider text-slate-400">
              {t.graphExplorer.legendRelationshipTypes}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded focus:outline-none focus:ring-1 focus:ring-brand-500"
              aria-label={t.graphExplorer.closeInspector}
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            {Object.entries(RELATIONSHIP_VISUALS).map(([type, visual]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-0.5 inline-block rounded"
                  style={{ backgroundColor: visual.color }}
                  aria-hidden="true"
                />
                <span className="truncate">
                  {language === 'ko' ? visual.label.ko : visual.label.en}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 font-bold text-[11px] uppercase tracking-wider text-slate-400">
            {t.graphExplorer.legendDirectionMarkers}
          </div>
          <div className="space-y-1 text-[11px] text-slate-300">
            <div>{t.graphExplorer.legendDirectionalDesc}</div>
            <div>{t.graphExplorer.legendSymmetricDesc}</div>
          </div>
        </div>
      )}
    </div>
  );
};
