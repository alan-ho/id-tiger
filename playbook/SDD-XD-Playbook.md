# Experience Design Document Authoring for Spec-Driven Development: Importance and Principles

<!-- Confluence sync: https://autodesk.atlassian.net/wiki/spaces/~hoa/pages/817299588 -->
<!-- Last synced: 2026-04-24 (v10) -->

## Summary

In a modern delivery workflow, **Figma is necessary but not sufficient** as the sole design contract. Figma and Dev Mode communicate visual structure, measurements, component variants, and linked engineering resources well. What they do not reliably communicate are behavioral rules, edge-condition handling, accessibility intent, and cross-functional decisions — the parts of an experience that are most likely to diverge during implementation.

For **spec-driven development (SDD)**, this gap matters more. Thoughtworks characterizes SDD as an AI-assisted practice that relies on well-crafted specifications to guide implementation. A purely visual artifact is too lossy for that purpose: implementation quality improves when behavior, states, constraints, and acceptance criteria are explicit and structured.

The design artifact for SDD should therefore be treated as a **paired system**:

- **Figma** — visual and interaction representation
- **XDD (`xd-design.md`)** — behavioral, semantic, traceable, and testable contract

---

## Why an XDD is needed in SDD

### 1. Figma does not capture all implementation-critical behavior

Figma Dev Mode substantially improves handoff, but Figma's own guidance still directs teams to connect design files to specification documents and document component usage, states, and accessibility guidance. The design file is not intended to be the complete implementation contract by itself.

### 2. SDD requires explicit, structured input

Spec-driven development favors artifacts that express requirements unambiguously and traceably. A written XDD captures the behavioral and semantic aspects of an experience that visual frames do not express clearly enough for engineering, QA, or AI-assisted code generation.

### 3. Accessibility and state behavior cannot be inferred from frames

GOV.UK and SAP Fiori both note that using an accessible design system does not automatically produce an accessible product — app teams must author app-specific accessibility treatment explicitly. The same applies to state behavior: different empty, error, and forbidden conditions require distinct messages, reasons, and next steps that are not recoverable from layout frames alone.

---

## What an XDD should do in SDD

The XDD serves as the **minimum viable behavioral contract**. It should not restate what is already visible in Figma or Dev Mode. Its four jobs:

1. **Make the design traceable** — stable requirement IDs linked to related `PRD-` and `ENG-` requirements, enabling impact analysis and coverage checks
2. **Make the experience testable** — acceptance criteria in Given / When / Then format, usable directly by QA, automation, and AI-assisted workflows
3. **Make the experience implementable** — states, transitions, rules, content, and semantics needed to build the experience consistently
4. **Make the experience auditable** — explicit accessibility intent, content rules, and key constraints so the resulting implementation can be reviewed against them

---

## Design source segmentation — UI vs. non-UI requirements

A common problem in AI-assisted spec generation is **context bloat**: the AI session receives more than it needs, which increases overhead and risks irrelevant context contaminating outputs.

The root cause is that `xd-design.md` often contains two distinct categories of requirements:

| Category | What it covers | Correct owner |
|---|---|---|
| **UI requirements** | Flows, states, component selections, visual treatment, accessibility, interaction timing | XD (`xd-design.md`) |
| **Non-UI requirements** | Business rules, permission logic, data validation, analytics events, feature-flag behavior | PM (`prd.md`) |

When XD discovers a business rule during design work, flag it to the PM to capture in `prd.md`. The XDD references the relevant `PRD-` ID rather than duplicating the rule.

### Prescribed separation

**`xd-design.md` — visual and interaction layer (UI requirements only)**
- Figma references and paired named version
- Screen flows and entry/exit conditions
- Component selections and variant choices
- State matrix — visual treatment, copy, and Figma frame references
- Accessibility requirements: focus, keyboard, ARIA names, live regions
- Content rules for strings that directly affect visual behavior (truncation, placeholders)

**`prd.md` — behavioral and logic layer (non-UI requirements)**
- Business rules and conditional logic (e.g., "users without the Admin role cannot see X")
- Permission and role-based visibility
- Data validation rules and error conditions
- Analytics events and tracking requirements
- Feature-flag and configuration-dependent behavior
- Acceptance criteria that test behavioral outcomes rather than visual output

### AI context guidelines

Provide only the relevant source document layer for each task:

| AI task | Provide |
|---|---|
| Generate a UI-facing engineering spec | `xd-design.md` + linked Figma file (at the named version) |
| Generate an API or logic spec | `prd.md` + `architecture.md` |
| Cross-faction review or contradiction check | All three source documents |
| Generate QA test cases for a UI flow | `xd-design.md` + relevant acceptance criteria from `prd.md` |

