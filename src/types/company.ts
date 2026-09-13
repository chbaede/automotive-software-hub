import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type CompanyCategory =
  | 'oem'
  | 'tier1'
  | 'semiconductor'
  | 'software-platform'
  | 'cloud-tech'
  | 'korean-tech';

export type CompanyContinent =
  | 'north-america'
  | 'south-america'
  | 'europe'
  | 'asia'
  | 'africa'
  | 'oceania';

export interface Company {
  id: string;
  name: string;
  category: CompanyCategory;
  continent: CompanyContinent;
  description: LocalizedText;
  website: string | LocalizedText;
  headquarters: string;
  ticker?: string;
  exchange?: string;
  isPublic?: boolean;
  irUrl?: string | LocalizedText;
  hasStrategyInsight?: boolean;
  automotiveTopics: TopicId[];
  technologies: string[];
  tags: string[];
}
