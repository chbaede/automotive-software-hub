import { LocalizedText } from './i18n';

export type StrategyCategory = 'oem' | 'semiconductor' | 'tier1';

export interface StrategicTarget {
  year: string;
  milestone: LocalizedText;
}

export type StrategySourceType =
  | 'annual-report'
  | 'investor-presentation'
  | 'capital-markets-day'
  | 'shareholder-letter'
  | 'press-release'
  | 'official-event'
  | 'official-website';

export type StrategySourceRole =
  | 'latest'
  | 'primary'
  | 'historical'
  | 'supporting';

export interface StrategySource {
  title: LocalizedText;
  url: string;
  sourceType: StrategySourceType;
  role?: StrategySourceRole;
  publishedDate?: string; // YYYY-MM-DD
  lastVerified?: string;  // YYYY-MM-DD
  confidence?: 'official' | 'vendor' | 'community';
}

export interface CompanyStrategyMatrixSummary {
  sdvOs: LocalizedText;
  eeZonal: LocalizedText;
  evPlatform: LocalizedText;
}

export type EeArchitectureTopology =
  | 'distributed-domain'
  | 'central-domain'
  | 'central-zonal';

export type OsPlatformDepth =
  | 'commercial-ecosystem'
  | 'dual-track'
  | 'proprietary-fullstack';

export interface StrategicLandscapeClassification {
  eeTopology: EeArchitectureTopology;
  osDepth: OsPlatformDepth;
}

export interface StrategyTechnologyReference {
  technologyId: string;
  reason?: LocalizedText;
  sourceUrl?: string;
}

export interface CompanyStrategyInsight {
  companyId: string;
  companyName: string;
  category: StrategyCategory;
  headquarters: string;
  ticker?: string;
  exchange?: string;
  irUrl: string | LocalizedText;
  latestEventOrReport: LocalizedText;
  matrixSummary: CompanyStrategyMatrixSummary;
  strategicLandscape: StrategicLandscapeClassification;
  relatedTechnologies?: StrategyTechnologyReference[];
  relatedTechnologyIds?: string[];
  sdvArchitecture: LocalizedText;
  eeZonalArchitecture: LocalizedText;
  evPlatformStrategy: LocalizedText;
  autonomousDrivingAi: LocalizedText;
  softwareMonetization?: LocalizedText;
  strategicTargets: StrategicTarget[];
  sources: StrategySource[];
  keyCitations?: string[];
  lastVerified?: string;
}
