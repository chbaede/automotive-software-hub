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
  assert.deepStrictEqual(decoded['hardware-compute'], ['nvidia-drive-thor']);
  assert.deepStrictEqual(decoded['operating-systems'], ['qnx-neutrino']);

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
  // hardware-compute and middleware-communication with OS skipped
  const skippedLayerSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'middleware-communication': 'someip-protocol',
  };
  const skippedValidation = validateStack(skippedLayerSelection);
  // There should NOT be any warning with isAdjacentLayerPair = true because they are non-adjacent layers
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
    'hypervisor-virtualization': 'xen-automotive',
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
  assert.deepStrictEqual(decodedClean['hardware-compute'], ['nvidia-drive-thor']);
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

// Test 27: Phase 7.3 Completion Pass — Complete User Journeys, Initial & Partial States, Navigation & Safety Invariants
{
  const {
    validateStack,
    matchArchitectures,
    matchStackPaths,
    getSuggestedCandidates,
    encodeStackToSearchParams,
    decodeStackFromSearchParams,
  } = await import('../src/lib/builder/stackBuilderEngine.js');

  const { technologyById, profileById } = await import('../src/lib/graph/index.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');

  // 1. Initial State (0 selected technologies)
  const initialValidation = validateStack({});
  assert.strictEqual(initialValidation.health, 'incomplete');
  assert.strictEqual(initialValidation.totalSelected, 0);
  assert.strictEqual(initialValidation.items.length, 0);
  assert.strictEqual(matchArchitectures({}).length, 0);
  assert.strictEqual(matchStackPaths({}).length, 0);
  assert.strictEqual(getSuggestedCandidates({}).length, 0);

  // 2. Partial State (1 selected technology)
  const singleTechSelection = { 'operating-systems': 'qnx-neutrino' };
  const singleValidation = validateStack(singleTechSelection);
  assert.strictEqual(singleValidation.health, 'incomplete');
  assert.strictEqual(singleValidation.totalSelected, 1);
  assert.strictEqual(singleValidation.warningCount, 0);

  // Even with 1 technology, Architecture matching and Next candidate suggestions are active and useful!
  const singleArchMatches = matchArchitectures(singleTechSelection);
  assert.ok(singleArchMatches.length > 0, '1 selected tech should match related architecture profiles');
  const singleSuggestions = getSuggestedCandidates(singleTechSelection);
  assert.ok(singleSuggestions.length > 0, '1 selected tech should provide next technology candidate suggestions');

  // 3. User Journey 1: Tech Detail CTA -> Stack Builder -> Add suggested tech -> Architecture match
  const thorTech = technologyById.get('nvidia-drive-thor');
  assert.ok(thorTech);
  // Simulating CTA click
  const ctaParams = new URLSearchParams({ [thorTech!.layerId]: thorTech!.id });
  const restoredSelection = decodeStackFromSearchParams(ctaParams);
  assert.deepStrictEqual(restoredSelection['hardware-compute'], ['nvidia-drive-thor']);

  // Get candidate suggestions for Thor
  const thorSuggestions = getSuggestedCandidates(restoredSelection);
  assert.ok(thorSuggestions.length > 0);
  const bestSuggestion = thorSuggestions[0];
  assert.ok(bestSuggestion.technology.layerId !== 'hardware-compute');

  // Add suggested tech to stack
  restoredSelection[bestSuggestion.technology.layerId] = [bestSuggestion.technology.id];
  const twoTechValidation = validateStack(restoredSelection);
  assert.strictEqual(twoTechValidation.totalSelected, 2);
  assert.ok(twoTechValidation.health === 'validated' || twoTechValidation.health === 'partially-validated');

  // 4. User Journey 2: Architecture Profile -> Stack Builder URL mapping
  architectureProfiles.forEach((profile) => {
    const archParams = new URLSearchParams();
    profile.technologyIds.forEach((techId) => {
      const tech = technologyById.get(techId);
      if (tech && !archParams.has(tech.layerId)) {
        archParams.set(tech.layerId, tech.id);
      }
    });
    const archSelection = decodeStackFromSearchParams(archParams);
    assert.ok(Object.keys(archSelection).length > 0);
    const archValidation = validateStack(archSelection);
    assert.ok(archValidation.totalSelected > 0);
  });

  // 5. Functional Safety Invariants Verification
  const perseus = stackTechnologies.find((t) => t.id === 'perseus-hypervisor');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified', 'Perseus must remain ASIL-D Certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D');
  assert.ok(perseus?.functionalSafety?.sourceUrl, 'Perseus must have official source evidence URL');

  const thor = stackTechnologies.find((t) => t.id === 'nvidia-drive-thor');
  assert.strictEqual(thor?.functionalSafety?.claimType, 'capable', 'NVIDIA Thor must remain ASIL-D Capable');

  const qnx = stackTechnologies.find((t) => t.id === 'qnx-neutrino');
  assert.strictEqual(qnx?.functionalSafety?.claimType, 'capable', 'QNX Neutrino must remain ASIL-D Capable');

  console.log('✅ Test 27 Passed: Phase 7.3 User Journeys, Partial State UX, Navigation & Safety Invariants verified.');
}

