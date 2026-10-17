---
name: visual-hierarchy-and-density
description: Spatial rhythm, strict 4px/8px geometric scale, density modes, container bounds, scanning rhythm, and zero-clutter layout architecture for mission-critical enterprise tools.
---

# Visual Hierarchy, Spacing Rhythm, and Layout Density

This skill defines the engineering and design rules for spatial layout, container bounding, vertical rhythm, and density modes in high-velocity business software. It prevents cramped clutter, excessive AI-template whitespace, and unpredictable alignment drift.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or refactoring page shells, cards, tables, toolbars, or macro ribbons.
- An interface feels "crowded", "messy", "misaligned", or overwhelming.
- An interface feels "floaty", "empty", or consumes too much vertical height without delivering information.
- Adding multi-column grid layouts, KPI ribbon bars, or filter headers.
- Establishing viewport breakpoints and responsive collapse logic.

---

## 2. Core Principles & Exact Geometric Values

### A. The Strict 4px / 8px Spatial Scale
Never use arbitrary pixel margins or paddings (`margin: 13px`, `padding: 27px`). Every single dimension must snap to the fixed 8-point geometric scale (with 4px half-steps for micro-elements):

| Token | Dimension | Strict Application |
|---|---|---|
| `space-1` | `4px` | Badge internal padding, hairline gaps between micro-icons and labels. |
| `space-2` | `8px` | Gap between tight toolbar controls, table cell vertical padding in dense mode, input internal vertical padding. |
| `space-3` | `12px` | Standard table cell vertical padding, button horizontal padding, card header gap. |
| `space-4` | `16px` | Standard table cell horizontal padding, card body padding, gap between adjacent form fields. |
| `space-5` | `20px` | Medium card internal padding, gap between section headers and data grids. |
| `space-6` | `24px` | Macro container gap, KPI ribbon gap, modal dialog internal padding. |
| `space-8` | `32px` | Gap between distinct functional sections on an executive page. |
| `space-12` | `48px` | Maximum page container vertical margin (hero banner to first section). |

### B. Layout Bounds & Container Max-Widths
Dense enterprise dispatch software must never float unbounded across ultra-wide monitors (e.g. 34-inch 4K displays), causing eye-tracking fatigue across 3,000 pixels.
- **Global App Shell Max Width**: `max-w-[1600px]` (or `100rem`) centered with auto margins `mx-auto` and `px-4 sm:px-6 lg:px-8`.
- **Focused Inspection / Form Views**: `max-w-4xl` (`56rem` / `896px`) to ensure ergonomic single-column or 2-column scanning.
- **Print Layouts**: Strict A4 bounding (`210mm` width, `20mm` print margins).

### C. Vertical Rhythm & The 60-30-10 Layout Rule
Maintain clear visual weight distribution:
- **60% Primary Content Canvas**: Data tables, Kanban lanes, roster matrices (neutral slate `#F8FAFC` to pure white `#FFFFFF`).
- **30% Structural Frame**: Top navigation bar, sticky filter toolbars, summary footers, sidebar.
- **10% High-Priority Action & Focal Points**: Primary action buttons (`#2563EB`), urgent exception alerts (`#DC2626`), live status tags.

### D. Density Mode Metrics

| Dimension | Ultra-Dense (Audit/Ledger) | Standard (Default Pipeline) | Comfortable (Executive Modal) |
|---|---|---|---|
| Table Row Height | `32px` | `40px` | `48px` |
| Table Cell Padding | `px-3 py-1.5` | `px-4 py-2.5` | `px-5 py-3.5` |
| Form Input Height | `32px` (`h-8 text-xs`) | `38px` (`h-9.5 text-sm`) | `44px` (`h-11 text-base`) |
| Card Padding | `p-3` | `p-5` | `p-6` |
| Metric Font Size | `18px` (`font-bold`) | `24px` (`font-bold`) | `30px` (`font-extrabold`) |

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't use generic AI-template mega-cards with massive 32px padding and 20px blur shadows** that push the actual 121 station dispatches below the fold.
- **Don't create staggered uneven grid rows** where one KPI card is 180px tall and adjacent cards are 120px tall due to variable subtext.
- **Don't stack 5 different floating cards with random margins** (`mt-3`, `mb-7`, `p-5`) in the Dispatch Pipeline view.

### Do:
- **Do lock the 5 Macro KPI segments into a unified, single-height bar** (`h-24` or `grid grid-cols-5 divide-x divide-slate-200 border border-slate-200 rounded-lg bg-white`).
- **Do align all table toolbar search inputs, status dropdowns, and export triggers to an identical 38px baseline height** (`h-9.5`).
- **Do anchor the pipeline viewport so the summary footer sits directly at the bottom of the table** with `sticky bottom-0 bg-slate-50 border-t border-slate-300 shadow-sm`.

---

## 4. Correct-Pattern Code Snippet (FastAPI / Vanilla JS / Tailwind)

