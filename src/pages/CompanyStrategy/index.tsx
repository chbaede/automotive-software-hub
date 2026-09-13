import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Bot,
  ExternalLink,
  Calendar,
  Building2,
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { companyStrategies } from '../../data/companyStrategies';
import { getLocalizedText } from '../../types/i18n';
import { StrategyCategory } from '../../types/strategy';
import { getCountryFlag, formatVerifiedDate } from '../../utils/formatters';

export const CompanyStrategyPage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Smooth scroll to anchor on initial mount or hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const getCategoryLabel = (cat: StrategyCategory): string => {
    switch (cat) {
      case 'oem':
        return t.strategyInsights.filterOem;
      case 'semiconductor':
        return t.strategyInsights.filterSemi;
      case 'tier1':
        return t.strategyInsights.filterTier1;
      default:
        return cat;
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

  const filteredStrategies = companyStrategies.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;

    const name = s.companyName.toLowerCase();
    const hq = s.headquarters.toLowerCase();
    const sdv = getLocalizedText(s.sdvArchitecture, language).toLowerCase();
    const ee = getLocalizedText(s.eeZonalArchitecture, language).toLowerCase();
    const ev = getLocalizedText(s.evPlatformStrategy, language).toLowerCase();
    const ad = getLocalizedText(s.autonomousDrivingAi, language).toLowerCase();
    const ticker = (s.ticker || '').toLowerCase();

    const matchesQuery =
      !q ||
      name.includes(q) ||
      hq.includes(q) ||
      sdv.includes(q) ||
      ee.includes(q) ||
      ev.includes(q) ||
      ad.includes(q) ||
      ticker.includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
          {t.strategyInsights.breadcrumbHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/companies" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
          {t.strategyInsights.breadcrumbCompanies}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-slate-100 font-semibold">
          {t.strategyInsights.breadcrumbCurrent}
        </span>
      </nav>

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-mono font-bold tracking-wide">
            <TrendingUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{t.strategyInsights.headerBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {t.strategyInsights.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.strategyInsights.subtitle}
          </p>
        </div>

        <Link
          to="/companies"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-800 transition shrink-0"
        >
          <span>{t.strategyInsights.backToCompanies}</span>
        </Link>
      </div>

      {/* Industry Strategic Overview Card */}
      <div className="p-6 sm:p-7 bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white rounded-2xl border border-slate-800 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-brand-400 font-bold text-base">
          <Sparkles className="w-5 h-5 text-brand-400" />
          <h2>{t.strategyInsights.executiveSummaryTitle}</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
          {t.strategyInsights.executiveSummaryDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{t.strategyInsights.overviewZonalTitle}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {t.strategyInsights.overviewZonalDesc}
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>{t.strategyInsights.overviewOsTitle}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {t.strategyInsights.overviewOsDesc}
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-sky-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>{t.strategyInsights.overviewMonetizationTitle}</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {t.strategyInsights.overviewMonetizationDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Methodology & Disclaimer Note */}
      <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          {t.strategyInsights.disclaimerNote}
        </p>
      </div>

      {/* Comparison Matrix Table (Collapsible / Summary) */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand-500" />
          <span>{t.strategyInsights.matrixTitle}</span>
        </h2>
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-3 px-4">{t.strategyInsights.colCompany}</th>
                <th className="py-3 px-4">{t.strategyInsights.colSdvOs}</th>
                <th className="py-3 px-4 hidden md:table-cell">{t.strategyInsights.colEeZonal}</th>
                <th className="py-3 px-4 hidden lg:table-cell">{t.strategyInsights.colEvPlatform}</th>
                <th className="py-3 px-4">{t.strategyInsights.colKeyMilestone}</th>
                <th className="py-3 px-4 text-right">{t.strategyInsights.colOfficialIr}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {companyStrategies.map((item) => (
                <tr
                  key={item.companyId}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    <a
                      href={`#${item.companyId}`}
                      className="hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5"
                    >
                      <span>{getCountryFlag(item.headquarters)}</span>
                      <span>{item.companyName}</span>
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                    {getLocalizedText(item.matrixSummary.sdvOs, language)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 hidden md:table-cell text-[11px]">
                    {getLocalizedText(item.matrixSummary.eeZonal, language)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 hidden lg:table-cell text-[11px]">
                    {getLocalizedText(item.matrixSummary.evPlatform, language)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-brand-600 dark:text-brand-400 text-[11px]">
                    {(() => {
                      const firstYear = item.strategicTargets[0]?.year;
                      const lastYear = item.strategicTargets[item.strategicTargets.length - 1]?.year;
                      if (!firstYear && !lastYear) return '—';
                      if (!lastYear || firstYear === lastYear) return firstYear;
                      return `${firstYear}–${lastYear}`;
                    })()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={typeof item.irUrl === 'string' ? item.irUrl : getLocalizedText(item.irUrl, language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0A66C2] hover:underline"
                    >
                      <span>IR</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Search and Filters for Detailed Cards */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.strategyInsights.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-brand-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.strategyInsights.filterAll}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('oem')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedCategory === 'oem'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.strategyInsights.filterOem}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('semiconductor')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedCategory === 'semiconductor'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.strategyInsights.filterSemi}
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('tier1')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedCategory === 'tier1'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.strategyInsights.filterTier1}
          </button>
        </div>
      </div>

      {/* Company Detailed Strategy Cards */}
      <div className="space-y-8">
        {filteredStrategies.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-sm">{t.strategyInsights.noResults}</p>
          </div>
        ) : (
          filteredStrategies.map((strategy) => (
            <div
              key={strategy.companyId}
              id={strategy.companyId}
              className="scroll-mt-24 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition hover:border-slate-300 dark:hover:border-slate-700"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded border ${getCategoryBadgeClass(strategy.category)}`}>
                      {getCategoryLabel(strategy.category)}
                    </span>
                    {strategy.ticker && (
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-semibold">
                        {strategy.exchange}: {strategy.ticker}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <span>{getCountryFlag(strategy.headquarters)}</span>
                      <span>{strategy.headquarters}</span>
                    </span>
                    {strategy.lastVerified && (
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded">
                        {t.strategyInsights.verifiedDateLabel.replace(
                          '{date}',
                          formatVerifiedDate(strategy.lastVerified, language)
                        )}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    {strategy.companyName}
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  <a
                    href={typeof strategy.irUrl === 'string' ? strategy.irUrl : getLocalizedText(strategy.irUrl, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition shadow-xs"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t.strategyInsights.visitOfficialIr}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    to={`/companies?search=${encodeURIComponent(strategy.companyName)}`}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition"
                  >
                    <span>{t.strategyInsights.viewDirectoryProfile}</span>
                  </Link>
                </div>
              </div>

              {/* Latest Report Citation Banner */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="font-semibold text-slate-500 dark:text-slate-400">{t.strategyInsights.sectionSource}:</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {getLocalizedText(strategy.latestEventOrReport, language)}
                </span>
              </div>

              {/* Core Strategic Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SDV & OS */}
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <h3>{t.strategyInsights.sectionSdv}</h3>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {getLocalizedText(strategy.sdvArchitecture, language)}
                  </p>
                </div>

                {/* E/E Zonal */}
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <h3>{t.strategyInsights.sectionEe}</h3>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {getLocalizedText(strategy.eeZonalArchitecture, language)}
                  </p>
                </div>

                {/* EV Platform */}
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <h3>{t.strategyInsights.sectionEv}</h3>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {getLocalizedText(strategy.evPlatformStrategy, language)}
                  </p>
                </div>

                {/* AD & AI */}
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/80 space-y-2">
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
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
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
          ))
        )}
      </div>
    </div>
  );
};

