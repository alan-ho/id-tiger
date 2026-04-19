# Implementation Plan: User Management View

**Branch**: `002-user-management` | **Date**: 2026-04-18 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-user-management/spec.md`

## Summary

Correct and complete the static User Management view components to match the design spec (`docs/spec-design.md`) and the updated feature spec. All six React components exist; this plan is a **spec-compliance correction pass** — no new files, no new dependencies. The work corrects: status badge colours (wrong tokens), avatar background colour (wrong token), forward arrow semantics (plain icon → anchor `IconButton`), Tabs configuration (missing `variant="scrollable"`), breadcrumb accessibility structure, and page `<title>`.

## Technical Context

**Language/Version**: JavaScript (ES2022 modules) — `.js`/`.jsx` only. No TypeScript.  
**Primary Dependencies**: React 18, `@mui/material` v5.18.0, `@weave-brand/core` v0.12.28, `@weave-brand/icon` v0.24.0, `@weave-mui/avatar` v4.5.0  
**Storage**: N/A — mock fixture data only  
**Testing**: No test runner installed (Playwright E2E deferred; WCAG audit via `adsk:accessibility-audit` skill)  
**Target Platform**: Desktop web browser  
**Project Type**: React SPA (Vite)  
**Performance Goals**: FCP < 1.5 s, LCP < 2.5 s, CLS < 0.1  
**Constraints**: JavaScript-only (no TypeScript), no `@mui/icons-material`, Weave Brand tokens for all colours  
**Scale/Scope**: 1 page, 6 components, static mock data (12 rows, totalCount 98)

## Constitution Check

*GATE: Must pass before implementation. All violations below are pre-existing — none introduced by this feature.*

| Principle | Status | Notes |
|-----------|--------|-------|
| JavaScript-only | ✅ Pass | All files are `.jsx` / `.js` |
| Vite build | ✅ Pass | `vite.config.js` unchanged |
| Weave Brand tokens — no hardcoded hex | ⚠️ Pre-existing deviation | `StatusBadge.jsx` and `AccountRow.jsx` use hardcoded hex. This feature corrects both. Exception: `#1278AF` and `#006EAF` are **explicitly confirmed** in design spec §6.7 and may remain as documented hex values per the architecture rule. |
| `@weave-brand/icon` only (no `@mui/icons-material`) | ✅ Pass | No `@mui/icons-material` imports anywhere |
| Icons wrapped in `SvgIcon` | ✅ Pass (post-fix) | Existing usage is correct; forward arrow wrapping corrected in this feature |
| Supernova MCP consulted before UI components | ✅ Pass | Tabs story (388695), token list, and storybook stories consulted in research |
| MUI version (constitution says v7) | ⚠️ Pre-existing deviation | Installed is v5.18.0. All APIs used are compatible with both. Track for upgrade separately — out of scope here. |
| WCAG 2.2 AA | ❌ Currently failing | Multiple violations in existing code corrected by this plan. |
| Accessibility audit gate | ⬜ Pending | Run `adsk:accessibility-audit` after all corrections |
| E2E tests | ⬜ Pending | No Playwright suite yet; deferred |
| Performance tests | ⬜ Pending | Verify CWV after build |

**Complexity Tracking** (violations requiring justification):

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Hardcoded `#1278AF` in StatusBadge | `status-color/info/default` is not exposed as a theme palette key accessible via `sx`. The hex is explicitly confirmed in design spec §6.7. | Using `theme.palette.info.main` would require verifying Weave Brand's MUI theme maps it correctly — unverified. Confirmed hex is safer. |
| Hardcoded `#006EAF` in AccountRow avatar | Same as above: `color/blue/700/100` is not a named MUI palette key. Confirmed in design spec §2. | Same as above. |

## Project Structure

### Documentation (this feature)

```text
specs/002-user-management/
├── plan.md              # This file
├── research.md          # Phase 0 — decisions and rationale
├── data-model.md        # Phase 1 — entity model
├── quickstart.md        # Phase 1 — dev setup
├── contracts/
│   └── accountsService.md   # Mock service interface
└── tasks.md             # Phase 2 — not yet generated
```

### Source Code (no new files — correction pass only)

```text
src/
├── App.jsx                                          # Unchanged
├── main.jsx                                         # Unchanged
├── theme/
│   └── weave.js                                     # Unchanged
├── services/
│   ├── accountsService.js                           # Unchanged
│   └── mocks/
│       ├── accountsService.js                       # Unchanged
│       └── fixtures/
│           └── accounts.js                          # Update: varied usernames, no date format change needed
└── components/
    ├── layout/
    │   ├── TopNav.jsx                               # Unchanged
    │   └── SupervisionNav.jsx                       # Unchanged
    └── user-management/
        ├── StatusBadge.jsx                          # FIX: badge colours (info/blue, error/red)
        ├── AccountRow.jsx                           # FIX: avatar colour, arrow as IconButton[a], aria-labels
        ├── AccountsTable.jsx                        # FIX: aria-sort on Last active header
        ├── ViewTabs.jsx                             # FIX: variant="scrollable", scrollButtons={false}
        ├── AccountsToolbar.jsx                      # Unchanged (already correct)
        └── UserManagementPage.jsx                   # FIX: page title, breadcrumb nav+ol structure
```

