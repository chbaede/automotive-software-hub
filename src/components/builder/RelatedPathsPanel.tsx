import React from 'react';
import { Link } from 'react-router-dom';
import { Route, ArrowRight, Check } from 'lucide-react';
import { StackPathMatchResult } from '../../lib/builder/stackBuilderEngine';
import { technologyById } from '../../lib/graph';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { STACK_PATH_TYPE_METADATA } from '../../types/architecture';

interface RelatedPathsPanelProps {
  matches: StackPathMatchResult[];
}

export const RelatedPathsPanel: React.FC<RelatedPathsPanelProps> = ({ matches }) => {
  const { language, t } = useLanguage();

  if (matches.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Route className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.stackBuilder.relatedPathsTitle}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {matches.length} {language === 'ko' ? '개 경로 연계' : 'Paths Related'}
        </span>
      </div>

      <div className="space-y-3">
        {matches.slice(0, 3).map(({ path, matchedHopsCount, totalHopsCount, matchedTechnologies }) => {
          const pathName = getLocalizedText(path.name, language);
          const pathDesc = getLocalizedText(path.description, language);
          const pathTypeMeta = path.pathType ? STACK_PATH_TYPE_METADATA[path.pathType] : undefined;
          const matchedIdSet = new Set(matchedTechnologies.map((t) => t.id));

          return (
            <div
              key={path.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {pathTypeMeta && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-bold">
                        {getLocalizedText(pathTypeMeta.label, language)}
                      </span>
                    )}
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {pathName}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{pathDesc}</p>
                </div>

                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shrink-0">
                  {matchedHopsCount} / {totalHopsCount}
                </span>
              </div>

              {/* Hop Sequence */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {path.hops.map((hop, idx) => {
                  const hopTech = technologyById.get(hop.technologyId);
                  const isMatched = matchedIdSet.has(hop.technologyId);

                  return (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                      {hopTech ? (
                        <Link
                          to={`/stack/${hopTech.id}`}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition ${
                            isMatched
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                          }`}
                        >
                          {hopTech.name}
                        </Link>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-mono">
                          {hop.technologyId}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
