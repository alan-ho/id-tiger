import { createTheme as createWeaveBrandTheme } from '@weave-brand/core/theme'

const { light: brandTheme } = createWeaveBrandTheme('brand', 'light')

/**
 * Remove null values from style objects recursively.
 * Emotion calls Object.keys(null) when it encounters null CSS values → TypeError.
 * Weave Brand theme has several null overrides (e.g. MuiTableCell sizeSmall fontSize).
 */
function sanitizeStyles(val) {
  if (val === null || val === undefined) return undefined
  if (Array.isArray(val)) {
    return val
      .map(item => {
        // Variants without `props` crash: Object.keys(undefined) in MUI's processStyleArg.
        // A variant without props is a "always apply" base style — fix with props: {}.
        if (item && typeof item === 'object' && !Array.isArray(item) && 'style' in item && !('props' in item)) {
          return sanitizeStyles({ ...item, props: {} })
        }
        return sanitizeStyles(item)
      })
      .filter(v => v !== undefined)
  }
  if (typeof val !== 'object') return val
  const out = {}
  for (const key of Object.keys(val)) {
    const cleaned = sanitizeStyles(val[key])
    if (cleaned !== undefined) out[key] = cleaned
  }
  return out
}

const components = {}
for (const [name, comp] of Object.entries(brandTheme.components || {})) {
  if (comp?.styleOverrides) {
    components[name] = { ...comp, styleOverrides: sanitizeStyles(comp.styleOverrides) }
  } else {
    components[name] = comp
  }
}

/**
 * Weave Brand spacing uses a discrete 7-item array: [4,8,12,16,24,32,48].
 * MUI components use fractional multipliers (0.5, 1.5, etc.) which return "".
 * Patch: fall back to standard 8px-base linear spacing for out-of-range or non-integer factors.
 */
const WEAVE_SPACING = [4, 8, 12, 16, 24, 32, 48]
function spacingFn(...args) {
  if (args.length === 0) return ''
  return args.map(factor => {
    if (typeof factor === 'string') return factor
    const n = Number(factor)
    if (Number.isInteger(n) && n >= 0 && n < WEAVE_SPACING.length) {
      return `${WEAVE_SPACING[n]}px`
    }
    // Fractional / out-of-range: linear 8px base
    return `${Math.round(n * 8)}px`
  }).join(' ')
}

/**
 * Weave Brand shadows is a named object ({100,200,...}), not a 25-item MUI array.
 * MUI Paper uses theme.shadows[elevation]. Build a standard 25-item array.
 */
const muiShadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
]

const weaveTheme = {
  ...brandTheme,
  spacing: spacingFn,
  shadows: muiShadows,
  components,
}

export default weaveTheme
