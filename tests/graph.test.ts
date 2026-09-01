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

console.log('\n🎉 All Knowledge Graph Tests Passed Cleanly!');
