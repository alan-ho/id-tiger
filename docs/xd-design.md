# COPPA Supervision Center — Experience Design Document (XDD)

| Field | Value |
|---|---|
| Feature name | COPPA Supervision Center — Moderator account management flow |
| XDD owner | Alan Ho |
| Status | Draft |
| Doc version | 1.0 |
| Figma version | ⚠️ No named version saved — save and update before baselined status |
| Figma branch | — |
| Last updated / By | 2026-04-18 / Alan Ho |
| Change summary | Initial draft |
| Linked PRD IDs | PRD-001 – PRD-010, PRD-014 – PRD-021 |
| Linked architecture doc | Not yet authored |
| Linked Figma file | [COPPA — Moderator's Platform](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform) |

---

## 1. Purpose and scope

### Problem statement and UX objective

The COPPA Supervision Center gives moderators a self-service interface to manage child accounts under their supervision. A moderator is a **legal guardian, parent, or teacher** of the minor account holder. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §2

The UX objective is to reduce time-to-resolution for password reset requests — from days (out-of-band coordination) to under five minutes — while keeping the moderator fully in control of the handoff to the child. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §9

### Moderator persona

The moderator maps to Autodesk's **End User persona** — the doer, on tight deadlines, who needs software easy to adopt without formal training. For this app this means:

- Status labels in the table must be immediately interpretable ("Password requested", "Active") — no decoding required
- The password change flow must guide the moderator through requirements inline, not block them after submission
- Interactions must be predictable: one clear action per decision point
- Error messages must explain what to do, not just what went wrong

### In scope

- User Management screen: list of all child accounts the moderator oversees
- Kid Account Detail screen: per-user credential and app usage view
- Password Drawer: guided password reset flow with inline validation

### Out of scope

- Child-facing interface — children do not interact with this tool directly → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4
- Username editing → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4
- Account status changes (Suspend/Activate) → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4
- Bulk account actions → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4
- "Delete user" bulk action: button renders but is a no-op for this POC → [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-017
- **"Delete Account" on Kid Account Detail:** Button renders but is a no-op for this release — no confirmation modal, no API call. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4

### Language support

All static UI copy is authored and maintained in both **English** and **Korean**. The displayed language is determined automatically by the browser's language setting — there is no manual language switcher in the UI. English is the default for all other languages. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §10, Assumption 6

**Design implication:** Copy annotations in this XDD are written in English. Korean equivalents are a translation concern and do not affect layout or visual design — translated strings are expected to be comparable in length.

---

## 2. Design references

| Screen | Figma node | Route |
|---|---|---|
| User Management | [23:14271](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14271&m=dev) | `/supervision/user-management` |
| User Management — Empty State | [121:30174](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=121-30174&m=dev) | `/supervision/user-management` (no linked accounts) |
| Kid Account Detail | [23:14272](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14272&m=dev) | `/supervision/user-management/:userId` |
| Password Drawer | [23:14273](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14273&m=dev) | `/supervision/user-management/:userId` (overlay state) |

**⚠️ Figma version:** No named version saved yet. Save a named version and update the metadata block before this XDD moves to Baselined.

---

## 3. Figma divergences

These are deliberate decisions that differ from what Figma currently shows. Do not revert to the Figma values.

- **Placeholder nav tabs:** The Figma primary nav shows additional tabs (Activity tracking, Feature, Feature). These are **not rendered** in this release — only the "Supervision Center" title and the "User management" tab are shown.
- **Child avatar color:** Figma shows `color/blue/500/100` (#0696D7). That value fails WCAG AA (3.7:1 on white). Use `color/blue/700/100` instead (confirmed ≥4.5:1).
- **Password instruction text:** Figma currently reads "8 characters". The authoritative value is **10 characters** — see §8 for the correct string.
- **View tabs (3 total, 2 placeholders):** The three view tabs are `By accounts` (active), `By product` (placeholder — inert, no route), and `Pending approval` (placeholder — inert, no route). Only `By accounts` renders with content in this release. ⚠️ The PRD defines only two tabs and does not mention `Pending approval` — confirm acknowledgement with PM before build. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · User Story 1

---

## 4. Non-standard implementation notes

Layout, component names, and standard props are derivable from Figma and Weave docs. The notes below cover decisions that are not.

### Quirks and overrides

- **`Tabs` must use `variant="scrollable"`** — `appearance="quiet" variant="scrollable" scrollButtons={false}`. The quiet bottom border does not render without `variant="scrollable"` due to a Weave/MUI internal requirement.
- **Child avatar background is `color/blue/700/100`** (not 500) — accessibility override; see §3.
- **Row forward arrow is an anchor:** `<IconButton component="a" variant="quiet" size="medium">` — renders as `<a>` for semantic navigation, not a `<button>`.
- **Panel header background is `'background.paper'`** (MUI theme token), not `#fff` — required for future dark-mode compatibility.
- **Password masked value is always 14 asterisks (`**************`)**, regardless of actual password length.

### Custom components

- **`StatusBadge`** — custom wrapper around MUI `Chip`. Not a Weave component. Four variants: `info` (Password requested), `error` (Approval pending), `success` (Active), `default/no-fill` (Inactive).
- **`SetPasswordInput`** — custom component. Implements `FormControl` + `Input` with show/hide toggle and inline requirements checklist. Not a Weave or MUI primitive.
- **Password fields use `FormControl` + `Input`, not `TextField`** — per Weave Brand rules. Applies to both "Set password" and "Reenter password" fields.

### Non-obvious icon imports

```tsx
import { Search, Edit, Globe, CartFull, Home, Forward, Cross, Visible, Circle, Notification } from "@weave-brand/icon";
import { CaretLeft, CaretRight, Circle } from "@weave-brand/icon/ui-controls";
import { UserInsights } from "@weave-brand/icon/pictograms"; // no SvgIcon wrapper needed
```

- `Circle` (requirement checklist icon): color must come from MUI theme tokens — `'success.main'` when met, `'text.disabled'` when unmet. Never hardcode hex values.

---

## 5. Flows, states, and interactions

### Flow overview

```
User Management (list)
  └── Click row (Forward icon)
       └── Kid Account Detail
            └── Click edit icon (Password row)
                 └── Password Drawer (right panel)
                      ├── Save → return to Kid Account Detail
                      └── Cancel → return to Kid Account Detail
```

Entry: moderator navigates to `/supervision/user-management` after authentication.
Exit: moderator navigates away, closes the browser, or completes/cancels the password drawer.

### State matrix

Visual appearance for all states is in Figma. This matrix records the behavioral and copy rules not visible there.

| ID | State | Trigger / condition | Visual treatment | Copy | Next action | Figma ref |
|---|---|---|---|---|---|---|
| XD-S01 | User Management — Loading | Page navigation; data pending | Action bar renders immediately; skeletons for heading and table rows; "Delete user" disabled | — | Await data → XD-S02 | [23:14271](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14271&m=dev) |
| XD-S02 | User Management — Default | Data returned; no selection | Full table; pagination if needed | `"0 selected"` | Row click → Kid Account Detail | [23:14271](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14271&m=dev) |
| XD-S03 | User Management — Empty | No linked accounts | No table, no action bar, no pagination; UserInsights pictogram | `"You have no child user linked"` | — | [121:30174](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=121-30174&m=dev) |
| XD-S04 | User Management — Rows selected | ≥1 checkbox checked | Count updates; "Delete user" appears enabled (no-op — see PRD-017) | `"{n} selected"` | — | — |
| XD-S05 | Kid Account Detail — Loading | Navigation with `:userId`; data pending | Card headings render immediately; skeletons for all dynamic values; "Delete Account" disabled | — | Await data → XD-S06 | [23:14272](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14272&m=dev) |
| XD-S06 | Kid Account Detail — Default | Data returned; no active badge | Full detail view; password row shows 14 asterisks | — | Click edit icon → XD-S09 | [23:14272](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14272&m=dev) |
| XD-S07 | Kid Account Detail — Password Requested | `password_requested` status in credential response | "Password requested" badge between masked value and edit icon; edit icon remains interactive | `Password requested` | Click edit icon → XD-S09 | [23:14272](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14272&m=dev) |
| XD-S08 | Kid Account Detail — Delete Account (placeholder) | Click "Delete Account" button | No action — button is non-functional for this release | — | — | — |
| XD-S09 | Password Drawer — Initial open | Click edit icon (password row) | Drawer from right; background dimmed; "Set password" focused; "Save" disabled | `Password` (panel title) | Type → XD-S10 | [23:14273](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14273&m=dev) |
| XD-S10 | Password Drawer — In progress | Typing in "Set password" | Requirements checked in real time; `Circle` icon fills per met requirement | — | All met + match → Save enabled | [23:14273](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14273&m=dev) |
| XD-S11 | Password Drawer — Validation error | Save clicked; passwords don't match or requirement unmet | Inline error below "Reenter password"; unmet requirement highlighted | `"Passwords do not match"` (mismatch) | Fix input → retry | — |
| XD-S12 | Password Drawer — Save success | Valid matching password; API success | Drawer closes; "Password requested" badge removed without page reload; focus returns to edit icon | — | → XD-S06 (badge resolved) | — |
| XD-S13 | Password Drawer — Cancelled | × or Cancel clicked | Drawer closes; no changes saved | — | Focus returns to edit icon → XD-S06 or XD-S07 | — |

### Interaction rules

- **Action bar on loading (XD-S01):** The search field and buttons render immediately — do not skeleton them. Only the page heading and table rows are skeletonized.
- **Card headings on loading (XD-S05):** "Sign in with Autodesk" and "Apps" are static strings — render immediately. Skeletons replace: page title (username), last active date, username row value, password row value, apps table rows.
- **Password masked value (XD-S06, XD-S07):** Always **14 asterisks**, regardless of actual password length.
- **"Reenter password" field (XD-S10):** Stays empty until the moderator tabs to it — do not pre-fill or auto-focus.
- **Requirement checklist updates (XD-S10):** Synchronous with typing — no debounce delay.
- **Delete Account button (XD-S08):** Renders in the page header but is a no-op — clicking it has no effect and opens no modal.
- **Save success badge removal (XD-S12):** If a "Password requested" badge was present (XD-S07), it is removed immediately on save success without a page reload. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-010
- **⚠️ Gap — handoff dialog after save (XD-S12):** PRD-011 requires a handoff dialog after successful password reset informing the moderator they are responsible for sharing the new password with the child. This state is not yet specified in this XDD. Resolve with PM before implementation. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-011

---

## 6. Accessibility requirements

**Standard:** WCAG 2.2 AA. All items are required before implementation is considered complete. Run `adsk:accessibility-audit` skill against every screen after building.

### 6.1 Landmarks and page structure

- [ ] XD-A-01: `<header>` wraps the Universal Header.
- [ ] XD-A-02: `<nav aria-label="Primary navigation">` wraps the primary nav.
- [ ] XD-A-03: `<nav aria-label="Breadcrumb">` wraps the breadcrumb trail.
- [ ] XD-A-04: `<main>` wraps the page body on all screens.
- [ ] XD-A-05: Page `<title>` is set dynamically:
  - User management: `"User Management – Supervision Center"`
  - Kid Account Detail: `"[username] – User Management – Supervision Center"`
  - Password drawer: title unchanged; drawer is an overlay, not a new page.

### 6.2 Breadcrumbs

- [ ] XD-A-06: Breadcrumb is an ordered list `<ol>` of `<li>` items.
- [ ] XD-A-07: Home icon crumb: `<a aria-label="Home">` with icon `aria-hidden="true"`.
- [ ] XD-A-08: "User management" crumb: `<Link href="...">` from `@mui/material`.
- [ ] XD-A-09: "[username]" crumb (Screen 2/3 only): `aria-current="page"`, not a link.

### 6.3 User Management table

- [ ] XD-A-10: Table uses `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` for column headers.
- [ ] XD-A-11: Select-all checkbox: `aria-label="Select all accounts"`.
- [ ] XD-A-12: Row checkboxes: `aria-label="Select [username]"`.
- [ ] XD-A-13: "Last active" column sort button: `aria-sort="descending"` when sorted descending.
- [ ] XD-A-14: Forward arrow in each row: `aria-label="View [username]'s account"` and implemented as a link (`<a>` or MUI `Link`), not a `<div>`.
- [ ] XD-A-15: Status badges: `role="status"` is not needed here — badges are static table cell content, not live regions.

### 6.4 Page header (Screen 2)

- [ ] XD-A-16: Page avatar: `aria-hidden="true"` — the username Typography provides the visible label.
- [ ] XD-A-17: "Delete Account" button: `aria-label="Delete [username]'s account"`.

### 6.5 Credential card (Screen 2)

- [ ] XD-A-18: "Sign in with Autodesk" is rendered as `<h2>`.
- [ ] XD-A-19: Username and password rows use `<dl>` / `<dt>` / `<dd>` semantics, or equivalent ARIA roles, to associate labels with values.
- [ ] XD-A-20: Password row: value element has `aria-label="Password, hidden"` — screen readers must not read 14 asterisk characters.
- [ ] XD-A-21: "Password requested" badge: `role="status"` or `aria-live="polite"` so late-appearing badge changes are announced.
- [ ] XD-A-22: Edit icons: `aria-hidden="true"` on the SVG; the wrapping `IconButton` carries the accessible label:
  - Username row: `aria-label="Edit username"`
  - Password row: `aria-label="Edit password"`

### 6.6 Password drawer (Screen 3)

- [ ] XD-A-23: Drawer panel has `role="dialog"` and `aria-labelledby` pointing to the "Password" heading.
- [ ] XD-A-24: Focus is trapped within the drawer while it is open.
- [ ] XD-A-25: Closing the drawer (× button or Cancel) returns focus to the password edit icon.
- [ ] XD-A-26: Requirements list: `<ul>` with each requirement as `<li>`. When a requirement is met, the list item updates its text or `aria-label` to indicate completion.
- [ ] XD-A-27: Show/hide password toggles: `aria-label="Show password"` / `aria-label="Hide password"` toggling on click.
- [ ] XD-A-28: "Save" button: `aria-disabled="true"` when disabled (not `disabled` attribute, so it remains focusable and explains its state to screen readers).
- [ ] XD-A-29: Error message "Passwords do not match": `role="alert"` so it is announced immediately when it appears.

### 6.7 Color contrast

- [ ] XD-A-30: Page avatar (child, Screen 2/3): use `color/blue/700/100` — confirmed ≥4.5:1 on white. **Do not use `color/blue/500/100`** (#0696D7, ~3.7:1 — fails AA).
- [ ] XD-A-31: "Password requested" badge (`status-color/info/default` #1278AF) + white text: ~5.0:1. **Passes AA.**
- [ ] XD-A-32: `text-color/link/visited` (#666666) breadcrumb on white: 5.74:1. **Passes AA.**
- [ ] XD-A-33: Primary nav and header text (white on black): 21:1. **Passes AAA.**
- [ ] XD-A-34: Requirement items in unfulfilled state: check that the `Circle` icon colour against the panel background meets 3:1 (non-text contrast).

### 6.8 Keyboard navigation

- [ ] XD-A-35: Tab order on User Management: Universal Header → Primary Nav → Breadcrumbs → View tabs → Action bar → Table rows → Pagination.
- [ ] XD-A-36: Tab order on Kid Account Detail: Universal Header → Primary Nav → Breadcrumbs → Page Header → Card rows.
- [ ] XD-A-37: All edit icon buttons reachable by Tab and activated by Enter or Space.
- [ ] XD-A-38: Confirmation modal traps focus while open; Escape key dismisses it.
- [ ] XD-A-39: Password drawer traps focus while open; Escape key dismisses it.
- [ ] XD-A-40: Closing a modal or drawer returns focus to the trigger element.

### 6.9 Motion

- [ ] XD-A-41: Skeleton loading animations respect `prefers-reduced-motion`.
- [ ] XD-A-42: Password drawer slide-in animation respects `prefers-reduced-motion` — reduce to an instant appear/disappear.
- [ ] XD-A-43: Requirement icons (Circle → filled) transition respects `prefers-reduced-motion`.

### 6.10 WCAG 2.2 AA — additional criteria

- [ ] XD-A-44: **2.4.11 Focus Appearance** — All keyboard focus indicators have a minimum area of 2 CSS pixels around the component perimeter, and sufficient contrast (≥3:1) between focused and unfocused states. Applies to all interactive elements: buttons, links, checkboxes, inputs, `IconButton`, tabs.
- [ ] XD-A-45: **2.5.8 Target Size (Minimum)** — All interactive targets are at least 24×24 CSS pixels. Where the target itself is smaller, spacing around it brings the total to 24×24.
- [ ] XD-A-46: **3.3.8 Accessible Authentication** — The password change flow must not require solving a cognitive function test. The inline requirements list is informational — not a cognitive test — and is compliant.

---

## 7. Acceptance criteria

### XD-AC-01 – XD-AC-04 · User Management — layout and display

```
XD-AC-01
Given the moderator navigates to /supervision/user-management
Then the page heading "User management" is visible
And the breadcrumb shows: home icon / "User management" (current, not a link)
And the "By accounts" tab is active by default
And the table shows child accounts with columns: checkbox, user, last active, status, forward arrow
And the "0 selected" count is shown
And "Delete user" is disabled
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-001, PRD-002, PRD-014, PRD-015, PRD-016

```
XD-AC-02
Given the table has loaded
Then each row shows an avatar with the child's initials, the username, last active date, and a status badge
And each row has a forward arrow (→) that navigates to /supervision/user-management/:userId on click
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-001, PRD-004

```
XD-AC-03
Given the moderator checks one or more row checkboxes
Then the "{n} selected" count updates
And "Delete user" becomes enabled
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-015, PRD-016

```
XD-AC-04
Given the moderator has no child accounts
Then no table rows, action bar, or pagination are rendered
And the UserInsights pictogram is visible
And the heading "You have no child user linked" is visible
And the body "There is no record of child that's linked to your Autodesk account." is visible
```

### XD-AC-05 · User Management — pagination

```
XD-AC-05
Given the total number of child accounts exceeds the page size
Then pagination controls are visible below the table
And the previous (←) button is disabled on page 1
And the next (→) button is disabled on the last page
And clicking a page number loads that page of results
```

### XD-AC-06 – XD-AC-07 · User Management — delete user

> **Note:** The "Delete user" button is a UI placeholder in this release. Multi-selection and bulk deletion are not implemented. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-017

```
XD-AC-06
Given zero rows are selected
Then the "Delete user" button is disabled
```

```
XD-AC-07
Given one or more rows are selected
Then the "Delete user" button appears enabled
But clicking it has no effect (placeholder — not yet implemented)
```

### XD-AC-08 – XD-AC-11 · Kid Account Detail — layout and display

```
XD-AC-08
Given the moderator navigates to /supervision/user-management/:userId with valid data
Then the breadcrumb shows: home icon / "User management" (link) / "[username]" (current)
And the page title shows the child's username in headline-larger typography
And the last active date is shown to the right of the username in caption typography
And "Delete Account" is visible as an outlined button at the far right of the header row
And the "Sign in with Autodesk" card shows username and masked password rows
And the "Apps" card shows a table listing all apps the child has access to, with a "Last use date" column for each
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-004, PRD-005

```
XD-AC-09
Given the child has access to one or more apps
Then each app appears as a row in the Apps table with the app name and the last use date formatted as "Mon DD, YYYY"

Given an app the child has access to has never been used
Then the Last use date cell for that app shows "Never"
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-005, PRD-020

```
XD-AC-10
Given the page is loading
Then skeleton placeholders occupy: page title, last active date, username value, password value, and apps table rows
And "Delete Account" is disabled
```

```
XD-AC-11
Given a parent has requested a password reset
Then the password row shows the "Password requested" badge in blue
And the badge label is "Password requested"
And the edit icon remains visible and interactive
```

### XD-AC-12 · Kid Account Detail — delete account (placeholder)

> **Out of scope for this release.** The "Delete Account" button renders but is a no-op — no confirmation modal, no API call. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4

```
XD-AC-12
Given the moderator clicks "Delete Account"
Then nothing happens — no modal, no deletion
```

### XD-AC-15 – XD-AC-16 · Password drawer — open and close

```
XD-AC-15
Given the moderator clicks the edit icon in the Password row
Then the password drawer opens from the right
And the background page is dimmed
And the panel title is "Password"
And the "Set password" field is focused
And "Save" is disabled
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-006, PRD-007

```
XD-AC-16
Given the drawer is open and the moderator clicks "Cancel" or the × button
Then the drawer closes
And focus returns to the password edit icon
And the password row is unchanged
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-018

### XD-AC-17 – XD-AC-20 · Password drawer — validation

```
XD-AC-17
Given the moderator types a password that does not meet the minimum requirements
Then the unmet requirements remain unchecked in the requirements list
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-009

```
XD-AC-18
Given the moderator types a password that meets all requirements
Then all four requirement items show a filled/checked state
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-009

```
XD-AC-19
Given the passwords in "Set password" and "Reenter password" do not match and the moderator clicks "Save"
Then the error "Passwords do not match" appears below "Reenter password"
And the password is not saved
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-008

```
XD-AC-20
Given all requirements are met and both fields match
Then "Save" becomes enabled
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-008, PRD-009

### XD-AC-21 · Password drawer — save

```
XD-AC-21
Given a valid matching password is entered and the moderator clicks "Save"
Then the API is called to update the password
And on success the drawer closes
And focus returns to the password edit icon
And the password row continues to show masked asterisks
And if a "Password requested" badge was present it is removed immediately without a page reload
```
→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-010

> **⚠️ Gap — handoff dialog (PRD-011):** The PRD requires a handoff dialog after successful reset informing the moderator they are responsible for sharing the new password with the child. This is not yet specified in this XDD. Resolve before implementation. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-011

---

## 8. Editorial

All strings below are final. Do not alter casing, punctuation, or phrasing without a spec change.

### 8.1 Navigation labels

| Location | String | Notes |
|---|---|---|
| Primary nav — app title | `Supervision Center` | |
| Primary nav — tab 1 | `User management` | Active on all three screens |
| Primary nav — tab 2 | `Activity tracking` | Placeholder — render as inert, no route |
| Primary nav — tab 3 | `Notification` | Placeholder — render as inert, no route |

### 8.2 User Management — non-obvious copy rules

- View tabs (sentence case): `By accounts` (active) / `By product` (placeholder) / `Pending approval` (placeholder). The latter two render as inert — no route, no content. ⚠️ `Pending approval` is not in the PRD — see §3.
- Table column heading: `User ({n})` — total count in parentheses, e.g. `User (98)`.
- Selection count: `{n} selected` — e.g. `0 selected`, `3 selected`.
- Empty state body ends with a full stop: `"There is no record of child that's linked to your Autodesk account."`

### 8.3 Status badge labels

| Status | Badge text | Color |
|---|---|---|
| Password reset requested | `Password requested` | info (blue) |
| Account awaiting approval | `Approval pending` | error (red/orange) |
| Account in good standing | `Active` | success (green) |
| Account suspended or dormant | `Inactive` | default (no fill) |

### 8.4 Kid Account Detail — non-obvious copy rules

- Delete button: `Delete Account` — **title case** (both words capitalised), unlike `Delete user` which is sentence case.
- Card description: apostrophe in `child's` is a **right single quotation mark** (`'`), not a straight apostrophe.
- Breadcrumb current crumb: `[username]` rendered **exactly as stored**, no transformation.
- Last active format: `Last active Aug 30, 2027` — abbreviated month, no ordinal suffix.

### 8.5 Password drawer copy

| Location | String | Notes |
|---|---|---|
| Panel title | `Password` | Single word |
| Instruction text | `A string of at least 10 characters that includes numbers and letters.` | **10 characters** — Figma currently says "8" (not yet corrected) |
| Reenter password label | `Reenter password` | **One word, no hyphen** |
| Requirements heading | `A password must include:` | Followed by a list |
| Requirement 1 | `Minimum of 10 characters` | |
| Requirement 2 | `At least 1 uppercase and lowercase letter` | |
| Requirement 3 | `At least 1 symbol` | |
| Requirement 4 | `At least 1 number` | |

→ [prd-children-moderation-app.md](prd-children-moderation-app.md) · PRD-009

### 8.6 Error messages

| Trigger | Message |
|---|---|
| Passwords do not match | `Passwords do not match` |
| Password — requirement not met on submit | Highlight unmet requirement items; do not show a generic error message |
| Username — empty | `Username is required` |
| Username — too short | `Username must be at least 3 characters` |
| Username — too long | `Username must be 20 characters or fewer` |
| Username — invalid characters | `Username can only contain letters, numbers, and underscores` |
| Username — already taken | `This username is already in use. Please choose another.` |
| Generic API failure | `Something went wrong. Please try again.` |

> **⚠️ Note:** Username error messages are included here for future reference. Username editing is out of scope for this release — moderators cannot edit usernames. → [prd-children-moderation-app.md](prd-children-moderation-app.md) · §4


---

## 9. Performance

### 9.1 Layout stability

- [ ] Table rows reserve fixed height while loading — no layout shift as data populates.
- [ ] Page avatar container has explicit `width: 32px; height: 32px` before data loads.
- [ ] Artifakt Element font is preloaded via `<link rel="preload">` to prevent text layout shift.
- [ ] "Password requested" badge: reserve space or confirm badge is always present/absent at first paint to avoid CLS.
- [ ] Password drawer enter/exit animation does not cause reflow of the background page content.

### 9.2 Interaction responsiveness

- [ ] Page skeletons render within 100ms of navigation; data populates as responses resolve.
- [ ] Row click (forward arrow) navigates within 100ms — no visible delay.
- [ ] Password drawer opens within 100ms of clicking the edit icon.
- [ ] "Save" shows a loading/disabled state within 100ms of click while API call is in flight.
- [ ] Requirement checklist updates are synchronous with typing — no debounce delay visible to the user.

> **Note:** Server-side pagination strategy and API call patterns (single call on save, no re-fetch) are engineering spec concerns and are not specified here.
