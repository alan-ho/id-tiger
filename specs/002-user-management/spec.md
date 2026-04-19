# Feature Specification: User Management View

**Feature Branch**: `002-user-management`  
**Created**: 2026-04-14  
**Status**: Draft  
**Input**: User description: "Implement first view 'User management' that will be shown on the main page of the application. Use design from Figma. Create the necessary react components. Let the UI be static for now, no user interactions, we'll add them later. For now, the outcome of this feature must be the set of react components with the html and styles. Remove the 'Linked account' header."  
**Design Reference**: [Figma — User Management View](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform?node-id=0-1&m=dev&focus-id=23-14271)

## Clarifications

### Session 2026-04-18

- Q: Should "Pending approval" render as an inert placeholder tab or as a normal inactive tab in this release? → A: Render as a normal inactive tab; no placeholder note required.
- Q: Should pagination controls be rendered visually in this static iteration? → A: Exclude entirely; defer until live data and pagination logic are implemented.
- Q: Should a skeleton loading state be built as a visual variant in this static iteration? → A: Exclude entirely; defer to the live data iteration where async latency exists to mask.
- Q: Should explicit nav-bar height requirements be added to the spec, verified against Figma? → A: Yes. TopNav height = 56 px; SupervisionNav height = 40 px (Figma node 23-14271). Root cause of current mismatch: Weave Brand MuiToolbar theme applies `paddingBlock: 24px` via a `&&` (double-class) rule; `disableGutters` only removes horizontal padding, so the vertical padding persists and inflates both bars. Fix: pass `size="small"` to each `<Toolbar>` (reduces theme-injected `paddingBlock` to 12 px and sets `minHeight: 0`) then add `py: '0 !important'` in each Toolbar's `sx` prop to zero the remaining 12 px (component-scoped, no global side-effects). Remove the now-redundant `minHeight: '40px !important'` from SupervisionNav — height is governed entirely by the inner `<Box sx={{ height: '40px' }}>` once padding is zeroed.

### Session 2026-04-17

- Q: How should very long usernames be handled in the table row? → A: Wrap to multiple lines within the row.
- Q: What should be rendered when an account's status value is unrecognised or missing? → A: Render a neutral grey badge displaying the raw status string as-is.
- Q: Should SC-001 use the project-standard Core Web Vitals targets instead of "within 2 seconds"? → A: Yes. Replace with FCP < 1.5s, LCP < 2.5s, CLS < 0.1.

### Session 2026-04-14

- Q: Are user interactions (tab switching, search, row selection, deletion, navigation) in scope? → A: No. This iteration covers static UI rendering only. All interactive elements are rendered in their initial/default visual state. No event handlers or state management will be wired.
- Q: Should the Figma design URL be captured in the spec? → A: Yes. Added to the spec header above.
- Q: Should an empty state (zero supervised accounts) be rendered in this static UI iteration? → A: No. Deferred. This iteration covers the populated list view only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Render Supervised Account List (Priority: P1)

A moderator (parent, teacher, or administrator) views the User Management page. The page renders a list of all child/student accounts under their supervision, with each account displaying the username, avatar, last active date, and current account status. The list is presented in descending order of last active date.

**Why this priority**: This is the primary entry point for the entire moderation workflow. The account list is the foundational visual component all other features build upon.

**Independent Test**: Can be tested by rendering the component with seeded mock data and verifying all accounts appear with correct fields displayed.

**Acceptance Scenarios**:

1. **Given** the User Management component is rendered with mock data, **Then** a list of child accounts is displayed, each showing a username, avatar, last active date, and status badge.
2. **Given** mock data contains 98 accounts, **Then** the table column header reads "User (98)".
3. **Given** the component is rendered, **Then** the account rows are ordered by last active date descending (most recent at the top).

---

### User Story 2 - Render Tab Navigation Bar (Priority: P2)

The view displays a tab navigation bar with three tabs: "By accounts", "By product", and "Pending approval". The "By accounts" tab is shown in its active/selected visual state by default.

**Why this priority**: The tab bar establishes the navigation affordance for the three distinct views within User Management. The default active state of "By accounts" sets the initial context for the moderator.

**Independent Test**: Can be tested by rendering the component and verifying all three tabs are visible with "By accounts" appearing in its selected state.

**Acceptance Scenarios**:

1. **Given** the component is rendered, **Then** three tabs are visible: "By accounts", "By product", and "Pending approval".
2. **Given** the component is rendered, **Then** the "By accounts" tab is displayed in its active/selected visual state.
3. **Given** the component is rendered, **Then** the "By product" and "Pending approval" tabs are displayed in their default inactive visual state.

---

### User Story 3 - Render Toolbar with Search and Bulk Action Controls (Priority: P3)

