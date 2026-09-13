import React, { useState } from 'react';
import { Calendar, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getStrategicMilestones, getCompany } from '../../lib/domain';
import { getCountryFlag } from '../../utils/formatters';
import { getLocalizedText } from '../../types/i18n';

interface StrategicTargetsTimelineProps {
  onSelectCompany: (companyId: string) => void;
}

export const StrategicTargetsTimeline: React.FC<StrategicTargetsTimelineProps> = ({
  onSelectCompany,
}) => {
  const { language, t } = useLanguage();
  const milestones = getStrategicMilestones();

  const years = Array.from(new Set(milestones.map((m) => m.year))).sort();
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredMilestones =
    selectedYear === 'all'
      ? milestones
      : milestones.filter((m) => m.year === selectedYear);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.strategyInsights.timelineTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.strategyInsights.timelineSubtitle}
          </p>
        </div>

        {/* Year Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedYear('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              selectedYear === 'all'
                ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {t.strategyInsights.timelineFilterAll.replace('{count}', String(milestones.length))}
          </button>
          {years.map((yr) => {
            const count = milestones.filter((m) => m.year === yr).length;
            return (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-brand-600 text-white border-brand-600 dark:bg-brand-500'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {yr} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMilestones.map((m, idx) => {
            const comp = getCompany(m.companyId);
            const flag = comp ? getCountryFlag(comp.headquarters) : '';

            return (
              <div
                key={`${m.companyId}-${m.year}-${idx}`}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 hover:border-brand-300 dark:hover:border-brand-700 transition flex flex-col justify-between gap-2.5 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                      {m.year}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectCompany(m.companyId)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition cursor-pointer"
                    >
                      <span>{flag}</span>
                      <span>{comp?.name || m.companyName}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {getLocalizedText(m.milestone, language)}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="uppercase font-mono font-semibold">
                    {m.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectCompany(m.companyId)}
                    className="text-brand-600 dark:text-brand-400 hover:underline cursor-pointer"
                  >
                    {t.strategyInsights.jumpToDetail} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
