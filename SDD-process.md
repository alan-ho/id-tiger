# Spec-Driven Development Process

## Table of Contents

- [Overview](#overview)
- [Why markdown + git](#why-markdown--git)
  - [The AI unlock](#the-ai-unlock)
  - [Version control for specs](#version-control-for-specs)
  - [The PR review workflow applies to specs](#the-pr-review-workflow-applies-to-specs)
  - [Industry context](#industry-context)
- [Requirement IDs](#requirement-ids)
  - [Cross-referencing](#cross-referencing)
- [Phase 0 — Kick-off](#phase-0--kick-off)
- [Phase 1 — PRD (PM)](#phase-1--prd-pm)
  - [Early consult](#early-consult)
- [Phase 2 — XD Design + Eng Architecture](#phase-2--xd-design--eng-architecture)
  - [Revision loops](#revision-loops)
- [Phase 3 — Cross-Faction Sync](#phase-3--cross-faction-sync)
- [Phase 4 — Baseline](#phase-4--baseline)
- [Phase 5 — Spec Breakdown (Engineering)](#phase-5--spec-breakdown-engineering)
  - [Spec validation](#spec-validation)
- [Phase 6 — Execution](#phase-6--execution)
  - [Upstream change policy](#upstream-change-policy)
  - [Change trigger ownership](#change-trigger-ownership)
- [Source Documents vs. Specs](#source-documents-vs-specs)
- [Lifecycle](#lifecycle)
- [Automation Touchpoints](#automation-touchpoints)

---

## Overview

```
   Phase 0       Phase 1         Phase 2            Phase 3         Phase 4         Phase 5        Phase 6
  ─────────     ─────────     ──────────────       ──────────      ──────────     ──────────      ──────────
 ┌─────────┐   ┌─────────┐   ┌──────────────┐     ┌──────────┐    ┌──────────┐   ┌──────────┐    ┌──────────┐
 │ Kick-off│──▸│  PRD    │──▸│ XD + Eng     │──▸  │ Cross-   │──▸ │ Baseline │──▸│  Spec    │──▸ │Execution │
 │         │   │  (PM)   │   │ (parallel)   │     │ Faction  │    │          │   │ Breakdown│    │          │
 └─────────┘   └─────────┘   └──────────────┘     │  Sync    │    └──────────┘   └──────────┘    └──────────┘
                                                  └──────────┘
```

> **Phases are not strictly sequential**
>
> The phase diagram shows the logical order of *outputs*, not the order of *work*. In practice:
> - XD and Eng can start exploring and asking questions as soon as a rough PRD exists — they don't wait for "stable"
> - Engineering can scaffold infrastructure, make technology decisions, and draft architecture constraints while the PRD is still being written
> - The PRD doesn't need to be complete to unblock parallel work — it needs to be *directionally clear*
>
> The gates between phases exist to prevent *committing to the wrong direction*, not to serialize the team. Move fast in parallel; use the gates to catch drift before it compounds.

## Why markdown + git

All SDD source artifacts — `prd.md`, `xd-design.md`, `architecture.md` — are written in plain markdown and stored in git. This is not a stylistic preference. It is what makes the rest of the process work.

### The AI unlock

When all three artifacts are in markdown and git, an AI agent can read, diff, and cross-reference them directly. This enables:
- **Drift detection** — automatically surface contradictions between the PRD, XD spec, and architecture after baseline
- **Spec generation** — generate engineering specs traceable to source requirement IDs
- **Impact analysis** — when a requirement changes, find all affected specs by tracing IDs

None of this works if the PRD lives in Confluence rich text. AI tools struggle with Confluence's macro-heavy format, and there is no machine-readable diff history.

### Version control for specs

Git gives you commit history, diffs, blame, and branching for your specs — the same guarantees you have for code. A Confluence PRD gets edited informally over time with no record of what changed, when, or why. After a PRD-baseline event, git is what makes "frozen" actually mean something.

### The PR review workflow applies to specs

Specs in git can go through pull requests — the same review, approval, and audit trail your team uses for code applies to requirement changes.

### Industry context

Writing specifications in markdown stored in git is an established pattern known as **Docs as Code**. It is the standard practice for developer-centric teams where specs need to stay in sync with implementation — and vice versa.

## Requirement IDs

Every requirement across source documents gets a prefixed ID for cross-document traceability:


| Prefix | Document        | Example                                        |
| ------ | --------------- | ---------------------------------------------- |
| `PRD-` | prd.md          | `PRD-001` User can reset child password        |
| `XD-`  | xd-design.md    | `XD-001` Password reset modal flow             |
| `ENG-` | architecture.md | `ENG-001` POST /api/v1/password-reset endpoint |


### Cross-referencing

Each requirement can reference related IDs from other documents:

```
## PRD-003 — Moderator views list of supervised children
References: XD-005, ENG-002
```

Specs reference the source requirement IDs they implement:

```
## spec-001 — Child list table component
Traces: PRD-003, XD-005, ENG-002
```

This enables:

- **Impact analysis** — when a requirement changes, find all affected specs by tracing IDs
- **Coverage checks** — verify every source requirement has at least one spec
- **Validation** — spec review confirms alignment with the specific requirements it traces to

## Phase 0 — Kick-off

Product owner defines the feature intent (problem, users, scope boundaries).
All three factions receive this simultaneously.

## Phase 1 — PRD (PM)

PM drafts the PRD from the product intent. This is the foundation that XD and Eng build on.

```
                 ┌───────────────────┐
 Product    ──▸  │        PM         │  ──▸  prd.md
 Intent          │                   │
                 │  scope · edges ·  │
                 │  biz rules · pri  │
                 └────────┬──────────┘
                          │      ▴
                          │      |
                          │  revision loop
                          └──────┘
```

### Early consult

XD and Eng don't need to wait for a finished PRD. While PM is drafting, XD and Eng can review early drafts and surface questions — these conversations often help the PRD stabilize faster. This is informal and advisory, not full artifact work.

PRD is considered ready for Phase 2 when the user stories and acceptance criteria are clear enough for XD to design against and Eng to evaluate feasibility.

## Phase 2 — XD Design + Eng Architecture

Once the PRD is stable, XD and Eng work from it in parallel:

```
                          ┌────────────┐
                     ┌──▸ │     XD     │ ──▸  xd-design.md
                     │    │ UX  · lang │        │
 ┌──────────┐        │    └────────────┘        │  gaps?
 │ prd.md   │────────┤                          ├──────▸ loop back to PM
 │ (stable) │        │    ┌────────────┐        │
 └──────────┘        │    │    Eng     │        │
                     └──▸ │ API · data │ ──▸  architecture.md
                          │ perf · arch│
                          └────────────┘
```

### Revision loops

- **PRD ↔ XD** — XD designs against the PRD. If design reveals gaps or contradictions in the PRD, loop back with PM to revise.
- **PRD ↔ Eng** — Eng validates feasibility. If architecture constraints require PRD changes, loop back with PM to revise.

These loops can run in parallel — XD and Eng don't block each other, but both may trigger PRD revisions.

## Phase 3 — Cross-Faction Sync

All three artifacts are reviewed together. Goal: identify contradictions and gaps.

```
             ┌──────────────────────────────────────────┐
             │          Cross-Faction Review            │
             │                                          │
             │   prd.md ◂──────▸ xd-design.md           │
             │      ▴               ▴                   │
             │      │               │                   │
             │      ▾               ▾                   │
             │        architecture.md                   │
             │                                          │
             │   Contradictions found?                  │
             │     YES ──▸ log, update, re-sync  ──┐    │
             │     NO  ──▸ proceed to Phase 4      │    │
             │      ▴                              │    │
             │      └──────────────────────────────┘    │
             └──────────────────────────────────────────┘
```


| Check                                             | Owner    |
| ------------------------------------------------- | -------- |
| UX flow feasibility vs. API contracts             | Eng + XD |
| Business rules reflected in UX                    | PM + XD  |
| Acceptance criteria testable against architecture | PM + Eng |
| Copy/editorial compliance                         | XD       |
| Accessibility coverage                            | XD + Eng |


Contradictions are logged, not silently resolved. Each faction updates its own artifact.

Loop until no open contradictions remain.

## Phase 4 — Baseline

The three source documents are the source of truth collectively. No separate consolidated file.

Once Phase 3 sync completes with no open contradictions, the documents are **baselined** — stable enough for engineering to start spec breakdown. This is not a freeze. Requirements can and will change as the team learns new constraints.

Mandatory gates are confirmed at baseline: (TBD)

When source documents change after baseline, the upstream change policy (Phase 6) applies.

```
Source of truth = prd.md + xd-design.md + architecture.md (baselined)
```

## Phase 5 — Spec Breakdown (Engineering)

**Only after the source documents are baselined**, engineering creates specs — small, build-ready units (~1 day of implementation each).

```
 ┌─────────────────────────────────────────────────────────────┐
 │         Baselined Source Documents                          │
 │  prd.md  +  xd-design.md  +  architecture.md                │
 └─────────────────────┬───────────────────────────────────────┘
                       │
          Engineering breaks down into specs
                       │
         ┌─────────────┼─────────────┬─────────────┐
         ▼             ▼             ▼             ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
    │spec-001 │   │spec-002 │   │spec-003 │   │  ...    │
    │  ~1 day │   │  ~1 day │   │  ~1 day │   │         │
    └─────────┘   └─────────┘   └─────────┘   └─────────┘
```

Each spec is self-contained with clear inputs, outputs, and acceptance criteria derived from the source documents.

### Spec validation

Before implementation begins, each spec is validated against the current source documents to confirm alignment. If the source documents have drifted since spec creation, the spec is updated or regenerated before work starts.

## Phase 6 — Execution

Specs are implemented, reviewed, and shipped.

### Upstream change policy

If any source document changes after baseline:

```
 Source doc changed after baseline
              │
              ▼
  ┌───────────────────────┐     ┌──────────────────────────────────┐
  │ Affects unstarted     │ YES │ Rebase: update docs,             │
  │ specs?                │────▸│ regenerate affected specs        │
  └───────────┬───────────┘     └──────────────────────────────────┘
              │ NO
              ▼
  ┌───────────────────────┐     ┌──────────────────────────────────┐
  │ Affects in-progress   │ YES │ Evaluate: rebase if small,       │
  │ specs?                │────▸│ restart spec if scope shifts     │
  └───────────┬───────────┘     └──────────────────────────────────┘
              │ NO
              ▼
  ┌───────────────────────┐     ┌──────────────────────────────────┐
  │ Affects completed     │ YES │ New delta spec to address        │
  │ specs?                │────▸│ differences                      │
  └───────────┬───────────┘     └──────────────────────────────────┘
              │ NO
              ▼
  ┌───────────────────────┐     ┌──────────────────────────────────┐
  │ Invalidates source    │ YES │ Full re-sync: return to Phase 3  │
  │ assumptions?          │────▸│                                  │
  └───────────────────────┘     └──────────────────────────────────┘
```


| Scenario                                       | Action                                                  |
| ---------------------------------------------- | ------------------------------------------------------- |
| Change affects unstarted specs                 | Rebase: update source docs, regenerate affected specs   |
| Change affects in-progress specs               | Evaluate: rebase if small, restart spec if scope shifts |
| Change affects completed specs                 | New spec: create a delta spec to address differences    |
| Change invalidates source document assumptions | Full re-sync: return to Phase 3                         |


### Change trigger ownership

- **PM** triggers rebase for scope/requirement changes
- **XD** triggers rebase for flow/UI changes
- **Eng** triggers rebase for technical constraint changes
- **Any faction** can escalate to full re-sync

## Source Documents vs. Specs


|                | Source Documents                      | Specs                                          |
| -------------- | ------------------------------------- | ---------------------------------------------- |
| **Created by** | PM, XD, Eng                           | Engineering only                               |
| **Scope**      | Cross-repository source of truth      | Single repo, ~1 day implementation unit        |
| **Purpose**    | Define what and why                   | Define how to build it                         |
| **Lifecycle**  | Survives across features              | Archived after implementation; historical only |
| **Examples**   | prd.md, xd-design.md, architecture.md | spec-001, spec-002, ...                        |


## Lifecycle

```
Source Documents                         Specs
════════════════                         ═════
┌───────┐   ┌────────┐   ┌──────────┐
│ draft │─▸ │ synced │─▸ │baselined │◂ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
└───────┘   └────────┘   └──────────┘                    |
                                │     ┌─────────┐   ┌───────────┐   ┌───────────┐   ┌──────┐   ┌──────────┐
                                └───▸ │ created │──▸│ validated │──▸│in progress│──▸│ done │──▸│ archived │
                                      └─────────┘   └───────────┘   └───────────┘   └──────┘   └──────────┘
                                           ▴                              ▴
                                           │     upstream doc changes     │
                                           └──── rebase / new spec ───────┘
```

## Automation Touchpoints

- Generate docs for every artifact and spec change
- Editorial checks run automatically on XD artifact updates
- Spec status tracked via events log

