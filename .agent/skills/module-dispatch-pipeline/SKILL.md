---
name: module-dispatch-pipeline
description: Module-specific implementation skill for the Consignment Dispatch Pipeline, dual Kanban/Table views, 5-segment macro KPI ribbon, 2-tier button hierarchy, and courier/physical confirmation decoupling.
---

# Module Skill: Consignment Dispatch Pipeline (Kanban & Tabular Grid)

This skill governs the architecture, data flow, component layout, and operational state transitions of the Consignment Dispatch Pipeline (`/dispatch`). It resolves visual clutter in Kanban lanes, eliminates misaligned table cells, and ensures rigorous decoupling between Courier Delivery and Station SPOC Physical Confirmation.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or styling the Dispatch Pipeline page (`/dispatch`).
- Working on the dual view switch (Kanban Board vs Tabular Grid).
- Implementing consignment state transitions (`Mark Packed`, `Mark In-Transit`, `Mark Delivered`, `Confirm Physical Count`).
- Styling the 5-Segment Macro KPI ribbon or table summary `<tfoot>`.
- Resolving the "board section looks messy" or "table section still need to update too much" defects.

---

## 2. Module Specifications & Layout Architecture

### A. Dual-View Operational Model
Operators need two viewing modes depending on their workflow:
1. **Kanban Board View**: Best for warehouse visual staging across 4 operational lanes:
   - Lane 1: **PACKED (READY)** — 31 consignments boxed in central hub awaiting pickup.
   - Lane 2: **IN TRANSIT** — 58 consignments moving with couriers.
   - Lane 3: **COURIER DELIVERED** — 21 consignments arrived at station gate, awaiting physical count sign-off.
   - Lane 4: **STATION CONFIRMED** — 11 consignments physically unboxed, audited, and verified by SPOC.
2. **Tabular Ledger View**: Best for high-velocity batch scanning, column filtering, sorting, and exporting all 121 station dispatches.

### B. The 5-Segment Macro KPI Ribbon
A single, unified, full-width segmented ribbon anchored at the top:
- Segment 1: **Total Volume**: `242,546 Collaterals` (121 Stations)
- Segment 2: **Packed Ready**: `62,800` (25.9%)
- Segment 3: **In Transit**: `114,200` (47.1%)
- Segment 4: **Courier Delivered**: `54,546` (22.5%)
- Segment 5: **SPOC Confirmed**: `11,000` (4.5%)

### C. 2-Tier Button Hierarchy in In-Transit / Delivered Lanes
Never clutter cards with 5 conflicting buttons:
- **Primary Tier (High-Contrast Solid Action)**:
  - In Lane 2 (In Transit): `[Mark Delivered]` &rarr; Opens delivery confirmation modal (Carrier receipt, received date, receiver name).
  - In Lane 3 (Delivered): `[Confirm Physical Count]` &rarr; Opens verification modal (Badges count verified, discrepancies recorded).
- **Secondary Tier (Hairline Outline / Icon)**:
  - `[Call SPOC]` (via `tel:`)
  - `[View AWB]` (links directly to courier tracking portal)
  - `[Print Label]`

---

## 3. Real Project Do's and Don't (Umang Utsav 2026)

### Don't:
- **Don't wipe an in-transit consignment directly into "Completed" when courier marks delivered**. It must stay in Lane 3 until the station SPOC physically counts badges and clicks `Confirm Physical Count`.
- **Don't display massive, unstructured Kanban cards with 8 lines of unstructured text**, pushing cards beyond the viewport.
- **Don't leave table columns unaligned** (e.g. left-aligning collateral counts above each other).
- **Don't drop the summary totals `<tfoot>`** when filtering by wave or status.

### Do:
- **Do provide an explicit view toggle button group** (`[ ▦ Kanban Board ] [ ☰ Tabular Table ]`) with state persisted in `localStorage`.
- **Do stick the table header (`sticky top-0 bg-slate-100 z-10`)** and table summary footer (`sticky bottom-0 bg-slate-50 border-t-2 border-slate-300`).
- **Do display courier tracking AWB as a clickable monospace link** (`Bluedart #39482019482 &nearr;`).
- **Do prompt for Delivery Date & Receiver Name** in a focused modal when clicking `Mark Delivered`.

---

## 4. Correct-Pattern Code Snippet (HTML / Vanilla JS)

