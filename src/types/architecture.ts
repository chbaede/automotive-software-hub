import { LocalizedText } from './i18n';
import { StackLayerId } from './stack';
import { TopicId } from './taxonomy';

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

export type StackPathType =
  | 'runtime-stack'
  | 'communication-flow'
  | 'diagnostic-flow'
  | 'data-flow'
  | 'development-validation'
  | 'reference-architecture';

export interface StackPathTypeMeta {
  type: StackPathType;
  label: LocalizedText;
  description: LocalizedText;
}

export const STACK_PATH_TYPE_METADATA: Record<StackPathType, StackPathTypeMeta> = {
  'runtime-stack': {
    type: 'runtime-stack',
    label: { en: 'Runtime Stack', ko: '런타임 실행 스택' },
    description: {
      en: 'Execution hierarchy from hardware silicon to guest OS and application framework.',
      ko: '하드웨어 실리콘부터 게스트 OS 및 애플리케이션 프레임워크로 이어지는 런타임 계층.',
    },
  },
  'communication-flow': {
    type: 'communication-flow',
    label: { en: 'Communication Flow', ko: '통신 프로토콜 흐름' },
    description: {
      en: 'Service messaging and bus communication transport sequence.',
      ko: '서비스 메시징 및 버스 통신 프로토콜 전송 경로.',
    },
  },
  'diagnostic-flow': {
    type: 'diagnostic-flow',
    label: { en: 'Diagnostic Flow', ko: '차량 진단 통신 흐름' },
    description: {
      en: 'Diagnostic communication and firmware programming sequence (DoIP, UDS).',
      ko: '진단 통신 및 펌웨어 프로그래밍 전송 경로 (DoIP, UDS).',
    },
  },
  'data-flow': {
    type: 'data-flow',
    label: { en: 'Data Model & Signal Flow', ko: '데이터 모델 및 신호 흐름' },
    description: {
      en: 'Vehicle signal tree, telemetry encoding, and cloud messaging abstraction.',
      ko: '차량 신호 트리, 텔레매틱스 인코딩 및 클라우드 메시징 추상화.',
    },
  },
  'development-validation': {
    type: 'development-validation',
    label: { en: 'Validation & Simulation Journey', ko: '검증 및 시뮬레이션 환경' },
    description: {
      en: 'Software-in-the-Loop (SIL) simulation, virtual testing, and development environment.',
      ko: '가상 시뮬레이션(SIL), 시험 및 개발 검증 환경.',
    },
  },
  'reference-architecture': {
    type: 'reference-architecture',
    label: { en: 'Reference Architecture', ko: '대표 아키텍처 레퍼런스' },
    description: {
      en: 'Representative ecosystem combination of hardware, OS, orchestrator, and cloud services.',
      ko: '하드웨어, OS, 오케스트레이터 및 클라우드 서비스의 대표적인 생태계 아키텍처 조합.',
    },
  },
};

export interface StackPathHop {
  technologyId: string;
  note?: LocalizedText;
}

export interface StackPath {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  pathType?: StackPathType;
  architectureProfileId?: string;
  hops: StackPathHop[];
  topics?: TopicId[];
  lastVerified?: string;
}
