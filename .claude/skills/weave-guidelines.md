# Weave Brand Extended - Usage Guidelines

This skill provides general guidelines and rules for using the Weave Brand UI Kit with MUI components.

## Core Stack

- `@mui/material` — components
- `@weave-brand/core` — theming for product/app pages
- `@weave-brand/marketing` — theming for marketing pages
- `@weave-brand/icon` — all icons (never use `@mui/icons-material`)

## Component Skill Router

**Need help with a specific component? Use these focused skills:**

### Forms & Inputs → `/weave-forms`
Input, Select, Autocomplete, Checkbox, Radio, RadioGroup, Switch, DatePicker, FormControl, FormHelperText

### Buttons → `/weave-buttons`
Button, IconButton, ButtonGroup, ToggleButton, ToggleButtonGroup

### Layout & Structure → `/weave-layout`
Page layouts, Box/Container patterns, Card, Paper, Divider, Accordion, Stack

### Feedback & Dialogs → `/weave-feedback`
Alert, Dialog, Snackbar (Toast), Tooltip

### Data Display → `/weave-data`
Table, Tabs, Typography, Badge, Chip

### Navigation → `/weave-navigation`
Breadcrumbs, Link, Menu, Pagination

### Progress & Loading → `/weave-progress`
CircularProgress, LinearProgress, Skeleton

### Icons → `/weave-icons`
Icon usage rules, available icons, wrapping with SvgIcon

### Carousel → `/weave-carousel`
Carousel component and navigation

---

## Core Principles

### Use MUI Components

Use MUI components from `@mui/material`.

For uncertainties about MUI, use documentation or search for Material UI examples.

### Don't Use Tailwind or Vanilla HTML

Don't use Tailwind CSS or vanilla HTML elements for layout and styling.
Always use MUI components and the `sx` prop for styling.

### Typography Rules

**Do not style text inside components. Don't create styling for text.**

**Only use a Typography component if you encounter a Typography component in Figma.**

**If you do use Typography, only set the `variant` property. No extra styles should be added.**

**Don't put Typography components inside Buttons.**

## Layout Guidelines

### Responsive Images

If an image or Frame occupies the full width of the design, use percentages, not pixel sizes.

For smaller inner nodes, use Stacks and the flex property instead of percentages.

### Never Use Position Absolute

Never use `position: absolute`. Use fluid design and responsive design methods instead.

### AutoLayout = Stack

When Figma uses AutoLayout, use an MUI `Stack` component with the `useFlexGap` property.

AutoLayout may also be called "layoutMode" HORIZONTAL / VERTICAL.

## Spacing Scale

The spacing scale is:
- `0`: 0px
- `1`: 8px
- `2`: 12px
- `3`: 16px
- `4`: 24px
- `5`: 32px
- `6`: 48px

Use these values with the `gap` prop on Stack components or with MUI spacing utilities.

## Page Layouts

### Correct Structure

When building page-wide layouts, the correct way to build it is usually `Box`, then `Container`.

```tsx
<Box sx={{ py: 4 }}>
  <Container>
    {/* Content */}
  </Container>
</Box>
```

**Don't set `px` (paddingX, padding-inline) on the top level Box.**

**Don't set a `maxWidth` on Container.**

Use inner padding at the top level node to create space.

## Design Tokens

### Colors

When assigning colors to text or background colors, use the MUI palette and shorthand notation.

**For text color:**
- `text-color.heavy.default`
- `text-color.medium.default`
- `text-color.light.default`
- `text-color.highlight`
- `status-color.error.text`

**For background colors:**
- `surface.300`
- `surface.250`
- `surface.200`
- `surface.100`
- `surface.300a` (with alpha)

## Typography Variants

Do NOT use the standard MUI typography variants.

The ONLY allowed variants for the Typography component are:

### Display
- `"display-large"`
- `"display-medium"`
- `"display-small"`

### Headlines
- `"headline-largest"`
- `"headline-larger"`
- `"headline-large"`
- `"headline-medium"`
- `"headline-small"`
- `"headline-smaller"`
- `"headline-smallest"`

### Body Copy
- `"body-copy-larger"`
- `"body-copy-large"`
- `"body-copy-medium"`
- `"body-copy-small"`

### Short Copy
- `"short-copy-large"`
- `"short-copy-medium"`
- `"short-copy-small"`

### Other
- `"smallprint"`
- `"code"`
- `"caption"`
- `"eyebrow-large"`
- `"eyebrow-medium"`
- `"eyebrow-small"`
- `"pull-quote-medium"`
- `"pull-quote-large"`
- `"visually-hidden"`

## Component-Specific Rules

### Alert Component

**Do NOT use the MUI `action` prop on the Alert component.**

### Accordion Summary Stepper Icon

When inserting icons into the Accordion summary stepper, use the number icons:
`One`, `Two`, `Three`, `Four`, `Five`, `Six`, `Seven`, `Eight`, `Nine`, `Ten` from `@weave-brand/icon`.

### Link Component

**Use the Link MUI component when creating links.**

**Don't use extra `sx` to style their color or underline.**

**Don't use a Box with `component="a"`.**

### Grid Component

**Do not use the MUI Grid component.**

Instead, use a `Box` with `sx={{ display: 'grid' }}`. The MUI Grid component is not a real CSS Grid.

### TextField vs Input

**Don't use TextField.**

Use `FormControl` and `Input` instead for better control and consistency with the design system.

## Figma Workflow

When working from Figma designs:
1. Use `get_design_context` (Figma MCP) — primary tool, returns component code, screenshot, and Code Connect hints
2. Use `get_metadata` to inspect structure, hierarchy, and node IDs
3. Let the theme handle styling — minimize additional `sx` props
4. Only add `sx` if the resulting output is genuinely lacking something the theme doesn't cover
5. AutoLayout in Figma → `Stack` with `useFlexGap` in code

## Component Exports

**Use named exports whenever creating a component.**

```tsx
// Good
export const MyComponent = () => { ... };

// Bad
export default MyComponent;
```

## Best Practices Summary

1. ✅ Use MUI components from `@mui/material`
2. ✅ Use `@weave-brand/icon` for all icons
3. ✅ Use `Stack` with `useFlexGap` for layouts
4. ✅ Use the spacing scale (0-6)
5. ✅ Use design tokens for colors
6. ✅ Use only allowed Typography variants
7. ✅ Use `Box` then `Container` for page layouts
8. ❌ Don't use Tailwind or vanilla HTML
9. ❌ Don't style text inside components
10. ❌ Don't use `position: absolute`
11. ❌ Don't use MUI Grid component
12. ❌ Don't use TextField (use FormControl + Input)
13. ❌ Don't use @mui/icons-material
14. ❌ Don't add extra Typography styles beyond variant
