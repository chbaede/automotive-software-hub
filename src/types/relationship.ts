import { LocalizedText } from './i18n';

export type RelationshipType =
  | 'depends-on'
  | 'runs-on'
  | 'implemented-by'
  | 'used-with'
  | 'alternative'
  | 'related';

export interface TechnologyRelationship {
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  description?: LocalizedText;
}

