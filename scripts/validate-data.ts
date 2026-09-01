/**
 * Data Schema Validation Script for Automotive Software Hub
 * Runs during build / CI to verify data integrity:
 * - Unique IDs
 * - Non-empty titles and descriptions (EN)
 * - Known taxonomy topics
 * - Valid URL formats
 * - Valid Stack Layers and cross-referenced entity IDs
 * - Valid Architecture Profiles and referenced technology IDs
 * - Valid Semantic Technology Relationships
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
import { TOPIC_TAXONOMY } from '../src/data/taxonomy.js';

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

console.log('🔍 Starting Automotive Software Hub Data Validation...\n');

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

// Validate Stack Technologies Cross-References
const techIds = new Set<string>();
stackTechnologies.forEach((st) => {
  if (techIds.has(st.id)) error(`[Stack Tech] Duplicate tech ID: '${st.id}'`);
  techIds.add(st.id);

  if (!validLayerIds.has(st.layerId)) {
    error(`[Stack Tech ID: ${st.id}] Unknown layer ID: '${st.layerId}'`);
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
console.log(`✅ Stack Technologies: ${stackTechnologies.length} technologies & cross-references validated.`);

// Validate Architecture Profiles
const profileIds = new Set<string>();
architectureProfiles.forEach((prof) => {
  if (profileIds.has(prof.id)) error(`[Architecture Profile] Duplicate profile ID: '${prof.id}'`);
  profileIds.add(prof.id);

  if (!prof.name?.en) error(`[Architecture Profile ID: ${prof.id}] Missing English name.`);
  if (!prof.description?.en) error(`[Architecture Profile ID: ${prof.id}] Missing English description.`);

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
console.log(`✅ Architecture Profiles: ${architectureProfiles.length} profiles validated.`);

// Validate Explicit Stack Relationships
const validRelationshipTypes = new Set(['depends-on', 'runs-on', 'implemented-by', 'used-with', 'alternative', 'related']);
stackRelationships.forEach((rel, idx) => {
  if (!validTechIds.has(rel.sourceId)) {
    error(`[Relationship #${idx}] Unknown sourceId: '${rel.sourceId}'`);
  }
  if (!validTechIds.has(rel.targetId)) {
    error(`[Relationship #${idx}] Unknown targetId: '${rel.targetId}'`);
  }
  if (!validRelationshipTypes.has(rel.type)) {
    error(`[Relationship #${idx}] Unknown relationship type: '${rel.type}'`);
  }
});
console.log(`✅ Semantic Stack Relationships: ${stackRelationships.length} relationships validated.`);

if (hasError) {
  console.error('\n❌ Data validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✨ All data collections, architecture profiles & knowledge graph relationships validated clean!');
}
