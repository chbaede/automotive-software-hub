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
  BarChart3,
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
}) => {
  const { language } = useLanguage();

  const insights = useMemo(() => getGraphInsights(), []);

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  const getLayerInfo = (layerId: string) => {
    return stackLayers.find((l) => l.id === layerId);
  };

  // Sort layer distribution according to canonical stack layer order
  const sortedLayerDistribution = useMemo(() => {
    return [...insights.layerDistribution].sort((a, b) => {
      const orderA = getLayerInfo(a.layerId)?.order ?? 99;
      const orderB = getLayerInfo(b.layerId)?.order ?? 99;
      return orderA - orderB;
    });
  }, [insights.layerDistribution]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {language === 'ko' ? '지식 그래프 토폴로지 인사이트' : 'Knowledge Graph Topology Insights'}
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-normal border border-purple-500/30">
                {language === 'ko' ? '지식 그래프' : 'Knowledge Graph'}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'ko'
                ? '구조화된 그래프 관계망에서 최다 연결 기술, 크로스 레이어 연결 기술 및 계층별 기술 분포를 분석합니다.'
                : 'Topological analysis of high-connectivity technologies, cross-layer connectors, and layer density breakdown.'}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {language === 'ko' ? '총 기술 노드' : 'Total Technologies'}
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{insights.totalNodes}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">10 Stack Layers</div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {language === 'ko' ? '의미론적 관계 링크' : 'Typed Relationships'}
          </div>
          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">{insights.totalEdges}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">9 Semantic Types</div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {language === 'ko' ? '기술당 평균 연결수' : 'Avg Connections / Tech'}
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{insights.averageConnections}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {language === 'ko' ? '고립 노드 0개' : 'Zero isolated nodes'}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {language === 'ko' ? '크로스 레이어 기술' : 'Cross-Layer Techs'}
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {insights.crossLayerTechnologies.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {language === 'ko' ? '≥3개 계층 연결' : '≥3 layers connected'}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Hubs & Cross-Layer Connectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Most Connected Technologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ko' ? '최다 연결 기술 (Most Connected)' : 'Most Connected Technologies'}
            </h3>
          </div>
          <div className="space-y-2">
            {insights.topHubs.slice(0, 6).map((hub, idx) => {
              const layerName = getLayerName(hub.technology.layerId);
              return (
                <button
                  key={hub.technology.id}
                  onClick={() => onSelectTech(hub.technology)}
                  className="w-full text-left bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/20">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 text-sm flex items-center gap-1.5">
                        {hub.technology.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{layerName}</span>
                        <span>•</span>
                        <span>{hub.connectedLayersCount} {language === 'ko' ? '개 계층 연결' : 'layers'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      {hub.connectionCount} {language === 'ko' ? '개 연결' : 'techs'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cross-Layer Technologies */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ko' ? '크로스 레이어 연결 기술 (Cross-Layer)' : 'Cross-Layer Connectors (≥3 Layers)'}
            </h3>
          </div>
          <div className="space-y-2">
            {insights.crossLayerTechnologies.slice(0, 6).map((item, idx) => {
              const layerName = getLayerName(item.technology.layerId);
              return (
                <button
                  key={item.technology.id}
                  onClick={() => onSelectTech(item.technology)}
                  className="w-full text-left bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/20">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 text-sm flex items-center gap-1.5">
                        {item.technology.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{layerName}</span>
                        <span>•</span>
                        <span className="text-purple-600 dark:text-purple-300 font-medium">
                          {item.connectedLayersCount} {language === 'ko' ? '개 이종 계층 연결' : 'distinct layers'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                      {item.connectionCount} {language === 'ko' ? '개 연결' : 'techs'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Layer Distribution Breakdown */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-500 dark:text-sky-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ko' ? '스택 계층별 기술 분포 (Layer Distribution)' : 'Stack Layer Technology Distribution'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {sortedLayerDistribution.length} {language === 'ko' ? '개 계층' : 'Layers'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sortedLayerDistribution.map((item) => {
            const layerObj = getLayerInfo(item.layerId);
            const layerName = layerObj ? getLocalizedText(layerObj.name, language) : item.layerId;
            const percentage = insights.totalNodes > 0
              ? Math.round((item.count / insights.totalNodes) * 100)
              : 0;
            const isCore = layerObj?.layerType === 'core';

            return (
              <div
                key={item.layerId}
                className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0 pr-2">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isCore
                          ? 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30'
                          : 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isCore
                        ? language === 'ko'
                          ? '코어'
                          : 'Core'
                        : language === 'ko'
                          ? '공통 영역'
                          : 'Cross-cutting'}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={layerName}>
                      {layerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">{item.count}</span>
                    <span className="text-slate-500 text-[10px]">({percentage}%)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCore
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                        : 'bg-gradient-to-r from-amber-500 to-rose-500'
                    }`}
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
