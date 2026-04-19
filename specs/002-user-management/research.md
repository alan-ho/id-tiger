# Research: User Management View

**Feature**: 002-user-management  
**Date**: 2026-04-14 (updated 2026-04-18)  
**Status**: Complete — all NEEDS CLARIFICATION resolved

## Decisions

### Table Component

**Decision**: MUI v7 `Table` / `TableContainer` / `TableHead` / `TableBody` / `TableRow` / `TableCell` (not `DataGrid`)  
**Rationale**: The design shows a simple list table with three non-interactive columns. `DataGrid` is optimised for sortable, filterable, paginated grids — its weight is unjustified for a static render. The plain `Table` API maps cleanly to the design and requires no additional dependencies.  
**Alternatives considered**: `DataGrid` from `@mui/x-data-grid` — rejected (adds a separate package, requires a Pro licence for some features, and is over-engineered for a static list).

### Status Badge Component

**Decision**: MUI v7 `Chip` with Weave Brand semantic status colour tokens  
**Rationale**: The Weave Brand design system exposes a `Chip` component (id: 16303350, Supernova). The four statuses map to two visual variants: success (Active → green) and warning/default (Inactive → grey, Password requested → orange, Approval pending → orange). Chip `size="small"` with `variant="outlined"` or `variant="filled"` matches the design pill shape.  
**Token references** (to confirm against Weave Brand token list before implementation):
- Active: `status-color/success/default`
- Inactive: `status-color/default` or `color/neutral`
- Password requested: `status-color/warning/default`
- Approval pending: `status-color/warning/default`  
**Alternatives considered**: MUI `Badge` — rejected (designed for numeric overlays, not labelled status pills).

### Icons

**Decision**: `@weave-brand/icon` for all icons. No `@mui/icons-material`.  
**Required icons** (exact export names to be verified against Storybook story `Icons/All/Default` id:388437 before implementation):
- Global search bar: `Search` or equivalent
- Notification bell: `NotificationsOutlined` or equivalent
- Globe / locale: `Language` or equivalent
- Table row navigation arrow: `ChevronRight` or `ArrowForwardIos` equivalent
- Breadcrumb home: `Home` or `HomeOutlined` equivalent  
**Rationale**: Constitution IV prohibits `@mui/icons-material`. `@weave-brand/icon` is the mandated source.  
**Storybook reference**: `Icons/All/Default` — https://storybook.supernova.io/design-systems/223070/alias/weave-brand-core/iframe.html?id=icons-all--default

### Avatar Component

**Decision**: `@weave-mui/avatar`  
**Rationale**: Constitution IV mandates `@weave-mui/avatar` over MUI's native `Avatar`. The design shows a solid blue circle with initials "AD" — this is the standard avatar variant.  
**Alternatives considered**: MUI `Avatar` — prohibited by constitution.

### Tabs Component

**Decision**: MUI v7 `Tabs` + `Tab` styled via Weave Brand theme  
**Rationale**: Weave Brand exposes a `Tabs` component (id: 16304045, Supernova). Two tab bars exist in the design: (1) the Supervision Center section tabs in the dark `SupervisionNav` (horizontal, on dark background), and (2) the "By accounts / By product / Pending approval" view tabs below the page heading (horizontal, on white background). Both use the same `Tabs`/`Tab` primitives; token-based theme ensures correct colour per context.  
**Storybook reference**: `Atoms/Tabs/Default` — https://storybook.supernova.io/design-systems/223070/alias/weave-brand-core/iframe.html?id=atoms-tabs--default

### Toolbar Component

**Decision**: MUI v7 `Toolbar` + Weave Brand theme (Weave `Toolbar` id: 16304050)  
**Rationale**: The design toolbar appears above the table and shows "0 selected", a disabled "Delete user" `Button`, and a `Search` input. In this static iteration the toolbar is always in its zero-selection state; no `TablePagination` or selection count logic is wired.

### Weave Brand Theme Setup

**Decision**: Single `ThemeProvider` at app root in `App.jsx` using the theme exported from `@weave-brand/core`  
**Rationale**: Constitution IV requires Weave Brand theme at the app root. All MUI components automatically inherit the theme; no per-component `sx` overrides needed for token-level colours.  
**Setup pattern** (to verify with `weave-guidelines` skill before implementation):
```js
import { createTheme, ThemeProvider } from '@weave-brand/core'
const theme = createTheme()
// wrap: <ThemeProvider theme={theme}>
```

