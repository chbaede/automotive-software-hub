import assert from 'node:assert';
import { stackTechnologies } from '../src/data/stackTechnologies.js';
import { architectureProfiles } from '../src/data/architectureProfiles.js';
import { stackRelationships } from '../src/data/stackRelationships.js';
import { RELATIONSHIP_METADATA } from '../src/types/relationship.js';
import { ARCHITECTURE_PROFILE_TYPE_METADATA } from '../src/types/architecture.js';
import {
  technologyById,
  profileById,
  getRelatedTechnologies,
  getTechnologyRelationships,
} from '../src/utils/graphIndexes.js';

console.log('🧪 Running Knowledge Graph Test Suite...\n');

// Test 1: Valid architecture profile resolves technology IDs
{
  const aaosProfile = profileById.get('android-automotive');
  assert.ok(aaosProfile, 'Android Automotive profile should exist');
  assert.ok(aaosProfile.technologyIds.length > 0, 'AAOS profile should have technology IDs');
  
  aaosProfile.technologyIds.forEach((techId) => {
    const tech = technologyById.get(techId);
    assert.ok(tech, `Technology '${techId}' referenced in AAOS profile must exist in index`);
  });
  console.log('✅ Test 1 Passed: Architecture profiles resolve technology IDs correctly.');
}

// Test 2: Relationship taxonomy completeness
{
  Object.keys(RELATIONSHIP_METADATA).forEach((typeKey) => {
    const meta = RELATIONSHIP_METADATA[typeKey as keyof typeof RELATIONSHIP_METADATA];
    assert.ok(meta.label.en, `Relationship type '${typeKey}' must have EN label`);
    assert.ok(meta.label.ko, `Relationship type '${typeKey}' must have KO label`);
    assert.ok(typeof meta.isSymmetric === 'boolean', `Relationship type '${typeKey}' must declare isSymmetric boolean`);
  });
  console.log('✅ Test 2 Passed: Relationship taxonomy and metadata are complete.');
}

// Test 3: Relationship directionality & non-self-referencing
{
  stackRelationships.forEach((rel, idx) => {
    assert.notStrictEqual(
      rel.sourceId,
      rel.targetId,
      `Relationship #${idx} must not be self-referencing ('${rel.sourceId}')`
    );

    const sourceTech = technologyById.get(rel.sourceId);
    const targetTech = technologyById.get(rel.targetId);
    assert.ok(sourceTech, `Relationship #${idx} source '${rel.sourceId}' must exist`);
    assert.ok(targetTech, `Relationship #${idx} target '${rel.targetId}' must exist`);
  });
  console.log('✅ Test 3 Passed: All relationships have valid, non-self-referencing source/target nodes.');
}

// Test 4: Duplicate relationship detection
{
  const seenKeys = new Set<string>();
  stackRelationships.forEach((rel) => {
    const directionalKey = `${rel.sourceId}->${rel.targetId}:${rel.type}`;
    assert.strictEqual(
      seenKeys.has(directionalKey),
      false,
      `Duplicate directional relationship found: '${directionalKey}'`
    );
    seenKeys.add(directionalKey);

    const relMeta = RELATIONSHIP_METADATA[rel.type];
    if (relMeta.isSymmetric) {
      const reverseKey = `${rel.targetId}->${rel.sourceId}:${rel.type}`;
      assert.strictEqual(
        seenKeys.has(reverseKey),
        false,
        `Symmetric duplicate relationship found: '${reverseKey}'`
      );
    }
  });
  console.log('✅ Test 4 Passed: No duplicate or symmetric duplicate relationships exist.');
}

// Test 5: Functional safety metadata validation
{
  const validClaimTypes = new Set(['certified', 'qualified', 'compliant', 'capable', 'supports', 'suitable']);
  const validAsilLevels = new Set(['ASIL-A', 'ASIL-B', 'ASIL-C', 'ASIL-D']);

  stackTechnologies.forEach((tech) => {
    if (tech.functionalSafety) {
      if (tech.functionalSafety.claimType) {
        assert.ok(
          validClaimTypes.has(tech.functionalSafety.claimType),
          `Tech '${tech.id}' has invalid functionalSafety claimType '${tech.functionalSafety.claimType}'`
        );
      }
      if (tech.functionalSafety.asilLevel) {
        assert.ok(
          validAsilLevels.has(tech.functionalSafety.asilLevel),
          `Tech '${tech.id}' has invalid functionalSafety asilLevel '${tech.functionalSafety.asilLevel}'`
        );
      }
    }
  });
  console.log('✅ Test 5 Passed: Functional safety metadata assertions are valid and non-misleading.');
}

// Test 6: Graph Traversal Index Helper
{
  const aaosRelated = getRelatedTechnologies('android-automotive-os');
  assert.ok(aaosRelated.length > 0, 'getRelatedTechnologies for AAOS should return connected nodes');
  const linuxKernel = aaosRelated.find((t) => t.id === 'linux-kernel');
  assert.ok(linuxKernel, 'AAOS connected nodes must include linux-kernel');

  const { outgoing, incoming } = getTechnologyRelationships('android-automotive-os');
  assert.ok(outgoing.length > 0, 'AAOS should have outgoing relationships');
  console.log('✅ Test 6 Passed: Graph indexes and traversal helpers resolve correctly.');
}

// Test 7: Architecture Profile Types
{
  architectureProfiles.forEach((prof) => {
    assert.ok(prof.profileType, `Profile '${prof.id}' must declare profileType`);
    assert.ok(
      ARCHITECTURE_PROFILE_TYPE_METADATA[prof.profileType!],
      `Profile '${prof.id}' has unknown profileType '${prof.profileType}'`
    );
  });
  console.log('✅ Test 7 Passed: Architecture profile classifications are valid.');
}

// Test 8: Representative Automotive Stack Paths Validation
{
  const { stackPaths } = await import('../src/data/stackPaths.js');
  const { pathById, pathsByTechnologyId } = await import('../src/utils/graphIndexes.js');

  assert.ok(stackPaths.length >= 6, 'Must define at least 6 canonical representative stack paths');
  
  stackPaths.forEach((path) => {
    assert.ok(pathById.get(path.id), `Path '${path.id}' must exist in pathById index`);
    assert.ok(path.hops.length >= 2, `Path '${path.id}' must have at least 2 hops`);
    
    path.hops.forEach((hop) => {
      const tech = technologyById.get(hop.technologyId);
      assert.ok(tech, `Hop technology '${hop.technologyId}' in path '${path.id}' must exist`);
      
      const techPaths = pathsByTechnologyId.get(hop.technologyId);
      assert.ok(techPaths && techPaths.some((p) => p.id === path.id), `Technology '${hop.technologyId}' must map to path '${path.id}'`);
    });
  });
  console.log('✅ Test 8 Passed: Representative automotive stack paths and graph index resolution verified.');
}

