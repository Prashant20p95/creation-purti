---
name: mobile-and-field-readiness
description: Field operations UX, 44px touch targets, mobile thumb zones, outdoor sunlight legibility, responsive table-to-card transformation, and one-tap dialer ergonomics.
---

# Mobile and Field Operations Readiness Architecture

This skill governs the ergonomics, responsive transformations, touch targets, and outdoor legibility of the application when used on mobile phones and tablets by station receiving SPOCs, venue dock coordinators, and warehouse field pickers.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or auditing mobile (`< 640px`) or tablet (`640px – 1024px`) viewports.
- Building field-facing screens (e.g. Courier Delivery Confirmation, SPOC Box Check-in).
- Converting dense desktop data tables into mobile responsive card lists.
- Adding telephone dialer (`tel:`) or WhatsApp links for venue coordinators.
- Ensuring readability under direct sunlight or warehouse high-bay lighting.

---

## 2. Core Principles & Exact Design Standards

### A. The 44px Touch Target Rule (WCAG 2.5.5)
In field environments (warehouse loading docks, noisy exhibition halls), operators operate phones with one hand, often while walking or holding a clipboard.
- **Minimum Interactive Bounding Box**: `44px x 44px` (`min-h-[44px] min-w-[44px]`).
- Even if a text label or icon is small (e.g. a 16px checkmark), its touch padding must expand to at least 44px to prevent missed taps.

### B. Mobile Thumb Zone Ergonomics
Keep critical primary actions in the bottom 40% of the mobile screen (the "Natural Thumb Zone"):
- Desktop top-right action buttons must transform into a **sticky bottom action bar** on mobile viewports (`fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 z-40`).
- Destructive buttons must require two deliberate taps or a confirmation modal to prevent accidental palm triggers.

### C. Responsive Table-to-Card Transformation
A 10-column desktop data table cannot be comfortably scrolled horizontally on a 390px iPhone screen. At `< 768px` (`md` breakpoint):
- Hide the `<table>` element (`hidden md:table`).
- Render a vertical list of **Structured Station Dossier Cards** (`block md:hidden`).
- Each card displays Station Code, Station Name, Status Badge, SPOC Click-to-Call button, and Collateral counts.

### D. Direct Field Dialing & WhatsApp Integration
Station coordinators frequently need to contact the driver or local venue SPOC immediately:
- Phone numbers must be active hyperlinks: `<a href="tel:+919876543210">`.
- WhatsApp quick-dispatch links: `<a href="https://wa.me/919876543210?text=...">`.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't force a station SPOC to pinch-and-zoom a 12-column desktop table** to mark their boxes delivered.
- **Don't use tiny 20px icon buttons** for field actions like "Confirm Receipt" or "Call SPOC".
- **Don't use light-gray subtext (`slate-400`)** that washes out completely under bright outdoor sunlight.
- **Don't hide the station phone number behind an inspection modal**; on mobile, make it a single-tap dialer.

### Do:
- **Do provide a 1-tap `[Call SPOC]` button** that immediately launches the phone's native dialer.
- **Do use a sticky bottom confirmation bar** for the station check-in flow.
- **Do display collateral totals prominently in high-contrast bold font** on mobile cards.
- **Do disable auto-capitalization and autocorrect** on tracking search fields (`autocapitalize="none" autocorrect="off"`).

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind CSS)

```html
<!-- DUAL-MODE ENTERPRISE LOGISTICS ROW: DESKTOP TABLE + MOBILE DOSSIER CARD -->

<!-- 1. MOBILE VIEW: HIGH-ERGONOMICS DOSSIER CARD (< 768px) -->
<div class="block md:hidden bg-white border border-slate-200 rounded-lg p-4 shadow-2xs mb-3 space-y-3">
  
  <!-- Header: Code + Status Badge -->
  <div class="flex items-start justify-between">
    <div>
      <span class="text-2xs font-mono font-bold text-slate-500 uppercase tracking-wider">STN-017-042 &bull; WAVE 2</span>
      <h3 class="text-sm font-bold text-slate-900 mt-0.5">Kanpur Central Arena</h3>
      <div class="text-2xs text-slate-500">Gate 4, Civil Lines, Kanpur</div>
    </div>
    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
      IN TRANSIT
    </span>
  </div>

  <!-- Collateral Counts Grid -->
  <div class="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-100 text-center">
    <div>
      <div class="text-3xs uppercase font-medium text-slate-500">Badges</div>
      <div class="text-xs font-bold font-mono text-slate-900">1,200</div>
    </div>
    <div>
      <div class="text-3xs uppercase font-medium text-slate-500">Coupons</div>
      <div class="text-xs font-bold font-mono text-slate-900">1,200</div>
    </div>
    <div>
      <div class="text-3xs uppercase font-medium text-slate-500">Lanyards</div>
      <div class="text-xs font-bold font-mono text-slate-900">120</div>
    </div>
  </div>

  <!-- SPOC & Courier Metadata -->
  <div class="text-xs text-slate-600 flex items-center justify-between pt-1">
    <div>
      <span class="text-2xs text-slate-400 block">Station SPOC:</span>
      <span class="font-medium text-slate-800">Rajesh Sharma</span>
    </div>
    <div class="text-right">
      <span class="text-2xs text-slate-400 block">Bluedart AWB:</span>
      <span class="font-mono text-xs font-semibold text-slate-900">394820194</span>
    </div>
  </div>

  <!-- 44px Mobile Tap Actions (Thumb Zone) -->
  <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
    <!-- 1-Tap Phone Dialer -->
    <a href="tel:+919876543210" 
       class="min-h-[44px] flex items-center justify-center space-x-1.5 px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs">
      <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>Call SPOC</span>
    </a>

    <!-- Mark Delivered Primary Tap -->
    <button type="button" 
            class="min-h-[44px] flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-600 rounded-md text-xs font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-2xs">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Mark Delivered</span>
    </button>
  </div>

</div>

<!-- 2. DESKTOP VIEW: STANDARD TABULAR ROW (>= 768px) -->
<!-- Standard <tr> element inside desktop table -->
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Pinch-and-Zoom Tables** | Table overflows viewport width on mobile, forcing side-scrolling across 12 columns. | View on mobile viewport (375px); table width > 375px. | Use `hidden md:table` for tabular grid and `block md:hidden` for structured cards. |
| **Un-tappable Buttons** | Tiny 24px icon buttons clustered together, causing accidental wrong clicks. | Inspect element computed `height` and `width`; < 44px. | Ensure button has `min-h-[44px] min-w-[44px]` touch target area. |
| **Sunlight Washed-Out Text** | Secondary text `#94A3B8` (slate-400) invisible in daylight. | Test with screen brightness set high under simulated glare. | Upgrade text to `--text-secondary: #334155` or dark slate. |
| **Dead Phone Strings** | SPOC phone number displayed as plain unlinked text `9876543210`. | Click phone number on a smartphone; nothing happens. | Wrap in `<a href="tel:+919876543210">` with a clear phone icon. |

---

## 6. Self-Check Verification Checklist

- [ ] All mobile interactive buttons and links meet the minimum `44x44px` touch bounding area.
- [ ] Tables transform into ergonomic card dossiers on viewports `< 768px`.
- [ ] Phone numbers are wrapped in direct `tel:` hyperlinks for 1-tap calling.
- [ ] Primary field actions sit in the bottom natural thumb zone with sticky positioning where needed.
- [ ] Text contrast meets or exceeds `7:1` to ensure outdoor sunlight legibility.
- [ ] Search and tracking inputs include `autocapitalize="none"` to prevent unwanted mobile capitalization.
