import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Code2, Search } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { TOPIC_TAXONOMY } from '../../data/taxonomy';
import { getLocalizedText } from '../../types/i18n';

export const OpenSourcePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [topicFilter, setTopicFilter] = useState<string>(searchParams.get('topic') || 'all');
  const [orgFilter, setOrgFilter] = useState<string>(searchParams.get('org') || 'all');

  const organizations = Array.from(new Set(projects.map((p) => p.organization)));

  const handleTopicChange = (top: string) => {
    setTopicFilter(top);
    setSearchParams((prev) => {
      if (top === 'all') prev.delete('topic');
      else prev.set('topic', top);
      return prev;
    });
  };

  const handleOrgChange = (org: string) => {
    setOrgFilter(org);
    setSearchParams((prev) => {
      if (org === 'all') prev.delete('org');
      else prev.set('org', org);
      return prev;
    });
  };

  const filteredProjects = projects.filter((proj) => {
    const desc = getLocalizedText(proj.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery = !query || proj.name.toLowerCase().includes(query) || desc.includes(query) || proj.tags.some((t) => t.includes(query));
    const matchesTopic = topicFilter === 'all' || proj.topics.includes(topicFilter as any);
    const matchesOrg = orgFilter === 'all' || proj.organization === orgFilter;

    return matchesQuery && matchesTopic && matchesOrg;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>Open Source Ecosystem Projects</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.openSource.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.openSource.subtitle}
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
            placeholder={t.openSource.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Topic Select */}
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

          {/* Organization Select */}
          <select
            value={orgFilter}
            onChange={(e) => handleOrgChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">All Organizations</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          No matching open-source projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}
    </div>
  );
};

