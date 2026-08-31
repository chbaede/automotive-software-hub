import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { resources } from '../../data/resources';
import { ResourceCard } from '../../components/cards/ResourceCard';
import { TOPIC_TAXONOMY } from '../../data/taxonomy';
import { getLocalizedText } from '../../types/i18n';

export const ResourcesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [topicFilter, setTopicFilter] = useState<string>(searchParams.get('topic') || 'all');
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');

  const handleTopicChange = (top: string) => {
    setTopicFilter(top);
    setSearchParams((prev) => {
      if (top === 'all') prev.delete('topic');
      else prev.set('topic', top);
      return prev;
    });
  };

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setSearchParams((prev) => {
      if (cat === 'all') prev.delete('category');
      else prev.set('category', cat);
      return prev;
    });
  };

  const filteredResources = resources.filter((res) => {
    const name = getLocalizedText(res.name, language).toLowerCase();
    const desc = getLocalizedText(res.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery = !query || name.includes(query) || desc.includes(query) || res.source.toLowerCase().includes(query);
    const matchesTopic = topicFilter === 'all' || res.topics.includes(topicFilter as any);
    const matchesCategory = categoryFilter === 'all' || res.category === categoryFilter;

    return matchesQuery && matchesTopic && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Official Developer Standards & Documentation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.resources.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.resources.subtitle}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.resources.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Topic Taxonomy Select */}
          <select
            value={topicFilter}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">All Topics</option>
            {Object.entries(TOPIC_TAXONOMY).map(([id, meta]) => (
              <option key={id} value={id}>
                {language === 'ko' ? meta.label.ko : meta.label.en}
              </option>
            ))}
          </select>

          {/* Category Select */}
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.resources.allCategories}</option>
            <option value="documentation">Documentation</option>
            <option value="tutorials">Tutorials</option>
            <option value="standards">Standards</option>
            <option value="cheat-sheets">Cheat Sheets</option>
            <option value="specifications">Specifications</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          No matching resources found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      )}
    </div>
  );
};

