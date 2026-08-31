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
  | 'development-testing';

export type StackLayerType = 'core' | 'cross-cutting';

export interface StackLayer {
  id: StackLayerId;
  name: LocalizedText;
  description: LocalizedText;
  order: number;
  layerType: StackLayerType;
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
  openSourceProjectIds?: string[];
  companyIds?: string[];
  toolIds?: string[];
  resourceIds?: string[];
  eventIds?: string[];
  relatedTechnologyIds?: string[];
  tags?: string[];
}