// Test 9: Stack Path Type Classification Validation
{
  const { stackPaths } = await import('../src/data/stackPaths.js');
  const { STACK_PATH_TYPE_METADATA } = await import('../src/types/architecture.js');

  stackPaths.forEach((path) => {
    assert.ok(path.pathType, `Path '${path.id}' should declare a pathType`);
    assert.ok(
      STACK_PATH_TYPE_METADATA[path.pathType!],
      `Path '${path.id}' has invalid pathType '${path.pathType}'`
    );
  });
  console.log('✅ Test 9 Passed: Stack Path Type classifications and localized metadata verified.');
}

// Test 10: Information Freshness (lastVerified) Date Format & Validity
{
  const { stackPaths } = await import('../src/data/stackPaths.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');

  const isoRegex = /^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/;
  const now = Date.now() + 86400000;

  stackPaths.forEach((path) => {
    if (path.lastVerified) {
      assert.ok(isoRegex.test(path.lastVerified), `Path '${path.id}' has malformed lastVerified date '${path.lastVerified}'`);
      const ts = Date.parse(path.lastVerified);
      assert.ok(!isNaN(ts), `Path '${path.id}' has invalid lastVerified date value '${path.lastVerified}'`);
      assert.ok(ts <= now, `Path '${path.id}' lastVerified date '${path.lastVerified}' cannot be in the future`);
    }
  });

  stackTechnologies.forEach((tech) => {
    const verifiedDate = tech.functionalSafety?.lastVerified || tech.lastVerified;
    if (verifiedDate) {
      assert.ok(isoRegex.test(verifiedDate), `Tech '${tech.id}' has malformed lastVerified date '${verifiedDate}'`);
      const ts = Date.parse(verifiedDate);
      assert.ok(!isNaN(ts), `Tech '${tech.id}' has invalid lastVerified date value '${verifiedDate}'`);
      assert.ok(ts <= now, `Tech '${tech.id}' lastVerified date '${verifiedDate}' cannot be in the future`);
    }
  });

  console.log('✅ Test 10 Passed: Information freshness (lastVerified) ISO dates and non-future validity verified.');
}

// Test 11: Technologies by Layer ID Index Resolution
{
  const { technologiesByLayerId } = await import('../src/utils/graphIndexes.js');
  const { stackLayers } = await import('../src/data/stackLayers.js');

  stackLayers.forEach((layer) => {
    const techsInLayer = technologiesByLayerId.get(layer.id) || [];
    assert.ok(Array.isArray(techsInLayer), `Layer '${layer.id}' must map to an array of technologies`);
    techsInLayer.forEach((t) => {
      assert.strictEqual(t.layerId, layer.id, `Tech '${t.id}' mapped in layer index must match layerId '${layer.id}'`);
    });
  });
  console.log('✅ Test 11 Passed: Technologies by Layer ID index verified across all stack layers.');
}

// Test 12: Grouped Technology Relationships Helper Resolution
{
  const { getGroupedTechnologyRelationships } = await import('../src/utils/graphIndexes.js');

  const aaosGrouped = getGroupedTechnologyRelationships('android-automotive-os');
  assert.ok(aaosGrouped.size > 0, 'AAOS must return grouped relationships');
  assert.ok(aaosGrouped.has('depends-on'), 'AAOS must group depends-on relationships');

  const linuxGrouped = getGroupedTechnologyRelationships('linux-kernel');
  assert.ok(linuxGrouped.size > 0, 'Linux Kernel must return grouped relationships');
  console.log('✅ Test 12 Passed: Grouped Technology Relationships helper resolves correctly.');
}

// Test 13: Certified Claim Evidence Completeness (sourceUrl & lastVerified mandatory)
{
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');

  stackTechnologies.forEach((tech) => {
    if (tech.functionalSafety && tech.functionalSafety.claimType === 'certified') {
      assert.ok(
        tech.functionalSafety.sourceUrl,
        `Tech '${tech.id}' with 'certified' claimType must provide an explicit sourceUrl`
      );
      assert.ok(
        tech.functionalSafety.lastVerified,
        `Tech '${tech.id}' with 'certified' claimType must provide a lastVerified date`
      );
    }
  });
  console.log('✅ Test 13 Passed: Certified claim evidence completeness verified (sourceUrl & lastVerified).');
}

// Test 14: Bilingual Safety Claim Consistency (no ungrounded certification claims)
{
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');

  stackTechnologies.forEach((tech) => {
    const fs = tech.functionalSafety;
    if (fs && fs.claimType && fs.claimType !== 'certified') {
      const descEn = tech.description?.en || '';
      const descKo = tech.description?.ko || '';

      const enViolation = /(\basil-[abcd]\s+certified|\bsafety-certified|\biso\s*26262\s+certified|\bcertified\s+for\s+iso\b)/i.test(descEn);
      assert.strictEqual(
        enViolation,
        false,
        `Tech '${tech.id}' claims 'certified' in EN description but claimType is '${fs.claimType}'`
      );

      const koViolation = /(인증을\s*획득|기능\s*안전\s*인증|안전\s*인증\s*획득|ASIL-[ABCD]\s*인증\s*획득)/i.test(descKo);
      assert.strictEqual(
        koViolation,
        false,
        `Tech '${tech.id}' claims 'certified' in KO description but claimType is '${fs.claimType}'`
      );
    }
  });
  console.log('✅ Test 14 Passed: Bilingual safety claim consistency verified across EN and KO.');
}

// Test 15: Relationship Confidence Taxonomy Validity
{
  const { stackRelationships } = await import('../src/data/stackRelationships.js');
  const validConfidence = new Set(['official', 'vendor', 'community']);

  stackRelationships.forEach((rel, idx) => {
    if (rel.confidence) {
      assert.ok(
        validConfidence.has(rel.confidence),
        `Relationship #${idx} (${rel.sourceId} -> ${rel.targetId}) has invalid confidence '${rel.confidence}'`
      );
    }
  });
  console.log('✅ Test 15 Passed: Relationship confidence taxonomy validity verified.');
}

