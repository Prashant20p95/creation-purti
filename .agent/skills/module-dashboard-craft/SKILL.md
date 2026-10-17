---
name: module-dashboard-craft
description: Module-specific implementation skill for the Executive Dashboard & Venue Logistics Cockpit, hero KPI orchestration, collateral parity ribbons, and system freshness indicators.
---

# Module Skill: Executive Dashboard & Venue Logistics Cockpit

This skill governs the visual design, data flow, component layout, and user ergonomics of the primary application dashboard (`/` and `/dashboard`). It translates high-level design tokens into exact operational components for executive dispatch oversight.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or optimizing the main dashboard page (`/` or `/dashboard`).
- Modifying the 4 Hero KPI metric cards, the Collateral Parity Strip, or the Urgent Alerts Ticker.
- Resolving layout crowding, vertical sprawling, or AI-template clutter on the dashboard.
- Connecting live SQLite database statistics or WAL status badges to the dashboard header.

---

## 2. Module Specifications & Layout Architecture

### A. Information Hierarchy (Top to Bottom)
1. **Executive Context Header (56px)**: Active Event Badge (`Event 17: Umang Utsav 2026`), database WAL sync indicator, and instant refresh button.
2. **4-Column Synchronized Hero KPI Cards**:
   - Card 1: **Station Targets** (`121 Stations` | 100% Configured | Waves W1–W4)
   - Card 2: **Collaterals Packed** (`62,800 Packed` | 25.9% Complete | 31 Consignments)
   - Card 3: **In-Transit Pipeline** (`114,200 On Road` | 47.1% Active | 58 Consignments)
   - Card 4: **Station Verified Receipts** (`54,546 Verified` | 22.5% Closed | 32 Stations)
3. **Collateral Parity Strip (4 Item Distribution Ledger)**:
   - Badges (`1,13,700`), Food Coupons (`1,13,700`), Lanyards (`11,370`), Vehicle Passes (`3,776`).
   - Automated Parity Indicator: verifies exact 1:1 balance between Badges and Food Coupons.
4. **Urgent Action Alert Ticker**: Actionable alerts for delayed courier shipments, stations missing phone contacts, or pending sign-offs.
5. **Quick-Action Operational Launchpad**: Restrained 36px shortcut buttons to open Dispatch Pipeline, Print Labels, or View Roster.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't display 110,000 participant tickets as the main logistics KPI**. Ticketing registrations are not warehouse dispatch targets; the logistics team handles 121 stations and 242,546 collaterals.
- **Don't allow the dashboard to sprawl across 3 viewport heights** with giant empty cards and decorative gradient banners.
- **Don't use low-contrast gray subtext**; ensure all labels meet WCAG AA $\ge 4.5:1$.
- **Don't omit drill-down links**; every KPI card must open its respective filtered dispatch list.

### Do:
- **Do keep the entire operational cockpit within a single desktop viewport** on standard 1080p monitors (`max-w-[1600px]`).
- **Do use tabular monospace numbers (`tabular-nums font-mono`)** with Indian comma grouping (`2,42,546`).
- **Do display live database freshness timestamp** (`Last Synced: 14:35 IST`).
- **Do link Card 3 ("In-Transit Pipeline") directly to `/dispatch?lane=in_transit`**.

---

## 4. Correct-Pattern Code Snippet (HTML / Jinja / Tailwind)

