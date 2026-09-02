import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ExternalLink,
  Calendar,
  Award,
} from 'lucide-react';
import {
  StackValidationSummary,
  ValidationItem,
} from '../../lib/builder/stackBuilderEngine';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { RELATIONSHIP_METADATA } from '../../types/relationship';

interface StackValidationPanelProps {
  summary: StackValidationSummary;
}

export const StackValidationPanel: React.FC<StackValidationPanelProps> = ({
  summary,
}) => {
  const { language, t } = useLanguage();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const getHealthBadge = () => {
    switch (summary.health) {
      case 'validated':
        return {
          label: t.stackBuilder.healthValidated,
          bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          icon: CheckCircle2,
        };
      case 'partially-validated':
        return {
          label: t.stackBuilder.healthPartiallyValidated,
          bgColor: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
          icon: AlertTriangle,
        };
      case 'needs-review':
        return {
          label: t.stackBuilder.healthNeedsReview,
          bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
          icon: Info,
        };
      case 'incomplete':
      default:
        return {
          label: t.stackBuilder.healthIncomplete,
          bgColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
          icon: ShieldCheck,
        };
    }
  };

  const healthBadge = getHealthBadge();
  const HealthIcon = healthBadge.icon;

  if (summary.totalSelected <= 1) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.stackBuilder.validationTitle}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {t.stackBuilder.emptyStatePrompt}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs">
      {/* Header & Overall Health Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {t.stackBuilder.validationTitle}
            </h3>
          </div>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${healthBadge.bgColor}`}>
          <HealthIcon className="w-3.5 h-3.5" />
          <span>{healthBadge.label}</span>
        </div>
      </div>

      {/* Metrics Counter Cards */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20">
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            {summary.verifiedCount}
          </div>
          <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
            {t.stackBuilder.verifiedRel}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
          <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {summary.warningCount}
          </div>
          <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 mt-0.5">
            {t.stackBuilder.unverifiedRel}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-500/20">
          <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {summary.alternativeCount}
          </div>
          <div className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 mt-0.5">
            {t.stackBuilder.archAlternative}
          </div>
        </div>
      </div>

      {/* Detailed Validation Items */}
      <div className="space-y-2.5 pt-1">
        {summary.items.map((item) => {
          const isExpanded = expandedItemId === item.id;
          const relMeta = item.relationship ? RELATIONSHIP_METADATA[item.relationship.type] : undefined;
          const relLabel = relMeta ? getLocalizedText(relMeta.label, language) : item.relationship?.type;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                item.status === 'verified'
                  ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-500/30'
                  : item.status === 'warning'
                  ? 'bg-amber-50/20 dark:bg-amber-950/10 border-amber-500/30'
                  : 'bg-indigo-50/20 dark:bg-indigo-950/10 border-indigo-500/30'
              } p-3.5 space-y-2`}
            >
              <div
                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                className="flex items-center justify-between gap-2 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {item.status === 'verified' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {item.status === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  {item.status === 'alternative' && (
                    <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                  )}

                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    <span>{item.sourceTech.name}</span>
                    <span className="text-slate-400 mx-1.5">↔</span>
                    <span>{item.targetTech.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {relLabel && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold">
                      {relLabel}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {getLocalizedText(item.explanation, language)}
              </p>

              {/* Expandable Evidence Details */}
              {isExpanded && item.relationship && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-mono text-slate-500 space-y-1.5 animate-in fade-in duration-150">
                  <div className="flex flex-wrap items-center gap-3">
                    {item.relationship.confidence && (
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-indigo-500" />
                        <span className="capitalize">{item.relationship.confidence} {t.stackBuilder.confidenceLabel}</span>
                      </div>
                    )}
                    {item.relationship.lastVerified && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{t.stackBuilder.lastVerified}: {item.relationship.lastVerified}</span>
                      </div>
                    )}
                  </div>

                  {item.relationship.sourceUrl && (
                    <a
                      href={item.relationship.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline pt-0.5"
                    >
                      <span>{t.stackBuilder.evidenceDetails}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

