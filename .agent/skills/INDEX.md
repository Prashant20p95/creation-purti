# Enterprise UI/UX Design System Skill Library Index

This directory contains the authoritative, production-grade UI/UX design architecture and skill library for the enterprise dispatch and event operations platform.

Every skill is tailored to the project's actual technology stack (**FastAPI + Vanilla ES6 JavaScript + Tailwind CSS Utility Architecture + SQLite WAL Data Layer**), adhering to senior human design craft, high-density ergonomics, and zero AI-template clichés.

---

## The Master Execution Workflow

Before writing or modifying any UI/UX code in this project, **every future agent must follow the mandatory 4-step workflow defined in `ui-ux-master-playbook`**:

```
+-----------------------------------------------------------------------------------+
|                           MANDATORY EXECUTION ORDER                               |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  Step 1: Read Architecture Analysis                                               |
|  (.agent/analysis/00-overview.md and corresponding module analysis file)          |
|                                                                                   |
|                                  ▼                                                |
|                                                                                   |
|  Step 2: Select & Read Governing Skills from this Index                           |
|  (Always combine ui-ux-master-playbook + 1 Module Skill + relevant Craft Skills)   |
|                                                                                   |
|                                  ▼                                                |
|                                                                                   |
|  Step 3: Implement Using Exact Tokens & Stack Patterns                            |
|  (90/10 slate palette, tabular numerals, 2-tier button hierarchy, 3-part badges)  |
|                                                                                   |
|                                  ▼                                                |
|                                                                                   |
|  Step 4: Execute Self-Check Checklist                                             |
|  (Verify against the self-check criteria in each applied skill)                   |
+-----------------------------------------------------------------------------------+
```

---

## Complete Catalog of Skills

### 1. Master Playbook
| Skill | Trigger / When to Use | Key Coverage |
|---|---|---|
| [`ui-ux-master-playbook`](./ui-ux-master-playbook/SKILL.md) | **MANDATORY FIRST STEP** before touching any front-end template, style, or script. | 4-step execution order, anti-AI checklist, stack constraints, domain invariant enforcement. |

---

### 2. General Craft Skills (Foundations, Patterns & Ergonomics)
| Skill | Trigger / When to Use | Key Coverage |
|---|---|---|
| [`visual-hierarchy-and-density`](./visual-hierarchy-and-density/SKILL.md) | Designing page shells, grids, toolbars, or resolving crowded/messy layouts. | 4px/8px geometric scale, `max-w-[1600px]` bounds, 60-30-10 visual weight, density modes. |
| [`data-table-architecture`](./data-table-architecture/SKILL.md) | Designing data grids, tabular lists, column alignment, or summary footers. | Column alignment rules, sticky headers, live summary `<tfoot>`, zero horizontal scroll jitter. |
| [`forms-and-data-entry`](./forms-and-data-entry/SKILL.md) | Creating or editing form inputs, dispatch dialogs, validation, or destructive buttons. | Top-aligned labels, blur validation, monospace inputs, 2-stage destructive confirmations. |
| [`status-systems-and-states`](./status-systems-and-states/SKILL.md) | Displaying consignment states, delivery status, badges, or progress bars. | 3-part badges (icon + tint + text), Courier vs SPOC sign-off decoupling, WCAG AAA contrast. |
| [`dashboard-and-kpi-design`](./dashboard-and-kpi-design/SKILL.md) | Designing executive dashboards, KPI cards, parity tickers, or status feeds. | Action-first metrics, 4 hero cards, 1:1 collateral parity ledger, honest data visualization. |
| [`typography-and-tabular-figures`](./typography-and-tabular-figures/SKILL.md) | Rendering numbers, metrics, dates, tracking numbers, or bilingual Hindi labels. | Inter + IBM Plex Mono pairing, `tabular-nums` (`tnum`), `DD-MMM-YYYY` dates, Devanagari headroom. |
| [`color-tokens-and-contrast`](./color-tokens-and-contrast/SKILL.md) | Styling surfaces, borders, buttons, or auditing contrast and color-blind safety. | 90/10 slate/white rule, semantic palette, WCAG AA/AAA ratios, eliminating neon gradients. |
| [`overlay-and-modal-ergonomics`](./overlay-and-modal-ergonomics/SKILL.md) | Building modals, drawers, toasts, popovers, or handling dialog lifecycles. | Focus trapping, Escape dismissal, backdrop click safety, sticky modal headers/footers. |
| [`microcopy-and-professional-tone`](./microcopy-and-professional-tone/SKILL.md) | Writing UI labels, buttons, errors, empty states, or eliminating marketing fluff. | Direct operational voice, specific action verbs (`[Mark Delivered]`), domain terminology. |
| [`keyboard-and-accessibility`](./keyboard-and-accessibility/SKILL.md) | Adding hotkeys, focus rings, ARIA roles, or auditing WCAG 2.2 AA accessibility. | `/` search hotkey, `Esc` dismiss, `focus-visible:ring-2`, screen-reader text, 44px tap targets. |
| [`print-and-label-design`](./print-and-label-design/SKILL.md) | Designing shipping labels, carton tags, A4 manifests, or `@media print` rules. | 6-line Indian postal format, 4x6 thermal dimensions, box serialization (`BOX X OF Y`), pure black print. |
| [`mobile-and-field-readiness`](./mobile-and-field-readiness/SKILL.md) | Optimizing mobile/tablet viewports, field unboxing screens, or outdoor readability. | 44px touch targets, mobile thumb zone, responsive table-to-card transformation, `tel:` dialer. |

