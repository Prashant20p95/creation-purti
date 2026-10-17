---
name: module-labels-and-printing
description: Module-specific implementation skill for the Stationery & Box Label Printing Module, WYSIWYG preview engine, multi-box carton serialization, and thermal shipping label rendering.
---

# Module Skill: Stationery & Box Label Printing (`/labels`)

This skill governs the architecture, layout engine, WYSIWYG preview canvas, and print stylesheets for the Stationery and Box Label Printing module (`/labels`). It ensures error-free physical carton labeling for all 121 stations, precise multi-box serialization ("Box 1 of 4"), crisp barcode generation, and compliance with thermal courier standards.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or optimizing the label printing interface (`/labels`).
- Generating multi-box labels for consignments requiring multiple cartons.
- Configuring print layouts (Thermal 4x6 inch vs A4 Sheet 2-up/4-up).
- Debugging barcode legibility, margin clipping, or print CSS media queries.
- Designing carton collateral content breakdown slips.

---

## 2. Module Specifications & Layout Architecture

### A. Dual Printing Modes
1. **Thermal Shipping Label (4x6 in / 100x150 mm)**:
   - Dedicated industrial roll format for sticky courier labels.
   - 1 label per physical box carton with large `BOX X OF Y` header.
   - Code 128 / QR barcode with human-readable tracking number below.
2. **A4 Courier Manifest & Gate Pass**:
   - Standard 210x297mm office laser format.
   - Station dossier summary, SPOC signature block, carrier handover receipt.

### B. The Carton Serialization Engine
When a station receives 1,200 badges and 1,200 food coupons across 4 boxes, the system must generate 4 distinct serialized labels:
- **Box 1 of 4**: Badges 0001–0500 (500 pcs) + Coupons 0001–0500 (500 pcs)
- **Box 2 of 4**: Badges 0501–1000 (500 pcs) + Coupons 0501–1000 (500 pcs)
- **Box 3 of 4**: Badges 1001–1200 (200 pcs) + Coupons 1001–1200 (200 pcs) + Lanyards (120 pcs)
- **Box 4 of 4**: Vehicle Passes (40 pcs) + Station Stationery Master Kit

### C. Live WYSIWYG Print Preview Canvas
Never send jobs blindly to printers. The `/labels` page must feature:
- An interactive zoomable preview canvas rendering exact pixel dimensions before printing.
- Batch selector: Print All Stations (121), Print by Wave (W1–W4), or Single Station Carton.
- High-contrast pure black and white monochrome styling.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't print a single generic label for a 4-box shipment**; the carrier requires every physical box to have its own serialized label.
- **Don't use low-resolution fuzzy JPEG barcodes**; render barcodes as pure SVG vectors or high-DPI canvas elements.
- **Don't print grey backgrounds or subtle shadows** that consume printer toner and reduce thermal contrast.
- **Don't allow browser headers or footers** (URL, timestamp, page number) to print over shipping address lines.

### Do:
- **Do force solid black typography (`#000000`) and 2px borders** for maximum thermal transfer legibility.
- **Do include a clear sender return address block** (*Umang Central Hub, Gurugram Logistics Park*).
- **Do provide a 1-click `[Print All 121 Labels]` batch button** with a progress meter.
- **Do include `-webkit-print-color-adjust: exact`** to preserve solid black fill bars.

---

## 4. Correct-Pattern Code Snippet (HTML & CSS)

