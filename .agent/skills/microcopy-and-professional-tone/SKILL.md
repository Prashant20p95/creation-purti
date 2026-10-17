---
name: microcopy-and-professional-tone
description: Authoritative business microcopy, precise operational terminology, action-oriented button verbs, actionable error writing, and elimination of generic AI marketing fluff.
---

# Microcopy, Operational Voice, and Professional Tone

This skill governs the written voice, UI labels, button microcopy, notification text, and error descriptions across the platform. It eliminates vague AI marketing phrases ("streamline effortlessly", "empower your operations"), ambiguous generic buttons ("Submit", "OK"), and establishes a crisp, respectful, human-engineered business voice.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Writing or editing button labels, page headers, or section subtexts.
- Writing form field labels, placeholder text, or help tooltips.
- Drafting error messages, empty state descriptions, or confirmation prompts.
- Authoring email or WhatsApp templates (Outmail dispatch notifications).
- Refactoring interfaces that sound robotic, marketing-heavy, or AI-generated.

---

## 2. Core Principles & Domain Vocabulary

### A. The 4 Rules of Enterprise Logistics Voice
1. **Be Plain and Direct**: State the facts immediately. Avoid buzzwords ("seamless", "game-changing", "effortless", "holistic").
2. **Specific Action Verbs**: Buttons must explicitly state the outcome. Never use bare words like "Submit", "Proceed", or "OK". Use `[Mark Consignment In-Transit]`, `[Export Manifest CSV]`, `[Sign Off Physical Count]`.
3. **Actionable Error Messages**: An error message must tell the operator (a) what failed, (b) why it failed, and (c) the exact action required to fix it.
4. **Standardized Domain Vocabulary**:

| Banned Generic / E-Commerce Term | Mandatory Enterprise Domain Term | Definition in System |
|---|---|---|
| *Customer / Buyer* | **Station SPOC / Venue Coordinator** | Physical receiving personnel at destination venue. |
| *Product / Item / Stock* | **Collateral (Badge, Coupon, Lanyard, Pass)** | Event access and meal credential inventory. |
| *Order / Cart* | **Consignment / Dispatch Manifest** | Specific boxed physical shipment to a station. |
| *Shipping Address* | **Destination Station Delivery Venue** | Physical loading gate or building in the roster. |
| *Tracking Link* | **Courier Consignment AWB #** | Air Waybill number with courier provider. |

### B. AI Copy vs Human Enterprise Copy Comparison

| Interface Element | AI-Template Generated Copy (BANNED) | Human Enterprise Master Copy (MANDATORY) |
|---|---|---|
| **Empty Search State** | *"Oops! We couldn't find any magical matches. Try exploring other exciting keywords!"* | *"No stations match 'Nagpur'. Check spelling or clear filters to view all 121 stations."* |
| **API Error Message** | *"Something went wrong! Please try again later or contact our awesome support team."* | *"Failed to save tracking number for STN-042. Courier AWB must be between 9 and 14 digits."* |
| **Delete Confirmation** | *"Are you sure you want to proceed with this action? This cannot be undone."* | *"Delete Consignment STN-017-088? This removes the tracking record for 1,200 badges."* |
| **Export Action** | *"Download Awesome Report"* | *"Download Dispatch Manifest (CSV &bull; 121 Stations)"* |
| **Dashboard Subtitle** | *"Effortlessly manage your next-generation events with AI-powered clarity."* | *"Event 17: Central hub packing status and station collateral verification ledger."* |

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't use placeholder text as labels** (e.g. putting "Enter SPOC phone number" inside the input box and omitting the label). Placeholders vanish once typing starts.
- **Don't write conversational filler** ("Hey there! Welcome back to your dashboard!").
- **Don't use emoji in operational buttons** (e.g. `🚀 Ship Now!`, `📦 Pack Items!`, `🔥 Hot Alert`). Use standardized monochrome SVG icons.
- **Don't blame the user for validation errors** ("You entered an invalid PIN code!"). State the format requirement neutrally: *"PIN code must be a 6-digit Indian postal code (e.g. 110001)."*

