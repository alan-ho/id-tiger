# Weave Brand Extended - Forms & Inputs

This skill covers all form components and input patterns.

## Input / TextField

**Don't use TextField. Use FormControl and Input instead.**

**Imports:** `Input`, `FormControl`, `InputLabel`, `FormHelperText`, `InputAdornment` from `@mui/material`.

**Structure:**
```tsx
<FormControl>
  <InputLabel htmlFor="input-id">Label</InputLabel>
  <Input id="input-id" aria-describedby="helper-text" />
  <FormHelperText id="helper-text">Helper text</FormHelperText>
</FormControl>
```

**States:** Apply to `FormControl`:
- `error`: Error state.
- `success`: Success state.
- `disabled`: Disabled state.

**Helper Text with Icon:**
```tsx
<FormHelperText>
  <SvgIcon aria-label="Error"><SvgError /></SvgIcon>
  Error message
</FormHelperText>
```

**Password Field:**
```tsx
<Input
  type={show ? "text" : "password"}
  endAdornment={
    <InputAdornment position="end">
      <IconButton onClick={() => setShow(!show)} variant="quiet">
        <SvgIcon>{show ? <Hidden /> : <Visible />}</SvgIcon>
      </IconButton>
    </InputAdornment>
  }
/>
```

**Number Input:** Use `type="number"` with `Add`/`Subtract` icon buttons.

**TextArea:** Use `multiline` and `rows` props.

---

## Select

**Imports:** `Select`, `MenuItem`, `FormControl`, `FormLabel`, `FormHelperText`, `SvgIcon`, `Typography` from `@mui/material`. For error icon: `Error as ErrorIcon` from `@weave-brand/icon/display-icons`.

**Variants:**
- `outlined` (default): Standard select with border.
- `filled` (quiet): Subtle background style.

**States:**
- `disabled`: Apply to `FormControl` to disable entire field.
- `error`: Apply to `FormHelperText` to show error styling.

**Props:**
- `displayEmpty`: Required to show placeholder when no value selected.
- `renderValue`: Custom render function for selected value display.
- `fullWidth`: Expand to container width (apply to `FormControl`).

**Structure:**
```tsx
const [value, setValue] = React.useState("");

<FormControl fullWidth disabled={isDisabled}>
  <FormLabel htmlFor="select-id">
    Select label{" "}
    <Typography variant="body-copy-small" component="span">
      (optional)
    </Typography>
  </FormLabel>
  <Select
    id="select-id"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    displayEmpty
    renderValue={(selected) =>
      selected === "" ? (
        <span style={{ fontWeight: 400 }}>Select...</span>
      ) : (
        OPTIONS[selected]
      )
    }
  >
    {Object.entries(OPTIONS).map(([val, label]) => (
      <MenuItem key={val} value={Number(val)}>
        {label}
      </MenuItem>
    ))}
  </Select>
  <FormHelperText error={hasError}>
    {hasError && (
      <SvgIcon>
        <ErrorIcon />
      </SvgIcon>
    )}
    Helper text
  </FormHelperText>
</FormControl>
```

**Key Patterns:**
- Always use `displayEmpty` when you need a placeholder.
- Use `renderValue` to customize placeholder text styling (lighter font weight).
- Error icon comes from `@weave-brand/icon/display-icons`, not the main icon package.
- `disabled` prop goes on `FormControl`, not on `Select` directly.

---

## Autocomplete

**Imports:** `Autocomplete`, `TextField`, `MenuItem`, `FormControl`, `InputLabel` from `@mui/material`.

**Key Patterns:**
- Use `renderOption` to customize dropdown items with `MenuItem`.
- Use `renderInput` with `TextField variant="standard"`.
- Show checkmarks for selected items using `Checkmark` icon from `@weave-brand/icon/ui-controls`.

**Structure:**
```tsx
<FormControl fullWidth>
  <InputLabel htmlFor="autocomplete-id">Label</InputLabel>
  <Autocomplete
    options={options}
    renderOption={({ className, ...optionProps }, option, state, ownerState) => (
      <MenuItem {...optionProps} selected={state.selected} key={option}>
        {option}
        {state.selected && (
          <SvgIcon sx={{ position: "absolute", right: "12px" }}>
            <Checkmark />
          </SvgIcon>
        )}
      </MenuItem>
    )}
    renderInput={(inputProps) => (
      <TextField {...inputProps} variant="standard" placeholder="Search..." />
    )}
  />
</FormControl>
```

**Multiple Selection:** Use `multiple`, `disableCloseOnSelect`, and `Chip` for tags.

**Search Variant:** Add `variant="filled"` to Autocomplete, use `InputAdornment` with `Search` icon.

---

## Checkbox

**Imports:** `Checkbox`, `FormControlLabel`, `FormControl`, `FormGroup`, `FormLabel` from `@mui/material`.

**Sizes:** `medium` (default), `small`.

**States:** `checked`, `indeterminate`, `disabled`, `error`.

**Structure:**
```tsx
<FormControlLabel control={<Checkbox />} label="Option" />
```

**Group Structure:**
```tsx
<FormControl component="fieldset">
  <FormLabel component="legend">Group Label</FormLabel>
  <FormGroup>
    <FormControlLabel control={<Checkbox />} label="Option 1" />
    <FormControlLabel control={<Checkbox />} label="Option 2" />
  </FormGroup>
</FormControl>
```

**Error State:** Add `error` prop to `FormControlLabel`.

---

## RadioGroup

**Imports:** `RadioGroup`, `Radio`, `FormControl`, `FormControlLabel`, `FormLabel` from `@mui/material`.

**Sizes:** `medium` (default), `small`.

**Props:**
- `row`: Horizontal layout.
- `defaultValue`: Pre-selected value.

**Structure:**
```tsx
<FormControl>
  <FormLabel id="group-label">Options</FormLabel>
  <RadioGroup
    aria-labelledby="group-label"
    defaultValue="option1"
    name="radio-group"
  >
    <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
    <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
  </RadioGroup>
</FormControl>
```

**Error State:** Add `error` to `FormControl`, show `FormHelperText` with error icon.

---

## Switch

**Imports:** `Switch`, `FormControlLabel` from `@mui/material`.

**Structure:**
```tsx
<FormControlLabel control={<Switch />} label="Toggle option" />
```

**Label Placement:**
```tsx
<FormControlLabel control={<Switch />} label="Start" labelPlacement="start" />
```

**Accessibility:** Always provide label or use `slotProps.input["aria-label"]`.

---

## DatePicker

**Imports:** `DatePicker`, `DateRangePicker` from `@mui/x-date-pickers-pro`. Requires `LocalizationProvider` with `AdapterDayjs`.

**Structure:**
```tsx
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Date"
    value={value}
    onChange={setValue}
    slotProps={{
      textField: {
        helperText: "Helper text",
        InputLabelProps: { shrink: true },
      },
    }}
  />
</LocalizationProvider>
```
