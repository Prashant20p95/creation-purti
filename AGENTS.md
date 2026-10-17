# Purti Creations — Agent Operating Guidelines & E-Commerce Skill Architecture

This document governs the multi-disciplinary execution rules, design tokens, architecture conventions, and specialized skills for any AI agent or engineer working on **Purti Creations**.

---

## 1. Directory of Installed Project Skills

All project skills are installed and verified in `.agent/skills/`:

| Skill | Folder Location | Primary Responsibility |
| :--- | :--- | :--- |
| **Skill A: UI/UX Design** | [`.agent/skills/ecommerce-uiux-design/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/ecommerce-uiux-design/SKILL.md) | Editorial retail aesthetics, warm ivory & burgundy palette, 4:5 cards, responsive grids. |
| **Skill B: Conversion Funnel** | [`.agent/skills/ecommerce-conversion-journey/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/ecommerce-conversion-journey/SKILL.md) | Friction-free 6-step shopping journey, PDP Buy Box, cart drawer, Indian checkout ergonomics. |
| **Skill C: Photography Quality** | [`.agent/skills/ecommerce-product-photography/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/ecommerce-product-photography/SKILL.md) | 960x1200 studio assets, zero promotional text on photos, 4-angle gallery verification. |
| **Skill D: Motion Interactions** | [`.agent/skills/ecommerce-motion-interactions/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/ecommerce-motion-interactions/SKILL.md) | Subtle `fadeRise` reveals, cart badge pulses, `:focus-visible` rings, reduced-motion compliance. |
| **Skill E: Full-stack Engineering** | [`.agent/skills/fullstack-ecommerce-engineering/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/fullstack-ecommerce-engineering/SKILL.md) | Next.js App Router, Prisma ORM, server-side price validation, JWT cookie auth guards. |
| **Skill F: Admin Dashboard UX** | [`.agent/skills/admin-dashboard-ux/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/admin-dashboard-ux/SKILL.md) | Decoupled dark cockpit, real SQLite-calculated KPIs, product CRUD, WhatsApp dispatch intimation. |
| **Skill G: QA Verification** | [`.agent/skills/ecommerce-qa-verification/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/ecommerce-qa-verification/SKILL.md) | 5-phase automated testing (`test_purti_site.py`), multi-viewport checks (360px to 1440px). |
| **Skill H: Design System Tokens** | [`.agent/skills/design-system-and-code-quality/SKILL.md`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/.agent/skills/design-system-and-code-quality/SKILL.md) | Reusable design tokens, Tailwind geometric scale, strict typing, zero dead code. |

---

## 2. Non-Negotiable Brand & Wordmark Rule
- **Wordmark Content**: Strictly and exclusively **`Purti Creations`**.
- **No Taglines Inside Logo**: Never place *"Crafted with Heart"*, *"Inspired by Life"*, *"Artisanal Gifting"*, or any other slogan inside the logo component.
- **Tagline Placement**: Brand taglines may only appear in narrative copy (e.g. Hero subtext or Brand Story).
- **Spelling**: Always spell **Purti Creations** (plural), never "Purti Creation".

---

## 3. Strict Truth & Ethics Protocols
1. **Zero Fake Testimonials**: Never invent fake customer names, reviews, or 5-star rating stars.
2. **Zero Fake Scarcity**: Never show fake countdown clocks or false "Only 1 left in stock" badges.
3. **Zero Fake Discounts**: Only show comparison strikethrough prices when a genuine `compareAtPrice > price` exists in the database.
4. **Authentic Photography Only**: Never use stock photographs or AI-generated concepts to depict actual handmade items.

---

## 4. Verification & Testing Protocol
Before reporting any task complete:
1. Run `python test_purti_site.py` and verify 100% pass rate.
2. Check that the Next.js server is running and responsive at `http://localhost:3000`.
3. Verify that all 32 product images return HTTP 200 with valid content lengths.
