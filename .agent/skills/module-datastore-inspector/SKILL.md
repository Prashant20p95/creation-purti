---
name: module-datastore-inspector
description: Module-specific implementation skill for the Master Data Store & Database Inspector, SQLite WAL diagnostics, 22-table record count matrices, and automated database backup exports.
---

# Module Skill: Master Data Store & Database Inspector (`/datastore`)

This skill governs the architecture, system diagnostics, record counts, schema inspection, and backup/import workflows of the Master Data Store Inspector (`/datastore`). It guarantees transparent SQLite WAL (Write-Ahead Logging) health monitoring, protects against database locking, and provides administrative auditing across all 22 database tables.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Modifying, refactoring, or optimizing the database inspection views (`/datastore` or `/admin/db`).
- Auditing SQLite WAL file size, journal modes, or schema integrity.
- Rendering the 22-table record count matrix or database diagnostic summary.
- Implementing database backup snapshot downloads (`.sqlite` export) or schema audits.
- Handling bulk CSV roster import templates and validation previews.

---

## 2. Module Specifications & Diagnostics Architecture

### A. SQLite Health Diagnostic Indicators
At the top of the Data Store view, display 4 real-time storage metrics:
1. **Journal Mode**: `WAL` (Write-Ahead Logging enabled for high-concurrency read/write).
2. **Database File Size**: e.g. `24.8 MB` (main `.db`) + `1.2 MB` (`.wal` buffer).
3. **Active Connection Count**: Open SQLite read/write handles.
4. **Foreign Key Integrity**: `PRAGMA foreign_key_check` status (`0 Violations`).

### B. 22-Table Record Count Audit Matrix
A high-density tabular grid displaying record counts across all core operational tables:
- `events`: Active event configurations (Event 17 active).
- `event_destinations`: 121 physical delivery targets.
- `consignments`: 122 dispatch tracking manifests.
- `collateral_items`: 242,546 physical collateral units.
- `participants`: 110,000+ registered ticket pass holders.
- `audit_logs`: System mutation and state transition history.

### C. Safe Administrative Operations
- **Database Backup Snapshot**: 1-click download of a clean SQLite snapshot using SQLite online backup API (`VACUUM INTO` or backup API).
- **Schema Validation Preview**: When importing a CSV roster, show a 10-row preview with inline column mapping and error highlighting before committing to the database.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't expose raw SQL execution or unvalidated destructive DROP/TRUNCATE buttons** to general operators.
- **Don't perform large database queries or table scans synchronously on the main UI thread**, which blocks FastAPI responses.
- **Don't hide database errors behind generic "500 Internal Server Error" toasts**; explain the lock state or foreign key constraint clearly.
- **Don't conflate `participants` (110k) with `event_destinations` (121)** in table summary displays.

### Do:
- **Do display a green pulsing pulse indicator for active WAL sync**.
- **Do provide a 1-click `[Download DB Backup (.sqlite)]` button** for disaster recovery before batch dispatches.
- **Do right-align all record counts with monospace formatting (`tabular-nums font-mono`)**.
- **Do provide CSV template downloads** with strict headers matching database schemas.

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind CSS)

