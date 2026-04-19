# Theme Inspection Guide

Use these patterns whenever you need to understand what the Weave Brand theme injects into a MUI component before writing any `sx` or style prop overrides.

## Inspect any component's styleOverrides

```bash
node -e "
const { createTheme } = require('@weave-brand/core/theme');
const { light } = createTheme('brand', 'light');
const overrides = light.components?.Mui<ComponentName>?.styleOverrides;
console.log(JSON.stringify(overrides, null, 2));
"
```

Replace `Mui<ComponentName>` with the exact MUI component key, e.g.:
- `MuiTabs`
- `MuiTab`
- `MuiToolbar`
- `MuiButton`
- `MuiOutlinedInput`
- `MuiTableCell`

## What to look for

| Property pattern | Risk |
|-----------------|------|
| `border: "N px solid transparent"` | Adds to rendered height even though invisible (Rule B) |
| `paddingBlock`, `paddingTop`, `paddingBottom` | Overrides your own `pt`/`pb` if theme selector has higher specificity |
| `"& [class*=\"MuiX-root\"]"` inside a variant selector | Compound selector — higher specificity than your flat `sx` (Rule A) |
| `"&:after": { background: ... }` | Visual rendered on pseudo-element, not the element (Rule D) |
| `color: "#000000"` inside `"&[class*=\"Mui-selected\"]"` | May override your white text via compound selector (Rule A) |
| `flex: ...` on root | May interfere with your explicit width (Rule C) |

## Inspect variant-specific overrides

MUI v6+ components use `variants` arrays instead of nested styleOverrides for prop-based styles:

```bash
node -e "
const { createTheme } = require('@weave-brand/core/theme');
const { light } = createTheme('brand', 'light');
const variants = light.components?.Mui<ComponentName>?.variants;
console.log(JSON.stringify(variants, null, 2));
"
```

## Inspect a specific token value

```bash
node -e "
const { createTheme } = require('@weave-brand/core/theme');
const { light } = createTheme('brand', 'light');
// palette contains resolved token values
console.log(JSON.stringify(light.palette, null, 2));
" | grep -A2 'highlight\|brand\|heavy'
```

## Fallback: read package source directly

If the `node -e` approach fails (ESM-only package, build error), find the theme source:

```bash
find node_modules/@weave-brand/core -name "*.js" | xargs grep -l "styleOverrides" | head -5
```

Then read the relevant file with `read_file`.

## Check effective CSS specificity

When a theme uses `&[class*="MuiTabs-standard"] & [class*="MuiTab-root"]`, that is specificity `(0,2,0)`.
Your `sx` using `& .MuiTab-root` has specificity `(0,1,0)`.
Your `sx` using `&[class*="MuiTabs-standard"] & .MuiTab-root` matches depth and specificity.

Rule of thumb: count the number of attribute/class selectors in the theme's chain — your `sx` must use the same count to compete, or target the child directly.
