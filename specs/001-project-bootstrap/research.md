# Research: Project Bootstrap

**Feature**: 001-project-bootstrap
**Date**: 2026-04-13
**Status**: Complete — no NEEDS CLARIFICATION markers in spec

## Decisions

### Build Tooling

**Decision**: Vite 5.x with the React + JavaScript template (`npm create vite@latest`)
**Rationale**: Constitution II mandates Vite. Vite 5 is the current stable release with
first-class React/JSX support and fast HMR. The JavaScript template generates `.jsx`
files with no TypeScript scaffolding.
**Alternatives considered**: Create React App (deprecated), Webpack (too heavy for a new
project), plain HTML (incompatible with Weave Brand component library requirements).

### Language

**Decision**: JavaScript + JSX (`.js` / `.jsx`), no TypeScript
**Rationale**: Constitution I prohibits TypeScript. The project scope is UI-only with no
complex business logic.
**Alternatives considered**: TypeScript — prohibited by constitution.

### Package Manager

**Decision**: npm
**Rationale**: Clarified by user (session 2026-04-13). npm ships with Node.js — no
additional tooling install required.
**Alternatives considered**: yarn, pnpm.

### Node.js Version

**Decision**: Node.js ≥ 18 (LTS)
**Rationale**: Vite 5.x requires Node.js 18+. Node 18 is an LTS release with long support.
**Alternatives considered**: Node 16 — dropped from Vite 5 support matrix.

### Mock Service Layer

**Decision**: `src/services/` for real interfaces; `src/services/mocks/` for mock
implementations; swap controlled by a single environment variable (`VITE_USE_MOCK=true`)
or a top-level import alias.
**Rationale**: Constitution III mandates a dedicated mock layer that is trivially swappable.
For the bootstrap release the mock layer structure must be scaffolded even though no API
calls are made — to establish the pattern before it is needed.
**Alternatives considered**: Inline hardcoded data in components — rejected (violates
constitution III; makes real-API swap require touching every component).

### Routing

**Decision**: No routing library in bootstrap release. The single root route is the app's
`App.jsx` component rendered at `<body>`.
**Rationale**: Bootstrap only has one screen. Adding React Router now would be premature —
deferred to the User Management screen feature.
**Alternatives considered**: React Router — deferred.
