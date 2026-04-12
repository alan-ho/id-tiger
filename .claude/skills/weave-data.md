# Weave Brand Extended - Data Display

This skill covers components for displaying data: tables, tabs, typography, badges, and chips.

## Table

**Imports:** `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableContainer` from `@mui/material`.

**Variants:** `quiet` (default).

**Appearance:** `zebra` for striped rows.

**Sizes:** `small`, `medium`.

**Container:** Wrap in `<TableContainer variant="default">` for contained style.

**Structure:**
```tsx
<TableContainer variant="default">
  <Table size="small" appearance="zebra" variant="quiet">
    <TableHead>
      <TableRow>
        <TableCell>Column 1</TableCell>
        <TableCell>Column 2</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow hover>
        <TableCell>Cell 1.1</TableCell>
        <TableCell>Cell 1.2</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>
```

**Row States:**
- `hover`: Enable hover effect.
- `selected`: Selected state (with `aria-selected={true}`).
- `highlighted`: Recently added row (with `aria-label="Recently added row"`).

**Selectable Rows:** Add `Checkbox` in first cell, use `selected` prop on `TableRow`.

---

## Tabs

**Imports:** `Tabs`, `Tab`, `IconButton`, `SvgIcon` from `@mui/material`.

**Variants:** `scrollable`.

**Appearances:** `quiet` (default), `loud`.

**Orientations:** `horizontal` (default), `vertical`.

**Structure:**
```tsx
const [value, setValue] = useState(0);

<Tabs
  value={value}
  onChange={(e, newValue) => setValue(newValue)}
  aria-label="tabs"
  slots={{
    scrollButtons: ({ direction, ...props }) => (
      <IconButton {...props} size="small" variant="outlined" circular>
        <SvgIcon>{direction === "left" ? <CaretLeft /> : <CaretRight />}</SvgIcon>
      </IconButton>
    ),
  }}
>
  <Tab label="Tab 1" id="tab-0" aria-controls="panel-0" />
  <Tab label="Tab 2" id="tab-1" aria-controls="panel-1" />
</Tabs>
```

---

## Typography

**Allowed Variants:**
- Display: `display-large`, `display-medium`, `display-small`
- Headlines: `headline-largest`, `headline-larger`, `headline-large`, `headline-medium`, `headline-small`, `headline-smaller`, `headline-smallest`
- Body: `body-copy-larger`, `body-copy-large`, `body-copy-medium`, `body-copy-small`
- Short: `short-copy-large`, `short-copy-medium`, `short-copy-small`
- Other: `smallprint`, `code`, `caption`, `eyebrow-large`, `eyebrow-medium`, `eyebrow-small`, `pull-quote-medium`, `pull-quote-large`, `visually-hidden`

**Colors:** `text-color.heavy`, `text-color.medium`, `text-color.light`, `text-color.highlight`, `status-color.error.text`.

**Nesting:** Use `variant="inherit"` to inherit parent styles.

```tsx
<Typography variant="short-copy-large">
  Text with <Typography variant="inherit" color="status-color.error.text" fontWeight="bold">highlighted</Typography> word.
</Typography>
```

**Do NOT:** Style text inside components. Only use Typography when it appears in Figma. Only set the `variant` property—no extra styles.

---

## Badge

**Imports:** `Badge` from `@mui/material`.

**Variants:** `standard`, `dot`, `inline`, `outlined`.

**Colors:** `error`, `info`, `neutral`, `success`, `warning`.

**Structure:**
```tsx
<Badge badgeContent="New" color="info" variant="standard">
  <Typography>Badge</Typography>
</Badge>
```

---

## Chip

**Imports:** `Chip` from `@mui/material`.

**Colors:** `default`, `error`.

**Props:**
- `clickable`: Makes chip interactive.
- `onDelete`: Shows delete icon, makes chip removable.
- `selected`: Selected state styling.
- `icon`: Add icon before label.

**Structure:**
```tsx
<Chip label="Tag" clickable onDelete={() => {}} />
<Chip
  selected
  icon={<SvgIcon><Mail /></SvgIcon>}
  label="With Icon"
/>
```
