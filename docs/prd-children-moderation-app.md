# PRD — Children Moderation Application

**Product Area:** Access — Identity & Compliance  
**Author:** Mrinal Shanker  
**Status:** Draft  
**Last Updated:** 2026-04-13  
**Stakeholders:** Access PM, XD, Engineering, Legal/Compliance  

---

## 1. Overview

Autodesk supports child and underage users across its product suite in compliance with COPPA (Children's Online Privacy Protection Act). The primary surface where child accounts are active today is TinkerCAD.

Currently, moderators have no self-service tooling to manage the accounts they oversee. Actions like password resets require the child user to contact their moderator, and the moderator has no consolidated view of account status or activity. This workflow is cumbersome, unscalable, and creates compliance risk.

This PRD defines a **Moderator Dashboard** — a web interface that gives moderators the tools to efficiently manage child/student accounts while staying compliant with COPPA and Autodesk data protection policies.

---

## 2. Problem Statement

**Who is affected:** Moderators (teachers, parents, administrators) managing child Autodesk accounts, and the child users whose requests go unresolved due to friction.

**What the problem is:** There is no centralized interface for moderators to view, manage, or take action on the child accounts they are responsible for. Password resets require manual, out-of-band coordination.

**Why it matters:**
- Moderators cannot efficiently fulfill their oversight responsibilities
- Child users are blocked on basic account recovery tasks
- Autodesk cannot demonstrate adequate COPPA compliance controls without auditable moderator tooling
- Qualitative and quantitative user feedback signals confirm this is a near-term priority

---

## 3. Goals

- Enable moderators to view all child/student accounts they oversee from a single interface
- Provide moderators with the ability to perform password resets on behalf of child users
- Ensure all functionality complies with COPPA and Autodesk child data protection requirements
- Reduce time-to-resolution for password reset requests

## 4. Non-Goals

- This is not a child-facing interface — children do not interact with this tool directly
- This does not cover adult account management
- This does not replace or modify the existing Autodesk identity/auth system — it is a management layer on top of it
- Moderators cannot change account status (Suspend) — out of scope for this POC
- Delete user functionality is out of scope for this POC — the button is present in the UI but non-functional (no-op)
- Moderators cannot edit usernames
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
- The list view has two tabs: **"By accounts"** (active) and **"By product"** (placeholder — out of scope for v1)
- The "By accounts" tab must display the following for each managed user:
  - Username
  - Status (Active / Password requested)
  - Last Active information
- All assigned users appear in the list regardless of status — no filtering applied
- List must be sortable and searchable

**Acceptance Criteria:**
- Given I am a logged-in moderator, when I land on the dashboard, then I see all child accounts I manage
- Given a child has triggered a password reset request, when I view the list, then their status shows as "Password requested"
- Given the list is populated, when I sort by any column, then the list reorders correctly
- Given the list is populated, when I search by username, then only matching accounts are displayed

---

### User Story 2 — User Detail View (P2)

**As a** moderator, **when I click on a user** in the list, I want to navigate to their detail page so I can review their app usage and initiate a password reset if needed.

**Requirements:**
- Clicking a user in the list view must navigate to a detail page for that user
- The detail page must display:
  - A list of all **Applications** the child has access to
  - The **Last Use Date** for each application
- The only moderator action available on the detail page is **Reset Password**
- Moderators cannot edit the username

**Acceptance Criteria:**
- Given I am on the user list, when I click a user, then I am taken to their detail page
- Given I am on the detail page, then I can see all apps the child accesses and when they last used each
- Given I am on the detail page, when I click Reset Password, then the password reset flow is initiated

---

### User Story 3 — Password Reset: Flow & Moderator Handoff (P3)

**As a** moderator resetting a child user's password, I want to set a new password myself via a guided drawer, with inline validation and an explicit reminder that I am responsible for sharing the new password with the child.

**Requirements:**
- Clicking Reset Password opens a **drawer** with two fields: "Set password" and "Reenter password"
- The drawer must include **inline validation** (passwords must match, minimum strength requirements)
- Upon successful reset:
  - The child's status automatically reverts to **Active**
  - A **handoff dialog** is displayed informing the moderator:
    - The password has been successfully reset for [username]
    - The moderator is responsible for sharing the new password with the child — this step is not automated
- All password reset events must be logged with timestamp and moderator identity (audit trail)

**Acceptance Criteria:**
- Given I click Reset Password, then a drawer opens with "Set password" and "Reenter password" fields
- Given I enter mismatched passwords, then inline validation prevents submission and shows an error
- Given I submit a valid password, then the reset is applied, the user's status reverts to Active, and a handoff dialog appears
- Given I complete the flow, then the reset event is logged with my identity and a timestamp
- Given I close the drawer without submitting, then no reset occurs and the user's status is unchanged

---

### User Story 4 — Delete User UI (P4)

**As a** moderator, I want to see a Delete user button in the list view that activates when I select accounts, so the interface is ready for delete functionality in a future release.

**Requirements:**
- Each row in the list must have a **checkbox** for selection
- A **"Delete user"** button must appear in the action bar above the list
- The "Delete user" button must be **disabled** when 0 users are selected
- The "Delete user" button must be **enabled** when ≥1 user is selected
- The action bar must display the count of selected users (e.g. "2 selected")
- Clicking "Delete user" is a **no-op for this POC** — no action is taken, no dialog appears
- A header checkbox must allow selecting all visible users at once

**Acceptance Criteria:**
- Given I am on the list view, then each row has a checkbox and "Delete user" is disabled
- Given I select one or more users, then the action bar shows "[n] selected" and "Delete user" becomes enabled
- Given I click "Delete user", then nothing happens — no dialog, no deletion
- Given I select all users via the header checkbox, then all visible users are selected

---

## 7. Functional Requirements

| ID | Requirement |
|---|---|
| FR-001 | System MUST display all child accounts associated with the logged-in moderator upon login |
| FR-002 | System MUST display Username, Status, and Last Active for each account in the list |
| FR-003 | System MUST support sorting and searching within the account list |
| FR-004 | System MUST allow moderators to navigate to a per-user detail page from the list |
| FR-005 | System MUST display all applications a child user has access to, with Last Use Date per app |
| FR-006 | System MUST allow moderators to initiate a password reset from the detail page |
| FR-007 | System MUST open a drawer with "Set password" and "Reenter password" fields when a password reset is initiated |
| FR-008 | System MUST validate that both password fields match before allowing submission |
| FR-009 | System MUST enforce minimum password strength requirements with inline validation |
| FR-010 | System MUST automatically update the user's status to Active upon successful password reset |
| FR-011 | System MUST display a handoff dialog after successful reset, informing the moderator they are responsible for sharing the new password with the child |
| FR-012 | System MUST log all password reset events with timestamp and moderator identity |
| FR-013 | System MUST comply with COPPA data handling requirements throughout |
| FR-014 | System MUST display a checkbox on each row in the list view |
| FR-015 | System MUST display a "Delete user" button in the action bar, enabled only when ≥1 user is selected |
| FR-016 | System MUST display the count of selected users in the action bar (e.g. "2 selected") |
| FR-017 | Clicking "Delete user" MUST be a no-op for this POC — no action, no dialog, no deletion |

---

## 8. Non-Functional Requirements

- **Compliance:** All data handling must comply with COPPA and Autodesk child data protection policies
- **Auditability:** All moderator actions (password resets) must be logged with timestamp and moderator identity
- **Access control:** Moderators must only be able to view and act on accounts they are explicitly assigned to oversee — no cross-moderator visibility
- **Performance:** User list and detail pages must load within 3 seconds under normal conditions

---

## 9. Success Metrics

| Metric | Target |
|---|---|
| Moderator time-to-resolution for password reset requests | Reduced from days (out-of-band) to under 5 minutes |
| % of moderators who can complete a password reset without support | 90%+ on first attempt |
| Reduction in support tickets related to child password resets | 50% reduction within 60 days of launch |
| COPPA audit pass rate | 100% — all moderator actions logged and auditable |

---

## 10. Assumptions

- Moderator-to-child account relationships already exist in the Autodesk identity system and can be queried
- Authentication for moderators uses existing Autodesk Identity platform - AuthZ/AuthN/SSO - no new auth system required
- App access data (which apps a child uses + last use date) is available via existing Autodesk APIs
- "Password requested" status is triggered by the child through their product — the mechanism is out of scope for this application
- Mobile support is out of scope for v1 — web only
- The MVP supports English and Korean — language detection is browser-based
- Bulk account actions are out of scope for v1
- Autodesk Admin audit access is out of scope for v1

---

## 11. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| 1 | What is the moderator assignment model? How does Autodesk track which moderators oversee which children? | Engineering | Open |
| 2 | Are there legal constraints on what moderators can see (e.g., can they see app usage data under COPPA)? | Legal | Open |
| 3 | Which team owns the password reset API? | Engineering | Open |
