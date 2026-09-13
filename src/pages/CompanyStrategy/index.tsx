import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Bot,
  Search,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowUp,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { companyStrategies } from '../../data/companyStrategies';
import { getLocalizedText } from '../../types/i18n';
import { StrategyCategory } from '../../types/strategy';
import { getCompany } from '../../lib/domain';
import { StrategyKPIStrip } from './StrategyKPIStrip';
import { StrategicLandscapeMatrix } from './StrategicLandscapeMatrix';
import { CompanyComparisonMatrix } from './CompanyComparisonMatrix';
import { StrategicTargetsTimeline } from './StrategicTargetsTimeline';
import { StrategyQuickInsights } from './StrategyQuickInsights';
import { CompanyStrategyCard } from './CompanyStrategyCard';

export const CompanyStrategyPage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([
    'mercedes-benz',
    'bmw-group',
    'volkswagen-group',
  ]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToCompany = (companyId: string) => {
    const el = document.getElementById(`company-${companyId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (companyId: string) => {
    setSelectedCompanyIds((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), companyId];
      }
      return [...prev, companyId];
    });
  };

  const handleAddCompany = (companyId: string) => {
    if (!selectedCompanyIds.includes(companyId) && selectedCompanyIds.length < 4) {
      setSelectedCompanyIds([...selectedCompanyIds, companyId]);
    }
  };

  const handleRemoveCompany = (companyId: string) => {
    setSelectedCompanyIds(selectedCompanyIds.filter((id) => id !== companyId));
  };

  const handleClearComparison = () => {
    setSelectedCompanyIds([]);
  };

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

  const getContinentLabel = (c: string): string => {
    switch (c) {
      case 'north-america':
        return t.continents.northAmerica;
      case 'europe':
        return t.continents.europe;
      case 'asia':
        return t.continents.asia;
      case 'south-america':
        return t.continents.southAmerica;
      case 'africa':
        return t.continents.africa;
      case 'oceania':
        return t.continents.oceania;
      default:
        return c;
    }
  };

  const themes = [
    { id: 'all', label: t.strategyInsights.themeAll, icon: Filter },
    { id: 'sdv', label: t.strategyInsights.themeSdv, icon: TrendingUp },
    { id: 'ee', label: t.strategyInsights.themeEe, icon: Cpu },
    { id: 'ev', label: t.strategyInsights.themeEv, icon: Zap },
    { id: 'ad', label: t.strategyInsights.themeAd, icon: Bot },
    { id: 'monetization', label: t.strategyInsights.themeMonetization, icon: ShieldCheck },
  ];

  const filteredStrategies = companyStrategies.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const comp = getCompany(s.companyId);
    const matchesContinent = selectedContinent === 'all' || comp?.continent === selectedContinent;

    // Theme filter
    let matchesTheme = true;
    if (selectedTheme === 'monetization') {
      matchesTheme = Boolean(s.softwareMonetization);
    }

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

    return matchesCategory && matchesContinent && matchesTheme && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* 1. Breadcrumb Navigation */}
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

      {/* 2. Header Banner */}
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

      {/* 3. Industry Strategic Overview Executive Card */}
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

      {/* 4. Strategy Executive KPI Strip */}
      <StrategyKPIStrip
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedContinent={selectedContinent}
        onSelectContinent={setSelectedContinent}
      />

      {/* 5. Qualitative Strategic Landscape Matrix (2D Positioning) */}
      <StrategicLandscapeMatrix
        onSelectCompany={scrollToCompany}
        selectedCompanyIds={selectedCompanyIds}
        onToggleCompare={handleToggleCompare}
      />

      {/* 6. Side-by-Side Company Comparison Matrix */}
      <CompanyComparisonMatrix
        selectedCompanyIds={selectedCompanyIds}
        onAddCompany={handleAddCompany}
        onRemoveCompany={handleRemoveCompany}
        onClearComparison={handleClearComparison}
        onSelectCompany={scrollToCompany}
      />

      {/* 7. Strategic Targets & Milestones Timeline */}
      <StrategicTargetsTimeline onSelectCompany={scrollToCompany} />

      {/* 8. Structural Alignments & Regional Intelligence */}
      <StrategyQuickInsights onSelectCompany={scrollToCompany} />

      {/* 9. Interactive Filters & Strategic Focus Theme Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs">
        {/* Search & Category / Continent Dropdowns */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.strategyInsights.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">{t.strategyInsights.filterAll}</option>
              <option value="oem">{t.strategyInsights.filterOem}</option>
              <option value="semiconductor">{t.strategyInsights.filterSemi}</option>
              <option value="tier1">{t.strategyInsights.filterTier1}</option>
            </select>

            {/* Continent Select */}
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">{t.strategyInsights.filterContinentAll}</option>
              <option value="north-america">{t.continents.northAmerica}</option>
              <option value="europe">{t.continents.europe}</option>
              <option value="asia">{t.continents.asia}</option>
            </select>

            {(searchQuery || selectedCategory !== 'all' || selectedContinent !== 'all' || selectedTheme !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedContinent('all');
                  setSelectedTheme('all');
                }}
                className="px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Strategic Themes Fast Filter Strip */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            {t.strategyInsights.filterStrategicThemes}:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = selectedTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    isActive
                      ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                      : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10. Filtered Company Strategy Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            {t.strategyInsights.companiesMatchingFilter.replace(
              '{count}',
              String(filteredStrategies.length)
            )}
          </span>
        </div>

        {filteredStrategies.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.strategyInsights.noResults}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStrategies.map((strategy) => (
              <CompanyStrategyCard
                key={strategy.companyId}
                strategy={strategy}
                isComparing={selectedCompanyIds.includes(strategy.companyId)}
                onToggleCompare={handleToggleCompare}
                selectedTheme={selectedTheme}
              />
            ))}
          </div>
        )}
      </div>

      {/* 11. Editorial Methodology & Disclaimer Note */}
      <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          {t.strategyInsights.disclaimerNote}
        </p>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-brand-600 text-white shadow-xl hover:bg-brand-700 transition z-40 cursor-pointer flex items-center justify-center"
          title={t.strategyInsights.scrollUp}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
