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
