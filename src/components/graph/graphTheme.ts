import { RelationshipType, RelationshipConfidence } from '../../types/relationship';

export interface LayerVisualTheme {
  id: string;
  name: string;
  color: string; // primary hex
  fillLight: string;
  fillDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
}

export const LAYER_THEMES: Record<string, LayerVisualTheme> = {
  'hardware-compute': {
    id: 'hardware-compute',
    name: 'Hardware & Compute',
    color: '#64748b', // slate
    fillLight: '#f8fafc',
    fillDark: '#0f172a',
    borderLight: '#94a3b8',
    borderDark: '#334155',
    textLight: '#1e293b',
    textDark: '#f1f5f9',
  },
  'hypervisor-virtualization': {
    id: 'hypervisor-virtualization',
    name: 'Hypervisor & Virtualization',
    color: '#f59e0b', // amber
    fillLight: '#fffbeb',
    fillDark: '#1c1917',
    borderLight: '#fcd34d',
    borderDark: '#78350f',
    textLight: '#78350f',
    textDark: '#fef3c7',
  },
  'operating-systems': {
    id: 'operating-systems',
    name: 'Operating Systems',
    color: '#0284c7', // sky
    fillLight: '#f0f9ff',
    fillDark: '#082f49',
    borderLight: '#7dd3fc',
    borderDark: '#0369a1',
    textLight: '#075985',
    textDark: '#e0f2fe',
  },
  'vehicle-services': {
    id: 'vehicle-services',
    name: 'Vehicle Services & Networks',
    color: '#10b981', // emerald
    fillLight: '#ecfdf5',
    fillDark: '#022c22',
    borderLight: '#6ee7b7',
    borderDark: '#047857',
    textLight: '#065f46',
    textDark: '#d1fae5',
  },
  'middleware-communication': {
    id: 'middleware-communication',
    name: 'Middleware & Platforms',
    color: '#6366f1', // indigo
    fillLight: '#eef2ff',
    fillDark: '#1e1b4b',
    borderLight: '#a5b4fc',
    borderDark: '#4338ca',
    textLight: '#3730a3',
    textDark: '#e0e7ff',
  },
  'cloud-devops': {
    id: 'cloud-devops',
    name: 'Cloud, OTA & DevOps',
    color: '#8b5cf6', // purple
    fillLight: '#f5f3ff',
    fillDark: '#2e1065',
    borderLight: '#c4b5fd',
    borderDark: '#6d28d9',
    textLight: '#5b21b6',
    textDark: '#ede9fe',
  },
  'application-frameworks': {
    id: 'application-frameworks',
    name: 'Applications & UI',
    color: '#ec4899', // pink/rose
    fillLight: '#fdf2f8',
    fillDark: '#4c0519',
    borderLight: '#fbcfe8',
    borderDark: '#be185d',
    textLight: '#9d174d',
    textDark: '#fce7f3',
  },
  'standards-security': {
    id: 'standards-security',
    name: 'Safety & Security',
    color: '#14b8a6', // teal
    fillLight: '#f0fdfa',
    fillDark: '#042f2e',
    borderLight: '#99f6e4',
    borderDark: '#0f766e',
    textLight: '#115e59',
    textDark: '#ccfbf1',
  },
  'tooling-diagnostics': {
    id: 'tooling-diagnostics',
    name: 'Diagnostics & Tooling',
    color: '#f97316', // orange
    fillLight: '#fff7ed',
    fillDark: '#431407',
    borderLight: '#fdba74',
    borderDark: '#c2410c',
    textLight: '#9a3412',
    textDark: '#ffedd5',
  },
};

export const DEFAULT_LAYER_THEME: LayerVisualTheme = {
  id: 'unknown',
  name: 'Technology',
  color: '#3b82f6',
  fillLight: '#eff6ff',
  fillDark: '#172554',
  borderLight: '#bfdbfe',
  borderDark: '#1d4ed8',
  textLight: '#1e40af',
  textDark: '#dbeafe',
};

export interface RelationshipVisualConfig {
  type: RelationshipType;
  color: string;
  dashArray?: string;
  isSymmetric: boolean;
  label: { en: string; ko: string };
}

export const RELATIONSHIP_VISUALS: Record<RelationshipType, RelationshipVisualConfig> = {
  'depends-on': {
    type: 'depends-on',
    color: '#f59e0b', // amber
    isSymmetric: false,
    label: { en: 'Depends On', ko: '의존성' },
  },
  'runs-on': {
    type: 'runs-on',
    color: '#3b82f6', // blue
    isSymmetric: false,
    label: { en: 'Runs On', ko: '구동 환경' },
  },
  'implemented-by': {
    type: 'implemented-by',
    color: '#06b6d4', // cyan
    isSymmetric: false,
    label: { en: 'Implemented By', ko: '구현체' },
  },
  'integrates-with': {
    type: 'integrates-with',
    color: '#8b5cf6', // purple
    isSymmetric: false,
    label: { en: 'Integrates With', ko: '인터페이스 연동' },
  },
  'alternative': {
    type: 'alternative',
    color: '#10b981', // emerald
    dashArray: '5,4',
    isSymmetric: true,
    label: { en: 'Alternative To', ko: '대체 솔루션' },
  },
  'compatible-with': {
    type: 'compatible-with',
    color: '#14b8a6', // teal
    dashArray: '4,3',
    isSymmetric: true,
    label: { en: 'Compatible With', ko: '호환성 검증' },
  },
  'coexists-with': {
    type: 'coexists-with',
    color: '#64748b', // slate
    dashArray: '3,3',
    isSymmetric: true,
    label: { en: 'Coexists With', ko: '아키텍처 공존' },
  },
  'used-with': {
    type: 'used-with',
    color: '#f43f5e', // rose
    isSymmetric: false,
    label: { en: 'Used With', ko: '결합 활용' },
  },
  'related': {
    type: 'related',
    color: '#94a3b8', // gray
    dashArray: '2,2',
    isSymmetric: false,
    label: { en: 'Related', ko: '연계 기술' },
  },
};

export function getLayerTheme(layerId: string): LayerVisualTheme {
  return LAYER_THEMES[layerId] || DEFAULT_LAYER_THEME;
}

export function getRelationshipVisual(type: RelationshipType): RelationshipVisualConfig {
  return RELATIONSHIP_VISUALS[type] || RELATIONSHIP_VISUALS['related'];
}

export const CONFIDENCE_BADGES: Record<
  RelationshipConfidence,
  { label: { en: string; ko: string }; colorClass: string }
> = {
  official: {
    label: { en: 'Official Doc', ko: '공식 문서 인증' },
    colorClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  },
  vendor: {
    label: { en: 'Vendor Spec', ko: '벤더 공식 사양' },
    colorClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800',
  },
  community: {
    label: { en: 'Community Verified', ko: '커뮤니티 검증' },
    colorClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
  },
};
