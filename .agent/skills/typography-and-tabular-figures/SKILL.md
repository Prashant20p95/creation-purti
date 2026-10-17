---
name: typography-and-tabular-figures
description: Enterprise typographic system, font pairing (Inter + IBM Plex Mono), tabular lining figures, vertical numeric alignment, and multi-script Devanagari metrics.
---

# Typography, Tabular Figures, and Numeric Alignment

This skill governs the typographic hierarchy, font selection, numeric tabular alignment, and multi-script handling across the application. It prevents visual jitter in data grids, unaligned monetary/quantity columns, and clipped Indian script accents.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Styling tables, data grids, summary footers, or KPI cards.
- Rendering numbers, quantities, pass serial numbers, dates, timestamps, pincodes, or tracking codes.
- Configuring typography tokens, font stacks, line heights, or letter spacing.
- Displaying bilingual English / Hindi / Devanagari text labels.
- Resolving visual alignment defects in financial or inventory columns.

---

## 2. Core Principles & Exact Design Tokens

### A. Authoritative Dual Font Stack
Enterprise dispatch software requires two synchronized typefaces:
1. **Primary Interface Font (`font-sans`)**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`. High x-height, open apertures, distinct letterforms (disambiguates `I`, `l`, `1`).
2. **Tabular & Code Font (`font-mono`)**: `"IBM Plex Mono", "JetBrains Mono", Menlo, Consolas, monospace`. Monospaced geometry for tracking IDs, PIN codes, phone numbers, and serial ranges.

### B. The Tabular Lining Numerals Rule (`tnum`)
Every number in a table, ledger, or dashboard metric **must** use tabular lining numerals (`font-variant-numeric: tabular-nums;` or Tailwind `tabular-nums`). In proportional fonts, the digit `1` is narrower than `8`, causing numbers to jitter horizontally across rows and totals:

```
PROPORTIONAL (DEFECT):
Row 1: 111,111  (narrow width)
Row 2: 888,888  (wide width - columns don't align!)

TABULAR LINING (CORRECT):
Row 1: 111,111
Row 2: 888,888  (every digit has identical fixed advance width)
```

### C. Standard Typographic Scale

| Token | Size | Line Height | Tracking | Primary Use Case |
|---|---|---|---|---|
| `text-2xs` | `10px` (`0.625rem`) | `12px` | `+0.05em` (`tracking-wider uppercase`) | Micro category tags, column super-headers, table footer subtext. |
| `text-xs` | `12px` (`0.75rem`) | `16px` | `+0.02em` | Table data cells, secondary metadata, input labels, badge labels. |
| `text-sm` | `14px` (`0.875rem`) | `20px` | `normal` | Primary table cells (Station names), form input text, modal body text. |
| `text-base` | `16px` (`1.0rem`) | `24px` | `-0.01em` | Section headers, card titles, navigation items. |
| `text-lg` | `18px` (`1.125rem`) | `28px` | `-0.015em` | Page subheadings, drawer titles. |
| `text-xl` | `20px` (`1.25rem`) | `28px` | `-0.02em` | Modal dialog titles, medium KPI values. |
| `text-2xl` | `24px` (`1.5rem`) | `32px` | `-0.025em` | Primary Hero KPI numbers, page title. |

### D. Strict Column Text Alignment
- **Left-Align (`text-left`)**: Station Name, City, SPOC Name, Courier Provider, Address, General Text.
- **Right-Align (`text-right tabular-nums`)**: Badges, Coupons, Lanyards, Vehicle Passes, Total Quantity, Box Count, Dispatches.
- **Center-Align (`text-center`)**: Status Badges, Wave Tags (`W1`, `W2`), Date Stamps (`12-Oct-2026`), Action Icon Buttons.

### E. Devanagari and Bilingual Headroom
Devanagari matras (e.g. `ि`, `ी`, `ु`, `ू`, `े`, `ै`, `ं`) extend significantly above and below the Latin x-height. When rendering Hindi or bilingual labels:
- Set `line-height: 1.5` or `1.6` (`leading-relaxed`). Never clamp with `leading-none` or `leading-tight`, which causes top matras to be cut off by `overflow: hidden` containers.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't left-align numbers in the dispatch table**. When `1,200` is left-aligned above `45`, the eye cannot visually sum the column.
- **Don't use decorative script or serif fonts** anywhere in an operational dispatch cockpit.
- **Don't format dates ambiguously** like `10/11/26` (which causes confusion between 10-Nov and 11-Oct).
- **Don't use standard variable-width numbers** in the Macro KPI strip, causing numbers to jump when updated via WebSocket/polling.

### Do:
- **Do right-align all collateral numbers** and pair them with `font-mono tabular-nums`.
- **Do format all dates as `DD-MMM-YYYY`** (e.g. `12-Oct-2026`).
- **Do format Indian PIN codes as fixed 6-digit blocks with monospace spacing** (e.g. `110 001` or `400001`).
- **Do format Pass Serial Ranges in monospace with en-dash** (e.g. `UMG-001001 – UMG-002500`).

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind CSS)

```html
<!-- AUTHORITATIVE DATA TABLE ROW WITH TYPOGRAPHIC PRECISION -->
<tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-xs">
  <!-- Station Code: Monospace Bold -->
  <td class="px-4 py-2.5 font-mono font-semibold text-slate-800 text-left">
    STN-017-042
  </td>

  <!-- Station Name & City: Proportional Sans with strict hierarchy -->
  <td class="px-4 py-2.5 text-left">
    <div class="font-medium text-slate-900 text-sm">Kanpur Central Arena</div>
    <div class="text-2xs text-slate-500 font-normal">Uttar Pradesh &bull; Wave 2</div>
  </td>

  <!-- SPOC Info: Phone in Monospace -->
  <td class="px-4 py-2.5 text-left">
    <div class="text-slate-800 font-medium">Rajesh Sharma</div>
    <div class="font-mono text-2xs text-slate-500 tracking-tight">+91 98765 43210</div>
  </td>

  <!-- Status: Centered 3-part badge -->
  <td class="px-4 py-2.5 text-center">
    <span class="inline-flex items-center px-2 py-0.5 rounded text-2xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
      IN TRANSIT
    </span>
  </td>

  <!-- Badges: Right-Aligned Tabular Monospace -->
  <td class="px-4 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">
    1,200
  </td>

  <!-- Coupons: Right-Aligned Tabular Monospace -->
  <td class="px-4 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">
    1,200
  </td>

  <!-- Total Collaterals: Right-Aligned Bold Monospace -->
  <td class="px-4 py-2.5 text-right font-mono font-bold text-slate-950 tabular-nums">
    2,520
  </td>

  <!-- Action: Centered -->
  <td class="px-4 py-2.5 text-center">
    <button class="h-7 px-2 text-2xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700 shadow-2xs">
      Details
    </button>
  </td>
</tr>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Architectural Fix |
|---|---|---|---|
| **Wobbly Number Columns** | Table column edges look jagged; decimal points or commas do not line up vertically. | Inspect table `<td>` CSS: `text-align: left` or missing `tabular-nums`. | Apply `text-right tabular-nums font-mono` to all numeric cells. |
| **Clipped Devanagari Matras** | Hindi text characters lose top vowels (े, ै) or lower curves (ु, ू). | Visual inspection of Hindi labels; inspect CSS `line-height: 1` or `leading-none`. | Increase line-height to `leading-normal` (`1.5`) and ensure container has `py-1` padding. |
| **Ambiguous Dates** | Dates rendered as `10/05/26` or `2026-10-05T14:22:00Z`. | Grep for raw date rendering in templates. | Pass through `formatDate(d, 'DD-MMM-YYYY')` -> `05-Oct-2026`. |
| **Unreadable Tracking Numbers** | Long 14-digit courier tracking strings displayed in proportional sans with tight kerning. | Text string `1489201948201` rendered in `font-sans`. | Style as `font-mono tracking-wider text-xs select-all`. |

---

## 6. Self-Check Verification Checklist

- [ ] Every numeric column in tables is strictly right-aligned (`text-right`).
- [ ] Every number in data tables and KPI cards uses tabular lining numerals (`tabular-nums`).
- [ ] Tracking numbers, PIN codes, serial ranges, and phone numbers use monospace font (`font-mono`).
- [ ] Dates follow the unambiguous `DD-MMM-YYYY` format (e.g. `12-Oct-2026`).
- [ ] Devanagari / Hindi labels have adequate vertical line headroom (`leading-normal` or `leading-relaxed`).
- [ ] Table headers align precisely with their column data (Left-Left, Right-Right, Center-Center).
