import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Layers,
  Check,
  Circle,
  ArrowRight,
  ExternalLink,
  Plus,
  Info,
} from 'lucide-react';
import { ArchitectureDiscoveryViewModel } from '../../lib/architecture/discoveryViewModel';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { ARCHITECTURE_PROFILE_TYPE_METADATA } from '../../types/architecture';

interface ArchitectureDiscoverySummaryProps {
  viewModel: ArchitectureDiscoveryViewModel;
  onAddTechnology: (techId: string) => void;
  onOpenWhatIf: (techId: string) => void;
}

export const ArchitectureDiscoverySummary: React.FC<ArchitectureDiscoverySummaryProps> = ({
  viewModel,
  onAddTechnology,
  onOpenWhatIf,
}) => {
  const { language, t } = useLanguage();
  const { primaryArchitecture, primaryLayerCoverage, isStrongMatch } = viewModel;

  if (!primaryArchitecture) return null;

  const profile = primaryArchitecture.profile;
  const typeMeta = profile.profileType ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType] : undefined;
  const coveragePercent = Math.round(primaryArchitecture.profileCoveragePercentage);
  const matchedCount = primaryArchitecture.matchedTechnologies.length;
  const totalCount = profile.technologyIds.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-2xs">
      {/* Header: Closest Reference Architecture */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                {t.decisionSupport.bestMatch}
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{getLocalizedText(profile.name, language)}</span>
                {typeMeta && (
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {getLocalizedText(typeMeta.label, language)}
                  </span>
                )}
              </h3>
            </div>
          </div>

          <Link
            to={`/architectures/${profile.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>{t.decisionSupport.exploreInExplorer}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {getLocalizedText(profile.description, language)}
        </p>

        {/* Coverage Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {t.decisionSupport.referenceCoverage}
            </span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {coveragePercent}% ({t.decisionSupport.matchedOfTotal.replace('{matched}', String(matchedCount)).replace('{total}', String(totalCount))})
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                coveragePercent >= 75
                  ? 'bg-emerald-500'
                  : coveragePercent >= 40
                  ? 'bg-indigo-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
        </div>

        {/* Evidence & Inference Note */}
        <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
          <span>{t.decisionSupport.inferenceNotice}</span>
        </div>
      </div>

      {/* Layer-by-Layer Coverage Breakdown */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">
              {t.decisionSupport.coverageBreakdown}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" />
              {t.decisionSupport.selectedComponent}
            </span>
            <span className="flex items-center gap-1">
              <Circle className="w-2.5 h-2.5 text-slate-400" />
              {t.decisionSupport.missingComponent}
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {primaryLayerCoverage.map(({ layer, matched, missing }) => {
            const layerName = getLocalizedText(layer.name, language);
            return (
              <div
                key={layer.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
              >
                <div className="font-semibold text-slate-700 dark:text-slate-300 min-w-[140px]">
                  {layerName}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-start sm:justify-end">
                  {/* Matched Technologies */}
                  {matched.map((tech) => (
                    <div
                      key={tech.id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-semibold text-[11px]"
                    >
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <Link to={`/stack/${tech.id}`} className="hover:underline">
                        {tech.name}
                      </Link>
                      <button
                        onClick={() => onOpenWhatIf(tech.id)}
                        className="ml-1 text-[9px] px-1 py-0.2 rounded bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-bold"
                        title={t.decisionSupport.runWhatIf}
                      >
                        {t.whatIf.simulateButton}
                      </button>
                    </div>
                  ))}

                  {/* Missing Technologies */}
                  {missing.map((tech) => (
                    <div
                      key={tech.id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 text-[11px]"
                    >
                      <Circle className="w-2.5 h-2.5 text-slate-400" />
                      <Link to={`/stack/${tech.id}`} className="hover:underline">
                        {tech.name}
                      </Link>
                      <button
                        onClick={() => onAddTechnology(tech.id)}
                        className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 font-bold transition flex items-center gap-0.5"
                        title={t.decisionSupport.addToStack}
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>{t.decisionSupport.addToStack}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
