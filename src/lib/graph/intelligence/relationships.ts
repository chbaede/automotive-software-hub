/**
 * Directed Relationship Selectors for Knowledge Graph Intelligence
 *
 * Implements pure, deterministic selectors enforcing strict semantic direction:
 * - Dependencies (outgoing depends-on)
 * - Dependents (incoming depends-on)
 * - Platforms (outgoing runs-on)
 * - Hosted Software (incoming runs-on)
 * - Direct Integrations (integrates-with, preserves direction)
 * - Specification Implementations (implemented-by)
 * - Architectural Alternatives (alternative, perspective-corrected wording)
 * - Compatible With (compatible-with)
 * - Coexists With (coexists-with)
 * - Used With (used-with)
 * - Related (related)
 */

import { StackTechnology } from '../../../types/stack';
import { TechnologyRelationship } from '../../../types/relationship';
import { LocalizedText } from '../../../types/i18n';
import {
  technologyById,
  outgoingRelationshipsByTechnologyId,
  incomingRelationshipsByTechnologyId,
  graphAdjacencyByTechnologyId,
} from '../index';
import { calculateRelationshipScore } from '../scoring';
import { TechnologyInsightItem } from './types';

function formatInsightItem(
  rel: TechnologyRelationship,
  isOutgoing: boolean,
  otherTech: StackTechnology,
  reason: LocalizedText
): TechnologyInsightItem {
  const score = calculateRelationshipScore(rel.type, rel.confidence || 'community');

  return {
    technology: otherTech,
    relationship: rel,
    isOutgoing,
    confidence: rel.confidence || 'community',
    score,
    reason,
  };
}

/**
 * Returns technologies that this technology fundamentally depends on (outgoing 'depends-on').
 */
export function getDependencies(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  outgoing.forEach((rel) => {
    if (rel.type === 'depends-on') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Required dependency for ${currentTech.name}`,
            ko: `${currentTech.name} 동작을 위한 필수 의존성`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns technologies that depend on this technology (incoming 'depends-on').
 */
export function getDependents(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  incoming.forEach((rel) => {
    if (rel.type === 'depends-on') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `${source.name} fundamentally depends on ${currentTech.name}`,
            ko: `${source.name}이(가) ${currentTech.name}에 의존하여 동작`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns hardware, hypervisor, or OS platforms that this technology executes on (outgoing 'runs-on').
 */
export function getPlatforms(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  outgoing.forEach((rel) => {
    if (rel.type === 'runs-on') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Underlying execution platform / runtime host for ${currentTech.name}`,
            ko: `${currentTech.name}의 구동 환경 및 기반 실행 플랫폼`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns software technologies that execute on top of this platform/OS (incoming 'runs-on').
 */
export function getHostedTechnologies(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  incoming.forEach((rel) => {
    if (rel.type === 'runs-on') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `${source.name} executes on top of ${currentTech.name}`,
            ko: `${source.name}이(가) ${currentTech.name} 상에서 구동됨`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns direct API/middleware integrations (outgoing and incoming 'integrates-with', preserving isOutgoing).
 */
export function getIntegrations(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  outgoing.forEach((rel) => {
    if (rel.type === 'integrates-with' && !seenIds.has(rel.targetId)) {
      seenIds.add(rel.targetId);
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Directly integrates with ${target.name}`,
            ko: `${target.name}와(과) 직접 인터페이스 연동`,
          })
        );
      }
    }
  });

  incoming.forEach((rel) => {
    if (rel.type === 'integrates-with' && !seenIds.has(rel.sourceId)) {
      seenIds.add(rel.sourceId);
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `Directly integrates with ${source.name}`,
            ko: `${source.name}와(과) 직접 인터페이스 연동`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns specification implementations or realized standards ('implemented-by').
 */
export function getImplementations(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];

  // If this tech is a standard/spec implemented by target
  outgoing.forEach((rel) => {
    if (rel.type === 'implemented-by') {
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `${target.name} implements specification ${currentTech.name}`,
            ko: `${target.name} 구현체에 의해 ${currentTech.name} 규격 실체화`,
          })
        );
      }
    }
  });

  // If this tech is an implementation realizing source specification
  incoming.forEach((rel) => {
    if (rel.type === 'implemented-by') {
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `${currentTech.name} realizes specification of ${source.name}`,
            ko: `${currentTech.name}은(는) ${source.name} 표준 규격의 구현체`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns direct architectural alternatives ('alternative').
 * Ensured perspective-corrected semantic wording: "${neighbor.name} is an architectural alternative to ${currentTech.name}".
 */
export function getAlternatives(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'alternative' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `${neighbor.name} is an architectural alternative to ${currentTech.name}`,
            ko: `${neighbor.name}은(는) ${currentTech.name}의 아키텍처 대안 솔루션`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns compatible technologies ('compatible-with').
 */
export function getCompatibleTechnologies(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'compatible-with' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `Verified technical compatibility with ${neighbor.name}`,
            ko: `${neighbor.name}와(과) 기술적 호환성 검증`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns coexisting technologies in multi-ECU/domain vehicle architectures ('coexists-with').
 */
export function getCoexistingTechnologies(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const edges = graphAdjacencyByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.relationship.type === 'coexists-with' && !seenIds.has(edge.neighborId)) {
      seenIds.add(edge.neighborId);
      const neighbor = technologyById.get(edge.neighborId);
      if (neighbor) {
        results.push(
          formatInsightItem(edge.relationship, edge.isForward, neighbor, {
            en: `Coexists in complementary vehicle ECU domains with ${neighbor.name}`,
            ko: `차량 내 이종 제어기 도메인에서 ${neighbor.name}와(과) 상호 보완적 공존`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

/**
 * Returns technologies commonly used with this technology ('used-with').
 */
export function getUsedWithTechnologies(technologyId: string): TechnologyInsightItem[] {
  const currentTech = technologyById.get(technologyId);
  if (!currentTech) return [];

  const outgoing = outgoingRelationshipsByTechnologyId.get(technologyId) || [];
  const incoming = incomingRelationshipsByTechnologyId.get(technologyId) || [];
  const results: TechnologyInsightItem[] = [];
  const seenIds = new Set<string>();

  outgoing.forEach((rel) => {
    if (rel.type === 'used-with' && !seenIds.has(rel.targetId)) {
      seenIds.add(rel.targetId);
      const target = technologyById.get(rel.targetId);
      if (target) {
        results.push(
          formatInsightItem(rel, true, target, {
            en: `Commonly combined with ${target.name}`,
            ko: `${target.name}와(과) 통상 결합 활용`,
          })
        );
      }
    }
  });

  incoming.forEach((rel) => {
    if (rel.type === 'used-with' && !seenIds.has(rel.sourceId)) {
      seenIds.add(rel.sourceId);
      const source = technologyById.get(rel.sourceId);
      if (source) {
        results.push(
          formatInsightItem(rel, false, source, {
            en: `Commonly combined with ${source.name}`,
            ko: `${source.name}와(과) 통상 결합 활용`,
          })
        );
      }
    }
  });

  return results.sort(
    (a, b) =>
      b.score - a.score ||
      a.technology.name.localeCompare(b.technology.name) ||
      a.technology.id.localeCompare(b.technology.id)
  );
}

