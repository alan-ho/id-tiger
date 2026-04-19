# Tasks: User Management View — Spec Compliance Correction Pass

**Input**: Design documents from `/specs/002-user-management/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

**Context**: All components exist from a prior iteration. This task list is a **correction pass** — no new files, no new dependencies. Six targeted changes bring the existing implementation into full spec and accessibility compliance.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Which user story this task belongs to
- No tests requested — `adsk:accessibility-audit` is the validation gate per spec §6 and constitution

---

## Phase 1: Setup

**Purpose**: Confirm the dev environment is healthy before making corrections.

- [x] T001 Start `npm run dev` and verify the User Management page renders with 12 mock rows, all four status badge variants visible, and no console errors

---

## Phase 2: Foundational

**No tasks.** Service layer, Weave Brand theme, and all component scaffolding were established in the previous iteration. `AccountsToolbar.jsx` is fully spec-compliant and requires no changes.

---

## Phase 3: User Story 1 — Render Supervised Account List (Priority: P1) 🎯 MVP

**Goal**: Each table row displays the correct status badge colour — `password_requested` in info/blue, `approval_pending` in error/red. This is the primary visual correctness gate for the list.

**Independent Test**: Render the page and visually confirm all four badge variants: Active (green), Inactive (grey/no-fill), Password requested (blue), Approval pending (red). No badge should appear orange.

- [x] T002 [P] [US1] Fix `password_requested` badge color to info/blue (`rgba(18,120,175,0.10)` bg, `#1278AF` text) and `approval_pending` to error/red (MUI `error.main` theme) in `src/components/user-management/StatusBadge.jsx`
- [x] T003 [P] [US1] *(Optional — low priority)* Replace all `username: 'kidusername'` placeholder entries with varied usernames (e.g. `asmith`, `jdoe123`, `maria_k`) and set `avatarText` to the first two characters uppercased in `src/services/mocks/fixtures/accounts.js`

**Checkpoint**: Status badges render in correct colours for all four variants. US1 is visually complete.

---

## Phase 4: User Story 2 — Render Tab Navigation Bar (Priority: P2)

**Goal**: Tabs component uses `variant="scrollable"` and `scrollButtons={false}` as required by Weave Brand / MUI internal rendering rules — the quiet bottom border does not appear without these props.

**Independent Test**: Inspect rendered Tabs in browser DevTools — the `<div>` wrapping Tabs must include the MUI scrollable class. The quiet bottom-border line must be visible beneath the tabs.

- [x] T004 [P] [US2] Add `variant="scrollable"` and `scrollButtons={false}` props to the `<Tabs>` element in `src/components/user-management/ViewTabs.jsx`

**Checkpoint**: Tabs render with the correct scrollable variant and visible bottom border.

---

## Phase 5: User Story 3 — Render Toolbar (Priority: P3)

**No tasks.** `AccountsToolbar.jsx` already renders "0 selected", the disabled "Delete user" button, and the search input field in their correct initial states. No corrections required.

---

## Phase 6: User Story 4 — Render Table with Correct Columns (Priority: P4)

**Goal**: The "Last active" column header announces its sort direction to screen readers.

**Independent Test**: Inspect the DOM — the `<th>` for "Last active" must have the attribute `aria-sort="descending"`.

- [x] T005 [P] [US4] Add `aria-sort="descending"` attribute to the Last active `<TableCell>` in the `<TableHead>` of `src/components/user-management/AccountsTable.jsx`

**Checkpoint**: DOM inspection confirms `aria-sort="descending"` on the Last active column header.

---

## Phase 7: User Story 5 — Render Row Elements (Priority: P5)

**Goal**: Each row's avatar uses the correct accessible blue token, the forward arrow is a semantic `<a>` element (not a decorative icon), and all interactive elements carry correct `aria-label` values.

**Independent Test**: In browser DevTools, inspect any account row — avatar background must be `#006EAF`, the arrow must render as an `<a>` element, and `aria-label` on the arrow link must read `"View [username]'s account"`. Row checkbox `aria-label` must read `"Select [username]"`.

> **Note**: T006–T008 all modify `src/components/user-management/AccountRow.jsx` — execute them sequentially in a single editing pass.