```html
<!-- AUTHORITATIVE DASHBOARD OPERATIONAL COCKPIT -->
<div class="space-y-4 max-w-[1600px] mx-auto px-4 sm:px-6 py-4 font-sans text-slate-800">
  
  <!-- 1. Header Bar -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
    <div class="flex items-center space-x-3">
      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        EVENT 17
      </span>
      <h1 class="text-lg font-bold text-slate-900 tracking-tight">Umang Utsav 2026 — Logistics Command</h1>
    </div>
    
    <div class="flex items-center space-x-2 text-xs">
      <div class="flex items-center space-x-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded shadow-2xs font-mono text-2xs text-slate-600">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>WAL SYNC: 121 STNS OK</span>
      </div>
      <button onclick="window.location.reload()" class="h-7 px-2.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 shadow-2xs font-medium flex items-center space-x-1">
        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Refresh</span>
      </button>
    </div>
  </div>

  <!-- 2. 4 Hero KPI Cards (Synchronized Height) -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    <!-- Card 1 -->
    <a href="/stations" class="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 shadow-2xs transition-all flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
        <span>Station Targets</span>
        <span class="text-blue-600 font-mono">100% Configured</span>
      </div>
      <div class="my-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-slate-900 tabular-nums">121</span>
        <span class="text-2xs text-slate-500 font-mono">Waves W1–W4</span>
      </div>
      <div class="text-2xs text-slate-400 border-t border-slate-100 pt-1">
        All 121 destination venues mapped
      </div>
    </a>

    <!-- Card 2 -->
    <a href="/dispatch?lane=packed" class="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 shadow-2xs transition-all flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs text-blue-700 uppercase font-semibold">
        <span>Packed (Hub Ready)</span>
        <span class="text-2xs font-mono bg-blue-50 text-blue-700 px-1 rounded">25.9%</span>
      </div>
      <div class="my-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-blue-700 tabular-nums">62,800</span>
        <span class="text-2xs text-slate-500 font-mono">31 Boxes</span>
      </div>
      <div class="text-2xs text-slate-400 border-t border-slate-100 pt-1">
        Boxed & ready in central warehouse
      </div>
    </a>

    <!-- Card 3 -->
    <a href="/dispatch?lane=in_transit" class="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-amber-400 shadow-2xs transition-all flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs text-amber-700 uppercase font-semibold">
        <span>In Transit (Couriers)</span>
        <span class="text-2xs font-mono bg-amber-50 text-amber-700 px-1 rounded">47.1%</span>
      </div>
      <div class="my-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-amber-700 tabular-nums">114,200</span>
        <span class="text-2xs text-amber-600 font-mono font-bold">8 Delayed</span>
      </div>
      <div class="text-2xs text-slate-400 border-t border-slate-100 pt-1">
        58 dispatches active on road
      </div>
    </a>

    <!-- Card 4 -->
    <a href="/dispatch?lane=confirmed" class="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-emerald-400 shadow-2xs transition-all flex flex-col justify-between">
      <div class="flex items-center justify-between text-xs text-emerald-700 uppercase font-semibold">
        <span>Station Verified</span>
        <span class="text-2xs font-mono bg-emerald-50 text-emerald-700 px-1 rounded">22.5%</span>
      </div>
      <div class="my-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-emerald-700 tabular-nums">54,546</span>
        <span class="text-2xs text-slate-500 font-mono">32 Stns</span>
      </div>
      <div class="text-2xs text-slate-400 border-t border-slate-100 pt-1">
        Physical unboxing & sign-off completed
      </div>
    </a>
  </div>

  <!-- 3. Collateral Parity Strip -->
  <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
    <div class="flex items-center justify-between text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
      <span>Collateral Balance Ledger (2,42,546 Total Items)</span>
      <span class="text-emerald-700 font-mono font-bold">1:1 Badge/Coupon Parity OK</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
      <div class="bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
        <span class="text-slate-600">Badges:</span>
        <span class="font-mono font-bold text-slate-900">1,13,700</span>
      </div>
      <div class="bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
        <span class="text-slate-600">Food Coupons:</span>
        <span class="font-mono font-bold text-slate-900">1,13,700</span>
      </div>
      <div class="bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
        <span class="text-slate-600">Lanyards:</span>
        <span class="font-mono font-bold text-slate-900">11,370</span>
      </div>
      <div class="bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
        <span class="text-slate-600">Vehicle Passes:</span>
        <span class="font-mono font-bold text-slate-900">3,776</span>
      </div>
    </div>
  </div>

  <!-- 4. Urgent Action Alert Ticker -->
  <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
    <div class="flex items-center space-x-2">
      <span class="font-bold uppercase tracking-wider text-amber-800">Operational Exceptions:</span>
      <span>8 consignments have been in transit > 4 days without delivery confirmation.</span>
    </div>
    <a href="/dispatch?filter=delayed" class="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold rounded text-2xs font-mono transition-colors">
      View Delayed Consignments &rarr;
    </a>
  </div>

</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Crowded Vertical Sprawl** | Page has 5 separate card sections forcing 4 screen scrolls to view metrics. | Check page height; compare to 900px viewport. | Consolidate into 4 hero cards + 1 parity strip + 1 alert strip. |
| **Vanity Metric Prominence** | 110,000 participant tickets displayed instead of station targets. | Check metric labels; search for "Registered Participants". | Replace with `121 Station Targets` and `242,546 Collaterals`. |
| **Missing Parity Verification** | Badges and food coupons shown separately without verifying 1:1 balance. | Inspect calculations; check if difference is calculated. | Add parity delta check: `badges === coupons ? '1:1 OK' : 'DEFICIT'`. |
| **Unresponsive Grids** | KPI cards collapse into illegible 50px columns on mobile. | Test at 375px; observe card layout. | Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. |

---

## 6. Self-Check Verification Checklist

- [ ] Top header displays Event 17 badge and database WAL sync status.
- [ ] Exactly 4 Hero KPI cards are displayed in a single synchronized row.
- [ ] Collateral Parity Strip verifies 1:1 match between Badges and Food Coupons.
- [ ] Urgent Alert Ticker highlights delayed couriers or missing SPOC contacts.
- [ ] All metrics use tabular monospace numbers (`font-mono tabular-nums`).
- [ ] Every KPI card links directly to its filtered destination page.
- [ ] Entire dashboard fits cleanly within a standard 1080p desktop viewport.
