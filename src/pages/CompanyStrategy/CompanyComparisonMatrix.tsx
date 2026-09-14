import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Columns3,
  X,
  Plus,
  ExternalLink,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Bot,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  getCompanyStrategy,
  getCompany,
  getRelatedTechnologiesForStrategy,
  getCompanyStrategies,
} from '../../lib/domain';
import { getCountryFlag } from '../../utils/formatters';
import { getLocalizedText } from '../../types/i18n';
import { CompanyStrategyInsight } from '../../types/strategy';

interface CompanyComparisonMatrixProps {
  selectedCompanyIds: string[];
  onSetComparison: (companyIds: string[]) => void;
  onAddCompany: (companyId: string) => void;
  onRemoveCompany: (companyId: string) => void;
  onClearComparison: () => void;
  onSelectCompany: (companyId: string) => void;
}

export const CompanyComparisonMatrix: React.FC<CompanyComparisonMatrixProps> = ({
  selectedCompanyIds,
  onSetComparison,
  onAddCompany,
  onRemoveCompany,
  onClearComparison,
  onSelectCompany,
}) => {
  const { language, t } = useLanguage();
  const allStrategies = getCompanyStrategies();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Curated Strategic Presets
  const presets = [
    {
      id: 'german-trio',
      label: t.strategyInsights.presetGermanTrio,
      companyIds: ['mercedes-benz', 'bmw-group', 'volkswagen-group'],
    },
    {
      id: 'volume-oems',
      label: t.strategyInsights.presetVolumeOems,
      companyIds: ['toyota-motor', 'volkswagen-group', 'hyundai-motor-group', 'general-motors'],
    },
    {
      id: 'us-leaders',
      label: t.strategyInsights.presetUsPioneers,
      companyIds: ['tesla', 'general-motors', 'ford'],
    },
    {
      id: 'chinese-pioneers',
      label: t.strategyInsights.presetChineseEv,
      companyIds: ['nio', 'xpeng', 'li-auto', 'byd'],
    },
    {
      id: 'silicon-giants',
      label: t.strategyInsights.presetSiliconGiants,
      companyIds: ['nvidia', 'qualcomm', 'mobileye'],
    },
    {
      id: 'tier1-leaders',
      label: t.strategyInsights.presetTier1Integrators,
      companyIds: ['hyundai-mobis', 'lg-electronics-vs'],
    },
  ];

  const selectedStrategies = selectedCompanyIds
    .map((id) => getCompanyStrategy(id))
    .filter((s): s is CompanyStrategyInsight => Boolean(s));

  const availableToAdd = allStrategies.filter(
    (s) => !selectedCompanyIds.includes(s.companyId)
  );

  const applyPreset = (companyIds: string[]) => {
    onSetComparison(companyIds);
  };

  return (
    <div id="strategy-comparison" className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      {/* Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Columns3 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.strategyInsights.comparisonTitle}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/10 text-brand-700 dark:text-brand-300">
              {selectedStrategies.length} / 4
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.strategyInsights.comparisonSubtitle}
          </p>
        </div>

        {/* Preset Chips & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedStrategies.length > 0 && (
            <button
              type="button"
              onClick={onClearComparison}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 transition cursor-pointer"
            >
              {t.strategyInsights.compareClearAll}
            </button>
          )}

          {/* Add Company Dropdown */}
          {selectedStrategies.length < 4 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.strategyInsights.compareAddBtn}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-30 p-1.5">
                  <div className="px-2 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t.strategyInsights.compareLimitNotice}
                  </div>
                  {availableToAdd.map((s) => {
                    const comp = getCompany(s.companyId);
                    return (
                      <button
                        key={s.companyId}
                        type="button"
                        onClick={() => {
                          onAddCompany(s.companyId);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-700/70 flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                          <span>{comp ? getCountryFlag(comp.headquarters) : ''}</span>
                          <span className="font-medium">{comp?.name || s.companyName}</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {s.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Strategic Presets Strip */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
          {t.strategyInsights.comparePresetsTitle}:
        </span>
        <div className="flex items-center gap-1.5">
          {presets.map((preset) => {
            const isActive =
              preset.companyIds.length === selectedCompanyIds.length &&
              preset.companyIds.every((id) => selectedCompanyIds.includes(id));

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.companyIds)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap border transition cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Content */}
      {selectedStrategies.length === 0 ? (
        <div className="p-10 text-center space-y-3">
          <Columns3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t.strategyInsights.compareEmptyPrompt}
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => applyPreset(presets[0].companyIds)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition cursor-pointer"
            >
              {presets[0].label} ({presets[0].companyIds.length}) →
            </button>
            <button
              type="button"
              onClick={() => applyPreset(presets[1].companyIds)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              {presets[1].label} ({presets[1].companyIds.length}) →
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <th className="p-3 sm:p-4 w-44 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] sticky left-0 bg-slate-50 dark:bg-slate-900 z-10">
                  {t.strategyInsights.compareColPillar}
                </th>
                {selectedStrategies.map((strat) => {
                  const comp = getCompany(strat.companyId);
                  const flag = comp ? getCountryFlag(comp.headquarters) : '';

                  return (
                    <th
                      key={strat.companyId}
                      className="p-3 sm:p-4 min-w-[260px] max-w-[320px] align-top"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 text-base font-bold text-slate-900 dark:text-white">
                            <span>{flag}</span>
                            <span>{comp?.name || strat.companyName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {strat.category}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {comp?.headquarters || strat.headquarters}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveCompany(strat.companyId)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                          title={t.strategyInsights.compareRemoveBtn}
                          aria-label={`${t.strategyInsights.compareRemoveBtn}: ${comp?.name || strat.companyName}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectCompany(strat.companyId)}
                        className="inline-flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 hover:underline mt-2 cursor-pointer font-medium"
                      >
                        <span>{t.strategyInsights.jumpToDetail}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Row: SDV & Vehicle OS */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-brand-700 dark:text-brand-400 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColSdvOs}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top space-y-1.5">
                    <div className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                      {getLocalizedText(strat.matrixSummary.sdvOs, language)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {getLocalizedText(strat.sdvArchitecture, language)}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: E/E & Zonal */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-cyan-700 dark:text-cyan-400 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColEeZonal}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top space-y-1.5">
                    <div className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                      {getLocalizedText(strat.matrixSummary.eeZonal, language)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {getLocalizedText(strat.eeZonalArchitecture, language)}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: EV Platform */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-emerald-700 dark:text-emerald-400 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColEvPlatform}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top space-y-1.5">
                    <div className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {getLocalizedText(strat.matrixSummary.evPlatform, language)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {getLocalizedText(strat.evPlatformStrategy, language)}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: Autonomous Driving & AI */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-purple-700 dark:text-purple-400 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColAdAi}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {getLocalizedText(strat.autonomousDrivingAi, language)}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Row: Software Monetization */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-amber-700 dark:text-amber-400 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColMonetization}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top">
                    {strat.softwareMonetization ? (
                      <p className="text-amber-900 dark:text-amber-300 leading-relaxed text-[11px] bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        {getLocalizedText(strat.softwareMonetization, language)}
                      </p>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">—</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Next Major Milestones */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColMilestone}</span>
                </td>
                {selectedStrategies.map((strat) => (
                  <td key={strat.companyId} className="p-3 sm:p-4 align-top space-y-1.5">
                    {strat.strategicTargets.map((target, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 p-1.5 rounded bg-slate-100/80 dark:bg-slate-800/60"
                      >
                        <span className="font-mono font-bold text-brand-600 dark:text-brand-400 shrink-0 text-[10px]">
                          {target.year}
                        </span>
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                          {getLocalizedText(target.milestone, language)}
                        </span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Row: Associated Stack Technologies (Stack Explorer Connectivity) */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-brand-500" />
                  <span>{t.strategyInsights.compareColTechs}</span>
                </td>
                {selectedStrategies.map((strat) => {
                  const relatedTechs = getRelatedTechnologiesForStrategy(strat);

                  return (
                    <td key={strat.companyId} className="p-3 sm:p-4 align-top">
                      {relatedTechs.length === 0 ? (
                        <span className="text-slate-400 italic text-[11px]">—</span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {relatedTechs.map((tech) => (
                            <Link
                              key={tech.id}
                              to={`/stack/${tech.id}`}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-brand-100 dark:hover:bg-brand-900/40 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 border border-slate-200 dark:border-slate-700/60 transition group"
                            >
                              <span>{tech.name}</span>
                              <ArrowRight className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Row: Official Sources */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 sm:p-4 font-bold text-slate-700 dark:text-slate-300 sticky left-0 bg-white dark:bg-slate-900 z-10 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.strategyInsights.compareColSources}</span>
                </td>
                {selectedStrategies.map((strat) => {
                  const latestSource = strat.sources.find((s) => s.role === 'latest') || strat.sources[0];

                  return (
                    <td key={strat.companyId} className="p-3 sm:p-4 align-top">
                      {latestSource ? (
                        <a
                          href={latestSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-brand-600 dark:text-brand-400 hover:underline font-medium"
                        >
                          <span>{getLocalizedText(latestSource.title, language)}</span>
                          {latestSource.publishedDate && (
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({latestSource.publishedDate})
                            </span>
                          )}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
