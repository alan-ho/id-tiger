# Weave Brand Extended - Navigation

This skill covers navigation components: breadcrumbs, menus, pagination, and links.

## Breadcrumbs

**Imports:** `Breadcrumbs`, `Link`, `Typography` from `@mui/material`.

**Structure:**
```tsx
<Breadcrumbs>
  <Link underline="hover" href="#">Primary</Link>
  <Typography>Current</Typography>
</Breadcrumbs>
```

**Props:** `maxItems`, `itemsBeforeCollapse`, `itemsAfterCollapse` for truncation.

---

## Link

**Imports:** `Link` from `@mui/material`.

**Props:**
- `underline`: `"always"` (default), `"hover"`.
- `href`: URL.
- `monochromatic`: `"on-dark"` | `"on-light"`.
- `disabled`: Disabled state.

**Do NOT:** Add extra `sx` styling for color or underline. Do NOT use `Box component="a"`.

---

## Menu

**Imports:** `Menu`, `MenuItem`, `Button` from `@mui/material`.

**Pattern:**
```tsx
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);

<Button
  aria-controls={open ? "menu-id" : undefined}
  aria-haspopup="true"
  aria-expanded={open ? "true" : undefined}
  onClick={(e) => setAnchorEl(e.currentTarget)}
>
  Open Menu
</Button>
<Menu
  id="menu-id"
  anchorEl={anchorEl}
  open={open}
  onClose={() => setAnchorEl(null)}
  MenuListProps={{ "aria-labelledby": "button-id" }}
>
  <MenuItem onClick={handleClose}>Option 1</MenuItem>
  <MenuItem onClick={handleClose}>Option 2</MenuItem>
</Menu>
```

---

## Pagination

**Imports:** `Pagination`, `Typography` from `@mui/material`.

**Props:**
- `count`: Number of pages.
- `siblingCount`: Adjacent pages shown (use `0` for mobile).
- `disabled`: Disabled state.

**Structure:**
```tsx
<Pagination count={10} />
<Typography variant="smallprint" align="center">151-200 of 500 items</Typography>
```
