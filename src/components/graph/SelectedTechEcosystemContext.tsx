import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Code2, BookOpen } from 'lucide-react';
import { Tool } from '../../types/tool';
import { OpenSourceProject } from '../../types/project';
import { Resource } from '../../types/resource';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface SelectedTechEcosystemContextProps {
  linkedTools: Tool[];
  linkedProjects: OpenSourceProject[];
  linkedResources: Resource[];
}

export const SelectedTechEcosystemContext: React.FC<SelectedTechEcosystemContextProps> = ({
  linkedTools,
  linkedProjects,
  linkedResources,
}) => {
  const { language, t } = useLanguage();

  if (
    linkedTools.length === 0 &&
    linkedProjects.length === 0 &&
    linkedResources.length === 0
  ) {
    return null;
  }

  return (
    <div className="pt-4 space-y-3">
      <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
        {t.graphExplorer.connectedEcosystem}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {linkedTools.map((tool) => (
          <Link
            key={tool.id}
            to={`/tools?tool=${tool.id}`}
            className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">
                {typeof tool.name === 'string' ? tool.name : getLocalizedText(tool.name, language)}
              </div>
              <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemTools}</div>
            </div>
          </Link>
        ))}

        {linkedProjects.map((proj) => (
          <Link
            key={proj.id}
            to={`/open-source`}
            className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">{proj.name}</div>
              <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemProjects}</div>
            </div>
          </Link>
        ))}

        {linkedResources.map((res) => (
          <a
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">
                {typeof res.name === 'string' ? res.name : getLocalizedText(res.name, language)}
              </div>
              <div className="text-[9px] text-slate-400">{t.graphExplorer.ecosystemResources}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
