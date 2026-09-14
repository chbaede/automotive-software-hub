import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  ExternalLink,
  X,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { NeighborhoodGraphEdge } from '../../lib/graph/neighborhood';
import { RelationshipBadge } from '../stack/RelationshipBadge';
import { CONFIDENCE_BADGES } from './graphTheme';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { formatVerifiedDate } from '../../utils/formatters';

interface SelectedTechEdgeInspectorProps {
  selectedEdge: NeighborhoodGraphEdge;
  sourceTech: StackTechnology;
  targetTech: StackTechnology;
  onClearSelectedEdge: () => void;
}

export const SelectedTechEdgeInspector: React.FC<SelectedTechEdgeInspectorProps> = ({
  selectedEdge,
  sourceTech,
  targetTech,
  onClearSelectedEdge,
}) => {
  const { language, t } = useLanguage();

  return (
    <div className="pt-4 space-y-3 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
          <span>{t.graphExplorer.selectedRelationship}</span>
        </div>
        <button
          type="button"
          onClick={onClearSelectedEdge}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label={t.graphExplorer.closeInspector}
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="p-3.5 bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 rounded-xl space-y-2.5 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 min-w-0 truncate">
            <span className="truncate">{sourceTech.name}</span>
            {selectedEdge.isSymmetric ? (
              <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" aria-hidden="true" />
            )}
            <span className="truncate">{targetTech.name}</span>
          </div>
          <RelationshipBadge type={selectedEdge.relationship.type} />
        </div>

        {selectedEdge.relationship.description && (
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
            {getLocalizedText(selectedEdge.relationship.description, language)}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {selectedEdge.relationship.confidence && (
            <span
              className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${
                CONFIDENCE_BADGES[selectedEdge.relationship.confidence].colorClass
              }`}
            >
              {language === 'ko'
                ? CONFIDENCE_BADGES[selectedEdge.relationship.confidence].label.ko
                : CONFIDENCE_BADGES[selectedEdge.relationship.confidence].label.en}
            </span>
          )}
          {selectedEdge.relationship.lastVerified && (
            <span>
              {t.graphExplorer.verifiedDate}:{' '}
              {formatVerifiedDate(selectedEdge.relationship.lastVerified, language)}
            </span>
          )}
          {selectedEdge.relationship.sourceUrl && (
            <a
              href={selectedEdge.relationship.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline ml-auto font-semibold"
            >
              <span>{t.graphExplorer.sourceDocument}</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
