---
name: design-system-and-code-quality
description: Design tokens, Tailwind CSS configuration, component reuse standards, code documentation, and maintenance rules for Purti Creations.
---

# Design System & Code Quality Architecture

This skill defines the token standards, Tailwind CSS configuration, shared component contracts, and codebase cleanliness principles for **Purti Creations**.

---

## 1. When to Apply This Skill
- Adding or editing Tailwind CSS classes or CSS variables in `src/app/globals.css`.
- Creating shared UI components (`src/components/common/*`, `src/components/layout/*`).
- Ensuring consistent border radii, shadows, and color hex values.
- Refactoring redundant code or dead imports.
- Documenting architectural decisions for future AI and human developers.

---

## 2. Design Token System

### A. Color Tokens
```javascript
// tailwind.config.ts / src/app/globals.css
colors: {
  ivory: {
    50: '#FAF8F5',
    100: '#F5F0EB',
    200: '#EEDFD5',
    300: '#E2CEBF',
  },
  burgundy: {
    800: '#5C1D2E',
    900: '#4A0E17',
    950: '#320E18',
  },
  champagne: {
    300: '#E5C287',
    400: '#D4AF37',
  },
  stone: {
    900: '#1C1917',
    950: '#0C0A09',
  }
}
```

### B. Spacing & Geometric Grid
- Use strict 4px/8px geometric scale (`p-2`, `p-3`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`).
- Section vertical rhythm: `py-12 sm:py-16 lg:py-20` on storefront sections.
- Container bounds: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### C. Border Radii & Elevation
- Product cards: `rounded-xl border border-ivory-200 shadow-xs hover:shadow-sm`.
- CTAs & Buttons: `rounded-lg font-semibold`.
- Badges & Pills: `rounded-md text-[10px] sm:text-[11px] font-medium tracking-wide uppercase`.
- Never use `rounded-3xl` or exaggerated 50px pill corners on primary cards.

---

## 3. Code Quality Discipline
- **Documentation Integrity**: Preserve existing comments and docstrings.
- **Strict Typing**: Full TypeScript interfaces across all components (`src/types/index.ts`).
- **No Dead Code**: Remove abandoned or redundant scratch files before delivery.
- **Fast Build Times**: Keep Next.js App Router server components default; use `"use client"` only where interactivity (hooks, state, events) is strictly required.
