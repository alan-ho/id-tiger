# Investigation: Visual Deviations from Figma Design

## Context

The implemented User Management view has visual deviations from the Figma design:
different header height and color, wrong logo, wrong fonts, and other elements off.
This document identifies the root causes — what data is missing and why exact
implementation wasn't possible.

---

## Deviation Map

| Element | Figma | Implementation | Root Cause |
|---|---|---|---|
| Font | Artifakt Element / Artifakt Legend | System fallback (sans-serif) | Font files not loaded — see #1 |
| Logo | Official Autodesk SVG mark | Text "AUTODESK" in SVG | No logo asset available — see #2 |
| TopNav height | 56px, px: 68px side padding | 48px, px: 2 (16px) | Used arbitrary values; no Storybook reference checked — see #3 |
| TopNav avatar color | iris.500 `#5f60ff` | twilight.500 `#1D91d0` | Wrong token picked — see #4 |
| Secondary nav bg | dark (`background-color/surface/300`) | white (`background.paper`) | Token not in MUI palette — see #5 |
| Tab active indicator | white border on TOP | blue underline on BOTTOM | MUI default; Weave variant not applied — see #5 |
| Action bar radius | 16px | 16px ✓ | Fixed in polish pass |
| Search field radius | 8px (`border-radius/8`) | 8px (hardcoded) | Works but not via token |
| Status badge colors | Weave semantic tokens | Hardcoded hex values | CSS vars not injectable — see #5 |
| Typography variants | `headline-larger`, `body-copy-medium` | `h4`, `body2` | Custom variants not wired — see #6 |

---

## Root Causes

### #1 — Fonts: Artifakt Element / Artifakt Legend not loaded

**What Figma uses**: `font-family: "Artifakt Element"` (weights: Regular 400,
Semi Bold 600, Bold 700) and `"Artifakt Legend"` (display headings).

**What the app has**: `@weave-brand/core` sets `theme.typography.fontFamily =
"ArtifaktElement"` in the MUI theme — but the package ships **zero font files**
and **no @font-face rules**. There is no `<link>` in `index.html`, no CSS import,
and no `@font-face` anywhere in the project.

**Why**: Artifakt is Autodesk's proprietary brand typeface. It is not distributed
via npm. It must be loaded from an Autodesk-internal CDN (e.g. a `fonts.autodesk.com`
stylesheet or a Typekit kit). That CDN URL was not provided in any project
documentation, CLAUDE.md, Supernova, or the Weave Brand package.

**What's missing**: The CDN `<link>` or `@import` URL for Artifakt Element and
Artifakt Legend. Typically added to `index.html` as:
```html
<link rel="stylesheet" href="https://fonts.autodesk.com/...artifakt..." />
```

---

### #2 — Logo: No Autodesk SVG asset

**What Figma uses**: An actual Autodesk logo image (SVG mark + wordmark), fetched
from Figma's CDN as a temporary asset URL with a 7-day TTL.

**What the app has**: A hand-rolled SVG `<text>` element rendering "AUTODESK" in
the Artifakt Element font — which itself isn't loaded (see #1).

**Why**: The Autodesk logo is a registered trademark. It cannot be bundled in an
npm package. It must come from:
- An Autodesk brand CDN (e.g. `cdn.autodesk.com/brand/...`)
- A separate internal `@autodesk/brand-assets` package
- A static file committed to the repo

None of these were provided or documented.

**What's missing**: The actual logo SVG file (or CDN URL). Figma's
`https://www.figma.com/api/mcp/asset/...` URLs expire after 7 days and are
not suitable for production use.

---

### #3 — Header dimensions: No ground truth consulted

**What Figma uses**: TopNav height 56px, horizontal padding 68px per side.
Secondary nav height 40px, padding 68px per side.

**What the app has**: TopNav `minHeight: 48`, `px: 2` (16px with Weave spacing);
SupervisionNav `minHeight: 44`.

**Why**: These values were approximated without checking the Storybook story or
Supernova documentation for the universal header component. The Figma Tailwind
code shows: `h-[56px]`, `px-[68px]`. The `weave-navigation` skill and Supernova's
`get_storybook_story_detail` were not queried for the exact header spec.

