import { companies } from '../../data/companies';
import { companyStrategies } from '../../data/companyStrategies';
import { stackLayers } from '../../data/stackLayers';
import { stackTechnologies } from '../../data/stackTechnologies';
import { architectureProfiles } from '../../data/architectureProfiles';
import { tools } from '../../data/tools';
import { resources } from '../../data/resources';
import { projects } from '../../data/projects';
import { events } from '../../data/events';
import { Company, CompanyContinent, COMPANY_CONTINENT_ORDER } from '../../types/company';
export { COMPANY_CONTINENT_ORDER };
import {
  CompanyStrategyInsight,
  StrategyCategory,
  EeArchitectureTopology,
  OsPlatformDepth,
  StrategicLandscapeClassification,
  StrategyTechnologyReference,
  StrategyEvidenceLevel,
} from '../../types/strategy';
export type {
  EeArchitectureTopology,
  OsPlatformDepth,
  StrategicLandscapeClassification,
  StrategyTechnologyReference,
  StrategyEvidenceLevel,
};
import { LocalizedText } from '../../types/i18n';
import { StackLayer, StackTechnology } from '../../types/stack';
import { ArchitectureProfile } from '../../types/architecture';
import { Tool } from '../../types/tool';
import { Resource } from '../../types/resource';
import { OpenSourceProject } from '../../types/project';
import { Event } from '../../types/event';

// ==========================================
// CANONICAL DOMAIN INDEXES (O(1) Map Lookups)
// ==========================================

export const technologyById = new Map<string, StackTechnology>(
  stackTechnologies.map((tech) => [tech.id, tech])
);

export const architectureProfileById = new Map<string, ArchitectureProfile>(
  architectureProfiles.map((prof) => [prof.id, prof])
);

// Canonical alias for backwards compatibility
export const profileById = architectureProfileById;

export const companyById = new Map<string, Company>(
  companies.map((c) => [c.id, c])
);

export const strategyByCompanyId = new Map<string, CompanyStrategyInsight>(
  companyStrategies.map((cs) => [cs.companyId, cs])
);

export const layerById = new Map<string, StackLayer>(
  stackLayers.map((layer) => [layer.id, layer])
);

// Canonical alias for backwards compatibility
export const stackLayerById = layerById;

export const toolById = new Map<string, Tool>(
  tools.map((tool) => [tool.id, tool])
);

export const resourceById = new Map<string, Resource>(
  resources.map((res) => [res.id, res])
);

export const projectById = new Map<string, OpenSourceProject>(
  projects.map((proj) => [proj.id, proj])
);

export const eventById = new Map<string, Event>(
  events.map((event) => [event.id, event])
);

// Inverted Index: Stack Technologies by Linked Open Source Project ID
export const technologiesByProjectId = new Map<string, StackTechnology[]>();
stackTechnologies.forEach((tech) => {
  if (tech.openSourceProjectIds) {
    tech.openSourceProjectIds.forEach((pId) => {
      const list = technologiesByProjectId.get(pId) || [];
      if (!list.some((t) => t.id === tech.id)) {
        list.push(tech);
      }
      technologiesByProjectId.set(pId, list);
    });
  }
});

// Inverted Index: Stack Technologies by Linked Company ID
export const technologiesByCompanyId = new Map<string, StackTechnology[]>();
stackTechnologies.forEach((tech) => {
  if (tech.companyIds) {
    tech.companyIds.forEach((cId) => {
      const list = technologiesByCompanyId.get(cId) || [];
      list.push(tech);
      technologiesByCompanyId.set(cId, list);
    });
  }
});

// Inverted Index: Companies by Continent
export const companiesByContinent = new Map<CompanyContinent, Company[]>();
companies.forEach((company) => {
  const list = companiesByContinent.get(company.continent) || [];
  list.push(company);
  companiesByContinent.set(company.continent, list);
});

// ==========================================
// CANONICAL DOMAIN SELECTORS / HELPERS
// ==========================================

/**
 * Resolves a Technology by its canonical ID.
 */
export function getTechnology(id: string): StackTechnology | undefined {
  return technologyById.get(id);
}

/**
 * Resolves an Architecture Profile by its canonical ID.
 */
export function getArchitectureProfile(id: string): ArchitectureProfile | undefined {
  return architectureProfileById.get(id);
}

/**
 * Resolves a Company by its canonical ID.
 */
export function getCompany(id: string): Company | undefined {
  return companyById.get(id);
}

/**
 * Resolves companies filtered by continent.
 * If continent is undefined, returns all companies.
 */
export function getCompaniesByContinent(continent?: CompanyContinent): Company[] {
  if (!continent) return companies;
  return companiesByContinent.get(continent) || [];
}

