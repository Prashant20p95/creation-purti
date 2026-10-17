---
name: ecommerce-uiux-design
description: Premium E-commerce UI/UX Design system. Teaches retail storefront architecture, visual hierarchy, typography, 4:5 product cards, zero clutter, responsive grid layouts, and screenshot evaluation.
---

# Premium E-Commerce UI/UX Design Architecture

This skill defines the visual hierarchy, layout architecture, typography scale, spacing rhythm, and boutique retail design standards for the **Purti Creations** e-commerce platform.

---

## 1. When to Apply This Skill
- Designing or refactoring retail storefront pages (Home, Shop Catalogue, Product Details, Cart, Checkout).
- Establishing visual hierarchy, container bounds, and typographic scale.
- Creating or evaluating product cards, category tiles, and collection banners.
- Ensuring responsive alignment across 360px, 390px, 768px, 1024px, and 1440px viewports.
- Eliminating AI-template clichés (purple neon glows, floating cards, unnecessary pill badges, giant empty gaps).

---

## 2. Core Design Principles

### A. Editorial Boutique Aesthetic
- **Warm Ivory Canvas**: `#FAF8F5` and `#FFFFFF` background with restrained `#F5F0EB` borders.
- **Deep Burgundy Primary Accent**: `#4A0E17` / `#320E18` for primary CTAs, active states, and brand anchors.
- **Muted Blush & Champagne Accents**: `#EEDFD5` and `#D4AF37` for subtle dividers, borders, and quiet highlights.
- **Zero Saturated AI Gradients**: No bright purple-to-cyan gradients, no neon glowing outlines, no random colored dropshadows.

### B. Typographic Pairings & Rhythm
- **Headings & Display**: Elegant serif typography (`Playfair Display`, `Cormorant`, or system serif) with tight tracking and balanced line heights (1.15 to 1.25).
- **Body & Figures**: Clean, high-legibility sans-serif (`Inter`, system UI font) with tabular lining figures for all prices, SKUs, and dimensions.
- **Strict Hierarchy**:
  - Eyebrow: `text-xs font-semibold uppercase tracking-widest text-burgundy-800`
  - Hero Headline: `text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-burgundy-950`
  - Section Heading: `text-2xl sm:text-3xl font-serif font-bold text-burgundy-950`
  - Product Title: `text-xs sm:text-sm font-semibold text-stone-900`
  - Prices: `text-sm sm:text-base font-bold text-burgundy-950` with strikethrough compare-at price in `text-stone-400`.

### C. Consistent Card Architecture & 4:5 Aspect Ratio
- **Image Uniformity**: Every product card uses an exact `4:5` aspect ratio image container (`aspect-[4/5]`) with `object-cover`.
- **Card Anatomy**:
  1. Image container with subtle hover scale (`group-hover:scale-[1.02]`).
  2. At most ONE badge: `Sale` (only if genuine discount) or `Best Seller` (only if genuine). Never multiple stacked pills.
  3. Category eyebrow (`text-[11px] font-medium text-stone-500 uppercase`).
  4. Product title (limited to 1-2 lines with `line-clamp-2`).
  5. Price row: current price + optional comparison price + action button (`Add` or `View Details`).
- **Zero Clutter**: No "Draft Listing" badges, no fake star ratings, no artificial scarcity counters on public cards.

### D. Responsive Grid System
- **Desktop (>= 1280px)**: 4 columns (`xl:grid-cols-4`, gap 24px).
- **Laptop (>= 768px)**: 3 columns (`md:grid-cols-3`, gap 20px).
- **Mobile (< 768px)**: 2 columns (`grid-cols-2`, gap 16px).
- **Small Mobile (360px)**: 2 columns with compact touch padding, zero horizontal scroll.

---

## 3. Anti-Patterns to Strictly Avoid
- **Generic AI Template Look**: Oversized decorative shapes, rainbow borders, floating widgets covering buttons.
- **Excessive Card Border Radius**: Avoid rounded-3xl or bubble pills; maintain crisp `rounded-lg` or `rounded-xl` (8px–12px).
- **Repetitive Content Blocks**: Never repeat the same product grid multiple times under different headings.
- **Empty White Gaps**: No 200px empty spacing blocks before filters or between sections.
