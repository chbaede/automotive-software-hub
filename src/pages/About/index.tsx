import React from 'react';
import { Info, ShieldCheck, Heart, FileCode2, Cpu } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Independent Open Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {t.about.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.about.subtitle}
        </p>
      </div>

      {/* Grid of Sections */}
      <div className="grid gap-6">
        {/* Mission */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <Cpu className="w-5 h-5 text-brand-500" />
            <h2>{t.about.purposeHeading}</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.purposeBody}
          </p>
        </div>

        {/* Privacy */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2>{t.about.privacyHeading}</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.privacyBody}
          </p>
        </div>

        {/* Contribution */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <Heart className="w-5 h-5 text-red-500" />
            <h2>{t.about.contributionHeading}</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about.contributionBody}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-base">
            <FileCode2 className="w-5 h-5 text-amber-600" />
            <h2>{t.about.disclaimerHeading}</h2>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
            {t.about.disclaimerBody}
          </p>
        </div>
      </div>
    </div>
  );
};

