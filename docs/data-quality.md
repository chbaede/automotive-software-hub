# Automotive Software Hub — Knowledge Graph Data Quality Policy

This document defines the formal engineering principles, safety taxonomy, evidence standards, and validation rules governing the Automotive Software Hub Knowledge Graph.

---

## 1. Functional Safety Taxonomy (`FunctionalSafetyInfo`)

We strictly distinguish between the following six safety claim classifications:

| Claim Type | Meaning & Scope | Required Evidence | UI Presentation |
| :--- | :--- | :--- | :--- |
| `certified` | Product/binary itself has received an accredited third-party certification (e.g. TÜV SÜD/Rheinland ISO 26262 ASIL-D certificate). | Specific product certification datasheet or official certificate link + `lastVerified`. | `ASIL-D Certified` / `기능안전 인증 획득` |
| `qualified` | Software component or tool has passed a formal safety qualification kit workflow. | Official qualification kit documentation link + `lastVerified`. | `Safety-Qualified` / `기능안전 검증 완료` |
| `compliant` | Architecture and development processes comply with ISO 26262 / ISO 21434 standards. | Vendor process compliance documentation + `lastVerified`. | `ISO 26262 Compliant` / `프로세스 규격 준수` |
| `capable` | Hardware silicon, hypervisor, or OS is architected to host safety-critical partitions. | Product specification datasheet + `lastVerified`. | `ASIL-D Capable` / `ASIL 대응 가능` |
| `supports` | Middleware/standard provides safety mechanisms (e.g. E2E protection, CRC, memory isolation). | Standard specification chapter + `lastVerified`. | `Supports ASIL` / `ASIL 개발 지원` |
| `suitable` | International engineering standard specifying safety or cybersecurity requirements. | Official ISO / SAE / UN publication + `lastVerified`. | `ISO 26262 Standard` / `ISO 26262 표준 규격` |

### Core Safety Integrity Rules
1. **Never conflate capability with certification**:
   - `ASIL-D Capable` ≠ `ASIL-D Certified`.
   - Never assert "ASIL-D Certified" in natural-language descriptions or UI badges unless `functionalSafety.claimType === 'certified'`.
2. **Specific evidence required for certified claims**:
   - A generic vendor homepage is **NOT** sufficient evidence for a specific product certification claim.
   - For `claimType === 'certified'`, an explicit product certification page or datasheet link and a valid `lastVerified` date are mandatory.
3. **Platform certification does not transfer automatically to components**:
   - Certification of an overall vehicle platform (e.g. NVIDIA DRIVE OS platform) does not automatically imply standalone component certification (e.g. Type-1 Hypervisor binary).
   - Platform-level certifications must not be transferred to subcomponents without separate component-level certification evidence.

---

## 2. Evidence & Confidence Taxonomy

Every relationship in `stackRelationships.ts` is assigned a confidence level based on source evidence:

- **`official`**: Relationship is part of an official standard, formal specification, or native subsystem (e.g. SocketCAN in Linux kernel, vsomeip implementing SOME/IP, UN R155 referencing ISO 21434).
  - *Rule*: "Both technologies are official products" does **NOT** make the relationship official. Only mark `official` when the integration itself is officially standardized.
- **`vendor`**: Relationship is an officially supported product integration documented by the vendor (e.g. QNX Hypervisor running on Snapdragon 8295, Ankaios on Red Hat OS).
- **`community`**: Relationship represents common ecosystem practice or alternative tooling without a formal joint specification.

---

## 3. Information Freshness (`lastVerified`)

- Freshness dates (`YYYY-MM-DD`) represent **manual content review and evidence verification dates**, not automated Git commit timestamps.
- All `lastVerified` dates must be valid ISO format (`YYYY-MM-DD`) and cannot be in the future.

---

## 4. Representative Stack Paths

- **Stack Path ≠ Strict Dependency Graph**: A Stack Path defines an architectural exploration journey across layers.
- **No Artificial Serialization**: Branches (e.g. Service Communication vs Diagnostics) are clearly demarcated in hop notes rather than forced into artificial 1-to-1 linear dependencies.
