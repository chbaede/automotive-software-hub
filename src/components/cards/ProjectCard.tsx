import React from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { OpenSourceProject } from '../../types/project';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ProjectCardProps {
  project: OpenSourceProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language, t } = useLanguage();
  const description = getLocalizedText(project.description, language);

  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded font-mono">
            {project.organization}
          </span>
          {project.license && (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">
              {project.license}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {project.name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>

        {project.languages && project.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.languages.map((lang) => (
              <span key={lang} className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800/60 text-brand-600 dark:text-brand-400 rounded">
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition"
        >
          <span>{t.openSource.website}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {project.repository && (
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.openSource.repository}</span>
          </a>
        )}
      </div>
    </div>
  );
};

