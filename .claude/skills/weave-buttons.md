# Weave Brand Extended - Buttons

This skill covers all button components and their usage patterns.

## Monochromatic Variants

When placing buttons on colored backgrounds, use the `monochromatic` prop:

- `monochromatic="on-dark"` - for dark backgrounds
- `monochromatic="on-light"` - for light backgrounds

Applies to: `Button`, `IconButton`.

---

## Button

**Imports:** `Button` from `@mui/material`.

**Variants:** `contained` (default), `outlined`, `text`, `link-button`, `highlight`.

**Sizes:** `medium` (default), `small`.

**Props:**
- `fullWidth`: Expand to container width.
- `disabled`: Disabled state.
- `loading`: Show loading indicator.
- `monochromatic`: `"on-dark"` or `"on-light"` for colored backgrounds.

**Link Button Pattern:**
```tsx
<Button
  variant="link-button"
  startIcon={<SvgIcon><CtaArrowRight /></SvgIcon>}
>
  Learn more
</Button>
```

**Menu Button Pattern:**
```tsx
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

<Button
  onClick={(e) => setAnchorEl(e.currentTarget)}
  endIcon={<SvgIcon><CaretDown /></SvgIcon>}
>
  Options
</Button>
<Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
  <MenuItem onClick={handleClose}>Option 1</MenuItem>
</Menu>
```

---

## IconButton

**Imports:** `IconButton` from `@mui/material`.

**Variants:** `contained`, `outlined`, `text`, `highlight`, `quiet`.

**Sizes:** `medium`, `small`.

**Props:**
- `circular`: Boolean for circular shape.
- `monochromatic`: `"on-dark"` | `"on-light"`.

**Structure:**
```tsx
<IconButton aria-label="Sync" variant="outlined">
  <SvgIcon><Sync /></SvgIcon>
</IconButton>
```

**Always include `aria-label` for accessibility.**

---

## ButtonGroup

**Imports:** `ButtonGroup`, `Button` from `@mui/material`.

**Variants:** `contained`, `outlined`.

**Sizes:** `medium`, `small`.

**Structure:**
```tsx
<ButtonGroup variant="contained">
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>
```

**Split Button Pattern:** Add a second button with `More` icon and `Menu`.

---

## ToggleButton

**Imports:** `ToggleButton`, `ToggleButtonGroup` from `@mui/material`.

**Sizes:** `medium` (default), `small`.

**Props:**
- `exclusive`: Single selection mode.
- `value`: Current selected value(s).

**Structure:**
```tsx
const [value, setValue] = useState("option1");

<ToggleButtonGroup
  exclusive
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
>
  <ToggleButton value="option1">Option 1</ToggleButton>
  <ToggleButton value="option2">Option 2</ToggleButton>
  <ToggleButton value="disabled" disabled>Disabled</ToggleButton>
</ToggleButtonGroup>
```
