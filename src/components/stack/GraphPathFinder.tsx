import React, { useState, useMemo } from 'react';
import {
  Route,
  ArrowRight,
  ArrowLeftRight,
  Compass,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Filter,
} from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { stackTechnologies } from '../../data/stackTechnologies';
import { stackLayers } from '../../data/stackLayers';
import { findShortestPath, GraphPathStep } from '../../lib/graph';
import { RelationshipType, RELATIONSHIP_METADATA } from '../../types/relationship';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedText } from '../../types/i18n';
import { RelationshipBadge } from './RelationshipBadge';

interface GraphPathFinderProps {
  initialSourceId?: string;
  initialTargetId?: string;
  onSelectTech: (tech: StackTechnology) => void;
  onClose?: () => void;
}

const EXAMPLE_PATHS = [
  {
    fromId: 'autosar-adaptive',
    toId: 'covesa-vss',
    label: { en: 'AUTOSAR Adaptive → COVESA VSS', ko: 'AUTOSAR Adaptive → COVESA VSS' },
  },
  {
    fromId: 'nvidia-drive-thor',
    toId: 'eclipse-uprotocol',
    label: { en: 'NVIDIA DRIVE Thor → Eclipse uProtocol', ko: 'NVIDIA DRIVE Thor → Eclipse uProtocol' },
  },
  {
    fromId: 'ros2-autoware',
    toId: 'infineon-aurix',
    label: { en: 'Autoware → Infineon AURIX MCU', ko: 'Autoware → 인피니언 AURIX MCU' },
  },
  {
    fromId: 'android-automotive-os',
    toId: 'can-protocol',
    label: { en: 'Android Automotive OS → CAN Protocol', ko: '안드로이드 오토모티브 → CAN 프로토콜' },
  },
];

const CORE_DEPENDENCY_TYPES: RelationshipType[] = [
  'depends-on',
  'runs-on',
  'implemented-by',
  'integrates-with',
];