- [x] T006 [US5] Change avatar `bgcolor` from `'#1D91d0'` to `'#006EAF'` (`color/blue/700/100`, confirmed WCAG AA ≥4.5:1) in `src/components/user-management/AccountRow.jsx`
- [x] T007 [US5] Replace `CtaArrowRight` import with `Forward` from `@weave-brand/icon`; wrap the forward arrow `SvgIcon` in `<IconButton component="a" href="#" variant="quiet" size="medium" aria-label={\`View ${username}'s account\`}>` with `aria-hidden="true"` on the inner `SvgIcon`; add `IconButton` to MUI imports — all in `src/components/user-management/AccountRow.jsx`
- [x] T008 [US5] Fix row checkbox `aria-label` from `\`select ${username}\`` to `\`Select ${username}\`` (capital S per spec §6.3) in `src/components/user-management/AccountRow.jsx`

**Checkpoint**: Row avatar is dark blue (`#006EAF`). Forward arrow is an `<a>` tag in the DOM. Aria-labels match spec §6.3 exactly.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Page-shell accessibility (title + breadcrumb structure) and final WCAG audit gate.

- [x] T009 [P] Add `useEffect(() => { document.title = 'User Management – Supervision Center' }, [])` and wrap `<Breadcrumbs>` in `<Box component="nav" aria-label="Breadcrumb">` with `aria-current="page"` on the current crumb `<Typography>` in `src/components/user-management/UserManagementPage.jsx`
- [ ] T010 Run `adsk:accessibility-audit` skill against the rendered User Management page; fix any WCAG 2.2 AA violations found before marking the feature complete

**Checkpoint**: `document.title` equals `"User Management – Supervision Center"`. Breadcrumb wrapper is a `<nav aria-label="Breadcrumb">`. Zero WCAG 2.2 AA violations in audit report.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 3–7 (User Stories)**: Depend only on Phase 1 completion; all can proceed in parallel with each other (different files)
- **Phase 8 (Polish)**: T009 can run in parallel with Phases 3–7; T010 (audit) must run after all prior tasks complete

### User Story Dependencies

- **US1 (P1)**: Independent — `StatusBadge.jsx` and `accounts.js` only
- **US2 (P2)**: Independent — `ViewTabs.jsx` only
- **US3 (P3)**: No tasks required
- **US4 (P4)**: Independent — `AccountsTable.jsx` only
- **US5 (P5)**: Independent — `AccountRow.jsx` only; run T006 → T007 → T008 in sequence (same file)

### Within US5 (AccountRow)

T006 → T007 → T008 must be sequential (same file). All other story tasks run concurrently.

---

## Parallel Execution Example

After T001 completes, launch these concurrently:

```text
[Parallel batch — different files]
T002  →  StatusBadge.jsx          (US1)
T003  →  accounts.js              (US1, optional)
T004  →  ViewTabs.jsx             (US2)
T005  →  AccountsTable.jsx        (US4)
T009  →  UserManagementPage.jsx   (Polish)

[Sequential — same file]
T006 → T007 → T008  →  AccountRow.jsx  (US5)

[Gate — after all above]
T010  →  adsk:accessibility-audit
```

---

## Implementation Strategy

### MVP First (US1 Only — ~5 min)

1. Phase 1: Verify dev server (T001)
2. Phase 3: Fix StatusBadge colors (T002)
3. **Validate**: All four badge variants render correctly

### Full Correction Pass (~30 min)

1. T001 — verify dev server
2. T002, T004, T005, T009 in parallel (different files)
3. T006 → T007 → T008 sequentially (AccountRow.jsx)
4. T003 optionally alongside step 2 or 3
5. T010 — accessibility audit gate

---

## Notes

- No new files or dependencies — corrections only
- `AccountsToolbar.jsx`, `TopNav.jsx`, `SupervisionNav.jsx`, `App.jsx`, `main.jsx`, `theme/weave.js`, and both service files are **unchanged**
- Hex values `#006EAF` and `#1278AF` are explicitly confirmed in design spec §6.7 and may be hardcoded (architecture exception for confirmed token values)
- `appearance="quiet"` prop is NOT available in `@weave-brand/core` v0.12.28 — do not add it to Tabs
- Run `vite build` after T010 to confirm production build is clean before closing the feature
