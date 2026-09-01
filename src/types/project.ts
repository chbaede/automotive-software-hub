import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type ProjectCategory =
  | 'autosar'
  | 'agl'
  | 'eclipse-sdv'
  | 'covesa'
  | 'yocto'
  | 'ros'
  | 'linux-kernel'
  | 'android-automotive';

export interface OpenSourceProject {
  id: string;
  name: string;
  description: LocalizedText;
  category: ProjectCategory;
  topics: TopicId[];
  website: string;
  repository?: string;
  organization: string;
  languages?: string[];
  license?: string;
  tags: string[];
}

