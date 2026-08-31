import { Language } from '../types/i18n';
import { getLocalizedText } from '../types/i18n';
import { GroupedSearchResults, SearchResultItem } from '../types/search';
import { tools } from '../data/tools';
import { resources } from '../data/resources';
import { projects } from '../data/projects';
import { events } from '../data/events';
import { companies } from '../data/companies';

export function performGlobalSearch(query: string, lang: Language): GroupedSearchResults {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return { tools: [], resources: [], projects: [], events: [], companies: [] };
  }

  const matchText = (text: string) => text.toLowerCase().includes(cleanQuery);

  // Search Tools
  const matchedTools: SearchResultItem[] = tools
    .filter((t) => {
      const name = getLocalizedText(t.name, lang);
      const desc = getLocalizedText(t.description, lang);
      return (
        matchText(name) ||
        matchText(desc) ||
        t.tags.some(matchText) ||
        t.topics.some(matchText)
      );
    })
    .map((t) => ({
      id: t.id,
      type: 'tool',
      title: getLocalizedText(t.name, lang),
      description: getLocalizedText(t.description, lang),
      route: `/tools?id=${t.id}`,
      topics: t.topics,
      badgeText: t.status === 'available' ? 'Interactive Tool' : 'Planned',
      rawItem: t,
    }));

  // Search Resources
  const matchedResources: SearchResultItem[] = resources
    .filter((r) => {
      const name = getLocalizedText(r.name, lang);
      const desc = getLocalizedText(r.description, lang);
      return (
        matchText(name) ||
        matchText(desc) ||
        matchText(r.source) ||
        r.topics.some(matchText)
      );
    })
    .map((r) => ({
      id: r.id,
      type: 'resource',
      title: getLocalizedText(r.name, lang),
      description: getLocalizedText(r.description, lang),
      url: r.url,
      route: `/resources?topic=${r.topics[0] || ''}`,
      topics: r.topics,
      badgeText: r.official ? 'Official' : r.source,
      rawItem: r,
    }));

  // Search Open Source Projects
  const matchedProjects: SearchResultItem[] = projects
    .filter((p) => {
      const desc = getLocalizedText(p.description, lang);
      return (
        matchText(p.name) ||
        matchText(desc) ||
        matchText(p.organization) ||
        p.tags.some(matchText) ||
        p.topics.some(matchText)
      );
    })
    .map((p) => ({
      id: p.id,
      type: 'project',
      title: p.name,
      description: getLocalizedText(p.description, lang),
      url: p.website,
      route: `/open-source?id=${p.id}`,
      topics: p.topics,
      badgeText: p.organization,
      rawItem: p,
    }));

  // Search Events
  const matchedEvents: SearchResultItem[] = events
    .filter((e) => {
      const name = getLocalizedText(e.name, lang);
      const desc = getLocalizedText(e.description, lang);
      return (
        matchText(name) ||
        matchText(desc) ||
        (e.city && matchText(e.city)) ||
        (e.country && matchText(e.country)) ||
        e.topics.some(matchText)
      );
    })
    .map((e) => ({
      id: e.id,
      type: 'event',
      title: getLocalizedText(e.name, lang),
      description: getLocalizedText(e.description, lang),
      url: e.url,
      route: `/events?id=${e.id}`,
      topics: e.topics,
      badgeText: `${e.startDate} (${e.city || 'Online'})`,
      rawItem: e,
    }));

  // Search Companies
  const matchedCompanies: SearchResultItem[] = companies
    .filter((c) => {
      const desc = getLocalizedText(c.description, lang);
      return (
        matchText(c.name) ||
        matchText(desc) ||
        matchText(c.headquarters) ||
        (c.ticker && matchText(c.ticker)) ||
        c.technologies.some(matchText) ||
        c.automotiveTopics.some(matchText)
      );
    })
    .map((c) => ({
      id: c.id,
      type: 'company',
      title: c.name,
      description: getLocalizedText(c.description, lang),
      url: c.website,
      route: `/companies?id=${c.id}`,
      topics: c.automotiveTopics,
      badgeText: c.category.toUpperCase(),
      rawItem: c,
    }));

  return {
    tools: matchedTools,
    resources: matchedResources,
    projects: matchedProjects,
    events: matchedEvents,
    companies: matchedCompanies,
  };
}

