import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Bot,
  ExternalLink,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Columns3,
  Building2,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CompanyStrategyInsight, StrategyCategory } from '../../types/strategy';
import { getLocalizedText } from '../../types/i18n';
import { getCountryFlag } from '../../utils/formatters';
import {
  getCompany,
  getRelatedTechnologiesForStrategy,
} from '../../lib/domain';

interface CompanyStrategyCardProps {
  strategy: CompanyStrategyInsight;
  isComparing: boolean;
  onToggleCompare: (companyId: string) => void;
  selectedTheme: string;
}

export const CompanyStrategyCard: React.FC<CompanyStrategyCardProps> = ({
  strategy,
  isComparing,
  onToggleCompare,
  selectedTheme,
}) => {
  const { language, t } = useLanguage();
  const company = getCompany(strategy.companyId);
  const relatedTechs = getRelatedTechnologiesForStrategy(strategy);

  const getCategoryBadgeClass = (cat: StrategyCategory): string => {
    switch (cat) {
      case 'oem':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300/40 dark:border-amber-800/40';
      case 'semiconductor':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300/40 dark:border-emerald-800/40';
      case 'tier1':
        return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-300/40 dark:border-blue-800/40';
      default:
        return 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-300/40 dark:border-slate-800/40';
    }
  };

  const getSourceTypeLabel = (sourceType: string): string => {
    switch (sourceType) {
      case 'annual-report':
        return t.strategyInsights.sourceTypeAnnualReport;
      case 'investor-presentation':
        return t.strategyInsights.sourceTypeInvestorPresentation;
      case 'capital-markets-day':
        return t.strategyInsights.sourceTypeCapitalMarketsDay;
      case 'shareholder-letter':
        return t.strategyInsights.sourceTypeShareholderLetter;
      case 'press-release':
        return t.strategyInsights.sourceTypePressRelease;
      case 'official-event':
        return t.strategyInsights.sourceTypeOfficialEvent;
      case 'official-website':
        return t.strategyInsights.sourceTypeOfficialWebsite;
      default:
        return sourceType;
    }
  };

  const isThemeActive = (theme: string) => selectedTheme === theme;

  return (
    <div
      id={`company-${strategy.companyId}`}
      className={`rounded-2xl border bg-white dark:bg-slate-900 p-5 sm:p-7 space-y-6 shadow-xs transition-all ${
        isComparing
          ? 'border-brand-500 ring-2 ring-brand-500/20'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Card Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl" role="img" aria-label="country flag">
              {getCountryFlag(company?.headquarters || strategy.headquarters)}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {company?.name || strategy.companyName}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider ${getCategoryBadgeClass(
                strategy.category
              )}`}
            >
              {strategy.category}
            </span>
            {company?.continent && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 capitalize">
                {t.continents[
                  company.continent === 'north-america'
                    ? 'northAmerica'
                    : company.continent === 'south-america'
                    ? 'southAmerica'
                    : company.continent
                ] || company.continent}
              </span>
            )}
            {strategy.ticker && (
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold">
                {strategy.exchange ? `${strategy.exchange}: ` : ''}
                {strategy.ticker}
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3">
            <span>{company?.headquarters || strategy.headquarters}</span>
            <span>•</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {getLocalizedText(strategy.latestEventOrReport, language)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleCompare(strategy.companyId)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isComparing
                ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>
              {isComparing
                ? t.strategyInsights.compareAddedBtn
                : t.strategyInsights.compareAddBtn}
            </span>
          </button>

          {strategy.irUrl && (
            <a
              href={typeof strategy.irUrl === 'string' ? strategy.irUrl : strategy.irUrl.en}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition border border-slate-200 dark:border-slate-700/80 group"
            >
              <span>{t.strategyInsights.visitOfficialIr}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
            </a>
          )}

          <Link
            to={`/companies?search=${encodeURIComponent(company?.name || strategy.companyName)}`}
            className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium px-2 py-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.strategyInsights.viewDirectoryProfile}</span>
          </Link>
        </div>
      </div>

      {/* Strategic Snapshot Matrix Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          className={`p-3 rounded-xl border transition-all ${
            isThemeActive('sdv')
              ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-400 dark:border-brand-600 ring-2 ring-brand-400/20'
              : 'bg-slate-50/80 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.strategyInsights.colSdvOs}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            {getLocalizedText(strategy.matrixSummary.sdvOs, language)}
          </p>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all ${
            isThemeActive('ee')
              ? 'bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-600 ring-2 ring-cyan-400/20'
              : 'bg-slate-50/80 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.strategyInsights.colEeZonal}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            {getLocalizedText(strategy.matrixSummary.eeZonal, language)}
          </p>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all ${
            isThemeActive('ev')
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/20'
              : 'bg-slate-50/80 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.strategyInsights.colEvPlatform}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">
            {getLocalizedText(strategy.matrixSummary.evPlatform, language)}
          </p>
        </div>
      </div>

      {/* Connected Stack Technologies (Stack Explorer Linking) */}
      {relatedTechs.length > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-950/30 border border-slate-200/70 dark:border-slate-800/70 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>{t.strategyInsights.linkedStackTechnologies}</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {t.strategyInsights.viewInStackExplorer}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedTechs.map((tech) => {
              const ref = strategy.relatedTechnologies?.find((r) => r.technologyId === tech.id);
              const reasonText = ref?.reason ? getLocalizedText(ref.reason, language) : null;

              return (
                <div
                  key={tech.id}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/stack/${tech.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition group"
                    >
                      <span>{tech.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                    </Link>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {ref?.evidenceLevel && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {ref.evidenceLevel === 'specific-document'
                            ? t.strategyInsights.evidenceLevelSpecificDocument
                            : ref.evidenceLevel === 'official-event'
                            ? t.strategyInsights.evidenceLevelOfficialEvent
                            : t.strategyInsights.evidenceLevelOfficialIrPage}
                        </span>
                      )}
                      {ref?.sourceUrl && (
                        <a
                          href={ref.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-brand-600 dark:text-brand-400 hover:underline transition shrink-0 font-medium"
                          title={`${t.strategyInsights.sourceEvidence}: ${tech.name}`}
                          aria-label={`${t.strategyInsights.sourceEvidence} for ${tech.name}`}
                        >
                          <span>{t.strategyInsights.sourceEvidence}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  {reasonText && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                      {reasonText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4 Architectural Strategy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SDV & Vehicle OS */}
        <div
          className={`p-4 rounded-xl border space-y-2 transition-all ${
            isThemeActive('sdv')
              ? 'bg-brand-50/70 dark:bg-brand-950/30 border-brand-400 dark:border-brand-700'
              : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <h3>{t.strategyInsights.sectionSdv}</h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {getLocalizedText(strategy.sdvArchitecture, language)}
          </p>
        </div>

        {/* E/E Zonal Compute */}
        <div
          className={`p-4 rounded-xl border space-y-2 transition-all ${
            isThemeActive('ee')
              ? 'bg-cyan-50/70 dark:bg-cyan-950/30 border-cyan-400 dark:border-cyan-700'
              : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <h3>{t.strategyInsights.sectionEe}</h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {getLocalizedText(strategy.eeZonalArchitecture, language)}
          </p>
        </div>

        {/* EV Platform */}
        <div
          className={`p-4 rounded-xl border space-y-2 transition-all ${
            isThemeActive('ev')
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-700'
              : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <h3>{t.strategyInsights.sectionEv}</h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {getLocalizedText(strategy.evPlatformStrategy, language)}
          </p>
        </div>

        {/* AD & AI */}
        <div
          className={`p-4 rounded-xl border space-y-2 transition-all ${
            isThemeActive('ad')
              ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-400 dark:border-purple-700'
              : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
            <Bot className="w-4 h-4" />
            <h3>{t.strategyInsights.sectionAd}</h3>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {getLocalizedText(strategy.autonomousDrivingAi, language)}
          </p>
        </div>
      </div>

      {/* Software Monetization (if present) */}
      {strategy.softwareMonetization && (
        <div
          className={`p-4 rounded-xl border space-y-1.5 transition-all ${
            isThemeActive('monetization')
              ? 'bg-amber-500/20 border-amber-500/50 ring-2 ring-amber-400/20'
              : 'bg-amber-500/10 border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <h3>{t.strategyInsights.sectionMonetization}</h3>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            {getLocalizedText(strategy.softwareMonetization, language)}
          </p>
        </div>
      )}

      {/* Strategic Targets Timeline */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{t.strategyInsights.sectionTargets}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {strategy.strategicTargets.map((target, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <span className="inline-block font-mono font-black text-sm text-brand-600 dark:text-brand-400">
                {target.year}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {getLocalizedText(target.milestone, language)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Traceable Sources */}
      {strategy.sources && strategy.sources.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-brand-500" />
            <span>{t.strategyInsights.sectionSources}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {strategy.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs transition group shadow-2xs"
              >
                {source.role === 'latest' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    {t.strategyInsights.sourceRoleLatest || 'Latest'}
                  </span>
                )}
                {source.role === 'historical' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    {t.strategyInsights.sourceRoleHistorical || 'Historical'}
                  </span>
                )}
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                  {getSourceTypeLabel(source.sourceType)}
                </span>
                <span className="font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {getLocalizedText(source.title, language)}
                </span>
                {source.publishedDate && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({source.publishedDate})
                  </span>
                )}
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
