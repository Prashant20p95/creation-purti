---
name: status-systems-and-states
description: Authoritative status architecture, 3-part indicator tokens (icon + color + label), state machine progression, courier vs physical confirmation decoupling, and exception handling.
---

# Status Systems, State Machines, and Indicator Ergonomics

This skill governs the representation of operational states, lifecycles, and exceptions across dispatch pipelines, audit rosters, and tracking dashboards. It eliminates ambiguous color dots, prevents confusion between courier delivery and physical verification, and ensures full accessibility.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Displaying consignment statuses, shipment tracking, or physical collateral receipts.
- Designing badges, tags, pills, progress steppers, or state filters.
- Implementing state transitions (e.g. marking packed, in transit, delivered, or confirmed).
- Handling exceptions, delayed shipments, or discrepancies.
- Disambiguating Courier Delivery from Station SPOC Verification.

---

## 2. Core Principles & Exact Design Tokens

### A. The 3-Part Status Rule (Color + Icon + Explicit Label)
Never communicate state through color alone. Every status badge must contain:
1. **Semantic Color Tint** (Background tint + border hairline + dark foreground text meeting WCAG AAA $\ge 7:1$).
2. **Distinctive SVG Icon** (Check, Truck, Clock, Alert Triangle, Package).
3. **Unambiguous Text Label** (Plain operational noun or past participle).

### B. Standard Status Token Palette (Light Theme Enterprise Tokens)

| Operational State | Background | Border | Text | SVG Icon | Label |
|---|---|---|---|---|---|
| **DRAFT / UNASSIGNED** | `#F1F5F9` (`slate-100`) | `#CBD5E1` (`slate-300`) | `#334155` (`slate-700`) | Document / Dash | `DRAFT` |
| **PACKED (READY)** | `#EFF6FF` (`blue-50`) | `#93C5FD` (`blue-300`) | `#1D4ED8` (`blue-700`) | Box / Package | `PACKED` |
| **IN TRANSIT** | `#FFFBEB` (`amber-50`) | `#FCD34D` (`amber-300`) | `#B45309` (`amber-700`) | Fast Truck | `IN TRANSIT` |
| **COURIER DELIVERED** | `#ECFDF5` (`emerald-50`) | `#6EE7B7` (`emerald-300`) | `#047857` (`emerald-700`) | Checkmark Circle | `DELIVERED` |
| **SPOC CONFIRMED** | `#EEF2FF` (`indigo-50`) | `#A5B4FC` (`indigo-300`) | `#4338CA` (`indigo-700`) | Double Check / Shield | `CONFIRMED` |
| **DELAYED / AT RISK** | `#FFF7ED` (`orange-50`) | `#FDBA74` (`orange-300`) | `#C2410C` (`orange-700`) | Clock Alert | `DELAYED` |
| **EXCEPTION / DAMAGED**| `#FEF2F2` (`red-50`) | `#FCA5A5` (`red-300`) | `#B91C1C` (`red-700`) | Alert Octagon | `EXCEPTION` |

### C. Domain Invariant: Courier Delivery vs Physical Confirmation
In physical logistics, courier tracking APIs report `DELIVERED` when the driver drops boxes at a gate or loading dock. This is **NOT** verification that the 2,000 badges and 400 lanyards are physically intact.

```
+---------------------------------------------------------------------------------+
|                       DISPATCH PIPELINE STATE TRANSITIONS                       |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [PACKED]  ===>  [IN TRANSIT]  ===>  [COURIER DELIVERED]  ===>  [SPOC CONFIRMED]|
|  (In Hub)        (On Road)           (At Station Gate)          (Inspected & OK)|
|                                              |                                  |
|                                        [DISCREPANCY]                            |
|                                        (Boxes missing)                          |
+---------------------------------------------------------------------------------+
```

- **Courier Status `DELIVERED`**: Belongs to Lane 3 / Status Cell 3. Indicates courier completed transit.
- **Station Confirmation `CONFIRMED`**: Belongs to Lane 4 / Final Sign-off. Requires physical head-count verification by the local Venue SPOC. A shipment cannot move to confirmed automatically upon courier delivery.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't display a naked green circle** without text or an accessible tooltip.
- **Don't automatically move a consignment to "Completed / Delivered" tab** without separating courier tracking from SPOC physical confirmation.
- **Don't use low-contrast pastel text** (e.g. `#86EFAC` text on white background) that washes out on warehouse monitors.
- **Don't show "Status: None" or empty cells** when tracking has not yet begun; use an explicit `PENDING DISPATCH` badge.

