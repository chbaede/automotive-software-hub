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
import { TOPIC_TAXONOMY } from '../src/data/taxonomy.js';
import { RELATIONSHIP_METADATA } from '../src/types/relationship.js';
import { ARCHITECTURE_PROFILE_TYPE_METADATA, STACK_PATH_TYPE_METADATA } from '../src/types/architecture.js';

const validTopicIds = new Set(Object.keys(TOPIC_TAXONOMY));
const validToolIds = new Set(tools.map((t) => t.id));
const validResourceIds = new Set(resources.map((r) => r.id));
const validProjectIds = new Set(projects.map((p) => p.id));
const validEventIds = new Set(events.map((e) => e.id));
const validCompanyIds = new Set(companies.map((c) => c.id));
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
  }
}

function checkCollection<T extends { id: string; name?: any; title?: any; description: any; topics?: string[]; website?: any; url?: any }>(
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
  });

  console.log(`✅ ${collectionName}: ${items.length} items validated successfully.`);
}

console.log('🔍 Starting Automotive Software Hub Knowledge Graph Validation...\n');

checkCollection('Tools', tools);
checkCollection('Resources', resources);
checkCollection('Open Source Projects', projects);
checkCollection('Events', events);
checkCollection('Companies', companies);

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

  prof.technologyIds.forEach((tid) => {
    if (!validTechIds.has(tid)) {
      error(`[Architecture Profile ID: ${prof.id}] Unknown technologyId: '${tid}'`);
    }
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

if (hasError) {
  console.error('\n❌ Data validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✨ All data collections, architecture profiles & knowledge graph relationships validated clean!');
}
