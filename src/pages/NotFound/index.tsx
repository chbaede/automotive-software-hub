import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-20 text-center space-y-6">
      <div className="inline-flex p-4 bg-amber-500/10 text-amber-500 rounded-full">
        <AlertTriangle className="w-12 h-12" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
        {t.notFound.title}
      </h1>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        {t.notFound.message}
      </p>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          <Home className="w-4 h-4" />
          <span>{t.notFound.backHome}</span>
        </Link>
      </div>
    </div>
  );
};

