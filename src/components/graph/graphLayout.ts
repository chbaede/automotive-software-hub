import {
  NeighborhoodGraphData,
  NeighborhoodGraphNode,
  NeighborhoodGraphEdge,
} from '../../lib/graph/neighborhood';

export interface NodePosition {
  x: number;
  y: number;
  angle: number;
  node: NeighborhoodGraphNode;
}

export interface EdgeWithCoords {
  edge: NeighborhoodGraphEdge;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sourcePos: NodePosition;
  targetPos: NodePosition;
}

export interface GraphLayoutResult {
  positions: NodePosition[];
  edgesWithCoords: EdgeWithCoords[];
}

/**
 * Computes deterministic radial orbit layout for focal, 1-hop, and 2-hop graph nodes.
 * Pure layout function without side-effects or React render coupling.
 */
export function computeGraphLayout(
  data: NeighborhoodGraphData,
  width: number,
  height: number,
  layerOrderMap: Map<string, number>
): GraphLayoutResult {
  const centerX = width / 2;
  const centerY = height / 2;
  const posMap = new Map<string, NodePosition>();

  // 1. Center Focal Node
  const focalNode = data.nodes.find((n) => n.distance === 0);
  if (focalNode) {
    posMap.set(focalNode.technology.id, {
      x: centerX,
      y: centerY,
      angle: 0,
      node: focalNode,
    });
  }

  // 2. 1-Hop Nodes (Sorted by layer order for clean physical clustering)
  const depth1Nodes = data.nodes
    .filter((n) => n.distance === 1)
    .sort((a, b) => {
      const orderA = layerOrderMap.get(a.layerId) ?? 99;
      const orderB = layerOrderMap.get(b.layerId) ?? 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.technology.name.localeCompare(b.technology.name);
    });

  const N1 = depth1Nodes.length;
  const R1 = N1 > 16 ? 250 : N1 > 8 ? 220 : 180;

  depth1Nodes.forEach((node, i) => {
    // Angle starting from top (-PI/2)
    const angle = (2 * Math.PI * i) / Math.max(1, N1) - Math.PI / 2;
    const x = centerX + R1 * Math.cos(angle);
    const y = centerY + R1 * Math.sin(angle);
    posMap.set(node.technology.id, { x, y, angle, node });
  });

  // 3. 2-Hop Nodes (Grouped around their 1-hop parent)
  const depth2Nodes = data.nodes.filter((n) => n.distance === 2);
  if (depth2Nodes.length > 0) {
    const parentMap = new Map<string, string>();
    data.edges.forEach((edge) => {
      if (edge.distance === 2) {
        if (posMap.has(edge.sourceId) && !posMap.has(edge.targetId)) {
          parentMap.set(edge.targetId, edge.sourceId);
        } else if (posMap.has(edge.targetId) && !posMap.has(edge.sourceId)) {
          parentMap.set(edge.sourceId, edge.targetId);
        }
      }
    });

    const R2 = R1 + 150;
    const groups = new Map<string, NeighborhoodGraphNode[]>();
    depth2Nodes.forEach((node) => {
      const pId = parentMap.get(node.technology.id) || depth1Nodes[0]?.technology.id;
      const list = groups.get(pId) || [];
      list.push(node);
      groups.set(pId, list);
    });

    groups.forEach((children, parentId) => {
      const parentPos = posMap.get(parentId);
      const baseAngle = parentPos ? parentPos.angle : 0;
      const childCount = children.length;
      const arcSpread = Math.min(Math.PI / 3, (childCount * Math.PI) / 12);

      children.forEach((child, idx) => {
        const offsetAngle =
          childCount === 1
            ? 0
            : -arcSpread / 2 + (idx * arcSpread) / (childCount - 1);
        const angle = baseAngle + offsetAngle;
        const x = centerX + R2 * Math.cos(angle);
        const y = centerY + R2 * Math.sin(angle);
        posMap.set(child.technology.id, { x, y, angle, node: child });
      });
    });
  }

  // Build Edges with Start and End Coordinates
  const edgesWithCoords: EdgeWithCoords[] = [];

  for (const edge of data.edges) {
    const sourcePos = posMap.get(edge.sourceId);
    const targetPos = posMap.get(edge.targetId);
    if (!sourcePos || !targetPos) continue;

    const dx = targetPos.x - sourcePos.x;
    const dy = targetPos.y - sourcePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) continue;

    const targetRadius =
      targetPos.node.distance === 0 ? 34 : targetPos.node.distance === 1 ? 24 : 16;
    const sourceRadius =
      sourcePos.node.distance === 0 ? 34 : sourcePos.node.distance === 1 ? 24 : 16;

    const ux = dx / dist;
    const uy = dy / dist;

    const x1 = sourcePos.x + ux * sourceRadius;
    const y1 = sourcePos.y + uy * sourceRadius;
    const x2 = targetPos.x - ux * targetRadius;
    const y2 = targetPos.y - uy * targetRadius;

    edgesWithCoords.push({
      edge,
      x1,
      y1,
      x2,
      y2,
      sourcePos,
      targetPos,
    });
  }

  return {
    positions: Array.from(posMap.values()),
    edgesWithCoords,
  };
}
