/**
 * Knowledge Graph Quality & Data Validation Script for Automotive Software Hub
 * Runs during build / CI to verify graph integrity:
 * - Unique IDs across all entity collections
 * - Valid cross-reference links
 * - Valid relationship types, directionality, and duplicate detection
 * - Valid Architecture Profile classification
 * - Valid ISO date formats for lastVerified fields
 * - Valid Functional Safety / ASIL metadata
 */

import { tools } from '../src/data/tools.js';
import { resources } from '../src/data/resources.js';
import { projects } from '../src/data/projects.js';
import { events } from '../src/data/events.js';
import { companies } from '../src/data/companies.js';
import { stackLayers } from '../src/data/stackLayers.js';
import { stackTechnologies } from '../src/data/stackTechnologies.js';
import { architectureProfiles } from '../src/data/architectureProfiles.js';
import { stackRelationships } from '../src/data/stackRelationships.js';
import { stackPaths } from '../src/data/stackPaths.js';
import { companyStrategies } from '../src/data/companyStrategies.js';
import { TOPIC_TAXONOMY } from '../src/data/taxonomy.js';
import { RELATIONSHIP_METADATA } from '../src/types/relationship.js';
import { ARCHITECTURE_PROFILE_TYPE_METADATA, STACK_PATH_TYPE_METADATA } from '../src/types/architecture.js';
import { COMPANY_CONTINENT_ORDER } from '../src/types/company.js';

const validTopicIds = new Set(Object.keys(TOPIC_TAXONOMY));
const validToolIds = new Set(tools.map((t) => t.id));
const validResourceIds = new Set(resources.map((r) => r.id));
const validProjectIds = new Set(projects.map((p) => p.id));
const validEventIds = new Set(events.map((e) => e.id));
const validCompanyIds = new Set(companies.map((c) => c.id));
const companyById = new Map(companies.map((c) => [c.id, c]));
const validLayerIds = new Set(stackLayers.map((l) => l.id));
const validTechIds = new Set(stackTechnologies.map((st) => st.id));

let hasError = false;

function error(msg: string) {
  console.error(`❌ Validation Error: ${msg}`);
  hasError = true;
}

function validateIsoDate(dateStr: string, contextMsg: string) {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/;
  if (!dateRegex.test(dateStr)) {
    error(`${contextMsg}: Invalid ISO date format '${dateStr}' (expected YYYY-MM-DD or YYYY-MM).`);
    return;
  }
  const timestamp = Date.parse(dateStr);
  if (isNaN(timestamp)) {
    error(`${contextMsg}: Invalid ISO date value '${dateStr}'.`);
    return;
  }
  if (timestamp > Date.now() + 86400000) {
    error(`${contextMsg}: Date '${dateStr}' cannot be in the future.`);
  }
}

function hasMisleadingCertificationLanguage(text: string): boolean {
  if (!text) return false;
  const enMisleading = /\b(asil-[abcd]\s+certified|safety-certified|iso\s*26262\s+certified|certified\s+for\s+iso|certified\s+up\s+to\s+asil)\b/i;
  const koMisleading = /(인증을\s*획득|기능\s*안전\s*인증|안전\s*인증\s*획득|ASIL-[ABCD]\s*인증\s*획득|ASIL-[ABCD]\s*인증)/i;
  return enMisleading.test(text) || koMisleading.test(text);
}

function getSafetyRelevantTexts(st: any): { text: string; location: string }[] {
  const items: { text: string; location: string }[] = [];
  if (st.description?.en) items.push({ text: st.description.en, location: 'description.en' });
  if (st.description?.ko) items.push({ text: st.description.ko, location: 'description.ko' });
  if (st.whereDoesItFit?.en) items.push({ text: st.whereDoesItFit.en, location: 'whereDoesItFit.en' });
  if (st.whereDoesItFit?.ko) items.push({ text: st.whereDoesItFit.ko, location: 'whereDoesItFit.ko' });
  (st.tags || []).forEach((tag: string, idx: number) => {
    items.push({ text: tag, location: `tags[${idx}]` });
  });
  (st.categories || []).forEach((cat: string, idx: number) => {
    items.push({ text: cat, location: `categories[${idx}]` });
  });
  return items;
}

