import { LocalizedText } from './i18n';
import { TopicId } from './taxonomy';

export type EventFormat = 'conference' | 'meetup' | 'webinar' | 'workshop' | 'exhibition';

export type CfpStatus = 'open' | 'closed' | 'upcoming' | 'none';

export type EventRegion = 'europe' | 'north-america' | 'asia-pacific' | 'online' | 'global';

export interface Event {
  id: string;
  name: LocalizedText | string;
  description: LocalizedText;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  city?: string;
  country?: string;
  region: EventRegion;
  venue?: string;
  url: string;
  categories: string[];
  topics: TopicId[];
  format: EventFormat;
  cfpStatus?: CfpStatus;
  cfpDeadline?: string;
  registrationStatus?: 'open' | 'closed' | 'upcoming';
}

