# Contract: accountsService

**Feature**: 002-user-management  
**Date**: 2026-04-14  
**Layer**: Mock service (real implementation deferred)

## Overview

`accountsService` is the single data-access module for child account data. All UI components fetch account data exclusively through this module. Switching from mock to real implementation requires changing one import path or environment variable — no component-level changes.

## Module Locations

| Module | Path | Purpose |
|--------|------|---------|
| Real interface | `src/services/accountsService.js` | Defines the API contract; stubs that throw in this iteration |
| Mock implementation | `src/services/mocks/accountsService.js` | Returns fixture data with simulated async delay |
| Fixtures | `src/services/mocks/fixtures/accounts.js` | Plain JS data objects |

## Functions

### `getAccounts(moderatorId)`

Returns the list of child accounts supervised by the given moderator.

**Signature**:
```js
async function getAccounts(moderatorId: string): Promise<AccountListResult>
```

**Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `moderatorId` | `string` | ID of the authenticated moderator. Used to scope the account list. |

**Returns**: `Promise<AccountListResult>`
```js
{
  accounts: Account[],   // ordered by lastActive descending
  totalCount: number     // total supervised accounts (may exceed accounts.length)
}
```

**Error cases**:
| Condition | Mock behaviour | Real behaviour (future) |
|-----------|---------------|------------------------|
| `moderatorId` not in fixture set | Resolves with `{ accounts: [], totalCount: 0 }` | 200 with empty list |
| `moderatorId` requests accounts outside their assigned set | Rejects with `{ status: 403, message: 'Forbidden' }` | HTTP 403 |
| Network/server error | N/A in mock | Rejects with `{ status: 500 }` |

## Mock Implementation Contract

```js
// src/services/mocks/accountsService.js
import { accounts, totalCount } from './fixtures/accounts.js'

const MOCK_DELAY_MS = 300

export async function getAccounts(moderatorId) {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS))
  // COPPA: reject if moderatorId is unknown (simulates 403)
  if (!moderatorId) {
    return Promise.reject({ status: 403, message: 'Forbidden' })
  }
  return { accounts, totalCount }
}
```

## Real Service Stub (this iteration)

```js
// src/services/accountsService.js
export async function getAccounts(_moderatorId) {
  throw new Error('Real accountsService not implemented. Use mock.')
}
```

## Swap Convention

```js
// To use mock (default for development):
import { getAccounts } from './services/mocks/accountsService.js'

// To use real (future):
import { getAccounts } from './services/accountsService.js'

// Or via environment variable in a single index re-export:
// src/services/index.js
const impl = import.meta.env.VITE_USE_MOCK === 'true'
  ? await import('./mocks/accountsService.js')
  : await import('./accountsService.js')
export const { getAccounts } = impl
```
