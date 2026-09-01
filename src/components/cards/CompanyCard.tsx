import React from 'react';
import { MapPin, ExternalLink, Layers } from 'lucide-react';
import { Company } from '../../types/company';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackTechnologies } from '../../data/stackTechnologies';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { language, t } = useLanguage();
  const description = getLocalizedText(company.description, language);

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case 'oem':
        return {
          label: t.companies.catOem,
          badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300/40 dark:border-amber-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-amber-500/70 dark:hover:border-amber-500/70',
        };
      case 'tier1':
        return {
          label: t.companies.catTier1,
          badge: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-300/40 dark:border-blue-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-blue-500/70 dark:hover:border-blue-500/70',
        };
      case 'semiconductor':
        return {
          label: t.companies.catSemiconductor,
          badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70',
        };
      case 'software-platform':
        return {
          label: t.companies.catSoftwarePlatform,
          badge: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-300/40 dark:border-purple-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-purple-500/70 dark:hover:border-purple-500/70',
        };
      case 'cloud-tech':
        return {
          label: t.companies.catCloudTech,
          badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-300/40 dark:border-sky-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-sky-500/70 dark:hover:border-sky-500/70',
        };
      case 'korean-tech':
        return {
          label: t.companies.catKoreanTech,
          badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-300/40 dark:border-rose-800/40',
          card: 'border-rose-300/70 dark:border-rose-900/50 hover:border-rose-500/80 dark:hover:border-rose-500',
        };
      default:
        return {
          label: cat,
          badge: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-800/40',
          card: 'border-slate-200 dark:border-slate-800 hover:border-brand-500/50',
        };
    }
  };

  const getCountryFlag = (headquarters: string): string => {
    const hq = headquarters.toLowerCase();
    if (hq.includes('south korea') || hq.includes('korea')) return '🇰🇷';
    if (hq.includes('usa') || hq.includes('united states') || hq.includes('california') || hq.includes('texas') || hq.includes('michigan') || hq.includes('connecticut')) return '🇺🇸';
    if (hq.includes('germany')) return '🇩🇪';
    if (hq.includes('japan')) return '🇯🇵';
    if (hq.includes('france')) return '🇫🇷';
    if (hq.includes('ireland') || hq.includes('dublin')) return '🇮🇪';
    if (hq.includes('netherlands')) return '🇳🇱';
    if (hq.includes('china') || hq.includes('hong kong') || hq.includes('taiwan')) return '🇨🇳';
    if (hq.includes('israel')) return '🇮🇱';
    if (hq.includes('canada')) return '🇨🇦';
    if (hq.includes('uk') || hq.includes('united kingdom')) return '🇬🇧';
    return '🌐';
  };

  const style = getCategoryStyles(company.category);
  const websiteUrl = typeof company.website === 'string' ? company.website : getLocalizedText(company.website, language);
  const flag = getCountryFlag(company.headquarters);

  // Find linked technologies in Stack Explorer
  const linkedStackTechs = stackTechnologies.filter((st) =>
    st.companyIds?.includes(company.id)
  );

  return (
    <div className={`flex flex-col justify-between p-5 bg-white dark:bg-slate-900 rounded-xl border transition shadow-sm ${style.card}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${style.badge}`}>
            {style.label}
          </span>

          {company.isPublic && company.ticker ? (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-semibold flex items-center gap-1.5">
              <span className="text-xs leading-none">{flag}</span>
              <span>{company.exchange}: {company.ticker}</span>
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 rounded flex items-center gap-1.5">
              <span className="text-xs leading-none">{flag}</span>
              <span>{t.companies.privateCompany}</span>
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
          {company.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{flag} {company.headquarters}</span>
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

        {/* Stack Explorer Connected Technologies */}
        {linkedStackTechs.length > 0 && (
          <div className="mb-4 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-bold uppercase text-brand-600 dark:text-brand-400 tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>Stack Explorer Nodes</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {linkedStackTechs.map((tech) => (
                <a
                  key={tech.id}
                  href={`/#/stack?tech=${tech.id}`}
                  className="text-[10px] font-mono px-2 py-0.5 bg-brand-500/10 hover:bg-brand-500 hover:text-white text-brand-700 dark:text-brand-300 rounded border border-brand-500/30 transition flex items-center gap-1"
                >
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <a
          href={websiteUrl}
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
