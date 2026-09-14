import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Compass } from 'lucide-react';
import { StackTechnology } from '../../types/stack';
import { getStackLayers } from '../../lib/domain';
import {
  NeighborhoodGraphData,
  NeighborhoodGraphEdge,
} from '../../lib/graph/neighborhood';
import {
  getLayerTheme,
  getRelationshipVisual,
  RELATIONSHIP_VISUALS,
} from './graphTheme';
import { computeGraphLayout } from './graphLayout';
import { GraphLegend } from './GraphLegend';
import { useLanguage } from '../../i18n/LanguageContext';

interface KnowledgeGraphCanvasProps {
  data: NeighborhoodGraphData;
  selectedTechId: string | null;
  selectedEdgeId: string | null;
  onSelectTech: (tech: StackTechnology) => void;
  onSelectEdge: (edge: NeighborhoodGraphEdge | null) => void;
  depth: 1 | 2;
  onToggleDepth?: () => void;
}

export const KnowledgeGraphCanvas: React.FC<KnowledgeGraphCanvasProps> = ({
  data,
  selectedTechId,
  selectedEdgeId,
  onSelectTech,
  onSelectEdge,
  depth,
  onToggleDepth,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // SVG dimensions
  const width = 900;
  const height = 700;
  const centerX = width / 2;
  const centerY = height / 2;

  // Reset viewport when focal technology changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [data.focalTechnology.id]);

  // Order layers from domain selector for physical clustering
  const layerOrderMap = useMemo(() => {
    const map = new Map<string, number>();
    const layers = getStackLayers();
    layers.forEach((l, idx) => map.set(l.id, idx));
    return map;
  }, []);

  // Compute Layout Positions (Deterministic Radial Ring Layout)
  const { positions, edgesWithCoords } = useMemo(() => {
    return computeGraphLayout(data, width, height, layerOrderMap);
  }, [data, width, height, layerOrderMap]);

  // Connected node IDs for hover highlights
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return null;
    const set = new Set<string>([hoveredNodeId]);
    for (const edge of data.edges) {
      if (edge.sourceId === hoveredNodeId) set.add(edge.targetId);
      if (edge.targetId === hoveredNodeId) set.add(edge.sourceId);
    }
    return set;
  }, [hoveredNodeId, data.edges]);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'svg' && (e.target as HTMLElement).id !== 'graph-bg') {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(Math.max(0.4, prev * zoomFactor), 2.5));
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev * 1.2, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev / 1.2, 0.4));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onSelectEdge(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      role="region"
      aria-label={t.graphExplorer.title}
    >
      {/* Floating Viewport Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/80 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-brand-500"
          title={t.graphExplorer.zoomIn}
          aria-label={t.graphExplorer.zoomIn}
        >
          <ZoomIn className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/80 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-brand-500"
          title={t.graphExplorer.zoomOut}
          aria-label={t.graphExplorer.zoomOut}
        >
          <ZoomOut className="w-4 h-4" aria-hidden="true" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/80 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-brand-500"
          title={t.graphExplorer.resetView}
          aria-label={t.graphExplorer.resetView}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>
        {onToggleDepth && (
          <button
            onClick={onToggleDepth}
            className={`px-2 py-1.5 text-[11px] font-mono font-bold rounded-lg transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              depth === 2
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/80'
            }`}
            title={`${t.graphExplorer.depthLabel}: ${depth === 1 ? t.graphExplorer.depth1 : t.graphExplorer.depth2}`}
            aria-label={`${t.graphExplorer.depthLabel}: ${depth === 1 ? t.graphExplorer.depth1 : t.graphExplorer.depth2}`}
          >
            {depth}H
          </button>
        )}
      </div>

      {/* Floating Legend */}
      <GraphLegend />

      {/* Primary SVG Canvas */}
      <svg
        id="graph-bg"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-hidden="true"
      >
        <defs>
          {/* Arrowhead markers for each relationship type */}
          {Object.entries(RELATIONSHIP_VISUALS).map(([type, visual]) => (
            <marker
              key={`arrow-${type}`}
              id={`arrow-${type}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={visual.color} />
            </marker>
          ))}

          {/* Selected / Highlighted Arrowhead */}
          <marker
            id="arrow-selected"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
          </marker>

          {/* Subtle Grid Background Pattern */}
          <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#334155"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#graph-grid)" />

        {/* Interactive Transform Container (Pan & Zoom) */}
        <g
          transform={`translate(${pan.x + centerX * (1 - zoom)}, ${pan.y + centerY * (1 - zoom)}) scale(${zoom})`}
        >
          {/* Orbit Guide Rings */}
          <circle
            cx={centerX}
            cy={centerY}
            r={data.summary.depth1Count > 16 ? 250 : data.summary.depth1Count > 8 ? 220 : 180}
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="4,4"
            strokeOpacity="0.4"
          />
          {depth === 2 && data.summary.depth2Count > 0 && (
            <circle
              cx={centerX}
              cy={centerY}
              r={(data.summary.depth1Count > 16 ? 250 : data.summary.depth1Count > 8 ? 220 : 180) + 150}
              fill="none"
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray="4,4"
              strokeOpacity="0.2"
            />
          )}

          {/* Render Graph Edges */}
          <g className="edges-layer">
            {edgesWithCoords.map(({ edge, x1, y1, x2, y2 }) => {
              const visual = getRelationshipVisual(edge.relationship.type);
              const isSelected = selectedEdgeId === edge.id;
              const isHovered = hoveredEdgeId === edge.id;
              const isNodeConnected =
                connectedNodeIds === null ||
                (connectedNodeIds.has(edge.sourceId) && connectedNodeIds.has(edge.targetId));

              const strokeColor = isSelected ? '#38bdf8' : visual.color;
              const strokeWidth = isSelected || isHovered ? 2.5 : edge.distance === 1 ? 1.5 : 1.0;
              const opacity =
                isSelected || isHovered ? 1 : isNodeConnected ? (edge.distance === 1 ? 0.75 : 0.45) : 0.15;

              const markerEnd = edge.isSymmetric
                ? undefined
                : isSelected
                ? 'url(#arrow-selected)'
                : `url(#arrow-${edge.relationship.type})`;

              return (
                <g key={edge.id} className="cursor-pointer">
                  {/* Hit area for clicking */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="transparent"
                    strokeWidth="14"
                    onClick={() => onSelectEdge(edge)}
                    onMouseEnter={() => setHoveredEdgeId(edge.id)}
                    onMouseLeave={() => setHoveredEdgeId(null)}
                  />
                  {/* Visible Edge Line */}
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={visual.dashArray}
                    strokeOpacity={opacity}
                    markerEnd={markerEnd}
                    className="transition-all duration-200 pointer-events-none"
                  />
                </g>
              );
            })}
          </g>

          {/* Render Graph Nodes */}
          <g className="nodes-layer">
            {positions.map(({ x, y, node }) => {
              const isFocal = node.distance === 0;
              const isDepth1 = node.distance === 1;
              const isSelected = selectedTechId === node.technology.id;
              const isDimmed = connectedNodeIds !== null && !connectedNodeIds.has(node.technology.id);

              const theme = getLayerTheme(node.layerId);
              const radius = isFocal ? 36 : isDepth1 ? 26 : 18;

              return (
                <g
                  key={node.technology.id}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer transition-all duration-200"
                  opacity={isDimmed ? 0.25 : 1}
                  onClick={() => onSelectTech(node.technology)}
                  onMouseEnter={() => setHoveredNodeId(node.technology.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.technology.name} (${theme.name})`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectTech(node.technology);
                    }
                  }}
                >
                  {/* Glowing ring for focal / selected node */}
                  {(isFocal || isSelected) && (
                    <circle
                      r={radius + 8}
                      fill="none"
                      stroke={isSelected ? '#38bdf8' : '#6366f1'}
                      strokeWidth="3"
                      strokeOpacity="0.4"
                      className="animate-pulse"
                    />
                  )}

                  {/* Hub indicator badge ring */}
                  {node.isHub && !isFocal && (
                    <circle
                      r={radius + 4}
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                      strokeOpacity="0.8"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r={radius}
                    fill={isFocal ? '#4f46e5' : theme.fillDark}
                    stroke={isSelected ? '#38bdf8' : isFocal ? '#818cf8' : theme.color}
                    strokeWidth={isSelected ? 3 : isFocal ? 2.5 : 1.5}
                    className="drop-shadow-md"
                  />

                  {/* Node Name/Abbreviation inside circle */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={isFocal ? '#ffffff' : '#f8fafc'}
                    fontSize={isFocal ? 13 : isDepth1 ? 11 : 9}
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    {node.technology.name.slice(0, isFocal ? 12 : isDepth1 ? 8 : 4)}
                  </text>

                  {/* Label underneath node */}
                  <text
                    y={radius + 14}
                    textAnchor="middle"
                    fill={isFocal ? '#a5b4fc' : '#cbd5e1'}
                    fontSize={isFocal ? 12 : 10}
                    fontWeight={isFocal || isSelected ? 'bold' : 'normal'}
                    className="pointer-events-none select-none drop-shadow-sm"
                  >
                    {node.technology.name}
                  </text>

                  {/* Layer Subtitle for Focal */}
                  {isFocal && (
                    <text
                      y={radius + 28}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize={9}
                      fontFamily="monospace"
                      className="pointer-events-none select-none"
                    >
                      {theme.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Center Badge */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 bg-slate-800/85 backdrop-blur-md rounded-xl border border-slate-700 text-xs text-slate-300 shadow-md">
        <Compass className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
        <span className="font-semibold text-white">{data.focalTechnology.name}</span>
        <span className="text-slate-400">·</span>
        <span className="text-[11px] font-mono text-slate-300">
          {data.summary.totalNeighbors} {t.graphExplorer.neighbors}
        </span>
      </div>
    </div>
  );
};
