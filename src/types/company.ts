import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type CompanyCategory = 'oem' | 'tier1' | 'semiconductor' | 'software-platform' | 'cloud-tech';

export interface Company {
  id: string;
  name: string;
  category: CompanyCategory;
  description: LocalizedText;
  website: string;
  headquarters: string;
  ticker?: string;
  exchange?: string;
  isPublic?: boolean;
  automotiveTopics: TopicId[];
  technologies: string[];
  tags: string[];
}