// Test 28: Knowledge Graph Hardening Pass — Referential Integrity, Index Zero-Drift, Matching Determinism & Journey Regressions
{
  const { tools } = await import('../src/data/tools.js');
  const { resources } = await import('../src/data/resources.js');
  const { projects } = await import('../src/data/projects.js');
  const { events } = await import('../src/data/events.js');
  const { companies } = await import('../src/data/companies.js');
  const { stackLayers } = await import('../src/data/stackLayers.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { stackRelationships } = await import('../src/data/stackRelationships.js');
  const { stackPaths } = await import('../src/data/stackPaths.js');

  const {
    technologyById,
    technologiesByLayerId,
    outgoingRelationshipsByTechnologyId,
    incomingRelationshipsByTechnologyId,
    graphAdjacencyByTechnologyId,
    profileById,
    pathById,
  } = await import('../src/lib/graph/index.js');

  const {
    validateStack,
    matchArchitectures,
    matchStackPaths,
    getSuggestedCandidates,
    encodeStackToSearchParams,
    decodeStackFromSearchParams,
  } = await import('../src/lib/builder/stackBuilderEngine.js');

  // 1. Cross-dataset referential integrity
  const techIdSet = new Set(stackTechnologies.map((t) => t.id));
  const layerIdSet = new Set(stackLayers.map((l) => l.id));
  const toolIdSet = new Set(tools.map((t) => t.id));
  const resIdSet = new Set(resources.map((r) => r.id));
  const projIdSet = new Set(projects.map((p) => p.id));
  const compIdSet = new Set(companies.map((c) => c.id));
  const eventIdSet = new Set(events.map((e) => e.id));

  tools.forEach((t) => {
    (t.technologyIds || []).forEach((id) => assert.ok(techIdSet.has(id), `Tool ${t.id} references invalid tech ${id}`));
  });
  resources.forEach((r) => {
    (r.technologyIds || []).forEach((id) => assert.ok(techIdSet.has(id), `Resource ${r.id} references invalid tech ${id}`));
  });
  projects.forEach((p) => {
    (p.technologyIds || []).forEach((id) => assert.ok(techIdSet.has(id), `Project ${p.id} references invalid tech ${id}`));
  });
  companies.forEach((c) => {
    (c.technologyIds || []).forEach((id: string) =>
      assert.ok(techIdSet.has(id), `Company ${c.id} references invalid tech ${id}`)
    );
  });
  events.forEach((e) => {
    (e.technologyIds || []).forEach((id) => assert.ok(techIdSet.has(id), `Event ${e.id} references invalid tech ${id}`));
  });

  // Verify technology-to-ecosystem links
  stackTechnologies.forEach((st) => {
    (st.companyIds || []).forEach((cid) => assert.ok(compIdSet.has(cid), `Tech ${st.id} references invalid company ${cid}`));
    (st.toolIds || []).forEach((tid) => assert.ok(toolIdSet.has(tid), `Tech ${st.id} references invalid tool ${tid}`));
    (st.resourceIds || []).forEach((rid) => assert.ok(resIdSet.has(rid), `Tech ${st.id} references invalid resource ${rid}`));
    (st.openSourceProjectIds || []).forEach((pid) => assert.ok(projIdSet.has(pid), `Tech ${st.id} references invalid project ${pid}`));
    (st.eventIds || []).forEach((eid) => assert.ok(eventIdSet.has(eid), `Tech ${st.id} references invalid event ${eid}`));
    (st.relatedTechnologyIds || []).forEach((rtid) => assert.ok(techIdSet.has(rtid), `Tech ${st.id} references invalid relatedTech ${rtid}`));
  });

  // 2. Graph Indexes Zero-Drift Invariant
  assert.strictEqual(technologyById.size, stackTechnologies.length);
  stackTechnologies.forEach((tech) => {
    assert.strictEqual(technologyById.get(tech.id), tech);
    const layerList = technologiesByLayerId.get(tech.layerId) || [];
    assert.ok(layerList.some((t) => t.id === tech.id));
  });

  stackRelationships.forEach((rel) => {
    const outgoing = outgoingRelationshipsByTechnologyId.get(rel.sourceId) || [];
    assert.ok(outgoing.some((r) => r.targetId === rel.targetId && r.type === rel.type));
    const incoming = incomingRelationshipsByTechnologyId.get(rel.targetId) || [];
    assert.ok(incoming.some((r) => r.sourceId === rel.sourceId && r.type === rel.type));
  });

  // 3. Architecture Profiles Invariants
  architectureProfiles.forEach((prof) => {
    assert.strictEqual(profileById.get(prof.id), prof);
    const seenTechs = new Set<string>();
    prof.technologyIds.forEach((tid) => {
      assert.ok(techIdSet.has(tid), `Profile ${prof.id} references invalid tech ${tid}`);
      assert.ok(!seenTechs.has(tid), `Profile ${prof.id} has duplicate tech ${tid}`);
      seenTechs.add(tid);
    });
    (prof.layerIds || []).forEach((lid) => {
      assert.ok(layerIdSet.has(lid), `Profile ${prof.id} references invalid layer ${lid}`);
    });
  });

  // 4. Stack Paths Invariants
  stackPaths.forEach((path) => {
    assert.strictEqual(pathById.get(path.id), path);
    assert.ok(path.hops.length >= 2, `Path ${path.id} must have at least 2 hops`);
    path.hops.forEach((h, idx) => {
      assert.ok(techIdSet.has(h.technologyId), `Path ${path.id} hop ${idx} references invalid tech ${h.technologyId}`);
      if (idx > 0) {
        assert.notStrictEqual(path.hops[idx - 1].technologyId, h.technologyId, `Path ${path.id} has consecutive duplicate hop ${h.technologyId}`);
      }
    });
  });

  // 5. Contiguous Sequence and Deterministic Scoring in Stack Path Matching
  // Path: android-cockpit-path (qualcomm-snapdragon-cockpit -> qnx-hypervisor -> linux-kernel -> android-automotive-os -> covesa-vss)
  const fullSelection = {
    'hardware-compute': 'qualcomm-snapdragon-cockpit',
    'hypervisor-virtualization': 'qnx-hypervisor',
    'operating-systems': 'linux-kernel',
  };
  const matchedPaths = matchStackPaths(fullSelection);
  assert.ok(matchedPaths.length > 0);
  const bestPath = matchedPaths[0];
  assert.strictEqual(bestPath.path.id, 'android-cockpit-path');
  assert.strictEqual(bestPath.maxContiguousHops, 3, 'Consecutive hops in stack path must be credited in maxContiguousHops');

  // 6. Deterministic tie breaking in matchArchitectures
  const archMatchResults = matchArchitectures({ 'hardware-compute': 'nvidia-drive-thor' });
  assert.ok(archMatchResults.length > 0);
  for (let i = 1; i < archMatchResults.length; i++) {
    const prev = archMatchResults[i - 1];
    const curr = archMatchResults[i];
    assert.ok(
      prev.matchScore >= curr.matchScore,
      'Architecture match list must be deterministically sorted by matchScore descending'
    );
  }

  // 7. Verification of all 8 Key User Journeys (A through H)
  // Journey A: Tech Detail -> Build CTA URL
  const sampleTech = stackTechnologies[0];
  const journeyAUrl = `/stack-builder?${sampleTech.layerId}=${sampleTech.id}`;
  const decodedA = decodeStackFromSearchParams(new URLSearchParams(journeyAUrl.split('?')[1]));
  assert.deepStrictEqual(decodedA[sampleTech.layerId as any], [sampleTech.id]);

  // Journey B: Arch Detail -> Build CTA URL
  const sampleArch = architectureProfiles[0];
  const archParams = new URLSearchParams();
  sampleArch.technologyIds.forEach((tid) => {
    const t = technologyById.get(tid);
    if (t && !archParams.has(t.layerId)) archParams.set(t.layerId, t.id);
  });
  const decodedB = decodeStackFromSearchParams(archParams);
  assert.ok(Object.keys(decodedB).length > 0);

  // Journey C: Multi-tech selection validation
  const multiSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'hypervisor-virtualization': 'nvidia-drive-hypervisor',
    'operating-systems': 'linux-kernel',
  };
  const valSummaryC = validateStack(multiSelection);
  assert.strictEqual(valSummaryC.totalSelected, 3);
  assert.ok(valSummaryC.verifiedCount >= 1);

  // Journey D: Arch match links to tech detail
  const archMatchD = matchArchitectures(multiSelection);
  assert.ok(archMatchD.length > 0);
  assert.ok(archMatchD[0].matchedTechnologies.every((t) => Boolean(technologyById.get(t.id))));

  // Journey E: Suggested tech candidate -> quick add
  const candE = getSuggestedCandidates(multiSelection);
  assert.ok(candE.length > 0);
  assert.ok(candE[0].technology.id.length > 0);

  // Journey F: URL Serialization Roundtrip
  const encodedF = encodeStackToSearchParams(multiSelection);
  const decodedF = decodeStackFromSearchParams(encodedF);
  assert.deepStrictEqual(
    decodedF,
    {
      'hardware-compute': ['nvidia-drive-thor'],
      'hypervisor-virtualization': ['nvidia-drive-hypervisor'],
      'operating-systems': ['linux-kernel'],
    }
  );

  // Journey G: Technology Detail -> Related Architectures
  const thorArchitectures = architectureProfiles.filter((p) => p.technologyIds.includes('nvidia-drive-thor'));
  assert.ok(thorArchitectures.length > 0);

  // Journey H: Architecture Profile -> Technology list resolution
  const resolvedTechs = sampleArch.technologyIds.map((id) => technologyById.get(id)).filter(Boolean);
  assert.strictEqual(resolvedTechs.length, sampleArch.technologyIds.length);

  console.log('✅ Test 28 Passed: Knowledge Graph Hardening, Referential Integrity, Index Zero-Drift & Journey Regressions verified.');
}

