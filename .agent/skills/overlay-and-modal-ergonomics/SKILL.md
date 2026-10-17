---
name: overlay-and-modal-ergonomics
description: Ergonomics of overlay systems, modal dialogs, slide-out inspection drawers, toasts, focus trapping, dirty-state protection, and Escape key lifecycle.
---

# Overlay and Modal Ergonomics Architecture

This skill governs the architecture, focus lifecycle, keyboard interactions, and visual containment of modal dialogs, slide-out inspection drawers, popovers, and toast notifications. It prevents accidental data loss from backdrop clicks, trapped keyboard focus, and viewport overflow clipping.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or implementing modal dialogs (e.g. Operations Summary Briefing, Dispatch Detail, Add Station).
- Building slide-out inspection drawers (e.g. Station SPOC & Address Inspector).
- Implementing toast notifications or system alerts.
- Managing keyboard focus traps, backdrop overlays, or `Escape` key listeners.
- Handling dirty-form protection during dialog dismissal.

---

## 2. Core Principles & Decision Matrix

### A. Overlay Type Decision Matrix

| Overlay Type | Best For | Max Width | Backdrop Dismiss | Dismiss Key |
|---|---|---|---|---|
| **Modal Dialog (Standard)** | Focused actions, destructive confirmations, quick form entries (< 6 fields). | `max-w-lg` (`512px`) | Yes (if form pristine) | `Escape` |
| **Modal Dialog (Data-Heavy)** | Operations Summary Briefing, multi-tab audit matrices, packaging previews. | `max-w-6xl` (`1152px`) | Prompt if dirty | `Escape` |
| **Slide-Out Drawer** | Deep inspection of an entity while retaining background page context (e.g. Station Dossier). | `w-[480px]` | Yes | `Escape` |
| **Popover** | Contextual menus, column visibility toggles, date pickers. | `w-64` to `w-80` | Yes (Click outside) | `Escape` |
| **Toast Notification** | Ephemeral asynchronous confirmation (e.g. "Consignment STN-042 saved"). | `max-w-sm` | Auto-dismiss (4s) | Manual Close `x` |

### B. The 5 Rules of Enterprise Modal Ergonomics
1. **Focus Trap**: When a modal opens, keyboard focus must move immediately into the first interactive element inside the modal. Tabbing must cycle exclusively within the modal.
2. **Focus Return**: When the modal closes, focus **must** return to the exact button or element that triggered it.
3. **Sticky Header and Sticky Action Footer**: The modal title and the action buttons (`Cancel`, `Confirm`) must never scroll out of view when viewing large datasets. Only the body content scrolls (`overflow-y-auto max-h-[calc(85vh-120px)]`).
4. **Accidental Click Protection (Dirty Check)**: If the user has entered data in an unsubmitted form, clicking the backdrop overlay must **NOT** silently close the modal and wipe their changes. It must either be blocked or prompt for confirmation.
5. **Escape Key Parity**: Pressing `Escape` must dismiss the modal immediately (subject to dirty checking).

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't allow the Operations Summary Briefing modal to stretch beyond the viewport** on laptops, hiding the close button off-screen.
- **Don't use full-screen takeover modals for simple 2-field status updates** (e.g. marking a shipment delivered).
- **Don't trigger 5 stacked toast notifications** that cover the table action buttons.
- **Don't forget to restore background scrolling** when a modal closes (`document.body.classList.remove('overflow-hidden')`).

### Do:
- **Do lock the Operations Summary Briefing modal header** containing the wave tabs (W1, W2, W3, W4) so they stay visible while scrolling through 121 station rows.
- **Do provide an explicit, high-contrast close button (`x`)** in the top-right corner with `aria-label="Close dialog"`.
- **Do trap focus inside confirmation modals** so pressing `Enter` triggers the primary action and `Escape` cancels.
- **Do stack toasts in the bottom-right corner** with a maximum of 3 concurrent toasts, auto-dismissing after 4,000ms.

---

## 4. Correct-Pattern Code Snippet (Vanilla JS & HTML)

