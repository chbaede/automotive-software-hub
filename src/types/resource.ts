import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type ResourceCategory =
  | 'documentation'
  | 'tutorials'
  | 'standards'
  | 'cheat-sheets'
  | 'learning'
  | 'specifications';

export interface Resource {
  id: string;
  name: LocalizedText | string;
  description: LocalizedText;
  category: ResourceCategory;
  topics: TopicId[];
  url: string;
  source: string;
  language: 'en' | 'ko' | 'multi';
  official: boolean;
}

