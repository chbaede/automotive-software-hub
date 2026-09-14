import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Globe, Github, Linkedin, Menu, X, Cpu, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../theme/ThemeContext';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { APP_VERSION } from '../../version';

interface HeaderProps {
  onOpenTool?: (tool: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTool }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  const coreNavItems = [
    { to: '/', label: t.nav.home },
    { to: '/stack', label: t.nav.stackExplorer },
    { to: '/architectures', label: t.nav.architectures },
    { to: '/stack-builder', label: t.nav.stackBuilder },
  ];

  const ecosystemNavItems = [
    { to: '/tools', label: t.nav.tools },
    { to: '/open-source', label: t.nav.openSource },
    { to: '/events', label: t.nav.events },
    { to: '/companies', label: t.nav.companies },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs">
        {/* Tier 1: Main Brand & Utility Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-15 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink group">
            <div className="p-1.5 sm:p-2 bg-brand-600 text-white rounded-lg group-hover:bg-brand-700 transition shrink-0 shadow-xs">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition truncate">
                  Automotive Software Hub
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0 hidden sm:inline-block">
                  {APP_VERSION}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5 hidden sm:inline">
                SDV • AUTOSAR • Yocto • Embedded Linux
              </span>
            </div>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline font-sans">{t.nav.searchPlaceholder.slice(0, 16)}...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-500 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition"
              title={language === 'en' ? 'Switch to Korean' : '영문으로 변경'}
            >
              <Globe className="w-4 h-4 text-brand-500" />
              <span className="font-mono text-[11px]">{language === 'en' ? 'EN' : '한국어'}</span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition"
              title={theme === 'dark' ? t.nav.switchLight : t.nav.switchDark}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Author LinkedIn */}
            <a
              href="https://www.linkedin.com/in/locust2001/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-1.5 sm:p-2 text-slate-500 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition group"
              title={t.nav.authorLinkedin}
              aria-label="Author LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            </a>

            {/* GitHub Repo */}
            <a
              href="https://github.com/chbaede/automotive-software-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition"
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tier 2: Desktop Navigation Bar */}
        <div className="hidden lg:block border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center h-10 text-xs font-medium gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Group 1: Core Architecture & Stack */}
              {coreNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Visual Divider */}
              <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-800 mx-1.5 shrink-0" />

              {/* Group 2: Ecosystem & Catalogs */}
              {ecosystemNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Visual Divider */}
              <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-800 mx-1.5 shrink-0" />

              {/* Group 3: Portal Info */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-2.5 py-1 rounded-md transition whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                {t.nav.about}
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
              {/* Core Stack */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold px-3">
                {t.nav.architectureSection}
              </span>
              {coreNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Ecosystem */}
            <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold px-3">
                {t.nav.ecosystemSection}
              </span>
              {ecosystemNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`
                }
              >
                {t.nav.about}
              </NavLink>
            </div>

            {/* Social & Author Links */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{t.nav.communitySection}</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/locust2001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-[#0A66C2] font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/chbaede/automotive-software-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      </header>

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={onOpenTool}
      />
    </>
  );
};

