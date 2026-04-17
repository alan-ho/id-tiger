# id-tiger
🐯

An experimental project exploring spec-driven development across PMs, Experience Designers, and Engineers. The chosen application to develop against is the **COPPA Supervision Center** — a moderator dashboard for managing child/underage Autodesk accounts.

## Required MCPs

| MCP | Purpose | Transport |
|-----|---------|-----------|
| `Supernova-WeaveBrandExtended` | Weave Brand design system — component docs, tokens, Storybook stories | HTTP |
| `figma` | Read Figma designs and extract design context | HTTP |
| `atlassian` | Read Confluence wikis where PMs document requirements | HTTP |
| `editorial` | Editorial checks on spec copy — build gate before living spec | Process |
| `a11y` | Accessibility audits against WCAG 2.2 AA — build gate after each screen | Process |

### Setup

```bash
claude mcp add --transport http Supernova-WeaveBrandExtended "https://mcp.supernova.io/mcp/ds/223070?datasetId=235993"
claude mcp add --transport http plugin:figma:figma https://mcp.figma.com/mcp
claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp
claude mcp add editorial <python> <path-to>/mcp-editorial-service/server.py  # https://git.autodesk.com/hoa/mcp-editorial-service
claude mcp add a11y <python> <path-to>/mcp-a11y-service/server.py              # https://github.com/alan-ho/mcp-a11y-service
```

# COPPA Supervision Center

A moderator dashboard for managing child Autodesk accounts. Allows parents, teachers,
and administrators to view and manage the child accounts they oversee, in compliance
with COPPA.

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended — https://nodejs.org)
- **npm** ≥ 9 (ships with Node.js 18+)

Verify your versions:

```bash
node --version   # must print v18.x.x or higher
npm --version    # must print 9.x.x or higher
```

## Setup

```bash
npm install
```

## Running the App

```bash
npm run dev
```

The terminal will print a local URL such as `http://localhost:5173`. Open it in your
browser.

> If port 5173 is already in use, Vite automatically selects the next available port
> and prints the actual URL.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot module replacement |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |

## Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_USE_MOCK` | `true` | Use the mock service layer instead of real API endpoints |
