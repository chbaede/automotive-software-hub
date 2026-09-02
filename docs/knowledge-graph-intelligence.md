# Knowledge Graph Intelligence & Discovery Engine

## 1. Overview & Purpose

The **Knowledge Graph Intelligence Engine** (`src/lib/graph/intelligence/`) transforms the Automotive Software Hub's curated graph dataset into a deterministic, explainable, and modular discovery system.

It answers core architectural questions:
- Which runtime platforms can host this application or middleware?
- What dependencies are fundamentally required vs. optional companion tools?
- What competing architectural alternatives exist?
- Which technologies act as cross-layer bridges between decoupled stack layers?
- Which reference architectures and execution paths incorporate this technology?
- What next technologies should an engineer explore when building or investigating a software stack?

---

## 2. Modular Architecture & Responsibilities

The intelligence layer is decomposed into focused, single-responsibility modules:

```text
src/lib/graph/
├── index.ts                      # Canonical graph indexes & traversal
├── scoring.ts                    # Centralized priority weights & deterministic scoring formulas
├── intelligence.ts               # Compatibility facade
└── intelligence/
    ├── types.ts                  # Shared data structures and contracts
    ├── relationships.ts          # Directed relationship selectors (dependencies, platforms, etc.)
    ├── bridges.ts                # Cross-layer bridge detection algorithms
    ├── architectures.ts          # Architecture profile relevance & ranking
    ├── paths.ts                  # Stack Path journey relevance & ranking
    ├── recommendations.ts        # Explainable next-technology recommendations
    ├── stackInsights.ts          # Partial-stack gap analysis & builder intelligence
    └── index.ts                  # Top-level 360-degree discovery profile aggregator
```

---

## 3. Directed vs. Exploratory Traversal

The Knowledge Graph maintains a strict semantic distinction between exploratory traversal and directed dependency queries:

| Traversal Paradigm | Underlying Index | Target Use Cases | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| **Exploratory Traversal** | `graphAdjacencyByTechnologyId` (Undirected) | Graph visualizer, 1-hop neighborhood, shortest path finder (BFS) | *"What is connected or related to this node across the ecosystem?"* |
| **Directed Traversal** | `outgoingRelationshipsByTechnologyId`, `incomingRelationshipsByTechnologyId` | `getDependencies`, `getPlatforms`, `getHostedTechnologies`, `getIntegrations`, `getImplementations` | *"What does this technology specifically require (`depends-on`), execute on (`runs-on`), or realize (`implemented-by`)?"* |

---

## 4. Scoring Formulas & Semantic Meaning

> [!IMPORTANT]
> **Numeric scores are strictly internal deterministic ranking signals** designed to prioritize results stably across renders. They are **NOT** probabilities, product quality ratings, adoption percentages, or factual certainty metrics.

### Canonical Priority Weights & Confidence Multipliers (`scoring.ts`)

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
  'alternative': 1,     // Architectural competitor (isolated from additive recommendations)
};

export const CONFIDENCE_WEIGHT: Record<RelationshipConfidence, number> = {
  'official': 1.0,   // Authoritative specification / vendor evidence
  'vendor': 0.85,    // Commercial product integration documentation
  'community': 0.7,  // Open-source / ecosystem verified
};
```

---

## 5. Cross-Layer Bridge Detection

A **Bridge Technology** is defined as a technology that links the currently inspected technology to two or more *different* canonical stack layers.

- **Relationship-Strength Awareness**: Only meaningful relationship edges (`runs-on`, `depends-on`, `integrates-with`, `compatible-with`, `used-with`, `implemented-by`) qualify as bridge connections. Weak connections alone cannot turn an unrelated node into a bridge.
- **Explainability**: Bridge candidates return clear, human-readable explanations detailing which layers are bridged.

---

## 6. Architectural Gap Analysis & Partial Stack Intelligence

When a user constructs a partial stack in Stack Builder:
1. **Gap Analysis**: Evaluates completeness against the 7 **Core Runtime Layers** (`hardware-compute`, `hypervisor-virtualization`, `operating-systems`, `build-platform`, `middleware-communication`, `vehicle-services`, `application-experience`). Supporting layers (e.g. Cloud/DevOps, Testing, Compliance) do not make a runtime stack appear incomplete.
2. **Targeted Additive Recommendations**: Prioritizes technologies that directly connect to selected nodes and fill currently empty core layers.
3. **Alternative Isolation**: Surfaces architectural alternatives separately so users are never advised to add competing alternatives into the same stack.

---

## 7. Conservative Invariants & Non-Inferences

To preserve data credibility and avoid misleading engineering claims:
1. **No Inferred Hard Dependencies**: `related`, `coexists-with`, or `used-with` are never converted into hard `depends-on`.
2. **Perspective-Corrected Alternative Wording**: Explanations always express that candidate $B$ is an alternative to current technology $A$.
3. **No Inferred Certification**: A technology having an ASIL level (e.g. ASIL-D Capable) is NEVER reported as `certified` unless `functionalSafety.claimType === 'certified'`.
4. **Perseus Pegasus Hypervisor**: Maintained strictly as **ASIL-D Certified** with verified vendor documentation URL.
5. **Evidence Isolation**: Official entity status does not upgrade relationship confidence; relationship confidence is strictly derived from verified edge documentation.
6. **Alternative Isolation**: `alternative` relationships represent choice options and are excluded from additive next-step suggestions.