**Structure Decision**: Single Vite SPA (Option 1). All changes are within `src/components/user-management/` and related support files. No new directories or files.

---

## Phase 0: Research

See [`research.md`](./research.md). All unknowns resolved:

| Unknown | Resolution |
|---------|-----------|
| `color/blue/700/100` hex value | `#006EAF` (Supernova token list) |
| `status-color/info/default` hex value | `#1278AF` (twilight/600, confirmed design spec §6.7) |
| `Forward` icon availability | Confirmed present in `@weave-brand/icon` v0.24.0 |
| `appearance="quiet"` prop on Tabs | Not available in v0.12.28 → `sx` override approach (see research.md) |
| MUI version | v5.18.0 installed; pre-existing deviation from constitution; no action in this feature |

---

## Phase 1: Design & Contracts

### Change Specifications

Each file change is described with the exact before/after contract. The implementer should apply these diffs precisely.

---

#### 1. `src/components/user-management/StatusBadge.jsx`

**Problem**: `password_requested` and `approval_pending` both use `status-color/warning` (orange). Spec requires info/blue and error/red respectively.

**Change**:
```js
// password_requested — BEFORE (wrong):
sx: { bgcolor: '#F09D4F1A', color: '#b0641a' }

// password_requested — AFTER (info/blue, confirmed design spec §6.7):
sx: { bgcolor: 'rgba(18, 120, 175, 0.10)', color: '#1278AF' }

// approval_pending — BEFORE (wrong):
sx: { bgcolor: '#F09D4F1A', color: '#b0641a' }

// approval_pending — AFTER (error/red, via MUI theme):
sx: { bgcolor: (theme) => `${theme.palette.error.main}1A`, color: 'error.main' }
```

**Validation**: Render all four badge variants. Password requested must be blue, approval pending must be red/orange.

---

#### 2. `src/components/user-management/AccountRow.jsx`

**Problem A**: Avatar background hardcoded as `#1D91d0`. Must be `color/blue/700/100` = `#006EAF` (design spec §2, §6.7).  
**Problem B**: Forward arrow is a bare `SvgIcon`. Must be `<IconButton component="a">` for semantic navigation (design spec §3).  
**Problem C**: `aria-label` on forward arrow is on the SVG icon itself, not the interactive element.  
**Problem D**: Row checkbox `aria-label` format: "select [username]" → "Select [username]" (design spec §6.3).  
**Problem E**: Icon name: `CtaArrowRight` → `Forward`.

**Changes**:
```jsx
// Avatar — BEFORE:
<Avatar size="XS" sx={{ bgcolor: '#1D91d0', width: 32, height: 32, fontSize: 12 }}>

// Avatar — AFTER:
<Avatar size="XS" sx={{ bgcolor: '#006EAF', width: 32, height: 32, fontSize: 12 }}>

// Import — BEFORE:
import { CtaArrowRight } from '@weave-brand/icon'

// Import — AFTER:
import { Forward } from '@weave-brand/icon'

// Checkbox — BEFORE:
inputProps={{ 'aria-label': `select ${username}` }}

// Checkbox — AFTER:
inputProps={{ 'aria-label': `Select ${username}` }}

// Forward arrow — BEFORE:
<TableCell align="right" sx={{ width: 48 }}>
  <SvgIcon sx={{ fontSize: 20, display: 'block' }} aria-label={`view ${username}`}>
    <CtaArrowRight />
  </SvgIcon>
</TableCell>

// Forward arrow — AFTER:
<TableCell align="right" sx={{ width: 48, p: 0 }}>
  <IconButton
    component="a"
    href="#"
    variant="quiet"
    size="medium"
    aria-label={`View ${username}'s account`}
  >
    <SvgIcon sx={{ fontSize: 20 }} aria-hidden="true"><Forward /></SvgIcon>
  </IconButton>
</TableCell>
```

Add `IconButton` to MUI imports.

**Validation**: Each row's arrow must be an `<a>` element in the DOM. `aria-label` must read "View [username]'s account".

---

#### 3. `src/components/user-management/AccountsTable.jsx`

**Problem**: "Last active" column header is missing `aria-sort="descending"` (design spec §6.3, default sort order).

**Change**:
```jsx
// Last active header cell — BEFORE:
<TableCell align="right">
  <Box sx={{ display: 'flex', alignItems: 'center', ... }}>
    <Typography variant="body2" fontWeight={600}>Last active</Typography>
    ...
  </Box>
