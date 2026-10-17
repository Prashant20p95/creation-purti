---
name: color-tokens-and-contrast
description: Design system color tokens, strict 90/10 neutral-to-semantic restraint, WCAG AA/AAA contrast ratios, color-blind safety, and elimination of AI-template neon gradients.
---

# Color Tokens, Semantic Palettes, and Contrast Architecture

This skill defines the color architecture, semantic tokens, contrast ratios, and visual restraint standards for the application. It prevents the garish, saturated "AI template" look (purple glows, neon gradients, rainbow cards) and establishes a calm, professional, high-legibility enterprise canvas.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Defining or editing CSS variables, color utility classes, or theme tokens.
- Styling backgrounds, borders, cards, badges, buttons, or typography.
- Checking contrast compliance for low-vision users or warehouse monitors.
- Refactoring interfaces that feel "too colorful", "unprofessional", or "distracting".
- Introducing new status alerts, indicators, or action highlights.

---

## 2. Core Principles & Exact Design Tokens

### A. The 90 / 10 Neutral-to-Semantic Discipline
High-density logistics interfaces require rigorous restraint:
- **90% Neutral Slate Canvas**: Backgrounds (`#F8FAFC`, `#FFFFFF`), structural borders (`#E2E8F0`, `#CBD5E1`), text hierarchy (`#0F172A`, `#334155`, `#64748B`).
- **10% Semantic Accent Budget**: Color is strictly functional—reserved for state changes, critical warnings, and primary action buttons. If everything is colorful, nothing has priority.

### B. Standard Enterprise Color Token System

```css
:root {
  /* --- NEUTRAL SLATE CANVAS (90%) --- */
  --bg-app:          #F8FAFC; /* slate-50 */
  --bg-surface:      #FFFFFF; /* white */
  --bg-subtle:       #F1F5F9; /* slate-100 */
  --bg-hover:        #F8FAFC; /* slate-50/80 */
  
  --border-hairline: #E2E8F0; /* slate-200 */
  --border-strong:   #CBD5E1; /* slate-300 */
  --border-focus:    #2563EB; /* blue-600 */

  --text-primary:    #0F172A; /* slate-900 (Contrast 16:1 against white) */
  --text-secondary:  #334155; /* slate-700 (Contrast 9.5:1 against white) */
  --text-muted:      #64748B; /* slate-500 (Contrast 4.6:1 against white - WCAG AA) */
  --text-subtle:     #94A3B8; /* slate-400 (Only for non-text borders/decorations) */

  /* --- SEMANTIC TOKENS (10% FUNCTIONAL) --- */
  /* Primary Action & Information (Cobalt) */
  --color-primary:       #2563EB; /* blue-600 */
  --color-primary-hover: #1D4ED8; /* blue-700 */
  --color-primary-subtle:#EFF6FF; /* blue-50 */
  --color-primary-border:#BFDBFE; /* blue-200 */

  /* In Transit & Warning (Amber) */
  --color-warning:       #D97706; /* amber-600 */
  --color-warning-text:  #B45309; /* amber-700 */
  --color-warning-subtle:#FFFBEB; /* amber-50 */
  --color-warning-border:#FDE68A; /* amber-200 */

  /* Courier Delivered & Success (Emerald) */
  --color-success:       #059669; /* emerald-600 */
  --color-success-text:  #047857; /* emerald-700 */
  --color-success-subtle:#ECFDF5; /* emerald-50 */
  --color-success-border:#A7F3D0; /* emerald-200 */

  /* SPOC Verification & Integrity (Indigo) */
  --color-verify:        #4F46E5; /* indigo-600 */
  --color-verify-text:   #4338CA; /* indigo-700 */
  --color-verify-subtle: #EEF2FF; /* indigo-50 */
  --color-verify-border: #C7D2FE; /* indigo-200 */

  /* Delayed, Exception & Destructive (Crimson) */
  --color-danger:        #DC2626; /* red-600 */
  --color-danger-text:   #B91C1C; /* red-700 */
  --color-danger-subtle: #FEF2F2; /* red-50 */
  --color-danger-border: #FECACA; /* red-200 */
}
```

### C. Contrast Compliance Targets
- **Critical Text & Numbers**: Contrast ratio $\ge 7:1$ (WCAG AAA).
- **Secondary Text & Labels**: Contrast ratio $\ge 4.5:1$ (WCAG AA).
- **Interactive Component Borders & Focus Rings**: Contrast ratio $\ge 3:1$ against adjacent background.