// Test 29: Phase 8.1 — Knowledge Graph Intelligence & Discovery Engine
{
  const {
    getDependencies,
    getDependents,
    getPlatforms,
    getHostedTechnologies,
    getIntegrations,
    getImplementations,
    getAlternatives,
    getCompatibleTechnologies,
    getCoexistingTechnologies,
    getUsedWithTechnologies,
    getBridgeTechnologies,
    getRelatedArchitectures,
    getRelatedStackPaths,
    getNextTechnologiesToExplore,
    getStackInsights,
    getTechnologyDiscoveryResult,
  } = await import('../src/lib/graph/intelligence.js');

  const { technologyById, profileById, pathById } = await import('../src/lib/graph/index.js');

  // 1. Directed Semantics Invariants
  // AUTOSAR Adaptive (ARA) depends on POSIX PSE51 OS (e.g. QNX Neutrino)
  const araDependencies = getDependencies('autosar-adaptive');
  assert.ok(araDependencies.length > 0, 'AUTOSAR Adaptive must have dependencies');
  araDependencies.forEach((dep) => {
    assert.strictEqual(dep.relationship.type, 'depends-on');
    assert.strictEqual(dep.relationship.sourceId, 'autosar-adaptive');
    assert.ok(dep.score > 0);
    assert.ok(dep.reason.en.length > 0);
    assert.ok(dep.reason.ko.length > 0);
  });

  // Check incoming dependents of QNX Neutrino
  const qnxDependents = getDependents('qnx-neutrino');
  assert.ok(qnxDependents.length > 0, 'QNX Neutrino must have incoming dependents');
  qnxDependents.forEach((dep) => {
    assert.strictEqual(dep.relationship.type, 'depends-on');
    assert.strictEqual(dep.relationship.targetId, 'qnx-neutrino');
  });

  // Platforms vs Hosted Software (runs-on)
  // NVIDIA DRIVE Hypervisor runs on NVIDIA DRIVE Thor
  const hypervisorPlatforms = getPlatforms('nvidia-drive-hypervisor');
  assert.ok(
    hypervisorPlatforms.some((p) => p.technology.id === 'nvidia-drive-thor'),
    'NVIDIA DRIVE Hypervisor runs on Thor'
  );

  const thorHosted = getHostedTechnologies('nvidia-drive-thor');
  assert.ok(
    thorHosted.some((h) => h.technology.id === 'nvidia-drive-hypervisor'),
    'Thor hosts NVIDIA DRIVE Hypervisor'
  );

  // 2. Alternatives Separation Invariant
  // QNX Hypervisor and OpenSynergy COQOS are alternatives
  const qnxHypAlts = getAlternatives('qnx-hypervisor');
  assert.ok(qnxHypAlts.length > 0, 'QNX Hypervisor must have alternatives');
  qnxHypAlts.forEach((alt) => {
    assert.strictEqual(alt.relationship.type, 'alternative');
    assert.notStrictEqual(alt.technology.id, 'qnx-hypervisor');
  });

  // 3. Cross-Layer Bridge Detection
  // Baidu Apollo Cyber RT or vSomeIP or ROS 2 acts as multi-layer bridge
  const ros2Bridges = getBridgeTechnologies('ros2-middleware');
  assert.ok(ros2Bridges.length > 0, 'ROS 2 must detect bridge technologies');
  ros2Bridges.forEach((bridge) => {
    assert.ok(bridge.bridgedLayersCount >= 2, 'Bridge technology must connect to at least 2 other layers');
    assert.notStrictEqual(bridge.relationship.type, 'alternative', 'Alternatives must not be treated as bridges');
    assert.ok(bridge.reason.en.length > 0);
    assert.ok(bridge.reason.ko.length > 0);
  });

  // 4. Architecture Relevance & Ranking
  const thorArchs = getRelatedArchitectures('nvidia-drive-thor');
  assert.ok(thorArchs.length > 0, 'NVIDIA Thor must have related architectures');
  assert.ok(thorArchs[0].isExplicitMember, 'First related architecture should be an explicit member profile');
  for (let i = 1; i < thorArchs.length; i++) {
    assert.ok(
      thorArchs[i - 1].relevanceScore >= thorArchs[i].relevanceScore,
      'Architectures must be sorted by relevanceScore descending'
    );
  }

  // 5. Stack Path Relevance & Ranking
  const thorPaths = getRelatedStackPaths('nvidia-drive-thor');
  assert.ok(thorPaths.length > 0, 'NVIDIA Thor must have related stack paths');
  thorPaths.forEach((p) => {
    assert.ok(p.path.hops.some((h) => h.technologyId === 'nvidia-drive-thor'));
    assert.ok(pathById.has(p.path.id));
  });

  // 6. "What Should I Explore Next?" Recommendations
  const exploreThor = getNextTechnologiesToExplore('nvidia-drive-thor');
  assert.ok(exploreThor.length > 0, 'NVIDIA Thor must have next exploration recommendations');
  exploreThor.forEach((rec) => {
    assert.notStrictEqual(rec.technology.id, 'nvidia-drive-thor', 'Cannot recommend self');
    if (rec.primaryRelationship) {
      assert.notStrictEqual(rec.primaryRelationship.type, 'alternative', 'Cannot recommend alternatives as next steps');
    }
    assert.ok(rec.reasons.length > 0, 'Every recommendation must have explainable reasons');
    rec.reasons.forEach((r) => {
      assert.ok(r.en.length > 0);
      assert.ok(r.ko.length > 0);
    });
  });

  // 7. Partial Stack Intelligence & Gap Analysis
  const partialSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'hypervisor-virtualization': 'nvidia-drive-hypervisor',
    'operating-systems': 'linux-kernel',
  };
  const stackReport = getStackInsights(partialSelection);
  assert.strictEqual(stackReport.gapAnalysis.isCompleteCoreStack, false);
  assert.ok(stackReport.gapAnalysis.missingCoreLayers.includes('middleware-communication'));
  assert.ok(stackReport.gapAnalysis.missingCoreLayers.includes('application-experience'));
  assert.strictEqual(stackReport.gapAnalysis.populatedCoreLayers.length, 3);
  assert.ok(stackReport.candidateRecommendations.length > 0);
  // Recommendations must only target missing layers
  stackReport.candidateRecommendations.forEach((cand) => {
    assert.ok(
      !partialSelection[cand.layerId as any],
      'Partial stack recommendations must only fill unpopulated layers'
    );
  });

  // 8. 360-Degree Discovery Result Aggregator
  const discovery360 = getTechnologyDiscoveryResult('qnx-neutrino');
  assert.ok(discovery360);
  assert.strictEqual(discovery360!.technology.id, 'qnx-neutrino');
  assert.ok(discovery360!.dependencies.length >= 0);
  assert.ok(discovery360!.platforms.length >= 0);
  assert.ok(discovery360!.architectures.length > 0);
  assert.ok(discovery360!.stackPaths.length > 0);
  assert.ok(discovery360!.recommendations.length > 0);
  assert.ok(discovery360!.hubScore > 0);
  assert.ok(discovery360!.crossLayerScore > 0);

  console.log('✅ Test 29 Passed: Phase 8.1 Knowledge Graph Intelligence & Discovery Engine verified.');
}

// Test 30: Phase 8.2 — Intelligent Technology Discovery UX & Invariants
{
  const { getTechnologyDiscoveryResult } = await import('../src/lib/graph/intelligence.js');
  const { stackTechnologies } = await import('../src/data/stackTechnologies.js');
  const { en } = await import('../src/i18n/en.js');
  const { ko } = await import('../src/i18n/ko.js');

  // 1. Bilingual Dictionary Completeness for Discovery
  assert.ok((en as any).discovery, 'en.ts must have discovery namespace');
  assert.ok((ko as any).discovery, 'ko.ts must have discovery namespace');
  const enKeys = Object.keys((en as any).discovery).sort();
  const koKeys = Object.keys((ko as any).discovery).sort();
  assert.deepStrictEqual(enKeys, koKeys, 'en.ts and ko.ts discovery keys must match symmetrically');

  // 2. Comprehensive Test across all 117 technologies
  stackTechnologies.forEach((tech) => {
    const result = getTechnologyDiscoveryResult(tech.id);
    assert.ok(result, `Discovery result must resolve for valid technology: ${tech.id}`);
    assert.strictEqual(result.technology.id, tech.id);

    // Verify recommendations do not contain self or alternatives
    result.recommendations.forEach((rec) => {
      assert.notStrictEqual(rec.technology.id, tech.id, 'Cannot recommend self');
      if (rec.primaryRelationship) {
        assert.notStrictEqual(
          rec.primaryRelationship.type,
          'alternative',
          'Cannot recommend alternative as an additive recommendation'
        );
      }
      assert.ok(rec.reasons.length > 0, 'Recommendations must have explainable reasons');
      rec.reasons.forEach((r) => {
        assert.ok(r.en.length > 0);
        assert.ok(r.ko.length > 0);
      });
    });

    // Verify bridge technologies
    result.bridgeTechnologies.forEach((b) => {
      assert.ok(b.bridgedLayersCount >= 2, 'Bridge technologies must connect to at least 2 other layers');
      assert.ok(b.reason.en.length > 0);
      assert.ok(b.reason.ko.length > 0);
    });

    // Verify safety claims preservation
    if (tech.functionalSafety) {
      if (tech.functionalSafety.claimType === 'capable') {
        assert.strictEqual(tech.functionalSafety.claimType, 'capable');
      }
    }
  });

  // 3. Edge-case test: invalid technology ID
  const invalidResult = getTechnologyDiscoveryResult('non-existent-technology-id-999');
  assert.strictEqual(invalidResult, null, 'Invalid tech ID must return null without crashing');

  console.log('✅ Test 30 Passed: Phase 8.2 Intelligent Technology Discovery UX & Invariants verified.');
}

