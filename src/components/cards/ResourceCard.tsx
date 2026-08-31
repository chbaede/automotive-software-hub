import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Resource } from '../../types/resource';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const { language, t } = useLanguage();
  const name = getLocalizedText(resource.name, language);
  const description = getLocalizedText(resource.description, language);

  return (
    <div className="flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
            {resource.category}
          </span>

          {resource.official && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" />
              {t.resources.officialBadge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5">
          {name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-4 font-mono">
          <span className="font-semibold text-slate-700 dark:text-slate-300">{resource.source}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 rounded-lg transition"
        >
          <span>{t.resources.visitLink}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