**What's missing**: Storybook story for "universal-header" / "primary-navigation"
components was not fetched from Supernova. That would have given the exact
pixel values.

---

### #4 — Token values: Some tokens applied incorrectly

**What Figma uses**: User avatar in TopNav uses `var(--color/iris/500/100, #5f60ff)`
(iris purple-blue).

**What the app has**: `#1D91d0` (twilight blue) — a different Weave Brand color.

**Why**: The token `color/iris/500/100` was not looked up in Supernova's
`get_token_list`. The value was guessed from the spec description "Autodesk brand
blue" without verifying which exact token the Figma uses. Twilight is used for
interactive UI; iris is used for the avatar/identity surface.

---

### #5 — CSS custom properties: Weave Brand does not inject them

**What Figma uses**: CSS custom properties throughout:
`var(--background-color/brand, black)`, `var(--text-color/heavy/default, white)`,
`var(--background-color/surface/300, black)`, etc.

**What `@weave-brand/core` provides**: A JavaScript MUI theme object only.
The package ships **no CSS variable injection** — no `GlobalStyles` component,
no `:root { --background-color/brand: ... }` sheet, no `injectGlobalStyles` export.

**Why this matters**: Our sx props like `bgcolor: 'background.paper'` or
`color: 'text.secondary'` go through MUI's palette, but many Figma tokens
(e.g. `background-color/surface/300`) have **no equivalent MUI palette key**.
We can't write `bgcolor: 'background-color/surface/300'` — MUI doesn't resolve
slash-paths. So we fall back to hardcoded hex, which may be stale if the design
system evolves.

**What's missing**: Weave Brand needs to either:
(a) inject CSS custom properties at the app root (a `WeaveCSSVariables` component),
(b) export a mapping of token → resolved value so consumers can look them up, or
(c) document which MUI palette path maps to each Figma token.

Supernova's `get_token_list` tool was available but not used during implementation
to get the full token set with resolved values.

---

### #6 — Typography: Custom Weave variants not applied

**What Figma uses**: Weave Brand-specific typography tokens: `headline-larger`,
`body-copy-medium`, `button-label-medium`, etc.

**What `@weave-brand/core` provides**: The MUI theme defines these as custom
typography variants (e.g. `theme.typography['headline-larger']`). MUI v5
supports custom variant strings if the theme declares them — but the component
must use the exact string: `<Typography variant="headline-larger">`.

**What the app uses**: Standard MUI variants (`h4`, `body2`, `subtitle1`), not
the Weave Brand custom ones. This means correct font-size and line-height tokens
from Weave are not being applied.

**Why**: The `weave-guidelines` skill was not checked for which variant string
to use for the page heading. Also, even if the variant is applied, it still falls
back to system font since font files aren't loaded (see #1).

---

## Process Analysis: Why These Issues Happened

Issues #3, #4, #5, and #6 share a common pattern: the original instructions described *what* to build but didn't specify *how to look up the ground truth* before writing values. Each was a different flavor of the same mistake — guessing or approximating instead of querying the canonical source.

### #3 — Header dimensions

**What led to it**: T007/T008 said "Load `weave-navigation` skill then create AppBar" but didn't say to query Supernova for the actual component spec first. Loading a skill provides general guidance — it doesn't automatically retrieve concrete pixel values for a specific component. The dimensions were approximated from memory.

**Missing instruction**: "Before writing any layout values (height, padding, spacing) for a component that exists in the Weave design system, call `get_storybook_story_detail` on the matching story to get the canonical dimensions. Do not approximate."

### #4 — Wrong avatar token

**What led to it**: The task said "moderator Avatar" but left the color unspecified. The color was inferred from a vague description ("Autodesk brand blue") rather than from the Figma design or the token list. There was no instruction to cross-reference.

**Missing instruction**: "For every color value applied to a component, look up the exact token in Figma's dev panel or via `get_token_list` in Supernova. Do not guess token names from descriptions."

### #5 — CSS variables / wrong resolved token values