Never provide all three source documents to a focused AI session unless the task explicitly requires cross-artifact reasoning.

### Tagging convention for boundary cases

When a requirement in `xd-design.md` has a non-UI dependency, reference the `PRD-` ID rather than restating the rule:

```
XD-015 — Forbidden state on the product list
Visual treatment: empty state with lock icon, "You don't have access" message
Rule: → PRD-042 (role-based access definition; owned by PM)
```

---

## XDD lifecycle

The XDD (`xd-design.md`) is a **source document** in SDD terms — one of three forming the source of truth alongside `prd.md` and `architecture.md`. Its lifecycle follows the source document lifecycle defined in the SDD process:

| Status | SDD phase | Meaning |
|---|---|---|
| **Draft** | Phase 1–2 | Being authored; XD and Eng can consult early but the XDD is not yet stable for parallel artifact work |
| **Synced** | After Phase 3 | Cross-faction sync complete; no open contradictions across `prd.md`, `xd-design.md`, and `architecture.md` |
| **Baselined** | Phase 4 | Stable enough for engineering to begin spec breakdown; upstream changes now follow the change policy |

> **Note:** The XDD does not carry "Done" or "Deprecated" states. Source documents persist as long as the feature exists. When a feature is substantially redesigned, the XDD is updated (with a version increment) or a successor document is created and linked.

Once baselined, engineering creates **implementation specs** from the source documents. Those carry their own lifecycle — `created → validated → in progress → done → archived` — as defined in the SDD process.

> **`Baselined` is the minimum XDD status before it may be used as input to AI-assisted implementation.** A `Draft` XDD passed into code generation is a common source of rework.

### Lifecycle visualization