```html
<!-- AUTHORITATIVE MODAL STRUCTURE WITH STICKY HEADER & FOOTER -->
<div id="modal-container" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity hidden"
     role="dialog" aria-modal="true" aria-labelledby="modal-title">
  
  <div class="relative w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
    
    <!-- 1. Sticky Header (Zero Scroll) -->
    <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
      <div>
        <h2 id="modal-title" class="text-base font-bold text-slate-900">
          Station Dispatch Dossier: STN-017-042
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">Kanpur Central Arena &bull; Wave 2 Logistics Manifest</p>
      </div>
      <button id="modal-close-btn" class="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Close dialog">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 2. Scrollable Body Content -->
    <div class="px-6 py-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
      <!-- High-density audit or form fields -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Courier Partner</label>
          <input type="text" value="Bluedart Express" class="w-full h-9 px-3 border border-slate-300 rounded text-xs bg-slate-50" readonly>
        </div>
        <div>
          <label class="block text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Tracking Consignment AWB</label>
          <input type="text" value="39482019482" class="w-full h-9 px-3 border border-slate-300 rounded font-mono text-xs bg-slate-50" readonly>
        </div>
      </div>
    </div>

    <!-- 3. Sticky Action Footer (Zero Scroll) -->
    <div class="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
      <span class="text-2xs text-slate-500 font-mono">Last updated: 12-Oct 14:10 IST</span>
      <div class="flex items-center space-x-2">
        <button id="modal-cancel-btn" class="h-9 px-3.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-2xs">
          Cancel
        </button>
        <button id="modal-save-btn" class="h-9 px-4 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-2xs">
          Save Changes
        </button>
      </div>
    </div>

  </div>
</div>
```

```javascript
/**
 * Production Modal Controller with focus management and backdrop safety.
 */
class EnterpriseModalController {
  constructor(modalId, triggerElement) {
    this.modal = document.getElementById(modalId);
    this.trigger = triggerElement;
    this.isDirty = false;
    this.boundKeyHandler = this.handleKeyDown.bind(this);
  }

  open() {
    this.modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', this.boundKeyHandler);
    
    // Focus first interactive element inside modal
    const focusable = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
  }

  close(force = false) {
    if (!force && this.isDirty) {
      if (!confirm('You have unsaved changes. Discard and close?')) return;
    }
    this.modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', this.boundKeyHandler);
    
    // Return focus to trigger element
    if (this.trigger) this.trigger.focus();
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
    if (e.key === 'Tab') {
      // Focus trapping
      const focusables = Array.from(this.modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
}
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Scrolling Off-Screen** | Modal buttons or header scroll out of view when modal content is tall. | Open modal on small laptop screen (768px height); inspect if action buttons disappear. | Wrap modal in `flex flex-col max-h-[85vh]` with `flex-shrink-0` header/footer and `overflow-y-auto` body. |
| **Accidental Dismissal** | User spends 2 minutes filling in courier tracking, clicks 5px outside modal, and form closes with all data wiped. | Click backdrop overlay during active form entry. | Add dirty-state verification before backdrop dismiss. |
| **Lost Focus** | Pressing `Escape` closes modal, but keyboard focus jumps to top `<body>` instead of the trigger button. | Press `Tab` after closing modal; observe where focus box lands. | Store trigger element and call `triggerElement.focus()` in close lifecycle. |
| **Double Scrollbars** | Both modal body and outer page scroll simultaneously. | Scroll modal content; verify if page background moves. | Add `overflow-hidden` to `document.body` while modal is active. |

---

## 6. Self-Check Verification Checklist

- [ ] Modal header and action buttons are sticky and never scroll out of view.
- [ ] Modal body uses `max-h-[85vh] overflow-y-auto` for smooth contained scrolling.
- [ ] Keyboard focus is trapped within modal while open and restored to trigger on close.
- [ ] Pressing `Escape` closes the modal cleanly.
- [ ] Background body scroll is disabled while overlay is active.
- [ ] Unsaved form inputs are protected from accidental backdrop dismissal.
- [ ] Screen readers announce dialog with `role="dialog"` and `aria-labelledby`.
