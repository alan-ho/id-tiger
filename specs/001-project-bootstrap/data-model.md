# Data Model: Project Bootstrap

**Feature**: 001-project-bootstrap
**Date**: 2026-04-13

## Entities

This bootstrap feature introduces no data entities and makes no API calls. The screen
is entirely static.

## Mock Service Layer Structure (scaffolded, no calls in this release)

The following structure MUST be created to establish the mock-first pattern for future
features. No functions are called during bootstrap, but the directory and export
conventions must exist.

```
src/
└── services/
    └── mocks/
        └── fixtures/      # Future: plain JS fixture objects
```

The swap convention for future services:
- Real: `import { getAccounts } from './services/accountsService.js'`
- Mock: `import { getAccounts } from './services/mocks/accountsService.js'`
- Toggle: `VITE_USE_MOCK=true` environment variable (or a single re-export in a
  top-level `src/services/index.js` that conditionally re-exports mock vs real)
