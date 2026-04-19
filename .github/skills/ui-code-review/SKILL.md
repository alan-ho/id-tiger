---
name: ui-code-review
description: 'Audit implemented UI against a Figma design and fix all deviations. Use when: verifying UI implementation against Figma, reviewing after a UI change, checking design fidelity, finding visual bugs, comparing rendered vs Figma spec, Weave Brand component audit. Requires a Figma view URL. Uses Figma MCP, Supernova MCP, browser fallback, and package source inspection.'
argument-hint: '<figma-view-url>'
---

# UI Implementation Audit

## Purpose

Systematically compare the implemented UI against a Figma design, identify every deviation, root-cause each one, and fix them. Output a before/after evidence report.

## Prerequisites

A Figma view URL **must be provided** before starting. If it is absent, stop and ask:
> "Please provide the Figma view URL (e.g. `https://www.figma.com/design/<key>?node-id=<id>`)."

---

## Tool Priority

Follow this priority order for each tool category. Never skip a tier without first attempting it:

| Category | Tier 1 (preferred) | Tier 2 (fallback) |
|----------|--------------------|-------------------|
| **Design spec** | Figma MCP (`get_design_context`, `get_screenshot`, `get_metadata`) | Load the Figma URL in the browser via the `browse` skill |
| **Component spec** | Supernova MCP (`get_design_system_component_detail`, `get_storybook_story_detail`, `get_documentation_page_content`) | Inspect package source: `node_modules/@mui/material`, `node_modules/@weave-brand/core`, `node_modules/@weave-brand/icon`, `node_modules/@weave-mui/avatar` |
| **Theme overrides** | `node -e` REPL inspection of `@weave-brand/core/theme` (see [theme-inspection guide](./references/theme-inspection.md)) | Read source files directly under `node_modules/@weave-brand/core/` |
| **Rendered output** | `browse` skill screenshots (see [§ Browser Selection](#browser-selection) before first screenshot) | `npm run dev` + manual visual inspection |

---

## Browser Selection

Do not ask the user which browser to use. Pick whichever browser is already running or available. If the first screenshot attempt times out, **try once more before failing** — CDP startup can be slow on first launch. If both attempts fail, report the failure explicitly and continue the audit using only Figma/source analysis; do not silently skip visual verification.

---

## Workflow

### Step 0 — Determine scope

**Before touching any file or tool**, establish which React components are in scope.

#### 0a — Infer from current session

Check whether the current conversation already defines a scope — any of:
- A list of components, files, or pages the user named in this session
- A feature or ticket that was just implemented
- Files open in the editor or referenced in the most recent user message

If scope is clear from context, proceed directly to Step 1 with that component list. State what you inferred: _"Reviewing scope: `SupervisionNav.jsx`, `ViewTabs.jsx`."_

#### 0b — Infer from uncommitted changes

If no explicit scope was given, run:
```bash
git diff --name-only HEAD
git diff --name-only --cached
```
Collect all `src/**/*.jsx` / `src/**/*.tsx` files that appear in the output. If any are found, present the list and ask:
> "I found these modified UI files. Should I review all of them, or a subset?"

#### 0c — Ask if still unclear

If neither session context nor uncommitted changes yield a component list, ask **one** question with these options:
> "What should I review?
> 1. All UI components in `src/`
> 2. A specific component or page — name it
> 3. Everything changed on the current branch vs `main`
> 4. Something else"

Do not proceed to Step 1 until a concrete file list is confirmed.

#### 0d — Resolve files to React component names

For each file in scope:
1. Read the file and extract the exported component name(s).
2. Build a checklist: `[ ] ComponentName — path/to/File.jsx` — this is the audit queue for Steps 5–6.

---

### Step 1 — Parse the Figma URL

Extract `fileKey` and `nodeId` from the URL:
- `figma.com/design/:fileKey/...?node-id=:nodeId` → convert `-` to `:` in nodeId

### Step 2 — Fetch the design spec

Call `get_design_context` with `fileKey` and `nodeId`.

If the Figma MCP is unavailable or rate-limited, **stop immediately** and tell the user:
> "The Figma MCP is unavailable (rate-limited or not connected). This audit requires Figma MCP access — please check your Figma MCP connection and try again."

Do not fall back to browsing the Figma URL. The audit cannot proceed without structured design data from the MCP.

Collect for every component in scope:
- Exact dimensions (width, height)
- Padding / margin (top, right, bottom, left individually)
- Typography (font size, weight, line-height)
- Colors (background, foreground, border — note the Weave token name where visible)
- Border radius / border width
- Indicator / underline / pseudo-element styles

### Step 3 — Fetch component specs from Supernova

For each Weave component used in the area under audit:
1. `get_design_system_component_list` — locate by name
2. `get_design_system_component_detail` — read metadata and linked stories
3. `get_storybook_story_detail` — extract coded usage example (props and `sx`)
4. `get_documentation_page_content` — read usage guidelines and token mappings

If Supernova MCP is unavailable or returns insufficient detail, inspect the package source directly (see [theme-inspection guide](./references/theme-inspection.md)).

### Step 4 — Inspect Weave theme overrides

For every MUI component involved, run:
```bash
node -e "
const { createTheme } = require('@weave-brand/core/theme');
const { light } = createTheme('brand', 'light');
console.log(JSON.stringify(light.components?.Mui<ComponentName>?.styleOverrides, null, 2));
"
```

Record every `color`, `background`, `padding*`, `border*`, `minHeight`, and pseudo-element (`&:after`, `&:before`) style the theme injects.

### Step 5 — Audit against the four invariant rules

Apply every rule to every component in scope. A component fails a rule if the condition is true. Failing components must be fixed in Step 6.

#### Rule A — Specificity: never override compound theme selectors with shallow `sx` rules

**Check:** Does the component's `sx` use a single-class selector (e.g. `& .MuiTab-root { color: ... }`) to set a style that the Weave theme sets via a compound selector (e.g. `&[class*="MuiTabs-standard"] & [class*="MuiTab-root"]`)?

**Fail condition:** Yes — the theme has higher specificity and wins silently.

**Fix — three escalation levels, try in order:**

1. **Apply the style on the child directly** — set `sx` or `style` on the child component itself rather than targeting it from the parent. This bypasses the selector contest entirely and is the cleanest approach.

2. **Match compound selector depth in `sx`** — replicate the theme selector depth using `&&` (doubles the root class, raising specificity to (0,3,0)): `'&& .MuiTab-root': { color: 'white' }`. This works when component-level `sx` styles flush *after* `styleOverrides` in the Emotion pipeline.

3. **Escalate to `!important`** — in MUI v7, global `styleOverrides` using `&&` can inject *after* component-level `sx` styles because both share equal specificity and insertion order is not guaranteed. When step 2 is tried but the rendered value still doesn't match (verified by screenshot), append `!important` to the property value: `color: 'white !important'`. This is the correct pattern for **forced color inversion on dark surfaces** — it is not a hack, it is the intended escape hatch for this scenario.

> ⚠️ **Always verify with a screenshot after applying step 2.** Do not assume step 2 worked. If the screenshot shows the style is still incorrect, escalate to step 3 immediately.

---

#### Rule B — Height: account for theme-injected borders and padding before assigning your own

**Check:** Does the Weave theme inject any `border`, `paddingBlock`, or `paddingInline` on this component that is not visible in the Figma spec? Does the component's rendered height match the Figma spec?

**Fail condition:** The rendered height differs from Figma because theme-injected invisible borders (e.g. `border: 2px solid transparent`) or padding were not subtracted from the design's target height when writing `pt`/`pb`.

**Fix:** Compute `own_padding = desired_height − lineHeight − 2×border_width`, then set `pt` and `pb` accordingly. Explicitly neutralize theme-injected padding via `sx` if border cannot be removed.

---

#### Rule C — Width: never use `flex: 1` on a component with a specified Figma width

**Check:** Does the Figma spec give this element an explicit width? Is `flex: 1` (or equivalent growing flex) applied in code?

**Fail condition:** Yes to both — the rendered width is unpredictable and depends on sibling sizes.

**Fix:** Replace `flex: 1` with an explicit `width` matching the Figma spec. Use `minWidth`/`maxWidth` as guardrails. Reserve `flex: 1` only for spacer elements that are intentionally unsized in the design.

---

#### Rule D — Pseudo-elements: verify whether visual styles live on the element or its `::after`/`::before`

**Check:** Does the Weave theme render the visual (indicator strip, underline, decoration) via a `::after` or `::before` pseudo-element on this component?

**Fail condition:** The code targets the element itself (e.g. via `TabIndicatorProps.style`, `slotProps`, or a direct `sx` selector) but the visual is actually rendered on `::after` — so the override silently has no effect, and the theme's hardcoded color persists.

**Fix:** Identify the pseudo-element in the theme source, then override it via the parent component's `sx`:
```jsx
sx={{ '& .MuiTabs-indicator:after': { background: '<token-color>' } }}
```
Never use a component prop (e.g. `TabIndicatorProps`) to override a style that lives on a pseudo-element.

---

### Step 6 — Fix deviations

For each failing component:
1. State the root cause (which rule, which theme override, which selector).
2. Apply the minimum fix — do not refactor unrelated code.
3. **Take a screenshot and confirm the rendered value now matches Figma. This is a hard gate — do not mark a component as fixed, and do not proceed to the next component, until the screenshot confirms the fix.** If no screenshot can be taken (browser unavailable, persistent timeout after two attempts), state this explicitly in the report and mark the fix as "applied but unverified" rather than "confirmed".

> If a Rule A fix appears not to take effect in the screenshot, immediately escalate per the Rule A escalation ladder — do not re-apply the same fix.

### Step 7 — Report

Produce a table:

| Component | Property | Figma value | Was | Fix applied | Rule |
|-----------|----------|-------------|-----|-------------|------|
| …         | …        | …           | …   | …           | …    |

Include before/after screenshots where captured.

---

## Weave Token Quick Reference

When a Figma spec references a token name, resolve it through Supernova (`get_token_list`) before hardcoding a hex value.
