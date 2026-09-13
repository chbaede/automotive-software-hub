import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Building2, Search, Compass, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { companies } from '../../data/companies';
import { CompanyCard } from '../../components/cards/CompanyCard';
import { TOPIC_TAXONOMY } from '../../data/taxonomy';
import { getLocalizedText } from '../../types/i18n';

export const CompaniesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
  const [topicFilter, setTopicFilter] = useState<string>(searchParams.get('topic') || 'all');
  const [onlyWithIr, setOnlyWithIr] = useState<boolean>(false);

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setSearchParams((prev) => {
      if (cat === 'all') prev.delete('category');
      else prev.set('category', cat);
      return prev;
    });
  };

  const handleTopicChange = (top: string) => {
    setTopicFilter(top);
    setSearchParams((prev) => {
      if (top === 'all') prev.delete('topic');
      else prev.set('topic', top);
      return prev;
    });
  };

  const filteredCompanies = companies.filter((c) => {
    const desc = getLocalizedText(c.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery =
      !query ||
      c.name.toLowerCase().includes(query) ||
      desc.includes(query) ||
      c.headquarters.toLowerCase().includes(query) ||
      (c.ticker && c.ticker.toLowerCase().includes(query)) ||
      c.technologies.some((t) => t.toLowerCase().includes(query));

    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesTopic = topicFilter === 'all' || c.automotiveTopics.includes(topicFilter as any);
    const matchesIr = !onlyWithIr || Boolean(c.irUrl);

    return matchesQuery && matchesCategory && matchesTopic && matchesIr;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>Automotive Ecosystem Reference Directory</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.companies.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.companies.subtitle}
        </p>
      </div>

      {/* Strategic Insights Hero Callout Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-brand-950 p-6 text-white border border-brand-500/30 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{t.companies.strategyInsightsBannerTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t.companies.strategyInsightsBannerTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.companies.strategyInsightsBannerDesc}
            </p>
          </div>
          <Link
            to="/companies/strategy"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm transition shadow-md hover:shadow-brand-500/25 shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>{t.companies.exploreStrategyBtn}</span>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.companies.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Category Filter Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.companies.allCategories}</option>
            <option value="oem">{t.companies.catOem}</option>
            <option value="tier1">{t.companies.catTier1}</option>
            <option value="semiconductor">{t.companies.catSemiconductor}</option>
            <option value="software-platform">{t.companies.catSoftwarePlatform}</option>
            <option value="cloud-tech">{t.companies.catCloudTech}</option>
            <option value="korean-tech">{t.companies.catKoreanTech}</option>
          </select>

          {/* Topic Select */}
          <select
            value={topicFilter}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">All Tech Topics</option>
            {Object.entries(TOPIC_TAXONOMY).map(([id, meta]) => (
              <option key={id} value={id}>
                {language === 'ko' ? meta.label.ko : meta.label.en}
              </option>
            ))}
          </select>

          {/* With Official IR Filter Toggle */}
          <button
            type="button"
            onClick={() => setOnlyWithIr(!onlyWithIr)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition ${
              onlyWithIr
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.companies.irAvailableFilter}</span>
          </button>
        </div>
      </div>

      {/* Quick Color-Coded Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {[
          { id: 'all', label: t.companies.allCategories, activeClass: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900', inactiveClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200' },
          { id: 'oem', label: t.companies.catOem, activeClass: 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950', inactiveClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/40 hover:bg-amber-500/20' },
          { id: 'tier1', label: t.companies.catTier1, activeClass: 'bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950', inactiveClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-300/40 hover:bg-blue-500/20' },
          { id: 'semiconductor', label: t.companies.catSemiconductor, activeClass: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950', inactiveClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 hover:bg-emerald-500/20' },
          { id: 'software-platform', label: t.companies.catSoftwarePlatform, activeClass: 'bg-purple-600 text-white dark:bg-purple-500 dark:text-slate-950', inactiveClass: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-300/40 hover:bg-purple-500/20' },
          { id: 'cloud-tech', label: t.companies.catCloudTech, activeClass: 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950', inactiveClass: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-300/40 hover:bg-sky-500/20' },
          { id: 'korean-tech', label: t.companies.catKoreanTech, activeClass: 'bg-rose-600 text-white dark:bg-rose-500 dark:text-slate-950', inactiveClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-300/40 hover:bg-rose-500/20' },
        ].map((pill) => (
          <button
            key={pill.id}
            onClick={() => handleCategoryChange(pill.id)}
            className={`px-3 py-1 text-xs font-bold rounded-full transition ${
              categoryFilter === pill.id ? pill.activeClass : pill.inactiveClass
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredCompanies.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          No matching ecosystem companies found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      )}
    </div>
  );
};