The toolbar above the account list renders with a selection count label, a "Delete user" button in its disabled initial state, and a search input field.

**Why this priority**: The toolbar provides visual affordance for bulk management and search, communicating to moderators that these capabilities are available. The initial disabled state of the delete button correctly reflects that no accounts are selected.

**Independent Test**: Can be tested by rendering the component and verifying the toolbar contains all three elements in their correct initial visual states.

**Acceptance Scenarios**:

1. **Given** the component is rendered, **Then** the toolbar displays the text "0 selected".
2. **Given** the component is rendered, **Then** the "Delete user" button is visible and rendered in its disabled visual state.
3. **Given** the component is rendered, **Then** a search input field is visible in the toolbar.

---

### User Story 4 - Render Table with Correct Columns (Priority: P4)

The account table renders with the correct column structure: a checkbox column, a User column (with total count), a Last active column, a Status column, and an unlabelled forward arrow column.

**Why this priority**: Correct column layout is required for the table to be scannable and usable by moderators. Each column serves a distinct triage purpose.

**Independent Test**: Can be tested by rendering the component and verifying all column headers are present and labelled correctly.

**Acceptance Scenarios**:

1. **Given** the component is rendered, **Then** the table header row contains five visual columns: a checkbox column, "User (N)" where N is the account count, "Last active", "Status", and an unlabelled column for the forward arrow.

---

### User Story 5 - Render Row Elements (Priority: P5)

Each account row renders with all required visual elements: a selection checkbox, a user avatar, a username, a last active date, a status badge with correct visual variant, and a navigation arrow icon.

**Why this priority**: Row completeness ensures moderators can identify and triage individual accounts at a glance without missing critical information.

**Independent Test**: Can be tested by rendering the component and inspecting any row to confirm all six elements are present.

**Acceptance Scenarios**:

1. **Given** the component is rendered with mock data, **Then** each row displays a checkbox, avatar, username, last active date, status badge, and a navigation arrow icon.
2. **Given** rows with varying statuses are rendered, **Then** each status badge uses its correct visual variant: Active (green/success), Inactive (no-fill/default), Password requested (blue/info), and Approval pending (red/error).
3. **Given** a row with an unrecognised or missing status value is rendered, **Then** the status cell displays a neutral grey badge containing the raw status string; if the value is null or undefined the badge displays "—".

---

### Edge Cases

- Long usernames wrap to multiple lines within the row; no truncation or tooltip required.
- An unrecognised or missing status value MUST render as a neutral grey badge displaying the raw status string. If the status is null/undefined, the badge displays "—".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST render a top navigation bar containing: the Autodesk logo, a global search bar, a notification bell icon, a locale selector, and the moderator's avatar. The rendered bar height MUST be exactly **56 px** (Figma: node 23-14271).
- **FR-002**: The page MUST render a secondary navigation bar with the "Supervision Center" label and section tabs: "User management" (shown as active), "Activity tracking" (inert placeholder — visible but not clickable, no route), and "Notification" (inert placeholder — visible but not clickable, no route). The rendered bar height MUST be exactly **40 px** (Figma: node 23-14271).
- **FR-003**: The page MUST render a breadcrumb trail showing the current location (e.g., Home / User management).
- **FR-004**: The page MUST render a "User management" page heading.
- **FR-005**: The page MUST render three tab options: "By accounts" (rendered in active state by default), "By product", and "Pending approval".
- **FR-006**: The page MUST render a toolbar containing a selection count ("0 selected"), a "Delete user" button in its disabled initial state, and a search input field.
- **FR-007**: The account table MUST render five visual columns: a checkbox column, a User column (including total account count), a Last active column, a Status column, and an unlabelled forward arrow column.
- **FR-008**: Each table row MUST render: a selection checkbox, the child's avatar (initials, background `color/blue/700/100`), username, last active date formatted as abbreviated month with no ordinal suffix (e.g. "Aug 30, 2027"), a status badge, and a navigation forward arrow.
- **FR-009**: Status badges (custom `StatusBadge` component wrapping MUI `Chip`) MUST be rendered with visually distinct styles: Active → `success`/green, Inactive → `default`/no-fill, Password requested → `info`/blue, Approval pending → `error`/red.
- **FR-010**: The "Linked account" section heading MUST NOT appear anywhere in the rendered view.
- **FR-011**: When interactions are wired in a future iteration, all moderator actions performed within this view MUST be attributable to the authenticated moderator for COPPA audit logging.

### Implementation Constraints

Derived from the design spec. Required for correct Weave Brand compliance and accessibility.