### Routing

**Decision**: No routing library in this iteration. `App.jsx` renders `UserManagementPage` directly.  
**Rationale**: Bootstrap research (001) deferred React Router to the User Management screen feature. However, since this is still a single-screen static render, routing remains unnecessary. When the second screen (account detail) is built, React Router will be introduced.  
**Alternatives considered**: React Router v7 — deferred to account detail feature.

### Mock Data Strategy

**Decision**: Fixture data imported directly into `AccountsTable.jsx` via the mock service; components do not import fixtures directly.  
**Rationale**: Constitution III requires all data to flow through the service layer. For this static iteration the mock `accountsService.getAccounts()` returns a resolved Promise immediately (or after a 300 ms artificial delay). `AccountsTable.jsx` calls the mock service on mount — even though no loading state is rendered — so the data-flow contract is established before interactions are wired.  
**Fixture size**: 12 account objects (matching the design), with `totalCount: 98` as a separate export to populate the column header.

### New Dependencies to Install

```bash
npm install @mui/material @emotion/react @emotion/styled @weave-brand/core @weave-brand/icon @weave-mui/avatar
```

No TypeScript-specific packages (`@types/*`, `tsconfig.json`) are added.

---

## Session 2026-04-18 — Spec Alignment Findings

The following supersede or correct earlier decisions where design spec (`docs/spec-design.md`) conflicts with prior research.

### Status Badge Colors (CORRECTION)

**Decision**: `password_requested` → info/blue; `approval_pending` → error/red. Both previously mapped to warning/orange — that was incorrect.

**Token values confirmed** (from Supernova token list + design spec §6.7):

| Status | Background | Text | Source |
|--------|-----------|------|--------|
| `password_requested` | `rgba(18, 120, 175, 0.10)` | `#1278AF` | `status-color/info/default` = twilight/600/100 per design spec §6.7 |
| `approval_pending` | `status-color/error/light` (theme) | `status-color/error/default` (theme) | error/600 scale |
| `active` | `status-color/success/light` (theme) | `status-color/success/default` (theme) | success/500 scale (existing is correct) |
| `inactive` | `status-color/neutral/light` (theme) | grey text | neutral/300 scale (existing is correct) |

The hex `#1278AF` is **explicitly confirmed in design spec §6.7** and may be hardcoded in the `sx` prop for the info badge only (other statuses accessed via MUI theme palette).

### Forward Icon (CONFIRMED)

**Decision**: Use `Forward` from `@weave-brand/icon`. Confirmed present in the installed package. The existing code uses `CtaArrowRight` — replace with `Forward`.

### Avatar Background Color (CORRECTION)

**Decision**: `color/blue/700/100` = `#006EAF`. Confirmed via Supernova token list. The existing code uses hardcoded `#1D91d0` (twilight/500 equivalent) — replace.  
**Rationale**: Design spec §2 explicitly forbids `color/blue/500/100` (#0696D7, 3.7:1 on white). `color/blue/700/100` (#006EAF) is confirmed ≥4.5:1. `#006EAF` is explicitly confirmed by design spec and may be hardcoded.

### Tabs `appearance="quiet"` Prop (NOT AVAILABLE)

**Decision**: The `appearance="quiet"` prop cited in design spec §3 is absent from the installed `@weave-brand/core` v0.12.28. Zero occurrences in the package's compiled output.  
**Resolution**: Achieve the quiet bottom-border appearance via `sx` override:
```jsx
<Tabs
  variant="scrollable"
  scrollButtons={false}
  sx={{
    borderBottom: 1,
    borderColor: 'divider',
    '& .MuiTabs-indicator': { bottom: 0 },
  }}
>
```
`variant="scrollable"` and `scrollButtons={false}` ARE standard MUI Tabs props and must be applied.

### MUI Version Discrepancy (PRE-EXISTING)

**Observation**: Constitution and CLAUDE.md reference "MUI v7" but the installed package is `@mui/material@5.18.0`. This discrepancy predates this feature. All API usage in this feature is compatible with both v5 and v7. No version upgrade is in scope here — track separately.