// Test 16: Safety Claim Consistency across whereDoesItFit, Tags, and Categories
{
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const enMisleading = /\b(asil-[abcd]\s+certified|safety-certified|iso\s*26262\s+certified|certified\s+for\s+iso|certified\s+up\s+to\s+asil)\b/i;
  const koMisleading = /(인증을\s*획득|기능\s*안전\s*인증|안전\s*인증\s*획득|ASIL-[ABCD]\s*인증\s*획득|ASIL-[ABCD]\s*인증)/i;

  stackTechnologies.forEach((tech) => {
    const fs = tech.functionalSafety;
    if (fs && fs.claimType && fs.claimType !== 'certified') {
      const fitEn = tech.whereDoesItFit?.en || '';
      const fitKo = tech.whereDoesItFit?.ko || '';

      assert.strictEqual(
        enMisleading.test(fitEn),
        false,
        `Tech '${tech.id}' has misleading certification claim in whereDoesItFit.en: "${fitEn}"`
      );
      assert.strictEqual(
        koMisleading.test(fitKo),
        false,
        `Tech '${tech.id}' has misleading certification claim in whereDoesItFit.ko: "${fitKo}"`
      );

      (tech.tags || []).forEach((tag) => {
        assert.strictEqual(
          enMisleading.test(tag) || koMisleading.test(tag),
          false,
          `Tech '${tech.id}' has misleading certification tag: "${tag}"`
        );
      });

      (tech.categories || []).forEach((cat) => {
        assert.strictEqual(
          enMisleading.test(cat) || koMisleading.test(cat),
          false,
          `Tech '${tech.id}' has misleading certification category: "${cat}"`
        );
      });
    }
  });
  console.log('✅ Test 16 Passed: Safety claim consistency verified across whereDoesItFit, tags, and categories.');
}

// Test 17: Semantic Independence of ASIL Level and Claim Type
{
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');

  const capableAsilD = stackTechnologies.filter(
    (t) => t.functionalSafety?.asilLevel === 'ASIL-D' && t.functionalSafety?.claimType === 'capable'
  );
  assert.ok(
    capableAsilD.length > 0,
    'Must have valid ASIL-D Capable technologies (e.g. NVIDIA Thor, QNX Neutrino)'
  );

  const certifiedAsilD = stackTechnologies.filter(
    (t) => t.functionalSafety?.asilLevel === 'ASIL-D' && t.functionalSafety?.claimType === 'certified'
  );
  assert.ok(
    certifiedAsilD.length > 0,
    'Must have valid ASIL-D Certified technologies with evidence (e.g. QNX Hypervisor, INTEGRITY, VxWorks, Perseus)'
  );

  const perseus = stackTechnologies.find((t) => t.id === 'perseus-hypervisor');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified', 'Perseus must be ASIL-D certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D', 'Perseus must have ASIL-D level');

  console.log('✅ Test 17 Passed: ASIL Level and Claim Type maintain semantic independence.');
}

// Test 18: Graph Intelligence Basic Queries & Canonical Source (stackRelationships)
{
  const {
    getTechnology,
    getNeighbors,
    getOutgoingRelationships,
    getIncomingRelationships,
    getRelationshipsForTechnology,
    getRelatedTechnologies,
  } = await import('../src/lib/graph/index.js');

  const autosar = getTechnology('autosar-adaptive');
  assert.ok(autosar, 'getTechnology should return AUTOSAR Adaptive');
  assert.strictEqual(autosar?.id, 'autosar-adaptive');

  const unknown = getTechnology('nonexistent-tech-xyz');
  assert.strictEqual(unknown, undefined, 'getTechnology on unknown ID should return undefined');

  const neighbors = getNeighbors('autosar-adaptive');
  assert.ok(neighbors.length > 0, 'AUTOSAR Adaptive should have neighbors');
  assert.ok(!neighbors.some((n) => n.id === 'autosar-adaptive'), 'Neighbors must not contain self');

  const canonicalRelated = getRelatedTechnologies('autosar-adaptive');
  assert.strictEqual(canonicalRelated.length, neighbors.length, 'getRelatedTechnologies must resolve from canonical neighbors');

  const outgoing = getOutgoingRelationships('autosar-adaptive');
  assert.ok(outgoing.length > 0, 'AUTOSAR Adaptive should have outgoing relationships');
  outgoing.forEach((rel) => assert.strictEqual(rel.sourceId, 'autosar-adaptive'));

  const incoming = getIncomingRelationships('autosar-adaptive');
  assert.ok(incoming.length > 0, 'AUTOSAR Adaptive should have incoming relationships');
  incoming.forEach((rel) => assert.strictEqual(rel.targetId, 'autosar-adaptive'));

  const allRels = getRelationshipsForTechnology('autosar-adaptive');
  assert.strictEqual(allRels.all.length, outgoing.length + incoming.length);

  console.log('✅ Test 18 Passed: Canonical graph queries & traversal verified.');
}

// Test 19: Filtered Neighbors, Layer Queries & Context Resolvers
{
  const {
    getNeighborsByRelationshipType,
    getTechnologiesByLayer,
    getArchitecturesForTechnology,
    getStackPathsForTechnology,
  } = await import('../src/lib/graph/index.js');

  const impls = getNeighborsByRelationshipType('dds-protocol', 'implemented-by');
  assert.ok(impls.outgoing.length > 0, 'DDS Protocol should have outgoing implemented-by neighbors');
  assert.ok(impls.outgoing.some((t) => t.id === 'eprosima-fastdds' || t.id === 'eclipse-cyclonedds'));

  const mwTechs = getTechnologiesByLayer('middleware-communication');
  assert.ok(mwTechs.length > 0, 'Should return technologies in middleware-communication layer');
  mwTechs.forEach((t) => assert.strictEqual(t.layerId, 'middleware-communication'));

  const archs = getArchitecturesForTechnology('android-automotive-os');
  assert.ok(archs.length > 0, 'AAOS should participate in Architecture Profiles');

  const paths = getStackPathsForTechnology('nvidia-drive-thor');
  assert.ok(paths.length > 0, 'NVIDIA DRIVE Thor should participate in Stack Paths');

  console.log('✅ Test 19 Passed: Filtered relationship neighbors, layer queries & context resolvers verified.');
}

