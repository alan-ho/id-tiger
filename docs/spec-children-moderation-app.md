# Feature Specification: COPPA Moderator Dashboard

**Feature Branch**: `001-coppa-mod-dashboard`
**Created**: 2026-04-13
**Status**: Draft
**Input**: Derived from PRD — Children Moderation Application (`mydocs/PRD - Children Moderation Application.md`)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Moderator User List View (Priority: P1)

As a moderator, when I log in, I want to see an immediate list of all child/student accounts I manage so I can quickly assess their status and take action.

**Why this priority**: This is the entry point to all other functionality. Without the list view, a moderator cannot navigate to any individual account. It also delivers standalone value — a moderator can check account statuses without needing to take any action.

**Independent Test**: Can be fully tested by logging in as a moderator and verifying that only Active and Suspended accounts appear in the list with correct Username, Status, and Last Active data — without needing any other feature to be built.

**Acceptance Scenarios**:

1. **Given** I am a logged-in moderator, **When** I land on the dashboard, **Then** I see a list of all child accounts I oversee with Status = Active or Suspended
2. **Given** a child account has Status = Deleted, **When** I view the list, **Then** that account does not appear
3. **Given** the list is populated, **When** I sort by any column, **Then** the list reorders correctly
4. **Given** the list is populated, **When** I search by username, **Then** only matching accounts are displayed

---

### User Story 2 - User Detail View & Account Actions (Priority: P2)

As a moderator, when I click on a user in the list, I want to see their full account detail — including which Autodesk applications they have access to and when they last used each — and be able to take administrative actions on that account.

**Why this priority**: Depends on US1 (need the list to navigate from), but once there, delivers the core administrative value — the ability to act on individual accounts. Suspend and Delete are critical compliance controls.

**Independent Test**: Can be fully tested by navigating to a user detail page and verifying: apps + last use dates are shown, and Suspend/Delete status changes are reflected immediately in the list view — without the password reset flow being built.

**Acceptance Scenarios**:

1. **Given** I am on the user list, **When** I click a user, **Then** I am taken to their detail page
2. **Given** I am on the detail page, **When** I view the page, **Then** I see all Autodesk applications the child has access to and the Last Use Date for each
3. **Given** I am on the detail page, **When** I change the user's status to Suspended, **Then** the change is applied and reflected in the list view
4. **Given** I am on the detail page, **When** I change the user's status to Deleted, **Then** the change is applied and the user no longer appears in the list view
5. **Given** I am on the detail page, **When** I click Reset Password, **Then** the password reset flow is initiated (US3)

---

### User Story 3 - Password Reset Flow & Moderator Handoff (Priority: P3)

As a moderator resetting a child user's password, I want a guided reset flow that makes the new password easy to securely hand off, with an explicit reminder that sharing it with the child is my responsibility.

**Why this priority**: Depends on US2 (reset is initiated from the detail page). Delivers the highest-friction workflow improvement — password resets currently take days via out-of-band coordination. The moderator handoff design is also a key COPPA accountability mechanism.

**Independent Test**: Can be fully tested by initiating a password reset from the detail page and verifying: confirmation dialog appears, new password is masked with show/hide and copy controls, handoff dialog appears on success, and the action is logged — without any other story needing changes.

**Acceptance Scenarios**:

1. **Given** I click Reset Password, **When** the action is triggered, **Then** a confirmation dialog appears: "You are about to reset the password for [username]. This will affect all Autodesk products. Do you want to continue?"
2. **Given** I dismiss the confirmation dialog, **When** I cancel, **Then** no reset occurs and the user's password is unchanged
3. **Given** I confirm the reset, **When** the reset completes, **Then** the new password is displayed masked by default with a show/hide toggle and a copy-to-clipboard button
4. **Given** the reset is successful, **When** I view the result, **Then** a handoff dialog informs me: the password has been reset, and I am responsible for sharing it with the child — this is not automated
5. **Given** I complete the flow, **When** the action is recorded, **Then** the reset event is logged with my identity and a timestamp

---

### Edge Cases

- What happens when a moderator has no child accounts assigned — does the list show an empty state or an error?
- What happens if a status change (Suspend/Delete) fails mid-action — is the moderator informed, and is the previous state preserved?
- What happens if the password reset API is unavailable — does the moderator see a clear error rather than a silent failure?
- What happens if a moderator attempts to access a child account they are not assigned to oversee — is access denied with a clear message?
- What happens to in-progress sessions for a child user when their account is Deleted?

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display only child accounts with Status = Active or Suspended in the moderator list view
- **FR-002**: System MUST display Username, Status, and Last Active for each account in the list
- **FR-003**: System MUST support sorting and searching within the account list
- **FR-004**: System MUST allow moderators to navigate from the list to a per-user detail page
- **FR-005**: System MUST display all Autodesk applications a child has access to, with Last Use Date per application, on the detail page
- **FR-006**: System MUST allow moderators to change a child user's status to Suspended
- **FR-007**: System MUST allow moderators to change a child user's status to Deleted
- **FR-008**: System MUST display a confirmation dialog before executing a password reset
- **FR-009**: System MUST display the new password masked by default after a successful reset, with show/hide toggle and copy-to-clipboard
- **FR-010**: System MUST display a handoff dialog after successful reset informing the moderator they are responsible for sharing the password with the child
- **FR-011**: System MUST log all moderator actions (status changes, password resets) with timestamp and moderator identity
- **FR-012**: System MUST restrict each moderator to only the child accounts they are explicitly assigned to oversee

### Key Entities

- **Moderator**: An adult user (teacher, parent, or administrator) with oversight of one or more child accounts. Has identity verified via Autodesk Identity platform.
- **Child Account**: An underage Autodesk user account. Has Status (Active / Suspended / Deleted), Username, and Last Active timestamp.
- **Application Access**: A record of which Autodesk application a child account has access to, and the Last Use Date for that application.
- **Audit Log Entry**: A record of a moderator action — action type, target account, moderator identity, and timestamp.
- **Password Reset Event**: A specific audit log entry capturing a password reset — includes moderator identity, target account, and timestamp.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Moderators can complete a password reset in under 5 minutes — down from the current multi-day out-of-band process
- **SC-002**: 90% of moderators successfully complete a status change on first attempt without requiring support
- **SC-003**: Support tickets related to child account management reduce by 50% within 60 days of launch
- **SC-004**: 100% of moderator actions are captured in the audit log — Autodesk passes COPPA compliance audit with no moderator tooling gaps

---

## Assumptions

- Moderator-to-child account relationships already exist in the Autodesk identity system and are queryable
- Authentication for moderators uses the existing Autodesk Identity platform (AuthZ/AuthN/SSO) — no new auth system required
- Application access data (which apps a child uses + last use date) is available via existing Autodesk APIs
- Password reset applies to all Autodesk products — app-level scope selection is not required
- MVP targets US region only — localization is out of scope for v1
- Mobile is out of scope for v1 — web only
- Bulk account actions are out of scope for v1
- Autodesk Admin audit access is out of scope for v1