export const GraphPathFinder: React.FC<GraphPathFinderProps> = ({
  initialSourceId = 'autosar-adaptive',
  initialTargetId = 'covesa-vss',
  onSelectTech,
  onClose,
}) => {
  const { language } = useLanguage();
  const [sourceId, setSourceId] = useState<string>(initialSourceId);
  const [targetId, setTargetId] = useState<string>(initialTargetId);
  const [filterMode, setFilterMode] = useState<'all' | 'core-dependencies'>('all');

  // Sorted list of technologies for dropdowns
  const sortedTechs = useMemo(() => {
    return [...stackTechnologies].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const pathResult = useMemo(() => {
    if (!sourceId || !targetId) return null;
    const relationshipTypes = filterMode === 'core-dependencies' ? CORE_DEPENDENCY_TYPES : undefined;
    return findShortestPath(sourceId, targetId, { relationshipTypes });
  }, [sourceId, targetId, filterMode]);

  const handleSwap = () => {
    setSourceId(targetId);
    setTargetId(sourceId);
  };

  const getLayerName = (layerId: string) => {
    const layer = stackLayers.find((l) => l.id === layerId);
    return layer ? getLocalizedText(layer.name, language) : layerId;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {language === 'ko' ? '지식 그래프 최단 경로 탐색기' : 'Knowledge Graph Path Finder'}
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-normal border border-cyan-500/30">
                {language === 'ko' ? '지식 그래프' : 'Knowledge Graph'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ko'
                ? '두 기술 간의 의미론적 관계 링크를 따라 최단 연결 경로를 탐색합니다.'
                : 'Traverse semantic graph relationships to discover shortest architectural connection paths.'}
            </p>
          </div>
        </div>
      </div>

      {/* Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        {/* Source Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {language === 'ko' ? '시작 기술 (Source)' : 'Start Technology (Source)'}
          </label>
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          >
            {sortedTechs.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name} ({getLayerName(tech.layerId)})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-5">
          <button
            onClick={handleSwap}
            title={language === 'ko' ? '출발/도착 전환' : 'Swap Source & Target'}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {language === 'ko' ? '도착 기술 (Target)' : 'Target Technology (Destination)'}
          </label>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            {sortedTechs.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.name} ({getLayerName(tech.layerId)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Traversal Options & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-xs">
        {/* Example Paths */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-semibold">{language === 'ko' ? '탐색 예시:' : 'Example Paths:'}</span>
          {EXAMPLE_PATHS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSourceId(preset.fromId);
                setTargetId(preset.toId);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-xs"
            >
              {getLocalizedText(preset.label, language)}
            </button>
          ))}
        </div>

        {/* Relationship Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3 h-3" />
            {language === 'ko' ? '관계 필터:' : 'Edge Filter:'}
          </span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                filterMode === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'ko' ? '모든 관계' : 'All Relationships'}
            </button>
            <button
              onClick={() => setFilterMode('core-dependencies')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                filterMode === 'core-dependencies'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="depends-on, runs-on, implemented-by, integrates-with"
            >
              {language === 'ko' ? '기술적 의존성만' : 'Core Dependencies Only'}
            </button>
          </div>
        </div>
      </div>

      {/* Path Results */}
      {pathResult && (
        <div className="space-y-4 pt-1">
          {pathResult.found ? (
            <div>
              {/* Path Summary Metric */}
              <div className="flex items-center justify-between bg-cyan-950/30 border border-cyan-800/40 rounded-xl px-4 py-2.5 text-xs text-cyan-300 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    {language === 'ko'
                      ? `총 ${pathResult.hopCount}단계 연결 경로 탐색 완료 (${pathResult.nodes.length}개 노드)`
                      : `Found shortest path across ${pathResult.hopCount} hops (${pathResult.nodes.length} nodes)`}
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  BFS Traversal
                </span>
              </div>

              {/* Step-by-Step Visualization */}
              <div className="space-y-3">
                {pathResult.steps.map((step: GraphPathStep, idx: number) => {
                  const fromLayer = getLayerName(step.fromTechnology.layerId);
                  const toLayer = getLayerName(step.toTechnology.layerId);
                  const relDesc = getLocalizedText(step.relationship.description, language);

                  return (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 transition-all hover:border-slate-700 space-y-3"
                    >
                      {/* Step Header */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">
                          {language === 'ko' ? `단계 ${idx + 1}` : `Hop ${idx + 1}`}
                        </span>
                        <RelationshipBadge
                          type={step.relationship.type}
                          confidence={step.relationship.confidence}
                        />
                      </div>

                      {/* Node to Node row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                        {/* Source Tech */}
                        <button
                          onClick={() => onSelectTech(step.fromTechnology)}
                          className="flex-1 text-left group hover:opacity-90"
                        >
                          <div className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Layers className="w-3 h-3 text-slate-500" />
                            {fromLayer}
                          </div>
                          <div className="font-semibold text-white group-hover:text-cyan-400 flex items-center gap-1 mt-0.5 text-sm">
                            {step.fromTechnology.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>

                        {/* Arrow */}
                        <div className="flex items-center justify-center text-slate-500 shrink-0">
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                        </div>

                        {/* Target Tech */}
                        <button
                          onClick={() => onSelectTech(step.toTechnology)}
                          className="flex-1 text-left sm:text-right group hover:opacity-90"
                        >
                          <div className="text-xs text-slate-400 flex items-center sm:justify-end gap-1.5">
                            <Layers className="w-3 h-3 text-slate-500" />
                            {toLayer}
                          </div>
                          <div className="font-semibold text-white group-hover:text-cyan-400 flex items-center sm:justify-end gap-1 mt-0.5 text-sm">
                            {step.toTechnology.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      </div>

                      {/* Relationship Description */}
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
                        💬 {relDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-amber-950/20 border border-amber-800/40 rounded-xl p-4 text-amber-300 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              <div>
                <p className="font-semibold">
                  {language === 'ko'
                    ? '선택한 조건에서 두 기술 간의 연결 경로를 찾을 수 없습니다.'
                    : 'No graph relationship path found between the selected technologies with current filters.'}
                </p>
                <p className="text-amber-400/80 mt-0.5">
                  {language === 'ko'
                    ? '관계 필터를 "모든 관계"로 변경하거나 다른 기술을 선택해 보세요.'
                    : 'Try switching the filter to "All Relationships" or selecting a different technology.'}
                </p>
              </div>
            </div>
          )}

          {/* Strict Architectural Disclaimer */}
          <div className="flex items-start gap-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">
                {language === 'ko' ? '지식 그래프 탐색 경로 안내: ' : 'Graph Traversal Path Note: '}
              </strong>
              {language === 'ko'
                ? '이 경로는 기술 간 의미론적 관계 링크(Relationships)를 알고리즘(BFS)으로 탐색한 계산된 연결 경로(Computed Graph Path)이며, 공식 검증된 양산 아키텍처 스택 경로(Curated Stack Path)와는 구분됩니다.'
                : 'This path is computed from individual graph relationships via graph traversal (BFS) and represents a relational connection, distinct from curated Stack Paths representing validated production architectures.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
