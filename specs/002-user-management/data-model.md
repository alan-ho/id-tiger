# Data Model: User Management View

**Feature**: 002-user-management  
**Date**: 2026-04-14

## Entities

### Account

Represents a single child/student Autodesk account supervised by the authenticated moderator.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique account identifier |
| `username` | `string` | Display name shown in the User column |
| `avatarText` | `string` | Short initials rendered inside the avatar circle (e.g. `"AD"`) |
| `lastActive` | `string` | Date of last activity. Either a relative label (`"Today"`, `"Yesterday"`, `"3 days ago"`) or an absolute date string (`"Jan 1, 2025"`) |
| `status` | `AccountStatus` | Current account status (see enum below) |

### AccountStatus (enum)

| Value | Display label | Visual variant | Token |
|-------|---------------|----------------|-------|
| `"active"` | Active | Green chip | `status-color/success/*` |
| `"inactive"` | Inactive | No-fill chip (grey) | `status-color/neutral/*` |
| `"password_requested"` | Password requested | Blue chip | `status-color/info/default` = `#1278AF` |
| `"approval_pending"` | Approval pending | Red chip | `status-color/error/*` |

### AccountListResult

The shape returned by `accountsService.getAccounts()`.

| Field | Type | Description |
|-------|------|-------------|
| `accounts` | `Account[]` | Ordered list of accounts (most recently active first) |
| `totalCount` | `number` | Total number of supervised accounts (used in column header, e.g. `"User (98)"`) |

## Mock Service Layer Structure

Following constitution III, data lives in `src/services/mocks/fixtures/accounts.js` and flows through the service layer — never imported directly by components.

```
src/
└── services/
    ├── accountsService.js              ← real interface (stub — throws NotImplemented in this iteration)
    └── mocks/
        ├── accountsService.js          ← mock implementation
        └── fixtures/
            └── accounts.js             ← 12 Account objects + totalCount: 98
```

### Fixture Data Snapshot (12 rows matching Figma design)

```js
// src/services/mocks/fixtures/accounts.js
export const totalCount = 98

export const accounts = [
  { id: '1',  username: 'kidusername', avatarText: 'AD', lastActive: 'Today',        status: 'password_requested' },
  { id: '2',  username: 'kidusername', avatarText: 'AD', lastActive: 'Yesterday',     status: 'password_requested' },
  { id: '3',  username: 'kidusername', avatarText: 'AD', lastActive: '3 days ago',    status: 'approval_pending'   },
  { id: '4',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'approval_pending'   },
  { id: '5',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'password_requested' },
  { id: '6',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'active'             },
  { id: '7',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'active'             },
  { id: '8',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'inactive'           },
  { id: '9',  username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'inactive'           },
  { id: '10', username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'active'             },
  { id: '11', username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'active'             },
  { id: '12', username: 'kidusername', avatarText: 'AD', lastActive: 'Jan 1, 2025',   status: 'active'             },
]
```

## State Transitions (deferred)

Status transitions (e.g. active → inactive, password reset flow) are out of scope for this static iteration. The status field is read-only in the current view. Transition logic will be specified when interactive moderator actions are implemented.

## COPPA Compliance Note

The mock `accountsService` MUST reject requests for accounts outside the authenticated moderator's assigned set with a simulated 403. In this static iteration no cross-moderator requests are possible (fixture data is always returned), but the rejection path MUST be stubbed in the mock so the real integration honours it.
