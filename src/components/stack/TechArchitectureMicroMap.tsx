import React from 'react';
import { ArrowRight, ArrowLeftRight, Layers, Sparkles } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { RELATIONSHIP_METADATA } from '../../types/relationship';
import { RelationshipBadge } from './RelationshipBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import {
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  technologyById,
} from '../../utils/graphIndexes';

interface TechArchitectureMicroMapProps {
  technology: StackTechnology;
  onSelectTech: (tech: StackTechnology) => void;
}

export const TechArchitectureMicroMap: React.FC<TechArchitectureMicroMapProps> = ({
  technology,
  onSelectTech,
}) => {
  const { language } = useLanguage();

  const outgoingRels = outgoingRelationshipsByTechnologyId.get(technology.id) || [];
  const incomingRels = incomingRelationshipsByTechnologyId.get(technology.id) || [];

  if (outgoingRels.length === 0 && incomingRels.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-4 shadow-inner">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Architecture Micro-Map (Interactive Flow)</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {incomingRels.length} Inward · {outgoingRels.length} Outward
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        {/* Inward Nodes (Adopted / Used By) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider text-center md:text-left">
            Inward Callers / Higher Layers ({incomingRels.length})
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {incomingRels.length === 0 ? (
              <div className="text-[11px] text-slate-500 italic p-2 border border-dashed border-slate-800 rounded-lg text-center">
                Top-level layer
              </div>
            ) : (
              incomingRels.map((rel, idx) => {
                const srcTech = technologyById.get(rel.sourceId);
                if (!srcTech) return null;
                const isSymmetric = RELATIONSHIP_METADATA[rel.type]?.isSymmetric;

                return (
                  <button
                    key={`in-${srcTech.id}-${idx}`}
                    onClick={() => onSelectTech(srcTech)}
                    className="w-full text-left p-2 bg-slate-900 hover:bg-slate-850 hover:border-brand-500/60 border border-slate-800 rounded-lg transition group flex items-center justify-between gap-1.5 shadow-2xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-brand-400 truncate">
                        {srcTech.name}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 truncate">
                        {srcTech.layerId.split('-')[0]}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <RelationshipBadge type={rel.type} />
                      {isSymmetric ? (
                        <ArrowLeftRight className="w-3 h-3 text-slate-500" />
                      ) : (
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Center Active Node */}
        <div className="p-3 bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-xl border border-brand-400/50 shadow-lg text-center space-y-1.5 ring-2 ring-brand-500/40">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-brand-200 uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Focus</span>
          </div>
          <div className="text-sm font-extrabold leading-snug">{technology.name}</div>
          <div className="text-[10px] font-mono px-2 py-0.5 bg-white/20 rounded inline-block text-white">
            {technology.layerId}
          </div>
        </div>

        {/* Outward Nodes (Dependencies & Targets) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider text-center md:text-left">
            Outward Targets / Lower Layers ({outgoingRels.length})
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {outgoingRels.length === 0 ? (
              <div className="text-[11px] text-slate-500 italic p-2 border border-dashed border-slate-800 rounded-lg text-center">
                Foundational layer
              </div>
            ) : (
              outgoingRels.map((rel, idx) => {
                const targetTech = technologyById.get(rel.targetId);
                if (!targetTech) return null;
                const isSymmetric = RELATIONSHIP_METADATA[rel.type]?.isSymmetric;

                return (
                  <button
                    key={`out-${targetTech.id}-${idx}`}
                    onClick={() => onSelectTech(targetTech)}
                    className="w-full text-left p-2 bg-slate-900 hover:bg-slate-850 hover:border-brand-500/60 border border-slate-800 rounded-lg transition group flex items-center justify-between gap-1.5 shadow-2xs"
                  >
                    <div className="flex items-center gap-1 shrink-0">
                      {isSymmetric ? (
                        <ArrowLeftRight className="w-3 h-3 text-slate-500" />
                      ) : (
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      )}
                      <RelationshipBadge type={rel.type} />
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <div className="text-xs font-bold text-slate-200 group-hover:text-brand-400 truncate">
                        {targetTech.name}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400 truncate">
                        {targetTech.layerId.split('-')[0]}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

