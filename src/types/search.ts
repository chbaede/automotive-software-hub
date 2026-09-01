import { Tool } from './tool';
import { Resource } from './resource';
import { OpenSourceProject } from './project';
import { Event } from './event';
import { Company } from './company';
import { StackTechnology } from './stack';
import { ArchitectureProfile } from './architecture';

export type SearchResultType =
  | 'tool'
  | 'resource'
  | 'project'
  | 'event'
  | 'company'
  | 'tech'
  | 'architecture';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url?: string;
  route: string;
  topics?: string[];
  categoryName?: string;
  badgeText?: string;
  rawItem: Tool | Resource | OpenSourceProject | Event | Company | StackTechnology | ArchitectureProfile;
}

export interface GroupedSearchResults {
  architectures: SearchResultItem[];
  technologies: SearchResultItem[];
  tools: SearchResultItem[];
  resources: SearchResultItem[];
  projects: SearchResultItem[];
  events: SearchResultItem[];
  companies: SearchResultItem[];
}
