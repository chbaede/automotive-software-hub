import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type StackLayerId =
  | 'hardware-compute'
  | 'hypervisor-virtualization'
  | 'operating-systems'
  | 'build-platform'
  | 'middleware-communication'
  | 'vehicle-services'
  | 'application-experience'
  | 'cloud-devops'
  | 'development-testing'
  | 'process-compliance-security';

export type StackLayerType = 'core' | 'cross-cutting';

export type LayerColorTheme =
  | 'purple'
  | 'emerald'
  | 'indigo'
  | 'sky'
  | 'amber'
  | 'slate'
  | 'rose'
  | 'teal'
  | 'violet';

export interface StackLayer {
  id: StackLayerId;
  name: LocalizedText;
  description: LocalizedText;
  order: number;
  layerType: StackLayerType;
  colorTheme: LayerColorTheme;
}

export type SafetyAsilLevel = 'ASIL-A' | 'ASIL-B' | 'ASIL-C' | 'ASIL-D';

export type SafetyClaimType =
  | 'certified'
  | 'qualified'
  | 'compliant'
  | 'capable'
  | 'supports'
  | 'suitable';

export interface FunctionalSafetyInfo {
  asilLevel?: SafetyAsilLevel;
  claimType?: SafetyClaimType;
  standard?: string; // e.g. 'ISO 26262'
  sourceUrl?: string;
  lastVerified?: string;
}

export interface TechnologyEvidence {
  sourceUrl: string;
  lastVerified?: string;
  confidence?: 'official' | 'vendor' | 'community';
}

export interface StackTechnology {
  id: string;
  name: string;
  layerId: StackLayerId;
  description: LocalizedText;
  whereDoesItFit: LocalizedText;
  categories: string[];
  topics: TopicId[];
  website?: string;
  documentationUrl?: string;
  repositoryUrl?: string;
  sourceUrl?: string;
  lastVerified?: string;
  confidence?: 'official' | 'vendor' | 'community';
  status?: 'active' | 'deprecated' | 'emerging';
  evidence?: TechnologyEvidence;
  openSourceProjectIds?: string[];
  companyIds?: string[];
  toolIds?: string[];
  resourceIds?: string[];
  eventIds?: string[];
  relatedTechnologyIds?: string[];
  licenseType?: 'oss' | 'commercial';
  asilLevel?: SafetyAsilLevel;
  functionalSafety?: FunctionalSafetyInfo;
  tags?: string[];
}
