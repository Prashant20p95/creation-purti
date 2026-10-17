---
name: data-table-architecture
description: >-
  Enterprise Data Table & Financial Ledger Architecture. Use when designing, building, or
  refactoring high-density tabular manifests, sticky header tables, column alignments,
  and summary totals rows.
---

# Enterprise Data Table Architecture

This skill defines the engineering and design rules for building world-class, dense business tables that handle hundreds of consignments with zero lag and perfect arithmetic clarity.

---

## 1. When to Trigger
- When designing or modifying tabular manifests (`renderDispatchTableRows()`, `renderStationTableRows()`).
- When columns, headers, pagination, or summary rows (`<tfoot>`) are added, adjusted, or styled.

---

## 2. Core Principles with Exact Values

1. **Alignment by Data Type**:
   - Text & Entity Names: Left-aligned (`text-align: left`).
   - Quantities, Quotas, Pass Counts: Strictly right-aligned (`text-align: right; font-family: var(--mono-font);`).
   - Status Badges & Short Tags: Centered (`text-align: center`) or left-aligned with fixed min-width.
   - Action Buttons: Right-aligned (`text-align: right`).
2. **Padding & Density**:
   - Vertical padding: `10px` per row (compact but breathable).
   - Horizontal padding: `14px` between cell boundaries.
   - Minimum cell border: `1px solid #F1F5F9` (inner subtle hairlines) to guide horizontal scanning.
3. **Sticky Column Headers**:
   - `position: sticky; top: 0; z-index: 10; background: #FFFFFF; border-bottom: 2px solid #CBD5E1;`
   - Headers use uppercase 11px bold text (`font-size: 11px; font-weight: 750; color: #475569;`).
4. **Summary Footer Row (`<tfoot>`)**:
   - Must calculate live arithmetic totals across all filtered rows in real time.
   - Distinct styling: `border-top: 2px solid #CBD5E1; background: #F8FAFC; font-weight: 750;`.

---

## 3. Do and Don't Examples (Using Real Tool Content)

- **DO**:
  ```html
  <tr>
    <td class="num-cell" style="text-align:center;">01</td>
    <td><span class="card-pill-tag pill-neutral">UP</span></td>
    <td>
      <div style="font-weight:700; color:#0F172A;">Agra Cantt Station</div>
      <div style="font-size:11px; color:#64748B;">Agra District</div>
    </td>
    <td style="text-align:right; font-family:var(--mono-font); font-weight:800;">1,500</td>
    <td style="text-align:right; font-family:var(--mono-font);">50</td>
    <td style="text-align:right; font-family:var(--mono-font);">20</td>
    <td style="text-align:right; font-family:var(--mono-font);">1,570</td>
    <td style="text-align:center; font-family:var(--mono-font); font-weight:700;">1 Box</td>
    <td>${formatDispatchStatusCell(d, dest)}</td>
  </tr>
  ```
- **DON'T**:
  ```html
  <!-- Centered numbers, missing font-family, no subtext hierarchy -->
  <tr>
    <td style="text-align:center;">Agra Cantt Station</td>
    <td style="text-align:center;">1500</td> <!-- NEVER center numeric counts -->
    <td style="text-align:center;">50</td>
    <td>Delivered</td> <!-- Vague plain text without semantic badge -->
  </tr>
  ```

---

## 4. Correct Implementation Pattern (FastAPI / Vanilla JS)

```javascript
function renderDispatchTableFooter(filteredList) {
  let sumCoupon = 0, sumDelight = 0, sumDalmia = 0, sumLanyards = 0, sumBoxes = 0, deliveredCount = 0;
  
  filteredList.forEach(d => {
    const qties = getDispatchQuantities(d);
    sumCoupon += (qties.coupon || 0);
    sumDelight += (qties.delight || 0);
    sumDalmia += (qties.dalmia || 0);
    sumLanyards += (qties.lanyards || 0);
    sumBoxes += parseInt(d.box_count) || 1;
    if (d.courier_status === 'DELIVERED') deliveredCount++;
  });
  
  const pct = filteredList.length ? Math.round((deliveredCount / filteredList.length) * 100) : 0;

  return `
    <tr class="tfoot-summary-row">
      <td colspan="4" style="font-weight:750; color:#0F172A;">
        Summary Totals (${filteredList.length} Consignments · ${deliveredCount} Delivered · ${pct}%)
      </td>
      <td style="text-align:right; font-family:var(--mono-font); font-weight:800;">${formatNumber(sumCoupon)}</td>
      <td style="text-align:right; font-family:var(--mono-font);">${formatNumber(sumDelight)}</td>
      <td style="text-align:right; font-family:var(--mono-font);">${formatNumber(sumDalmia)}</td>
      <td style="text-align:right; font-family:var(--mono-font);">${formatNumber(sumLanyards)}</td>
      <td style="text-align:center; font-family:var(--mono-font);">${sumBoxes} Boxes</td>
      <td colspan="4" style="color:#64748B; font-size:11px;">Verified Arithmetic Parity across Fleet</td>
    </tr>
  `;
}
```

---

## 5. Common Mistakes & Detection Guide
- **Drifting Digits**: Numbers rendered in non-monospace fonts cause column digits to misalign. *Fix*: Add `font-family: var(--mono-font); font-variant-numeric: tabular-nums;`.
- **Squished Cells**: Columns wrap text into 4 awkward vertical lines on 1366px screens. *Fix*: Set explicit `min-width: 140px;` on station names and `min-width: 160px;` on SPOC cells.
- **Ignoring Filters in Summary**: Footer totals calculating all 122 rows when only 5 rows are filtered. *Fix*: Always pass `filteredList` to `renderDispatchTableFooter()`.

---

## 6. Self-Check List
- [ ] Are all numeric columns strictly right-aligned with monospace font?
- [ ] Are headers sticky when scrolling through long manifests?
- [ ] Does the summary footer update dynamically when filters change?
- [ ] Do docket numbers have 1-click copy buttons?
- [ ] Do SPOC cells include direct phone links and WhatsApp action buttons?

---

## 7. Related Links
- Research: [research-C-components-patterns.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/research-C-components-patterns.md)
- Module: [02-dispatch-pipeline.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/02-dispatch-pipeline.md)