**What led to it**: The instructions assumed Weave Brand tokens could be used directly as MUI palette keys (e.g. `bgcolor: 'background.paper'`). They can't — `@weave-brand/core` is a JS theme object only, and Figma uses CSS custom properties that MUI knows nothing about. There was no instruction explaining this gap or requiring tokens to be resolved before use.

**Missing instruction**: Two things needed here: (a) a warning in CLAUDE.md that `@weave-brand/core` provides no CSS variable injection — all Figma `var(--token)` references must be resolved to hex via `get_token_list` before use; (b) a required step in every task that applies color: "resolve via Supernova, document the hex, then apply."

### #6 — Typography variants

**What led to it**: Tasks specified MUI standard variants (`h4`, `body2`) explicitly. Those were correct MUI variant names but wrong Weave ones. The `weave-guidelines` skill was listed as a prerequisite but wasn't checked for which custom variant string maps to which Figma text style.

**Missing instruction**: Task descriptions should have specified Weave variant names directly (e.g. `variant="headline-larger"` not `variant="h4"`), or required: "Before using any Typography component, query `get_documentation_page_content` for the Weave typography guidelines to identify the correct variant string for the text style shown in Figma."

### The common fix for next time

Add a standing rule to CLAUDE.md (or task generation instructions):

> Before writing any hardcoded value (px, color, variant name, spacing), identify the canonical source — Figma dev panel, Supernova Storybook story, or `get_token_list` — and retrieve it. Values that can't be sourced from these must be flagged as approximations in a comment.

That one rule would have caught all four issues.

---

## Recommended Constitution Amendment

The following rules should be added to the project constitution (`.specify/memory/constitution.md`) under **Principle IV — Weave Brand Design System**, to prevent the same class of issues in every future feature.

---

### Proposed addition to Principle IV

**Token & value resolution (add after the existing Supernova consultation rule)**

> Before writing any hardcoded value — pixels, colors, spacing, typography variant strings — the canonical source MUST be queried and the resolved value recorded:
>
> - **Layout values** (height, padding, gap): call `get_storybook_story_detail` on the matching Weave component story. Do not approximate from Figma screenshots or memory.
> - **Color values**: call `get_token_list` and locate the exact token used in the Figma dev panel (`var(--token-name, fallback)`). Apply the resolved hex from that lookup. Guessing from token name descriptions is PROHIBITED.
> - **Typography variants**: use Weave Brand variant strings (`headline-larger`, `body-copy-medium`, `button-label-medium`, etc.), not MUI standard variants (`h4`, `body2`). Confirm the correct variant string via `get_documentation_page_content` for the Weave typography guidelines before writing any `<Typography>` component.
> - **Unresolvable values**: if a token cannot be resolved via Supernova or Figma, mark the hardcoded fallback with an inline comment: `/* APPROX: token not resolvable, verify with design system team */`.

**CSS variable gap (add as a standalone note)**

> `@weave-brand/core` provides a JavaScript MUI theme object only. It does NOT inject CSS custom properties at the app root. Figma `var(--token-name)` references cannot be used directly in MUI `sx` props. Every Figma token must be resolved to a concrete value (hex, px, etc.) via `get_token_list` before it can be applied in code.

---

## Round 2 — Remaining Deviations After Initial Fixes

After fixing issues #3–#6, significant visual deviations remained: nav heights and backgrounds still incorrect, search field font size wrong, containers misaligned horizontally, page body spacing missing. These were caused by a second layer of issues not captured in the first investigation.

---

### A — Spacing and padding values were never extracted from Figma

The Figma Tailwind output contains exact pixel values for every layout property:

- Page body: `pt-[var(--component/card/content/padding-top,24px)]` = **24px** top padding
- Page body: `px-[72px]` = **72px** horizontal padding
- TopNav: `px-[68px]`, `h-[56px]`
- SupervisionNav: `px-[68px]`, `h-[40px]`

These were approximated during task execution — `pt: 2` (16px) instead of 24px, nav padding `px: 2` (16px) instead of 68px — because `get_design_context` was never called during implementation. It was only used retroactively during this investigation.

**What's missing**: Each task that creates a layout component must include an explicit step to call `get_design_context` for the corresponding Figma node and extract all `h-[]`, `px-[]`, `pt-[]`, `pb-[]`, `gap-[]` Tailwind class values before writing any code. These values must be used directly, not approximated.

