---
name: ui-ux-master-playbook
description: >-
  The Master Orchestration Playbook for any future AI agent or engineer modifying the UI/UX
  of the Umang Utsav Operations Portal. Defines the mandatory pre-flight checks, skill selection
  protocol, token validation, and design review checklist.
---

# UI/UX Master Orchestration Playbook

This master skill enforces the governance workflow that every agent must execute **before and during** any modification to the user interface of this application.

---

## 1. When to Trigger This Skill
- Whenever a user requests a UI/UX update, layout adjustment, visual enhancement, new screen, or component refactor.
- Whenever an agent is about to touch `static/app.js`, `static/styles.css`, or `static/index.html`.

---

## 2. Mandatory 4-Step Execution Order

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: READ THE MODULE ANALYSIS                                            │
│ Read the corresponding audit in .agent/analysis/ (e.g. 01-dashboard.md)     │
│ Understand the user persona, jobs, click paths, and failure modes.          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: SELECT RELEVANT CRAFT & MODULE SKILLS                               │
│ Consult .agent/skills/INDEX.md to pick 2–3 specialized skills               │
│ (e.g. data-table-architecture + module-dispatch-pipeline).                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: APPLY PRINCIPLES USING REAL CODE PATTERNS                           │
│ Implement with exact token values, tabular monospace numerals, crisp        │
│ hairlines, and strict color restraint (90% neutral, 10% semantic status).   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: RUN THE 10-POINT HEURISTIC SELF-CHECK                               │
│ Verify 0 layout shifts, 0 decorative emojis, WCAG AAA contrast, and        │
│ 100% mathematical parity across totals and tables.                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Principles with Exact Values

1. **Spatial Geometry**: All margins, padding, and gaps must strictly adhere to the 4px/8px scale (`4px`, `8px`, `12px`, `14px`, `16px`, `24px`).
2. **Tabular Numerals**: Every numeric figure, count, quota, and docket must use `font-family: var(--mono-font)` with `text-align: right` in tables.
3. **Color Restraint (90/10)**: Canvas is neutral slate (`#F8FAFC` / `#FFFFFF`). Colors are reserved strictly for semantics:
   - Green (`#059669` / `#ECFDF5`) = Verified & Complete
   - Blue (`#2563EB` / `#EFF6FF`) = In Transit / Active Movement
   - Amber (`#D97706` / `#FFFBEB`) = Staging / Call Needed
   - Red (`#DC2626` / `#FEF2F2`) = Urgent Bottleneck (< 5d / Overdue)
4. **Zero AI-Template tells**: No purple gradients, no 24px pill borders, no glowing shadows, no decorative emoji crutches.

---

## 4. Do and Don't Examples (Using Real Tool Content)

- **DO**:
  ```html
  <!-- Crisp, professional carrier docket with 1-click copy -->
  <div class="carrier-docket-row">
    <span class="num-mono" style="font-weight:700; color:#2563EB;">AWB-982341</span>
    <button type="button" onclick="window.copyDocketNumber('AWB-982341')" class="btn-copy-docket" title="Copy Docket Number">📋</button>
  </div>
  ```
- **DON'T**:
  ```html
  <!-- AI-Template Fluff: Neon gradients, floating icons, non-copyable text -->
  <div style="background: linear-gradient(135deg, #6366F1, #A855F7); border-radius: 20px; box-shadow: 0 0 15px rgba(99,102,241,0.5);">
    <span>🚀 Awesome Tracking: AWB-982341 ✨</span>
  </div>
  ```

---

## 5. Correct Implementation Snippet (Vanilla JS Component Pattern)

```javascript
// Clean declarative rendering pattern with XSS escaping
function renderStationDossierRow(station) {
  const cleanPhone = (station.mobile || '').replace(/\D/g, '');
  return `
    <tr class="ledger-row ${station.isUrgent ? 'row-urgent' : ''}">
      <td class="num-cell">${station.serialNo}</td>
      <td><span class="card-pill-tag pill-neutral">${escapeHtml(station.state)}</span></td>
      <td>
        <div class="station-title">${escapeHtml(station.destination_name)}</div>
        <div class="station-sub">${escapeHtml(station.district || '')}</div>
      </td>
      <td class="num-cell" style="font-weight:800;">${formatNumber(station.influencerCards)}</td>
      <td>${formatDispatchStatusCell(station)}</td>
    </tr>
  `;
}
```

---

## 6. Common Mistakes & Detection Guide

| Mistake | How to Detect It | Correction Rule |
| :--- | :--- | :--- |
| **Premature Confirmation** | Delivered parcels skip Lane 3 and jump directly to Verified. | Check logic: confirmation MUST require `confirmation_status === 'CONFIRMED'`. |
| **Numeric Misalignment** | Numbers in a table column drift left and right. | Ensure column has `text-align: right` and uses monospace font. |
| **Nested Scrollbars** | The browser window scrolls AND the inner table scrolls. | Recalculate container height: `calc(100vh - 250px)`. |

---

## 7. Self-Check Verification List
- [ ] Have I consulted the module analysis file before proposing changes?
- [ ] Are all numbers and dockets rendered in monospace font?
- [ ] Is saturated color used strictly for status semantics?
- [ ] Does every action (call, WA, copy, outmail) work in exactly 1 click?
- [ ] Is there zero decorative emoji clutter in headers or buttons?

---

## 8. Related Documentation Links
- System Overview: [00-overview.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/00-overview.md)
- Foundations Research: [research-A-foundations.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/research-A-foundations.md)
- Premium Craft: [research-F-premium-human-made.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/research-F-premium-human-made.md)
