# Quickstart: User Management View

## Prerequisites

- Node.js ≥ 18 (LTS)
- npm ≥ 9

## Setup (first time after this feature)

```bash
# Install new Weave Brand + MUI dependencies added in this feature
npm install

# Start the dev server
npm run dev
```

Open the printed URL (default `http://localhost:5173`). You should see the User Management page with the Autodesk top navigation, the Supervision Center secondary nav, a breadcrumb, a "User management" heading, tab bar, toolbar, and a table of 12 mock child accounts.

## New Dependencies Added

| Package | Purpose |
|---------|---------|
| `@mui/material` | MUI v7 component library |
| `@emotion/react` | MUI peer dependency (CSS-in-JS runtime) |
| `@emotion/styled` | MUI peer dependency (styled components) |
| `@weave-brand/core` | Weave Brand theme + ThemeProvider |
| `@weave-brand/icon` | Weave Brand icon set (SvgIcon wrappers) |
| `@weave-mui/avatar` | Weave Brand Avatar component |

## Project Structure (after this feature)

```
src/
├── components/
│   ├── layout/
│   │   ├── TopNav.jsx              # Autodesk global header
│   │   └── SupervisionNav.jsx      # Supervision Center nav + section tabs
│   └── user-management/
│       ├── UserManagementPage.jsx  # Page shell
│       ├── ViewTabs.jsx            # By accounts / By product / Pending approval
│       ├── AccountsToolbar.jsx     # Toolbar (selection count, delete, search)
│       ├── AccountsTable.jsx       # Table with header + rows
│       ├── AccountRow.jsx          # Single account row
│       └── StatusBadge.jsx         # Status chip
├── services/
│   ├── accountsService.js          # Real service stub
│   └── mocks/
│       ├── accountsService.js      # Mock (used by default)
│       └── fixtures/
│           └── accounts.js         # 12 fixture accounts + totalCount
├── theme/
│   └── weave.js                    # Weave Brand theme
├── App.jsx                         # Root: ThemeProvider + layout + page
└── main.jsx                        # Unchanged Vite entry
```

## Environment Variables

```env
VITE_USE_MOCK=true   # Use mock service layer (default; set in .env.local)
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview production build |

## Before Marking Complete

- [ ] Run `adsk:accessibility-audit` skill on the rendered page — zero WCAG 2.2 AA violations required
- [ ] Verify FCP < 1.5 s, LCP < 2.5 s, CLS < 0.1
- [ ] Confirm `vite build` completes with no errors or warnings
- [ ] Confirm no `.ts`/`.tsx` files were introduced
- [ ] Confirm no `@mui/icons-material` imports exist