---

### 3. Module-Specific Skills (Tool Subsystems)
| Skill | Trigger / When to Use | Key Coverage |
|---|---|---|
| [`module-dashboard-craft`](./module-dashboard-craft/SKILL.md) | Working on `/` or `/dashboard` executive cockpit. | Single-viewport layout, 4 hero KPI cards, collateral parity strip, live WAL sync badge. |
| [`module-dispatch-pipeline`](./module-dispatch-pipeline/SKILL.md) | Working on `/dispatch` Kanban board or tabular pipeline. | Dual Kanban/Table toggle, 5-segment macro ribbon, 2-tier button hierarchy, delivery modal. |
| [`module-station-roster`](./module-station-roster/SKILL.md) | Working on `/stations` venue and SPOC directory. | 121 station inventory, weekly waves (W1–W4), SPOC contact directory, address verification tags. |
| [`module-labels-and-printing`](./module-labels-and-printing/SKILL.md) | Working on `/labels` box and carton printing engine. | WYSIWYG preview canvas, 4x6 thermal templates, multi-box carton breakdown, batch printing. |
| [`module-datastore-inspector`](./module-datastore-inspector/SKILL.md) | Working on `/datastore` or database administrative views. | SQLite WAL diagnostics, 22-table record count matrix, automated database backup download. |
| [`module-operations-summary`](./module-operations-summary/SKILL.md) | Working on Operations Summary Briefing or audit modal. | 1,815-cell audit matrix, dual freeze panes, 100% mathematical parity verification proofs. |
| [`module-communications-outmail`](./module-communications-outmail/SKILL.md) | Working on delivery intimations, emails, or WhatsApp copy. | Official Outmail email formatting, structured WhatsApp copy, unboxing instructions, preview modal. |

---

## Cross-Skill Synergy Guide

When working on a specific user request, always combine the relevant module skill with the appropriate foundational craft skills:

| Task / Feature Request | Primary Module Skill | Governing Craft Skills |
|---|---|---|
| *"Fix the messy dispatch pipeline and align the table"* | `module-dispatch-pipeline` | `data-table-architecture`, `status-systems-and-states`, `visual-hierarchy-and-density` |
| *"Clean up crowded dashboard and simplify layout"* | `module-dashboard-craft` | `dashboard-and-kpi-design`, `color-tokens-and-contrast`, `typography-and-tabular-figures` |
| *"Implement delivery mark and Outmail dispatch"* | `module-communications-outmail` | `status-systems-and-states`, `overlay-and-modal-ergonomics`, `forms-and-data-entry` |
| *"Add weekly wave tabs and fix SPOC phone calling"* | `module-station-roster` | `mobile-and-field-readiness`, `keyboard-and-accessibility`, `microcopy-and-professional-tone` |
| *"Print carton labels without clipping margins"* | `module-labels-and-printing` | `print-and-label-design`, `typography-and-tabular-figures` |
| *"Audit database table counts and backup"* | `module-datastore-inspector` | `data-table-architecture`, `status-systems-and-states` |
| *"Show 1,815-cell collateral parity summary"* | `module-operations-summary` | `data-table-architecture`, `overlay-and-modal-ergonomics`, `typography-and-tabular-figures` |
