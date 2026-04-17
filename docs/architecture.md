# COPPA Supervision Center — Architecture

Authoritative source for technical architecture decisions. Consult before specifying or implementing any feature.

## Language & Tooling

- **JavaScript only** — `.js`/`.jsx` extensions. No TypeScript, no `tsconfig.json`, no `@types/*`. Use JSDoc + PropTypes for type safety.
- **Vite** — exclusive build and dev-server tool (React + JS template). No Webpack, Parcel, or CRA. Env vars use `VITE_*` prefix. HMR must stay functional; production build must be clean.

## UI Stack

- **Components** — `@mui/material` (MUI v7) themed with `@weave-brand/core` at the app root.
- **Icons** — `@weave-brand/icon` wrapped in MUI `SvgIcon`. `@mui/icons-material` is prohibited.
- **Avatar** — `@weave-mui/avatar`.
- **Tokens** — semantic Weave Brand tokens (e.g. `background-color/brand`, `status-color/info/default`, `border-radius/pill`). Hardcoded hex values are prohibited unless a token value is explicitly confirmed in the design spec.
- **Custom components** require documented design approval.

Before implementing any UI component, consult Supernova MCP: `get_design_system_component_list` → `get_design_system_component_detail` → `get_storybook_story_detail` → `get_documentation_page_content`. Load the relevant Weave skill before writing code.

## API Layer

Each feature may choose to integrate with a real API or use a mock service — this decision is made per feature during specification.

**If mocking:** place service modules in `src/services/` (one file per domain, e.g. `accountsService.js`) exporting named async functions. Mock implementations go in `src/services/mocks/`, fixtures in `src/services/mocks/fixtures/` as plain JS objects. Switching between mock and real must be a single import-path or env-var change — no `if (mock)` conditionals in component code. Mock functions must return Promises and support a configurable delay (default 300 ms) to surface loading states.
