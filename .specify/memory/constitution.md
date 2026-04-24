<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0 (MINOR: architecture principles extracted to docs/architecture.md)

Modified principles:
  - Principles I–IV (JavaScript-Only, Vite, Mock-First API, Weave Brand) → moved to docs/architecture.md
  - Former Principle V (COPPA Compliance) → renumbered I
  - Former Principle VI (Accessibility) → renumbered II

Added sections:
  - "Architecture Reference" note (links to docs/architecture.md)

Removed sections:
  - I. JavaScript-Only (No TypeScript) — moved to docs/architecture.md
  - II. Vite Build Tooling — moved to docs/architecture.md
  - III. Mock-First API Layer — moved to docs/architecture.md
  - IV. Weave Brand Design System — moved to docs/architecture.md

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — "Constitution Check" section remains valid;
     plan authors must also reference docs/architecture.md for technical constraints.
  ✅ .specify/templates/spec-template.md — no structural change needed.
  ✅ .specify/templates/tasks-template.md — no structural change needed.

Follow-up TODOs: none.
-->

# COPPA Supervision Center Constitution

**Business requirements reference:** Use [`docs/prd-children-moderation-app.md`](../../docs/prd-children-moderation-app.md) as the source for the project desription from the product owner's perspective - scope, requirements, use-cases, system behavior, etc.
**Architecture reference:** Technical implementation details — language, build tooling, mock API layer, and design system — are maintained in [`docs/architecture.md`](../../docs/architecture.md).
When creating new features and writing specifications, consult those files for the current state of the project requirements and architecture. This constitution governs development workflow and validation practices only.

## Core Principles

### I. UI development principles

- Prefer simple, readable code
- When Figma views are provided, try as best as you can to achieve the implemented UI conformance to the Figma views. 
- Assign unique and concise IDs or classes to the implemented components or elements, so I could easily find when reviewing the code in the browser
- Keep components small and reusable
- Prefer utility classes over custom CSS


*Design System — Weave Brand*
- Components: `@mui/material` (MUI v7)
- App theming: `@weave-brand/core`
- Icons: `@weave-brand/icon` (never `@mui/icons-material`)
- Avatar: `@weave-mui/avatar`
- Always wrap icons with MUI's `SvgIcon` component
- Use Weave and MUI components exclusively - no Tailwind, no vanilla HTML
- Use design tokens for colors (e.g., `text-color.heavy`, `surface.300`)
- Semantic Weave Brand tokens (e.g. `background-color/brand`, `status-color/info/default`, `border-radius/pill`)

When implementing UI from figma, add the following requirements to the prompt and endforce them:
Before implementing any UI component, consult Supernova MCP: 
1. `get_design_system_component_list` — find component by name
2. `get_design_system_component_detail` — metadata, status, linked resources
3. `get_storybook_story_list` / `get_storybook_story_detail` — coded examples
4. `get_documentation_page_list` / `get_documentation_page_content` — usage guidelines
Load the relevant Weave skill before writing code.

*Layout:* The layout model for all: navigation panel, header, body and footer, must be MUI's breakpoint-based with max-width (1296px) and auto-centering.
*Fonts:* Artifakt font URLs:
<link rel="preload" crossorigin="anonymous" as="font" type="font/woff2" href="https://swc.autodesk.com/pharmacopeia/fonts/ArtifaktElement/v1.0/WOFF2/Artifakt%20Element%20Regular.woff2">
    <link rel="preload" crossorigin="anonymous" as="font" type="font/woff2" href="https://swc.autodesk.com/pharmacopeia/fonts/ArtifaktElement/v1.0/WOFF2/Artifakt%20Element%20Semi%20Bold.woff2">
    <link rel="preload" crossorigin="anonymous" as="font" type="font/woff2" href="https://swc.autodesk.com/pharmacopeia/fonts/ArtifaktLegend/v1.0/WOFF2/Artifakt%20Legend%20Extra%20Bold.woff2">
*Icon Sizing:* Icon color is controlled with `sx` `color` prop and size with `sx` `fontSize` prop on the `SvgIcon` component.
**fontSize values:** `"small"`, `"medium"`, `"large"`, `"extra-large"`.


*Important:* The Figma view as the source of truth. The styles and variables, used in Figma view, *MUST* override the Weave theme and MUI styles. 