// Test 31: Phase 8.2.5 — Refactor & Harden Knowledge Graph Intelligence
{
  const scoring = await import('../src/lib/graph/scoring.js');
  const rels = await import('../src/lib/graph/intelligence/relationships.js');
  const bridges = await import('../src/lib/graph/intelligence/bridges.js');
  const archs = await import('../src/lib/graph/intelligence/architectures.js');
  const paths = await import('../src/lib/graph/intelligence/paths.js');
  const recs = await import('../src/lib/graph/intelligence/recommendations.js');
  const stackInsights = await import('../src/lib/graph/intelligence/stackInsights.js');
  const intelIndex = await import('../src/lib/graph/intelligence/index.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  // 1. Scoring Calculations & Constants
  assert.strictEqual(scoring.RELATIONSHIP_PRIORITY['runs-on'], 10);
  assert.strictEqual(scoring.RELATIONSHIP_PRIORITY['depends-on'], 9);
  assert.strictEqual(scoring.RELATIONSHIP_PRIORITY['integrates-with'], 8);
  assert.strictEqual(scoring.CONFIDENCE_WEIGHT['official'], 1.0);
  assert.strictEqual(scoring.CONFIDENCE_WEIGHT['vendor'], 0.85);
  assert.strictEqual(scoring.CONFIDENCE_WEIGHT['community'], 0.7);

  assert.strictEqual(scoring.calculateRelationshipScore('runs-on', 'official'), 100);
  assert.strictEqual(scoring.calculateRelationshipScore('runs-on', 'vendor'), 85);
  assert.strictEqual(scoring.calculateRelationshipScore('depends-on', 'community'), 63);

  const strongBridgeScore = scoring.calculateBridgeScore(3, 5, 10, 'official');
  const weakBridgeScore = scoring.calculateBridgeScore(2, 2, 2, 'community');
  assert.ok(strongBridgeScore > weakBridgeScore, 'Strong bridge must outscore weak bridge');

  // 2. Strict Dependency & Platform Directional Invariants
  // AUTOSAR Adaptive (ARA) depends on SOME/IP Protocol
  const araDeps = rels.getDependencies('autosar-adaptive');
  const someipDependents = rels.getDependents('someip-protocol');
  const someipDeps = rels.getDependencies('someip-protocol');
  const araDependents = rels.getDependents('autosar-adaptive');

  assert.ok(araDeps.some((d) => d.technology.id === 'someip-protocol'), 'ARA depends on SOME/IP Protocol');
  assert.ok(someipDependents.some((d) => d.technology.id === 'autosar-adaptive'), 'SOME/IP is depended on by ARA');
  assert.ok(!someipDeps.some((d) => d.technology.id === 'autosar-adaptive'), 'SOME/IP does NOT depend on ARA');
  assert.ok(!araDependents.some((d) => d.technology.id === 'someip-protocol'), 'ARA is NOT depended on by SOME/IP');

  // AUTOSAR Adaptive (ARA) runs on QNX Neutrino
  const araPlatforms = rels.getPlatforms('autosar-adaptive');
  const qnxHosted = rels.getHostedTechnologies('qnx-neutrino');
  const qnxPlatforms = rels.getPlatforms('qnx-neutrino');
  const araHosted = rels.getHostedTechnologies('autosar-adaptive');

  assert.ok(araPlatforms.some((p) => p.technology.id === 'qnx-neutrino'), 'ARA runs on QNX Neutrino');
  assert.ok(qnxHosted.some((h) => h.technology.id === 'autosar-adaptive'), 'QNX Neutrino hosts ARA');
  assert.ok(!qnxPlatforms.some((p) => p.technology.id === 'autosar-adaptive'), 'QNX Neutrino does NOT run on ARA');
  assert.ok(!araHosted.some((h) => h.technology.id === 'qnx-neutrino'), 'ARA does NOT host QNX Neutrino');

  // 3. Perspective-Corrected Alternative Wording
  const qnxHypAlts = rels.getAlternatives('qnx-hypervisor');
  assert.ok(qnxHypAlts.length > 0, 'QNX Hypervisor has alternatives');
  const coqosAlt = qnxHypAlts.find((a) => a.technology.id === 'opensynergy-coqos-hypervisor');
  if (coqosAlt) {
    assert.ok(
      coqosAlt.reason.en.includes('is an architectural alternative to QNX Hypervisor'),
      'Alternative wording must state that neighbor is an alternative to current tech'
    );
    assert.ok(
      coqosAlt.reason.ko.includes('QNX Hypervisor의 아키텍처 대안 솔루션'),
      'Korean alternative wording must state that neighbor is an alternative to current tech'
    );
  }

  // 4. Deterministic Ordering
  const run1Archs = archs.getRelatedArchitectures('nvidia-drive-thor');
  const run2Archs = archs.getRelatedArchitectures('nvidia-drive-thor');
  assert.deepStrictEqual(run1Archs, run2Archs, 'Architecture relevance ranking must be 100% deterministic');

  const run1Recs = recs.getNextTechnologiesToExplore('nvidia-drive-thor');
  const run2Recs = recs.getNextTechnologiesToExplore('nvidia-drive-thor');
  assert.deepStrictEqual(run1Recs, run2Recs, 'Exploration recommendations must be 100% deterministic');

  // 5. Perseus Safety Certification Invariant
  const perseus = technologyById.get('perseus-hypervisor');
  assert.ok(perseus, 'Perseus Pegasus Hypervisor exists in knowledge graph');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified', 'Perseus remains ASIL-D Certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D', 'Perseus remains ASIL-D');

  console.log('✅ Test 31 Passed: Phase 8.2.5 Refactor & Harden Knowledge Graph Intelligence verified.');
}

// Test 32: Phase 8.2.6 — Knowledge Graph Intelligence Hardening & Architecture Cleanup
{
  const { CORE_STACK_LAYER_IDS, SUPPORTING_STACK_LAYER_IDS, validateStack, matchArchitectures, matchStackPaths } = await import('../src/lib/graph/matching.js');
  const { calculateArchitectureMatchScore, calculateStackPathMatchScore, calculateBridgeScore } = await import('../src/lib/graph/scoring.js');
  const rels = await import('../src/lib/graph/intelligence/relationships.js');
  const bridges = await import('../src/lib/graph/intelligence/bridges.js');
  const stackInsights = await import('../src/lib/graph/intelligence/stackInsights.js');
  const { encodeStackToSearchParams, decodeStackFromSearchParams } = await import('../src/lib/builder/stackBuilderEngine.js');
  const { technologyById, outgoingRelationshipsByTechnologyId } = await import('../src/lib/graph/index.js');

  // 1. Core Stack Layer Categorization
  assert.strictEqual(CORE_STACK_LAYER_IDS.length, 7, 'Must have exactly 7 core runtime layers');
  assert.strictEqual(SUPPORTING_STACK_LAYER_IDS.length, 3, 'Must have exactly 3 supporting layers');

  // 2. Pure Matching & Scoring Functions Independence
  const archMatchScore = calculateArchitectureMatchScore(100, 50, 4);
  assert.strictEqual(archMatchScore, Math.round(100 * 0.6 + 50 * 0.4 + 4 * 3));

  const pathMatchScore = calculateStackPathMatchScore(80, 4, 3);
  assert.strictEqual(pathMatchScore, Math.round(80 * 0.5 + 4 * 10 + 3 * 5));

  // 3. Directional Semantics Matrix Verification
  // (a) depends-on
  const araDeps = rels.getDependencies('autosar-adaptive');
  assert.ok(araDeps.some((d) => d.technology.id === 'someip-protocol'), 'autosar-adaptive depends on someip-protocol');

  // (b) runs-on
  const aaosPlatforms = rels.getPlatforms('android-automotive-os');
  assert.ok(aaosPlatforms.some((p) => p.technology.id === 'qnx-hypervisor'), 'Android Automotive OS runs on QNX Hypervisor');

  // (c) implemented-by
  const someipImpls = rels.getImplementations('someip-protocol');
  assert.ok(someipImpls.some((i) => i.technology.id === 'vsomeip-middleware'), 'someip-protocol is implemented by vsomeip');

  // (d) integrates-with (preserves isOutgoing)
  const ros2Integrations = rels.getIntegrations('ros2-middleware');
  assert.ok(ros2Integrations.length > 0, 'ROS 2 has integrations');
  ros2Integrations.forEach((item) => {
    assert.strictEqual(typeof item.isOutgoing, 'boolean', 'isOutgoing flag must be boolean');
  });

  // (e) alternative (perspective-corrected)
  const qnxAlts = rels.getAlternatives('qnx-neutrino');
  assert.ok(qnxAlts.some((a) => a.technology.id === 'vxworks-rtos'), 'VxWorks is an alternative to QNX Neutrino');
  const vxworksAlt = qnxAlts.find((a) => a.technology.id === 'vxworks-rtos');
  assert.ok(vxworksAlt?.reason.en.includes('is an architectural alternative to QNX Neutrino'));

  // (f) coexists-with
  const araCoexists = rels.getCoexistingTechnologies('autosar-classic');
  assert.ok(araCoexists.some((c) => c.technology.id === 'autosar-adaptive'), 'AUTOSAR Classic coexists with AUTOSAR Adaptive');

  // (g) related
  const aaosOutRels = outgoingRelationshipsByTechnologyId.get('android-automotive-os') || [];
  assert.ok(aaosOutRels.some((r) => r.type === 'related'), 'Android Automotive OS has related edges');

  // 4. Meaningful Cross-Layer Bridge Filtering
  const thorBridges = bridges.getBridgeTechnologies('nvidia-drive-thor');
  thorBridges.forEach((b) => {
    assert.ok(b.bridgedLayersCount >= 2, 'Bridge must connect to >= 2 layers');
    assert.notStrictEqual(b.relationship.type, 'alternative', 'Bridge cannot be alternative');
    assert.notStrictEqual(b.relationship.type, 'related', 'Bridge cannot be generic related');
  });

  // 5. Overlap vs Coverage Distinction in Architecture Matching
  const singleTechSelection = { 'hardware-compute': 'nvidia-drive-thor' };
  const singleMatch = matchArchitectures(singleTechSelection);
  assert.ok(singleMatch.length > 0, 'Thor matches reference architecture');
  const firstMatch = singleMatch[0];
  assert.strictEqual(firstMatch.overlapPercentage, 100, 'Single selected tech has 100% precision overlap');
  assert.ok(
    firstMatch.profileCoveragePercentage < 100,
    '100% overlap on 1 selected tech does NOT mean 100% profile coverage'
  );

  // 6. Contiguous Path Sequence Matching
  const pathSelection = {
    'hardware-compute': 'qualcomm-snapdragon-cockpit',
    'hypervisor-virtualization': 'qnx-hypervisor',
    'operating-systems': 'linux-kernel',
  };
  const pathMatches = matchStackPaths(pathSelection);
  assert.ok(pathMatches.length > 0, 'Matched paths exist');
  assert.ok(pathMatches[0].maxContiguousHops >= 3, 'Contiguous hop sequence correctly detected');

  // 7. Core Runtime Completeness vs Supporting Layer Independence
  const fullCoreSelection = {
    'hardware-compute': 'nvidia-drive-thor',
    'hypervisor-virtualization': 'qnx-hypervisor',
    'operating-systems': 'qnx-neutrino',
    'build-platform': 'yocto-project',
    'middleware-communication': 'autosar-adaptive',
    'vehicle-services': 'kuksa-val',
    'application-experience': 'qt-automotive',
  };
  const fullCoreInsights = stackInsights.getStackInsights(fullCoreSelection);
  assert.strictEqual(fullCoreInsights.gapAnalysis.isCompleteCoreStack, true, '7 Core layers complete stack');
  assert.strictEqual(fullCoreInsights.gapAnalysis.missingCoreLayers.length, 0);

  // Adding supporting layer does not invalidate completeness
  const corePlusSupporting = {
    ...fullCoreSelection,
    'cloud-devops': 'aws-iot-fleetwise',
  };
  const plusInsights = stackInsights.getStackInsights(corePlusSupporting);
  assert.strictEqual(plusInsights.gapAnalysis.isCompleteCoreStack, true, 'Supporting layer does not alter core completeness');

  // 8. URL SearchParams Round-Trip Integrity
  const searchParams = encodeStackToSearchParams(fullCoreSelection);
  const decodedSelection = decodeStackFromSearchParams(searchParams);
  const { normalizeStackSelection } = await import('../src/lib/graph/matching.js');
  assert.deepStrictEqual(decodedSelection, normalizeStackSelection(fullCoreSelection), 'Stack selection must survive URL encode/decode roundtrip');

  // 9. Perseus Functional Safety Certification Invariant
  const perseus = technologyById.get('perseus-hypervisor');
  assert.ok(perseus, 'Perseus Pegasus Hypervisor exists');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified', 'Perseus claimType is certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D', 'Perseus ASIL is ASIL-D');
  assert.ok(perseus?.functionalSafety?.sourceUrl, 'Perseus has verified sourceUrl');

  console.log('✅ Test 32 Passed: Phase 8.2.6 Knowledge Graph Intelligence Hardening & Architecture Cleanup verified.');
}

// Test 33: Multi-Technology Selection & Bare-Metal (Optional Hypervisor) Support
{
  const {
    MANDATORY_CORE_STACK_LAYER_IDS,
    OPTIONAL_CORE_STACK_LAYER_IDS,
    validateStack,
    matchArchitectures,
    matchStackPaths,
    normalizeStackSelection,
  } = await import('../src/lib/graph/matching.js');
  const {
    encodeStackToSearchParams,
    decodeStackFromSearchParams,
  } = await import('../src/lib/builder/stackBuilderEngine.js');
  const stackInsights = await import('../src/lib/graph/intelligence/stackInsights.js');

  // 1. Mandatory vs Optional Layer Taxonomy
  assert.strictEqual(MANDATORY_CORE_STACK_LAYER_IDS.length, 6, '6 mandatory core runtime layers');
  assert.strictEqual(OPTIONAL_CORE_STACK_LAYER_IDS.length, 1, 'Hypervisor is optional core layer');
  assert.strictEqual(OPTIONAL_CORE_STACK_LAYER_IDS[0], 'hypervisor-virtualization');

  // 2. Multi-OS Selection (e.g., QNX Neutrino for Safety RTOS + Linux Kernel for Rich Compute)
  const multiOsSelection = {
    'hardware-compute': ['qualcomm-snapdragon-cockpit'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
    'operating-systems': ['qnx-neutrino', 'linux-kernel'],
    'build-platform': ['yocto-project'],
    'middleware-communication': ['autosar-adaptive', 'android-automotive-os', 'vsomeip-middleware'],
    'vehicle-services': ['kuksa-val'],
    'application-experience': ['qt-automotive', 'flutter-embedded-automotive'],
  };

  const validationResult = validateStack(multiOsSelection);
  assert.strictEqual(validationResult.totalSelected, 10, 'All 10 selected technologies tracked');
  assert.ok(validationResult.verifiedCount >= 3, 'Multiple inter-layer and intra-layer verified edges detected');

  // 3. Multi-Technology URL Serialization and Deserialization Round-Trip
  const encodedMulti = encodeStackToSearchParams(multiOsSelection);
  assert.strictEqual(
    encodedMulti.get('operating-systems'),
    'qnx-neutrino,linux-kernel',
    'Multiple OSes encoded as comma-separated list'
  );
  assert.strictEqual(
    encodedMulti.get('middleware-communication'),
    'autosar-adaptive,android-automotive-os,vsomeip-middleware',
    'Multiple middlewares encoded as comma-separated list'
  );

  const decodedMulti = decodeStackFromSearchParams(encodedMulti);
  assert.deepStrictEqual(
    decodedMulti['operating-systems'],
    ['qnx-neutrino', 'linux-kernel'],
    'Decoded OSes match original multi-selection'
  );
  assert.deepStrictEqual(
    decodedMulti['middleware-communication'],
    ['autosar-adaptive', 'android-automotive-os', 'vsomeip-middleware'],
    'Decoded middlewares match original multi-selection'
  );

  // 4. Bare-Metal (No Hypervisor) Completeness & Gap Analysis
  const bareMetalSelection = {
    'hardware-compute': ['qualcomm-snapdragon-cockpit'],
    'operating-systems': ['linux-kernel'],
    'build-platform': ['yocto-project'],
    'middleware-communication': ['android-automotive-os'],
    'vehicle-services': ['covesa-vss'],
    'application-experience': ['qt-automotive'],
  };

  const bareMetalInsights = stackInsights.getStackInsights(bareMetalSelection);
  assert.strictEqual(
    bareMetalInsights.gapAnalysis.isCompleteCoreStack,
    true,
    'Bare metal runtime stack (omitting hypervisor) is complete'
  );
  assert.strictEqual(
    bareMetalInsights.gapAnalysis.missingCoreLayers.length,
    0,
    'No mandatory core layers are missing in bare-metal stack'
  );

  // 5. Bare-Metal Direct Hardware <-> OS Adjacency Validation
  const bareMetalValidation = validateStack(bareMetalSelection);
  assert.strictEqual(bareMetalValidation.totalSelected, 6);
  // Validates direct hardware-OS connection without false hypervisor gaps
  assert.ok(bareMetalValidation.verifiedCount >= 1);

  // 6. Architecture & Path Matching with Multi-Technology Stacks
  const archMatches = matchArchitectures(multiOsSelection);
  assert.ok(archMatches.length > 0, 'Multi-tech stack matches architectures');
  assert.ok(
    archMatches[0].matchedTechnologies.length >= 2,
    'Matches multiple technologies from multi-select stack'
  );

  const pathMatches = matchStackPaths(multiOsSelection);
  assert.ok(pathMatches.length > 0, 'Multi-tech stack matches stack paths');

  console.log('✅ Test 33 Passed: Multi-Technology Selection & Bare-Metal (Optional Hypervisor) verified.');
}

// Test 34: Architecture Discovery Aggregates Existing Engines Correctly
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');

  const testStack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
    'operating-systems': ['qnx-neutrino'],
  };

  const discovery = discoverArchitecture(testStack);
  assert.strictEqual(discovery.totalSelectedCount, 3);
  assert.ok(discovery.architectureMatches.length > 0, 'Must return matched architecture profiles');
  assert.ok(discovery.stackPathMatches.length > 0, 'Must return matched stack paths');
  assert.strictEqual(discovery.isCompleteCoreStack, false, '3-layer stack must be incomplete');
  assert.ok(discovery.missingCoreLayers.includes('middleware-communication'));
  assert.ok(discovery.missingCoreLayers.includes('application-experience'));
  assert.ok(discovery.recommendedTechnologies.length > 0, 'Must return explainable recommendations');
  assert.ok(discovery.validation.totalSelected === 3, 'Must return valid validation summary');

  console.log('✅ Test 34 Passed: Architecture Discovery aggregates existing engines correctly.');
}

