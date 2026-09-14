import React from 'react';
import { StackTechnology } from '../../types/stack';
import { TechnologyDiscoveryResult } from '../../lib/graph/intelligence/types';
import { useLanguage } from '../../i18n/LanguageContext';

interface SelectedTechRelationshipsProps {
  discoveryResult: TechnologyDiscoveryResult;
  onSelectTech: (tech: StackTechnology) => void;
}

export const SelectedTechRelationships: React.FC<SelectedTechRelationshipsProps> = ({
  discoveryResult,
  onSelectTech,
}) => {
  const { t } = useLanguage();

  const totalDirectCount =
    discoveryResult.dependencies.length +
    discoveryResult.dependents.length +
    discoveryResult.platforms.length +
    discoveryResult.hostedTechnologies.length +
    discoveryResult.integrations.length +
    discoveryResult.alternatives.length +
    discoveryResult.compatibleWith.length +
    discoveryResult.usedWith.length +
    discoveryResult.coexistsWith.length;

  return (
    <div className="pt-4 space-y-3">
      <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
        <span>{t.graphExplorer.relationshipsSummary}</span>
        <span className="text-[10px] font-mono text-slate-400">
          {totalDirectCount} {t.graphExplorer.direct}
        </span>
      </div>

      <div className="space-y-2">
        {/* Dependencies */}
        {discoveryResult.dependencies.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              {t.relationships.dependsOn} ({discoveryResult.dependencies.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.dependencies.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Platforms (Runs On) */}
        {discoveryResult.platforms.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              {t.relationships.runsOn} ({discoveryResult.platforms.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.platforms.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hosted Technologies (Runs on this) */}
        {discoveryResult.hostedTechnologies.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
              {t.graphExplorer.hosts} ({discoveryResult.hostedTechnologies.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.hostedTechnologies.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800/60 text-sky-900 dark:text-sky-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {discoveryResult.integrations.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
              {t.relationships.integratesWith} ({discoveryResult.integrations.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.integrations.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {discoveryResult.alternatives.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              {t.relationships.alternative} ({discoveryResult.alternatives.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.alternatives.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compatible With */}
        {discoveryResult.compatibleWith.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase">
              {t.relationships.compatibleWith} ({discoveryResult.compatibleWith.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.compatibleWith.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800/60 text-teal-900 dark:text-teal-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Used With */}
        {discoveryResult.usedWith.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
              {t.relationships.usedWith} ({discoveryResult.usedWith.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {discoveryResult.usedWith.map((item) => (
                <button
                  key={item.technology.id}
                  type="button"
                  aria-label={`${t.graphExplorer.inspectDetails}: ${item.technology.name}`}
                  onClick={() => onSelectTech(item.technology)}
                  className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200 rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {item.technology.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