```html
<!-- AUTHORITATIVE WYSIWYG LABEL PREVIEW CANVAS & PRINT ENGINE -->
<div class="space-y-4 font-sans">
  
  <!-- Print Control Toolbar (Screen Only) -->
  <div class="no-print flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
    <div class="flex items-center space-x-3">
      <span class="text-xs font-bold text-slate-700 uppercase tracking-wider">Print Format:</span>
      <select class="h-8 text-xs bg-slate-50 border border-slate-300 rounded px-2">
        <option>4x6 Thermal Sticky Roll (100x150mm)</option>
        <option>A4 Laser Sheet (2 Labels per Page)</option>
      </select>
      <span class="text-xs text-slate-500 font-mono">STN-017-042 (4 Boxes Selected)</span>
    </div>
    
    <div class="flex items-center space-x-2">
      <button onclick="window.print()" class="h-8 px-4 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 shadow-2xs flex items-center space-x-1.5">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
        <span>Print Labels Now</span>
      </button>
    </div>
  </div>

  <!-- Printable Label Container -->
  <div class="printable-label-area flex flex-col items-center gap-6">
    
    <!-- BOX 1 OF 4 LABEL -->
    <div class="print-label w-[400px] h-[580px] bg-white border-2 border-black p-4 flex flex-col justify-between text-black font-sans box-border shadow-md">
      <!-- Label Header -->
      <div class="border-b-2 border-black pb-2 flex justify-between items-center">
        <div>
          <div class="text-3xs font-extrabold uppercase tracking-wider">EVENT 17 &bull; UMANG UTSAV 2026</div>
          <div class="text-lg font-black font-mono tracking-tight">STN-017-042</div>
        </div>
        <div class="border-2 border-black px-2 py-0.5 text-xs font-black font-mono">
          BOX 1 OF 4
        </div>
      </div>

      <!-- Postal Courier Block -->
      <div class="my-2 space-y-1 text-xs">
        <div class="text-3xs font-bold uppercase tracking-wider border-b border-black pb-0.5">DELIVERY DESTINATION:</div>
        <div class="text-sm font-black uppercase">Kanpur Central Arena</div>
        <div class="font-bold">Attn: Rajesh Sharma (Venue SPOC)</div>
        <div class="font-mono font-bold">Tel: +91 98765 43210</div>
        <div class="text-2xs">Gate 4, Civil Lines, Near Mall Road Crossing</div>
        <div class="text-2xs font-semibold">Kanpur, Uttar Pradesh</div>
        <div class="font-mono font-black text-base tracking-widest pt-0.5">PIN: 208 001</div>
      </div>

      <!-- Carton Contents Manifest -->
      <div class="border-t-2 border-black pt-1.5 text-3xs font-mono">
        <div class="font-bold uppercase tracking-wider mb-0.5">THIS CARTON CONTAINS:</div>
        <div class="flex justify-between border-b border-dashed border-black pb-0.5">
          <span>Participant Badges (0001 - 0500):</span>
          <span class="font-bold">500 PCS</span>
        </div>
        <div class="flex justify-between pt-0.5">
          <span>Food Coupons (0001 - 0500):</span>
          <span class="font-bold">500 PCS</span>
        </div>
      </div>

      <!-- Vector Barcode & Courier Tracking -->
      <div class="border-t-2 border-black pt-2 flex flex-col items-center">
        <!-- High-contrast barcode pattern simulation -->
        <div class="w-full h-10 bg-repeat-x flex items-center justify-center font-mono text-2xs tracking-widest border border-black/20">
          ||||| | |||| ||| ||||| || |||||| |||| ||||| ||| ||||
        </div>
        <div class="font-mono font-bold text-xs mt-1 tracking-wider">
          BLUEDART AWB: 39482019482
        </div>
      </div>

      <!-- Sender Return Address -->
      <div class="border-t border-black pt-1 flex justify-between items-center text-3xs">
        <span>SENDER: Central Logistics Hub, Gurugram</span>
        <span>EMERGENCY: +91 11 2345 6789</span>
      </div>
    </div>

  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Omitted Carton Count** | Label says "Kanpur Arena" without stating which carton it is. | Check printed label text; search for "BOX X OF Y". | Enforce dynamic serial calculation: `BOX ${boxNum} OF ${totalBoxes}`. |
| **Pixelated Barcode** | Blurry barcode that fails handheld laser scanner read. | Scan printed label with 2D barcode scanner or phone camera. | Use vector SVG or 300+ DPI canvas generation for Code 128 / QR codes. |
| **Clipped Printable Margins** | Text touches the very edge of the thermal label and gets cut off by printer feed. | Test print on 4x6 thermal printer; inspect outer 4mm. | Add `padding: 12px; box-sizing: border-box;` safety margin to label container. |
| **Screen Elements on Paper** | Buttons or filters print along with the label. | Print preview inspection (`Ctrl+P`). | Tag all toolbars with `.no-print { display: none !important; }`. |

---

## 6. Self-Check Verification Checklist

- [ ] Every individual box carton receives a unique serialized label (`BOX X OF Y`).
- [ ] Shipping address follows the 6-line standard Indian postal courier structure.
- [ ] Destination PIN code and SPOC telephone number are rendered in bold monospace.
- [ ] Barcodes are rendered as crisp vector SVG or high-DPI raster elements.
- [ ] Carton contents breakdown explicitly lists items and serial numbers in that specific box.
- [ ] Screen controls and navigation bars are completely suppressed in print media (`@media print`).
- [ ] All typography forces to pure solid `#000000` for high thermal contrast.
