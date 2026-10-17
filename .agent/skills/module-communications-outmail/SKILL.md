---
name: module-communications-outmail
description: Module-specific implementation skill for Official Outmail Delivery Intimations, formal WhatsApp dispatch notifications, SPOC verification briefings, and direct communication triggers.
---

# Module Skill: Communications & Outmail Delivery Intimations

This skill governs the generation, preview, and dispatch of official delivery intimations, formal WhatsApp notifications, and SPOC verification instructions. It ensures venue coordinators receive standardized, legally unambiguous delivery notices with complete tracking details and step-by-step physical verification procedures.

---

## 1. When to Trigger This Skill

Activate this skill whenever:
- Designing or implementing delivery intimation emails ("Outmails") or WhatsApp templates.
- Triggering communications upon state transitions (`Mark In-Transit` &rarr; Dispatch Notice; `Mark Delivered` &rarr; Verification Request).
- Building the Communication Preview modal (WYSIWYG email and WhatsApp preview before sending).
- Adding direct telephone dialer (`tel:`) or WhatsApp click-to-chat links for station SPOCs.
- Writing unboxing instructions and physical receipt protocols for venue coordinators.

---

## 2. Module Specifications & Standardized Notification Templates

### A. Official Delivery Intimation Outmail Format
When consignments depart the central hub, the station SPOC must receive an official, structured email:
- **Subject**: `[ACTION REQUIRED] Umang Utsav 2026: Collateral Consignment Dispatched — STN-017-042 ({Station Name})`
- **Body Hierarchy**:
  1. **Consignment Overview**: Event Code, Station Code, Delivery Venue, Box Count.
  2. **Carrier Tracking Block**: Courier Partner (e.g. *Bluedart Express*), AWB Tracking Number, Expected Delivery Date.
  3. **Carton Inventory Breakdown**: Serial numbers for Badges, Food Coupons, Lanyards, and Vehicle Passes.
  4. **Physical Verification Protocol**: 3-step mandatory procedure upon delivery (Inspect outer tape &rarr; Count boxes &rarr; Verify badge bundles &rarr; Click sign-off link).
  5. **Central Hub Logistics Hotline**: Phone and email of central control desk.

### B. Formal WhatsApp Dispatch Copy
For instant mobile coordination, a concise WhatsApp message format:
```text
🚨 *UMANG UTSAV 2026 — DISPATCH INTIMATION* 🚨

Dear *Rajesh Sharma*,
Consignment for *Kanpur Central Arena (STN-017-042)* has departed Central Logistics Hub.

📦 *Consignment Details:*
• Total Boxes: 4 Cartons
• Badges: 1,200 | Coupons: 1,200 | Passes: 40
• Courier: Bluedart Express
• AWB / Tracking: 39482019482

🔗 *Track Shipment:* https://www.bluedart.com/tracking?awb=39482019482
📲 *Physical Sign-Off Portal:* https://umang.internal/verify/STN-017-042

*Important:* Please inspect all carton security seals before signing the courier delivery sheet. For discrepancies, call Hub: +91 11 2345 6789.
```

### C. Live Communication Preview Modal
Before dispatching notices, coordinators must see a dual-tab modal:
- **Tab 1: Email Outmail Preview** (Formatted HTML email preview with sender, recipient, subject, and copy buttons).
- **Tab 2: WhatsApp Copy Preview** (Mobile preview bubble with 1-click `[Send via WhatsApp Web]` button).

---

## 3. Real Project Do's and Don'ts (Umang Utsav 2026)

### Don't:
- **Don't send vague casual messages** like *"Hey, your event badges are on the way! Hope they arrive soon!"*.
- **Don't omit the courier AWB tracking number or courier provider name** in the email body.
- **Don't send emails automatically without an explicit operator confirmation** or preview check.
- **Don't omit the physical unboxing sign-off instructions**; venue SPOCs must know they are responsible for counting items.

### Do:
- **Do include exact carton quantities and badge serial ranges** in the notification.
- **Do provide a 1-click `[Send Delivery Outmail]` button** directly inside the Dispatch Pipeline row.
- **Do provide copy-to-clipboard functionality** for the WhatsApp message template.
- **Do record an audit log entry in the database** whenever an Outmail is dispatched.

---

## 4. Correct-Pattern Code Snippet (HTML / Vanilla JS)

