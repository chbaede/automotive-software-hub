import { LocalizedText } from './i18n';
import { StackLayerId } from './stack';
import { TopicId } from './taxonomy';
import { RelationshipType } from './relationship';

export type ArchitectureProfileType =
  | 'vehicle-architecture'
  | 'domain-architecture'
  | 'platform'
  | 'design-pattern'
  | 'reference-stack';

export interface ArchitectureProfileTypeMeta {
  type: ArchitectureProfileType;
  label: LocalizedText;
  description: LocalizedText;
}

export const ARCHITECTURE_PROFILE_TYPE_METADATA: Record<
  ArchitectureProfileType,
  ArchitectureProfileTypeMeta
> = {
  'vehicle-architecture': {
    type: 'vehicle-architecture',
    label: { en: 'Vehicle Architecture', ko: '차량 E/E 아키텍처' },
    description: {
      en: 'Vehicle-wide electrical/electronic infrastructure and computing topology.',
      ko: '전 차량 레벨의 전기/전자 및 컴퓨팅 토폴로지 구조.',
    },
  },
  'domain-architecture': {
    type: 'domain-architecture',
    label: { en: 'Domain Architecture', ko: '도메인 아키텍처' },
    description: {
      en: 'Domain-specific functional controller architecture (e.g. Infotainment, Cockpit).',
      ko: '특정 차량 기능 도메인(콕핏, 인포테인먼트 등) 전용 컨트롤러 구조.',
    },
  },
  platform: {
    type: 'platform',
    label: { en: 'Platform Stack', ko: '플랫폼 미들웨어 스택' },
    description: {
      en: 'Comprehensive software platform and operating runtime for vehicle applications.',
      ko: '차량 애플리케이션 및 서비스를 구동하는 종합 런타임 플랫폼.',
    },
  },
  'design-pattern': {
    type: 'design-pattern',
    label: { en: 'Architectural Pattern', ko: '아키텍처 디자인 패턴' },
    description: {
      en: 'System engineering design pattern (e.g. Mixed-Criticality, Virtualization).',
      ko: '시스템 엔지니어링 설계 패턴 (이종 안전도 분리, 가상화 등).',
    },
  },
  'reference-stack': {
    type: 'reference-stack',
    label: { en: 'Reference Stack', ko: '엔드투엔드 레퍼런스 스택' },
    description: {
      en: 'End-to-end industry reference software stack (e.g. SDV Platform, ADAS/AD Stack).',
      ko: '산업계 표준 엔드투엔드 소프트웨어 레퍼런스 스택.',
    },
  },
};

export interface ArchitectureProfile {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  profileType?: ArchitectureProfileType;
  technologyIds: string[];
  layerIds?: StackLayerId[];
  topics?: TopicId[];
  tags?: string[];
  icon?: string;
}

export interface StackPathHop {
  technologyId: string;
  relationshipToNext?: RelationshipType;
  note?: LocalizedText;
}

export interface StackPath {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  architectureProfileId?: string;
  hops: StackPathHop[];
  topics?: TopicId[];
}
