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
import { CompanyStrategyInsight, StrategyCategory } from '../../types/strategy';
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

    const zonalText = (
      cs.matrixSummary.eeZonal.en + ' ' + cs.eeZonalArchitecture.en
    ).toLowerCase();
    if (zonalText.includes('zonal') || zonalText.includes('zone')) {
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

export type EeArchitectureTopology =
  | 'distributed-domain'
  | 'central-domain'
  | 'central-zonal';

export type OsPlatformDepth =
  | 'commercial-ecosystem'
  | 'dual-track'
  | 'proprietary-fullstack';

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
 * Strictly qualitative; no synthetic or arbitrary numerical scores.
 */
export function getStrategicLandscapeData(): StrategicLandscapeItem[] {
  return companyStrategies.map((cs) => {
    const comp = companyById.get(cs.companyId);
    const eeText = (
      cs.matrixSummary.eeZonal.en + ' ' + cs.eeZonalArchitecture.en
    ).toLowerCase();
    const osText = (
      cs.matrixSummary.sdvOs.en + ' ' + cs.sdvArchitecture.en
    ).toLowerCase();

    // Determine E/E Topology
    let eeTopology: EeArchitectureTopology = 'central-domain';
    if (
      eeText.includes('zonal') ||
      eeText.includes('zone controller') ||
      eeText.includes('zonal gateway') ||
      eeText.includes('zonal nodes') ||
      eeText.includes('3 zonal ecus')
    ) {
      eeTopology = 'central-zonal';
    } else if (
      eeText.includes('scalable domain') ||
      eeText.includes('domain controller layout') ||
      eeText.includes('true redundancy')
    ) {
      eeTopology = 'distributed-domain';
    }

    // Determine OS Strategy Depth
    let osDepth: OsPlatformDepth = 'dual-track';
    if (
      osText.includes('proprietary') ||
      osText.includes('full-stack os') ||
      osText.includes('custom linux') ||
      osText.includes('chip-to-cloud') ||
      osText.includes('woven') ||
      osText.includes('tian shu') ||
      osText.includes('xos') ||
      osText.includes('xuanji') ||
      osText.includes('flyme')
    ) {
      osDepth = 'proprietary-fullstack';
    } else if (
      osText.includes('alphaware') ||
      osText.includes('zconnect') ||
      osText.includes('adrenox') ||
      osText.includes('dxp')
    ) {
      osDepth = 'commercial-ecosystem';
    }

    return {
      companyId: cs.companyId,
      companyName: cs.companyName,
      category: cs.category,
      continent: comp?.continent,
      eeTopology,
      osDepth,
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
    cs.strategicTargets.forEach((target) => {
      items.push({
        year: target.year,
        companyId: cs.companyId,
        companyName: cs.companyName,
        category: cs.category,
        milestone: target.milestone,
      });
    });
  });

  return items.sort((a, b) => {
    const yA = parseInt(a.year, 10) || 9999;
    const yB = parseInt(b.year, 10) || 9999;
    if (yA !== yB) return yA - yB;
    return a.companyName.localeCompare(b.companyName);
  });
}

/**
 * Resolves stack technologies linked to a company's strategy.
 * Combines direct company technologies and canonical technologies mentioned in strategy texts.
 */
const STRATEGY_TECH_PATTERNS: { pattern: RegExp; techId: string }[] = [
  { pattern: /android automotive|aaos/i, techId: 'android-automotive-os' },
  { pattern: /nvidia drive|drive thor|drive orin/i, techId: 'nvidia-drive-thor' },
  { pattern: /qualcomm|snapdragon digital cockpit|snapdragon ride/i, techId: 'qualcomm-snapdragon-cockpit' },
  { pattern: /mobileye|eyeq/i, techId: 'mobileye-eyeq' },
  { pattern: /autosar adaptive/i, techId: 'autosar-adaptive' },
  { pattern: /autosar classic/i, techId: 'autosar-classic' },
  { pattern: /qnx hypervisor|blackberry qnx|qnx neutrino/i, techId: 'qnx-hypervisor' },
  { pattern: /renesas|r-car/i, techId: 'renesas-rcar' },
  { pattern: /vsomeip|some\/ip|someip/i, techId: 'vsomeip-middleware' },
  { pattern: /momenta/i, techId: 'momenta-flywheel-ad' },
  { pattern: /flutter/i, techId: 'flutter-automotive' },
  { pattern: /kanzi/i, techId: 'kanzi-ui-engine' },
  { pattern: /unece|r155|r156/i, techId: 'unece-r155-r156' },
  { pattern: /iso 26262|iso26262/i, techId: 'iso-26262-functional-safety' },
  { pattern: /iso 21434|iso21434/i, techId: 'iso-21434-cybersecurity' },
  { pattern: /ota-cloud|connected car ota|fleet platform|over-the-air/i, techId: 'ota-cloud-fleet' },
];

export function getRelatedTechnologiesForStrategy(
  strategy: CompanyStrategyInsight
): StackTechnology[] {
  const direct = getTechnologiesForCompany(strategy.companyId);
  const matchedIds = new Set<string>(direct.map((t) => t.id));

  const text = (
    strategy.sdvArchitecture.en +
    ' ' +
    strategy.eeZonalArchitecture.en +
    ' ' +
    strategy.autonomousDrivingAi.en +
    ' ' +
    strategy.evPlatformStrategy.en +
    ' ' +
    strategy.matrixSummary.sdvOs.en +
    ' ' +
    strategy.matrixSummary.eeZonal.en
  );

  STRATEGY_TECH_PATTERNS.forEach(({ pattern, techId }) => {
    if (pattern.test(text) && technologyById.has(techId)) {
      matchedIds.add(techId);
    }
  });

  return Array.from(matchedIds)
    .map((id) => technologyById.get(id))
    .filter((t): t is StackTechnology => Boolean(t));
}