function checkCollection<T extends { id: string; name?: any; title?: any; description: any; topics?: string[]; website?: any; url?: any; irUrl?: any; documentation?: string }>(
  collectionName: string,
  items: T[]
) {
  const ids = new Set<string>();

  items.forEach((item, index) => {
    // ID Check
    if (!item.id) {
      error(`[${collectionName} index ${index}] Missing 'id' field.`);
    } else if (ids.has(item.id)) {
      error(`[${collectionName}] Duplicate ID found: '${item.id}'.`);
    } else {
      ids.add(item.id);
    }

    // Name Check
    const nameStr = typeof item.name === 'string' ? item.name : item.name?.en;
    if (!nameStr) {
      error(`[${collectionName} ID: ${item.id}] Missing English name.`);
    }

    // Description Check
    const descStr = typeof item.description === 'string' ? item.description : item.description?.en;
    if (!descStr) {
      error(`[${collectionName} ID: ${item.id}] Missing English description.`);
    }

    // Topics Validation
    if (item.topics) {
      item.topics.forEach((t) => {
        if (!validTopicIds.has(t)) {
          error(`[${collectionName} ID: ${item.id}] Unknown topic ID: '${t}'.`);
        }
      });
    }

    // URL Validation
    const rawUrl = item.url || item.website;
    const url = typeof rawUrl === 'string' ? rawUrl : rawUrl?.en;
    if (url) {
      try {
        new URL(url);
      } catch {
        error(`[${collectionName} ID: ${item.id}] Invalid URL string: '${url}'.`);
      }
    }

    if (item.irUrl) {
      const rawUrls = typeof item.irUrl === 'string' ? [item.irUrl] : [item.irUrl.en, item.irUrl.ko];
      for (const rawIr of rawUrls) {
        if (rawIr) {
          try {
            const parsed = new URL(rawIr);
            if (parsed.protocol !== 'https:') {
              error(`[${collectionName} ID: ${item.id}] IR URL must use HTTPS: '${rawIr}'.`);
            }
          } catch {
            error(`[${collectionName} ID: ${item.id}] Invalid IR URL string: '${rawIr}'.`);
          }
        }
      }
    }

    if (item.documentation !== undefined) {
      const docUrl = item.documentation;
      if (!docUrl || typeof docUrl !== 'string' || !docUrl.trim()) {
        error(`[${collectionName} ID: ${item.id}] Documentation URL cannot be empty.`);
      } else {
        try {
          const parsed = new URL(docUrl);
          if (parsed.protocol !== 'https:') {
            error(`[${collectionName} ID: ${item.id}] Documentation URL must use HTTPS: '${docUrl}'.`);
          }
        } catch {
          error(`[${collectionName} ID: ${item.id}] Invalid documentation URL string: '${docUrl}'.`);
        }
      }
    }
  });

  console.log(`✅ ${collectionName}: ${items.length} items validated successfully.`);
}

console.log('🔍 Starting Automotive Software Hub Knowledge Graph Validation...\n');

checkCollection('Tools', tools);
checkCollection('Resources', resources);
checkCollection('Open Source Projects', projects);
checkCollection('Events', events);
checkCollection('Companies', companies);

// Validate Companies: Continent classification & Strategy linkage
const validContinents = new Set(COMPANY_CONTINENT_ORDER);

const strategyCompanyIdSet = new Set(companyStrategies.map((cs) => cs.companyId));

companies.forEach((c) => {
  if (!c.continent) {
    error(`[Company ID: ${c.id}] Missing 'continent' field.`);
  } else if (!validContinents.has(c.continent)) {
    error(`[Company ID: ${c.id}] Invalid continent value: '${c.continent}'.`);
  }

  if (c.hasStrategyInsight && !strategyCompanyIdSet.has(c.id)) {
    error(`[Company ID: ${c.id}] Declares hasStrategyInsight: true but is missing from companyStrategies.`);
  }
});
console.log(`✅ Companies: ${companies.length} companies, continents & strategy linkages validated.`);

// Validate Stack Layers
const layerIds = new Set<string>();
stackLayers.forEach((l) => {
  if (layerIds.has(l.id)) error(`[Stack Layers] Duplicate layer ID: '${l.id}'`);
  layerIds.add(l.id);
});
console.log(`✅ Stack Layers: ${stackLayers.length} layers validated.`);

// Validate Stack Technologies & Functional Safety Metadata
const techIds = new Set<string>();
const validAsilLevels = new Set(['ASIL-A', 'ASIL-B', 'ASIL-C', 'ASIL-D']);
const validSafetyClaimTypes = new Set([
  'certified',
  'qualified',
  'compliant',
  'capable',
  'supports',
  'suitable',
]);

