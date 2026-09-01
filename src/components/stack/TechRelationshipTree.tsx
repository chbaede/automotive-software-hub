import React, { useState } from 'react';
import {
  Network,
  ArrowRight,
  ArrowLeftRight,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
  ListFilter,
  GitFork,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { RELATIONSHIP_METADATA, TechnologyRelationship, RelationshipType } from '../../types/relationship';
import { RelationshipBadge } from './RelationshipBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  getGroupedTechnologyRelationships,
} from '../../utils/graphIndexes';

interface TechRelationshipTreeProps {
  technology: StackTechnology;
  onSelectTech: (tech: StackTechnology) => void;
}

export const TechRelationshipTree: React.FC<TechRelationshipTreeProps> = ({
  technology,
  onSelectTech,
}) => {
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grouped' | 'directional'>('grouped');

  const outgoingRels = outgoingRelationshipsByTechnologyId.get(technology.id) || [];
  const incomingRels = incomingRelationshipsByTechnologyId.get(technology.id) || [];
  const groupedRels = getGroupedTechnologyRelationships(technology.id);

  const explicitRelatedIds = new Set([
    ...outgoingRels.map((r) => r.targetId),
    ...incomingRels.map((r) => r.sourceId),
  ]);

  const fallbackRelatedTechs = (technology.relatedTechnologyIds || [])
    .filter((id) => !explicitRelatedIds.has(id))
    .map((id) => technologyById.get(id))
    .filter((st): st is StackTechnology => Boolean(st));

  const totalConnections = outgoingRels.length + incomingRels.length + fallbackRelatedTechs.length;

  if (totalConnections === 0) return null;

  const renderRelationshipCard = (
    rel: TechnologyRelationship,
    otherTech: StackTechnology,
    isOutgoing: boolean,
    idx: number
  ) => {
    const relMeta = RELATIONSHIP_METADATA[rel.type];
    const isSymmetric = relMeta?.isSymmetric || false;
    const relDesc = rel.description ? getLocalizedText(rel.description, language) : null;

    return (
      <div
        key={`${otherTech.id}-${idx}`}
        className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition space-y-1.5 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {isOutgoing ? (
              <>
                <RelationshipBadge type={rel.type} />
                {isSymmetric ? (
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                )}
                <button
                  onClick={() => onSelectTech(otherTech)}
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 hover:underline text-left"
                >
                  <span>{otherTech.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectTech(otherTech)}
                  className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 hover:underline text-left"
                >
                  <span>{otherTech.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
                {isSymmetric ? (
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                )}
                <RelationshipBadge type={rel.type} />
              </>
            )}
          </div>

          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded shrink-0">
            {otherTech.layerId.split('-')[0]}
          </span>
        </div>

        {relDesc && (
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
            {relDesc}
          </p>
        )}

        {/* Evidence & Trust metadata */}
        {(rel.confidence || rel.sourceUrl || rel.lastVerified) && (
          <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono flex-wrap">
            {rel.confidence && (
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>
                  {rel.confidence === 'official'
                    ? t.trust.officialSource
                    : rel.confidence === 'vendor'
                    ? t.trust.vendorSource
                    : t.trust.communitySource}
                </span>
              </span>
            )}
            {rel.lastVerified && (
              <span>{t.trust.lastVerified.replace('{date}', rel.lastVerified)}</span>
            )}
            {rel.sourceUrl && (
              <a
                href={rel.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-0.5"
              >
                <span>{t.trust.sourceLink}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <Network className="w-4 h-4 text-brand-500" />
          <span>{t.stack.semanticRelationshipsHeader} ({totalConnections})</span>
        </div>

        <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 text-[10px] font-semibold">
          <button
            onClick={() => setViewMode('grouped')}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              viewMode === 'grouped'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-3 h-3" />
            <span>Semantic Groups</span>
          </button>
          <button
            onClick={() => setViewMode('directional')}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              viewMode === 'directional'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GitFork className="w-3 h-3" />
            <span>Directional</span>
          </button>
        </div>
      </div>

      {/* Primary Center Node */}
      <div className="p-3 bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-xl font-bold shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-200" />
          <span className="text-sm">{technology.name}</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/20 text-white rounded">
          {technology.layerId}
        </span>
      </div>

      {/* View Mode 1: Grouped by Semantic Category */}
      {viewMode === 'grouped' && (
        <div className="space-y-4">
          {Array.from(groupedRels.entries()).map(([relType, items]) => {
            const typedRelType = relType as RelationshipType;
            const relMeta = RELATIONSHIP_METADATA[typedRelType];
            const typeLabel = relMeta ? getLocalizedText(relMeta.label, language) : relType;

            return (
              <div key={relType} className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <RelationshipBadge type={typedRelType} />
                    <span>{typeLabel}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    {items.length}
                  </span>
                </div>

                <div className="grid gap-2">
                  {items.map((item, idx) =>
                    renderRelationshipCard(
                      item.relationship,
                      item.targetOrSourceTech,
                      item.isOutgoing,
                      idx
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 2: Inward / Outward Directional */}
      {viewMode === 'directional' && (
        <div className="space-y-4">
          {outgoingRels.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Outward Dependencies & Downstream Integrations ({outgoingRels.length})
              </div>
              <div className="grid gap-2">
                {outgoingRels.map((rel, idx) => {
                  const targetTech = technologyById.get(rel.targetId);
                  if (!targetTech) return null;
                  return renderRelationshipCard(rel, targetTech, true, idx);
                })}
              </div>
            </div>
          )}

          {incomingRels.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Adopted & Utilized By / Upstream Callers ({incomingRels.length})
              </div>
              <div className="grid gap-2">
                {incomingRels.map((rel, idx) => {
                  const sourceTech = technologyById.get(rel.sourceId);
                  if (!sourceTech) return null;
                  return renderRelationshipCard(rel, sourceTech, false, idx);
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fallback Related Nodes */}
      {fallbackRelatedTechs.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Other Related Stack Nodes ({fallbackRelatedTechs.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {fallbackRelatedTechs.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onSelectTech(rel)}
                className="px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-brand-500/10 hover:border-brand-500 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>{rel.name}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-normal">
                  {rel.layerId.split('-')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