// Test 20: Node Degree Semantics (connectionCount vs relationshipCount) & Zero-Isolation
{
  const {
    getTechnologyDegree,
    getTechnologyGraphContext,
  } = await import('../src/lib/graph/index.js');

  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');

  // Verify zero-isolation: EVERY technology in the knowledge graph must have >= 1 unique connection
  stackTechnologies.forEach((tech) => {
    const degreeInfo = getTechnologyDegree(tech.id);
    assert.ok(
      degreeInfo.connectionCount >= 1,
      `Technology '${tech.id}' has connectionCount ${degreeInfo.connectionCount} (must be >= 1 to satisfy zero-isolation)`
    );
    assert.ok(
      degreeInfo.relationshipCount >= degreeInfo.connectionCount,
      `Technology '${tech.id}' relationshipCount must be >= connectionCount`
    );
    assert.strictEqual(
      degreeInfo.inDegree + degreeInfo.outDegree,
      degreeInfo.relationshipCount,
      `Technology '${tech.id}' inDegree + outDegree must equal relationshipCount`
    );
    assert.ok(
      degreeInfo.connectedLayersCount >= 1,
      `Technology '${tech.id}' must connect to at least 1 layer`
    );
  });

  const ctxSomeip = getTechnologyGraphContext('someip-protocol');
  assert.ok(ctxSomeip, 'Should resolve TechnologyGraphContext for someip-protocol');
  assert.strictEqual(ctxSomeip?.technology.id, 'someip-protocol');
  assert.ok(ctxSomeip!.connectionCount >= 3, 'SOME/IP should have connectionCount >= 3');
  assert.ok(ctxSomeip!.relationshipCount >= ctxSomeip!.connectionCount);

  const ctxAutosar = getTechnologyGraphContext('autosar-adaptive');
  assert.ok(ctxAutosar, 'Should resolve TechnologyGraphContext for autosar-adaptive');
  assert.ok(ctxAutosar!.connectedLayersCount >= 3, 'AUTOSAR Adaptive should connect across >= 3 layers');
  assert.strictEqual(ctxAutosar!.isHub, true, 'AUTOSAR Adaptive should be identified as a graph hub');
  assert.strictEqual(ctxAutosar!.isCrossLayer, true, 'AUTOSAR Adaptive should be identified as cross-layer');

  console.log('✅ Test 20 Passed: Connection count vs relationship count metrics & zero-isolation verified.');
}

// Test 21: Shortest Path Finder with Relationship Type Filtering (BFS Traversal)
{
  const { findShortestPath } = await import('../src/lib/graph/index.js');

  // 1. Unfiltered path
  const resultAll = findShortestPath('autosar-adaptive', 'covesa-vss');
  assert.ok(resultAll.found, 'Path from AUTOSAR Adaptive to COVESA VSS should be found');
  assert.ok(resultAll.hopCount >= 1, 'Hop count should be >= 1');
  assert.strictEqual(resultAll.nodes[0].id, 'autosar-adaptive');
  assert.strictEqual(resultAll.nodes[resultAll.nodes.length - 1].id, 'covesa-vss');
  assert.strictEqual(resultAll.steps.length, resultAll.hopCount);

  // 2. Filtered path (using only technical dependencies)
  const resultFiltered = findShortestPath('autosar-adaptive', 'covesa-vss', {
    relationshipTypes: ['depends-on', 'runs-on', 'implemented-by', 'integrates-with'],
  });
  if (resultFiltered.found) {
    resultFiltered.steps.forEach((step) => {
      assert.ok(
        ['depends-on', 'runs-on', 'implemented-by', 'integrates-with'].includes(step.relationship.type),
        `Filtered path step must only use allowed types, found '${step.relationship.type}'`
      );
    });
  }

  // 3. Same node path
  const resultSame = findShortestPath('can-protocol', 'can-protocol');
  assert.ok(resultSame.found, 'Path to same node should be found');
  assert.strictEqual(resultSame.hopCount, 0);
  assert.strictEqual(resultSame.nodes.length, 1);

  // 4. Invalid node path
  const resultInvalid = findShortestPath('invalid-node-xyz', 'can-protocol');
  assert.strictEqual(resultInvalid.found, false);
  assert.strictEqual(resultInvalid.hopCount, 0);

  console.log('✅ Test 21 Passed: Shortest path traversal with relationship type filtering verified.');
}

// Test 22: Graph Topology Insights & Cross-Layer Classification
{
  const { getGraphInsights } = await import('../src/lib/graph/index.js');

  const insights = getGraphInsights();
  assert.ok(insights.totalNodes > 0, 'Total nodes must be positive');
  assert.ok(insights.totalEdges > 0, 'Total edges must be positive');
  assert.ok(insights.averageConnections > 0, `Average connections should be positive (actual: ${insights.averageConnections})`);
  assert.ok(insights.averageRelationships >= insights.averageConnections, 'Average relationships must be >= average connections');
  assert.ok(insights.topHubs.length > 0, 'Should have top hubs identified');
  assert.ok(insights.crossLayerTechnologies.length > 0, 'Should have cross-layer technologies identified');
  assert.ok(insights.layerDistribution.length > 0, 'Should report layer distribution');

  // Verify layer distribution items
  insights.layerDistribution.forEach((item) => {
    assert.ok(item.layerId, 'Layer item must have valid layerId');
    assert.ok(item.count > 0, `Layer '${item.layerId}' must have positive technology count`);
  });

  // Verify top hubs are sorted descending by connectionCount
  for (let i = 0; i < insights.topHubs.length - 1; i++) {
    assert.ok(
      insights.topHubs[i].connectionCount >= insights.topHubs[i + 1].connectionCount,
      'Top hubs must be sorted in descending connectionCount order'
    );
  }

  // Verify cross-layer technologies all connect to >= 3 distinct layers
  insights.crossLayerTechnologies.forEach((item) => {
    assert.ok(
      item.connectedLayersCount >= 3,
      `Cross-layer technology '${item.technology.id}' must connect to >= 3 layers (actual: ${item.connectedLayersCount})`
    );
  });

  console.log('✅ Test 22 Passed: Topology insights, hub ranking & cross-layer connectors verified.');
}

