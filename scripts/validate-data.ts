/**
 * Data Schema Validation Script for Automotive Software Hub
 * Runs during build / CI to verify data integrity:
 * - Unique IDs
 * - Non-empty titles and descriptions (EN)
 * - Known taxonomy topics
 * - Valid URL formats
 */

import { tools } from '../src/data/tools.js';
import { resources } from '../src/data/resources.js';
import { projects } from '../src/data/projects.js';
import { events } from '../src/data/events.js';
import { companies } from '../src/data/companies.js';
import { TOPIC_TAXONOMY } from '../src/data/taxonomy.js';

const validTopicIds = new Set(Object.keys(TOPIC_TAXONOMY));

let hasError = false;

function error(msg: string) {
  console.error(`❌ Validation Error: ${msg}`);
  hasError = true;
}

function checkCollection<T extends { id: string; name?: any; title?: any; description: any; topics?: string[]; website?: string; url?: string }>(
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
    const url = item.url || item.website;
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

if (hasError) {
  console.error('\n❌ Data validation FAILED.');
  process.exit(1);
} else {
  console.log('\n✨ All data collections validated clean!');
}