> Reproduced from [SDD-process.md](https://git.autodesk.com/cloud-platform/id-tiger/blob/main/SDD-process.md) — refer to that file as the authoritative source.

```
Source document (xd-design.md)                         Implementation specs
══════════════════════════════                         ═══════════════════
┌───────┐   ┌────────┐   ┌──────────┐
│ Draft │──▸│ Synced │──▸│Baselined │◂──────────────────────────────────────────┐
└───────┘   └────────┘   └──────────┘                                           |
                               │     ┌─────────┐  ┌───────────┐  ┌───────────┐  ┌──────┐  ┌──────────┐
                               └────▸│ created │─▸│ validated │─▸│in progress│─▸│ done │─▸│ archived │
                                     └─────────┘  └───────────┘  └───────────┘  └──────┘  └──────────┘
                                          ▴                            ▴
                                          │   upstream doc changes     │
                                          └──── rebase / new spec ─────┘
```

---

## Spec versioning and Figma pairing

Every XDD version must be **explicitly paired with a corresponding Figma version** so that the two artifacts remain unambiguously linked. An XDD that references an outdated or reorganized Figma file creates silent divergence that is expensive to discover and diagnose.

### Pairing convention

**Figma side:**
- Minor and additive changes: save a named version (File → Save to version history) labeled to match the XDD version — e.g., `"xd-design v1.3 — state matrix expansion (2026-04-20)"`
- Significant reworks: create a Figma branch named to match the new XDD version — e.g., `xd-design/v2.0-flow-redesign` — and merge only after Phase 3 re-sync confirms no contradictions

**XDD metadata:**
The metadata block must include a `Figma version` field referencing the exact named version or branch the XDD was written against.

| Field | Example |
|---|---|
| Doc version | 1.3 |
| Figma version | v1.3 — State matrix expansion (saved 2026-04-20) |
| Figma branch | — (or branch name if on a branch) |
| Status | Baselined |
| Last updated / By | 2026-04-20 / Designer name |
| Change summary | Added forbidden-state handling; updated AC-07 trigger condition |
| Linked PRD | PRD-038, PRD-042 |
| Linked architecture doc | architecture.md v2.1 |

### Version increment rules

| Change type | Version increment | Figma action |
|---|---|---|
| Minor (copy fix, link repair, wording clarification) | Patch: 1.2 → 1.2.1 | Update annotation in existing frame only |
| Additive (new state, new AC, new flow branch) | Minor: 1.2 → 1.3 | Save a new named Figma version |
| Significant (flow change, state removal, new entry/exit point, breaking AC change) | Major: 1.x → 2.0 | Create a Figma branch; merge only after Phase 3 re-sync |

### Branching strategy for major versions

1. Create a Figma branch named `xd-design/v{N}` before making changes
2. Set XDD status to `Draft` and increment to the new major version
3. Do not merge the Figma branch until cross-faction sync (Phase 3) completes with no open contradictions
4. On merge, save a named version in the main Figma file to match the XDD version — this becomes the new baseline reference

---

## Recommended template

The template covers the **minimum viable behavioral contract**. Do not include sections as empty placeholders — add them only when the feature requires them.

---

### XDD metadata

| Field | Value |
|---|---|
| Feature name | |
| XDD owner | |
| Status | Draft / Synced / Baselined |
| Doc version | |
| Figma version | (named version label or branch name) |
| Last updated / By | |
| Change summary | |
| Linked PRD IDs | |
| Linked architecture doc | |
| Linked Figma file | |

---

### 1. Purpose and scope

- Problem statement
- UX objective
- In scope / out of scope
- Assumptions and dependencies
- Linked `PRD-` IDs

---

### 2. Design references

- Figma file URL (at the named version paired to this XDD version)
- Key frame or node URLs
- Prototype link
- Linked Storybook or design system pages

---

### 3. Flows, states, and interactions

**Flow overview** — entry conditions, major user actions, branch logic, exit conditions, back/cancel behavior, preserved vs. reset state

**State matrix**

| ID | State | Trigger / condition | Visual treatment | Copy | Next action | Figma ref |
|---|---|---|---|---|---|---|
| XD-S01 | | | | | | |

**Interaction rules** — validation timing, save/autosave behavior, transition rules, and edge cases not captured in the state matrix above

---

### 4. Accessibility requirements

- Focus order and focus return rules (modals, drawers, page transitions)
- Keyboard interaction model
- Accessible names and descriptions
- Live-region expectations
- Reduced-motion requirements
- App-specific semantic notes not guaranteed by the design system

---

### 5. Acceptance criteria

Given / When / Then statements covering:
- Happy path
- Edge cases and boundary conditions
- Accessibility-critical behaviors
- Failure and recovery

---

## Authoring principles

### 1. Write as a contract, not a narrative
Use precise language and explicit conditions. Write in requirement form: "The system shall…" or "When X occurs, the experience must…" — not descriptive prose about what the mockup shows. Assign stable IDs (`XD-001`, `XD-002`) to each requirement so they can be traced, referenced, and changed without ambiguity.

### 2. Use Figma by reference; never duplicate what's inspectable
Link to Figma frames and component instances rather than embedding screenshots or restating redlines. Do not repeat spacing values, hex values, or component properties that Dev Mode already exposes. Write only what Figma does not communicate reliably: rules, triggers, failure behavior, timing, and semantic intent.

### 3. Document the non-obvious
Only write what could be implemented differently if not stated: branch conditions, modal/focus-return rules, validation timing, role-based visibility, and scope decisions. If removing a statement would not confuse an engineer, it does not belong in the XDD.

### 4. Treat accessibility as a first-class requirement
Document focus order, keyboard behavior, accessible names and descriptions, live-region expectations, and any app-specific semantic requirements. The design system handles component-level accessibility; the XDD must handle product-flow-level accessibility.

### 5. Design for states, not only screens
Every XDD must address loading, empty, stale, partial, forbidden, error, and success states wherever they are meaningful. The visual frame for the happy path is not a behavioral contract.

### 6. Write for validation
Every statement should be one of: visually verifiable, behaviorally testable, accessibility-reviewable, or traceable to a PRD or ENG requirement. If a statement does none of these, it is noise.

---

## Figma boundary: what belongs where

Maintaining a clear split between the XDD and Figma prevents drift and duplication.

### Must be in the XDD — not left only in Figma

- Loading, timeout, retry, and degraded-network behavior
- Empty, no-permission, stale, and partial-data states
- Validation timing and error behavior
- Focus order and focus return
- Keyboard-only interaction requirements
- Accessible names, descriptions, and announcements
- Deep-link and browser-back behavior
- Role-based visibility (referenced via `PRD-` IDs — owned by PM)
- Feature-flag or configuration-dependent behavior
- Exact acceptance criteria for critical flows

### Stay in Figma, Dev Mode, or the design system

- Visual layout and spacing that Dev Mode can inspect
- Component dimensions and properties already exposed in Dev Mode
- Reusable component guidance already in the design system or Storybook
- Visual assets and exportables
- Illustrative motion preview that is not normative

---

## Managing and updating the XDD

An XDD that is not actively maintained becomes a liability. In SDD, a stale XDD is particularly dangerous: AI-assisted implementations and downstream QA artifacts may be generated from outdated requirements, producing divergence that is expensive to diagnose and correct.

### Change triggers

**The XDD must be updated when:**
- A user flow or task model changes
- A state is added, removed, or renamed
- Acceptance criteria shift (new conditions, revised outcomes)
- Accessibility requirements change at the app level
- A `PRD-` requirement the XDD traces to is changed, deferred, or removed
- Implementation or QA uncovers a gap the XDD should have captured

**Changes that typically do not require an XDD update** (Figma annotation or Dev Mode update may suffice):
- Spacing adjustments within established guidelines
- Visual polish changes that do not affect semantic meaning
- Non-behavioral component variant changes already covered by the design system

### Preventing Figma–XDD drift

The most common failure mode is silent drift: Figma is updated but the XDD is not, or vice versa.

- Update the XDD before or alongside Figma changes, not after — the XDD is the behavioral contract; Figma is its visual expression
- Annotate Figma frames with XDD requirement IDs (e.g., "See XD-003") so reviewers and engineers can cross-check directly from the design file
- Validate Figma node links whenever files are reorganized; treat a significant Figma restructuring as an XDD maintenance event
- Set the XDD to **Draft** when a significant Figma revision is in progress; return to **Baselined** only after the XDD is confirmed to match the revised design

### Propagating changes downstream

When the XDD changes, propagate to:
- **Engineering spec owner** — if the change affects API contracts, data shapes, or architectural constraints
- **QA plan** — flag affected test cases so tests derived from old acceptance criteria can be updated or invalidated
- **AI sessions** — prior AI context does not automatically reflect XDD updates; the updated XDD or changed sections must be re-provided explicitly to any in-progress AI session
- **Linked Jira tickets** — update descriptions referencing changed requirements

### Ownership protocol

| Change magnitude | Protocol |
|---|---|
| Minor (copy fix, Figma link repair, missing state detail) | Owner updates, increments patch version, notifies Eng lead |
| Significant (flow change, state addition/removal, AC revision) | Owner moves status to Synced; requires Eng lead + QA lead sign-off before returning to Baselined |
| Breaking (scope addition, removal of committed requirements, changes affecting shipped work) | Cross-functional review with PM; explicit notification to all stakeholders before ratifying |

### Archiving and superseding

- **When a feature is substantially redesigned**: create a new XDD version or successor document; add a visible "Superseded by [link]" note at the top of the old XDD and link back from the new one
- **When a feature is retired**: the retirement decision belongs in the PRD (owned by PM); add a "Retired — see [PRD link]" note at the top of the XDD and retain it for historical reference

---

## Sources

### External references

- [Figma Help Center — Guide to Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Figma Help Center — Optimize design files for developer handoff](https://help.figma.com/hc/en-us/articles/360040521453-Optimize-design-files-for-developer-handoff)
- [Figma Help Center — Dev Mode for admins](https://help.figma.com/hc/en-us/articles/19813618057623-Dev-Mode-for-admins)
- [Atlassian Confluence — Product Requirements Blueprint](https://confluence.atlassian.com/conf93/product-requirements-blueprint-1502350106.html)
- [Atlassian — How product specification enhances product development](https://www.atlassian.com/agile/product-management/product-specification)
- [Thoughtworks Technology Radar — Spec-driven development](https://www.thoughtworks.com/en-sg/radar/techniques/spec-driven-development)
- [Thoughtworks — Spec-driven development: Unpacking one of 2025's key new AI-assisted engineering practices](https://www.thoughtworks.com/en-br/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
- [GOV.UK Service Manual — Making your service accessible: an introduction](https://www.gov.uk/service-manual/user-centered-design/accessibility)
- [GOV.UK Design System — Accessibility](https://design-system.service.gov.uk/accessibility/)
- [SAP Fiori — Accessibility in SAP Fiori](https://www.sap.com/design-system/fiori-design-web/v1-96/discover/sap-design-system/product-standards/accessibility-in-sap-fiori)
- [SAP Fiori — Empty States](https://experience.sap.com/fiori-design-web/designing-for-empty-states/)
- [Storybook Docs — How to document components](https://storybook.js.org/docs/writing-docs/index)

### Internal references

- [SDD Process](https://git.autodesk.com/cloud-platform/id-tiger/blob/main/SDD-process.md) — `id-tiger/SDD-process.md`: source document lifecycle (`draft → synced → baselined`), spec lifecycle (`created → validated → in progress → done → archived`), upstream change policy, and change trigger ownership
