# Knowledge Graph Intelligence & Discovery Engine

## 1. Overview & Purpose

The **Knowledge Graph Intelligence Engine** (`src/lib/graph/intelligence.ts`) transforms the Automotive Software Hub's curated graph dataset into a deterministic, explainable, and strongly-typed discovery system.

It powers answers to key automotive architectural inquiries:
- Which runtime platforms can host this application or middleware?
- What dependencies are fundamentally required vs. optional companion tools?
- What competing architectural alternatives exist?
- Which technologies act as cross-layer bridges between decoupled stack layers?
- Which reference architectures and execution paths incorporate this technology?
- What next technologies should an engineer explore when building or investigating a software stack?

---

## 2. Directed vs. Exploratory Traversal

The Knowledge Graph maintains a strict semantic distinction between exploratory traversal and directed dependency queries:

| Traversal Paradigm | Underlying Index | Target Use Cases | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| **Exploratory Traversal** | `graphAdjacencyByTechnologyId` (Undirected) | Graph visualizer, 1-hop neighborhood, shortest path finder (BFS) | *"What is connected or related to this node across the ecosystem?"* |
| **Directed Traversal** | `outgoingRelationshipsByTechnologyId`, `incomingRelationshipsByTechnologyId` | `getDependencies`, `getPlatforms`, `getHostedTechnologies`, `getIntegrations`, `getImplementations` | *"What does this technology specifically require (`depends-on`), execute on (`runs-on`), or realize (`implemented-by`)?"* |

---

## 3. Relationship Priority & Confidence Scoring

Recommendation and discovery rankings use explicit weights and confidence multipliers:

```ts
export const RELATIONSHIP_PRIORITY: Record<RelationshipType, number> = {
  'runs-on': 10,        // Execution platform foundation
  'depends-on': 9,      // Hard architectural requirement
  'integrates-with': 8, // Direct API / protocol interface
  'compatible-with': 7, // Verified interoperability
  'used-with': 6,       // Common stack combination
  'implemented-by': 5,  // Realization of spec / standard
  'coexists-with': 4,   // Multi-ECU domain coexistence
  'related': 2,         // Broad domain relationship
  'alternative': 1,     // Architectural competitor (separated from additive recommendations)
};

export const CONFIDENCE_WEIGHT: Record<RelationshipConfidence, number> = {
  'official': 1.0,   // Authoritative specification / vendor evidence
  'vendor': 0.85,    // Commercial product integration documentation
  'community': 0.7,  // Open-source / ecosystem verified
};
```

---

## 4. Cross-Layer Bridge Detection

A **Bridge Technology** is defined as a technology that links the currently inspected technology to two or more *different* canonical stack layers.

For instance:
- **Middleware** (e.g. `vsomeip`, `ros2-middleware`) bridging `application-experience` (Layer 7) with `operating-systems` (Layer 3) and `hardware-compute` (Layer 1).
- **Hypervisors** (e.g. `qnx-hypervisor`, `perseus-hypervisor`) bridging `operating-systems` (Layer 3) with `hardware-compute` (Layer 1).

---

## 5. Architectural Gap Analysis & Partial Stack Intelligence

When a user constructs a partial stack in Stack Builder:
1. **Gap Analysis**: Identifies unpopulated layers across the 7 Core Runtime Layers (`hardware-compute`, `hypervisor-virtualization`, `operating-systems`, `build-platform`, `middleware-communication`, `vehicle-services`, `application-experience`).
2. **Targeted Additive Recommendations**: Prioritizes technologies that directly connect to selected nodes and fill currently empty layers.
3. **Alternative Separation**: Surfaces architectural alternatives separately so users are never advised to add competing alternatives into the same stack.

---

## 6. Conservative Invariants & Non-Inferences

To preserve data credibility and avoid misleading engineering claims:
1. **No Inferred Hard Dependencies**: `related`, `coexists-with`, or `used-with` are never converted into hard `depends-on`.
2. **No Inferred Certification**: A technology having an ASIL level (e.g. ASIL-D Capable) is NEVER reported as `certified` unless `functionalSafety.claimType === 'certified'`.
3. **Evidence Isolation**: Official entity status does not upgrade relationship confidence; relationship confidence is strictly derived from verified edge documentation.
4. **Alternative Isolation**: `alternative` relationships represent choice options and are excluded from additive next-step suggestions.