```html
<!-- AUTHORITATIVE ENTERPRISE PAGE SHELL -->
<div class="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
  <!-- Sticky Operational Header (56px) -->
  <header class="sticky top-0 z-40 h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
    <div class="flex items-center space-x-3">
      <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
        Event 17
      </span>
      <h1 class="text-base font-bold text-slate-900 tracking-tight">Umang Utsav 2026 — Consignment Pipeline</h1>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-xs text-slate-500 font-mono">121 Stations | 242,546 Collaterals</span>
    </div>
  </header>

  <!-- Centered Content Bounding (Max 1600px) -->
  <main class="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col space-y-4">
    
    <!-- 5-Segment Unified Macro Metric Strip (Zero Card Stagger) -->
    <div class="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden">
      <!-- Segment 1: Total Volume -->
      <div class="p-3.5 flex flex-col justify-between">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Required</span>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-xl font-bold font-mono text-slate-900">242,546</span>
          <span class="text-2xs text-slate-400 font-mono">121 Stns</span>
        </div>
      </div>
      <!-- Segment 2: Packed Ready -->
      <div class="p-3.5 flex flex-col justify-between">
        <span class="text-xs font-medium text-blue-600 uppercase tracking-wider">Packed (Ready)</span>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-xl font-bold font-mono text-blue-700">62,800</span>
          <span class="text-2xs text-blue-500 font-mono">25.9%</span>
        </div>
      </div>
      <!-- Segment 3: In Transit -->
      <div class="p-3.5 flex flex-col justify-between">
        <span class="text-xs font-medium text-amber-600 uppercase tracking-wider">In Transit</span>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-xl font-bold font-mono text-amber-700">114,200</span>
          <span class="text-2xs text-amber-500 font-mono">47.1%</span>
        </div>
      </div>
      <!-- Segment 4: Physical Delivery -->
      <div class="p-3.5 flex flex-col justify-between">
        <span class="text-xs font-medium text-emerald-600 uppercase tracking-wider">Courier Delivered</span>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-xl font-bold font-mono text-emerald-700">54,546</span>
          <span class="text-2xs text-emerald-500 font-mono">22.5%</span>
        </div>
      </div>
      <!-- Segment 5: Station Confirmed -->
      <div class="p-3.5 flex flex-col justify-between">
        <span class="text-xs font-medium text-indigo-600 uppercase tracking-wider">SPOC Confirmed</span>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-xl font-bold font-mono text-indigo-700">11,000</span>
          <span class="text-2xs text-indigo-500 font-mono">4.5%</span>
        </div>
      </div>
    </div>

    <!-- Main Tabular Surface -->
    <div class="flex-1 bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden flex flex-col">
      <!-- Standardized 38px Filter Header -->
      <div class="p-2.5 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center space-x-2 flex-1 max-w-md">
          <input type="search" placeholder="Filter by station, city, SPOC, tracking #..." 
                 class="h-9 w-full px-3 text-xs bg-white border border-slate-300 rounded-md shadow-2xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="flex items-center space-x-2">
          <!-- Action Buttons with strict 36px height -->
          <button class="h-9 px-3 text-xs font-medium bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 shadow-2xs">
            Export CSV
          </button>
        </div>
      </div>
      
      <!-- Scrollable Data Table Container with sticky header -->
      <div class="flex-1 overflow-auto max-h-[calc(100vh-280px)]">
        <!-- Table rows go here -->
      </div>
    </div>
  </main>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | How to Detect in DOM / CSS | Senior Architectural Fix |
|---|---|---|---|
| **AI Card Stagger** | Individual cards have different heights because subtext or buttons wrap inconsistently. | Inspect `.card` elements in grid; compare `clientHeight` across siblings. | Wrap in `divide-x` strip or use `flex flex-col justify-between h-full` with fixed vertical heights. |
| **Pill Overuse** | Every text snippet, date, city, and number is wrapped in an individual rounded pill badge. | DOM search for `rounded-full` > 10 occurrences per row. | Reserve pills for **status only**. Use plain slate text with font-mono weights for metrics and metadata. |
| **Floaty Whitespace** | 48px padding around simple tables, requiring 3 screen scrolls to view 10 records. | Table container has `p-8` or `py-10`; row height > 64px. | Clamp table cell padding to `px-4 py-2.5`; remove redundant container outer paddings. |
| **Unbounded Canvas** | Content stretches across 2560px on high-res monitors with 1000px empty spaces. | Body/main container lacks `max-w-*` class. | Add `max-w-[1600px] mx-auto w-full`. |

---

## 6. Self-Check Verification Checklist

- [ ] All margins and paddings are multiples of `4px` or `8px`.
- [ ] No arbitrary pixel values in style tags (`padding: 17px`, `top: 19px`).
- [ ] Global content bounded to `max-w-[1600px]` with center auto-margins.
- [ ] KPI cards use a uniform, synchronized height with zero vertical staggering.
- [ ] Table row height is constrained between `32px` (dense) and `42px` (standard).
- [ ] Filter toolbar controls share an exact `36px`–`38px` baseline height.
- [ ] Page elements respect the 60-30-10 visual weight balance (zero garish full-width neon banners).
