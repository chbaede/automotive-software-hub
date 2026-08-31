import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Github, FileText, Heart } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-600 text-white rounded">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Automotive Software Hub
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 leading-normal max-w-md">
              {t.about.disclaimerBody}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-500 transition">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/stack" className="hover:text-brand-500 transition font-bold text-brand-600 dark:text-brand-400">
                  {t.nav.stackExplorer}
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-brand-500 transition">
                  {t.nav.tools}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-brand-500 transition">
                  {t.nav.resources}
                </Link>
              </li>
              <li>
                <Link to="/open-source" className="hover:text-brand-500 transition">
                  {t.nav.openSource}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-500 transition">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-brand-500 transition">
                  {t.nav.companies}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-500 transition">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Data */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {t.footer.community}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://github.com/chbaede/automotive-software-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-500 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t.footer.githubRepo}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/chbaede/automotive-software-hub/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-500 transition"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{t.footer.contribute}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/chbaede/automotive-software-hub/tree/main/src/data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-brand-500 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.footer.dataValidation}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Automotive Software Hub. Open Community Resource.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Hosted entirely on GitHub Pages (Static Build)
          </div>
        </div>
      </div>
    </footer>
  );
};