stackTechnologies.forEach((st) => {
  if (techIds.has(st.id)) error(`[Stack Tech] Duplicate tech ID: '${st.id}'`);
  techIds.add(st.id);

  if (!validLayerIds.has(st.layerId)) {
    error(`[Stack Tech ID: ${st.id}] Unknown layer ID: '${st.layerId}'`);
  }

  if (st.lastVerified) {
    validateIsoDate(st.lastVerified, `[Stack Tech ID: ${st.id}]`);
  }

  if (st.asilLevel && !validAsilLevels.has(st.asilLevel)) {
    error(`[Stack Tech ID: ${st.id}] Invalid ASIL level: '${st.asilLevel}'`);
  }

  if (st.functionalSafety) {
    const fs = st.functionalSafety;
    if (fs.asilLevel && !validAsilLevels.has(fs.asilLevel)) {
      error(`[Stack Tech ID: ${st.id}] Invalid functionalSafety.asilLevel: '${fs.asilLevel}'`);
    }
    if (fs.claimType && !validSafetyClaimTypes.has(fs.claimType)) {
      error(`[Stack Tech ID: ${st.id}] Invalid functionalSafety.claimType: '${fs.claimType}'`);
    }

    // Strict requirements for 'certified' claimType
    if (fs.claimType === 'certified') {
      if (!fs.sourceUrl) {
        error(`[Stack Tech ID: ${st.id}] 'certified' claimType requires an explicit sourceUrl.`);
      }
      if (!fs.lastVerified) {
        error(`[Stack Tech ID: ${st.id}] 'certified' claimType requires lastVerified verification date.`);
      }
    }

    // Text consistency checks: reject 'certified' claims across all user-visible text when claimType !== 'certified'
    if (fs.claimType && fs.claimType !== 'certified') {
      const relevantTexts = getSafetyRelevantTexts(st);
      for (const item of relevantTexts) {
        if (hasMisleadingCertificationLanguage(item.text)) {
          error(`[Stack Tech ID: ${st.id}] Field '${item.location}' contains misleading certification claim while claimType is '${fs.claimType}': "${item.text}"`);
        }
      }
    }

    if (fs.lastVerified) {
      validateIsoDate(fs.lastVerified, `[Stack Tech ID: ${st.id} functionalSafety]`);
    }
  }

  (st.relatedTechnologyIds || []).forEach((rtid) => {
    if (!validTechIds.has(rtid)) error(`[Stack Tech ID: ${st.id}] Unknown relatedTechnologyId: '${rtid}'`);
  });

  (st.toolIds || []).forEach((tid) => {
    if (!validToolIds.has(tid)) error(`[Stack Tech ID: ${st.id}] Unknown toolId: '${tid}'`);
  });

  (st.resourceIds || []).forEach((rid) => {
    if (!validResourceIds.has(rid)) error(`[Stack Tech ID: ${st.id}] Unknown resourceId: '${rid}'`);
  });

  (st.eventIds || []).forEach((eid) => {
    if (!validEventIds.has(eid)) error(`[Stack Tech ID: ${st.id}] Unknown eventId: '${eid}'`);
  });

  (st.openSourceProjectIds || []).forEach((pid) => {
    if (!validProjectIds.has(pid)) error(`[Stack Tech ID: ${st.id}] Unknown project ID: '${pid}'`);
  });

  (st.companyIds || []).forEach((cid) => {
    if (!validCompanyIds.has(cid)) error(`[Stack Tech ID: ${st.id}] Unknown companyId: '${cid}'`);
  });
});
console.log(`✅ Stack Technologies: ${stackTechnologies.length} technologies & safety metadata validated.`);

// Validate Architecture Profiles
const profileIds = new Set<string>();
architectureProfiles.forEach((prof) => {
  if (profileIds.has(prof.id)) error(`[Architecture Profile] Duplicate profile ID: '${prof.id}'`);
  profileIds.add(prof.id);

  if (!prof.name?.en) error(`[Architecture Profile ID: ${prof.id}] Missing English name.`);
  if (!prof.description?.en) error(`[Architecture Profile ID: ${prof.id}] Missing English description.`);

  if (prof.profileType && !ARCHITECTURE_PROFILE_TYPE_METADATA[prof.profileType]) {
    error(`[Architecture Profile ID: ${prof.id}] Invalid profileType: '${prof.profileType}'`);
  }

  const profTechIds = new Set<string>();
  prof.technologyIds.forEach((tid) => {
    if (!validTechIds.has(tid)) {
      error(`[Architecture Profile ID: ${prof.id}] Unknown technologyId: '${tid}'`);
    }
    if (profTechIds.has(tid)) {
      error(`[Architecture Profile ID: ${prof.id}] Duplicate technologyId '${tid}' inside profile.`);
    }
    profTechIds.add(tid);
  });

  (prof.layerIds || []).forEach((lid) => {
    if (!validLayerIds.has(lid)) {
      error(`[Architecture Profile ID: ${prof.id}] Unknown layerId: '${lid}'`);
    }
  });

  (prof.topics || []).forEach((top) => {
    if (!validTopicIds.has(top)) {
      error(`[Architecture Profile ID: ${prof.id}] Unknown topic: '${top}'`);
    }
  });
});
console.log(`✅ Architecture Profiles: ${architectureProfiles.length} profiles & classifications validated.`);