/**
 * Resolves Strategy Intelligence for a company by its ID.
 */
export function getCompanyStrategy(companyId: string): CompanyStrategyInsight | undefined {
  return strategyByCompanyId.get(companyId);
}

/**
 * Resolves a Stack Layer by its layer ID.
 */
export function getStackLayer(layerId: string): StackLayer | undefined {
  return layerById.get(layerId);
}

/**
 * Resolves a developer Tool by its ID.
 */
export function getTool(id: string): Tool | undefined {
  return toolById.get(id);
}

/**
 * Resolves a Resource specification/document by its ID.
 */
export function getResource(id: string): Resource | undefined {
  return resourceById.get(id);
}

/**
 * Resolves an Open Source Project by its ID.
 */
export function getProject(id: string): OpenSourceProject | undefined {
  return projectById.get(id);
}

/**
 * Resolves an Industry Event by its ID.
 */
export function getEvent(id: string): Event | undefined {
  return eventById.get(id);
}

// ==========================================
// TECHNOLOGY ECOSYSTEM RESOLUTION HELPERS
// ==========================================

/**
 * Resolves all tools linked to a technology.
 */
export function getToolsForTechnology(tech?: StackTechnology | null): Tool[] {
  if (!tech?.toolIds || tech.toolIds.length === 0) return [];
  return tech.toolIds
    .map((id) => toolById.get(id))
    .filter((t): t is Tool => Boolean(t));
}

/**
 * Resolves all resources linked to a technology.
 */
export function getResourcesForTechnology(tech?: StackTechnology | null): Resource[] {
  if (!tech?.resourceIds || tech.resourceIds.length === 0) return [];
  return tech.resourceIds
    .map((id) => resourceById.get(id))
    .filter((r): r is Resource => Boolean(r));
}

/**
 * Resolves all open source projects linked to a technology.
 * Uses canonical explicit relationships (openSourceProjectIds).
 */
export function getProjectsForTechnology(tech?: StackTechnology | null): OpenSourceProject[] {
  if (!tech?.openSourceProjectIds || tech.openSourceProjectIds.length === 0) return [];
  return tech.openSourceProjectIds
    .map((id) => projectById.get(id))
    .filter((p): p is OpenSourceProject => Boolean(p));
}

/**
 * Resolves all stack technologies linked to an open source project.
 * Uses canonical explicit relationships (openSourceProjectIds via technologiesByProjectId).
 * Never infers relationships from topics, tags, or heuristics.
 */
export function getTechnologiesForProject(project?: OpenSourceProject | null): StackTechnology[] {
  if (!project) return [];
  return technologiesByProjectId.get(project.id) || [];
}

/**
 * Resolves all stack technologies associated with a company.
 */
export function getTechnologiesForCompany(companyId?: string | null): StackTechnology[] {
  if (!companyId) return [];
  return technologiesByCompanyId.get(companyId) || [];
}

/**
 * Resolves all companies linked to a technology.
 */
export function getCompaniesForTechnology(tech?: StackTechnology | null): Company[] {
  if (!tech?.companyIds || tech.companyIds.length === 0) return [];
  return tech.companyIds
    .map((id) => companyById.get(id))
    .filter((c): c is Company => Boolean(c));
}

/**
 * Resolves all industry events linked to a technology.
 */
export function getEventsForTechnology(tech?: StackTechnology | null): Event[] {
  if (!tech?.eventIds || tech.eventIds.length === 0) return [];
  return tech.eventIds
    .map((id) => eventById.get(id))
    .filter((e): e is Event => Boolean(e));
}

// ==========================================
// STRATEGY INTELLIGENCE SELECTORS & DERIVATIONS
// ==========================================

/**
 * Resolves all company strategy insights.
 */
export function getCompanyStrategies(): CompanyStrategyInsight[] {
  return companyStrategies;
}

export interface StrategyKPIs {
  total: number;
  oems: number;
  semis: number;
  tier1s: number;
  monetization: number;
  zonal: number;
  byContinent: Record<CompanyContinent, number>;
}

/**
 * Derives aggregate KPIs from canonical strategy data.
 */
export function getStrategyKPIs(): StrategyKPIs {
  const byContinent: Record<CompanyContinent, number> = {
    'north-america': 0,
    'europe': 0,
    'asia': 0,
    'south-america': 0,
    'africa': 0,
    'oceania': 0,
  };

  let oems = 0;
  let semis = 0;
  let tier1s = 0;
  let monetization = 0;
  let zonal = 0;

  companyStrategies.forEach((cs) => {
    if (cs.category === 'oem') oems++;
    else if (cs.category === 'semiconductor') semis++;
    else if (cs.category === 'tier1') tier1s++;

    const comp = companyById.get(cs.companyId);
    if (comp) {
      byContinent[comp.continent] = (byContinent[comp.continent] || 0) + 1;
    }

    if (cs.softwareMonetization) monetization++;
    if (cs.strategicLandscape?.eeTopology === 'central-zonal') {
      zonal++;
    }
  });

  return {
    total: companyStrategies.length,
    oems,
    semis,
    tier1s,
    monetization,
    zonal,
    byContinent,
  };
}


