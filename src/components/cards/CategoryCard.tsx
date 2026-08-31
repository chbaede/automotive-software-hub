import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count?: number;
  linkTo: string;
  accentColor?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  description,
  count,
  linkTo,
}) => {
  const { t } = useLanguage();

  return (
    <Link
      to={linkTo}
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-lg group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          {count !== undefined && (
            <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
              {t.categories.itemCount.replace('{count}', count.toString())}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
        <span>{t.categories.exploreButton.replace('{name}', title)}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

