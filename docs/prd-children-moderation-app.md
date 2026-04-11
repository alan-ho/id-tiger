# PRD — Children Moderation Application

**Product Area:** Access — Identity & Compliance  
**Author:** [PM Name]  
**Status:** Draft  
**Last Updated:** 2026-04-11  
**Stakeholders:** Access PM, XD, Engineering, Legal/Compliance  

---

## 1. Overview

Autodesk supports child and underage users across its product suite in compliance with COPPA (Children's Online Privacy Protection Act). The primary surface where child accounts are active today is TinkerCAD.

Currently, moderators have no self-service tooling to manage the accounts they oversee. Actions like password resets require the child user to contact their moderator, and the moderator has no consolidated view of account status or activity. This workflow is cumbersome, unscalable, and creates compliance risk.

This PRD defines a **Moderator Dashboard** — a web interface that gives moderators the tools to efficiently manage child/student accounts while staying compliant with COPPA and Autodesk data protection policies.

---

## 2. Problem Statement

**Who is affected:** Moderators (teachers, parents, administrators) managing child Autodesk accounts, and the child users whose requests go unresolved due to friction.

**What the problem is:** There is no centralized interface for moderators to view, manage, or take action on the child accounts they are responsible for. Password resets, account status changes, and access reviews all require manual, out-of-band coordination.

**Why it matters:** 
- Moderators cannot efficiently fulfill their oversight responsibilities
- Child users are blocked on basic account recovery tasks
- Autodesk cannot demonstrate adequate COPPA compliance controls without auditable moderator tooling
- Qualitative and quantitative user feedback signals confirm this is a near-term priority

---

## 3. Goals

- Enable moderators to view and manage all child/student accounts they oversee from a single interface
- Provide moderators with the ability to take key administrative actions: password resets, status changes, access reviews
- Ensure all functionality complies with COPPA and Autodesk child data protection requirements
- Reduce time-to-resolution for child account issues

## 4. Non-Goals

- This is not a child-facing interface — children do not interact with this tool directly
- This does not cover adult account management
- This does not replace or modify the existing Autodesk identity/auth system — it is a management layer on top of it
- Bulk account actions are out of scope for v1

---

## 5. Users & Roles

| Role | Description |
|---|---|
| **Moderator** | An adult (teacher, parent, or administrator) who has been granted oversight of one or more child Autodesk accounts. Primary user of this tool. |
| **Child/Student** | An underage Autodesk user whose account is managed by a moderator. Not a direct user of this tool. |
| **Autodesk Admin** | Internal Autodesk staff who may need audit access. Out of scope for v1. |

---

## 6. User Stories & Features

### User Story 1 — Moderator Landing Page: User List View (P1)

**As a** moderator, **when I log in**, I want to see an immediate list of all child/student accounts I manage so I can quickly assess their status.

**Requirements:**
- The list must display the following for each managed user:
  - Username
  - Status (Active / Suspended)
  - Last Active information
- **Constraint:** Only show users with Status = Active or Suspended — users with Status = Deleted must not appear in the list
- List must be sortable and searchable

**Acceptance Criteria:**
- Given I am a logged-in moderator, when I land on the dashboard, then I see only child accounts with Status = Active or Suspended
- Given a child account has Status = Deleted, when I view the list, then that user does not appear

---

### User Story 2 — User Detail View (P2)

**As a** moderator, **when I click on a user** in the list, I want to navigate to their detail page so I can review their usage and take administrative action.

**Requirements:**
- Clicking a user in the list view must navigate to a detail page for that user
- The detail page must display:
  - A list of all **Applications** the child has access to
  - The **Last Use Date** for each application
- The detail page must include controls to perform the following actions on the user:
  - **Reset the password**
  - **Change Status to Suspended**
  - **Change Status to Deleted**

**Acceptance Criteria:**
- Given I am on the user list, when I click a user, then I am taken to their detail page
- Given I am on the detail page, then I can see all apps the child accesses and when they last used each
- Given I am on the detail page, when I click Reset Password, then the password reset flow is initiated
- Given I am on the detail page, when I change the status, then the change is reflected immediately in the list view

---

### User Story 3 — Password Reset: Flow & Moderator Handoff (P3)

**As a** moderator resetting a child user's password, I want a clear, guided reset flow with an explicit reminder that I am responsible for sharing the new password with the child so that the reset is completed safely and the child is not locked out.

**Requirements:**
- Before the reset executes, the system must display a **confirmation dialog**: "You are about to reset the password for [username]. This will affect all Autodesk products. Do you want to continue?"
- Upon confirming, the system generates a new password and displays it — **masked by default**
- Moderator must be able to **toggle visibility** (show/hide) on the new password
- A **copy to clipboard** button must be available alongside the password
- Upon successful reset, a **handoff dialog** must be displayed informing the moderator:
  - The password has been successfully reset for [username]
  - The moderator is responsible for sharing the new password with the child — this step is not automated
- All password reset events must be logged with timestamp and moderator identity (audit trail)

**Acceptance Criteria:**
- Given I click Reset Password, then a confirmation dialog appears before any action is taken
- Given I confirm the reset, then the new password is shown masked by default with a show/hide toggle and copy button
- Given the reset is successful, then a handoff dialog appears reminding me to share the password with the child user
- Given I complete the flow, then the reset event is logged with my identity and a timestamp
- Given I dismiss the confirmation dialog, then no reset occurs and the user's password is unchanged

---

## 7. Functional Requirements

| ID | Requirement |
|---|---|
| FR-001 | System MUST display a list of all child accounts associated with the logged-in moderator upon login |
| FR-002 | System MUST display Username, Status, and Last Active for each account in the list |
| FR-003 | System MUST exclude users with Status = Deleted from the list view |
| FR-004 | System MUST allow moderators to navigate to a per-user detail page from the list |
| FR-005 | System MUST display all applications a child user has access to, with Last Use Date per app |
| FR-006 | System MUST allow moderators to reset a child user's password |
| FR-007 | System MUST allow moderators to change a child user's status to Suspended |
| FR-008 | System MUST allow moderators to change a child user's status to Deleted |
| FR-009 | System MUST display a confirmation dialog before executing a password reset |
| FR-010 | System MUST comply with COPPA data handling requirements throughout |
| FR-011 | System MUST display the new password masked by default after a successful reset |
| FR-012 | System MUST provide a show/hide toggle for the new password |
| FR-013 | System MUST provide a copy-to-clipboard button for the new password |
| FR-014 | System MUST display a handoff dialog after successful reset, informing the moderator they are responsible for sharing the new password with the child |

---

## 8. Non-Functional Requirements

- **Compliance:** All data handling must comply with COPPA and Autodesk child data protection policies
- **Auditability:** All moderator actions (status changes, password resets) must be logged with timestamp and moderator identity
- **Access control:** Moderators must only be able to view and act on accounts they are explicitly assigned to oversee — no cross-moderator visibility
- **Performance:** User list and detail pages must load within 3 seconds under normal conditions

---

## 9. Success Metrics

| Metric | Target |
|---|---|
| Moderator time-to-resolution for password reset requests | Reduced from days (out-of-band) to under 5 minutes |
| % of moderators who can complete a status change without support | 90%+ on first attempt |
| Reduction in support tickets related to child account management | 50% reduction within 60 days of launch |
| COPPA audit pass rate | 100% — all moderator actions logged and auditable |

---

## 10. Assumptions

- Moderator-to-child account relationships already exist in the Autodesk identity system and can be queried
- Authentication for moderators uses existing Autodesk Identity platform - AuthZ/AuthN/SSO - no new auth system required
- App access data (which apps a child uses + last use date) is available via existing Autodesk APIs
- Mobile support is out of scope for v1 — web only
- The MVP launch targets US region — and does not require localization for v1

---

## 11. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What is the moderator assignment model? How does Autodesk track which moderators oversee which children? | Engineering | Open |
| 2 | Are there legal constraints on what moderators can see (e.g., can they see app usage data under COPPA)? | Legal | Open |
| 3 | What happens to a child's data when status is changed to Deleted — soft delete or hard delete? | Legal / Engineering | Open |
| 4 | Is "Deleted" a reversible status or permanent? | PM / Legal | Open |
| 5 | Which team owns the password reset API — does it support app-level scope today? | Engineering | Open |
