# Weave Brand Extended - Layout & Structure

This skill covers layout patterns, structural components, and spacing guidelines.

## Page Layout Structure

When presenting components in a page or prototype view, follow this structural pattern:

```tsx
<Box sx={{ py: 4, backgroundColor: "surface.300" }}>
  <Container>
    {/* Header or Title */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="headline-medium">Section Title</Typography>
    </Box>

    {/* Component Instance */}
    <Component {...props} />
  </Container>
</Box>
```

**Rules:**
- Use `Box` with vertical padding (`py: 4`) as the root wrapper.
- Use `Container` to center content and constrain max-width.
- Do not use the `Grid` component. Instead, use a `Box` with `sx={{display: 'grid'}}`. The MUI Grid component is not a real CSS Grid.
- Use `backgroundColor: "surface.300"` for demo backgrounds.
- For dark backgrounds, apply `backgroundColor` to the wrapping `Box` and adjust text colors accordingly.

## Internal Spacing

- Use `<Stack useFlexGap>` for internal spacing instead of margins.
- Use `gap` prop values from the spacing scale: `{0:0px, 1:8px, 2:12px, 3:16px, 4:24px, 5:32px, 6:48px}`.
- Use `direction="row"` for horizontal layouts.

## Responsive Design

Use MUI's `sx` prop for responsive behavior:

- **Hiding Elements**: `display: { xs: "none", md: "block" }`
- **Adaptive Layouts**: `flexDirection: { xs: "column", md: "row" }`
- **Adaptive Padding**: Array syntax: `paddingInlineEnd: ["1rem", "1.5rem", "5%"]`

---

## Card

**Imports:** `Card`, `CardContent`, `CardMedia`, `CardActions`, `CardActionArea` from `@mui/material`.

**Variants:** `default`, `quiet`, `wireframe`.

**Props:**
- `twoColumns`: Two-column layout.
- `selected`: For selectable cards.

**Structure:**
```tsx
<Card variant="default">
  <CardMedia component="img" image="..." alt="Alt text" />
  <CardContent>
    <Stack useFlexGap gap={1}>
      <Typography variant="eyebrow-medium">Category</Typography>
      <Typography variant="headline-medium" component="h2">Title</Typography>
      <Typography variant="short-copy-medium">Description</Typography>
    </Stack>
  </CardContent>
  <CardActions>
    <Button variant="link-button" startIcon={<SvgIcon><CtaArrowRight /></SvgIcon>}>
      Learn more
    </Button>
  </CardActions>
</Card>
```

**Clickable Card:** Wrap content in `<CardActionArea component="a" href="#">`.

**Custom Background:** Use CSS variable `--paper-background-color`:
```tsx
<Card sx={{ "--paper-background-color": theme.palette.surface["300a"] }}>
```

---

## Paper

**Imports:** `Paper` from `@mui/material`.

**Elevations:** `100`, `200`, `250`, `300`, `"300a"`.

**Custom Background:** Use CSS variable, NOT `backgroundColor` or `background`:
```tsx
<Paper elevation={200} sx={{ "--paper-background-color": "#DDEEFF" }}>
```

**Remove Borders:**
```tsx
<Paper sx={{ "--paper-border-color": "transparent" }}>
```

---

## Divider

**Imports:** `Divider` from `@mui/material`.

**Props:**
- `orientation`: `"horizontal"` (default) | `"vertical"`.
- `light`: Boolean for lighter appearance.
- `flexItem`: Required for vertical orientation in flex containers.

---

## Accordion

**Imports:** `Accordion`, `AccordionSummary`, `AccordionDetails` from `@mui/material`.

**Types:** `accordionList` (default), `stepper`.

**Variants:** `mergedPanel` (default), `individualPanel`, `minimal`, `flat`.

**Props:**
- `dense`: Boolean for compact spacing.
- `type="stepper"`: For step-by-step wizards.
- `elevation={300}`: For `minimal` and `flat` variants.

**Structure:**
```tsx
<Accordion variant="mergedPanel">
  <AccordionSummary>
    <Typography variant="headline-smaller">Summary</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography variant="body-copy-medium">Content here...</Typography>
  </AccordionDetails>
</Accordion>
```

**Stepper Pattern:** Use `One`, `Two`, `Three`, etc. icons from `@weave-brand/icon` in `AccordionSummary`. Use `Complete` icon for completed steps.