</TableCell>

// Last active header cell — AFTER:
<TableCell align="right" aria-sort="descending">
  <Box sx={{ display: 'flex', alignItems: 'center', ... }}>
    <Typography variant="body2" fontWeight={600}>Last active</Typography>
    ...
  </Box>
</TableCell>
```

**Validation**: Inspect DOM — `th` for "Last active" must have `aria-sort="descending"`.

---

#### 4. `src/components/user-management/ViewTabs.jsx`

**Problem**: Tabs missing `variant="scrollable"` and `scrollButtons={false}` (design spec §3). The Weave Brand `appearance="quiet"` prop is not available in the installed package version — achieve visually via existing `sx` border styling.

**Change**:
```jsx
// BEFORE:
<Tabs
  value={0}
  aria-label="account view selector"
  sx={{ '& .MuiTab-root': { textTransform: 'none', fontSize: 14 } }}
>

// AFTER:
<Tabs
  value={0}
  variant="scrollable"
  scrollButtons={false}
  aria-label="account view selector"
  sx={{ '& .MuiTab-root': { textTransform: 'none', fontSize: 14 } }}
>
```

The existing `borderBottom: 1, borderColor: 'divider'` on the wrapping `Box` provides the quiet-appearance bottom border — no further change needed.

**Validation**: Inspect rendered Tabs — DOM must include `data-scrollable` attribute or equivalent MUI scroll classes.

---

#### 5. `src/components/user-management/UserManagementPage.jsx`

**Problem A**: Page `<title>` not set (design spec §6.1, SC-004).  
**Problem B**: Breadcrumb uses MUI `Breadcrumbs` directly without a `<nav aria-label="Breadcrumb">` wrapper or `<ol>` list structure (design spec §6.2).

**Changes**:

Add `useEffect` to set document title:
```jsx
import { useEffect } from 'react'

// Inside component:
useEffect(() => {
  document.title = 'User Management – Supervision Center'
}, [])
```

Wrap breadcrumb in semantic `<nav>`:
```jsx
// BEFORE:
<Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1.5 }}>

// AFTER — MUI Breadcrumbs already renders <nav> internally when wrapped
// Explicitly add the aria-label at the nav level:
<Box component="nav" aria-label="Breadcrumb" sx={{ mb: 1.5 }}>
  <Breadcrumbs
    component="ol"
    sx={{ '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap' } }}
  >
    <Link
      underline="hover"
      color="inherit"
      href="#"
      aria-label="Home"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
    >
      <SvgIcon sx={{ fontSize: 16 }} aria-hidden="true"><Home /></SvgIcon>
    </Link>
    <Typography
      color="text.primary"
      variant="body2"
      aria-current="page"
    >
      User management
    </Typography>
  </Breadcrumbs>
</Box>
```

**Validation**: `document.title` equals `"User Management – Supervision Center"`. Breadcrumb DOM has a `<nav aria-label="Breadcrumb">`. Last crumb has `aria-current="page"`.

---

#### 6. `src/services/mocks/fixtures/accounts.js` (optional, low priority)

**Problem**: All 12 rows use `username: 'kidusername'` — not realistic for visual review. Date format "Jan 1, 2025" is already compliant (abbreviated month, no ordinal). No functional change required.

**Optional change**: Replace placeholder usernames with varied values (e.g., `asmith`, `jdoe123`, `maria_k`) to make visual review more useful. The `avatarText` should be the first two characters of the username uppercased.

This change has no impact on spec conformance — defer if time-constrained.

---

### Accessibility Compliance Summary

After all corrections above, the page must pass these WCAG 2.2 AA checks:

| Check | Element | Expected |
|-------|---------|---------|
| Landmark: `<nav>` for breadcrumb | Breadcrumb wrapper | `aria-label="Breadcrumb"` |
| Landmark: `<main>` | Page body | Present (verify in `App.jsx`) |
| Page title | `document.title` | `"User Management – Supervision Center"` |
| Table structure | `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` | All present |
| Select-all checkbox | Header checkbox | `aria-label="Select all accounts"` |
| Row checkboxes | Per-row checkbox | `aria-label="Select [username]"` |
| Last active sort | Column header | `aria-sort="descending"` |
| Forward arrow link | Per-row arrow | `<a aria-label="View [username]'s account">` |
| Avatar | Child avatar | `aria-hidden="true"` on `<img>` inside Avatar |
| Color contrast — avatar | `#006EAF` on white | ≥4.5:1 ✅ |
| Color contrast — info badge | `#1278AF` text, 10% bg | ~5.0:1 ✅ (design spec §6.7) |
