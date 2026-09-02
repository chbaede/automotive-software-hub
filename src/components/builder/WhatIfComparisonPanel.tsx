import React from 'react';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MinusCircle,
  Equal,
  Shield,
  Layers,
  Route,
  Compass,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { WhatIfComparisonResult, WhatIfImpactType } from '../../lib/architecture/types';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { RELATIONSHIP_METADATA } from '../../types/relationship';

interface WhatIfComparisonPanelProps {
  comparison: WhatIfComparisonResult;
}

export const WhatIfComparisonPanel: React.FC<WhatIfComparisonPanelProps> = ({ comparison }) => {
  const { language, t } = useLanguage();

  const {
    targetTechnology,
    replacementTechnology,
    architectureImpacts,
    relationshipChanges,
    pathImpacts,
    layerImpact,
    safetyImpact,
  } = comparison;

  const getImpactBadge = (type: WhatIfImpactType) => {
    switch (type) {
      case 'improved':
        return {
          label: t.whatIf.improved,
          className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          icon: TrendingUp,
        };
      case 'added':
        return {
          label: t.whatIf.added,
          className: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
          icon: PlusCircle,
        };
      case 'reduced':
        return {
          label: t.whatIf.reduced,
          className: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
          icon: TrendingDown,
        };
      case 'removed':
        return {
          label: t.whatIf.removed,
          className: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30',
          icon: MinusCircle,
        };
      case 'unchanged':
      default:
        return {
          label: t.whatIf.unchanged,
          className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
          icon: Equal,
        };
    }
  };

  const addedRels = relationshipChanges.filter((r) => r.impactType === 'added');
  const removedRels = relationshipChanges.filter((r) => r.impactType === 'removed');

  return (
    <div className="space-y-6">
      {/* 1. Comparison Header (Target vs Replacement) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-11 items-center gap-4">
          {/* Target Current Tech */}
          <div className="sm:col-span-5 space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-slate-400 tracking-wider">
              {t.whatIf.currentStack}
            </div>
            <div className="font-bold text-base sm:text-lg text-white">
              {targetTechnology.name}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {targetTechnology.functionalSafety && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  {targetTechnology.functionalSafety.asilLevel || 'ISO 26262'} ({targetTechnology.functionalSafety.claimType})
                </span>
              )}
              {targetTechnology.licenseType && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {targetTechnology.licenseType.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Swap Indicator */}
          <div className="sm:col-span-1 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600/40 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          </div>

          {/* Replacement Tech */}
          <div className="sm:col-span-5 space-y-1 sm:text-right">
            <div className="text-[10px] font-mono font-semibold uppercase text-indigo-300 tracking-wider">
              {t.whatIf.hypotheticalStack}
            </div>
            <div className="font-bold text-base sm:text-lg text-indigo-200">
              {replacementTechnology.name}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:justify-end">
              {replacementTechnology.functionalSafety && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  {replacementTechnology.functionalSafety.asilLevel || 'ISO 26262'} ({replacementTechnology.functionalSafety.claimType})
                </span>
              )}
              {replacementTechnology.licenseType && (
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {replacementTechnology.licenseType.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Architecture Relevance Impact */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.whatIf.architectureImpact}
          </h4>
        </div>

        {architectureImpacts.length > 0 ? (
          <div className="space-y-2.5">
            {architectureImpacts.map((impact) => {
              const badge = getImpactBadge(impact.impactType);
              const Icon = badge.icon;
              return (
                <div
                  key={impact.profile.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {getLocalizedText(impact.profile.name, language)}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {getLocalizedText(impact.explanation, language)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {impact.beforeCoverage}% <ArrowRight className="w-3 h-3 inline opacity-60" /> {impact.afterCoverage}%
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${badge.className}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-2">
            {t.whatIf.unchanged}
          </p>
        )}
      </div>

      {/* 3. Direct Relationship Changes (Directional Semantics) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.whatIf.relationshipImpact}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Relationships Gained */}
          <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.whatIf.relationshipsGained} ({addedRels.length})</span>
            </div>
            {addedRels.length > 0 ? (
              <div className="space-y-1.5">
                {addedRels.map((change, idx) => {
                  const meta = RELATIONSHIP_METADATA[change.relationship.type];
                  return (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/20 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white flex-wrap">
                        <span>{change.sourceTech.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-mono text-[9px] border border-indigo-500/20">
                          {getLocalizedText(meta?.label, language) || change.relationship.type}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span>{change.targetTech.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 py-1">
                {t.whatIf.noRelationshipChanges}
              </p>
            )}
          </div>

          {/* Relationships Lost */}
          <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
            <div className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <MinusCircle className="w-3.5 h-3.5" />
              <span>{t.whatIf.relationshipsLost} ({removedRels.length})</span>
            </div>
            {removedRels.length > 0 ? (
              <div className="space-y-1.5">
                {removedRels.map((change, idx) => {
                  const meta = RELATIONSHIP_METADATA[change.relationship.type];
                  return (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-500/20 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white flex-wrap">
                        <span>{change.sourceTech.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px]">
                          {getLocalizedText(meta?.label, language) || change.relationship.type}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span>{change.targetTech.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 py-1">
                {t.whatIf.noRelationshipChanges}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Execution Journeys & Paths Impact */}
      {pathImpacts.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-indigo-500" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {t.whatIf.pathImpact}
            </h4>
          </div>

          <div className="space-y-2">
            {pathImpacts.map((pImp) => {
              const badge = getImpactBadge(pImp.impactType);
              const Icon = badge.icon;
              return (
                <div
                  key={pImp.path.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {getLocalizedText(pImp.path.name, language)}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {getLocalizedText(pImp.explanation, language)}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${badge.className}`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Safety & Layer Status */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
          <Shield className="w-3.5 h-3.5 text-rose-500" />
          <span>{t.whatIf.safetyImpact}</span>
        </div>
        <p className="text-[11px]">{getLocalizedText(safetyImpact.explanation, language)}</p>
      </div>
    </div>
  );
};