- **Nav-bar vertical padding (Weave `paddingBlock` override)**: The Weave Brand MuiToolbar theme injects `paddingBlock: 24px` via a `&&` double-class CSS rule that `disableGutters` does not neutralise. Fix: pass `size="small"` to each `<Toolbar>` (reduces injected `paddingBlock` to 12 px and sets `minHeight: 0`) then add `py: '0 !important'` to each Toolbar's `sx` prop to zero the remaining 12 px. This is component-scoped and has no effect on other Toolbar usages. The resulting bar heights must match Figma exactly: **TopNav = 56 px**, **SupervisionNav = 40 px**.
- **`StatusBadge`**: Custom component wrapping MUI `Chip`. Not a Weave or MUI primitive. Four variants: `success` (Active), `default`/no-fill (Inactive), `info` (Password requested), `error` (Approval pending).
- **`Tabs`**: Must use `variant="scrollable"` with `appearance="quiet"` and `scrollButtons={false}`. The quiet bottom border does not render without `variant="scrollable"` due to a Weave/MUI internal requirement.
- **Forward arrow**: `<IconButton component="a" variant="quiet" size="medium">` — renders as `<a>` for semantic navigation, not a `<button>`.
- **Child avatar background**: `color/blue/700/100`. Do not use `color/blue/500/100` (#0696D7) — fails WCAG AA (3.7:1 on white).
- **Non-obvious icon imports**:
  ```tsx
  import { Search, Forward } from "@weave-brand/icon";
  import { CaretLeft, CaretRight } from "@weave-brand/icon/ui-controls";
  import { UserInsights } from "@weave-brand/icon/pictograms";
  ```

### Accessibility Requirements

WCAG 2.2 AA. All items are required before implementation is considered complete.

- Page `<title>` is set to `"User Management – Supervision Center"`.
- `<main>` wraps the page body.
- `<nav aria-label="Primary navigation">` wraps the secondary nav bar.
- `<nav aria-label="Breadcrumb">` wraps the breadcrumb trail; rendered as `<ol>` of `<li>` items; home icon crumb uses `<a aria-label="Home">` with icon `aria-hidden="true"`; "User management" crumb has `aria-current="page"`.
- Table uses `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` for column headers.
- Select-all checkbox: `aria-label="Select all accounts"`.
- Row checkboxes: `aria-label="Select [username]"`.
- "Last active" column header: `aria-sort="descending"` (default sorted state).
- Forward arrow per row: `aria-label="View [username]'s account"`.
- Status badges: `role="status"` is NOT needed — badges are static table cell content, not live regions.

### Key Entities

- **Moderator**: The authenticated adult user viewing the page. Has a set of supervised child accounts.
- **Child Account**: A child or student Autodesk account. Attributes: username, avatar (initials, `color/blue/700/100` background), last active date, status.
- **Account Status**: The current display state of a child account. Values: Active, Inactive, Password requested, Approval pending.
- **StatusBadge**: Custom MUI `Chip` wrapper rendering one of four visual variants mapped to Account Status values.
- **Supervision Relationship**: The link between a moderator and the child accounts they are authorised to view and manage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The User Management page MUST meet project-standard Core Web Vitals on initial render: FCP < 1.5s, LCP < 2.5s, CLS < 0.1.
- **SC-002**: The view correctly renders all four account status badge variants without any variant appearing as broken or unstyled.
- **SC-003**: The page meets WCAG 2.2 AA accessibility standards with zero critical violations on initial render.
- **SC-004**: The page `<title>` is `"User Management – Supervision Center"` — verified by inspecting `document.title` after render.

## Assumptions

- This iteration renders static/mock data only. No event handlers, state management, or user interactions are in scope. All interactive elements (tabs, checkboxes, search, delete button, row arrows) are rendered in their initial/default visual state only.
- Live API integration is deferred to a future iteration.
- The "By product" and "Pending approval" tabs are rendered as inactive tabs only; their content views are deferred.
- The "Delete user" button is rendered in its permanently disabled visual state for this iteration; deletion logic is deferred.
- Row navigation (arrow click) is rendered as a static visual element only; routing to a detail page is deferred.
- Relative date labels ("Today", "Yesterday") are acceptable alongside absolute dates ("Jan 1, 2025").
- The moderator is assumed to be authenticated before reaching this page; auth flow is out of scope.
- Empty state (zero supervised accounts) is out of scope for this iteration; the component only needs to render correctly with a populated mock dataset.
- Mobile responsiveness is out of scope for this initial iteration; the view targets desktop browsers only.
- Pagination controls are excluded from this iteration; deferred until live data and server-side pagination logic are implemented.
- Skeleton/loading state is excluded from this iteration; deferred to the live data iteration where async latency exists to mask.
- TinkerCAD is the primary product referenced under the "By product" tab for COPPA-relevant accounts.