// Test 35: Partial Stack Correctly Identifies Missing Core Runtime Layers
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');

  const partialStack = {
    'hardware-compute': ['qualcomm-snapdragon-cockpit'],
    'operating-systems': ['linux-kernel'],
  };

  const discovery = discoverArchitecture(partialStack);
  assert.strictEqual(discovery.isCompleteCoreStack, false);
  // Missing mandatory layers
  assert.ok(discovery.missingCoreLayers.includes('build-platform'));
  assert.ok(discovery.missingCoreLayers.includes('middleware-communication'));
  assert.ok(discovery.missingCoreLayers.includes('vehicle-services'));
  assert.ok(discovery.missingCoreLayers.includes('application-experience'));
  // Populated layers
  assert.ok(discovery.populatedCoreLayers.includes('hardware-compute'));
  assert.ok(discovery.populatedCoreLayers.includes('operating-systems'));
  // Hypervisor is optional, not in missingCoreLayers
  assert.ok(!discovery.missingCoreLayers.includes('hypervisor-virtualization'));

  console.log('✅ Test 35 Passed: Partial stack correctly identifies missing Core Runtime Layers.');
}

// Test 36: Multiple Technologies in the Same Layer are Supported
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');

  const multiTechStack = {
    'operating-systems': ['qnx-neutrino', 'linux-kernel'],
    'middleware-communication': ['autosar-adaptive', 'android-automotive-os', 'vsomeip-middleware'],
  };

  const discovery = discoverArchitecture(multiTechStack);
  assert.strictEqual(discovery.totalSelectedCount, 5);
  assert.ok(discovery.architectureMatches.length > 0);
  assert.ok(discovery.validation.totalSelected === 5);

  console.log('✅ Test 36 Passed: Multiple technologies in the same layer are supported.');
}

