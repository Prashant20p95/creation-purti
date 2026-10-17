---
name: ecommerce-conversion-journey
description: Conversion rate optimization and friction-free customer journey architecture. Governs discovery, search/filtering, PDP Buy Box, cart drawer, checkout forms, and genuine Indian e-commerce trust.
---

# E-Commerce Conversion and Customer Journey Architecture

This skill defines the high-conversion customer journey, purchase funnel ergonomics, pricing transparency, and authentic Indian consumer trust architecture for **Purti Creations**.

---

## 1. When to Apply This Skill
- Designing or evaluating the funnel: `Home` → `Category/Search` → `Product Details` → `Cart` → `Checkout` → `Order Confirmation`.
- Structuring the Product Detail Page (PDP) Buy Box and customization options.
- Designing cart drawers, sticky action strips, and checkout form validation.
- Establishing transparent delivery notices, COD rules, and direct WhatsApp consultations.
- Eliminating fake dark patterns (fake countdown timers, fabricated customer reviews, simulated stock counts).

---

## 2. The 6-Step Friction-Free Journey

```mermaid
flowchart LR
    A["1. Home / Hero"] --> B["2. Category / Search"]
    B --> C["3. Product Details (PDP)"]
    C --> D["4. Slide-in Cart"]
    D --> E["5. One-Page Checkout"]
    E --> F["6. Verified Order Confirmation"]
```

### Step 1: Homepage Clarity & Discovery
- First viewport communicates immediately:
  1. What Purti Creations sells (Handmade floral dome keepsakes, festive door hangings, teddy hampers).
  2. Why it is appealing (Thoughtful artisanal care, direct studio crafting).
  3. How to begin shopping (Direct CTA: *"Explore the Collection"*, secondary: *"Shop by Occasion"*).
- Zero distraction: no multi-slide carousel banners that auto-advance before the shopper can read them.

### Step 2: Search, Category & Occasion Navigation
- Instant keyword filtering across title, description, keywords, and category.
- Streamlined category pills + Occasion selector (*Diwali*, *Weddings*, *Housewarming*, *Birthdays*, *Anniversaries*).
- Price sorting (*Low to High*, *High to Low*, *Newest*, *Featured*).
- Clear, live result counts and 1-click filter reset.

### Step 3: Product Detail Page (PDP) Buy Box
- **Dual Visual Architecture**:
  - Desktop: Large interactive 4-angle studio gallery on left (55% width), Buy Box on right (45% width).
  - Mobile: Primary gallery swipe/thumbnail selector on top, title, price, and actions immediately visible below.
- **Conversion Elements**:
  - Transparent price display with tax inclusion note (`Inclusive of all taxes`).
  - Genuine stock indicator (`In Stock • Dispatch in 1–2 business days`).
  - Quantity increment/decrement buttons (`-` / `+`).
  - Optional custom letter initial selector (e.g. for letter lights: A–Z pill customizer).
  - Dual action buttons: Primary `Add to Bag` (burgundy fill) and `Buy Now` (instant checkout).
  - Verified specifications: Dimensions, Materials, Included Items, Care Guide.
  - Transit Guarantee & Dedicated FAQs.

### Step 4: Slide-over Cart Usability
- Slide-in drawer opens automatically upon adding an item without forcing a page reload.
- Clear thumbnail, product title, customized notes (e.g. initial), and item price.
- Inline quantity modifiers and one-tap delete button.
- Live subtotal and standard delivery calculation (Free shipping above threshold, or standard fee).
- Direct *"Proceed to Checkout"* button.

### Step 5: Indian Checkout Ergonomics
- Single-page mobile-friendly form with standard Indian address conventions:
  - Full Name
  - Mobile Phone Number (10 digits)
  - PIN Code (6 digits)
  - City & State
  - Street Address, Flat/House No., and Optional Landmark
  - Order Instructions / Gift Note
- Payment Methods: Cash on Delivery (COD) and Direct WhatsApp studio confirmation.
- Zero fake payment simulations: Never pretend payment succeeded when an API is unconfigured.

### Step 6: Order Confirmation & Tracking
- Generates permanent order reference (e.g. `#PC-2026-4120`).
- Provides order summary, delivery timeline, and 1-click WhatsApp order tracking link.

---

## 3. Strict Truth & Ethics Rules
- **No Artificial Urgency**: Never display "Only 1 left in stock!" unless the database inventory is actually 1.
- **No Fabricated Reviews**: Never insert fake customer testimonials or 5-star ratings without authentic customer reviews.
- **No Fake Discounts**: Only show a discount when `compareAtPrice > price` is genuinely configured in the database.
