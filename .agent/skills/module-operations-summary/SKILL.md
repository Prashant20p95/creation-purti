---
name: module-operations-summary
description: Module-specific implementation skill for the Operations Summary Briefing, 1,815-cell audit matrix, 100% mathematical parity verification, and freeze-pane table architecture.
---

# Module Skill: Operations Summary Briefing & Audit Matrix

This skill governs the architecture, data verification, mathematical parity checks, and high-density rendering of the Operations Summary Briefing (`/summary` and executive audit modals). It ensures that the 1,815-cell operational matrix renders smoothly, provides freeze-pane scrolling, and enforces 100% mathematical consistency across all collateral categories.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or optimizing the Operations Summary Briefing modal or standalone view.
- Auditing the 1,815-cell collateral distribution matrix (121 stations $\times$ 15 operational attributes).
- Verifying mathematical parity between badges, food coupons, lanyards, and vehicle passes.
- Implementing freeze-pane column locking (`sticky left-0` station names, `sticky top-0` column headers).
- Building weekly wave deployment audit tabs (W1–W4).

---

## 2. Module Specifications & Mathematical Parity Rules

### A. The 100% Mathematical Parity Invariant
In logistics operations, discrepancy between registered passes and dispatched collaterals is unacceptable. The Operations Summary matrix must enforce exact mathematical proofs across every column footer:
- **Sum(Badges)**: Must equal exactly `1,13,700`
- **Sum(Food Coupons)**: Must equal exactly `1,13,700` ($\Delta = 0$ with Badges)
- **Sum(VIP Lanyards)**: Must equal exactly `11,370` ($10\%$ of Badges)
- **Sum(Vehicle Passes)**: Must equal exactly `3,776`
- **Sum(Total Collaterals)**: Must equal exactly `2,42,546`
- **Sum(Carton Boxes)**: Must equal sum of individual box allocations across all 121 stations.

If any manual override or missing station creates a deficit ($\Delta \ne 0$), the matrix header and footer must display a prominent crimson **PARITY DEFICIT ALERT**.

### B. High-Density Freeze-Pane Matrix Architecture
With 15 columns and 121 rows (1,815 cells), the matrix requires dual-axis freeze panes:
1. **Vertical Freeze**: Table header row is `sticky top-0 z-20 bg-slate-100`.
2. **Horizontal Freeze**: First two columns (Station Code & Station Name) are `sticky left-0 z-10 bg-white` with a hairline right border shadow (`border-r border-slate-300`).
3. **Intersection Freeze**: Top-left header cell is `sticky top-0 left-0 z-30 bg-slate-200`.

### C. Weekly Wave Breakdown Tabs
Operators must be able to filter the audit matrix by wave without losing context:
- Tab 1: **Master Matrix (All 121 Stations)** — Total: 2,42,546
- Tab 2: **Wave 1 (30 Stations)** — Deployment: 10–14 Oct
- Tab 3: **Wave 2 (35 Stations)** — Deployment: 15–19 Oct
- Tab 4: **Wave 3 (32 Stations)** — Deployment: 20–24 Oct
- Tab 5: **Wave 4 (24 Stations)** — Deployment: 25–29 Oct

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't allow the matrix to horizontally scroll off the station names**, forcing the user to guess which station belongs to row 78.
- **Don't calculate totals using client-side string concatenation** (`"100" + "200"` &rarr; `"100200"`). Always parse as integers.
- **Don't allow the summary modal to stretch beyond the browser window** without its own internal scroll container.
- **Don't render the 1,815 cells with heavy reactive listeners on every cell**; use passive tabular text for maximum rendering speed.

### Do:
- **Do lock the station name column to the left** with `sticky left-0 shadow-xs`.
- **Do format all numeric cells in right-aligned monospace (`tabular-nums font-mono`)**.
- **Do highlight any parity discrepancy with an immediate alert badge**.
- **Do provide a 1-click `[Export Audit Matrix CSV]` button** for external auditing.

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind CSS)

