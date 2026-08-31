import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wrench, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { tools } from '../../data/tools';
import { Tool, ToolCategory, ToolStatus } from '../../types/tool';
import { ToolCard } from '../../components/cards/ToolCard';
import { ToolRunnerModal } from '../../components/tools/ToolRunnerModal';
import { getLocalizedText } from '../../types/i18n';

export const ToolsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'all');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  // Sync URL params when clicking a tool directly via ?id=hex-dec-bin
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const found = tools.find((t) => t.id === idParam);
      if (found && found.status === 'available') {
        setActiveTool(found);
      }
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setSearchParams((prev) => {
      if (cat === 'all') prev.delete('category');
      else prev.set('category', cat);
      return prev;
    });
  };

  const handleStatusChange = (st: string) => {
    setStatusFilter(st);
    setSearchParams((prev) => {
      if (st === 'all') prev.delete('status');
      else prev.set('status', st);
      return prev;
    });
  };

  const filteredTools = tools.filter((tool) => {
    const name = getLocalizedText(tool.name, language).toLowerCase();
    const desc = getLocalizedText(tool.description, language).toLowerCase();
    const query = searchQuery.trim().toLowerCase();

    const matchesQuery = !query || name.includes(query) || desc.includes(query) || tool.tags.some((t) => t.includes(query));
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || tool.status === statusFilter;

    return matchesQuery && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>Automotive & Embedded Developer Utilities</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.tools.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          {t.tools.subtitle}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.tools.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg font-sans text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.tools.allCategories}</option>
            <option value="automotive">{t.tools.catAutomotive}</option>
            <option value="embedded">{t.tools.catEmbedded}</option>
            <option value="linux">{t.tools.catLinux}</option>
            <option value="network">{t.tools.catNetwork}</option>
            <option value="general">{t.tools.catGeneral}</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg focus:outline-none"
          >
            <option value="all">{t.tools.statusAll}</option>
            <option value="available">{t.tools.statusAvailable}</option>
            <option value="planned">{t.tools.statusPlanned}</option>
          </select>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 text-sm">
          No matching developer tools found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onOpen={(t) => setActiveTool(t)}
            />
          ))}
        </div>
      )}

      {/* Tool Runner Modal */}
      <ToolRunnerModal tool={activeTool} onClose={() => setActiveTool(null)} />
    </div>
  );
};