### Do:
- **Do explicitly display unit labels** (`121 Stations`, `2,42,546 Collaterals`, `34 Boxes`).
- **Do write destructive action buttons in explicit warning verbs** (`[Delete Station STN-042]`, `[Cancel Consignment]`).
- **Do provide exact physical unboxing instructions in SPOC Outmails** (e.g. *"Please inspect outer courier tape before signing delivery run sheet"*).
- **Do explain permission denials transparently** (*"Only Warehouse Logistics Admins can modify dispatched AWB tracking codes"*).

---

## 4. Correct-Pattern Code Snippet (HTML / Jinja)

```html
<!-- AUTHORITATIVE DESTRUCTIVE CONFIRMATION MODAL WITH SPECIFIC MICROCOPY -->
<div class="p-6 space-y-4">
  <div class="flex items-start space-x-3">
    <div class="p-2 rounded-full bg-red-100 text-red-600 flex-shrink-0">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div>
      <h3 class="text-base font-bold text-slate-900">
        Reset Consignment Status: STN-017-042?
      </h3>
      <p class="text-xs text-slate-600 mt-1 leading-relaxed">
        This will revert the consignment for <strong class="text-slate-900">Kanpur Central Arena</strong> from 
        <span class="font-semibold text-amber-700">IN TRANSIT</span> back to <span class="font-semibold text-blue-700">PACKED</span>. 
        Active courier tracking for Bluedart AWB <code class="font-mono bg-slate-100 px-1 py-0.5 rounded text-2xs">394820194</code> will be unlinked.
      </p>
    </div>
  </div>

  <div class="p-3 bg-amber-50 border border-amber-200 rounded-md text-2xs text-amber-900 leading-normal">
    <strong>Notice:</strong> If the carrier has already picked up these 4 boxes from the central hub, reverting this status will cause tracking desynchronization with station coordinators.
  </div>

  <div class="flex items-center justify-end space-x-2 pt-2">
    <button type="button" class="h-9 px-3.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
      Keep In Transit
    </button>
    <button type="button" class="h-9 px-4 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 shadow-2xs">
      Revert to Packed
    </button>
  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **AI Buzzword Copy** | UI copy contains words like "magical", "seamless", "effortless", "supercharge". | Search codebase for string literals containing buzzwords. | Rewrite in factual operational language ("121 stations loaded", "Manifest exported"). |
| **Generic "Submit" Buttons** | Every form button says "Submit" or "Save". | Grep templates for `<button>Submit</button>`. | Replace with specific verb phrase: `Save Station Changes`, `Create Consignment`. |
| **Robotic Error Texts** | Messages like `Error 500: Internal server error` or `Failed to fetch`. | Grep for raw JS error alerts or unparsed API catch blocks. | Map errors to clear operator instructions: *"Database lock encountered. Please retry in 5 seconds."* |
| **Emoji Clutter** | Page headers and buttons look like a messaging app (`📦 Packing List 🚀`). | DOM search for unicode emoji ranges. | Strip emoji; use clean, single-color SVG icons from Heroicons or Lucide. |

---

## 6. Self-Check Verification Checklist

- [ ] All action buttons use specific verb phrases (`Download Manifest CSV`, not `Download`).
- [ ] No marketing buzzwords ("effortless", "seamless", "magical") anywhere in copy.
- [ ] No decorative emoji in headers, buttons, or table rows.
- [ ] Domain terminology is consistent (Consignment, Station SPOC, Collateral, AWB).
- [ ] Error messages explain what failed, why it failed, and how to recover.
- [ ] Confirmations explicitly state the entity being affected and the consequences.
- [ ] Form labels are always visible and do not rely solely on placeholder text.
