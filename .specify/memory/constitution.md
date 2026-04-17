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

> **Architecture reference:** Technical implementation details — language, build tooling,
> mock API layer, and design system — are maintained in
> [`docs/architecture.md`](../../docs/architecture.md).
> When creating new features and writing specifications, consult that file for the current
> state of project architecture. This constitution governs development workflow, behaviour
> rules, and validation practices only.

## Core Principles

### I. COPPA Compliance & Audit Trail

All features and data flows MUST comply with COPPA and Autodesk child data protection policies.
Every moderator action that mutates account state MUST be auditable.

Rules:
- Every mutating moderator action (password reset, account deletion) MUST be recorded with:
  action type, timestamp (UTC), and authenticated moderator identity. In this mock-only phase,
  the audit log MUST be written to the mock service layer so the contract is established before
  the real API is wired in.
- No child account data may be exposed to a moderator who is not explicitly assigned as that
  account's supervisor — this is enforced at the mock service layer (not just in UI rendering).
- The mock `accountsService` MUST reject requests for accounts outside the authenticated
  moderator's assigned set with a simulated 403 response.
- Moderators MUST NOT be able to edit usernames in this release (UI field is read-only).
- Bulk delete and account suspension are out of scope for this POC — the UI placeholders
  MUST be non-functional (no-ops), with no back-end call issued.

*Rationale: COPPA violations carry regulatory risk for Autodesk. Establishing the audit
contract in the mock layer ensures the real integration is compliant by design, not by
retrofit.*

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
| Design      | `docs/spec-design.md`      | Design      | UX flows, component specs, copy, accessibility, language support   |
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
   spec before living spec consolidation. All strings in `docs/spec-design.md` §7 are final
   and MUST pass without alteration of casing, punctuation, or phrasing.
2. **E2E tests** — Playwright tests derived from Given/When/Then acceptance criteria in the
   PRD and design spec MUST all pass after build.
3. **Performance tests** — validate FCP < 1.5 s, LCP < 2.5 s, CLS < 0.1 on every screen.
4. **Accessibility audit** — run `adsk:accessibility-audit` skill on every screen.
   WCAG 2.2 AA, zero violations. WCAG 2.2 criteria 2.4.11, 2.5.8, and 3.3.8 are
   explicitly included.

## Governance

This constitution supersedes all other practices, conventions, and informal agreements within
the id-tiger repository. It is the authoritative ruleset for development workflow, behaviour
rules, and validation practices. For technical architecture decisions, see
[`docs/architecture.md`](../../docs/architecture.md).

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

