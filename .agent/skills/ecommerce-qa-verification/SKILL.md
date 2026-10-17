---
name: ecommerce-qa-verification
description: Quality assurance protocols, multi-viewport verification (360px to 1440px), HTTP endpoint auditing, automated test scripts, and browser console integrity checks.
---

# E-Commerce QA & Multi-Viewport Verification Protocol

This skill defines the multi-phase testing checklist, responsive viewport test matrices, server endpoint auditing, and automated verification procedures for **Purti Creations**.

---

## 1. When to Apply This Skill
- Running pre-delivery verification on the live application.
- Verifying HTTP 200 responses across all 28 storefront and admin routes.
- Checking console errors, server logs, and database mutation integrity.
- Auditing responsiveness at 360px, 390px, 768px, 1024px, and 1440px viewports.
- Validating order placement calculation, stock validation, and admin authentication.

---

## 2. Multi-Viewport Testing Matrix

| Viewport Width | Target Devices | Critical Verification Checks |
| :--- | :--- | :--- |
| **360px** | Budget Android (e.g. Galaxy A03, Redmi 9A) | Zero horizontal overflow, 44px min touch targets, 2-column product grid, compact header drawer. |
| **390px** | Standard Mobile (e.g. iPhone 14/15, Pixel 7) | Crisp 4:5 image cards, clear price typography, sticky Add to Bag accessibility. |
| **768px** | Tablets / Small Laptops (iPad, Galaxy Tab) | 3-column product grid, expanded filter panel, readable descriptions. |
| **1024px** | Standard Laptops (MacBook Air, ThinkPad) | Desktop navbar visible, centered navigation links, search dropdown. |
| **1440px** | Large Desktop Monitors (iMac, QHD screens) | 4-column product grid, 1280px max-width container bounds, zero stretched images. |

---

## 3. Automated Test Protocol (`test_purti_site.py`)

A passing automated test suite must execute all 5 verification phases:

1. **Phase 1: Storefront Route Verification**:
   - Verify HTTP 200 on `/`, `/shop`, `/product/[slug]`, `/cart`, `/checkout`, `/about`, `/contact`, `/faq`, and all `/policies/*` routes.
2. **Phase 2: Technical SEO & Feeds**:
   - Verify HTTP 200 on `/robots.txt` and `/sitemap.xml`.
3. **Phase 3: Non-Negotiable Branding Assertion**:
   - Assert header logo strictly contains `Purti Creations` with ZERO slogans or subtitles.
   - Assert shop catalogue eyebrow is `GIFT COLLECTION` and heading is `Find a Gift They'll Remember`.
4. **Phase 4: Order Creation & Server-Side Pricing**:
   - Submit order payload to `/api/orders` and verify server price calculation and order reference generation.
   - Verify HTTP 200 on `/order-success/[orderNumber]`.
5. **Phase 5: Admin Lifecycle & Auth**:
   - Authenticate with admin credentials via `/api/admin/login`.
   - Verify order ledger and product listing endpoints.
   - Test product creation, price confirmation, and cleanup via `POST`, `PUT`, `DELETE`.
   - Verify image HTTP 200 accessibility for all 32 product studio assets.