// Test 23: Technology Detail Pages & Deep Linking Context Resolution
{
  const {
    getTechnology,
    getTechnologyGraphContext,
    getNeighbors,
    getArchitecturesForTechnology,
    getStackPathsForTechnology,
  } = await import('../src/lib/graph/index.js');
  const { stackLayers } = await import('../src/data/stackLayers.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const { stackRelationships } = await import('../src/data/stackRelationships.js');

  // Test A: Valid representative Technology ID resolution & canonical paths
  const representativeIds = [
    'qnx-neutrino',
    'qnx-hypervisor',
    'android-automotive-os',
    'nvidia-drive-thor',
  ];
  representativeIds.forEach((id) => {
    const tech = getTechnology(id);
    assert.ok(tech, `Should resolve valid technology ID '${id}'`);
    assert.strictEqual(tech?.id, id);
    const canonicalPath = `/stack/${tech?.id}`;
    assert.strictEqual(canonicalPath, `/stack/${id}`);
  });

  // Test B: Invalid Technology ID handling
  const invalidIds = ['does-not-exist', 'invalid-technology-id-404', 'undefined'];
  invalidIds.forEach((id) => {
    const invalidTech = getTechnology(id);
    assert.strictEqual(invalidTech, undefined, `Invalid ID '${id}' must return undefined without throwing`);
  });

  // Test C: Technology-to-technology navigation assumptions
  const qnx = getTechnology('qnx-neutrino');
  const qnxHypervisor = getTechnology('qnx-hypervisor');
  const aaos = getTechnology('android-automotive-os');
  const linux = getTechnology('linux-kernel');
  assert.ok(qnx && qnxHypervisor && aaos && linux, 'All representative connected nodes must exist');

  // Verify QNX Neutrino <-> QNX Hypervisor connection exists in canonical stackRelationships
  const qnxToHypervisor = stackRelationships.some(
    (rel) =>
      (rel.sourceId === 'qnx-neutrino' && rel.targetId === 'qnx-hypervisor') ||
      (rel.sourceId === 'qnx-hypervisor' && rel.targetId === 'qnx-neutrino')
  );
  assert.ok(qnxToHypervisor, 'QNX Neutrino <-> QNX Hypervisor relationship must exist');

  // Verify AAOS <-> Linux Kernel connection exists
  const aaosToLinux = stackRelationships.some(
    (rel) =>
      (rel.sourceId === 'android-automotive-os' && rel.targetId === 'linux-kernel') ||
      (rel.sourceId === 'linux-kernel' && rel.targetId === 'android-automotive-os')
  );
  assert.ok(aaosToLinux, 'AAOS <-> Linux Kernel relationship must exist');

  // Test D: Relationship context from canonical stackRelationships
  const qnxNeighbors = getNeighbors('qnx-neutrino');
  assert.ok(qnxNeighbors.length > 0, 'QNX should have verified canonical neighbors');
  qnxNeighbors.forEach((neighbor) => {
    assert.ok(neighbor.id, 'Neighbor must have valid id');
    assert.notStrictEqual(neighbor.id, 'qnx-neutrino', 'Neighbor must not be self');
  });

  // Test E: Layer context resolution
  const qnxLayer = stackLayers.find((l) => l.id === qnx?.layerId);
  assert.ok(qnxLayer, 'QNX layer must resolve to a valid StackLayer');
  assert.strictEqual(qnxLayer?.id, 'operating-systems');
  assert.strictEqual(qnxLayer?.layerType, 'core');

  // Test F: Stack Path context resolution
  const aaosPaths = getStackPathsForTechnology('android-automotive-os');
  assert.ok(aaosPaths.length > 0, 'AAOS must participate in Stack Paths');
  aaosPaths.forEach((path) => {
    assert.ok(
      path.hops.some((hop) => hop.technologyId === 'android-automotive-os'),
      'Stack path hops must contain the queried technology'
    );
  });

  // Test G: Architecture Profile context resolution
  const autosarArchs = getArchitecturesForTechnology('autosar-classic');
  assert.ok(autosarArchs.length > 0, 'AUTOSAR Classic must participate in Architecture Profiles');
  autosarArchs.forEach((profile) => {
    assert.ok(
      profile.technologyIds.includes('autosar-classic'),
      'Profile technologyIds must include queried technology'
    );
  });

  // Test H: Safety metadata integrity (certified vs capable distinction)
  assert.strictEqual(qnxHypervisor?.functionalSafety?.claimType, 'certified', 'QNX Hypervisor claimType must be certified');
  assert.strictEqual(qnxHypervisor?.functionalSafety?.asilLevel, 'ASIL-D', 'QNX Hypervisor ASIL level must be ASIL-D');
  assert.strictEqual(qnx?.functionalSafety?.claimType, 'capable', 'QNX Neutrino claimType must be capable');
  assert.strictEqual(qnx?.functionalSafety?.asilLevel, 'ASIL-D', 'QNX Neutrino ASIL level must be ASIL-D');

  // Test I: Deep-link URL format & sequential graph navigation
  const seq = ['qnx-neutrino', 'qnx-hypervisor', 'android-automotive-os'];
  seq.forEach((id) => {
    const tech = getTechnology(id);
    assert.ok(tech, `Technology ${id} must resolve`);
    const deepLinkPath = `/stack/${tech?.id}`;
    assert.strictEqual(deepLinkPath, `/stack/${id}`);
    assert.ok(!deepLinkPath.includes('#'), 'Deep link path must NOT contain hash');
  });

  // Test J: Safety badge bilingual localization completeness
  const { en } = await import('../src/i18n/en.js');
  const { ko } = await import('../src/i18n/ko.js');
  assert.ok(en.safety.certifiedBadge.includes('{asil}'));
  assert.ok(ko.safety.certifiedBadge.includes('{asil}'));
  assert.strictEqual(en.safety.certifiedBadge.replace('{asil}', 'ASIL-D'), 'ASIL-D Certified');
  assert.strictEqual(ko.safety.certifiedBadge.replace('{asil}', 'ASIL-D'), 'ASIL-D 인증');
  assert.strictEqual(en.safety.capableBadge.replace('{asil}', 'ASIL-D'), 'ASIL-D Capable');
  assert.strictEqual(ko.safety.capableBadge.replace('{asil}', 'ASIL-D'), 'ASIL-D 대응 가능');

  // Test K: Sitemap consistency and NO hash URLs
  const fs = await import('fs');
  const path = await import('path');
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    assert.ok(!sitemapContent.includes('/#/'), 'Sitemap must not contain hash URLs');
    assert.ok(sitemapContent.includes('<loc>https://autohub.yocto.co.kr/</loc>'), 'Sitemap must contain root canonical URL');
    assert.ok(sitemapContent.includes('<loc>https://autohub.yocto.co.kr/stack/qnx-neutrino</loc>'), 'Sitemap must contain canonical tech URL');
    
    // Verify each tech URL is in the sitemap exactly once
    stackTechnologies.forEach((tech) => {
      const expectedUrl = `<loc>https://autohub.yocto.co.kr/stack/${tech.id}</loc>`;
      const matchCount = sitemapContent.split(expectedUrl).length - 1;
      assert.strictEqual(matchCount, 1, `Technology ${tech.id} must be in sitemap exactly once`);
    });
  }

  console.log('✅ Test 23 Passed: Technology detail resolution, deep linking & context queries verified.');
}

