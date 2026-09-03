import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ArrowRightLeft,
  Compass,
  Layers,
  Route,
  CheckCircle2,
  Wrench,
  Tag,
  Shield,
} from 'lucide-react';
import { architectureProfiles } from '../../data/architectureProfiles';
import { compareArchitectures, convertArchitectureToStackSelection } from '../../lib/architecture/comparison';
import { encodeStackToSearchParams } from '../../lib/builder/stackBuilderEngine';
import { ARCHITECTURE_PROFILE_TYPE_METADATA } from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ArchitectureComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialArchAId?: string;
  initialArchBId?: string;
}

export const ArchitectureComparisonModal: React.FC<ArchitectureComparisonModalProps> = ({
  isOpen,
  onClose,
  initialArchAId,
  initialArchBId,
}) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [archAId, setArchAId] = useState<string>(() => {
    return initialArchAId || architectureProfiles[0]?.id || '';
  });

  const [archBId, setArchBId] = useState<string>(() => {
    return (
      initialArchBId ||
      architectureProfiles.find((p) => p.id !== (initialArchAId || architectureProfiles[0]?.id))?.id ||
      architectureProfiles[1]?.id ||
      ''
    );
  });

  const comparison = useMemo(() => {
    if (!archAId || !archBId || archAId === archBId) return null;
    try {
      return compareArchitectures(archAId, archBId);
    } catch {
      return null;
    }
  }, [archAId, archBId]);

  if (!isOpen) return null;

  const handleBuildStack = (profileId: string) => {
    const profile = architectureProfiles.find((p) => p.id === profileId);
    if (!profile) return;
    const selection = convertArchitectureToStackSelection(profile);
    const searchParams = encodeStackToSearchParams(selection);
    navigate(`/stack-builder?${searchParams.toString()}`);
  };

  const typeMetaA = comparison?.architectureA.profileType
    ? ARCHITECTURE_PROFILE_TYPE_METADATA[comparison.architectureA.profileType]
    : undefined;
  const typeMetaB = comparison?.architectureB.profileType
    ? ARCHITECTURE_PROFILE_TYPE_METADATA[comparison.architectureB.profileType]
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                {t.architectures.comparisonTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {t.architectures.subtitle}
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
          {/* Architecture Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            {/* Architecture A */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-500" />
                <span>Architecture A</span>
              </label>
              <select
                value={archAId}
                onChange={(e) => setArchAId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-semibold"
              >
                {architectureProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {getLocalizedText(p.name, language)} ({p.profileType})
                  </option>
                ))}
              </select>
            </div>

            {/* Architecture B */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-500" />
                <span>Architecture B</span>
              </label>
              <select
                value={archBId}
                onChange={(e) => setArchBId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-cyan-500 font-semibold"
              >
                {architectureProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {getLocalizedText(p.name, language)} ({p.profileType})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {comparison ? (
            <div className="space-y-6">
              {/* Architecture Summaries Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Arch A Card */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                      {getLocalizedText(typeMetaA?.label, language)}
                    </span>
                    <button
                      onClick={() => handleBuildStack(comparison.architectureA.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>{t.architectures.buildThisArchitecture}</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {getLocalizedText(comparison.architectureA.name, language)}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {getLocalizedText(comparison.architectureA.description, language)}
                    </p>
                  </div>
                </div>

                {/* Arch B Card */}
                <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                      {getLocalizedText(typeMetaB?.label, language)}
                    </span>
                    <button
                      onClick={() => handleBuildStack(comparison.architectureB.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs transition"
                    >
                      <Wrench className="w-3 h-3" />
                      <span>{t.architectures.buildThisArchitecture}</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {getLocalizedText(comparison.architectureB.name, language)}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                      {getLocalizedText(comparison.architectureB.description, language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. Technologies Breakdown: Shared vs Unique */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.architectures.techComposition}
                  </h4>
                </div>

                {/* Shared Technologies */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>{t.architectures.sharedTechnologies}</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {comparison.sharedTechnologies.length} {t.architectures.technologiesCount.replace('{count}', '')}
                    </span>
                  </div>
                  {comparison.sharedTechnologies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {comparison.sharedTechnologies.map((tech) => (
                        <Link
                          key={tech.id}
                          to={`/stack/${tech.id}`}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-500 transition"
                        >
                          {tech.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400">No overlapping technologies.</p>
                  )}
                </div>

                {/* Unique in A vs Unique in B */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Unique in A */}
                  <div className="p-3 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                    <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                      Only in {getLocalizedText(comparison.architectureA.name, language)} ({comparison.onlyTechnologiesInA.length})
                    </div>
                    {comparison.onlyTechnologiesInA.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {comparison.onlyTechnologiesInA.map((tech) => (
                          <Link
                            key={tech.id}
                            to={`/stack/${tech.id}`}
                            className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-900 border border-indigo-500/30 text-indigo-950 dark:text-indigo-200 hover:border-indigo-400 transition"
                          >
                            {tech.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">No unique technologies.</p>
                    )}
                  </div>

                  {/* Unique in B */}
                  <div className="p-3 rounded-xl bg-cyan-50/30 dark:bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                    <div className="text-xs font-bold text-cyan-800 dark:text-cyan-300">
                      Only in {getLocalizedText(comparison.architectureB.name, language)} ({comparison.onlyTechnologiesInB.length})
                    </div>
                    {comparison.onlyTechnologiesInB.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {comparison.onlyTechnologiesInB.map((tech) => (
                          <Link
                            key={tech.id}
                            to={`/stack/${tech.id}`}
                            className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-900 border border-cyan-500/30 text-cyan-950 dark:text-cyan-200 hover:border-cyan-400 transition"
                          >
                            {tech.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400">No unique technologies.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Stack Paths & Execution Journeys */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-indigo-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {t.architectures.stackPathsHeader}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Paths in A */}
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-700 dark:text-slate-300">
                      {getLocalizedText(comparison.architectureA.name, language)} ({comparison.sharedPaths.length + comparison.onlyPathsInA.length})
                    </div>
                    {[...comparison.sharedPaths, ...comparison.onlyPathsInA].map((p) => (
                      <div
                        key={p.id}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-white"
                      >
                        {getLocalizedText(p.name, language)}
                      </div>
                    ))}
                  </div>

                  {/* Paths in B */}
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-700 dark:text-slate-300">
                      {getLocalizedText(comparison.architectureB.name, language)} ({comparison.sharedPaths.length + comparison.onlyPathsInB.length})
                    </div>
                    {[...comparison.sharedPaths, ...comparison.onlyPathsInB].map((p) => (
                      <div
                        key={p.id}
                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-medium text-slate-900 dark:text-white"
                      >
                        {getLocalizedText(p.name, language)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              {t.architectures.selectArchToCompare}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            {t.whatIf.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
