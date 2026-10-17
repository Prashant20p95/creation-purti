---
name: fullstack-ecommerce-engineering
description: Full-stack engineering architecture for Next.js App Router, Prisma ORM, SQLite database, server-side price/stock validation, JWT admin security, and decoupled storefront/admin layouts.
---

# Full-Stack E-Commerce Engineering Architecture

This skill defines the backend data integrity, server-side validation, secure route protection, and component architecture for the **Purti Creations** platform.

---

## 1. When to Apply This Skill
- Building or modifying API routes (`/api/orders`, `/api/admin/*`).
- Interacting with Prisma ORM and the SQLite database (`prisma/schema.prisma`).
- Enforcing server-side validation on prices, discounts, stock, and shipping calculations.
- Decoupling storefront chrome (Header, Footer, Cart) from the administrative operations workspace.
- Managing authentication, JWT cookie sessions, and authorization guards.

---

## 2. Core Architecture Protocols

### A. Strict Server-Side Order & Price Validation
Never trust pricing sent from the client browser:
```typescript
// src/app/api/orders/route.ts
// 1. Fetch products directly from SQLite database via Prisma
const dbProducts = await prisma.product.findMany({
  where: { id: { in: itemIds } }
});

// 2. Validate availability and price confirmation
for (const item of body.items) {
  const dbProd = dbProducts.find(p => p.id === item.productId);
  if (!dbProd || !dbProd.inStock || !dbProd.isPriceConfirmed || !dbProd.price) {
    return NextResponse.json({ error: `Product unavailable or unconfirmed price` }, { status: 400 });
  }
  // Compute price snapshot using DB price, NOT client price
  subtotal += dbProd.price * item.quantity;
}

// 3. Server calculates shipping
const shippingFee = subtotal >= brandConfig.shippingPolicy.freeShippingThreshold ? 0 : brandConfig.shippingPolicy.standardShippingFee;
const total = subtotal + shippingFee;
```

### B. Decoupled Storefront vs Admin Layouts
- **Storefront Chrome**: The public header, announcement strip, cart drawer, and consumer footer MUST NOT leak into `/admin/*`.
- **Implementation**: [`StoreLayout`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/src/components/layout/StoreLayout.tsx) inspects `usePathname().startsWith('/admin')` to bypass consumer chrome completely on admin routes.
- **Admin Workspace**: Managed independently by [`AdminSidebarLayout`](file:///c:/Users/PrashantYadav/Desktop/Anti%20Gravity/src/app/admin/AdminSidebarLayout.tsx) with a persistent dark operations sidebar (`bg-stone-950`).

### C. Admin Security & Authorization
- Admin endpoints (`/api/admin/*`) require valid JWT cookie tokens signed by `ADMIN_JWT_SECRET`.
- Non-admin users cannot access order customer records or mutate product catalogues.
- Zero client-side exposure of database credentials or JWT secrets.

### D. Historical Price Snapshot Preservation
- Every order record in `OrderItem` stores `price` as a fixed float snapshot at the time of purchase.
- If a product price is later changed in the catalogue, past order totals and revenue metrics remain mathematically preserved and unaffected.