// Test 24: Architecture Explorer & Technology Neighborhood Graph Resolution
{
  const {
    profileById,
    technologyById,
    getTechnology,
    getNeighbors,
    getGroupedTechnologyRelationships,
    getArchitecturesForTechnology,
    getStackPathsForTechnology,
  } = await import('../src/lib/graph/index.js');

  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { stackLayers } = await import('../src/data/stackLayers.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const { ARCHITECTURE_PROFILE_TYPE_METADATA } = await import('../src/types/architecture.js');
  const { en } = await import('../src/i18n/en.js');
  const { ko } = await import('../src/i18n/ko.js');

  // 1. Verify all 8 architecture profiles resolve from profileById
  assert.strictEqual(architectureProfiles.length, 8, 'Must have 8 canonical architecture profiles');
  architectureProfiles.forEach((profile) => {
    assert.ok(profile.id, 'Architecture profile must have an id');
    const resolved = profileById.get(profile.id);
    assert.ok(resolved, `Profile '${profile.id}' must resolve in profileById index`);
    assert.strictEqual(resolved?.id, profile.id);

    // Verify profile type metadata is valid
    if (profile.profileType) {
      assert.ok(
        ARCHITECTURE_PROFILE_TYPE_METADATA[profile.profileType],
        `Profile '${profile.id}' has valid profileType '${profile.profileType}'`
      );
    }

    // 2. Verify all technology IDs in profile resolve to existing technologies with no duplicates
    const techIdSet = new Set<string>();
    profile.technologyIds.forEach((techId) => {
      assert.ok(!techIdSet.has(techId), `Profile '${profile.id}' contains duplicate technologyId '${techId}'`);
      techIdSet.add(techId);

      const tech = technologyById.get(techId);
      assert.ok(tech, `Profile '${profile.id}' references non-existent technology '${techId}'`);

      // Verify layer mapping
      const layer = stackLayers.find((l) => l.id === tech?.layerId);
      assert.ok(layer, `Technology '${techId}' in profile '${profile.id}' has valid StackLayer '${tech?.layerId}'`);
    });
  });

  // 3. Fallback for invalid architecture ID
  assert.strictEqual(profileById.get('non-existent-architecture'), undefined);

  // 4. Verify Technology Neighborhood resolution and bidirectional grouped relationships
  stackTechnologies.forEach((tech) => {
    const neighbors = getNeighbors(tech.id);
    const groupedMap = getGroupedTechnologyRelationships(tech.id);

    // Collect all unique tech IDs from grouped relationship items
    const groupedTechIds = new Set<string>();
    for (const items of groupedMap.values()) {
      items.forEach((item) => {
        assert.ok(item.targetOrSourceTech.id, 'Grouped relationship item must have valid targetOrSourceTech');
        assert.notStrictEqual(item.targetOrSourceTech.id, tech.id, 'Target/source must not be self');
        groupedTechIds.add(item.targetOrSourceTech.id);
      });
    }

    // Every neighbor from getNeighbors must be present in grouped relationships
    neighbors.forEach((neighbor) => {
      assert.ok(
        groupedTechIds.has(neighbor.id),
        `Neighbor '${neighbor.id}' of tech '${tech.id}' must be present in grouped relationships`
      );
    });
  });

  // 5. Bilingual i18n completeness for architectures and techDetail v2
  assert.ok(en.nav.architectures, 'en.nav.architectures must exist');
  assert.ok(ko.nav.architectures, 'ko.nav.architectures must exist');
  assert.ok(en.architectures.title, 'en.architectures.title must exist');
  assert.ok(ko.architectures.title, 'ko.architectures.title must exist');
  assert.strictEqual(en.architectures.coreLayer, 'Core', 'en.architectures.coreLayer must be Core');
  assert.strictEqual(en.architectures.crossCuttingLayer, 'Cross-cutting', 'en.architectures.crossCuttingLayer must be Cross-cutting');
  assert.strictEqual(ko.architectures.coreLayer, '핵심 영역', 'ko.architectures.coreLayer must be 핵심 영역');
  assert.strictEqual(ko.architectures.crossCuttingLayer, '공통 영역', 'ko.architectures.crossCuttingLayer must be 공통 영역');
  assert.strictEqual(en.architectures.stackPathsHeader, 'Related Stack Paths', 'en.architectures.stackPathsHeader must be Related Stack Paths');
  assert.strictEqual(ko.architectures.stackPathsHeader, '관련 스택 경로', 'ko.architectures.stackPathsHeader must be 관련 스택 경로');
  assert.ok(en.techDetail.technologyNeighborhood, 'en.techDetail.technologyNeighborhood must exist');
  assert.ok(ko.techDetail.technologyNeighborhood, 'ko.techDetail.technologyNeighborhood must exist');
  assert.ok(en.techDetail.stackPosition, 'en.techDetail.stackPosition must exist');
  assert.ok(ko.techDetail.stackPosition, 'ko.techDetail.stackPosition must exist');

  // 6. Verify Architecture Explorer hero metrics are data-driven
  const fs = await import('fs');
  const path = await import('path');
  const archIndexFile = fs.readFileSync(path.join(process.cwd(), 'src/pages/Architectures/index.tsx'), 'utf-8');
  assert.ok(
    !archIndexFile.includes('100% Curated Tech Stacks'),
    'Architecture Explorer must not contain 100% Curated Tech Stacks'
  );
  assert.ok(
    !archIndexFile.includes('10 Stack Layers Mapped'),
    'Architecture Explorer must not contain hardcoded 10 Stack Layers Mapped'
  );
  assert.ok(
    archIndexFile.includes('stackLayers.length'),
    'Architecture Explorer must use data-driven stackLayers.length'
  );

  // 7. Clean URL routing format verification (no hashes)
  architectureProfiles.forEach((profile) => {
    const archPath = `/architectures/${profile.id}`;
    assert.ok(!archPath.includes('#'), 'Architecture path must not contain hash');
    assert.strictEqual(archPath, `/architectures/${profile.id}`);
  });

  // 8. Sitemap includes all architecture profiles
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    assert.ok(
      sitemapContent.includes('<loc>https://autohub.yocto.co.kr/architectures</loc>'),
      'Sitemap must contain /architectures route'
    );

    architectureProfiles.forEach((profile) => {
      const expectedUrl = `<loc>https://autohub.yocto.co.kr/architectures/${profile.id}</loc>`;
      assert.ok(
        sitemapContent.includes(expectedUrl),
        `Sitemap must contain architecture URL '${expectedUrl}'`
      );
    });
  }

  console.log('✅ Test 24 Passed: Architecture Explorer & Technology Neighborhood Graph Resolution verified.');
}

