import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, BookOpen, Code2, Calendar, Building2, Search, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CategoryCard } from '../../components/cards/CategoryCard';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { events } from '../../data/events';
import { companies } from '../../data/companies';
import { TOPIC_TAXONOMY } from '../../data/taxonomy';
import { TopicId } from '../../types/taxonomy';
import { performGlobalSearch } from '../../utils/searchEngine';
import { ToolRunnerModal } from '../../components/tools/ToolRunnerModal';
import { GoogleAdBanner } from '../../components/ads/GoogleAdBanner';
import { Tool } from '../../types/tool';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState('');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const popularTopics: TopicId[] = [
    'sdv',
    'android-automotive',
    'yocto',
    'autosar',
    'qnx',
    'can',
    'someip',
    'automotive-ethernet',
    'embedded-linux',
    'functional-safety',
    'cybersecurity',
    'ros2',
  ];

  const searchResults = performGlobalSearch(heroQuery, language);
  const totalResults =
    searchResults.tools.length +
    searchResults.resources.length +
    searchResults.projects.length +
    searchResults.events.length +
    searchResults.companies.length;

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-center sm:text-left">
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          {/* Interactive Global Search Input */}
          <div className="pt-4 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl font-sans text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 transition shadow-inner"
              />
            </div>

            {/* Quick Live Search Popover */}
            {heroQuery.trim() && (
              <div className="mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 space-y-2 text-left z-20 relative max-h-72 overflow-y-auto">
                {totalResults === 0 ? (
                  <div className="p-3 text-xs text-slate-400 font-mono">
                    No matching results found for "{heroQuery}"
                  </div>
                ) : (
                  <>
                    {searchResults.tools.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-2">
                          Tools ({searchResults.tools.length})
                        </div>
                        {searchResults.tools.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setActiveTool(item.rawItem as Tool);
                              setHeroQuery('');
                            }}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-xs cursor-pointer flex justify-between"
                          >
                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                            <span className="text-brand-500 font-mono">Open Tool</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResults.resources.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-2">
                          Resources ({searchResults.resources.length})
                        </div>
                        {searchResults.resources.slice(0, 3).map((item) => (
                          <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-xs text-slate-800 dark:text-slate-200"
                          >
                            <span className="font-bold">{item.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stack Explorer Feature Showcase Banner */}
      <section className="p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-500/20 text-brand-300 text-xs font-mono font-bold rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Architecture Feature</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {t.stack.exploreStackHeroTitle}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t.stack.exploreStackHeroDesc}
          </p>
        </div>

        <Link
          to="/stack"
          className="shrink-0 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-xl shadow transition flex items-center gap-2 group z-10"
        >
          <span>{t.stack.exploreStackButton}</span>
        </Link>
      </section>

      {/* Primary Category Grid (5 Core Sections) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Primary Hub Sections
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            icon={Wrench}
            title={t.categories.toolsTitle}
            description={t.categories.toolsDesc}
            count={tools.length}
            linkTo="/tools"
          />

          <CategoryCard
            icon={BookOpen}
            title={t.categories.resourcesTitle}
            description={t.categories.resourcesDesc}
            count={resources.length}
            linkTo="/resources"
          />

          <CategoryCard
            icon={Code2}
            title={t.categories.openSourceTitle}
            description={t.categories.openSourceDesc}
            count={projects.length}
            linkTo="/open-source"
          />

          <CategoryCard
            icon={Calendar}
            title={t.categories.eventsTitle}
            description={t.categories.eventsDesc}
            count={events.length}
            linkTo="/events"
          />

          <CategoryCard
            icon={Building2}
            title={t.categories.companiesTitle}
            description={t.categories.companiesDesc}
            count={companies.length}
            linkTo="/companies"
          />
        </div>
      </section>

      {/* Popular Topics Taxonomy Section */}
      <section className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {t.hero.exploreTopics}
          </h2>
          <span className="text-xs text-slate-400 font-mono">Taxonomy Tags</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topicId) => {
            const meta = TOPIC_TAXONOMY[topicId];
            if (!meta) return null;
            const label = language === 'ko' ? meta.label.ko : meta.label.en;
            return (
              <button
                key={topicId}
                onClick={() => navigate(`/resources?topic=${topicId}`)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 rounded-lg transition border border-slate-200 dark:border-slate-800"
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Google AdSense Banner (Non-intrusive bottom unit) */}
      <GoogleAdBanner slot="9426228178" />

      {/* Tool Runner Modal */}
      <ToolRunnerModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
};

