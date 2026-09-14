import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Route } from 'lucide-react';
import { ArchitectureProfile, StackPath } from '../../types/architecture';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface SelectedTechArchitectureContextProps {
  technologyId: string;
  architectures: ArchitectureProfile[];
  stackPaths: StackPath[];
}

export const SelectedTechArchitectureContext: React.FC<SelectedTechArchitectureContextProps> = ({
  technologyId,
  architectures,
  stackPaths,
}) => {
  const { language, t } = useLanguage();

  if (architectures.length === 0 && stackPaths.length === 0) return null;

  return (
    <>
      {/* Section: Architecture Profiles */}
      {architectures.length > 0 && (
        <div className="pt-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
            <span>{t.graphExplorer.architectureProfiles}</span>
          </div>
          <div className="space-y-1.5">
            {architectures.map((arch) => (
              <Link
                key={arch.id}
                to={`/architectures/${arch.id}`}
                className="block p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  {getLocalizedText(arch.name, language)}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {arch.profileType || 'architecture'} · {arch.technologyIds.length} {t.graphExplorer.technologies}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section: Stack Paths */}
      {stackPaths.length > 0 && (
        <div className="pt-4 space-y-2.5">
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Route className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
            <span>{t.graphExplorer.stackPaths}</span>
          </div>
          <div className="space-y-1.5">
            {stackPaths.map((path) => (
              <Link
                key={path.id}
                to={`/stack?tech=${technologyId}`}
                className="block p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition group focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                  {getLocalizedText(path.name, language)}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  {path.pathType || 'path'} · {path.hops.length} {t.graphExplorer.hops}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
