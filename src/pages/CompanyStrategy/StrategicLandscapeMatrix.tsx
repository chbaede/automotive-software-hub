import React from 'react';
import { LayoutGrid, Info, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  getStrategicLandscapeData,
  StrategicLandscapeItem,
  EeArchitectureTopology,
  OsPlatformDepth,
  getCompany,
} from '../../lib/domain';
import { getCountryFlag } from '../../utils/formatters';

interface StrategicLandscapeMatrixProps {
  onSelectCompany: (companyId: string) => void;
  selectedCompanyIds: string[];
  onToggleCompare: (companyId: string) => void;
}

export const StrategicLandscapeMatrix: React.FC<StrategicLandscapeMatrixProps> = ({
  onSelectCompany,
  selectedCompanyIds,
  onToggleCompare,
}) => {
  const { t } = useLanguage();
  const landscapeData = getStrategicLandscapeData();

  const columns: { id: EeArchitectureTopology; label: string }[] = [
    {
      id: 'distributed-domain',
      label: t.strategyInsights.landscapeXDistributed,
    },
    {
      id: 'central-domain',
      label: t.strategyInsights.landscapeXCentralDomain,
    },
    {
      id: 'central-zonal',
      label: t.strategyInsights.landscapeXZonal,
    },
  ];

  const rows: { id: OsPlatformDepth; label: string }[] = [
    {
      id: 'proprietary-fullstack',
      label: t.strategyInsights.landscapeYProprietary,
    },
    {
      id: 'dual-track',
      label: t.strategyInsights.landscapeYDualTrack,
    },
    {
      id: 'commercial-ecosystem',
      label: t.strategyInsights.landscapeYEcosystem,
    },
  ];

  const getCompaniesInCell = (
    topology: EeArchitectureTopology,
    depth: OsPlatformDepth
  ): StrategicLandscapeItem[] => {
    return landscapeData.filter(
      (item) => item.eeTopology === topology && item.osDepth === depth
    );
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'oem':
        return 'border-amber-400/40 bg-amber-50/70 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-700/40';
      case 'semiconductor':
        return 'border-emerald-400/40 bg-emerald-50/70 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700/40';
      case 'tier1':
        return 'border-blue-400/40 bg-blue-50/70 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-700/40';
      default:
        return 'border-slate-300 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.strategyInsights.landscapeTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.strategyInsights.landscapeSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium shrink-0">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>{t.strategyInsights.landscapeLegendNoScores}</span>
        </div>
      </div>

      {/* 2D Qualitative Positioning Matrix */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Axis Labels Header (X-Axis: E/E Topology) */}
          <div className="grid grid-cols-[140px_repeat(3,1fr)] gap-2 mb-2 text-center">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center">
              {t.strategyInsights.landscapeYAxis} ↓
            </div>
            {columns.map((col) => (
              <div
                key={col.id}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60"
              >
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          {/* Matrix Rows (Y-Axis: OS Platform Depth) */}
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[140px_repeat(3,1fr)] gap-2"
              >
                {/* Y-Axis Row Header */}
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 flex items-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {row.label}
                  </span>
                </div>

                {/* 3 Columns */}
                {columns.map((col) => {
                  const items = getCompaniesInCell(col.id, row.id);
                  return (
                    <div
                      key={col.id}
                      className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 min-h-[110px] flex flex-col justify-start gap-1.5"
                    >
                      {items.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-[11px] text-slate-400 italic">
                          —
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item) => {
                            const comp = getCompany(item.companyId);
                            const flag = comp ? getCountryFlag(comp.headquarters) : '';
                            const isComparing = selectedCompanyIds.includes(item.companyId);

                            return (
                              <div
                                key={item.companyId}
                                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] border font-medium transition-all ${getCategoryBadgeColor(
                                  item.category
                                )} ${
                                  isComparing
                                    ? 'ring-2 ring-brand-500 ring-offset-1 dark:ring-offset-slate-900'
                                    : ''
                                }`}
                              >
                                <span>{flag}</span>
                                <button
                                  type="button"
                                  onClick={() => onSelectCompany(item.companyId)}
                                  className="hover:underline font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-0.5 cursor-pointer"
                                  title={`${item.companyName} (${item.sdvOsSummary} / ${item.eeZonalSummary})`}
                                >
                                  <span>{comp?.name || item.companyName}</span>
                                  <ArrowUpRight className="w-3 h-3 opacity-60 hover:opacity-100" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleCompare(item.companyId);
                                  }}
                                  className={`text-[9px] px-1 py-0.2 rounded font-mono transition cursor-pointer ${
                                    isComparing
                                      ? 'bg-brand-600 text-white font-bold'
                                      : 'bg-black/5 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300'
                                  }`}
                                  title={isComparing ? t.strategyInsights.compareRemoveBtn : t.strategyInsights.compareAddBtn}
                                >
                                  {isComparing ? '✓' : '+'}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>{t.strategyInsights.filterOem}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{t.strategyInsights.filterSemi}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>{t.strategyInsights.filterTier1}</span>
          </span>
        </div>
        <div>
          <span>{t.strategyInsights.landscapeClickHint}</span>
        </div>
      </div>
    </div>
  );
};
