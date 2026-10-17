---
name: print-and-label-design
description: Physical print stylesheet architecture, 6-line Indian postal address blocks, box label serialization, @media print CSS rules, thermal label dimensions, and barcode legibility.
---

# Print and Box Label Design Architecture

This skill governs the design, layout geometry, typographic rendering, and print stylesheets (`@media print`) for physical warehouse manifests, dispatch box labels, and station courier dossiers. It guarantees zero margin clipping, sharp thermal barcode scanning, and adherence to official Indian postal delivery standards.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or editing box labels, dispatch slips, or shipping manifests.
- Writing or refactoring `@media print` CSS rules or print stylesheets.
- Formatting Indian postal courier addresses (PIN code, SPOC, Landmark).
- Generating multi-box consignments (e.g. "Box 1 of 4", "Box 2 of 4").
- Auditing physical label readability, high-contrast printing, or barcode sizing.

---

## 2. Core Principles & Exact Design Standards

### A. The 6-Line Standard Indian Courier Postal Block
Every physical dispatch label must render the destination address in this strict 6-line hierarchy to ensure carrier couriers (Bluedart, DTDC, Delhivery, India Post) can route without delay:

```
[Line 1] DESTINATION VENUE: Kanpur Central Indoor Stadium
[Line 2] ATTENTION / SPOC:   Rajesh Sharma (Station Coordinator)
[Line 3] SPOC PHONE / ALT:   +91 98765 43210 / +91 98765 11223
[Line 4] STREET & LANDMARK:  Gate 4, Civil Lines, Near Mall Road Crossing
[Line 5] CITY & STATE:       Kanpur, Uttar Pradesh
[Line 6] PIN CODE:           208 001 (INDIA)
```

### B. Standard Physical Label Dimensions
1. **Thermal Shipping Label (Courier Standard)**: `4 x 6 inches` (`101.6mm x 152.4mm`), portrait orientation.
2. **A4 Dispatch Manifest & Gate Pass**: Standard A4 (`210mm x 297mm`), portrait or landscape, with strict `12mm` safety margins.

### C. The Box Serialization Rule
Every physical box carton must display high-visibility serialization:
- Large format box marker: **`BOX 2 OF 4`** in minimum `28pt` bold font.
- Box Collateral Breakdown: Monospace table listing the exact contents of that specific carton (e.g. *Box 1: Badges 001–1000; Box 2: Coupons 001–1000*).

### D. Strict `@media print` CSS Architecture
- **Suppress Screen Chrome**: Hide navigation bars, filter toolbars, action buttons, modals, and status dropdowns (`display: none !important;`).
- **Enforce Background Printing**: `-webkit-print-color-adjust: exact; print-color-adjust: exact;`.
- **Page Break Avoidance**: `break-inside: avoid; page-break-inside: avoid;` on every individual label card or table row group.
- **Pure Black Typography**: Color must force to `#000000` on white paper for maximum contrast and low-cost monochrome laser printing.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't print website navigation headers or "Back to Dashboard" buttons** on physical shipping labels.
- **Don't allow a box label to split across two printed pages** (e.g. header on page 1, address on page 2).
- **Don't use low-contrast light grey borders or pastel text** on printouts; thermal and laser printers will drop the ink.
- **Don't truncate phone numbers or addresses with ellipses (`...`)** on print views.

### Do:
- **Do display the Event Code and Station Code in high-visibility bold monospace** (`EVENT 17: UMG-2026 | STN-017-042`).
- **Do provide a prominent return/origin sender address block** on every label (*"Return to: Umang Central Logistics Hub, Warehouse 4, Delhi NCR"*).
- **Do include a high-contrast Code 128 / QR barcode** with minimum 300 DPI rendering quality.
- **Do provide a dedicated print preview screen** allowing warehouse operators to verify label layout before sending to the thermal printer.

---

## 4. Correct-Pattern Code Snippet (HTML & CSS)

