/**
 * Data Schema Validation Script for Automotive Software Hub
 * Runs during build / CI to verify data integrity:
 * - Unique IDs
 * - Non-empty titles and descriptions (EN)
 * - Known taxonomy topics
 * - Valid URL formats
 * - Valid Stack Layers and cross-referenced entity IDs
 */

import { tools } from '../src/data/tools.js';
import { resources } from '../src/data/resources.js';
import { projects } from '../src/data/projects.js';
import { events } from '../src/data/events.js';
import { companies } from '../src/data/companies.js';
import { stackLayers } from '../src/data/stackLayers.js';
import { stackTechnologies } from '../src/data/stackTechnologies.js';
import { TOPIC_TAXONOMY } from '../src/data/taxonomy.js';

const validTopicIds = new Set(Object.keys(TOPIC_TAXONOMY));
const validToolIds = new Set(tools.map((t) => t.id));
const validResourceIds = new Set(resources.map((r) => r.id));
const validProjectIds = new Set(projects.map((p) => p.id));
const validEventIds = new Set(events.map((e) => e.id));
const validCompanyIds = new Set(companies.map((c) => c.id));
const validLayerIds = new Set(stackLayers.map((l) => l.id));

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

if (hasError) {
  console.error('\n❌ Data validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✨ All data collections & stack graph relationships validated clean!');
}
