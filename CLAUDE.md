# id-tiger — Claude Context

## Repo Purpose

**COPPA Supervision Center** — a moderator dashboard for managing child/underage Autodesk accounts. Moderators (parents, teachers, administrators) view accounts they oversee and perform password resets and status changes. Primary child surface today is TinkerCAD.

## Domain

- **Moderator** — adult (teacher, parent, admin) overseeing child Autodesk accounts. Primary user of this tool.
- **Child/Student** — underage Autodesk user. Does not interact with this tool directly.
- **COPPA** — all data handling must comply. All moderator actions must be logged with timestamp and moderator identity.
- **Figma:** [COPPA — Moderator's Platform](https://www.figma.com/design/lEKAg7khZrmq1Dwa2PduKH/COPPA---Moderator-s-Platform)

## Specs

| File | Faction | Status |
|------|---------|--------|
| `docs/prd-children-moderation-app.md` | PM | Draft |
| `docs/xd-design.md` | Design | Draft |

## Three-Faction Model

```
PM Spec          → business requirements, user stories, acceptance criteria
Design Spec      → UX flows, component specs, copy, language support
Engineering Spec → API contracts, data models, compliance, performance budgets
       ↓
  Living Spec    → consolidated, adjudicated, build-ready
       ↓
    Product
```

Each spec is independent. Conflicts are adjudicated in the living spec step.

### Domain Checks by Faction

**Design:** Accessibility (WCAG 2.2 AA), editorial (copy/tone/casing), Weave Brand component usage, performance  
**PM:** Business rule completeness, user story coverage, edge cases, MVP scope  
**Engineering:** API contracts, data model integrity, error handling, security/compliance, performance budgets

## Mandatory Build Gates

In order — all are blockers:

1. **Editorial checks** — run `mcp__editorial__check_text` against all copy in the design spec before living spec consolidation
2. **E2E tests** — Playwright tests from Given/When/Then ACs must all pass after build
3. **Performance tests** — validate FCP < 1.5s, LCP < 2.5s, CLS < 0.1
4. **Accessibility audit** — run `adsk:accessibility-audit` skill on every screen. WCAG 2.2 AA, no violations

## UI Tooling

### Design System — Weave Brand (not DHIG)

- Components: `@mui/material` (MUI v7)
- App theming: `@weave-brand/core`
- Icons: `@weave-brand/icon` (never `@mui/icons-material`)
- Avatar: `@weave-mui/avatar`
- Tokens: semantic Weave Brand tokens (e.g. `background-color/brand`, `status-color/info/default`, `border-radius/pill`)

### Supernova MCP — consult before building any UI component

1. `get_design_system_component_list` — find component by name
2. `get_design_system_component_detail` — metadata, status, linked resources
3. `get_storybook_story_list` / `get_storybook_story_detail` — coded examples
4. `get_documentation_page_list` / `get_documentation_page_content` — usage guidelines

If the desired use isn't documented, ask rather than guess.

### Weave Skills

Load the relevant skill via the `Skill` tool before any UI code or spec component contract:

| Skill | When to use |
|-------|-------------|
| `weave-guidelines` | Before any Weave Brand work — general rules, tokens, theming |
| `weave-buttons` | Button, IconButton, ButtonGroup |
| `weave-forms` | TextField, Select, Checkbox, Radio, Switch, DatePicker |
| `weave-navigation` | AppBar, Tabs, Breadcrumbs, Drawer, Menu |
| `weave-feedback` | Alert, Snackbar, Dialog, Tooltip, Badge |
| `weave-layout` | Grid, Stack, Box, Divider, Container |
| `weave-data` | Table, DataGrid, List, Chip |
| `weave-icons` | SvgIcon, icon imports from `@weave-brand/icon` |
| `weave-progress` | CircularProgress, LinearProgress, Skeleton |
| `weave-carousel` | Carousel component |