```html
<!-- AUTHORITATIVE 4x6 THERMAL BOX SHIPPING LABEL -->
<div class="print-label-card w-[400px] h-[600px] border-2 border-black p-4 flex flex-col justify-between bg-white text-black font-sans box-border">
  
  <!-- Header: Event & Station Code -->
  <div class="border-b-2 border-black pb-2 flex items-center justify-between">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider">EVENT 17 &bull; UMANG UTSAV 2026</span>
      <h2 class="text-xl font-extrabold font-mono tracking-tight">STN-017-042</h2>
    </div>
    <div class="text-right">
      <span class="inline-block border-2 border-black px-2 py-0.5 text-sm font-black font-mono">
        BOX 1 OF 3
      </span>
    </div>
  </div>

  <!-- Main Body: 6-Line Indian Postal Address -->
  <div class="my-3 flex-1 flex flex-col justify-center space-y-1 text-sm leading-snug">
    <div class="text-2xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1">
      DELIVER TO (STATION VENUE):
    </div>
    <div class="font-black text-base uppercase">Kanpur Central Indoor Stadium</div>
    <div class="font-bold text-sm">Attn: Rajesh Sharma (Venue SPOC)</div>
    <div class="font-mono font-bold text-sm">Phone: +91 98765 43210 / 98765 11223</div>
    <div class="text-xs">Gate 4, Civil Lines, Near Mall Road Crossing</div>
    <div class="text-xs font-semibold">Kanpur, Uttar Pradesh</div>
    <div class="font-mono font-black text-lg tracking-widest pt-1">
      PIN: 208 001
    </div>
  </div>

  <!-- Box Contents Breakdown Table -->
  <div class="border-t-2 border-black pt-2 text-2xs font-mono">
    <div class="font-bold uppercase tracking-wider mb-1">BOX 1 CONTENTS:</div>
    <div class="flex justify-between border-b border-dashed border-black pb-0.5">
      <span>Participant Badges (001 - 1000):</span>
      <span class="font-bold">1,000 PCS</span>
    </div>
    <div class="flex justify-between border-b border-dashed border-black py-0.5">
      <span>Food Coupon Books (001 - 1000):</span>
      <span class="font-bold">1,000 PCS</span>
    </div>
    <div class="flex justify-between pt-0.5">
      <span>VIP Lanyards (Master Pack):</span>
      <span class="font-bold">100 PCS</span>
    </div>
  </div>

  <!-- Footer: Courier Tracking & Return Address -->
  <div class="border-t-2 border-black pt-2 flex items-end justify-between">
    <div class="text-3xs leading-tight">
      <span class="font-bold">SENDER:</span><br>
      Umang Central Warehouse Hub<br>
      Gate 2, Logistics Park, Gurugram<br>
      Phone: +91 11 2345 6789
    </div>
    <div class="text-right font-mono">
      <div class="text-3xs uppercase font-bold text-black">BLUEDART EXPRESS</div>
      <div class="text-xs font-bold tracking-wider">AWB: 39482019482</div>
    </div>
  </div>

</div>

<!-- AUTHORITATIVE PRINT STYLESHEET -->
<style>
@media print {
  /* 1. Global Reset for Print */
  body {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* 2. Suppress Screen Chrome */
  header, nav, aside, footer, 
  .no-print, #navbar, #filter-bar, 
  button, input, select {
    display: none !important;
  }

  /* 3. Page Geometry & Break Protection */
  .print-label-card {
    border: 2px solid #000000 !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin: 0 auto 20mm auto !important;
  }

  @page {
    size: A4 portrait;
    margin: 12mm;
  }
}
</style>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Split Labels Across Pages** | Top half of shipping label is on Page 1; bottom half spills to Page 2. | Open Chrome Print Preview (`Ctrl+P`); check page breaks. | Add `break-inside: avoid; page-break-inside: avoid;` to label container. |
| **Faded Thermal Ink** | Barcodes or text print light gray instead of solid black. | Test print on monochrome printer; check CSS `color`. | Force `color: #000000 !important;` and `-webkit-print-color-adjust: exact;`. |
| **Visible UI Buttons on Paper** | "Export CSV" and "Filter by City" buttons print out on the shipping slip. | Print preview inspection; check for missing `@media print` class. | Add `.no-print { display: none !important; }` to all interactive controls. |
| **Truncated Address Lines** | Pincode or SPOC contact cut off because of `overflow: hidden`. | Inspect print layout with longest station address string. | Remove `overflow: hidden` and `text-overflow: ellipsis` in print stylesheets. |

---

## 6. Self-Check Verification Checklist

- [ ] Print stylesheets suppress all screen navigation, buttons, and filter bars (`.no-print`).
- [ ] Shipping label follows the 6-line standard Indian postal courier structure.
- [ ] Destination PIN code and SPOC phone number are prominent in bold monospace font.
- [ ] Labels have `break-inside: avoid` to prevent mid-label page splits.
- [ ] Box serialization is explicit (`BOX X OF Y`) with individual box contents breakdown.
- [ ] CSS includes `-webkit-print-color-adjust: exact` for crisp border and background printing.
- [ ] Text color forces to solid `#000000` with zero washed-out pastels or grays.
