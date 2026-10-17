---
name: forms-and-data-entry
description: >-
  High-Velocity Form & Data Entry Ergonomics. Use when designing, building, or refactoring
  consignment booking forms, modal inputs, SPOC contact editors, validation states,
  and keyboard navigation.
---

# High-Velocity Form & Data Entry Ergonomics

This skill provides the design patterns for creating frictionless, fast, error-resilient forms tailored for supply chain operators typing hundreds of records.

---

## 1. When to Trigger
- When creating or modifying data entry dialogs (`openDispatchModal()`, `openEditDispatchModal()`, `openDispatchEmailModal()`).
- When designing input validation, phone number formatting, or carrier selection dropdowns.

---

## 2. Core Principles with Exact Values

1. **Top-Aligned Field Labels**:
   - `font-size: 11.5px; font-weight: 700; color: #334155; margin-bottom: 4px; display: block;`
   - Keeps eye travel on a clean vertical line; reduces field completion time by 40% vs left-aligned labels.
2. **Standardized Control Dimensions**:
   - Input Height: `36px` (desktop compact standard).
   - Padding: `0 10px` (`8px 10px` for textareas).
   - Border: `1px solid #CBD5E1; border-radius: 6px; font-size: 12.5px;`.
   - Focus State: `outline: none; border-color: #2563EB; box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);`.
3. **Monospace for Identifiers**:
   - Phone numbers, PIN codes, AWBs, and tracking numbers must use `font-family: var(--mono-font)`.
4. **Validation Timing**:
   - Validate on *blur* (focus departure) or form submit. Never trigger aggressive red errors on keydown while typing.

---

## 3. Do and Don't Examples (Using Real Tool Content)

- **DO**:
  ```html
  <div class="form-group" style="margin-bottom:12px;">
    <label style="display:flex; justify-content:space-between; font-weight:700; font-size:11.5px; color:#334155; margin-bottom:4px;">
      <span>Courier AWB / Docket Number *</span>
      <span style="font-size:11px; color:#64748B; font-weight:normal;">Blue Dart / Trackon format</span>
    </label>
    <input
      type="text"
      id="modal-awb"
      class="form-input"
      placeholder="e.g. 982341092"
      style="font-family:var(--mono-font); font-weight:700;"
      required
    >
  </div>
  ```
- **DON'T**:
  ```html
  <!-- Floating placeholder without persistent label, non-monospace, vague placeholder -->
  <div style="margin:20px;">
    <input type="text" placeholder="AWB here...">
  </div>
  ```

---

## 4. Correct Implementation Pattern (Vanilla JS & HTML)

```javascript
function renderBookingFormFields(selectedDestination) {
  return `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
      <div class="form-group">
        <label style="font-size:11.5px; font-weight:700; color:#334155; margin-bottom:4px; display:block;">
          Courier Partner *
        </label>
        <select id="modal-courier-partner" class="form-input" required>
          <option value="Trackon">Trackon Courier</option>
          <option value="Blue Dart">Blue Dart Express</option>
          <option value="DTDC">DTDC Logistics</option>
          <option value="By Hand">By Hand / Local Delivery</option>
          <option value="Speed Post">India Post (Speed Post)</option>
        </select>
      </div>

      <div class="form-group">
        <label style="font-size:11.5px; font-weight:700; color:#334155; margin-bottom:4px; display:block;">
          Package Box Count *
        </label>
        <select id="modal-box-count" class="form-input" required>
          <option value="1 Box">1 Box (Standard Carton)</option>
          <option value="2 Boxes">2 Boxes</option>
          <option value="3 Boxes">3 Boxes</option>
          <option value="Envelope">Document Envelope</option>
        </select>
      </div>
    </div>
  `;
}
```

---

## 5. Common Mistakes & Detection Guide
- **Vanishing Placeholders**: Relying on input placeholder text instead of top labels. When the operator types, the label vanishes, increasing error rates.
- **Unformatted Phone Inputs**: Accepting random whitespace or punctuation that breaks `tel:` dialer triggers. *Fix*: Normalize phone values with `.replace(/\D/g, '')` before saving.

---

## 6. Self-Check List
- [ ] Do all form inputs have permanent, visible top labels?
- [ ] Are numeric codes (AWB, PIN, phone) formatted in monospace?
- [ ] Is input validation timed to blur/submit rather than premature keydown?
- [ ] Can the entire form be traversed using the `Tab` key without mouse clicks?

---

## 7. Related Links
- Research: [research-C-components-patterns.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/research-C-components-patterns.md)
- Research: [research-D-interaction-quality.md](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/analysis/research-D-interaction-quality.md)