### Do:
- **Do provide a 2-stage action button hierarchy**:
  - In Lane 2 (In Transit): Show `[Mark Delivered]` button with prompt for Delivery Date & Received By.
  - In Lane 3 (Delivered): Show `[Verify & Confirm]` button for SPOC to enter physical count sign-off.
- **Do show courier tracking metadata directly beneath the status badge** (e.g. `Bluedart #394820194 | Exp: 12-Oct`).
- **Do highlight overdue in-transit shipments** with an orange `DELAYED (3d+)` badge if `expected_delivery_date < today`.

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind / Vanilla JS)

```javascript
/**
 * Renders a standardized, accessible 3-part status badge.
 * @param {string} status - Raw consignment status code
 * @param {string} [subtext] - Optional metadata (e.g. 'Via Bluedart')
 * @returns {string} HTML string
 */
function renderStatusBadge(status, subtext = '') {
  const configs = {
    PACKED: {
      bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800',
      label: 'PACKED',
      icon: `<svg class="w-3.5 h-3.5 mr-1 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
             </svg>`
    },
    IN_TRANSIT: {
      bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800',
      label: 'IN TRANSIT',
      icon: `<svg class="w-3.5 h-3.5 mr-1 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1m-6 0a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
             </svg>`
    },
    DELIVERED: {
      bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800',
      label: 'DELIVERED',
      icon: `<svg class="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
             </svg>`
    },
    CONFIRMED: {
      bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800',
      label: 'CONFIRMED',
      icon: `<svg class="w-3.5 h-3.5 mr-1 text-indigo-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>`
    },
    EXCEPTION: {
      bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800',
      label: 'EXCEPTION',
      icon: `<svg class="w-3.5 h-3.5 mr-1 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>`
    }
  };

  const cfg = configs[status] || configs.PACKED;

  return `
    <div class="inline-flex flex-col">
      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${cfg.bg} ${cfg.border} ${cfg.text}">
        ${cfg.icon}
        <span>${cfg.label}</span>
      </span>
      ${subtext ? `<span class="mt-0.5 text-2xs text-slate-500 font-mono tracking-tight">${subtext}</span>` : ''}
    </div>
  `;
}
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Courier / SPOC Conflation** | Moving item directly to "Completed" when courier marks delivered, skipping physical count sign-off. | Check dispatch store logic: does `status = 'DELIVERED'` trigger `confirmation_status = 'CONFIRMED'`? | Decouple: `status = 'DELIVERED'` puts item in "Delivered (Awaiting SPOC Sign-off)"; requires manual verification. |
| **Color-Only Encoding** | Green dot with no text or tooltip. | Screen reader check; color-blind simulator (Deuteranopia). | Append explicit text label (`DELIVERED`) and SVG icon. |
| **Washed-Out Pastels** | White text on light green `#86EFAC` background or pale grey text on grey. | Run automated contrast check; ratio < 4.5:1. | Use deep tint (`emerald-800`) on subtle background (`emerald-50`) with border (`emerald-200`). |
| **Missing Delayed State** | Shipment in transit for 14 days without flagging an exception. | Inspect records where `status === 'IN_TRANSIT'` and `expected_date < today`. | Add automatic operational badge: `DELAYED (+X days)` in orange or amber. |

---

## 6. Self-Check Verification Checklist

- [ ] Every status badge has an icon, a semantic border/tint, and an explicit text label.
- [ ] No state is communicated solely by color.
- [ ] Courier `DELIVERED` is strictly decoupled from Venue `SPOC CONFIRMED`.
- [ ] Contrast ratio between badge text and badge background is $\ge 7:1$ (WCAG AAA).
- [ ] Exception and delayed states are clearly flagged with warning badges and actionable resolution paths.
- [ ] State transition buttons (e.g. `Mark Delivered`, `Confirm Physical Receipt`) require confirmation or capture metadata (receiver name, date).