```html
<!-- AUTHORITATIVE DISPATCH TABLE ROW WITH 2-TIER ACTIONS & DECOUPLED DELIVERY -->
<tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-200 text-xs">
  
  <!-- Station Code & Wave -->
  <td class="px-3.5 py-2.5 font-mono font-bold text-slate-800 text-left">
    STN-017-042
    <span class="block text-3xs font-normal text-slate-500">Wave 2 &bull; 4 Boxes</span>
  </td>

  <!-- Station Name & City -->
  <td class="px-3.5 py-2.5 text-left">
    <div class="font-bold text-slate-900 text-sm">Kanpur Central Arena</div>
    <div class="text-2xs text-slate-500">Gate 4, Civil Lines, Kanpur</div>
  </td>

  <!-- SPOC & Phone Link -->
  <td class="px-3.5 py-2.5 text-left">
    <div class="text-slate-800 font-medium">Rajesh Sharma</div>
    <a href="tel:+919876543210" class="text-blue-600 hover:underline font-mono text-2xs flex items-center space-x-1">
      <span>+91 98765 43210</span>
    </a>
  </td>

  <!-- Courier Tracking AWB -->
  <td class="px-3.5 py-2.5 text-left">
    <div class="text-2xs text-slate-500 font-medium uppercase">Bluedart Express</div>
    <a href="https://www.bluedart.com/tracking?awb=39482019482" target="_blank" rel="noopener noreferrer" 
       class="font-mono text-xs text-blue-700 hover:underline flex items-center space-x-1">
      <span>39482019482</span>
      <svg class="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    </a>
  </td>

  <!-- Status: Decoupled 3-part badge -->
  <td class="px-3.5 py-2.5 text-center">
    <span class="inline-flex items-center px-2 py-0.5 rounded text-2xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
      IN TRANSIT
    </span>
  </td>

  <!-- Badges: Tabular Right-Aligned -->
  <td class="px-3.5 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">1,200</td>

  <!-- Food Coupons: Tabular Right-Aligned -->
  <td class="px-3.5 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">1,200</td>

  <!-- Total Collaterals: Bold Tabular Right-Aligned -->
  <td class="px-3.5 py-2.5 text-right font-mono font-bold text-slate-950 tabular-nums">2,520</td>

  <!-- 2-Tier Action Controls -->
  <td class="px-3.5 py-2.5 text-center">
    <div class="flex items-center justify-center space-x-1.5">
      <!-- Primary Tier: Mark Delivered Modal Trigger -->
      <button onclick="openDeliveryModal('STN-017-042', 'Kanpur Central Arena')" 
              class="h-7 px-2 text-2xs font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700 shadow-2xs transition-colors">
        Mark Delivered
      </button>
      
      <!-- Secondary Tier: View Slip -->
      <button onclick="openDispatchSlip('STN-017-042')" 
              class="h-7 px-2 text-2xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors">
        Slip
      </button>
    </div>
  </td>
</tr>
```

```javascript
/**
 * Delivery Confirmation Modal Controller.
 * Prompts for receiver details and updates status to DELIVERED (Awaiting SPOC Count).
 */
function openDeliveryModal(stationCode, stationName) {
  const modalHtml = `
    <div id="delivery-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div class="bg-white border border-slate-200 rounded-lg p-5 max-w-md w-full shadow-2xl space-y-4">
        <div>
          <h3 class="text-sm font-bold text-slate-900">Confirm Courier Delivery</h3>
          <p class="text-xs text-slate-500 mt-0.5">${stationCode} &bull; ${stationName}</p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Delivered On Date & Time</label>
            <input type="datetime-local" id="delivery-timestamp" value="${new Date().toISOString().slice(0,16)}" 
                   class="w-full h-8 px-2.5 border border-slate-300 rounded text-xs">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Received By (SPOC / Security)</label>
            <input type="text" id="delivery-receiver" placeholder="e.g. Rajesh Sharma (SPOC)" 
                   class="w-full h-8 px-2.5 border border-slate-300 rounded text-xs">
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Total Boxes Handed Over</label>
            <input type="number" id="delivery-box-count" value="4" 
                   class="w-full h-8 px-2.5 border border-slate-300 rounded font-mono text-xs">
          </div>
        </div>

        <div class="p-2.5 bg-blue-50 border border-blue-200 rounded text-2xs text-blue-900">
          <strong>Notice:</strong> This marks courier transit as complete. Consignment will move to Lane 3 until SPOC verifies physical badge counts.
        </div>

        <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button onclick="document.getElementById('delivery-modal').remove()" 
                  class="h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">
            Cancel
          </button>
          <button onclick="commitDelivery('${stationCode}')" 
                  class="h-8 px-3.5 text-xs font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700 shadow-2xs">
            Confirm Delivery
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Disappearing Delivered Items** | Consignments marked delivered vanish from the screen or jump to an unrelated completed archive. | Click "Mark Delivered" on a row; trace resulting lane. | Keep item visible in Lane 3 / Tab "Delivered" with badge `DELIVERED (PENDING SIGN-OFF)`. |
| **Messy Kanban Cards** | Kanban lanes have 500px tall cards with 10 conflicting buttons and overlapping text. | Visual inspection of Kanban view; cards exceed 180px height. | Standardize card height: Header (Code + Wave), Badges count, AWB link, 1 Primary Action button. |
| **Unsorted Numeric Columns** | Clicking table column headers does not sort numbers properly (e.g. `10, 100, 2`). | Sort by Total Collaterals; observe order. | Parse as integers `parseInt(val.replace(/,/g, ''), 10)` before sorting. |
| **Missing Totals Footer** | Filtering the table updates rows but table footer totals remain static or vanish. | Filter table by "Wave 2"; check footer total. | Bind `<tfoot>` sums dynamically to `renderTable(filteredData)`. |

---

## 6. Self-Check Verification Checklist

- [ ] Dual-view toggle switches seamlessly between Kanban and Tabular views.
- [ ] 5-Segment Macro KPI ribbon summarizes volume, packing, transit, delivery, and sign-offs.
- [ ] Courier `DELIVERED` status is decoupled from station `SPOC CONFIRMED` sign-off.
- [ ] Action buttons follow a strict 2-tier hierarchy (one primary action per state).
- [ ] Table headers and summary footer totals are sticky during scrolling.
- [ ] Number columns are right-aligned with tabular monospace font (`tabular-nums font-mono`).
- [ ] Clicking "Mark Delivered" launches modal capturing delivery timestamp, receiver, and box count.
