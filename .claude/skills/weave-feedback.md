# Weave Brand Extended - Feedback & Dialogs

This skill covers feedback components like alerts, dialogs, snackbars, and tooltips.

## Alert

**Imports:** `Alert`, `AlertTitle` from `@mui/material`.

**Variants:** `standard`, `outlined`, `filled`.

**Severities:** `success`, `info`, `warning`, `error`.

**Icons:** Use severity-specific Weave icons:
- `filled` variant: Use outline icons (`InfoOutline`, `CompleteOutline`, `AlertOutline`, `ErrorOutline`).
- Other variants: Use solid icons (`Info`, `Complete`, `Alert`, `Error` from `@weave-brand/icon/display-icons`).

**Structure:**
```tsx
<Alert
  severity="info"
  variant="standard"
  icon={<SvgIcon><Info /></SvgIcon>}
  onClose={() => {}}
>
  <AlertTitle>Title</AlertTitle>
  Alert message content.
</Alert>
```

**Do NOT use:** The MUI `action` prop on Alert.

---

## Dialog

**Imports:** `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` from `@mui/material`.

**Variants:** `default`, `takeover`, `lightbox`.

**Props:**
- `subdivision`: `"none"` | `"both"` for divider lines.
- `maxWidth`: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`.
- `fullWidth`: Expand to maxWidth.
- `fullScreen`: Full-screen mode (use with `variant="lightbox"`).

**Structure:**
```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="dialog-title">
  <DialogTitle>
    <Typography variant="headline-small" id="dialog-title">Title</Typography>
    <IconButton aria-label="close" onClick={() => setOpen(false)} variant="text">
      <SvgIcon><Cross /></SvgIcon>
    </IconButton>
  </DialogTitle>
  <DialogContent>
    Content here...
  </DialogContent>
  <DialogActions>
    <Button variant="contained">Primary</Button>
    <Button variant="outlined">Secondary</Button>
  </DialogActions>
</Dialog>
```

**Alert Dialog:** Use `disableEscapeKeyDown` and custom `onClose` to prevent backdrop dismissal.

---

## Snackbar (Toast)

**Imports:** `Snackbar`, `Slide` from `@mui/material`.

**Structure:**
```tsx
<Snackbar
  open={open}
  onClose={handleClose}
  message={
    <>
      <SvgIcon fontSize="large"><Info /></SvgIcon>
      <Typography variant="short-copy-small">Message text</Typography>
    </>
  }
  action={
    <>
      <Link>View</Link>
      <IconButton variant="quiet" size="small" onClick={handleClose}>
        <SvgIcon><Cross /></SvgIcon>
      </IconButton>
    </>
  }
  TransitionComponent={Slide}
/>
```

**Icons by level:** `Info`, `Complete`, `Alert`, `Error` from `@weave-brand/icon/display-icons`.

---

## Tooltip

**Imports:** `Tooltip`, `Button` from `@mui/material`.

**Props:**
- `title`: Tooltip text.
- `arrow`: Show arrow pointer (default: `true`).
- `placement`: Position (`top`, `bottom`, `left`, `right` + `-start`, `-end` variants).

**Structure:**
```tsx
<Tooltip arrow title="Tooltip text" placement="bottom">
  <Button>Hover me</Button>
</Tooltip>
```
