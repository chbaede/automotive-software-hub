import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { companyStrategies } from '../../data/companyStrategies';
import { getCompany } from '../../lib/domain';
import { getCountryFlag } from '../../utils/formatters';

interface StrategyQuickInsightsProps {
  onSelectCompany: (companyId: string) => void;
}

export const StrategyQuickInsights: React.FC<StrategyQuickInsightsProps> = ({
  onSelectCompany,
}) => {
  const { t } = useLanguage();

  const alignmentCards = [
    {
      id: 'in-house-os',
      icon: TrendingUp,
      title: t.strategyInsights.insightInHouseOsTitle,
      description: t.strategyInsights.insightInHouseOsDesc,
      companyIds: companyStrategies
        .filter((cs) => cs.strategicLandscape.osDepth === 'proprietary-fullstack')
        .map((cs) => cs.companyId),
      badgeColor: 'text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-400/30',
    },
    {
      id: 'aaos',
      icon: Layers,
      title: t.strategyInsights.insightAaosTitle,
      description: t.strategyInsights.insightAaosDesc,
      companyIds: companyStrategies
        .filter((cs) => (cs.relatedTechnologyIds || []).includes('android-automotive-os'))
        .map((cs) => cs.companyId),
      badgeColor: 'text-blue-700 dark:text-blue-300 bg-blue-500/10 border-blue-400/30',
    },
    {
      id: 'nvidia',
      icon: Cpu,
      title: t.strategyInsights.insightNvidiaTitle,
      description: t.strategyInsights.insightNvidiaDesc,
      companyIds: companyStrategies
        .filter(
          (cs) =>
            cs.companyId === 'nvidia' ||
            (cs.relatedTechnologyIds || []).some((id) => id.startsWith('nvidia-'))
        )
        .map((cs) => cs.companyId),
      badgeColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-400/30',
    },
    {
      id: 'qualcomm',
      icon: Cpu,
      title: t.strategyInsights.insightQualcommTitle,
      description: t.strategyInsights.insightQualcommDesc,
      companyIds: companyStrategies
        .filter(
          (cs) =>
            cs.companyId === 'qualcomm' ||
            (cs.relatedTechnologyIds || []).some((id) => id.startsWith('qualcomm-'))
        )
        .map((cs) => cs.companyId),
      badgeColor: 'text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-400/30',
    },
    {
      id: 'zonal-leaders',
      icon: Zap,
      title: t.strategyInsights.insightZonalTitle,
      description: t.strategyInsights.insightZonalDesc,
      companyIds: companyStrategies
        .filter((cs) => cs.strategicLandscape.eeTopology === 'central-zonal')
        .map((cs) => cs.companyId),
      badgeColor: 'text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border-cyan-400/30',
    },
    {
      id: 'monetization',
      icon: ShieldCheck,
      title: t.strategyInsights.insightMonetizationTitle,
      description: t.strategyInsights.insightMonetizationDesc,
      companyIds: companyStrategies
        .filter((cs) => Boolean(cs.softwareMonetization))
        .map((cs) => cs.companyId),
      badgeColor: 'text-orange-700 dark:text-orange-300 bg-orange-500/10 border-orange-400/30',
    },
  ];

  const regionalCards = [
    {
      id: 'na',
      region: '🇺🇸 ' + t.strategyInsights.regionNaTitle,
      description: t.strategyInsights.regionNaDesc,
      companyIds: companyStrategies
        .filter((cs) => getCompany(cs.companyId)?.continent === 'north-america')
        .map((cs) => cs.companyId),
    },
    {
      id: 'eu',
      region: '🇪🇺 ' + t.strategyInsights.regionEuTitle,
      description: t.strategyInsights.regionEuDesc,
      companyIds: companyStrategies
        .filter((cs) => getCompany(cs.companyId)?.continent === 'europe')
        .map((cs) => cs.companyId),
    },
    {
      id: 'asia',
      region: '🌏 ' + t.strategyInsights.regionAsiaTitle,
      description: t.strategyInsights.regionAsiaDesc,
      companyIds: companyStrategies
        .filter((cs) => getCompany(cs.companyId)?.continent === 'asia')
        .map((cs) => cs.companyId),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 6 Quick Alignment Cards */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.strategyInsights.quickInsightsTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.strategyInsights.quickInsightsSubtitle}
          </p>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alignmentCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/30 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-lg border ${card.badgeColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/70">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                    {t.strategyInsights.colCompany}:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {card.companyIds.map((cId) => {
                      const comp = getCompany(cId);
                      if (!comp) return null;
                      return (
                        <button
                          key={cId}
                          type="button"
                          onClick={() => onSelectCompany(cId)}
                          aria-label={`${t.strategyInsights.jumpToDetail}: ${comp.name}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                        >
                          <span>{getCountryFlag(comp.headquarters)}</span>
                          <span>{comp.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Macro Dynamics */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {t.strategyInsights.regionalIntelligenceTitle}
          </h2>
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {regionalCards.map((reg) => (
            <div
              key={reg.id}
              className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/30 flex flex-col justify-between gap-3"
            >
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {reg.region}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {reg.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/70">
                <div className="flex flex-wrap gap-1">
                  {reg.companyIds.map((cId) => {
                    const comp = getCompany(cId);
                    if (!comp) return null;
                    return (
                      <button
                        key={cId}
                        type="button"
                        onClick={() => onSelectCompany(cId)}
                        aria-label={`${t.strategyInsights.jumpToDetail}: ${comp.name}`}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                      >
                        <span>{getCountryFlag(comp.headquarters)}</span>
                        <span>{comp.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
