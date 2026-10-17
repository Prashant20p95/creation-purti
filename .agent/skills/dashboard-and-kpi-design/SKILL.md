---
name: dashboard-and-kpi-design
description: Mission-critical executive dashboard architecture, action-first KPI metrics, collateral parity audit strips, honest data visualization, and exception alert tickers.
---

# Dashboard and KPI Design Architecture

This skill governs the design, information hierarchy, and data visualization standards for high-density executive cockpits. It ensures that operations leaders, warehouse chiefs, and logistics coordinators immediately see what requires action, eliminating vanity metrics, AI-generated chart fluff, and visual clutter.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or refactoring the main application dashboard (`/` or `/dashboard`).
- Adding, editing, or rearranging summary KPI cards or operational metric strips.
- Designing collateral parity tickers (badges vs coupons vs vehicle stickers).
- Building alert feeds, exception counters, or operational health bars.
- Adding charts, sparklines, or progress meters.

---

## 2. Core Principles & Exact Design Standards

### A. The Action-First Metric Rule (Zero Vanity Metrics)
Every metric displayed on an operational dashboard must answer one question: *"If this number changes, what action does the user take?"*
- **Vanity Metric (Banned on Dispatch Dashboard)**: "110,000 Registered Event Participants" (This is a ticketing marketing figure; warehouse dispatch cannot pack 110k individual packages).
- **Actionable Logistics Metric (Mandatory)**: "121 Station Delivery Targets" | "242,546 Collaterals Reconciled" | "8 Overdue In-Transit Shipments" | "3 Stations Missing SPOC Contacts".