After creating or changing UI or react components, run /ui-code-review skill for finding and resolving the UI deviations.

### II. Accessibility — WCAG 2.2 AA

Every screen MUST meet WCAG 2.2 AA conformance. Accessibility is a build gate, not a
post-ship concern.

Rules:
- Run `adsk:accessibility-audit` skill against every screen before marking a feature complete.
  Zero violations are required.
- The three WCAG 2.2-specific criteria MUST be verified explicitly:
  - **2.4.11 Focus Appearance** — minimum 2 CSS px indicator, ≥3:1 contrast between
    focused/unfocused states on all interactive elements.
  - **2.5.8 Target Size (Minimum)** — all interactive targets ≥24×24 CSS px.
  - **3.3.8 Accessible Authentication** — no CAPTCHA or cognitive puzzle as the sole
    auth mechanism in any moderator flow.
- All animations MUST respect `prefers-reduced-motion`. Skeletons, drawer slide-in, and
  icon fill transitions MUST degrade to instant appear/disappear when the preference is set.
- Color contrast: only confirmed AA-passing token pairings documented in the design spec
  (§6.7) may be used for text on background combinations.

*Rationale: The moderator audience includes educators and parents who may use assistive
technology. Shipping with WCAG violations is not an option.*

## Three-Faction Spec Model

All features are specified in three independent documents before implementation begins:

| Faction     | Document                   | Owner       | Focus                                                              |
|-------------|----------------------------|-------------|--------------------------------------------------------------------|
| PM          | `docs/prd-*.md`            | Product     | Business requirements, user stories, acceptance criteria, MVP scope |
| Design      | `docs/xd-design.md`      | Design      | UX flows, component specs, copy, accessibility, language support   |
| Engineering | `specs/*/plan.md`          | Engineering | API contracts (mock & real), data models, compliance, performance  |

Conflicts between faction specs are adjudicated in the Living Spec step before tasks are
generated. The Living Spec is the single source of truth for build decisions.

Domain checks by faction:
- **Design**: Accessibility (WCAG 2.2 AA), editorial (copy/tone/casing), Weave Brand
  component usage, performance impact.
- **PM**: Business rule completeness, user story coverage, edge cases, MVP scope.
- **Engineering**: Mock API contracts, mock data model integrity, error handling,
  security/compliance, performance budgets, mock-to-real swap-out strategy.

## Mandatory Build Gates

The following gates MUST be passed in order. All are blockers — no gate may be skipped.

1. **Editorial checks** — run `mcp__editorial__check_text` against all copy in the design
   spec before living spec consolidation. All strings in `docs/xd-design.md` §7 are final
   and MUST pass without alteration of casing, punctuation, or phrasing.
2. **E2E tests** — Playwright tests derived from Given/When/Then acceptance criteria in the
   PRD and design spec MUST all pass after build.
3. **Performance tests** — validate FCP < 1.5 s, LCP < 2.5 s, CLS < 0.1 on every screen.
4. **Accessibility audit** — run `adsk:accessibility-audit` skill on every screen.
   WCAG 2.2 AA, zero violations. WCAG 2.2 criteria 2.4.11, 2.5.8, and 3.3.8 are
   explicitly included.

## Governance

**Amendment procedure:**
1. Propose the change in a spec amendment (any faction may initiate).
2. All three factions review and sign off (or raise objections within one sprint).
3. Update this file with a version bump following the policy below.
4. Update the Sync Impact Report at the top of this file.
5. Propagate changes to dependent templates (plan, spec, tasks) as needed.

**Versioning policy:**
- MAJOR: Backward-incompatible governance change — principle removed, redefined, or scope
  reduced in a way that invalidates prior work.
- MINOR: New principle, new section, or materially expanded guidance added.
- PATCH: Clarifications, wording fixes, typo corrections, non-semantic refinements.

**Compliance review:**
- Every PR description MUST include a "Constitution Check" confirming no principles are
  violated, or documenting and justifying any deviation.
- Deviations MUST be logged in the plan's Complexity Tracking table with rationale.
- The `CLAUDE.md` project file is the authoritative runtime guidance document for the AI
  development agent and MUST remain consistent with this constitution and `docs/architecture.md`.

**Version**: 1.1.0 | **Ratified**: 2026-04-13 | **Last Amended**: 2026-04-15