// Validate Explicit Stack Relationships (Directionality, Types & Duplicates)
const seenRelationshipKeys = new Set<string>();

stackRelationships.forEach((rel, idx) => {
  if (!validTechIds.has(rel.sourceId)) {
    error(`[Relationship #${idx}] Unknown sourceId: '${rel.sourceId}'`);
  }
  if (!validTechIds.has(rel.targetId)) {
    error(`[Relationship #${idx}] Unknown targetId: '${rel.targetId}'`);
  }

  if (rel.sourceId === rel.targetId) {
    error(`[Relationship #${idx}] Self-referencing relationship detected: '${rel.sourceId}' -> '${rel.targetId}'`);
  }

  const relMeta = RELATIONSHIP_METADATA[rel.type];
  if (!relMeta) {
    error(`[Relationship #${idx}] Unknown relationship type: '${rel.type}'`);
  }

  if (rel.lastVerified) {
    validateIsoDate(rel.lastVerified, `[Relationship #${idx}]`);
  }

  // Duplicate relationship check
  const directionalKey = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
  if (seenRelationshipKeys.has(directionalKey)) {
    error(`[Relationship #${idx}] Duplicate relationship detected: '${directionalKey}'`);
  }
  seenRelationshipKeys.add(directionalKey);

  // Symmetric duplicate check
  if (relMeta?.isSymmetric) {
    const reverseSymmetricKey = `${rel.targetId}->${rel.sourceId}:${rel.type}`;
    if (seenRelationshipKeys.has(reverseSymmetricKey)) {
      error(`[Relationship #${idx}] Symmetric duplicate relationship detected: '${reverseSymmetricKey}' already exists.`);
    }
  }
});
console.log(`✅ Semantic Stack Relationships: ${stackRelationships.length} relationships & graph integrity rules validated.`);

// Validate Stack Paths (Representative Architectural Journeys)
const seenPathIds = new Set<string>();
stackPaths.forEach((path) => {
  if (seenPathIds.has(path.id)) error(`[Stack Path] Duplicate path ID: '${path.id}'`);
  seenPathIds.add(path.id);

  if (!path.name?.en) error(`[Stack Path ID: ${path.id}] Missing English name.`);
  if (!path.description?.en) error(`[Stack Path ID: ${path.id}] Missing English description.`);

  if (path.architectureProfileId && !profileIds.has(path.architectureProfileId)) {
    error(`[Stack Path ID: ${path.id}] Unknown architectureProfileId: '${path.architectureProfileId}'`);
  }

  if (path.pathType && !STACK_PATH_TYPE_METADATA[path.pathType]) {
    error(`[Stack Path ID: ${path.id}] Invalid pathType: '${path.pathType}'`);
  }

  if (path.lastVerified) {
    validateIsoDate(path.lastVerified, `[Stack Path ID: ${path.id} lastVerified]`);
  }

  if (!path.hops || path.hops.length < 2) {
    error(`[Stack Path ID: ${path.id}] Path must have at least 2 hops.`);
  }

  path.hops.forEach((hop, hopIdx) => {
    if (!validTechIds.has(hop.technologyId)) {
      error(`[Stack Path ID: ${path.id} Hop #${hopIdx}] Unknown technologyId: '${hop.technologyId}'`);
    }
    if (hopIdx > 0 && path.hops[hopIdx - 1].technologyId === hop.technologyId) {
      error(`[Stack Path ID: ${path.id} Hop #${hopIdx}] Consecutive duplicate technologyId: '${hop.technologyId}'`);
    }
  });
});
console.log(`✅ Stack Paths: ${stackPaths.length} representative automotive software stack paths validated.`);

// Validate Company Strategy Intelligence
const validSourceTypes = new Set([
  'annual-report',
  'investor-presentation',
  'capital-markets-day',
  'shareholder-letter',
  'press-release',
  'official-event',
  'official-website',
]);
const validConfidences = new Set(['official', 'vendor', 'community']);
const seenStrategyCompanyIds = new Set<string>();