### B. The 4 Hero KPI Cards Hierarchy
The top of the dashboard must feature exactly 4 standardized hero cards in a balanced grid (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`):

```
+-------------------+ +-------------------+ +-------------------+ +-------------------+
| 1. STATIONS ROSTER| | 2. PACKING STATUS | | 3. TRANSIT STATUS | | 4. CONFIRMATION   |
| 121 Active Targets| | 62,800 Packed     | | 114,200 In Transit| | 54,546 Verified   |
| 100% Assigned     | | 25.9% of Total    | | 18 Active Couriers| | 22.5% Complete    |
+-------------------+ +-------------------+ +-------------------+ +-------------------+
```

1. **Station Delivery Targets**: Total destinations mapped, broken down by weekly waves (W1–W4).
2. **Packing Readiness**: Physical collaterals packed and boxed in the central warehouse awaiting carrier pickup.
3. **In-Transit Pipeline**: Shipments on road with carriers, sub-badged with delayed or at-risk count.
4. **Physical Station Verification**: Destination stations that have physically unboxed, counted, and signed off collateral receipts.

### C. Collateral Parity Audit Strip
In large-scale physical logistics, collateral items must match exact distribution ratios. For example, in Umang Utsav 2026:
- Total Badges: `113,700`
- Total Food Coupons: `113,700` (Must maintain 1:1 parity with badges)
- Total Lanyards: `11,370` (1:10 ratio)
- Total Vehicle Passes: `3,776`

The Collateral Parity Strip displays these 4 items side-by-side with an automated parity delta indicator (`PARITY 100% OK` vs `DEFICIT -1,200 COUPONS`).

### D. Urgent Action Alert Ticker
Placed directly beneath the Hero KPIs, an alert strip highlights operational anomalies requiring immediate intervention:
- Shipments where Courier status is `DELIVERED` but station SPOC has not confirmed within 48 hours.
- Stations missing phone numbers or addresses with dispatch scheduled within 3 days.
- Overdue couriers with zero tracking scan updates in 72 hours.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't show 8 different multi-colored donut charts** that take up 600px of vertical space while communicating only 3 numbers.
- **Don't display floating, neon gradient cards** with soft drop shadows (`shadow-2xl`) that look like a generic crypto dashboard template.
- **Don't hide critical numbers behind dropdowns or tabs**; show the core 4 metrics immediately upon page load.
- **Don't report "100% Dispatched" when items are still in courier transit**; clearly separate central warehouse dispatch from station receipt.

### Do:
- **Do use tabular lining numerals** (`font-mono font-bold tracking-tight`) for every single metric to prevent jitter during live updates.
- **Do provide clickable drill-down anchors** on every KPI card (e.g. clicking "8 Overdue In-Transit" automatically navigates to `/dispatch?filter=delayed`).
- **Do show last updated timestamp and data freshness indicator** (`Last synced: 14:32 IST (Live WAL Connection)`).
- **Do format all large Indian numbers with standard comma groupings** (`2,42,546` collaterals, `1,13,700` badges).

---

## 4. Correct-Pattern Code Snippet (FastAPI / Tailwind / JS)

```html
<!-- AUTHORITATIVE DASHBOARD COCKPIT HEADER & KPI STRIP -->
<section class="space-y-4">
  <!-- System Freshness & Title Bar -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-200 gap-2">
    <div>
      <div class="flex items-center space-x-2">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800">
          EVENT 17
        </span>
        <h1 class="text-xl font-bold text-slate-900 tracking-tight">Umang Utsav 2026 — Logistics Command</h1>
      </div>
      <p class="text-xs text-slate-500 mt-0.5">Central Hub Dispatch & Venue Collateral Verification Cockpit</p>
    </div>
    
    <div class="flex items-center space-x-3">
      <div class="flex items-center space-x-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-mono text-2xs">DB WAL SYNC: 100% OK</span>
      </div>
      <button onclick="window.location.reload()" class="h-8 px-2.5 text-xs font-medium bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center space-x-1">
        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Refresh</span>
      </button>
    </div>
  </div>

  <!-- 4 Authoritative Hero KPI Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
    <!-- Card 1: Stations Target -->
    <a href="/stations" class="group block p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Stations Roster</span>
        <span class="p-1 rounded bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </span>
      </div>
      <div class="mt-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-slate-900 tracking-tight">121</span>
        <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">100% Configured</span>
      </div>
      <div class="mt-2 text-2xs text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 pt-1.5">
        <span>Waves W1–W4 Assigned</span>
        <span class="text-blue-600 group-hover:underline">View Roster &rarr;</span>
      </div>
    </a>

    <!-- Card 2: Collaterals Packed -->
    <a href="/dispatch?lane=packed" class="group block p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Packed (Hub Ready)</span>
        <span class="p-1 rounded bg-blue-50 text-blue-600">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        </span>
      </div>
      <div class="mt-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-blue-700 tracking-tight">62,800</span>
        <span class="text-xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">25.9% Packed</span>
      </div>
      <div class="mt-2 text-2xs text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 pt-1.5">
        <span>31 Consignments Boxed</span>
        <span class="text-blue-600 group-hover:underline">Open Lane &rarr;</span>
      </div>
    </a>

    <!-- Card 3: In Transit -->
    <a href="/dispatch?lane=in_transit" class="group block p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-amber-400 hover:shadow-xs transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">In Transit (Carriers)</span>
        <span class="p-1 rounded bg-amber-50 text-amber-600">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-6 0a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
        </span>
      </div>
      <div class="mt-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-amber-700 tracking-tight">114,200</span>
        <span class="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">47.1% on Road</span>
      </div>
      <div class="mt-2 text-2xs text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 pt-1.5">
        <span>58 Dispatches Active</span>
        <span class="text-amber-600 group-hover:underline">Track Consignments &rarr;</span>
      </div>
    </a>

    <!-- Card 4: Verified Delivered -->
    <a href="/dispatch?lane=confirmed" class="group block p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">Station Confirmed</span>
        <span class="p-1 rounded bg-emerald-50 text-emerald-600">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </span>
      </div>
      <div class="mt-2 flex items-baseline justify-between">
        <span class="text-2xl font-bold font-mono text-emerald-700 tracking-tight">54,546</span>
        <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">22.5% Closed</span>
      </div>
      <div class="mt-2 text-2xs text-slate-500 font-mono flex items-center justify-between border-t border-slate-100 pt-1.5">
        <span>32 Stations Verified</span>
        <span class="text-emerald-600 group-hover:underline">Audit Sign-offs &rarr;</span>
      </div>
    </a>
  </div>

  <!-- Collateral Parity Strip (4 Item Distribution Ledger) -->
  <div class="p-3 bg-slate-100 border border-slate-200 rounded-lg">
    <div class="text-2xs font-semibold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
      <span>Collateral Distribution Parity Ledger (Total: 2,42,546 Items)</span>
      <span class="text-emerald-700 font-mono">100% Balanced</span>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div class="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between">
        <div>
          <div class="text-2xs text-slate-500">Badges</div>
          <div class="text-sm font-bold font-mono text-slate-900">1,13,700</div>
        </div>
        <span class="text-2xs font-mono text-slate-400">46.9%</span>
      </div>
      <div class="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between">
        <div>
          <div class="text-2xs text-slate-500">Food Coupons</div>
          <div class="text-sm font-bold font-mono text-slate-900">1,13,700</div>
        </div>
        <span class="text-2xs font-mono text-emerald-600 font-semibold">1:1 Parity</span>
      </div>
      <div class="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between">
        <div>
          <div class="text-2xs text-slate-500">Lanyards</div>
          <div class="text-sm font-bold font-mono text-slate-900">11,370</div>
        </div>
        <span class="text-2xs font-mono text-slate-400">1:10 Ratio</span>
      </div>
      <div class="bg-white p-2.5 rounded border border-slate-200 flex items-center justify-between">
        <div>
          <div class="text-2xs text-slate-500">Vehicle Passes</div>
          <div class="text-sm font-bold font-mono text-slate-900">3,776</div>
        </div>
        <span class="text-2xs font-mono text-slate-400">VIP / Logistics</span>
      </div>
    </div>
  </div>
</section>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Vanity Number Dominance** | Huge `110,000` participant count dominating the screen, confusing warehouse dispatchers. | Inspect hero card headers: is the metric unrelated to physical shipments? | Replace with `121 Station Targets` and `242,546 Collaterals Reconciled`. |
| **Decorative Donut Charts** | Multi-colored circular charts without labels or exact values. | Visual inspection; elements using `<svg class="donut">` or chart.js without legend. | Replace with structured tabular progress strips or stacked horizontal bars with exact numerical counts. |
| **Silent Freshness** | Dashboard shows stale cached numbers without indicating last sync time. | No timestamp or sync badge visible. | Add a live WAL connection indicator and explicit `Last synced: HH:MM:SS` footer. |
| **Unlinked KPI Cards** | Clicking cards does nothing; user must manually navigate to tables and reapply filters. | Card wrapper lacks `href` or click handler. | Make each card an operational shortcut linking directly to filtered views (`/dispatch?status=in_transit`). |

---

## 6. Self-Check Verification Checklist

- [ ] Dashboard displays exactly 4 unified hero KPI cards.
- [ ] No marketing or ticketing vanity metrics masquerading as logistics numbers.
- [ ] Collateral Parity Strip verifies 1:1 balance between Badges and Food Coupons.
- [ ] All metrics use tabular lining numerals (`font-mono`) with Indian comma grouping (`2,42,546`).
- [ ] Every KPI card acts as an active drill-down link to the corresponding filtered table.
- [ ] Freshness timestamp and database sync health are visibly verified.
- [ ] Zero uninformative decorative charts or pseudo-scientific gauge meters.
