import React from 'react';
import { Building2, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { Company } from '../../types/company';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { language, t } = useLanguage();
  const description = getLocalizedText(company.description, language);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'oem':
        return t.companies.catOem;
      case 'tier1':
        return t.companies.catTier1;
      case 'semiconductor':
        return t.companies.catSemiconductor;
      case 'software-platform':
        return t.companies.catSoftwarePlatform;
      case 'cloud-tech':
        return t.companies.catCloudTech;
      case 'korean-tech':
        return t.companies.catKoreanTech;
      default:
        return cat;
    }
  };

  const isKoreanTech = company.category === 'korean-tech';

  return (
    <div className={`flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border transition shadow-sm ${
      isKoreanTech
        ? 'border-rose-300/70 dark:border-rose-900/50 hover:border-rose-500/80 dark:hover:border-rose-500'
        : 'border-slate-200 dark:border-slate-800 hover:border-brand-500/50'
    }`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
            isKoreanTech
              ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300/40 dark:border-rose-800/40'
              : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
          }`}>
            {getCategoryLabel(company.category)}
          </span>

          {company.isPublic && company.ticker ? (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-semibold">
              {company.exchange}: {company.ticker}
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800/60 text-slate-400 rounded">
              {t.companies.privateCompany}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
          {company.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{company.headquarters}</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          {description}
        </p>

        {company.technologies && company.technologies.length > 0 && (
          <div className="mb-4 space-y-1">
            <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
              {t.companies.technologies}
            </div>
            <div className="flex flex-wrap gap-1">
              {company.technologies.map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 text-slate-700 dark:text-slate-300 rounded-lg transition"
        >
          <span>{t.companies.visitWebsite}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

