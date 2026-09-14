import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { getStackLayer } from '../../lib/domain';
import { getLayerTheme } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface SelectedTechSummaryProps {
  technology: StackTechnology;
  onCenterOnTech: (techId: string) => void;
}

export const SelectedTechSummary: React.FC<SelectedTechSummaryProps> = ({
  technology,
  onCenterOnTech,
}) => {
  const { language, t } = useLanguage();
  const layer = getStackLayer(technology.layerId);
  const layerTheme = getLayerTheme(technology.layerId);

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${layerTheme.color}20`,
                color: layerTheme.color,
              }}
            >
              {layer ? getLocalizedText(layer.name, language) : technology.layerId}
            </span>
            {technology.categories?.[0] && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {technology.categories[0]}
              </span>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {technology.name}
          </h2>
        </div>

        {/* Re-center / Focus Action Button */}
        <button
          onClick={() => onCenterOnTech(technology.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-500"
          title={t.graphExplorer.centerOnThis}
          aria-label={t.graphExplorer.centerOnThis}
        >
          <Compass className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.graphExplorer.centerOnThis}</span>
        </button>
      </div>

      {/* Functional Safety Certification Badge */}
      {technology.functionalSafety && (
        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <span>
                {technology.functionalSafety.standard || 'ISO 26262'}{' '}
                {technology.functionalSafety.asilLevel}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono">
                {technology.functionalSafety.claimType}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {getLocalizedText(technology.description, language)}
      </p>

      {/* Where Does It Fit */}
      {technology.whereDoesItFit && (
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {t.stack.whereDoesItFit}
          </div>
          <div className="text-slate-700 dark:text-slate-300">
            {getLocalizedText(technology.whereDoesItFit, language)}
          </div>
        </div>
      )}

      {/* Full Tech Details Link */}
      <div className="pt-1">
        <Link
          to={`/stack/${technology.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 hover:underline"
        >
          <span>{t.graphExplorer.openFullDetail}</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
