# Purti Creations — Official E-Commerce Storefront & Admin Portal

> **Brand:** Purti Creations  
> **Tagline:** *Crafted with heart • Inspired by life*  
> **Verified Phone & WhatsApp:** `+91 8130400953`  
> **Admin Dashboard URL:** `http://localhost:3000/admin` (Configured via `ADMIN_PASSWORD` in `.env`)

---

## 🌟 Overview & Architecture

A complete, production-grade, mobile-first e-commerce web platform custom-built for **Purti Creations**, specializing in handcrafted floral surprise domes, festive Shubh Labh door decor, celebratory teddy hampers, and ceremonial shagun gifts for Indian celebrations.

### Tech Stack:
- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS with a warm Indian luxury gifting palette (Warm Ivory, Blush Pink, Muted Rose, Champagne Gold, Deep Burgundy)
- **Database & ORM:** SQLite (`prisma/dev.db`) managed through Prisma ORM
- **Admin Authentication:** Secure JWT cookie session with password encryption (`bcryptjs`)
- **Iconography:** Lucide React
- **Validation:** Zod schemas for order creation and form integrity
- **Integrations:** Direct WhatsApp order / enquiry generation with prefilled product and cart messages

---

## 🚀 Quick Start (Running Locally)

### Option 1: Double-Click Launcher
Double-click `start_purti.bat` in the workspace folder. It will automatically launch the server and open `http://localhost:3000` in your default browser.

### Option 2: Command Line
```powershell
# Set Node path if running in a fresh terminal
$env:Path = "C:\Users\PrashantYadav\tools\nodejs;$env:Path"

# Run Production Server (fast & optimized)
npm start

# Or Run Development Server (for live code editing)
npm run dev
```

---

## 📱 Pages Implemented & Verified

| Page | URL | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section, Category tiles, Customer Favourites, Shop by Occasion, Artisan Story, Budget Shop, How Ordering Works, WhatsApp CTA. |
| **Shop Catalogue** | `/shop` | Full responsive grid, live text search, category filters, occasion filters, price sorting, empty states. |
| **Product Detail** | `/product/[slug]` | Multi-image gallery, dynamic SEO meta, INR pricing, customization inputs (alphabet letter marquee, gift note), PIN code delivery checker, specifications, WhatsApp order trigger. |
| **Shopping Cart** | `/cart` | Itemized table, quantity adjustments, free delivery progress bar, subtotal calculation. |
| **Checkout** | `/checkout` | Indian address form (State selector, 6-digit PIN code, landmark), Cash on Delivery (COD), direct WhatsApp confirmation, simulated payment test. |
| **Order Confirmation** | `/order-success/[orderNumber]` | Order reference, packaging steps, transit tracker, direct WhatsApp follow-up link. |
| **Our Story** | `/about` | Authentic artisanal narrative, studio ethos, workshop photos, philosophy. |
| **Contact Us** | `/contact` | Verified phone (+91 8130400953), WhatsApp direct chat, operating hours, studio notice, enquiry form. |
| **FAQ** | `/faq` | Accordion addressing handmade care, materials, marquee lights, packaging protection, and COD. |
| **Policies** | `/policies/*` | Shipping Policy, Return & Refund Policy (transit damage guarantee), Privacy Policy, Terms & Conditions. |
| **Admin Cockpit** | `/admin` | Operational metrics (Orders, Revenue, Inventory, Draft Prices), recent orders table. |
| **Admin Products** | `/admin/products` | Inline price/stock editor, price confirmation toggle, add new product modal, image uploader. |
| **Admin Orders** | `/admin/orders` | Order status lifecycle (`CONFIRMED` &rarr; `PROCESSING` &rarr; `DISPATCHED` &rarr; `DELIVERED` &rarr; `CANCELLED`), WhatsApp intimation. |
| **Admin Settings** | `/admin/settings` | Store phone, WhatsApp link, free delivery threshold, standard shipping fee, admin password change. |

---

## ⚙️ How to Update Brand Details & Settings

You do not need to search through the entire codebase to update business details:

1. **Brand Configuration File:** [`src/config/brand.ts`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/src/config/brand.ts)  
   Contains all business parameters (Name, Phone, WhatsApp, Policies, Delivery Fees, Social Handles).
2. **Admin Portal:** Visit `http://localhost:3000/admin` &rarr; Go to **Store Settings** to update numbers and delivery thresholds directly from the browser!