companyStrategies.forEach((cs) => {
  if (seenStrategyCompanyIds.has(cs.companyId)) {
    error(`[Company Strategy] Duplicate strategy entry for companyId: '${cs.companyId}'`);
  }
  seenStrategyCompanyIds.add(cs.companyId);

  const targetCompany = companyById.get(cs.companyId);
  if (!targetCompany) {
    error(`[Company Strategy ID: ${cs.companyId}] Unknown companyId in companies collection.`);
  } else if (!targetCompany.hasStrategyInsight) {
    error(`[Company Strategy ID: ${cs.companyId}] Company does not have hasStrategyInsight set to true.`);
  }

  if (!cs.irUrl) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing irUrl.`);
  } else {
    const rawUrls = typeof cs.irUrl === 'string' ? [cs.irUrl] : [cs.irUrl.en, cs.irUrl.ko];
    for (const u of rawUrls) {
      if (!u || !u.startsWith('https://')) {
        error(`[Company Strategy ID: ${cs.companyId}] Invalid or missing HTTPS irUrl: '${u}'`);
      }
    }
  }

  if (!cs.matrixSummary?.sdvOs?.en || !cs.matrixSummary?.sdvOs?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized matrixSummary.sdvOs.`);
  }
  if (!cs.matrixSummary?.eeZonal?.en || !cs.matrixSummary?.eeZonal?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized matrixSummary.eeZonal.`);
  }
  if (!cs.matrixSummary?.evPlatform?.en || !cs.matrixSummary?.evPlatform?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized matrixSummary.evPlatform.`);
  }

  if (!cs.sdvArchitecture?.en || !cs.sdvArchitecture?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized sdvArchitecture.`);
  }
  if (!cs.eeZonalArchitecture?.en || !cs.eeZonalArchitecture?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized eeZonalArchitecture.`);
  }
  if (!cs.evPlatformStrategy?.en || !cs.evPlatformStrategy?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized evPlatformStrategy.`);
  }
  if (!cs.autonomousDrivingAi?.en || !cs.autonomousDrivingAi?.ko) {
    error(`[Company Strategy ID: ${cs.companyId}] Missing localized autonomousDrivingAi.`);
  }

  if (!cs.strategicTargets || cs.strategicTargets.length === 0) {
    error(`[Company Strategy ID: ${cs.companyId}] Must have at least one strategic target.`);
  } else {
    cs.strategicTargets.forEach((st, idx) => {
      if (!/^\d{4}$/.test(st.year)) {
        error(`[Company Strategy ID: ${cs.companyId} Target #${idx}] Invalid target year: '${st.year}'.`);
      }
      if (!st.milestone?.en || !st.milestone?.ko) {
        error(`[Company Strategy ID: ${cs.companyId} Target #${idx}] Missing localized milestone.`);
      }
    });
  }

  if (!cs.sources || cs.sources.length === 0) {
    error(`[Company Strategy ID: ${cs.companyId}] Must have at least one traceable source.`);
  } else {
    cs.sources.forEach((source, idx) => {
      if (!source.title?.en || !source.title?.ko) {
        error(`[Company Strategy ID: ${cs.companyId} Source #${idx}] Missing localized source title.`);
      }
      if (!source.url || !source.url.startsWith('https://')) {
        error(`[Company Strategy ID: ${cs.companyId} Source #${idx}] Invalid HTTPS source URL: '${source.url}'.`);
      }
      if (!validSourceTypes.has(source.sourceType)) {
        error(`[Company Strategy ID: ${cs.companyId} Source #${idx}] Unknown sourceType: '${source.sourceType}'.`);
      }
      if (source.publishedDate) {
        validateIsoDate(source.publishedDate, `[Company Strategy ID: ${cs.companyId} Source #${idx} publishedDate]`);
      }
      if (source.lastVerified) {
        validateIsoDate(source.lastVerified, `[Company Strategy ID: ${cs.companyId} Source #${idx} lastVerified]`);
      }
      if (source.confidence && !validConfidences.has(source.confidence)) {
        error(`[Company Strategy ID: ${cs.companyId} Source #${idx}] Unknown confidence: '${source.confidence}'.`);
      }
    });
  }

  if (cs.lastVerified) {
    validateIsoDate(cs.lastVerified, `[Company Strategy ID: ${cs.companyId} lastVerified]`);
  }
});
console.log(`✅ Company Strategy Intelligence: ${companyStrategies.length} strategy profiles & traceable sources validated.`);

if (hasError) {
  console.error('\n❌ Data validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✨ All data collections, architecture profiles & knowledge graph relationships validated clean!');
}
