import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Check, Plus, ArrowRight } from 'lucide-react';
import { ArchitectureMatchResult } from '../../lib/builder/stackBuilderEngine';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { ARCHITECTURE_PROFILE_TYPE_METADATA } from '../../types/architecture';

interface ArchitectureMatchPanelProps {
  matches: ArchitectureMatchResult[];
  onAddTechnology?: (techId: string) => void;
}

export const ArchitectureMatchPanel: React.FC<ArchitectureMatchPanelProps> = ({
  matches,
  onAddTechnology,
}) => {
  const { language, t } = useLanguage();

  if (matches.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.stackBuilder.archMatchesTitle}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {matches.length === 1
            ? t.stackBuilder.profilesMatchedSingular
            : t.stackBuilder.profilesMatched.replace('{count}', String(matches.length))}
        </span>
      </div>

      <div className="space-y-3">
        {matches.slice(0, 4).map(({ profile, matchedTechnologies, missingTechnologies, overlapPercentage, profileCoveragePercentage }) => {
          const profileName = getLocalizedText(profile.name, language);
          const typeMeta = profile.profileType
            ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
            : undefined;

          return (
            <div
              key={profile.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {typeMeta && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-bold">
                        {getLocalizedText(typeMeta.label, language)}
                      </span>
                    )}
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {profileName}
                    </h4>
                  </div>
                </div>

                {/* Overlap & Coverage Badges */}
                <div className="flex items-center gap-3 shrink-0 text-right">
                  <div>
                    <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                      {overlapPercentage}%
                    </span>
                    <div className="text-[9px] text-slate-400 font-mono">
                      {t.stackBuilder.techOverlap}
                    </div>
                  </div>
                  <div className="border-l border-slate-200 dark:border-slate-800 pl-3">
                    <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400">
                      {profileCoveragePercentage}%
                    </span>
                    <div className="text-[9px] text-slate-400 font-mono">
                      {t.stackBuilder.archCoverage}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual Progress Bars */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(overlapPercentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-600 dark:bg-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(profileCoveragePercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Matched & Missing Tech Chips */}
              <div className="space-y-1.5 pt-1 text-[10px]">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-bold text-slate-400 font-mono mr-1">
                    {t.stackBuilder.matchedTechs} ({matchedTechnologies.length}):
                  </span>
                  {matchedTechnologies.map((tech) => (
                    <Link
                      key={tech.id}
                      to={`/stack/${tech.id}`}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-medium hover:underline hover:border-emerald-500/40"
                    >
                      <Check className="w-2.5 h-2.5" />
                      <span>{tech.name}</span>
                    </Link>
                  ))}
                </div>

                {missingTechnologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <span className="font-bold text-slate-400 font-mono mr-1">
                      {t.stackBuilder.missingTechs} ({missingTechnologies.length}):
                    </span>
                    {missingTechnologies.slice(0, 4).map((tech) => (
                      <div
                        key={tech.id}
                        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition text-[9px]"
                      >
                        <Link
                          to={`/stack/${tech.id}`}
                          className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                          {tech.name}
                        </Link>
                        {onAddTechnology && (
                          <button
                            onClick={() => onAddTechnology(tech.id)}
                            className="p-0.5 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-400"
                            title={t.stackBuilder.addCandidate}
                            aria-label={`${t.stackBuilder.addCandidate}: ${tech.name}`}
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    {missingTechnologies.length > 4 && (
                      <span className="text-slate-400 font-mono text-[9px]">
                        +{missingTechnologies.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Link to Full Architecture Profile */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex justify-end">
                <Link
                  to={`/architectures/${profile.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>{t.stackBuilder.viewArchProfile}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
