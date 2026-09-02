# Architecture Discovery & What-if Stack

## 1. Overview & Mental Model

The **Architecture Discovery & What-if Stack** system turns the Automotive Software Hub from a static catalog into an interactive, deterministic architecture exploration and simulation platform.

```text
                    My Stack
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
   Architecture     Gaps        Next Steps
    Discovery                   Recommendations
          │            │            │
          └────────────┼────────────┘
                       ↓
                  Stack Paths
                       │
                       ↓
                  What-if Stack
```

Given any combination of automotive software components, the system answers:
1. *"What automotive reference architecture am I building?"*
2. *"What essential runtime layers or components are missing?"*
3. *"What technologies naturally fit next based on verified graph relationships?"*
4. *"Which vehicle execution journeys (Stack Paths) are relevant?"*
5. *"If I replace technology A with technology B, what changes across architectures, connections, and safety claims?"*

---

## 2. Architecture & Engine Reuse

Architecture Discovery is a high-level domain orchestrator that reuses pure canonical graph modules with **zero duplicate algorithms**:

```text
types / data (stackLayers, stackTechnologies, stackRelationships, architectureProfiles, stackPaths)
      ↓
src/lib/graph/index.ts (indexes, adjacency maps, traversal primitives)
      ↓
src/lib/graph/scoring.ts (centralized scoring constants and formulas)
      ↓
src/lib/graph/matching.ts (pure domain validation, architecture & path matching)
      ↓
src/lib/graph/intelligence/ (directional selectors, bridges, recommendations, gap analysis)
      ↓
src/lib/architecture/ (discovery.ts, whatIf.ts, types.ts)
      ↓
UI Components / Pages (StackBuilderPage, TechnologyDetailPage, WhatIfModal)
```

---

## 3. Multi-Technology & Bare-Metal Semantics

### A. Multi-Technology per Layer
* A single layer may legitimately contain multiple technologies (e.g. `QNX Neutrino` for safety cluster alongside `Linux Kernel` for digital cockpit).
* Technologies in the same layer are **NOT automatically considered conflicting or alternative**.
* Only explicit `alternative` relationships in the knowledge graph classify components as architectural alternatives.

### B. Bare-Metal & Optional Hypervisor
* Core Runtime Layers are categorized into:
  * **6 Mandatory Core Layers**: `hardware-compute`, `operating-systems`, `build-platform`, `middleware-communication`, `vehicle-services`, `application-experience`.
  * **1 Optional Core Layer**: `hypervisor-virtualization` (omitted in Bare Metal / Direct OS architectures).
* If a hypervisor is omitted, the stack validation engine directly connects `hardware-compute` to `operating-systems` without false gap warnings, and gap analysis marks the stack as complete.

---

## 4. What-if Stack Simulation Semantics

### A. Non-Mutating Hypothetical State
* What-if comparison creates an isolated clone of the user selection (`hypotheticalSelection`), substituting the target technology with the replacement technology.
* The original user stack is never mutated until the user explicitly clicks "Apply Replacement to Stack".

### B. Impact Categories
Impact is categorized using neutral, objective signals:
* `added`: New architecture match or newly formed direct relationship.
* `removed`: Lost architecture match or severed direct relationship.
* `improved`: Architecture coverage or path match score increased.
* `reduced`: Architecture coverage or path match score decreased.
* `unchanged`: Relationship or relevance unchanged.

### C. Directional Relationship Preservation
* When $A$ is replaced with $C$:
  * If $A \xrightarrow{\text{runs-on}} B$ existed, it is recorded as `removed: A -> runs-on -> B`.
  * If $C \xrightarrow{\text{runs-on}} B$ exists, it is recorded as `added: C -> runs-on -> B`.
  * Directionality ($A \rightarrow B \neq B \rightarrow A$) is strictly preserved.

### D. Functional Safety Invariant
* Safety certifications are evidence-based data fields (`claimType: 'certified' | 'capable' | 'compliant' | ...`).
* What-if simulation preserves exact safety claims (e.g., Perseus Pegasus Hypervisor ASIL-D Certified remains Certified, and capable remains capable).

---

## 5. Verification & Testing

Every invariant is protected by automated tests in `tests/graph.test.ts`:
* `Test 34`: Architecture Discovery engine aggregation.
* `Test 35`: Partial stack missing layer detection.
* `Test 36`: Multi-technology selection per layer support.
* `Test 37`: Same-layer coexistence independence from alternatives.
* `Test 38`: Explicit alternative relationship verification.
* `Test 39`: What-if non-mutating clone guarantee.
* `Test 40`: What-if removed relationship detection with directionality.
* `Test 41`: What-if added relationship detection with directionality.
* `Test 42`: Deterministic architecture ranking changes.
* `Test 43`: Deterministic stack path ranking changes.
* `Test 44`: Strict relationship directionality preservation in comparison.
* `Test 45`: Functional safety evidence invariant across What-if simulation.

