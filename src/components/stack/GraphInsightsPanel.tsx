import React, { useMemo } from 'react';
import {
  Network,
  Activity,
  Layers,
  Sparkles,
  GitFork,
  ArrowRight,
  ExternalLink,
  Shield,
  Zap,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { getGraphInsights } from '../../lib/graph';
import { stackLayers } from '../../data/stackLayers';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';

interface GraphInsightsPanelProps {
  onSelectTech: (tech: StackTechnology) => void;
  onFindPath?: (sourceId: string, targetId: string) => void;
}

export const GraphInsightsPanel: React.FC<GraphInsightsPanelProps> = ({
  onSelectTech,
  onFindPath,
}) => {
  const { language } = useLanguage();

  const insights = useMemo(() => getGraphInsights(), []);

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {language === 'ko' ? '지식 그래프 토폴로지 인사이트' : 'Knowledge Graph Insights'}
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-normal border border-purple-500/30">
                Phase 4.0 Graph Intelligence
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ko'
                ? '구조화된 그래프 관계망에서 핵심 허브(Hub) 및 계층 간 가교(Bridge) 기술을 분석합니다.'
                : 'Topological analysis of high-connectivity hubs and cross-layer bridge technologies.'}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">
            {language === 'ko' ? '총 기술 노드' : 'Total Nodes'}
          </div>
          <div className="text-2xl font-bold text-white mt-1">{insights.totalNodes}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">10 Stack Layers</div>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">
            {language === 'ko' ? '의미론적 관계 링크' : 'Typed Relationships'}
          </div>
          <div className="text-2xl font-bold text-cyan-400 mt-1">{insights.totalEdges}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">9 Semantic Types</div>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">
            {language === 'ko' ? '노드당 평균 연결도' : 'Avg Degree / Node'}
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{insights.averageDegree}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Zero isolated nodes</div>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-semibold text-slate-400">
            {language === 'ko' ? '크로스 레이어 브릿지' : 'Bridge Techs (≥3 Layers)'}
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-1">
            {insights.bridgeTechnologies.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Multi-layer hubs</div>
        </div>
      </div>

      {/* Two Column Layout: Hubs & Bridges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Top Hub Technologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              {language === 'ko' ? '최다 연결 허브 기술 (Top Graph Hubs)' : 'Top Graph Hubs (High Degree)'}
            </h3>
          </div>
          <div className="space-y-2">
            {insights.topHubs.slice(0, 6).map((hub, idx) => {
              const layerName = getLayerName(hub.technology.layerId);
              return (
                <button
                  key={hub.technology.id}
                  onClick={() => onSelectTech(hub.technology)}
                  className="w-full text-left bg-slate-950/60 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/20">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300 text-sm flex items-center gap-1.5">
                        {hub.technology.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{layerName}</span>
                        <span>•</span>
                        <span>{hub.connectedLayersCount} {language === 'ko' ? '개 계층 연결' : 'layers'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {hub.degree} links
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bridge Technologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              {language === 'ko' ? '크로스 계층 브릿지 기술 (Bridge Technologies)' : 'Cross-Layer Bridges (≥3 Layers)'}
            </h3>
          </div>
          <div className="space-y-2">
            {insights.bridgeTechnologies.slice(0, 6).map((bridge, idx) => {
              const layerName = getLayerName(bridge.technology.layerId);
              return (
                <button
                  key={bridge.technology.id}
                  onClick={() => onSelectTech(bridge.technology)}
                  className="w-full text-left bg-slate-950/60 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/20">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-white group-hover:text-purple-300 text-sm flex items-center gap-1.5">
                        {bridge.technology.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{layerName}</span>
                        <span>•</span>
                        <span className="text-purple-300 font-medium">
                          {bridge.connectedLayersCount} {language === 'ko' ? '개 이종 계층 연결' : 'distinct layers'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {bridge.degree} links
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
