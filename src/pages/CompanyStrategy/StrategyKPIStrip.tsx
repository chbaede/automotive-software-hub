import React from 'react';
import {
  Building2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getStrategyKPIs } from '../../lib/domain';

interface StrategyKPIStripProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedContinent: string;
  onSelectContinent: (continent: string) => void;
}

export const StrategyKPIStrip: React.FC<StrategyKPIStripProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedContinent,
  onSelectContinent,
}) => {
  const { t } = useLanguage();
  const kpis = getStrategyKPIs();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Tracked */}
        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            onSelectContinent('all');
          }}
          className={`p-3.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
            selectedCategory === 'all' && selectedContinent === 'all'
              ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-brand-300 dark:hover:border-brand-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiTotalCompanies}
            </span>
            <Building2 className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.total}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              100%
            </span>
          </div>
        </button>

        {/* OEMs */}
        <button
          type="button"
          onClick={() => onSelectCategory(selectedCategory === 'oem' ? 'all' : 'oem')}
          className={`p-3.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
            selectedCategory === 'oem'
              ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiOems}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.oems}
            </span>
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
              {Math.round((kpis.oems / kpis.total) * 100)}%
            </span>
          </div>
        </button>

        {/* Semiconductors */}
        <button
          type="button"
          onClick={() => onSelectCategory(selectedCategory === 'semiconductor' ? 'all' : 'semiconductor')}
          className={`p-3.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
            selectedCategory === 'semiconductor'
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400 dark:hover:border-emerald-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiSemis}
            </span>
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.semis}
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              {Math.round((kpis.semis / kpis.total) * 100)}%
            </span>
          </div>
        </button>

        {/* Tier-1s */}
        <button
          type="button"
          onClick={() => onSelectCategory(selectedCategory === 'tier1' ? 'all' : 'tier1')}
          className={`p-3.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer ${
            selectedCategory === 'tier1'
              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiTier1s}
            </span>
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.tier1s}
            </span>
            <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">
              {Math.round((kpis.tier1s / kpis.total) * 100)}%
            </span>
          </div>
        </button>

        {/* Zonal Pioneers */}
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiZonal}
            </span>
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.zonal}
            </span>
            <span className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400">
              {Math.round((kpis.zonal / kpis.total) * 100)}%
            </span>
          </div>
        </div>

        {/* Monetization */}
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              {t.strategyInsights.kpiMonetization}
            </span>
            <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {kpis.monetization}
            </span>
            <span className="text-[10px] font-medium text-purple-600 dark:text-purple-400">
              {Math.round((kpis.monetization / kpis.total) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Regional breakdown strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/70 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
          <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            {t.strategyInsights.kpiRegionalBreakdown}:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectContinent(selectedContinent === 'north-america' ? 'all' : 'north-america')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              selectedContinent === 'north-america'
                ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            🇺🇸 {t.continents.northAmerica} ({kpis.byContinent['north-america']})
          </button>
          <button
            type="button"
            onClick={() => onSelectContinent(selectedContinent === 'europe' ? 'all' : 'europe')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              selectedContinent === 'europe'
                ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            🇪🇺 {t.continents.europe} ({kpis.byContinent.europe})
          </button>
          <button
            type="button"
            onClick={() => onSelectContinent(selectedContinent === 'asia' ? 'all' : 'asia')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              selectedContinent === 'asia'
                ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            🌏 {t.continents.asia} ({kpis.byContinent.asia})
          </button>
          {selectedContinent !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectContinent('all')}
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline ml-1 font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