```html
<!-- AUTHORITATIVE COMMUNICATION PREVIEW & DISPATCH MODAL -->
<div id="outmail-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans">
  <div class="relative w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
    
    <!-- Modal Header -->
    <div class="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
      <div>
        <h3 class="text-sm font-bold text-slate-900">Official Dispatch Intimation: STN-017-042</h3>
        <p class="text-xs text-slate-500">Rajesh Sharma &bull; Kanpur Central Arena</p>
      </div>
      <button onclick="document.getElementById('outmail-modal').remove()" class="text-slate-400 hover:text-slate-600">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>

    <!-- Communication Format Tabs -->
    <div class="px-5 pt-3 border-b border-slate-200 bg-white flex space-x-4 text-xs font-semibold">
      <button class="pb-2 border-b-2 border-blue-600 text-blue-600">
        Official Outmail (Email)
      </button>
      <button class="pb-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700">
        WhatsApp Notification
      </button>
    </div>

    <!-- Email Preview Body -->
    <div class="p-5 overflow-y-auto flex-1 space-y-3 text-xs text-slate-700 bg-slate-50/50">
      <div class="bg-white p-3 border border-slate-200 rounded text-2xs space-y-1">
        <div><strong>To:</strong> rajesh.sharma@kanpur-arena.org</div>
        <div><strong>Subject:</strong> <span class="font-mono text-slate-900">[ACTION REQUIRED] Umang Utsav 2026: Collateral Consignment Dispatched — STN-017-042</span></div>
      </div>

      <div class="bg-white p-4 border border-slate-200 rounded text-xs space-y-3 leading-relaxed">
        <p>Dear <strong>Rajesh Sharma</strong> (Venue SPOC),</p>
        <p>This is official confirmation that the physical collaterals for <strong>Kanpur Central Arena</strong> have been dispatched from the Central Logistics Hub.</p>

        <div class="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-2xs space-y-1">
          <div>&bull; Carrier: Bluedart Express</div>
          <div>&bull; AWB Tracking Number: 39482019482</div>
          <div>&bull; Total Packaging: 4 Sealed Cartons</div>
          <div>&bull; Badges: 1,200 | Food Coupons: 1,200 | Passes: 40</div>
        </div>

        <h4 class="font-bold text-slate-900 text-xs uppercase tracking-wider">Mandatory Verification Steps:</h4>
        <ol class="list-decimal pl-4 space-y-1 text-2xs text-slate-600">
          <li>Inspect outer tamper-evident security tape before signing carrier manifest.</li>
          <li>Confirm total box count equals 4 cartons.</li>
          <li>Open Box 1 and verify serial ranges against the carton packing slip.</li>
          <li>Log in to the Station Verification Portal to confirm physical receipt.</li>
        </ol>

        <p class="text-2xs text-slate-500 pt-2 border-t border-slate-100">
          Central Hub Logistics Desk &bull; Emergency Contact: +91 11 2345 6789
        </p>
      </div>
    </div>

    <!-- Modal Action Footer -->
    <div class="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
      <button onclick="navigator.clipboard.writeText('...')" class="h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">
        Copy Text
      </button>
      <div class="flex items-center space-x-2">
        <button onclick="document.getElementById('outmail-modal').remove()" class="h-8 px-3 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50">
          Cancel
        </button>
        <button onclick="sendOutmail('STN-017-042')" class="h-8 px-4 text-xs font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 shadow-2xs">
          Dispatch Outmail Now
        </button>
      </div>
    </div>

  </div>
</div>
```

---

## 5. Common Mistakes and How to Detect Them

| Defect | Visual / Code Indicator | Detection Method | Senior Fix |
|---|---|---|---|
| **Missing AWB in Outmail** | Email body tells SPOC the boxes are shipped but omits the carrier tracking number. | Inspect template placeholders; search for `tracking_awb`. | Enforce template validation: require non-empty courier partner and AWB. |
| **Accidental Multi-Dispatches** | Rapid clicking sends 5 identical emails to the venue coordinator. | Inspect network requests when button is double-clicked. | Disable button and show spinner on first click (`disabled` state). |
| **Unformatted WhatsApp Links** | WhatsApp URL does not encode spaces, resulting in broken or truncated text. | Test `https://wa.me/` link generation with multiline message. | Use `encodeURIComponent(messageBody)` for all WhatsApp message parameters. |
| **No Delivery Unboxing Steps** | Email acts like a receipt with no instructions on inspecting tamper seals. | Audit Outmail text. | Mandate the 4-step physical receipt verification protocol in email copy. |

---

## 6. Self-Check Verification Checklist

- [ ] Outmail subject line includes `[ACTION REQUIRED]`, Event Code, Station Code, and Station Name.
- [ ] Email body includes Courier Partner, AWB Tracking Number, and Carton Count.
- [ ] Explicit 4-step unboxing and physical verification instructions are provided.
- [ ] WhatsApp notification copy is properly URL-encoded and includes active tracking link.
- [ ] Operators can preview and edit notification copy before committing send.
- [ ] Dispatching notifications logs an entry in the system audit log.
- [ ] Emergency Central Hub contact phone number is clearly stated in all templates.
