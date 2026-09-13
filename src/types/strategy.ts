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

export interface StrategySource {
  title: LocalizedText;
  url: string;
  sourceType: StrategySourceType;
  publishedDate?: string; // YYYY-MM-DD
  lastVerified?: string;  // YYYY-MM-DD
  confidence?: 'official' | 'vendor' | 'community';
}

export interface CompanyStrategyMatrixSummary {
  sdvOs: LocalizedText;
  eeZonal: LocalizedText;
  evPlatform: LocalizedText;
}

export interface CompanyStrategyInsight {
  companyId: string;
  companyName: string;
  category: StrategyCategory;
  headquarters: string;
  ticker?: string;
  exchange?: string;
  irUrl: string;
  latestEventOrReport: LocalizedText;
  matrixSummary: CompanyStrategyMatrixSummary;
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
