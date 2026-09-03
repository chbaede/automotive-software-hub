import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, ExternalLink, Compass } from 'lucide-react';
import { ArchitectureMatchResult } from '../../lib/architecture/types';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { ARCHITECTURE_PROFILE_TYPE_METADATA } from '../../types/architecture';

interface ArchitectureComparisonTableProps {
  matches: ArchitectureMatchResult[];
}

export const ArchitectureComparisonTable: React.FC<ArchitectureComparisonTableProps> = ({ matches }) => {
  const { language, t } = useLanguage();

  if (!matches || matches.length <= 1) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
          {t.decisionSupport.topMatchesComparison}
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[420px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400">
              <th className="py-2 pr-3 font-semibold">{t.decisionSupport.architecture}</th>
              <th className="py-2 px-3 font-semibold text-center">{t.decisionSupport.coverage}</th>
              <th className="py-2 px-3 font-semibold text-center">{t.decisionSupport.matched}</th>
              <th className="py-2 px-3 font-semibold text-center">{t.decisionSupport.missing}</th>
              <th className="py-2 pl-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {matches.map((match, idx) => {
              const profile = match.profile;
              const typeMeta = profile.profileType
                ? ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType]
                : undefined;
              const coverage = Math.round(match.profileCoveragePercentage);

              return (
                <tr key={profile.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition">
                  <td className="py-2.5 pr-3">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          #{idx + 1}
                        </span>
                        <span>{getLocalizedText(profile.name, language)}</span>
                      </div>
                      {typeMeta && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {getLocalizedText(typeMeta.label, language)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {coverage}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {match.matchedTechnologies.length}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono text-slate-500">
                      {match.missingTechnologies.length}
                    </span>
                  </td>
                  <td className="py-2.5 pl-3 text-right">
                    <Link
                      to={`/architectures/${profile.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
