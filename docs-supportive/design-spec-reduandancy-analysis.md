# Design Spec Redundancy Analysis — COPPA Supervision Center

**Reviewed against:** `docs/xd-design.md` (last updated 2026-04-10)  
**Sources of truth compared:** Figma file `lEKAg7khZrmq1Dwa2PduKH`, Weave Brand docs, `CLAUDE.md`

---

## Summary

§5 (Acceptance Criteria) and §6 (Accessibility) are the highest-value sections — they contain nothing derivable from Figma or Weave docs. §3 (Component Inventory) and §8 (Token Bindings) are mostly redundant with those sources, but each contains a handful of critical embedded notes that must be preserved. §7 (Editorial) and §2 (Page Structure) sit in the middle: the tables are redundant, the notes are not.

One spec gap was also identified during review — noted at the end.

---

## Keep — unique and not derivable from Figma or Weave

| Section | Why it's irreplaceable |
|---|---|
| **§1 Purpose & Moderator persona** | Business rationale and persona implications — nothing in Figma or Weave encodes *why* choices were made |
| **§1.1 Language Support** | EN/KO bilingual requirement and "no language switcher" decision are pure product constraints invisible in Figma |
| **§2 — the Note in 2.1 only** | "Activity tracking, Feature, Feature tabs are not rendered" — a deliberate divergence from Figma a developer would never know from the file alone |
| **§5 Acceptance Criteria** | BDD Given/When/Then scenarios are entirely absent from Figma. Figma shows appearances, not behaviors. Includes "Delete user is a placeholder" product decision that exists nowhere else |
| **§6 Accessibility** | ARIA attributes, semantic HTML requirements, keyboard navigation, focus trap, `aria-disabled` vs `disabled` distinction, `prefers-reduced-motion` — none of this is in Figma |
| **§6.7 Color Contrast** | `color/blue/700/100` (not 500) confirmation with the ≥4.5:1 contrast ratio analysis — this is an **override of what Figma actually shows** (Figma uses 500, which fails AA) |
| **§9.2–9.4 Data fetching and interaction responsiveness** | "Server-side pagination", "single API call on save, no re-fetch", "drawer doesn't cause reflow", "100ms targets" — none of this is derivable from Figma or CLAUDE.md |
| **§10 Open Questions (resolutions only)** | Three resolutions encode Figma inaccuracies: `color/blue/500/100` → `700`, "8 characters" → "10 characters", placeholder tabs. Without this log, future maintainers might revert to what Figma currently shows |

---

## Redundant — directly readable from Figma or Weave docs

| Section | Why it's redundant |
|---|---|
| **§2 Page Structure (ASCII art diagrams)** | The layout hierarchy is visible in Figma; the ASCII art re-transcribes the same information at lower fidelity |
| **§3 Component Inventory — basic rows** | Component names, import paths, and standard prop values (`variant="outlined"`, `size="medium"`) are surfaced by Figma Code Connect + Weave documentation |
| **§7 Copy tables (strings only)** | Strings are readable directly in Figma. Maintaining them here creates a second source of truth that will drift |
| **§8.1 Import patterns** | The `SvgIcon` + `@weave-brand/icon` pattern is in Weave docs and already in `CLAUDE.md` |
| **§8.2 Typography variant bindings** | Derivable from Weave docs and Figma variable definitions |
| **§8.3–8.4 Button and link usage checklists** | Standard MUI/Weave usage; derivable from Weave docs |
| **§8.6 Divider usage** | Derivable from Weave docs |
| **§8.7 Token bindings table** | Weave semantic tokens are all bound in Figma variable definitions — visible in dev mode. The one exception (`color/blue/700/100`) is already captured in §6.7 |
| **§9.1 Asset loading** | FCP/LCP/CLS budgets are already in `CLAUDE.md` as mandatory build gates |

---

## Keep selectively — mostly redundant but contain embedded unique notes

### §3 Component Inventory

Delete all basic component/import rows. Keep only these:

| Row | Why |
|---|---|
| `Tabs` + `variant="scrollable"` note | Weave/MUI rendering quirk — the quiet border doesn't render without this. Not in docs. |
| Row avatar: `color/blue/700/100` (not 500) | Explicit override of Figma; accessibility-driven. Figma shows the wrong token. |
| `SetPasswordInput` (custom) | Not a Weave or MUI component; notes the custom implementation requirement |
| `FormControl + Input` (not `TextField`) | Weave rule easy to get wrong |
| Forward icon: `component="a"` | Semantic HTML decision not visible in Figma |
| `Circle` icon: color from `success.main` / `text.disabled` | Never hardcoded hex — theme token constraint not visible in Figma |
| Sub-path icon imports (`/ui-controls`, `/pictograms`) | Non-obvious; wrong sub-path causes a missing import that doesn't fail at compile time |

### §7 Editorial Checks

Drop the copy tables for strings visible in Figma. Keep:

| Content | Why |
|---|---|
| §7.1 navigation labels table | Has "Placeholder — render as inert, no route" overrides that diverge from Figma |
| §7.3 Status badge labels | The color mapping (info/error/success/default) is a design decision not obvious from Figma alone |
| §7.4 — the Notes column only | "Reenter" (one word), `child's` typographic apostrophe, "Delete Account" title case vs "Delete user" sentence case |
| §7.5 — instruction text row | Figma **currently says "8 characters"** (not yet corrected). This spec is authoritative at 10. |
| §7.6 Error Messages | Not in Figma; full table must be kept |
| §7.7 Modal Copy | Not easily readable from Figma; keep full text |

### §4 States

Drop: 4.1 (Default — visible in Figma), 4.3 (Rows Selected — obvious from ACs).

Condense: 4.4 (Empty State — keep Figma node link only), 4.9 (Drawer open — one line).

Keep in full: 4.2 (Loading — "action bar renders immediately" is behavioral), 4.5 (14 asterisks regardless of length), 4.6 (card headings render immediately), 4.8 (Delete modal), 4.10–4.13 (drawer states — behavior not visible in Figma).

---

## Spec gap identified

**"Pending approval" tab is missing from §2.2 and §7.2.**

The User Management Figma screen (`23:14271`) shows three content tabs: **By accounts**, **By product**, **Pending approval**. The spec lists only two. Either this tab is a placeholder not rendered in this release (like the nav tabs, requiring an explicit note), or it was accidentally omitted. Needs resolution with Alan before build.

---

## Recommended action

1. Replace §2 with a short "Figma Divergences" section (3–4 bullet points).
2. Replace §3 with a short "Non-Standard Implementation Notes" section (~10 items).
3. Condense §4 to behavioral rules only.
4. Drop §8 entirely — all unique content absorbed into §3/§6.
5. Rename §9 → §8; drop §9.1.
6. Drop §10 — all resolutions already folded into §2, §6.7, §7.5.
7. Resolve "Pending approval" tab gap with Alan.
