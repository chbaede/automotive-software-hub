import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StackTechnology } from '../../types/stack';
import { TechnologyRelationship, RELATIONSHIP_METADATA } from '../../types/relationship';
import { RelationshipBadge } from './RelationshipBadge';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { stackLayers } from '../../data/stackLayers';
import {
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  technologyById,
} from '../../utils/graphIndexes';
import {
  Network,
  ArrowRight,
  ArrowLeftRight,
  Sparkles,
  ExternalLink,
  Layers,
  Info,
} from 'lucide-react';

interface InteractiveGraphViewProps {
  technology: StackTechnology;
  onSelectTech?: (tech: StackTechnology) => void;
}

export const InteractiveGraphView: React.FC<InteractiveGraphViewProps> = ({
  technology,
}) => {
  const { language } = useLanguage();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const outgoingRels = outgoingRelationshipsByTechnologyId.get(technology.id) || [];
  const incomingRels = incomingRelationshipsByTechnologyId.get(technology.id) || [];

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  const currentLayerName = getLayerName(technology.layerId);

  // Classify relationships into Upstream/Underlying dependencies vs Downstream/Integrations
  const upstreamItems = outgoingRels
    .map((rel) => ({
      rel,
      tech: technologyById.get(rel.targetId),
      isOutgoing: true,
    }))
    .filter((item): item is { rel: TechnologyRelationship; tech: StackTechnology; isOutgoing: boolean } =>
      Boolean(item.tech)
    );

  const downstreamItems = incomingRels
    .map((rel) => ({
      rel,
      tech: technologyById.get(rel.sourceId),
      isOutgoing: false,
    }))
    .filter((item): item is { rel: TechnologyRelationship; tech: StackTechnology; isOutgoing: boolean } =>
      Boolean(item.tech)
    );

  const totalConnected = upstreamItems.length + downstreamItems.length;

  if (totalConnected === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-2">
        <Network className="w-8 h-8 mx-auto text-slate-400" />
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          {language === 'ko'
            ? '직접 연결된 지식 그래프 관계가 아직 등록되지 않았습니다.'
            : 'No direct graph relationships are currently documented.'}
        </p>
        <p className="text-xs text-slate-500">
          {language === 'ko'
            ? '지속적으로 자동차 소프트웨어 지식 그래프를 확장하고 있습니다.'
            : 'We are continuously expanding the Automotive Software Knowledge Graph.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 transition-colors shadow-2xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'ko' ? '로컬 그래프 토폴로지 맵' : 'Local Graph Topology Map'}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/30">
                {totalConnected} {language === 'ko' ? '개 연결 노드' : 'Connected Nodes'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ko'
                ? '노드를 클릭하면 해당 기술의 지식 그래프 상세 페이지로 이동합니다.'
                : 'Click any connected node to navigate directly to its knowledge graph detail page.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3-Column Visual Layout: Downstream (Source -> Current) | Center (Current) | Upstream (Current -> Target) */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
        {/* Left Column: Incoming / Downstream Technologies */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{language === 'ko' ? '유입 관계 (Incoming Links)' : 'Incoming Links (Sources)'}</span>
            <span className="font-mono text-[10px] text-brand-600 dark:text-brand-400">{downstreamItems.length}</span>
          </div>

          {downstreamItems.length > 0 ? (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {downstreamItems.map((item, idx) => {
                const isHovered = hoveredNodeId === item.tech.id;
                const isSymmetric = RELATIONSHIP_METADATA[item.rel.type]?.isSymmetric;
                return (
                  <Link
                    key={`${item.tech.id}-${idx}`}
                    to={`/stack/${item.tech.id}`}
                    onMouseEnter={() => setHoveredNodeId(item.tech.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`block p-3 rounded-xl border transition-all text-left group ${
                      isHovered
                        ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/30 shadow-md scale-[1.01]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-500/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {getLayerName(item.tech.layerId)}
                      </span>
                      <div className="flex items-center gap-1">
                        <RelationshipBadge type={item.rel.type} />
                        {isSymmetric ? (
                          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
                        )}
                      </div>
                    </div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 flex items-center justify-between">
                      <span className="truncate">{item.tech.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
              {language === 'ko' ? '유입되는 관계 없음' : 'No incoming relations'}
            </div>
          )}
        </div>

        {/* Center Column: Current Dominant Technology Node (1 col) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-4 bg-brand-600/10 dark:bg-brand-500/15 border-2 border-brand-500 rounded-2xl shadow-lg ring-4 ring-brand-500/20 text-center relative z-10 space-y-2">
          <div className="p-2.5 rounded-full bg-brand-600 text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-700 dark:text-brand-300">
              {currentLayerName}
            </span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight pt-1">
              {technology.name}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-semibold">
            {language === 'ko' ? '선택된 노드' : 'Active Center'}
          </span>
        </div>

        {/* Right Column: Outgoing / Upstream Technologies */}
        <div className="lg:col-span-3 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{language === 'ko' ? '유출 관계 (Outgoing Links)' : 'Outgoing Links (Targets)'}</span>
            <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{upstreamItems.length}</span>
          </div>

          {upstreamItems.length > 0 ? (
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {upstreamItems.map((item, idx) => {
                const isHovered = hoveredNodeId === item.tech.id;
                const isSymmetric = RELATIONSHIP_METADATA[item.rel.type]?.isSymmetric;
                return (
                  <Link
                    key={`${item.tech.id}-${idx}`}
                    to={`/stack/${item.tech.id}`}
                    onMouseEnter={() => setHoveredNodeId(item.tech.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`block p-3 rounded-xl border transition-all text-left group ${
                      isHovered
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/30 shadow-md scale-[1.01]'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1">
                        {isSymmetric ? (
                          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                        )}
                        <RelationshipBadge type={item.rel.type} />
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {getLayerName(item.tech.layerId)}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex items-center justify-between">
                      <span className="truncate">{item.tech.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
              {language === 'ko' ? '유출되는 관계 없음' : 'No outgoing relations'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