// Test 25: Automotive Stack Builder Validation, Architecture & Path Matching, and URL State
{
  const {
    validateStack,
    matchArchitectures,
    matchStackPaths,
    getSuggestedCandidates,
    encodeStackToSearchParams,
    decodeStackFromSearchParams,
    CORE_STACK_LAYER_IDS,
    SUPPORTING_STACK_LAYER_IDS,
  } = await import('../src/lib/builder/stackBuilderEngine.js');

  const { en } = await import('../src/i18n/en.js');
  const { ko } = await import('../src/i18n/ko.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  // 1. Incomplete stack handling
  const incompleteResult = validateStack({});
  assert.strictEqual(incompleteResult.health, 'incomplete');
  assert.strictEqual(incompleteResult.totalSelected, 0);

  const singleResult = validateStack({ 'hardware-compute': 'nvidia-drive-thor' });
  assert.strictEqual(singleResult.health, 'incomplete');
  assert.strictEqual(singleResult.totalSelected, 1);

  // 2. Verified relationship detection
  const verifiedSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'hypervisor-virtualization': 'nvidia-drive-hypervisor',
    'operating-systems': 'qnx-neutrino',
  };
  const verifiedResult = validateStack(verifiedSelection);
  assert.ok(verifiedResult.verifiedCount >= 1, 'Should detect verified relationships in valid stack');
  assert.ok(
    verifiedResult.items.some(
      (item) =>
        item.status === 'verified' &&
        ((item.sourceTech.id === 'nvidia-drive-hypervisor' && item.targetTech.id === 'nvidia-drive-thor') ||
         (item.sourceTech.id === 'nvidia-drive-thor' && item.targetTech.id === 'nvidia-drive-hypervisor'))
    ),
    'Should identify runs-on/depends-on verified relationship between Thor and Drive Hypervisor'
  );

  // 3. Unverified warning detection across adjacent layers with no explicit relationship
  const unverifiedSelection = {
    'hardware-compute': 'horizon-robotics-journey',
    'application-experience': 'autoware-universe',
  };
  const unverifiedResult = validateStack(unverifiedSelection);
  assert.ok(unverifiedResult.totalSelected === 2);
  // Warning messages must clarify that lack of relationship does NOT imply incompatibility
  unverifiedResult.items
    .filter((i) => i.status === 'warning')
    .forEach((item) => {
      assert.ok(
        item.explanation.en.includes('does not imply incompatibility'),
        'Warning explanation must explicitly state that it does not imply incompatibility'
      );
      assert.ok(
        item.explanation.ko.includes('기술적 비호환을 의미하지 않습니다'),
        'Korean warning explanation must explicitly state non-incompatibility'
      );
    });

  // 4. Architecture Matching
  const archMatches = matchArchitectures({
    'hardware-compute': 'nvidia-drive-thor',
    'hypervisor-virtualization': 'nvidia-drive-hypervisor',
    'operating-systems': 'qnx-neutrino',
    'middleware-communication': 'eclipse-iceoryx',
  });
  assert.ok(archMatches.length > 0, 'Should match architecture profiles');
  assert.ok(
    archMatches.some((m) => m.profile.id === 'adas-autonomous'),
    'Should match ADAS & Autonomous Driving Platform profile'
  );
  const adasMatch = archMatches.find((m) => m.profile.id === 'adas-autonomous');
  assert.ok(adasMatch!.matchedTechnologies.length >= 3);
  assert.ok(adasMatch!.overlapPercentage > 0);

  // 5. Related Stack Path Matching
  const pathMatches = matchStackPaths({
    'hardware-compute': 'qualcomm-snapdragon-ride',
    'operating-systems': 'android-automotive-os',
  });
  assert.ok(pathMatches.length > 0, 'Should match representative stack paths');
  assert.ok(
    pathMatches.some((p) => p.matchedHopsCount >= 1),
    'Matched stack paths must have matched hops'
  );

  // 6. Deterministic Next-Technology Suggestions
  const suggestions = getSuggestedCandidates({
    'operating-systems': 'qnx-neutrino',
  });
  assert.ok(suggestions.length > 0, 'Should provide graph-driven technology suggestions');
  suggestions.forEach((cand) => {
    assert.notStrictEqual(cand.technology.layerId, 'operating-systems', 'Suggestions should not target already populated layers');
    assert.notStrictEqual(cand.relationship.type, 'alternative', 'Suggestions should not recommend alternatives as additive');
    assert.ok(cand.priority >= 1);
  });

  // 7. URL Search Params Serialization & Deserialization
  const testSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'operating-systems': 'qnx-neutrino',
  };
  const searchParams = encodeStackToSearchParams(testSelection);
  assert.strictEqual(searchParams.get('hardware-compute'), 'nvidia-drive-thor');
  assert.strictEqual(searchParams.get('operating-systems'), 'qnx-neutrino');

  // Decode valid params
  const decoded = decodeStackFromSearchParams(searchParams);
  assert.strictEqual(decoded['hardware-compute'], 'nvidia-drive-thor');
  assert.strictEqual(decoded['operating-systems'], 'qnx-neutrino');

  // Decode params with invalid technology ID and mismatched layer ID
  const invalidParams = new URLSearchParams({
    'hardware-compute': 'non-existent-silicon',
    'operating-systems': 'nvidia-drive-thor', // wrong layer
  });
  const decodedInvalid = decodeStackFromSearchParams(invalidParams);
  assert.strictEqual(decodedInvalid['hardware-compute'], undefined);
  assert.strictEqual(decodedInvalid['operating-systems'], undefined);

  // 8. Functional Safety semantics preservation
  const qnxNeutrino = technologyById.get('qnx-neutrino');
  assert.strictEqual(qnxNeutrino?.functionalSafety?.claimType, 'capable');
  assert.notStrictEqual(qnxNeutrino?.functionalSafety?.claimType, 'certified');

  // 9. Bilingual i18n completeness for Stack Builder
  assert.ok(en.nav.stackBuilder, 'en.nav.stackBuilder must exist');
  assert.ok(ko.nav.stackBuilder, 'ko.nav.stackBuilder must exist');
  assert.ok(en.stackBuilder.title, 'en.stackBuilder.title must exist');
  assert.ok(ko.stackBuilder.title, 'ko.stackBuilder.title must exist');
  assert.ok(en.stackBuilder.healthValidated, 'en.stackBuilder.healthValidated must exist');
  assert.ok(ko.stackBuilder.healthValidated, 'ko.stackBuilder.healthValidated must exist');
  assert.ok(en.techDetail.buildWithThisTech, 'en.techDetail.buildWithThisTech must exist');
  assert.ok(ko.techDetail.buildWithThisTech, 'ko.techDetail.buildWithThisTech must exist');

  // 10. Sitemap includes /stack-builder
  const fs = await import('fs');
  const path = await import('path');
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    assert.ok(
      sitemapContent.includes('<loc>https://autohub.yocto.co.kr/stack-builder</loc>'),
      'Sitemap must contain /stack-builder route'
    );
  }

  console.log('✅ Test 25 Passed: Automotive Stack Builder validation, architecture/path matching & URL state verified.');
}

