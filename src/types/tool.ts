import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type ToolCategory = 'automotive' | 'embedded' | 'linux' | 'network' | 'general';

export type ToolStatus = 'available' | 'planned';

export interface Tool {
  id: string;
  name: LocalizedText | string;
  description: LocalizedText;
  category: ToolCategory;
  status: ToolStatus;
  topics: TopicId[];
  tags: string[];
  componentKey?: string; // Key mapping to interactive react component runner if available
}

