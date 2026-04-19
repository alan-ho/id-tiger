# Spec: COPPA Supervision Center

**Feature:** COPPA Supervision Center — Moderator account management flow  
**Figma source:** [COPPA — Moderator's Platform](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform)  
**Status:** Draft  
**Author:** Alan Ho  
**Last updated:** 2026-04-18

| Screen | Node | Route |
|---|---|---|
| User Management | [23:14271](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14271&m=dev) | `/supervision/user-management` |
| User Management — Empty State | [121:30174](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=121-30174&m=dev) | `/supervision/user-management` (no linked accounts) |
| Kid Account Detail | [23:14272](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14272&m=dev) | `/supervision/user-management/:userId` |
| Password Drawer | [23:14273](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=23-14273&m=dev) | `/supervision/user-management/:userId` (overlay state) |

---

## 1. Purpose

The COPPA Supervision Center allows moderators to manage child accounts under their supervision. A moderator is a **legal guardian, parent, or teacher** of the minor account holder.

### User Flow

```
User Management (list)
  └── Click row (Forward icon)
       └── Kid Account Detail
            └── Click edit icon (Password row)
                 └── Password Drawer (right panel)
                      ├── Save → return to Kid Account Detail
                      └── Cancel → return to Kid Account Detail
```

### Moderator as End User

The moderator maps to Autodesk's **End User persona** — the doer, on tight deadlines, who needs software that is easy to adopt without formal training. For this app this means:

- Status labels in the table must be immediately interpretable ("Password requested", "Active") — no decoding required
- The password change flow must guide the moderator through requirements inline, not block them after submission
- Interactions must be predictable: one clear action per decision point
- Error messages must explain what to do, not just what went wrong

---

## 1.1 Language Support

All static UI copy must be authored and maintained in both **English** and **Korean**. The displayed language is determined automatically by the browser's language setting — there is no manual language switcher in the UI. English is the default for all other languages.

**Design implication:** Copy annotations in this spec are written in English. Korean equivalents are a translation concern and do not affect layout or visual design — translated strings are expected to be comparable in length.

---

## 2. Figma Divergences

These are deliberate decisions that differ from what Figma currently shows. Do not revert to the Figma values.

- **Placeholder nav tabs:** The Figma primary nav shows additional tabs (Activity tracking, Feature, Feature). These are **not rendered** in this release — only the "Supervision Center" title and the "User management" tab are shown.
- **Child avatar color:** Figma shows `color/blue/500/100` (#0696D7). That value fails WCAG AA (3.7:1 on white). Use `color/blue/700/100` instead (confirmed ≥4.5:1).
- **Password instruction text:** Figma currently reads "8 characters". The authoritative value is **10 characters** — see §7 for the correct string.
- **⚠️ Open gap — "Pending approval" tab:** Figma shows three view tabs on the User Management screen: "By accounts", "By product", and "Pending approval". The spec lists only two. Clarify with Alan whether "Pending approval" renders in this release or is a placeholder (like the nav tabs).

---

## 3. Non-Standard Implementation Notes

Layout, component names, and standard props are derivable from Figma and Weave docs. The notes below cover decisions that are not.

### Quirks and overrides

- **`Tabs` must use `variant="scrollable"`** — `appearance="quiet" variant="scrollable" scrollButtons={false}`. The quiet bottom border does not render without `variant="scrollable"` due to a Weave/MUI internal requirement.
- **Child avatar background is `color/blue/700/100`** (not 500) — accessibility override; see §2.
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

## 4. States

Visual appearance for all states is in Figma. The notes below cover behavioral rules not visible there.

### 4.1 User Management — Loading

- Action bar (search field + buttons) renders **immediately** — do not skeleton it.
- Skeleton placeholders replace: page heading, table rows.
- "Delete user" button disabled during load.

### 4.2 User Management — Empty State

Table, action bar, and pagination are not rendered. Visual: [Figma node 121:30174](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=121-30174&m=dev).

### 4.3 Kid Account Detail — Default

- Password row masked value: always **14 asterisks**, regardless of actual password length.
- Edit icon on password row is **visible but inert** in this release — clicking it opens the Password Drawer (spec A2 placeholder note in Figma is incorrect; the icon is interactive).

### 4.4 Kid Account Detail — Loading

- Card headings ("Sign in with Autodesk", "Apps") render **immediately** — they are static strings.
- Skeleton placeholders replace: page title (username), last active date, username row value, password row value, apps table rows.
- "Delete Account" button disabled during load.

### 4.5 Kid Account Detail — Password Requested

- "Password requested" badge appears **between** the masked value and the edit icon.
- Edit icon remains visible and interactive — the moderator can still open the drawer.

### 4.6 Delete Account Confirmation

Triggered by clicking "Delete Account":

- Modal title: `"Permanently delete account?"`
- Modal body: `"This will permanently delete [username]'s account and all associated data. This cannot be undone."`
- Actions: `"Delete"` (contained, destructive) | `"Cancel"` (outlined)
- On confirm: account deleted via API → redirect to `/supervision/user-management` → success toast: `"Account deleted"`
- On cancel: modal closes, focus returns to "Delete Account" button

### 4.7 Password Drawer — States

**Initial open:** "Set password" field empty and focused. "Save" disabled.

**In progress:** Each password requirement is checked in real time as the moderator types. `Circle` icon fills per met requirement. "Reenter password" field stays empty until the moderator tabs to it.

**Validation error on Save:**
- Passwords don't match → inline error `"Passwords do not match"` below "Reenter password" field
- Unmet requirement → that requirement item highlighted in error state; no generic error shown

**Save success:** Drawer closes. Focus returns to the password edit icon. If "Password requested" badge was present, it is **removed immediately** — no page reload.

**Cancelled (× or Cancel):** Drawer closes. No changes saved. Focus returns to password edit icon. Password row unchanged.

---

## 5. Acceptance Criteria

### 5.1 User Management — Layout and Display

```
Given the moderator navigates to /supervision/user-management
Then the page heading "User management" is visible
And the breadcrumb shows: home icon / "User management" (current, not a link)
And the "By accounts" tab is active by default
And the table shows child accounts with columns: checkbox, user, last active, status, forward arrow
And the "0 selected" count is shown
And "Delete user" is disabled
```

```
Given the table has loaded
Then each row shows an avatar with the child's initials, the username, last active date, and a status badge
And each row has a forward arrow (→) that navigates to /supervision/user-management/:userId on click
```

```
Given the moderator checks one or more row checkboxes
Then the "{n} selected" count updates
And "Delete user" becomes enabled
```

```
Given the moderator has no child accounts
Then no table rows, action bar, or pagination are rendered
And the UserInsights pictogram is visible
And the heading "You have no child user linked" is visible
And the body "There is no record of child that's linked to your Autodesk account." is visible
```

### 5.2 User Management — Pagination

```
Given the total number of child accounts exceeds the page size
Then pagination controls are visible below the table
And the previous (←) button is disabled on page 1
And the next (→) button is disabled on the last page
And clicking a page number loads that page of results
```

### 5.3 User Management — Delete User

> **Note:** The "Delete user" button is a UI placeholder in this release. Multi-selection and bulk deletion are not implemented. The button renders but does not trigger any action when clicked.

```
Given zero rows are selected
Then the "Delete user" button is disabled

Given one or more rows are selected
Then the "Delete user" button appears enabled
But clicking it has no effect (placeholder — not yet implemented)
```

### 5.4 Kid Account Detail — Layout and Display

```
Given the moderator navigates to /supervision/user-management/:userId with valid data
Then the breadcrumb shows: home icon / "User management" (link) / "[username]" (current)
And the page title shows the child's username in headline-larger typography
And the last active date is shown to the right of the username in caption typography
And "Delete Account" is visible as an outlined button at the far right of the header row
And the "Sign in with Autodesk" card shows username and masked password rows
And the "Apps" card shows a table listing all apps the child has access to, with a "Last use date" column for each
```

```
Given the child has access to one or more apps
Then each app appears as a row in the Apps table with the app name and the last use date formatted as "Mon DD, YYYY"

Given an app the child has access to has never been used
Then the Last use date cell for that app shows "Never"
```

```
Given the page is loading
Then skeleton placeholders occupy: page title, last active date, username value, password value, and apps table rows
And "Delete Account" is disabled
```

```
Given a parent has requested a password reset
Then the password row shows the "Password requested" badge in blue
And the badge label is "Password requested"
And the edit icon remains visible and interactive
```

### 5.5 Delete Account

```
Given the moderator clicks "Delete Account"
Then a confirmation modal appears with title "Permanently delete account?"
And the modal body includes the child's username and the phrase "cannot be undone"
And focus moves to the modal

Given the modal is open and the moderator clicks "Cancel"
Then the modal closes
And focus returns to the "Delete Account" button
And the account is not deleted

Given the modal is open and the moderator clicks "Delete"
Then the account is deleted via API
And the moderator is redirected to /supervision/user-management
And a success toast appears: "Account deleted"
```

### 5.6 Password Drawer — Open and Close

```
Given the moderator clicks the edit icon in the Password row
Then the password drawer opens from the right
And the background page is dimmed
And the panel title is "Password"
And the "Set password" field is focused
And "Save" is disabled

Given the drawer is open and the moderator clicks "Cancel" or the × button
Then the drawer closes
And focus returns to the password edit icon
And the password row is unchanged
```

### 5.7 Password Drawer — Validation

```
Given the moderator types a password that does not meet the minimum requirements
Then the unmet requirements remain unchecked in the requirements list

Given the moderator types a password that meets all requirements
Then all four requirement items show a filled/checked state

Given the passwords in "Set password" and "Reenter password" do not match and the moderator clicks "Save"
Then the error "Passwords do not match" appears below "Reenter password"
And the password is not saved

Given all requirements are met and both fields match
Then "Save" becomes enabled
```

### 5.8 Password Drawer — Save

```
Given a valid matching password is entered and the moderator clicks "Save"
Then the API is called to update the password
And on success the drawer closes
And focus returns to the password edit icon
And the password row continues to show masked asterisks
And if a "Password requested" badge was present it is removed immediately without a page reload
```

---

## 6. Accessibility Checks

**Standard:** WCAG 2.2 AA. All items are required before implementation is considered complete. Run `adsk:accessibility-audit` skill against every screen after building.

### 6.1 Landmarks and Page Structure

- [ ] `<header>` wraps the Universal Header.
- [ ] `<nav aria-label="Primary navigation">` wraps the primary nav.
- [ ] `<nav aria-label="Breadcrumb">` wraps the breadcrumb trail.
- [ ] `<main>` wraps the page body on all screens.
- [ ] Page `<title>` is set dynamically:
  - User management: `"User Management – Supervision Center"`
  - Kid Account Detail: `"[username] – User Management – Supervision Center"`
  - Password drawer: title unchanged; drawer is an overlay, not a new page.

### 6.2 Breadcrumbs

- [ ] Breadcrumb is an ordered list `<ol>` of `<li>` items.
- [ ] Home icon crumb: `<a aria-label="Home">` with icon `aria-hidden="true"`.
- [ ] "User management" crumb: `<Link href="...">` from `@mui/material`.
- [ ] "[username]" crumb (Screen 2/3 only): `aria-current="page"`, not a link.

### 6.3 User Management Table

- [ ] Table uses `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` for column headers.
- [ ] Select-all checkbox: `aria-label="Select all accounts"`.
- [ ] Row checkboxes: `aria-label="Select [username]"`.
- [ ] "Last active" column sort button: `aria-sort="descending"` when sorted descending.
- [ ] Forward arrow in each row: `aria-label="View [username]'s account"` and implemented as a link (`<a>` or MUI `Link`), not a `<div>`.
- [ ] Status badges: `role="status"` is not needed here — badges are static table cell content, not live regions.

### 6.4 Page Header (Screen 2)

- [ ] Page avatar: `aria-hidden="true"` — the username Typography provides the visible label.
- [ ] "Delete Account" button: `aria-label="Delete [username]'s account"`.

### 6.5 Credential Card (Screen 2)

- [ ] "Sign in with Autodesk" is rendered as `<h2>`.
- [ ] Username and password rows use `<dl>` / `<dt>` / `<dd>` semantics, or equivalent ARIA roles, to associate labels with values.
- [ ] Password row: value element has `aria-label="Password, hidden"` — screen readers must not read 14 asterisk characters.
- [ ] "Password requested" badge: `role="status"` or `aria-live="polite"` so late-appearing badge changes are announced.
- [ ] Edit icons: `aria-hidden="true"` on the SVG; the wrapping `IconButton` carries the accessible label:
  - Username row: `aria-label="Edit username"`
  - Password row: `aria-label="Edit password"`

### 6.6 Password Drawer (Screen 3)

- [ ] Drawer panel has `role="dialog"` and `aria-labelledby` pointing to the "Password" heading.
- [ ] Focus is trapped within the drawer while it is open.
- [ ] Closing the drawer (× button or Cancel) returns focus to the password edit icon.
- [ ] Requirements list: `<ul>` with each requirement as `<li>`. When a requirement is met, the list item updates its text or `aria-label` to indicate completion.
- [ ] Show/hide password toggles: `aria-label="Show password"` / `aria-label="Hide password"` toggling on click.
- [ ] "Save" button: `aria-disabled="true"` when disabled (not `disabled` attribute, so it remains focusable and explains its state to screen readers).
- [ ] Error message "Passwords do not match": `role="alert"` so it is announced immediately when it appears.

### 6.7 Color Contrast

- [ ] Page avatar (child, Screen 2/3): use `color/blue/700/100` — confirmed ≥4.5:1 on white. **Do not use `color/blue/500/100`** (#0696D7, ~3.7:1 — fails AA).
- [ ] "Password requested" badge (`status-color/info/default` #1278AF) + white text: ~5.0:1. **Passes AA.**
- [ ] `text-color/link/visited` (#666666) breadcrumb on white: 5.74:1. **Passes AA.**
- [ ] Primary nav and header text (white on black): 21:1. **Passes AAA.**
- [ ] Requirement items in unfulfilled state: check that the `Circle` icon colour against the panel background meets 3:1 (non-text contrast).

### 6.8 Keyboard Navigation

- [ ] Tab order on User Management: Universal Header → Primary Nav → Breadcrumbs → View tabs → Action bar → Table rows → Pagination.
- [ ] Tab order on Kid Account Detail: Universal Header → Primary Nav → Breadcrumbs → Page Header → Card rows.
- [ ] All edit icon buttons reachable by Tab and activated by Enter or Space.
- [ ] Confirmation modal traps focus while open; Escape key dismisses it.
- [ ] Password drawer traps focus while open; Escape key dismisses it.
- [ ] Closing a modal or drawer returns focus to the trigger element.

### 6.9 Motion

- [ ] Skeleton loading animations respect `prefers-reduced-motion`.
- [ ] Password drawer slide-in animation respects `prefers-reduced-motion` — reduce to an instant appear/disappear.
- [ ] Requirement icons (Circle → filled) transition respects `prefers-reduced-motion`.

### 6.10 WCAG 2.2 AA — Additional Criteria

- [ ] **2.4.11 Focus Appearance** — All keyboard focus indicators have a minimum area of 2 CSS pixels around the component perimeter, and sufficient contrast (≥3:1) between focused and unfocused states. Applies to all interactive elements: buttons, links, checkboxes, inputs, `IconButton`, tabs.
- [ ] **2.5.8 Target Size (Minimum)** — All interactive targets are at least 24×24 CSS pixels. Where the target itself is smaller, spacing around it brings the total to 24×24.
- [ ] **3.3.8 Accessible Authentication** — The password change flow must not require solving a cognitive function test. The inline requirements list is informational — not a cognitive test — and is compliant.

---

## 7. Editorial

All strings below are final. Do not alter casing, punctuation, or phrasing without a spec change.

### 7.1 Navigation Labels

| Location | String | Notes |
|---|---|---|
| Primary nav — app title | `Supervision Center` | |
| Primary nav — tab 1 | `User management` | Active on all three screens |
| Primary nav — tab 2 | `Activity tracking` | Placeholder — render as inert, no route |
| Primary nav — tab 3 | `Notification` | Placeholder — render as inert, no route |

### 7.2 User Management — Non-Obvious Copy Rules

- View tabs render as `By accounts` / `By product` (sentence case). See §2 gap note for "Pending approval".
- Table column heading: `User ({n})` — total count in parentheses, e.g. `User (98)`.
- Selection count: `{n} selected` — e.g. `0 selected`, `3 selected`.
- Empty state body ends with a full stop: `"There is no record of child that's linked to your Autodesk account."`

### 7.3 Status Badge Labels

| Status | Badge text | Color |
|---|---|---|
| Password reset requested | `Password requested` | info (blue) |
| Account awaiting approval | `Approval pending` | error (red/orange) |
| Account in good standing | `Active` | success (green) |
| Account suspended or dormant | `Inactive` | default (no fill) |

### 7.4 Kid Account Detail — Non-Obvious Copy Rules

- Delete button: `Delete Account` — **title case** (both words capitalised), unlike `Delete user` which is sentence case.
- Card description: apostrophe in `child's` is a **right single quotation mark** (`'`), not a straight apostrophe.
- Breadcrumb current crumb: `[username]` rendered **exactly as stored**, no transformation.
- Last active format: `Last active Aug 30, 2027` — abbreviated month, no ordinal suffix.

### 7.5 Password Drawer Copy

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

### 7.6 Error Messages

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

### 7.7 Modal Copy

| Modal | Title | Body |
|---|---|---|
| Delete account (single) | `Permanently delete account?` | `This will permanently delete [username]'s account and all associated data. This cannot be undone.` |

---

## 8. Performance

### 8.1 Data Fetching

- [ ] User Management: child accounts fetched client-side after navigation. Page size and pagination controlled server-side.
- [ ] Kid Account Detail: username and password status fetched after navigation. Badge state is part of the credential response — not a separate call.
- [ ] Page skeletons render within 100ms of navigation; data populates as responses resolve.
- [ ] Password save: single API call — no re-fetch of the full page on success.

### 8.2 Layout Stability

- [ ] Table rows reserve fixed height while loading — no layout shift as data populates.
- [ ] Page avatar container has explicit `width: 32px; height: 32px` before data loads.
- [ ] Artifakt Element font is preloaded via `<link rel="preload">` to prevent text layout shift.
- [ ] "Password requested" badge: reserve space or confirm badge is always present/absent at first paint to avoid CLS.
- [ ] Password drawer enter/exit animation does not cause reflow of the background page content.

### 8.3 Interaction Responsiveness

- [ ] Row click (forward arrow) navigates within 100ms — no visible delay.
- [ ] Password drawer opens within 100ms of clicking the edit icon.
- [ ] "Save" shows a loading/disabled state within 100ms of click while API call is in flight.
- [ ] Requirement checklist updates are synchronous with typing — no debounce delay visible to the user.