```html
<!-- AUTHORITATIVE 1,815-CELL FREEZE-PANE AUDIT MATRIX CONTAINER -->
<div class="relative bg-white border border-slate-300 rounded-lg shadow-sm flex flex-col max-h-[85vh] font-sans">
  
  <!-- Header & Parity Check Ribbon -->
  <div class="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
    <div class="flex items-center space-x-3">
      <span class="text-xs font-bold text-slate-900 uppercase tracking-wider">Event 17 Collateral Audit Matrix</span>
      <span class="px-2 py-0.5 rounded text-2xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
        PARITY: 100% BALANCED
      </span>
    </div>
    <div class="flex items-center space-x-2">
      <span class="text-2xs text-slate-500 font-mono">121 Stations &bull; 2,42,546 Items</span>
      <button class="h-7 px-2.5 text-2xs font-semibold bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 shadow-2xs">
        Export Matrix CSV
      </button>
    </div>
  </div>

  <!-- Scrollable Matrix Viewport with Dual Sticky Axes -->
  <div class="flex-1 overflow-auto">
    <table class="w-full text-left border-collapse text-2xs">
      
      <!-- Sticky Header -->
      <thead class="sticky top-0 z-20 bg-slate-100 border-b border-slate-300 font-bold uppercase tracking-wider text-slate-600">
        <tr>
          <!-- Sticky Corner Cell -->
          <th class="sticky left-0 z-30 bg-slate-200 px-3 py-2 border-r border-slate-300 w-28">
            Station Code
          </th>
          <th class="sticky left-28 z-30 bg-slate-200 px-3 py-2 border-r border-slate-300 w-48">
            Venue Name
          </th>
          <th class="px-3 py-2 text-center">Wave</th>
          <th class="px-3 py-2 text-right">Badges</th>
          <th class="px-3 py-2 text-right">Coupons</th>
          <th class="px-3 py-2 text-right">Lanyards</th>
          <th class="px-3 py-2 text-right">Passes</th>
          <th class="px-3 py-2 text-right">Total Items</th>
          <th class="px-3 py-2 text-right">Boxes</th>
          <th class="px-3 py-2 text-center">Courier Status</th>
        </tr>
      </thead>

      <!-- Matrix Rows -->
      <tbody class="divide-y divide-slate-100 bg-white">
        <tr class="hover:bg-blue-50/50">
          <!-- Sticky Column 1 -->
          <td class="sticky left-0 z-10 bg-white hover:bg-blue-50/50 px-3 py-2 font-mono font-bold text-slate-900 border-r border-slate-200">
            STN-017-042
          </td>
          <!-- Sticky Column 2 -->
          <td class="sticky left-28 z-10 bg-white hover:bg-blue-50/50 px-3 py-2 font-medium text-slate-800 border-r border-slate-200">
            Kanpur Central Arena
          </td>
          <td class="px-3 py-2 text-center font-mono">W2</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">1,200</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">1,200</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">120</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">40</td>
          <td class="px-3 py-2 text-right font-mono font-bold tabular-nums">2,560</td>
          <td class="px-3 py-2 text-right font-mono font-bold tabular-nums">4</td>
          <td class="px-3 py-2 text-center">
            <span class="px-1.5 py-0.5 rounded text-3xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              IN TRANSIT
            </span>
          </td>
        </tr>
      </tbody>

      <!-- Sticky Summary Footer (100% Parity Verified) -->
      <tfoot class="sticky bottom-0 z-20 bg-slate-200 border-t-2 border-slate-400 font-bold text-slate-950">
        <tr>
          <td class="sticky left-0 z-30 bg-slate-300 px-3 py-2 border-r border-slate-400">
            TOTALS (121 STNS)
          </td>
          <td class="sticky left-28 z-30 bg-slate-300 px-3 py-2 border-r border-slate-400">
            100% RECONCILED
          </td>
          <td class="px-3 py-2 text-center font-mono">W1–W4</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">1,13,700</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">1,13,700</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">11,370</td>
          <td class="px-3 py-2 text-right font-mono tabular-nums">3,776</td>
          <td class="px-3 py-2 text-right font-mono font-black tabular-nums">2,42,546</td>
          <td class="px-3 py-2 text-right font-mono font-black tabular-nums">384</td>
          <td class="px-3 py-2 text-center font-mono text-3xs text-emerald-800">PARITY OK</td>
        </tr>
      </tfoot>

    </table>
  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Station Column Scrolls Off** | Scrolling right hides Station Code and Name, making row data unidentifiable. | Scroll table horizontally; check if station names vanish. | Add `sticky left-0 z-10 bg-white border-r border-slate-200` to column 1 & 2. |
| **Parity Discrepancy Ignored** | Badges sum to 113,700 but Coupons sum to 112,500 with no warning. | Compute `Math.abs(badgesTotal - couponsTotal)`. | If delta > 0, trigger prominent crimson warning banner across modal top. |
| **Laggy Scrolling** | High CPU usage when scrolling through the 1,815 cells. | Inspect DOM tree for nested components or expensive shadow/blur styles. | Use simple, flat CSS utility classes (`text-2xs font-mono`); remove blurs and transforms. |
| **Unanchored Footers** | Totals row only appears after scrolling down 121 rows. | Inspect table footer; verify if totals are always visible. | Make `<tfoot>` element `sticky bottom-0 z-20 bg-slate-200`. |

---

## 6. Self-Check Verification Checklist

- [ ] Table headers (`sticky top-0`) and summary footers (`sticky bottom-0`) remain anchored during scroll.
- [ ] Station Code and Name columns (`sticky left-0`) remain visible during horizontal scroll.
- [ ] Column totals enforce 100% mathematical parity (Badges = Coupons = 1,13,700; Total = 2,42,546).
- [ ] Parity discrepancies immediately trigger high-contrast warning alerts.
- [ ] All numeric cells are right-aligned with monospace formatting (`tabular-nums font-mono`).
- [ ] Weekly wave filtering tabs dynamically isolate subsets (W1–W4) while maintaining math accuracy.