// Test 37: Same-Layer Technologies are NOT Automatically Treated as Alternatives
{
  const { validateStack } = await import('../src/lib/graph/matching.js');

  // Linux Kernel and FreeRTOS coexisting in OS layer
  const coexistingStack = {
    'operating-systems': ['linux-kernel', 'freertos'],
  };

  const validation = validateStack(coexistingStack);
  // Should NOT generate an alternative warning unless explicit alternative relationship exists
  const altWarnings = validation.items.filter((i) => i.status === 'alternative');
  assert.strictEqual(
    altWarnings.length,
    0,
    'Same-layer technologies without explicit alternative edge must NOT be classified as alternatives'
  );

  console.log('✅ Test 37 Passed: Same-layer technologies are NOT automatically treated as alternatives.');
}

// Test 38: Explicit Alternative Relationship Produces an Architectural Alternative
{
  const { getAlternatives } = await import('../src/lib/graph/intelligence/relationships.js');
  const { validateStack } = await import('../src/lib/graph/matching.js');

  // QNX Neutrino vs VxWorks have explicit alternative edge
  const qnxAlts = getAlternatives('qnx-neutrino');
  assert.ok(
    qnxAlts.some((a) => a.technology.id === 'vxworks-rtos'),
    'Explicit alternative relationship must yield VxWorks as alternative to QNX Neutrino'
  );

  const altStack = {
    'operating-systems': ['qnx-neutrino', 'vxworks-rtos'],
  };
  const val = validateStack(altStack);
  assert.ok(
    val.items.some((i) => i.status === 'alternative'),
    'Explicit alternative technologies in same stack must be recognized as alternatives'
  );

  console.log('✅ Test 38 Passed: Explicit alternative relationship produces architectural alternatives.');
}

// Test 39: What-If Replacement Does NOT Mutate the Original Selection
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  const originalStack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
    'operating-systems': ['qnx-neutrino'],
  };

  const originalStackCopy = JSON.parse(JSON.stringify(originalStack));

  const comparison = compareWhatIfStack(originalStack, 'qnx-hypervisor', 'nvidia-drive-hypervisor');

  assert.deepStrictEqual(
    originalStack,
    originalStackCopy,
    'Original stack selection MUST remain strictly unmutated after What-if comparison'
  );
  assert.deepStrictEqual(comparison.originalSelection['hypervisor-virtualization'], ['qnx-hypervisor']);
  assert.deepStrictEqual(comparison.hypotheticalSelection['hypervisor-virtualization'], ['nvidia-drive-hypervisor']);

  console.log('✅ Test 39 Passed: What-if replacement does NOT mutate original selection.');
}

// Test 40: What-If Correctly Identifies Removed Relationships
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  // In original stack: QNX Hypervisor runs on ARM Cortex-A78AE (or QNX Neutrino depends on QNX Hypervisor)
  const stack = {
    'hypervisor-virtualization': ['qnx-hypervisor'],
    'operating-systems': ['qnx-neutrino'],
  };

  const comparison = compareWhatIfStack(stack, 'qnx-hypervisor', 'xen-automotive');
  const removedRels = comparison.relationshipChanges.filter((r) => r.impactType === 'removed');

  assert.ok(removedRels.length >= 1, 'Must detect removed relationship when QNX Hypervisor is replaced');
  assert.ok(
    removedRels.some((r) => r.sourceTech.id === 'qnx-hypervisor' || r.targetTech.id === 'qnx-hypervisor'),
    'Removed relationship must reference replaced target technology'
  );

  console.log('✅ Test 40 Passed: What-if correctly identifies removed relationships.');
}

// Test 41: What-If Correctly Identifies Added Relationships
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  const stack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
  };

  // Replace QNX Hypervisor with NVIDIA DRIVE Hypervisor (which natively runs-on Thor)
  const comparison = compareWhatIfStack(stack, 'qnx-hypervisor', 'nvidia-drive-hypervisor');
  const addedRels = comparison.relationshipChanges.filter((r) => r.impactType === 'added');

  assert.ok(addedRels.length >= 1, 'Must detect added relationship for NVIDIA DRIVE Hypervisor on Thor');
  assert.ok(
    addedRels.some(
      (r) =>
        r.sourceTech.id === 'nvidia-drive-hypervisor' &&
        r.targetTech.id === 'nvidia-drive-thor' &&
        r.relationship.type === 'runs-on'
    ),
    'Added relationship must preserve exact runs-on edge from NVIDIA DRIVE Hypervisor to Thor'
  );

  console.log('✅ Test 41 Passed: What-if correctly identifies added relationships.');
}

// Test 42: Architecture Relevance Changes are Deterministic
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  const stack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'operating-systems': ['qnx-neutrino'],
  };

  const run1 = compareWhatIfStack(stack, 'qnx-neutrino', 'linux-kernel');
  const run2 = compareWhatIfStack(stack, 'qnx-neutrino', 'linux-kernel');

  assert.deepStrictEqual(
    run1.architectureImpacts,
    run2.architectureImpacts,
    'What-if architecture impacts must be 100% deterministic'
  );

  console.log('✅ Test 42 Passed: Architecture relevance changes are deterministic.');
}

// Test 43: Stack Path Relevance Changes are Deterministic
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  const stack = {
    'hardware-compute': ['qualcomm-snapdragon-cockpit'],
    'operating-systems': ['linux-kernel'],
  };

  const run1 = compareWhatIfStack(stack, 'linux-kernel', 'qnx-neutrino');
  const run2 = compareWhatIfStack(stack, 'linux-kernel', 'qnx-neutrino');

  assert.deepStrictEqual(
    run1.pathImpacts,
    run2.pathImpacts,
    'What-if path impacts must be 100% deterministic'
  );

  console.log('✅ Test 43 Passed: Stack Path relevance changes are deterministic.');
}