```html
<!-- AUTHORITATIVE DATA STORE DIAGNOSTIC CONSOLE -->
<div class="space-y-4 max-w-[1600px] mx-auto px-4 sm:px-6 py-4 font-sans text-slate-800">
  
  <!-- Diagnostic Status Bar -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <!-- Storage Mode -->
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
      <span class="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">Journal Mode</span>
      <div class="mt-1 flex items-baseline justify-between">
        <span class="text-lg font-bold font-mono text-emerald-700">WAL (Active)</span>
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>
      <span class="text-2xs text-slate-400 mt-1 block font-mono">Concurrent Read/Write OK</span>
    </div>

    <!-- DB File Size -->
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
      <span class="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">Storage Volume</span>
      <div class="mt-1 flex items-baseline justify-between">
        <span class="text-lg font-bold font-mono text-slate-900">24.8 MB</span>
        <span class="text-2xs text-slate-400 font-mono">WAL: 1.2 MB</span>
      </div>
      <span class="text-2xs text-slate-400 mt-1 block">Healthy disk allocation</span>
    </div>

    <!-- Active Tables -->
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
      <span class="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">Registered Tables</span>
      <div class="mt-1 flex items-baseline justify-between">
        <span class="text-lg font-bold font-mono text-blue-700">22 Tables</span>
        <span class="text-2xs font-mono text-blue-600 bg-blue-50 px-1 rounded">100% Intact</span>
      </div>
      <span class="text-2xs text-slate-400 mt-1 block">0 Foreign key errors</span>
    </div>

    <!-- Backup Action -->
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
      <span class="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">Disaster Recovery</span>
      <a href="/api/datastore/backup" download 
         class="mt-1 h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-xs flex items-center justify-center space-x-1.5 shadow-2xs transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        <span>Backup Database (.sqlite)</span>
      </a>
    </div>
  </div>

  <!-- 22-Table Audit Matrix Table -->
  <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
    <div class="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
      <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Database Table Record Inventory</h3>
      <span class="text-2xs font-mono text-slate-500">Event 17 Tenancy Scope</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-xs">
        <thead class="bg-slate-100/60 border-b border-slate-200 text-2xs font-semibold uppercase text-slate-500 tracking-wider">
          <tr>
            <th class="px-4 py-2">Table Name</th>
            <th class="px-4 py-2">Functional Role</th>
            <th class="px-4 py-2 text-right">Record Count</th>
            <th class="px-4 py-2 text-center">Engine / Mode</th>
            <th class="px-4 py-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="hover:bg-slate-50">
            <td class="px-4 py-2 font-mono font-bold text-slate-900">event_destinations</td>
            <td class="px-4 py-2 text-slate-600">Physical Station Delivery Targets</td>
            <td class="px-4 py-2 text-right font-mono font-bold text-slate-900 tabular-nums">121</td>
            <td class="px-4 py-2 text-center font-mono text-2xs text-slate-500">SQLite WAL</td>
            <td class="px-4 py-2 text-center"><span class="px-1.5 py-0.5 rounded text-3xs font-semibold bg-emerald-50 text-emerald-700">VERIFIED</span></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-4 py-2 font-mono font-bold text-slate-900">consignments</td>
            <td class="px-4 py-2 text-slate-600">Courier Shipping Manifests</td>
            <td class="px-4 py-2 text-right font-mono font-bold text-slate-900 tabular-nums">122</td>
            <td class="px-4 py-2 text-center font-mono text-2xs text-slate-500">SQLite WAL</td>
            <td class="px-4 py-2 text-center"><span class="px-1.5 py-0.5 rounded text-3xs font-semibold bg-emerald-50 text-emerald-700">VERIFIED</span></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-4 py-2 font-mono font-bold text-slate-900">collateral_items</td>
            <td class="px-4 py-2 text-slate-600">Badges, Coupons, Lanyards, Passes</td>
            <td class="px-4 py-2 text-right font-mono font-bold text-slate-900 tabular-nums">2,42,546</td>
            <td class="px-4 py-2 text-center font-mono text-2xs text-slate-500">SQLite WAL</td>
            <td class="px-4 py-2 text-center"><span class="px-1.5 py-0.5 rounded text-3xs font-semibold bg-emerald-50 text-emerald-700">VERIFIED</span></td>
          </tr>
          <tr class="hover:bg-slate-50">
            <td class="px-4 py-2 font-mono font-bold text-slate-900">participants</td>
            <td class="px-4 py-2 text-slate-600">Ticket Pass Holders & Registrations</td>
            <td class="px-4 py-2 text-right font-mono font-bold text-slate-900 tabular-nums">1,13,700</td>
            <td class="px-4 py-2 text-center font-mono text-2xs text-slate-500">SQLite WAL</td>
            <td class="px-4 py-2 text-center"><span class="px-1.5 py-0.5 rounded text-3xs font-semibold bg-emerald-50 text-emerald-700">VERIFIED</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Blocking DB Queries** | Clicking "Refresh Datastore" freezes the entire browser UI for 4 seconds. | Measure API response time on `/api/datastore/stats`. | Run table counts in separate async tasks or use cached schema counters. |
| **Silent SQLite Locking** | API returns `sqlite3.OperationalError: database is locked` on concurrent writes. | Review server logs during concurrent dispatch updates. | Ensure WAL mode is permanently enabled (`PRAGMA journal_mode=WAL;`). |
| **Missing Backup Link** | No clear disaster recovery export available before bulk CSV imports. | Audit Data Store page controls. | Add high-visibility `[Backup Database (.sqlite)]` button. |
| **Mismatched Table Counts** | Summary footer total doesn't match the sum of individual table rows. | Verify math: compare sum of table rows to header count. | Enforce programmatic consistency across table summaries. |

---

## 6. Self-Check Verification Checklist

- [ ] SQLite WAL mode is actively verified and displayed with a health indicator.
- [ ] Record counts across all core tables are accurately reported with monospace formatting.
- [ ] Database backup export (`.sqlite`) is directly accessible to administrators.
- [ ] Domain boundary between `participants` (110k) and `event_destinations` (121) is preserved.
- [ ] Schema inspections run read-only queries with zero risk of database lockouts.
- [ ] CSV import workflows include validation previews before executing database writes.
