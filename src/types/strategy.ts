import { LocalizedText } from './i18n';

export type StrategyCategory = 'oem' | 'semiconductor' | 'tier1';

export interface StrategicTarget {
  year: string;
  milestone: LocalizedText;
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
  sdvArchitecture: LocalizedText;
  eeZonalArchitecture: LocalizedText;
  evPlatformStrategy: LocalizedText;
  autonomousDrivingAi: LocalizedText;
  softwareMonetization?: LocalizedText;
  strategicTargets: StrategicTarget[];
  keyCitations: string[];
}

