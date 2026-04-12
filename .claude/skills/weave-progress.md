# Weave Brand Extended - Progress & Loading

This skill covers progress indicators and loading states: circular progress, linear progress, and skeletons.

## CircularProgress

**Imports:** `CircularProgress` from `@mui/material`.

**Variants:** `indeterminate` (default), `determinate`.

**Sizes:** `14`, `24`, `48`, `112` (use corresponding strokeWidth).

**Pattern:** Layer two CircularProgress components for track + progress:
```tsx
<Box sx={{ position: "relative" }}>
  <CircularProgress variant="determinate" value={100} color="background" />
  <CircularProgress variant="determinate" value={66} color="foreground" />
</Box>
```

---

## LinearProgress

**Imports:** `LinearProgress` from `@mui/material`.

**Variants:** `indeterminate` (default), `determinate`.

**Heights:** Default (thin), Medium (`sx={{ height: "3px" }}`).

**With Label:**
```tsx
<LinearProgress variant="determinate" value={66} />
<Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
  <Typography variant="smallprint">Loading...</Typography>
  <Typography variant="smallprint">66%</Typography>
</Box>
```

---

## Skeleton

**Imports:** `Skeleton` from `@mui/material`.

**Variants:** `text`, `circular`, `rectangular`.

**Animations:** `pulse` (default), `wave`, `false`.

**Size Inference:** Wrap content to inherit size:
```tsx
<Skeleton>
  <Typography variant="headline-large">Loading text</Typography>
</Skeleton>
```

**Fixed Size:**
```tsx
<Skeleton variant="circular" width={50} height={50} />
```

**Aspect Ratio:**
```tsx
<Skeleton variant="rectangular" width="100%">
  <div style={{ aspectRatio: "16/9" }} />
</Skeleton>
```
