import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Sparkles,
  ArrowRightLeft,
  Check,
  Search,
  Shield,
  Layers,
  Info,
} from 'lucide-react';
import {
  FlexibleStackSelection,
  getSelectedTechIds,
  technologyById,
  technologiesByLayerId,
} from '../../lib/graph';
import { StackTechnology } from '../../types/stack';
import { getAlternatives } from '../../lib/graph/intelligence/relationships';
import { compareWhatIfStack } from '../../lib/architecture/whatIf';
import { WhatIfComparisonPanel } from './WhatIfComparisonPanel';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface WhatIfModalProps {
  isOpen: boolean;
  onClose: () => void;
  selection: FlexibleStackSelection;
  initialTargetTechId?: string;
  onApplyReplacement: (targetTechId: string, replacementTechId: string) => void;
}

export const WhatIfModal: React.FC<WhatIfModalProps> = ({
  isOpen,
  onClose,
  selection,
  initialTargetTechId,
  onApplyReplacement,
}) => {
  const { language, t } = useLanguage();

  const selectedTechIds = useMemo(() => getSelectedTechIds(selection), [selection]);

  const [targetTechId, setTargetTechId] = useState<string>(() => {
    if (initialTargetTechId && selectedTechIds.includes(initialTargetTechId)) {
      return initialTargetTechId;
    }
    return selectedTechIds[0] || '';
  });

  const targetTech = technologyById.get(targetTechId);

  // Discover architectural alternatives for target technology
  const alternatives = useMemo(() => {
    if (!targetTechId) return [];
    return getAlternatives(targetTechId).map((a) => a.technology);
  }, [targetTechId]);

  // Candidates in the same layer as targetTech
  const sameLayerCandidates = useMemo(() => {
    if (!targetTech) return [];
    const allLayerTechs = technologiesByLayerId.get(targetTech.layerId) || [];
    return allLayerTechs.filter((tech) => tech.id !== targetTech.id);
  }, [targetTech]);

  const [replacementTechId, setReplacementTechId] = useState<string>(() => {
    if (alternatives.length > 0) return alternatives[0].id;
    if (sameLayerCandidates.length > 0) return sameLayerCandidates[0].id;
    return '';
  });

  // Search filter for replacement dropdown
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize target and replacement whenever modal opens or initialTarget changes
  useEffect(() => {
    if (!isOpen) return;

    const nextTarget =
      initialTargetTechId && selectedTechIds.includes(initialTargetTechId)
        ? initialTargetTechId
        : selectedTechIds[0] || '';

    setTargetTechId(nextTarget);

    if (nextTarget) {
      const newAlts = getAlternatives(nextTarget).map((a) => a.technology);
      const newTech = technologyById.get(nextTarget);
      const newSameLayer = newTech
        ? (technologiesByLayerId.get(newTech.layerId) || []).filter((t) => t.id !== nextTarget)
        : [];

      if (newAlts.length > 0) {
        setReplacementTechId(newAlts[0].id);
      } else if (newSameLayer.length > 0) {
        setReplacementTechId(newSameLayer[0].id);
      } else {
        setReplacementTechId('');
      }
    } else {
      setReplacementTechId('');
    }
    setSearchQuery('');
  }, [isOpen, initialTargetTechId, selectedTechIds]);

  // Update target technology
  const handleSelectTarget = (id: string) => {
    setTargetTechId(id);
    const newAlts = getAlternatives(id).map((a) => a.technology);
    const newTech = technologyById.get(id);
    const newSameLayer = newTech ? (technologiesByLayerId.get(newTech.layerId) || []).filter((t) => t.id !== id) : [];

    if (newAlts.length > 0) {
      setReplacementTechId(newAlts[0].id);
    } else if (newSameLayer.length > 0) {
      setReplacementTechId(newSameLayer[0].id);
    } else {
      setReplacementTechId('');
    }
  };

  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return sameLayerCandidates;
    const q = searchQuery.toLowerCase();
    return sameLayerCandidates.filter((tech) => {
      const name = tech.name.toLowerCase();
      const desc = getLocalizedText(tech.description, language).toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [sameLayerCandidates, searchQuery, language]);

  // Compute What-if Comparison
  const comparison = useMemo(() => {
    if (!targetTechId || !replacementTechId || targetTechId === replacementTechId) return null;
    try {
      return compareWhatIfStack(selection, targetTechId, replacementTechId);
    } catch {
      return null;
    }
  }, [selection, targetTechId, replacementTechId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {t.whatIf.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {t.whatIf.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label={t.whatIf.cancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Controls: Target Technology & Replacement Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            {/* 1. Target Tech Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t.whatIf.targetTech}</span>
              </label>
              <select
                value={targetTechId}
                onChange={(e) => handleSelectTarget(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
              >
                {selectedTechIds.map((id) => {
                  const tech = technologyById.get(id);
                  if (!tech) return null;
                  return (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} ({tech.layerId})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* 2. Replacement Tech Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
                <span>{t.whatIf.replaceWith}</span>
              </label>
              <select
                value={replacementTechId}
                onChange={(e) => setReplacementTechId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
              >
                {/* Architectural Alternatives Group */}
                {alternatives.length > 0 && (
                  <optgroup label={`⭐ ${t.discovery.architecturalAlternatives}`}>
                    {alternatives.map((alt) => (
                      <option key={alt.id} value={alt.id}>
                        {alt.name} (Direct Alternative)
                      </option>
                    ))}
                  </optgroup>
                )}

                {/* Same Layer Candidates Group */}
                <optgroup label={targetTech ? `Same Layer: ${targetTech.layerId}` : 'Candidates'}>
                  {sameLayerCandidates
                    .filter((c) => !alternatives.some((a) => a.id === c.id))
                    .map((cand) => (
                      <option key={cand.id} value={cand.id}>
                        {cand.name}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Notice */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-xl border border-indigo-500/20 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.2" />
            <span>{t.whatIf.simulationNotice}</span>
          </div>

          {/* Comparison Breakdown Panel */}
          {comparison ? (
            <WhatIfComparisonPanel comparison={comparison} />
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              {t.whatIf.selectReplacement}
            </div>
          )}
        </div>

        {/* Modal Footer Action Bar */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
          >
            {t.whatIf.cancel}
          </button>

          <button
            onClick={() => {
              if (targetTechId && replacementTechId) {
                onApplyReplacement(targetTechId, replacementTechId);
                onClose();
              }
            }}
            disabled={!targetTechId || !replacementTechId || targetTechId === replacementTechId}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Check className="w-4 h-4" />
            <span>{t.whatIf.applyReplacement}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
