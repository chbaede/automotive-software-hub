import React, { useState, useMemo } from 'react';
import {
  Check,
  ChevronDown,
  X,
  Plus,
  Shield,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  Info,
} from 'lucide-react';
import { StackLayer, StackTechnology } from '../../types/stack';
import { technologiesByLayerId, technologyById } from '../../lib/graph';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface LayerTechSelectorProps {
  layer: StackLayer;
  selectedTechIds?: string[];
  onToggle: (techId: string) => void;
  onRemove: (techId: string) => void;
  highlight?: boolean;
}

export const LayerTechSelector: React.FC<LayerTechSelectorProps> = ({
  layer,
  selectedTechIds = [],
  onToggle,
  onRemove,
  highlight,
}) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTechs = useMemo(
    () =>
      selectedTechIds
        .map((id) => technologyById.get(id))
        .filter((t): t is StackTechnology => Boolean(t)),
    [selectedTechIds]
  );

  const layerTechs = useMemo(() => technologiesByLayerId.get(layer.id) || [], [layer.id]);

  const filteredTechs = useMemo(() => {
    if (!searchQuery.trim()) return layerTechs;
    const q = searchQuery.toLowerCase();
    return layerTechs.filter((tech) => {
      const name = tech.name.toLowerCase();
      const desc = getLocalizedText(tech.description, language).toLowerCase();
      const tags = (tech.tags || []).join(' ').toLowerCase();
      return name.includes(q) || desc.includes(q) || tags.includes(q);
    });
  }, [layerTechs, searchQuery, language]);

  const layerName = getLocalizedText(layer.name, language);
  const isCore = layer.layerType === 'core';
  const isHypervisor = layer.id === 'hypervisor-virtualization';

  return (
    <div
      className={`rounded-2xl border transition-all ${
        selectedTechs.length > 0
          ? 'bg-white dark:bg-slate-900 border-indigo-500/40 dark:border-indigo-500/40 shadow-xs'
          : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
      } ${highlight ? 'ring-2 ring-indigo-500/50' : ''} p-4 sm:p-5 space-y-3.5`}
    >
      {/* Layer Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/20">
            {layer.order}
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
              <span>{layerName}</span>
              <span
                className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  isCore
                    ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                }`}
              >
                {isCore ? t.architectures.coreLayer : t.architectures.crossCuttingLayer}
              </span>
              {isHypervisor && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {t.stackBuilder.optionalLayer}
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400">
            {selectedTechs.length > 0
              ? `${selectedTechs.length} / ${layerTechs.length}`
              : layerTechs.length === 1
              ? t.stackBuilder.technologiesCountSingular
              : t.stackBuilder.technologiesCount.replace('{count}', String(layerTechs.length))}
          </span>
        </div>
      </div>

      {/* Hypervisor Optional Note (When Unselected) */}
      {isHypervisor && selectedTechs.length === 0 && (
        <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>{t.stackBuilder.optionalLayerDesc}</span>
        </div>
      )}

      {/* Selected Technologies List (Multi-Select Support) */}
      {selectedTechs.length > 0 && (
        <div className="space-y-2">
          {selectedTechs.map((tech) => (
            <div
              key={tech.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-indigo-500/30 dark:border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tech.name}
                  </span>
                  {tech.functionalSafety && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                      {tech.functionalSafety.asilLevel || 'ISO 26262'}
                    </span>
                  )}
                  {tech.licenseType && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tech.licenseType.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                  {getLocalizedText(tech.description, language)}
                </p>
              </div>

              <button
                onClick={() => onRemove(tech.id)}
                className="p-1 self-end sm:self-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition shrink-0"
                title={t.stackBuilder.removeSelection}
                aria-label={t.stackBuilder.removeSelection}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Technology Button (Allows adding more technologies to this layer) */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full py-2 px-3 rounded-xl border ${
            selectedTechs.length === 0
              ? 'border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300'
          } text-xs font-semibold flex items-center justify-between transition-all`}
        >
          <div className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              {selectedTechs.length === 0
                ? t.stackBuilder.selectTechnology
                : t.stackBuilder.addTechnology}
            </span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown / Multi-Select Search List */}
      {isOpen && (
        <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.stackBuilder.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredTechs.length > 0 ? (
              filteredTechs.map((tech) => {
                const isSelected = selectedTechIds.includes(tech.id);
                const techDesc = getLocalizedText(tech.description, language);
                return (
                  <button
                    key={tech.id}
                    onClick={() => {
                      onToggle(tech.id);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800'
                        : 'hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold truncate">{tech.name}</span>
                        {tech.functionalSafety && (
                          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 shrink-0">
                            {tech.functionalSafety.asilLevel || 'Safety'}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {techDesc}
                      </p>
                    </div>

                    {isSelected ? (
                      <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-400 opacity-60 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 text-center py-3">
                {t.stackBuilder.noTechsFound}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