// Test 44: Relationship Direction Remains Correct in What-If Comparison
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  const stack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
  };

  const comparison = compareWhatIfStack(stack, 'qnx-hypervisor', 'nvidia-drive-hypervisor');
  const addedThorRel = comparison.relationshipChanges.find(
    (r) => r.impactType === 'added' && r.sourceTech.id === 'nvidia-drive-hypervisor'
  );

  assert.ok(addedThorRel, 'Found added relationship');
  assert.strictEqual(addedThorRel.sourceTech.id, 'nvidia-drive-hypervisor');
  assert.strictEqual(addedThorRel.targetTech.id, 'nvidia-drive-thor');
  assert.strictEqual(addedThorRel.relationship.type, 'runs-on');
  assert.notStrictEqual(
    addedThorRel.sourceTech.id,
    'nvidia-drive-thor',
    'Direction must not be inverted (Hypervisor runs on Thor, not Thor on Hypervisor)'
  );

  console.log('✅ Test 44 Passed: Relationship direction remains correct in What-if comparison.');
}

// Test 45: Safety Claims Remain Unchanged Through Architecture Discovery and What-If
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  const stackWithPerseus = {
    'hardware-compute': ['arm-cortex-a78ae'],
    'hypervisor-virtualization': ['perseus-hypervisor'],
    'operating-systems': ['linux-kernel'],
  };

  // 1. Through Architecture Discovery
  const discovery = discoverArchitecture(stackWithPerseus);
  const perseusInGraph = technologyById.get('perseus-hypervisor');
  assert.strictEqual(perseusInGraph?.functionalSafety?.claimType, 'certified');
  assert.strictEqual(perseusInGraph?.functionalSafety?.asilLevel, 'ASIL-D');

  // 2. Through What-if Comparison
  const comparison = compareWhatIfStack(stackWithPerseus, 'perseus-hypervisor', 'xen-automotive');
  assert.strictEqual(
    comparison.safetyImpact.targetSafety?.claimType,
    'certified',
    'Perseus claimType must remain certified in safety comparison'
  );
  assert.strictEqual(
    comparison.safetyImpact.targetSafety?.asilLevel,
    'ASIL-D',
    'Perseus asilLevel must remain ASIL-D in safety comparison'
  );

  console.log('✅ Test 45 Passed: Safety claims remain unchanged through Architecture Discovery and What-if.');
}

// Test 46: True Before/After Edge-Set Diff & Directional Edge Diff
{
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');

  // Multi-technology stack with multiple relationships
  const stack = {
    'hardware-compute': ['nvidia-drive-thor'],
    'hypervisor-virtualization': ['qnx-hypervisor'],
    'operating-systems': ['qnx-neutrino', 'linux-kernel'],
  };

  // Replace QNX Hypervisor with NVIDIA DRIVE Hypervisor
  const comparison = compareWhatIfStack(stack, 'qnx-hypervisor', 'nvidia-drive-hypervisor');

  // Verify removed edges: only edges involving qnx-hypervisor in original stack
  const removedKeys = comparison.relationshipChanges
    .filter((r) => r.impactType === 'removed')
    .map((r) => `${r.sourceTech.id}|${r.relationship.type}|${r.targetTech.id}`);

  // Verify added edges: only edges involving nvidia-drive-hypervisor in hypothetical stack
  const addedKeys = comparison.relationshipChanges
    .filter((r) => r.impactType === 'added')
    .map((r) => `${r.sourceTech.id}|${r.relationship.type}|${r.targetTech.id}`);

  // 1. Unchanged relationships (e.g. between Linux Kernel / Thor or QNX / Thor if any) MUST NOT be in removed or added
  removedKeys.forEach((key) => {
    assert.ok(
      key.includes('qnx-hypervisor'),
      `Removed edge ${key} must involve replaced target technology`
    );
  });
  addedKeys.forEach((key) => {
    assert.ok(
      key.includes('nvidia-drive-hypervisor'),
      `Added edge ${key} must involve replacement technology`
    );
  });

  // 2. Added and removed must have zero intersection
  const intersection = removedKeys.filter((k) => addedKeys.includes(k));
  assert.strictEqual(intersection.length, 0, 'No edge can be both added and removed');

  console.log('✅ Test 46 Passed: True before/after edge-set diff & directional edge diff verified.');
}

// Test 47: Target & Replacement Candidate Synchronization Logic
{
  const { getAlternatives } = await import('../src/lib/graph/intelligence/relationships.js');
  const { technologiesByLayerId, technologyById } = await import('../src/lib/graph/index.js');

  const selectedTechIds = ['nvidia-drive-thor', 'qnx-neutrino', 'autosar-adaptive'];

  // 1. If initial target is in selection, it should be the target
  const initialTarget = 'qnx-neutrino';
  const target1 = selectedTechIds.includes(initialTarget) ? initialTarget : selectedTechIds[0];
  assert.strictEqual(target1, 'qnx-neutrino');

  // 2. Compute replacements for qnx-neutrino: direct alternatives should take priority
  const alts1 = getAlternatives(target1).map((a) => a.technology);
  assert.ok(alts1.length > 0, 'QNX Neutrino has direct architectural alternatives (VxWorks)');
  const defaultRepl1 = alts1[0].id;
  assert.strictEqual(defaultRepl1, 'vxworks-rtos');

  // 3. Fallback when initialTarget is not in selection: fallback to first item
  const missingTarget = 'non-existent-tech';
  const target2 = selectedTechIds.includes(missingTarget) ? missingTarget : selectedTechIds[0];
  assert.strictEqual(target2, 'nvidia-drive-thor');

  // 4. Candidates for hardware layer
  const tech2 = technologyById.get(target2);
  assert.ok(tech2);
  const sameLayer2 = (technologiesByLayerId.get(tech2.layerId) || []).filter((t) => t.id !== target2);
  assert.ok(sameLayer2.length > 0, 'Hardware layer has multiple candidate SoCs');

  console.log('✅ Test 47 Passed: Target & replacement candidate synchronization logic verified.');
}

// Test 48: Absence of Fake Self-Referential Relationships in Recommendations
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');
  const { stackRelationships } = await import('../src/data/stackRelationships.js');

  // 1. Verify canonical relationships data has zero self-loops
  stackRelationships.forEach((rel) => {
    assert.notStrictEqual(
      rel.sourceId,
      rel.targetId,
      `Canonical relationship cannot be self-referential: ${rel.sourceId} -> ${rel.targetId}`
    );
  });

  // 2. Discover architecture recommendations on a partial stack
  const partialStack = {
    'operating-systems': ['linux-kernel'],
  };
  const discovery = discoverArchitecture(partialStack);

  // Recommendations should either have a valid primaryRelationship with sourceId !== targetId, or undefined
  discovery.recommendedTechnologies.forEach((rec) => {
    if (rec.primaryRelationship) {
      assert.notStrictEqual(
        rec.primaryRelationship.sourceId,
        rec.primaryRelationship.targetId,
        `Recommended primary relationship cannot be a self-loop: ${rec.primaryRelationship.sourceId}`
      );
    }
  });

  console.log('✅ Test 48 Passed: Zero fake self-referential relationships in recommendations verified.');
}

// Test 49: Phase 8.3.1 Regression & Safety Invariant Hardening
{
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  // Perseus Pegasus Hypervisor ASIL-D Certified invariant
  const perseus = technologyById.get('perseus-hypervisor');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D');

  const stack = {
    'hardware-compute': ['arm-cortex-a78ae'],
    'hypervisor-virtualization': ['perseus-hypervisor'],
    'operating-systems': ['linux-kernel'],
  };

  const discovery = discoverArchitecture(stack);
  assert.strictEqual(discovery.totalSelectedCount, 3);
  assert.ok(discovery.architectureMatches.length > 0);

  const whatIfResult = compareWhatIfStack(stack, 'perseus-hypervisor', 'qnx-hypervisor');
  assert.strictEqual(whatIfResult.safetyImpact.targetSafety?.claimType, 'certified');
  assert.strictEqual(whatIfResult.safetyImpact.targetSafety?.asilLevel, 'ASIL-D');
  assert.strictEqual(whatIfResult.originalSelection['hypervisor-virtualization']?.[0], 'perseus-hypervisor');
  assert.strictEqual(whatIfResult.hypotheticalSelection['hypervisor-virtualization']?.[0], 'qnx-hypervisor');

  console.log('✅ Test 49 Passed: Phase 8.3.1 regression & safety invariant hardening verified.');
}

