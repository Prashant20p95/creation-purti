---
name: module-station-roster
description: Module-specific implementation skill for the Station Roster & Venue Directory, weekly wave scheduling (W1–W4), collateral quota ledgers, and SPOC contact verification.
---

# Module Skill: Station Roster & Venue Directory (`/stations`)

This skill governs the architecture, data management, quota allocation ledgers, and contact verification workflows for the Station Roster and Venue Directory module (`/stations`). It ensures seamless tracking of all 121 event stations, weekly wave assignments (W1–W4), SPOC contact details, and postal PIN code verification.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or optimizing the Station Roster page (`/stations`).
- Implementing or filtering by weekly deployment waves (Wave 1, Wave 2, Wave 3, Wave 4).
- Editing station quotas (Badges, Food Coupons, Lanyards, Vehicle Passes).
- Inspecting or updating SPOC coordinator contact numbers or venue delivery addresses.
- Exporting the official station directory or logistics manifest ledger to CSV.

---

## 2. Module Specifications & Layout Architecture

### A. Roster Structure (121 Stations for Event 17)
The station roster represents physical delivery points where event passes and collaterals must arrive. Each station record contains:
1. **Station Identifier**: Unique code (e.g. `STN-017-042`), name (e.g. *Kanpur Central Arena*), and deployment wave (`W1`–`W4`).
2. **Venue Delivery Address**: Street, landmark, district, state, and 6-digit Indian PIN code.
3. **SPOC Personnel**: Full name, primary telephone (with active `tel:` link), alternate phone, and email.
4. **Collateral Quotas**: Badges, food coupons, lanyards, vehicle passes, and calculated box carton count.
5. **Logistics Readiness Badge**: Verified address status (`VERIFIED` vs `MISSING PIN/PHONE`).

### B. Weekly Wave Filter Strip (W1–W4)
A dedicated, single-row segmented control above the roster table:
- **All Stations**: `121`
- **Wave 1 (W1 - Urgent)**: `30 Stations` (Deployment: 10–14 Oct)
- **Wave 2 (W2 - Core)**: `35 Stations` (Deployment: 15–19 Oct)
- **Wave 3 (W3 - Extended)**: `32 Stations` (Deployment: 20–24 Oct)
- **Wave 4 (W4 - Final)**: `24 Stations` (Deployment: 25–29 Oct)

### C. Station Dossier Inspection Drawer
Clicking any station opens a right-side slide-out drawer (`w-[480px]`) displaying:
- Complete 6-line postal courier address block with Google Maps link.
- Direct click-to-dial and WhatsApp links for the local SPOC.
- Historical dispatch logs and courier AWB tracking status.
- Collateral breakdown table with inline edit capabilities.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't allow stations with missing PIN codes or phone numbers to be marked ready for dispatch** without a prominent warning badge.
- **Don't truncate station names with ellipses** if the venue title is long (e.g. *Dr. Babasaheb Ambedkar Memorial Auditorium*); wrap cleanly in 2 lines.
- **Don't hide SPOC contact numbers behind 3 nested clicks**; display the phone directly in the table row with a click-to-dial icon.
- **Don't recalculate wave totals manually**; bind wave filter badge numbers dynamically to the active dataset.

### Do:
- **Do flag incomplete station addresses with an orange `UNVERIFIED ADDRESS` tag**.
- **Do provide instant column search across Station Name, City, SPOC, and PIN Code**.
- **Do export complete 6-line postal addresses in the CSV manifest export** for bulk courier upload.
- **Do support keyboard navigation (`Tab` and `/`) across the roster list**.

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind / Vanilla JS)

