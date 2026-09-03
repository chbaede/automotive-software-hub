# Architecture Discovery & Exploration Experience

## 1. Overview & Dual Exploration Mental Model

The **Automotive Software Hub** provides two complementary, first-class discovery journeys:

```text
Architecture-First Journey:
Architecture Explorer (/architectures)
      ↓
Architecture Detail (/architecture/:id)
      ↓
Layers & Component Hierarchy
      ↓
Canonical Inter-Layer Relationships
      ↓
Representative Stack Paths
      ↓
Build in Stack Builder (/stack-builder)
      ↓
What-if Impact Analysis

Technology-First Journey:
Technology Detail (/stack/:id)
      ↓
Direct Knowledge Graph Connections & Bridges
      ↓
Matched Reference Architecture Profiles
      ↓
Stack Builder Exploration
```

Given any perspective, users can seamlessly transition between high-level vehicle E/E architectures and concrete software implementations.

---

## 2. Core Architecture Discovery Components

### A. Architecture Explorer (`/architectures`)
* Interactive catalog of curated automotive architecture profiles (Vehicle Architectures, Domain Controllers, OS Platforms, Reference Stacks).
* Direct metadata inspection: Technology counts, represented stack layers, topics, and tags.
* Direct action: **"Build Stack"** (prepopulates Stack Builder with the complete architecture).
* **Architecture Comparison**: Side-by-side comparative analysis of two selected architectures.

### B. Architecture Comparison Engine (`src/lib/architecture/comparison.ts`)
* Pure domain function `compareArchitectures(archAId, archBId)`:
  * `sharedTechnologies`: Technologies present in both architectures.
  * `onlyTechnologiesInA` / `onlyTechnologiesInB`: Technologies unique to each architecture.
  * `sharedLayers` / `onlyLayersInA` / `onlyLayersInB`: Stack layer coverage comparison.
  * `sharedPaths` / `onlyPathsInA` / `onlyPathsInB`: Relevant execution journeys.
  * `sharedTopics`: Common focus areas and tags.
* **Strict Semantic Guard**: Architecture membership does **NOT** equal a technology dependency. Pairwise relationships are only established if an explicit canonical edge exists in `stackRelationships`.

### C. Architecture Detail Page (`/architecture/:architectureId`)
* **Layer View**: Sequential vertical decomposition from hardware compute to application experience and supporting layers.
* **Internal Canonical Relationships**: Displays verified directed relationships documented in the Knowledge Graph between components within this architecture.
* **Relevant Stack Paths**: Visual execution journeys with clickable technology hops.
* **Recommendations (Explore Next)**: High-priority additive technologies discovered via graph intelligence (`candidateRecommendations`).
* **What-if Analysis Entry Point**: Contextual "What-if" triggers on component cards to simulate technology substitutions.

### D. Architecture $\rightarrow$ Stack Builder Conversion
* `convertArchitectureToStackSelection(profile)`: Maps all `technologyIds` to their canonical `StackLayerId` arrays.
* Serializes to standard URL query params (`/stack-builder?hardware-compute=...&operating-systems=...`), preserving multi-technology selection and bare-metal support.

---

## 3. What-if Analysis Semantics & True Edge Diff

* **True Before/After Edge Diff**:
  $$Removed = BeforeEdges - AfterEdges$$
  $$Added = AfterEdges - BeforeEdges$$
  Unchanged relationships are omitted from change lists.
* **Directional Preservation**: $A \xrightarrow{runs-on} B \neq B \xrightarrow{runs-on} A$.
* **Functional Safety Invariant**: Evidence-based safety claims (`Perseus Pegasus Hypervisor ASIL-D Certified`) remain unaltered across all discovery and comparison operations.

---

## 4. Test Suite Coverage (Tests 1–57)

* `Tests 1–45`: Knowledge Graph indexes, matching, gap analysis, and Phase 8.3 baseline.
* `Tests 46–49`: Phase 8.3.1 True relationship diff, modal synchronization, and zero fake self-relationships.
* `Tests 50–57`: Phase 8.4 Architecture-first Discovery, Comparison, Stack Builder conversion, and Safety invariants.