---

### B — Container strategy was never specified

The navs render as full-width AppBars with `px: '68px'`. The page body uses MUI `Container maxWidth="lg"` which applies a breakpoint-based max-width (~1200px) with auto centering — a fundamentally different layout model. This creates horizontal misalignment between the nav content and the page content.

The Figma shows everything as full-width with explicit padding: navs at 68px, page body at 72px. MUI's Container was never the right tool here.

**What's missing**: The plan or task must specify the layout model explicitly — "use full-width `Box` with `px: '72px'` for the page body, not MUI `Container`" — so the implementer doesn't reach for the nearest MUI convenience component.

---

### C — CSS variable fallback values were not systematically read

The Figma Tailwind output consistently uses the pattern `var(--token-name, fallback)`. The fallback is always a usable concrete value. Examples from this page that were missed:

| Figma CSS variable expression | Fallback (should have been used) | What was implemented |
|---|---|---|
| `var(--typography/l, 16px)` | `16px` | `fontSize: 14` (guessed) |
| `var(--border-color/input/linear-gradient/gradient-end, #ccc)` | `#ccc` | Different border styling |
| `var(--background-color/neutral/low/default, rgba(204,204,204,0.2))` | `rgba(204,204,204,0.2)` | Custom search background |
| `var(--component/card/content/padding-top, 24px)` | `24px` | `pt: 2` = 16px |
| `var(--spacing/m, 16px)` | `16px` | Approximated |

The implementer read neither the Figma Tailwind output nor the fallback values — all sizing was written from memory or rough approximation.

**What's missing**: A rule that every `var(--token, fallback)` expression in the Figma output must have its fallback extracted and applied in the sx prop. The fallback is the ground truth when CSS variable injection is unavailable.

---

### D — `get_design_context` was never part of the implementation workflow

`get_design_context` returns the Figma Tailwind output with all exact values — spacing, colors, typography, dimensions. It was known as an available tool but was never called during T001–T023. The entire view was implemented from spec descriptions alone, without consulting the actual Figma component output.

**What's missing**: Every component task must include a mandatory first step: "Call `get_design_context` for the Figma node corresponding to this component. Extract all dimension, spacing, color, and typography values from the Tailwind output before writing any code."

---

### Updated Recommended Constitution Amendment

The previous Recommended Constitution Amendment (above) addressed token lookups via Supernova. It must be extended with these additional rules under Principle IV:

**`get_design_context` as mandatory implementation step**

> Before implementing any component or layout section, call `get_design_context` for the corresponding Figma node. Extract all values from the Tailwind output — `h-[]`, `px-[]`, `pt-[]`, `pb-[]`, `gap-[]`, `text-[]`, `bg-[]`, `border-[]` — and use them directly in the implementation. Do not approximate any layout value.

**CSS variable fallback extraction**

> The Figma Tailwind output uses the pattern `var(--token-name, fallback)` for all design tokens. When the CSS variable cannot be injected (which is always the case with `@weave-brand/core`), the fallback value MUST be used. Extract it from every `var(...)` expression in the Figma output. Using a different value without explicit justification is PROHIBITED.

**Container and layout model**

> MUI `Container` MUST NOT be used for top-level page layout. Use full-width `Box` with explicit padding values taken from the Figma `px-[]` output. All sections of the page (nav, sub-nav, page body) must use the same layout model so horizontal alignment is consistent.

---

## Summary: What's Missing from Provided Data

| Missing | Why it blocks exact implementation |
|---|---|
| Artifakt font CDN URL | Without it the browser falls back to system fonts; all typography is wrong |
| Autodesk logo SVG / CDN URL | Can't render the official mark; text fallback doesn't match |
| CSS variable injection mechanism | Can't resolve Figma token strings like `background-color/surface/300` in sx props |
| Complete Supernova token list | Token → hex mapping not available; correct token values for avatar, nav bg, etc. were guessed |
| Storybook stories for Header components | Exact height, padding, and layout for universal-header not consulted |
| MUI ↔ Figma token mapping doc | No documentation of which `theme.palette.*` key corresponds to each Figma CSS variable |