### D. Color-Blind Safe Encoding (Deuteranopia & Protanopia)
Red-green color blindness affects ~8% of males. Never use a bare red dot next to a green dot without secondary cues:
- Emerald (Delivered) is paired with a checkmark icon `✓`.
- Crimson (Exception/Delayed) is paired with an alert octagon icon `!`.
- Amber (In Transit) is paired with a truck icon `🚚`.

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't use saturated purple-to-pink gradient banners** (`bg-gradient-to-r from-purple-600 to-indigo-600`) as headers or card backgrounds. This is the #1 dead giveaway of an AI template.
- **Don't use colored backgrounds for entire table rows** (e.g. coloring the whole `<tr>` bright green for delivered). It overwhelms the eyes when looking at 100 rows.
- **Don't use light gray text `#94A3B8` (slate-400) for essential labels or numbers**—it fails WCAG AA on white backgrounds.
- **Don't use neon glow effects** (`box-shadow: 0 0 15px rgba(59, 130, 246, 0.5)`).

### Do:
- **Do use a clean, crisp `#FFFFFF` surface** bounded by a 1px `#E2E8F0` hairline border for cards and data tables.
- **Do tint only the status badge** (`bg-emerald-50 text-emerald-800 border-emerald-200`), leaving the row white or subtle hover-slate.
- **Do use dark slate `#0F172A` for primary quantities** (`242,546`) and medium slate `#334155` for table cells.
- **Do give primary action buttons high-contrast solid fill** (`bg-blue-600 hover:bg-blue-700 text-white shadow-2xs`).

---

## 4. Correct-Pattern Code Snippet (HTML / Tailwind CSS)

```html
<!-- AUTHORITATIVE HIGH-CONTRAST DATA ACTION CARD -->
<div class="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
  <div class="flex items-start justify-between">
    <div>
      <span class="text-2xs font-semibold text-slate-500 uppercase tracking-wider">
        Central Dispatch Hub
      </span>
      <h3 class="text-base font-bold text-slate-900 mt-0.5">
        Wave 2 Priority Consignments
      </h3>
    </div>
    
    <!-- Semantic Badge with WCAG AAA Contrast -->
    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
      <svg class="w-3.5 h-3.5 mr-1 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Awaiting Carrier
    </span>
  </div>

  <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
    <div class="text-slate-600 font-mono">
      <span class="text-slate-900 font-bold">34</span> / 121 Stations Ready
    </div>
    <div class="flex items-center space-x-2">
      <!-- Restrained Secondary Button -->
      <button class="h-8 px-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors">
        Audit Manifest
      </button>
      <!-- High-Contrast Primary Action -->
      <button class="h-8 px-3 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 shadow-2xs transition-colors">
        Generate Courier Labels
      </button>
    </div>
  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **AI Purple Gradient** | Page header or cards have `background: linear-gradient(135deg, #6366F1, #A855F7)`. | Grep codebase for `gradient-to-r` or `linear-gradient`. | Replace with clean white surface `bg-white border border-slate-200`. |
| **Low Contrast Subtext** | Labels or timestamps use `#94A3B8` (slate-400) or lighter. | Run Lighthouse / axe accessibility audit; contrast < 4.5:1. | Upgrade to `--text-muted: #64748B` (slate-500, ratio 4.6:1) or `#334155`. |
| **Rainbow Table Rows** | Table looks like confetti because every row is tinted a different bright color. | Visual inspection; `<tr>` has `bg-green-100`, `bg-red-100`, etc. | Keep table row neutral white; confine color strictly to the 3-part status badge. |
| **Glow Effect Shadows** | Buttons or cards have neon outer glows (`shadow-blue-500/50`). | Search for `shadow-*-500/*` or `drop-shadow`. | Replace with crisp 1px border `border-slate-200` and hairline shadow `shadow-2xs`. |

---

## 6. Self-Check Verification Checklist

- [ ] Canvas adheres to the 90/10 rule (90% neutral slate/white, 10% functional semantic color).
- [ ] No neon gradients, glow effects, or decorative saturated card backgrounds.
- [ ] All body and tabular text achieves $\ge 4.5:1$ contrast against backgrounds.
- [ ] Primary numbers and critical statuses achieve $\ge 7:1$ contrast.
- [ ] Status indicators are never communicated solely by color (always pair with icon + text).
- [ ] Borders are clean 1px hairlines (`#E2E8F0` / `#CBD5E1`), not heavy decorative dividers.
