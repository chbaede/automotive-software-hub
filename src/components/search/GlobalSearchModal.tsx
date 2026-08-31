import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Wrench, BookOpen, Code2, Calendar, Building2, ExternalLink, Layers } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { performGlobalSearch } from '../../utils/searchEngine';
import { SearchResultItem } from '../../types/search';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool?: (tool: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K) handled centrally or inside Header
  if (!isOpen) return null;

  const results = performGlobalSearch(query, language);
  const totalResults =
    (results.technologies?.length || 0) +
    results.tools.length +
    results.resources.length +
    results.projects.length +
    results.events.length +
    results.companies.length;

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();
    if (item.type === 'tool' && onSelectTool) {
      onSelectTool(item.rawItem);
      return;
    }
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.route);
    }
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    items: SearchResultItem[]
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
          {icon}
          <span>{title}</span>
        </div>
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectResult(item)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition group"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    {item.title}
                  </span>
                  {item.badgeText && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                      {item.badgeText}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.description}
                </p>
              </div>
              {item.url && <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchModal.placeholder}
            className="w-full bg-transparent font-sans text-base text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Area */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-slate-400 font-mono">
              Search by CAN ID, SOME/IP, AUTOSAR, Yocto, ISO 26262, OEM name, or tool function...
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              {t.searchModal.noResults.replace('{query}', query)}
            </div>
          ) : (
            <>
              {renderSection(
                `Stack Technologies (${results.technologies.length})`,
                <Layers className="w-3.5 h-3.5 text-brand-500" />,
                results.technologies
              )}
              {renderSection(
                t.searchModal.toolsHeader.replace('{count}', results.tools.length.toString()),
                <Wrench className="w-3.5 h-3.5 text-brand-500" />,
                results.tools
              )}
              {renderSection(
                t.searchModal.resourcesHeader.replace('{count}', results.resources.length.toString()),
                <BookOpen className="w-3.5 h-3.5 text-brand-500" />,
                results.resources
              )}
              {renderSection(
                t.searchModal.projectsHeader.replace('{count}', results.projects.length.toString()),
                <Code2 className="w-3.5 h-3.5 text-brand-500" />,
                results.projects
              )}
              {renderSection(
                t.searchModal.eventsHeader.replace('{count}', results.events.length.toString()),
                <Calendar className="w-3.5 h-3.5 text-brand-500" />,
                results.events
              )}
              {renderSection(
                t.searchModal.companiesHeader.replace('{count}', results.companies.length.toString()),
                <Building2 className="w-3.5 h-3.5 text-brand-500" />,
                results.companies
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400">
          <span>{totalResults} results found</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

