# Quickstart: COPPA Supervision Center

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended — https://nodejs.org)
- **npm** ≥ 9 (ships with Node.js 18+)

Verify:
```bash
node --version   # must print v18.x.x or higher
npm --version    # must print 9.x.x or higher
```

## First-Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The terminal will print a local URL such as `http://localhost:5173`. Open it in your
browser. You should see a page with the heading **"Linked accounts"**.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |

## Environment Variables

Create a `.env.local` file at the repo root for local overrides. Vite requires all
custom variables to be prefixed with `VITE_`:

```env
VITE_USE_MOCK=true   # Use mock service layer (default for development)
```

## Project Structure (bootstrap)

```
src/
├── App.jsx              # Root component — renders "Linked accounts" heading
├── main.jsx             # Vite entry point
├── services/            # Real API service modules (future)
│   └── mocks/           # Mock implementations (swap-out point)
│       └── fixtures/    # Hardcoded fixture data
```

## Port Conflicts

If port 5173 is in use, Vite will automatically select the next available port and
print the actual URL. No configuration change is needed.