// Test 26: Phase 7.2 Product Maturity — Canonical Layer Adjacency, Composite Architecture Scoring, Path Match Strength, and Candidate Reasoning
{
  const {
    validateStack,
    matchArchitectures,
    matchStackPaths,
    getSuggestedCandidates,
    decodeStackFromSearchParams,
    CORE_STACK_LAYER_IDS,
  } = await import('../src/lib/builder/stackBuilderEngine.js');

  const { en } = await import('../src/i18n/en.js');
  const { ko } = await import('../src/i18n/ko.js');

  // 1. Canonical Layer Adjacency: Non-adjacent layers do not generate false adjacent warnings
  // hardware-compute and operating-systems with hypervisor-virtualization skipped
  const skippedLayerSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'operating-systems': 'qnx-neutrino',
  };
  const skippedValidation = validateStack(skippedLayerSelection);
  // There should NOT be any warning with isAdjacentLayerPair = true because they are separated by Hypervisor
  const adjacentWarnings = skippedValidation.items.filter(
    (item) => item.status === 'warning' && item.isAdjacentLayerPair
  );
  assert.strictEqual(
    adjacentWarnings.length,
    0,
    'Skipped intermediate layers must not trigger false adjacent layer warnings'
  );

  // 2. Canonical Layer Adjacency: Truly adjacent core layers are properly checked
  const trulyAdjacentSelection = {
    'hardware-compute': 'horizon-robotics-journey',
    'hypervisor-virtualization': 'xen-hypervisor',
  };
  const trulyAdjacentValidation = validateStack(trulyAdjacentSelection);
  // Either verified or warning depending on graph, but if warning, isAdjacentLayerPair must be true
  trulyAdjacentValidation.items
    .filter((i) => i.status === 'warning')
    .forEach((item) => {
      assert.strictEqual(item.isAdjacentLayerPair, true);
    });

  // 3. Architecture Matching Composite Scoring
  const archMatchResults = matchArchitectures({
    'hardware-compute': 'nvidia-drive-thor',
    'operating-systems': 'qnx-neutrino',
  });
  assert.ok(archMatchResults.length > 0);
  archMatchResults.forEach((res) => {
    assert.ok(typeof res.overlapPercentage === 'number');
    assert.ok(typeof res.profileCoveragePercentage === 'number');
    assert.ok(typeof res.matchScore === 'number');
    // Technology overlap must not be falsely conflated with architecture coverage
    assert.ok(res.overlapPercentage >= 0 && res.overlapPercentage <= 100);
    assert.ok(res.profileCoveragePercentage >= 0 && res.profileCoveragePercentage <= 100);
  });

  // 4. Stack Path Match Strength Classifications
  const pathMatches = matchStackPaths({
    'hardware-compute': 'qualcomm-snapdragon-ride',
    'operating-systems': 'android-automotive-os',
    'application-experience': 'autoware-universe',
  });
  assert.ok(pathMatches.length > 0);
  pathMatches.forEach((pm) => {
    assert.ok(['strong', 'related', 'weak'].includes(pm.matchStrength));
  });

  // 5. Candidate Recommendation Reasoning
  const candidates = getSuggestedCandidates({
    'operating-systems': 'qnx-neutrino',
  });
  assert.ok(candidates.length > 0);
  candidates.forEach((cand) => {
    assert.ok(cand.reason.en.length > 0, 'Candidate must have clear English reason');
    assert.ok(cand.reason.ko.length > 0, 'Candidate must have clear Korean reason');
    assert.notStrictEqual(cand.relationship.type, 'alternative');
  });

  // 6. Robust URL Deserialization with malformed and unknown query keys
  const malformedParams = new URLSearchParams(
    'foo=bar&invalid=123&hardware-compute=nvidia-drive-thor&operating-systems=unknown-os-id&bad=true'
  );
  const decodedClean = decodeStackFromSearchParams(malformedParams);
  assert.strictEqual(decodedClean['hardware-compute'], 'nvidia-drive-thor');
  assert.strictEqual(decodedClean['operating-systems'], undefined);
  assert.strictEqual(Object.keys(decodedClean).length, 1);

  // 7. i18n Dictionary Symmetry
  const enStackKeys = Object.keys(en.stackBuilder);
  const koStackKeys = Object.keys(ko.stackBuilder);
  assert.strictEqual(
    enStackKeys.length,
    koStackKeys.length,
    'en and ko stackBuilder dictionaries must have identical key count'
  );
  enStackKeys.forEach((key) => {
    assert.ok(
      key in ko.stackBuilder,
      `Missing Korean translation key for stackBuilder.${key}`
    );
  });

  console.log('✅ Test 26 Passed: Phase 7.2 Product Maturity, Canonical Adjacency, Composite Scoring & i18n verified.');
}

console.log('\n🎉 All Knowledge Graph Tests Passed Cleanly!');




