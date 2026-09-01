import { LocalizedText } from './i18n';

export type RelationshipType =
  | 'depends-on'
  | 'runs-on'
  | 'implemented-by'
  | 'used-with'
  | 'integrates-with'
  | 'coexists-with'
  | 'alternative'
  | 'compatible-with'
  | 'related';

export type RelationshipConfidence = 'official' | 'vendor' | 'community';

export interface TechnologyRelationship {
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  description?: LocalizedText;
  sourceUrl?: string;
  lastVerified?: string;
  confidence?: RelationshipConfidence;
}

export interface RelationshipTypeMeta {
  type: RelationshipType;
  isSymmetric: boolean;
  label: LocalizedText;
  description: LocalizedText;
}

export const RELATIONSHIP_METADATA: Record<RelationshipType, RelationshipTypeMeta> = {
  'depends-on': {
    type: 'depends-on',
    isSymmetric: false,
    label: { en: 'Depends On', ko: '의존성 (Depends On)' },
    description: {
      en: 'Source technology requires or fundamentally relies on target technology to function.',
      ko: '소스 기술이 정상 동작을 위해 타겟 기술에 필수적으로 의존합니다.',
    },
  },
  'runs-on': {
    type: 'runs-on',
    isSymmetric: false,
    label: { en: 'Runs On', ko: '구동 환경 (Runs On)' },
    description: {
      en: 'Source technology executes on or is hosted by target hardware, hypervisor, or OS layer.',
      ko: '소스 기술이 타겟 하드웨어, 하이퍼바이저 또는 OS 레이어 상에서 구동됩니다.',
    },
  },
  'implemented-by': {
    type: 'implemented-by',
    isSymmetric: false,
    label: { en: 'Implemented By', ko: '구현체 (Implemented By)' },
    description: {
      en: 'Source standard specification or concept is realized by target software implementation.',
      ko: '소스 표준 규격/개념이 타겟 소프트웨어 구현체로 실체화됩니다.',
    },
  },
  'integrates-with': {
    type: 'integrates-with',
    isSymmetric: false,
    label: { en: 'Integrates With', ko: '인터페이스 연동 (Integrates With)' },
    description: {
      en: 'Technologies integrate directly through defined APIs, protocols, or bridge mechanisms.',
      ko: '정의된 API, 프로토콜 또는 브리지 메커니즘을 통해 상호 연동됩니다.',
    },
  },
  'coexists-with': {
    type: 'coexists-with',
    isSymmetric: true,
    label: { en: 'Coexists With', ko: '아키텍처 공존 (Coexists With)' },
    description: {
      en: 'Technologies are deployed together in vehicle architectures serving complementary roles.',
      ko: '동일 차량 아키텍처 내 서로 다른 도메인/ECU에서 상호 보완적으로 공존 구동됩니다.',
    },
  },
  'alternative': {
    type: 'alternative',
    isSymmetric: true,
    label: { en: 'Alternative To', ko: '대체 솔루션 (Alternative To)' },
    description: {
      en: 'Technologies serve as direct architectural alternatives for similar domain functions.',
      ko: '동일한 기술 도메인 역할에 대해 상호 대체 가능한 솔루션입니다.',
    },
  },
  'compatible-with': {
    type: 'compatible-with',
    isSymmetric: true,
    label: { en: 'Compatible With', ko: '호환성 검증 (Compatible With)' },
    description: {
      en: 'Verified technical compatibility without implying hard dependency or integration.',
      ko: '직접적 의존성 없이 기술적 상호 호환성이 검증된 관계입니다.',
    },
  },
  'used-with': {
    type: 'used-with',
    isSymmetric: false,
    label: { en: 'Used With', ko: '결합 활용 (Used With)' },
    description: {
      en: 'Technologies are commonly combined in developer workflows and production stacks.',
      ko: '실무 개발 환경 및 양산 스택에서 일반적으로 함께 자주 사용됩니다.',
    },
  },
  'related': {
    type: 'related',
    isSymmetric: true,
    label: { en: 'Related Tech', ko: '연관 기술 (Related)' },
    description: {
      en: 'Technologies share general domain context or ecosystem relationships.',
      ko: '일반적인 기술 도메인 및 생태계 관련성을 공유합니다.',
    },
  },
};