export interface StrategicLandscapeItem {
  companyId: string;
  companyName: string;
  category: StrategyCategory;
  continent?: CompanyContinent;
  eeTopology: EeArchitectureTopology;
  osDepth: OsPlatformDepth;
  sdvOsSummary: string;
  eeZonalSummary: string;
}

/**
 * Computes deterministic qualitative 2D positioning for the Strategic Landscape Matrix.
 * Strictly qualitative; derived from explicit strategicLandscape data.
 */
export function getStrategicLandscapeData(): StrategicLandscapeItem[] {
  return companyStrategies.map((cs) => {
    const comp = companyById.get(cs.companyId);
    return {
      companyId: cs.companyId,
      companyName: comp?.name || cs.companyName,
      category: cs.category,
      continent: comp?.continent,
      eeTopology: cs.strategicLandscape.eeTopology,
      osDepth: cs.strategicLandscape.osDepth,
      sdvOsSummary: cs.matrixSummary.sdvOs.en,
      eeZonalSummary: cs.matrixSummary.eeZonal.en,
    };
  });
}

export interface StrategicMilestoneItem {
  year: string;
  companyId: string;
  companyName: string;
  category: StrategyCategory;
  milestone: LocalizedText;
}

/**
 * Aggregates all strategic milestones chronologically.
 */
export function getStrategicMilestones(): StrategicMilestoneItem[] {
  const items: StrategicMilestoneItem[] = [];
  companyStrategies.forEach((cs) => {
    const comp = companyById.get(cs.companyId);
    cs.strategicTargets.forEach((target) => {
      items.push({
        year: target.year,
        companyId: cs.companyId,
        companyName: comp?.name || cs.companyName,
        category: cs.category,
        milestone: target.milestone,
      });
    });
  });

  return items.sort((a, b) => {
    const yA = parseInt(a.year, 10) || 9999;
    const yB = parseInt(b.year, 10) || 9999;
    if (yA !== yB) return yA - yB;
    const compA = a.companyName.localeCompare(b.companyName);
    if (compA !== 0) return compA;
    return (a.milestone.en || '').localeCompare(b.milestone.en || '');
  });
}

/**
 * Resolves explicit technology references for a company strategy.
 * Returns structured StrategyTechnologyReference items with reasons and sources when present.
 * Canonical Single Source of Truth API for strategy-to-technology linkages.
 */
export function getStrategyTechnologyReferences(
  strategy: CompanyStrategyInsight
): StrategyTechnologyReference[] {
  return strategy.relatedTechnologies ?? [];
}

/**
 * Resolves stack technologies linked to a company's strategy.
 * Strictly derives explicit strategy relationships exclusively from getStrategyTechnologyReferences(strategy)
 * and direct canonical company technologies.
 */
export function getRelatedTechnologiesForStrategy(
  strategy: CompanyStrategyInsight
): StackTechnology[] {
  const direct = getTechnologiesForCompany(strategy.companyId);
  const matchedIds = new Set<string>(direct.map((t) => t.id));

  const explicitRefs = getStrategyTechnologyReferences(strategy);
  explicitRefs.forEach((ref) => {
    if (technologyById.has(ref.technologyId)) {
      matchedIds.add(ref.technologyId);
    }
  });

  return Array.from(matchedIds)
    .map((id) => technologyById.get(id))
    .filter((t): t is StackTechnology => Boolean(t));
}

/**
 * Normalizes comparison selection with deduplication, existence verification, and 4-company clamping.
 */
export function normalizeComparisonSelection(
  companyIds: string[],
  validCompanyIds?: Set<string> | Map<string, any>
): string[] {
  const validSet = validCompanyIds ?? strategyByCompanyId;
  const hasCheck = (id: string) =>
    validSet instanceof Set ? validSet.has(id) : validSet instanceof Map ? validSet.has(id) : false;

  return Array.from(new Set(companyIds))
    .filter((id) => hasCheck(id))
    .slice(0, 4);
}

/**
 * Applies a comparison preset, atomically replacing any previous selection.
 */
export function applyComparisonPreset(
  presetCompanyIds: string[],
  validCompanyIds?: Set<string> | Map<string, any>
): string[] {
  return normalizeComparisonSelection(presetCompanyIds, validCompanyIds);
}

