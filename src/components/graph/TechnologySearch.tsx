import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { searchTechnologies, getTechnologies } from '../../lib/domain';
import { useLanguage } from '../../i18n/LanguageContext';

interface TechnologySearchProps {
  currentTech: StackTechnology;
  onSelectTech: (tech: StackTechnology) => void;
}

export const TechnologySearch: React.FC<TechnologySearchProps> = ({
  currentTech,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered technology list using domain search selector (Zero direct data imports)
  const filteredTechs = useMemo(() => {
    if (!searchQuery.trim()) {
      return getTechnologies().slice(0, 10);
    }
    return searchTechnologies(searchQuery, language).slice(0, 20);
  }, [searchQuery, language]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredTechs.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? filteredTechs.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredTechs.length) {
        const selected = filteredTechs[activeIndex];
        onSelectTech(selected);
        setSearchQuery('');
        setIsOpen(false);
        setActiveIndex(-1);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search
          className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t.graphExplorer.searchPlaceholder}
          aria-label={t.graphExplorer.searchPlaceholder}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
          className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <ChevronDown
          className="absolute right-3 top-3 w-3.5 h-3.5 text-slate-400 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t.graphExplorer.title}
          className="absolute top-full left-0 right-0 mt-1.5 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-30 py-1.5 divide-y divide-slate-100 dark:divide-slate-800/60"
        >
          {filteredTechs.length === 0 ? (
            <div className="p-3 text-center text-xs text-slate-400 italic">
              {t.graphExplorer.noResultsFound}
            </div>
          ) : (
            filteredTechs.map((tech, index) => {
              const isSelected = tech.id === currentTech.id;
              const isKeyboardActive = index === activeIndex;

              return (
                <button
                  key={tech.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectTech(tech);
                    setSearchQuery('');
                    setIsOpen(false);
                    setActiveIndex(-1);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between gap-2 transition focus:outline-none ${
                    isKeyboardActive
                      ? 'bg-slate-200 dark:bg-slate-800 ring-1 ring-inset ring-brand-500'
                      : isSelected
                      ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-bold'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{tech.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {tech.layerId}
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-brand-500 text-white rounded font-mono font-bold">
                      {t.graphExplorer.focus}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
