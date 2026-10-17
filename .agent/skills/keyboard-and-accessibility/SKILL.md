---
name: keyboard-and-accessibility
description: Keyboard navigation architecture, global hotkeys (/ and Esc), visible focus rings, ARIA roles, WCAG 2.2 Level AA compliance, and screen-reader semantics.
---

# Keyboard Navigation and Accessibility Architecture

This skill governs keyboard interaction design, focus ring ergonomics, screen-reader accessibility, and WCAG 2.2 Level AA compliance across the application. It ensures high-velocity keyboard operation for daily warehouse power users and accessibility for operators using assistive technologies.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Adding or modifying interactive controls (buttons, inputs, links, tabs, dropdowns).
- Implementing global keyboard shortcuts (e.g. `/` for search, `Esc` for dismissal).
- Removing or customizing default browser focus rings.
- Building custom interactive widgets (modals, drawers, tabs, segmented pills).
- Auditing the interface for WCAG 2.2 AA compliance.

---

## 2. Core Principles & Exact Design Standards

### A. The 2 Essential Global Keyboard Hotkeys
Warehouse and dispatch operators process hundreds of dispatches per hour and should rarely need to reach for a mouse:
1. **`/` Key (Slash)**: Immediately focuses the primary filter/search input on any data table view. Automatically scrolls the search bar into view and selects existing query text.
2. **`Esc` Key (Escape)**: Immediately dismisses any active modal, inspection drawer, popover, or clears an active search filter.

### B. The Visible Focus Ring Mandate
Never remove focus rings with `outline: none` without providing an immediate high-contrast replacement. In dark-table or high-contrast enterprise views, focus must be unmistakably visible:
- **Tailwind Focus Class**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white`.
- **Contrast Requirement**: Focus ring must have $\ge 3:1$ contrast against both the component and the background canvas.

### C. ARIA Roles & Screen Reader Semantics

| Component | Required ARIA Attributes | Keyboard Behavior |
|---|---|---|
| **Modal Dialog** | `role="dialog"` `aria-modal="true"` `aria-labelledby="[id]"` | Focus trapped inside; `Esc` closes; focus restored to trigger. |
| **Data Table** | Native `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<th scope="col">` | Screen reader announces column headers when navigating cells. |
| **Sortable Header** | `aria-sort="ascending"` / `"descending"` / `"none"` | `Enter` or `Space` toggles sort direction. |
| **Collapsible Drawer** | `aria-expanded="true/false"` `aria-controls="[id]"` | `Enter` toggles; `Esc` collapses. |
| **Status Badge** | `role="status"` or paired with `<span class="sr-only">Status:</span>` | Announces full state label, not just raw code. |

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't use `outline: none` or `outline: 0` without a ring replacement**, making the interface impossible to navigate via `Tab`.
- **Don't build click-only table action buttons** (`<div onclick="...">Edit</div>`) that cannot be focused or activated via `Enter` or `Space`.
- **Don't intercept the `/` hotkey while the user is actively typing in a text field or textarea**.
- **Don't rely solely on colored icons for screen readers** without descriptive `aria-label` or `.sr-only` text.

### Do:
- **Do provide a visible `[ / ]` keyboard shortcut badge** inside the search input placeholder to teach power users the shortcut.
- **Do ensure all icon buttons have an explicit `aria-label`** (e.g. `<button aria-label="Mark STN-042 Delivered">`).
- **Do ensure all interactive click targets meet the minimum 44x44px touch bounding area** for tablet/field users.
- **Do support `Tab` cycling through all table row action buttons** in logical left-to-right order.

---

## 4. Correct-Pattern Code Snippet (HTML / Vanilla JS)

```html
<!-- AUTHORITATIVE SEARCH BAR WITH KEYBOARD HOTKEY & ACCESSIBLE FOCUS -->
<div class="relative flex items-center">
  <input 
    type="search" 
    id="global-table-search"
    placeholder="Filter 121 stations by city, SPOC, tracking #..." 
    class="w-full h-9 pl-9 pr-12 text-xs bg-white border border-slate-300 rounded-md shadow-2xs 
           text-slate-900 placeholder:text-slate-400
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 focus-visible:border-blue-600"
    aria-label="Filter stations table">
  
  <!-- Magnifying Glass Icon -->
  <svg class="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>

  <!-- Keyboard Hotkey Badge Indicator -->
  <div class="absolute right-2.5 pointer-events-none flex items-center">
    <kbd class="px-1.5 py-0.5 text-2xs font-mono font-semibold text-slate-500 bg-slate-100 border border-slate-300 rounded shadow-2xs">
      /
    </kbd>
  </div>
</div>
```

```javascript
/**
 * Global Keyboard Hotkey Manager for Enterprise Dispatch
 */
document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement.tagName.toLowerCase();
  const isInputActive = activeTag === 'input' || activeTag === 'textarea' || document.activeElement.isContentEditable;

  // 1. Slash Hotkey (/) -> Focus Primary Search
  if (e.key === '/' && !isInputActive) {
    e.preventDefault();
    const searchInput = document.getElementById('global-table-search');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
    return;
  }

  // 2. Escape Key (Esc) -> Dismiss Search or Overlays
  if (e.key === 'Escape') {
    if (document.activeElement && document.activeElement.id === 'global-table-search') {
      document.activeElement.value = '';
      document.activeElement.blur();
      // Dispatch input event to clear filtered table view
      document.activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
});
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Invisible Keyboard Focus** | Tabbing through the page shows zero visual indication of where the cursor is. | Press `Tab` repeatedly; see if outline vanishes. | Add `focus-visible:ring-2 focus-visible:ring-blue-600` to all interactive styles. |
| **Unlabelled Icon Buttons** | Screen reader announces "Button" with no context for action icons. | Check HTML: `<button><svg>...</svg></button>` lacking text. | Add `aria-label="Download CSV"` or `<span class="sr-only">Download CSV</span>`. |
| **Keyboard Trap in Table** | Tabbing gets stuck inside an infinite pagination script or iframe. | Navigate table using only `Tab` and `Shift+Tab`. | Fix tab indexes; use standard DOM table order with `tabindex="0"`. |
| **HotKey Hijacking** | Typing a slash (`/`) inside a remarks input triggers table filter focus. | Type `Remarks / Notes` in a form field. | Verify handler checks `!isInputActive` before calling `e.preventDefault()`. |

---

## 6. Self-Check Verification Checklist

- [ ] Every interactive element has a visible, high-contrast focus ring (`ring-2 ring-blue-600`).
- [ ] Pressing `/` outside of input fields immediately focuses the table search bar.
- [ ] Pressing `Esc` clears search or closes any open modal/drawer.
- [ ] All icon-only buttons include descriptive `aria-label` attributes.
- [ ] Interactive controls use semantic HTML (`<button>`, `<a>`, `<input>`) instead of clickable `<div>` elements.
- [ ] Data tables use proper `scope="col"` headers and `role="status"` badges.
- [ ] Minimum interactive tap targets meet `44x44px` on mobile/tablet viewports.