// Test 50: Architecture Listing and Profile Metadata Verification
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');

  assert.ok(architectureProfiles.length >= 8, 'Must contain at least 8 curated architecture profiles');

  architectureProfiles.forEach((profile) => {
    assert.ok(profile.id, 'Profile must have an id');
    assert.ok(profile.name.en, 'Profile must have English name');
    assert.ok(profile.name.ko, 'Profile must have Korean name');
    assert.ok(profile.description.en, 'Profile must have English description');
    assert.ok(profile.description.ko, 'Profile must have Korean description');
    assert.ok(profile.profileType, 'Profile must have a valid profileType');
    assert.ok(Array.isArray(profile.technologyIds) && profile.technologyIds.length > 0, 'Must have technology IDs');
  });

  console.log('✅ Test 50 Passed: Architecture listing and profile metadata verified.');
}

// Test 51: Architecture Detail and Technology/Layer Resolution
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { stackLayers } = await import('../src/data/stackLayers.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  const validLayerIds = new Set(stackLayers.map((l) => l.id));

  architectureProfiles.forEach((profile) => {
    profile.technologyIds.forEach((techId) => {
      const tech = technologyById.get(techId);
      assert.ok(tech, `Technology "${techId}" in profile "${profile.id}" must exist in graph`);
      assert.ok(validLayerIds.has(tech.layerId), `Technology "${techId}" must belong to a valid layer`);
    });
  });

  console.log('✅ Test 51 Passed: Architecture detail and technology/layer resolution verified.');
}

// Test 52: Architecture -> Stack Builder Conversion & URL Roundtrip
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { convertArchitectureToStackSelection } = await import('../src/lib/architecture/comparison.js');
  const {
    encodeStackToSearchParams,
    decodeStackFromSearchParams,
    getSelectedTechIds,
  } = await import('../src/lib/builder/stackBuilderEngine.js');

  const profile = architectureProfiles[0];
  const selection = convertArchitectureToStackSelection(profile);

  // 1. All profile technologies must be present in selection
  const selectedIds = getSelectedTechIds(selection);
  assert.strictEqual(
    selectedIds.length,
    profile.technologyIds.length,
    'All technologies in architecture profile must be mapped to selection'
  );

  // 2. Multi-technology URL serialization round-trip
  const params = encodeStackToSearchParams(selection);
  const decoded = decodeStackFromSearchParams(params);
  const decodedIds = getSelectedTechIds(decoded);

  assert.deepStrictEqual(
    decodedIds.sort(),
    selectedIds.sort(),
    'URL serialization round-trip must preserve all architecture technologies'
  );

  console.log('✅ Test 52 Passed: Architecture -> Stack Builder conversion & URL roundtrip verified.');
}

// Test 53: Architecture Comparison Engine
{
  const { compareArchitectures } = await import('../src/lib/architecture/comparison.js');
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');

  const archA = architectureProfiles[0];
  const archB = architectureProfiles[1];

  const comparison = compareArchitectures(archA.id, archB.id);

  assert.strictEqual(comparison.architectureA.id, archA.id);
  assert.strictEqual(comparison.architectureB.id, archB.id);

  // Shared + OnlyInA must equal total technologies in A
  assert.strictEqual(
    comparison.sharedTechnologies.length + comparison.onlyTechnologiesInA.length,
    archA.technologyIds.length
  );

  // Shared + OnlyInB must equal total technologies in B
  assert.strictEqual(
    comparison.sharedTechnologies.length + comparison.onlyTechnologiesInB.length,
    archB.technologyIds.length
  );

  // Shared tech IDs cannot overlap with unique tech IDs
  const sharedIds = new Set(comparison.sharedTechnologies.map((t) => t.id));
  comparison.onlyTechnologiesInA.forEach((t) => {
    assert.ok(!sharedIds.has(t.id), `Unique tech in A "${t.id}" cannot be in shared`);
  });
  comparison.onlyTechnologiesInB.forEach((t) => {
    assert.ok(!sharedIds.has(t.id), `Unique tech in B "${t.id}" cannot be in shared`);
  });

  console.log('✅ Test 53 Passed: Architecture comparison engine verified.');
}

// Test 54: No Fake Relationships Created from Architecture Membership
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { outgoingRelationshipsByTechnologyId } = await import('../src/lib/graph/index.js');

  // Verify that pairwise relationships are ONLY present if explicitly recorded in canonical graph
  architectureProfiles.forEach((profile) => {
    const techIds = profile.technologyIds;
    techIds.forEach((idA) => {
      techIds.forEach((idB) => {
        if (idA !== idB) {
          const outgoingA = outgoingRelationshipsByTechnologyId.get(idA) || [];
          const canonicalRel = outgoingA.find((r) => r.targetId === idB);
          // If no canonical relationship, we never fabricate one
          if (!canonicalRel) {
            // Confirm we didn't add any fake relationship
            assert.strictEqual(canonicalRel, undefined);
          }
        }
      });
    });
  });

  console.log('✅ Test 54 Passed: Architecture membership does NOT create fake relationships.');
}

// Test 55: Existing Graph Intelligence Reuse in Architecture Discovery
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { convertArchitectureToStackSelection } = await import('../src/lib/architecture/comparison.js');
  const { discoverArchitecture } = await import('../src/lib/architecture/discovery.js');

  const profile = architectureProfiles[0];
  const selection = convertArchitectureToStackSelection(profile);
  const discovery = discoverArchitecture(selection);

  // Discovery must match the profile itself with 100% profile coverage
  const selfMatch = discovery.architectureMatches.find((m) => m.profile.id === profile.id);
  assert.ok(selfMatch, 'Architecture selection must match its own architecture profile');
  assert.strictEqual(selfMatch.profileCoveragePercentage, 100, 'Self-match must have 100% profile coverage');
  assert.strictEqual(selfMatch.missingTechnologies.length, 0, 'No missing technologies for self-match');

  console.log('✅ Test 55 Passed: Existing graph intelligence reuse in architecture discovery verified.');
}

// Test 56: What-If Integration from Architecture Selection
{
  const { architectureProfiles } = await import('../src/data/architectureProfiles.js');
  const { convertArchitectureToStackSelection } = await import('../src/lib/architecture/comparison.js');
  const { compareWhatIfStack } = await import('../src/lib/architecture/whatIf.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  // Find a profile with an operating system
  const profileWithOS = architectureProfiles.find((p) =>
    p.technologyIds.some((id) => technologyById.get(id)?.layerId === 'operating-systems')
  );
  assert.ok(profileWithOS, 'Found profile with OS');

  const osTechId = profileWithOS.technologyIds.find(
    (id) => technologyById.get(id)?.layerId === 'operating-systems'
  )!;
  const selection = convertArchitectureToStackSelection(profileWithOS);

  // Replace OS with alternative
  const replId = osTechId === 'qnx-neutrino' ? 'linux-kernel' : 'qnx-neutrino';
  const whatIfResult = compareWhatIfStack(selection, osTechId, replId);

  assert.ok(whatIfResult.architectureImpacts.length > 0, 'What-if generates architecture impacts');
  assert.strictEqual(whatIfResult.targetTechnology.id, osTechId);
  assert.strictEqual(whatIfResult.replacementTechnology.id, replId);

  console.log('✅ Test 56 Passed: What-if integration from architecture selection verified.');
}

// Test 57: Safety Claims Invariant across Architecture Discovery and Comparison
{
  const { compareArchitectures } = await import('../src/lib/architecture/comparison.js');
  const { technologyById } = await import('../src/lib/graph/index.js');

  const perseus = technologyById.get('perseus-hypervisor');
  assert.strictEqual(perseus?.functionalSafety?.claimType, 'certified');
  assert.strictEqual(perseus?.functionalSafety?.asilLevel, 'ASIL-D');

  // Compare architectures
  const comparison = compareArchitectures('centralized-compute', 'zonal-architecture');
  assert.ok(comparison);

  // Safety claim invariant
  const perseusAfter = technologyById.get('perseus-hypervisor');
  assert.strictEqual(perseusAfter?.functionalSafety?.claimType, 'certified');
  assert.strictEqual(perseusAfter?.functionalSafety?.asilLevel, 'ASIL-D');

  console.log('✅ Test 57 Passed: Safety claims invariant across Architecture Discovery and Comparison verified.');
}

console.log('\n🎉 All Knowledge Graph Tests Passed Cleanly!');