```html
<!-- AUTHORITATIVE STATION ROSTER TOOLBAR & WAVE SEGMENTED CONTROL -->
<div class="space-y-3 font-sans">
  
  <!-- Wave Filter Segmented Control -->
  <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
    <div class="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs">
      <button class="px-3 py-1 font-semibold rounded-md bg-white text-slate-900 shadow-2xs">
        All (121)
      </button>
      <button class="px-3 py-1 font-medium text-slate-600 hover:text-slate-900">
        Wave 1 (30)
      </button>
      <button class="px-3 py-1 font-medium text-slate-600 hover:text-slate-900">
        Wave 2 (35)
      </button>
      <button class="px-3 py-1 font-medium text-slate-600 hover:text-slate-900">
        Wave 3 (32)
      </button>
      <button class="px-3 py-1 font-medium text-slate-600 hover:text-slate-900">
        Wave 4 (24)
      </button>
    </div>

    <!-- Quick Search & Export -->
    <div class="flex items-center space-x-2">
      <div class="relative w-64">
        <input type="search" placeholder="Search station, city, PIN, SPOC..." 
               class="w-full h-8 pl-8 pr-3 text-xs bg-white border border-slate-300 rounded shadow-2xs focus:ring-1 focus:ring-blue-500">
        <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button class="h-8 px-3 text-xs font-medium bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center space-x-1">
        <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <span>Export Roster CSV</span>
      </button>
    </div>
  </div>

  <!-- Roster Data Table -->
  <div class="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
    <table class="w-full text-left border-collapse text-xs">
      <thead class="bg-slate-50 border-b border-slate-200 text-2xs font-semibold uppercase text-slate-500 tracking-wider">
        <tr>
          <th class="px-3.5 py-2.5">Code</th>
          <th class="px-3.5 py-2.5">Station Venue & City</th>
          <th class="px-3.5 py-2.5">Wave</th>
          <th class="px-3.5 py-2.5">SPOC Contact</th>
          <th class="px-3.5 py-2.5 text-right">Badges</th>
          <th class="px-3.5 py-2.5 text-right">Coupons</th>
          <th class="px-3.5 py-2.5 text-right">Boxes</th>
          <th class="px-3.5 py-2.5 text-center">Address Status</th>
          <th class="px-3.5 py-2.5 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr class="hover:bg-slate-50/80 transition-colors">
          <td class="px-3.5 py-2.5 font-mono font-bold text-slate-800">STN-017-042</td>
          <td class="px-3.5 py-2.5">
            <div class="font-bold text-slate-900">Kanpur Central Arena</div>
            <div class="text-2xs text-slate-500">Gate 4, Civil Lines &bull; PIN: 208001</div>
          </td>
          <td class="px-3.5 py-2.5">
            <span class="px-1.5 py-0.5 rounded text-2xs font-semibold bg-slate-100 text-slate-700 font-mono">W2</span>
          </td>
          <td class="px-3.5 py-2.5">
            <div class="font-medium text-slate-800">Rajesh Sharma</div>
            <a href="tel:+919876543210" class="text-2xs font-mono text-blue-600 hover:underline">+91 98765 43210</a>
          </td>
          <td class="px-3.5 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">1,200</td>
          <td class="px-3.5 py-2.5 text-right font-mono font-medium text-slate-900 tabular-nums">1,200</td>
          <td class="px-3.5 py-2.5 text-right font-mono font-semibold text-slate-950 tabular-nums">4</td>
          <td class="px-3.5 py-2.5 text-center">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-2xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              VERIFIED
            </span>
          </td>
          <td class="px-3.5 py-2.5 text-center">
            <button onclick="openStationDossier('STN-017-042')" class="h-6 px-2 text-2xs font-medium bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700 shadow-2xs">
              Dossier
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Missing PIN Codes** | Destination address states "Kanpur, UP" without a 6-digit postal PIN code. | Audit station records where `pin_code IS NULL` or length != 6. | Flag row with warning badge: `MISSING PIN CODE`; prevent label generation. |
| **Unlinked SPOC Phone** | Phone number is plain text string without `tel:` link. | Test click on phone number in mobile or desktop view. | Wrap in `<a href="tel:${phone}">` with phone icon. |
| **Static Wave Badges** | Wave filter button says "Wave 1 (30)" even if stations are added or reassigned. | Check if count is hardcoded string in HTML. | Compute counts dynamically from `stations.filter(s => s.wave === 1).length`. |
| **Ellipsed Addresses** | Long delivery addresses truncated with `...` hiding critical building or gate instructions. | Inspect address column styling; look for `truncate` class. | Allow address to wrap to 2 lines; show complete address in dossier drawer. |

---

## 6. Self-Check Verification Checklist

- [ ] All 121 stations are accountably tracked with deployment waves (W1–W4).
- [ ] Segmented wave filter bar shows dynamic station counts per wave.
- [ ] SPOC telephone numbers are active `tel:` hyperlinks with international formatting (`+91`).
- [ ] Addresses with missing PIN codes or telephone numbers are flagged with warning badges.
- [ ] Number columns (Badges, Coupons, Boxes) are strictly right-aligned with monospace font.
- [ ] CSV export includes full 6-line postal addresses suitable for courier upload.
- [ ] Clicking a row opens the slide-out Station Dossier inspection drawer.
