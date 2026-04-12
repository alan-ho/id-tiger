# SDD Playbook — Draft
**Tiger Team:** Mrinal Shanker (PM), Alan Ho (XD), Yuri Kunash, Shiming Wu, William Tran (Engineers)
**Case Study App:** Children Moderation Application (COPPA Moderator Dashboard)
**Status:** Living document — updated as each phase is completed

---

## Phase 1: PM writes the PRD

**Owner:** PM
**Input:** Product brief, user research, stakeholder context
**Output:** PRD in standard PM format

### Steps
1. Start from the product brief or raw input material (in our case: `mydocs/Product Brief - Children Moderation Application - Google Docs.pdf`)
2. Draft the PRD using your team's standard template structure. If no template exists, use this structure:
   - Overview
   - Problem Statement
   - Goals / Non-Goals
   - Users & Roles
   - User Stories & Features (with acceptance criteria)
   - Functional Requirements (FR-001, FR-002…)
   - Non-Functional Requirements
   - Success Metrics
   - Assumptions
   - Open Questions
3. Review and iterate with stakeholders until the PRD reflects agreed scope

**Output artifact:** [`docs/prd-children-moderation-app.md`](../docs/prd-children-moderation-app.md)

---

## Phase 2: Convert PRD → Product Spec (spec-kit)

**Owner:** PM
**Input:** Completed PRD
**Output:** `spec.md` in spec-kit format on a feature branch

### Steps
1. Open Claude Code from your project directory (`~/your-project`)
2. Type `/speckit-specify` followed by your feature description — or paste the core PRD content as input
3. spec-kit will:
   - Auto-generate a feature branch name (e.g. `001-coppa-mod-dashboard`)
   - Create the branch and `specs/001-coppa-mod-dashboard/` directory
   - Convert your input into a structured spec using the spec template
   - Ask up to 3 clarifying questions if anything is ambiguous
   - Run a quality check before finalising

> **Note (from our run):** `/speckit-specify` must be typed directly as a slash command in the Claude Code prompt — it cannot be triggered programmatically.

### What gets STRIPPED from the PRD

| Removed | Why |
|---|---|
| Overview / context paragraphs | Stakeholder framing — not needed once the team is aligned |
| Problem Statement | Lives in the PRD; spec assumes the problem is understood |
| Goals / Non-Goals section | Replaced by scope being implicit in user stories + assumptions |
| Non-Functional Requirements | Performance, compliance constraints move to the Plan phase |
| Open Questions table | Resolved into assumptions, or deferred to Plan |
| Author / stakeholder metadata | PRD housekeeping, not relevant to the build team |

### What gets ADDED in the spec

| Added | Why |
|---|---|
| **"Why this priority"** per user story | Forces explicit reasoning — P1 must be justifiable, not assumed |
| **"Independent Test"** per user story | Ensures each story is a shippable MVP increment on its own |
| **Edge Cases** section | Surfaces boundary conditions the PRD typically glosses over |
| **Key Entities** section | Lays the groundwork for the data model in the Plan phase |
| **Success Criteria** in SC-001 format | Technology-agnostic, measurable outcomes only |

### Key insight for the playbook
> The PRD is written **for stakeholders** — context, justification, politics.
> The spec is written **for the team** — precise, bounded, independently testable.
> The conversion step is where scope gets tightened and assumptions get made explicit.

**Output artifact:** [`docs/spec-children-moderation-app.md`](../docs/spec-children-moderation-app.md)

---

## Phase 3: XD brings the design spec

*To be documented — Alan Ho*

---

## Phase 4: Plan (Triad — PM + XD + Engineer)

*To be documented*

---

## Phase 5: Tasks (Engineer)

*To be documented*

---

## Phase 6: Implementation

*To be documented*
