import { LocalizedText } from './i18n';
import { StackLayerId } from './stack';
import { TopicId } from './taxonomy';

export interface ArchitectureProfile {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  technologyIds: string[];
  layerIds?: StackLayerId[];
  topics?: TopicId[];
  tags?: string[];
  icon?: string;
}
