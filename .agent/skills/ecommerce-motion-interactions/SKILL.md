---
name: ecommerce-motion-interactions
description: Purposeful motion design and micro-interaction ergonomics. Governs section entrance reveals, button states, cart addition feedback, filter transitions, and prefers-reduced-motion accessibility.
---

# E-Commerce Motion Design & Micro-Interactions Architecture

This skill defines the subtle, performant motion choreography, tactile button feedback, and accessibility compliance rules for **Purti Creations**.

---

## 1. When to Apply This Skill
- Designing hover states, button presses, and focus feedback.
- Choreographing page entrance reveals and section transitions.
- Implementing cart drawer slide-overs, live item count badge pulses, and toast confirmations.
- Handling mobile drawer open/close animations.
- Ensuring full compliance with `@media (prefers-reduced-motion: reduce)`.

---

## 2. Core Motion Rules

### A. The "Restraint First" Discipline
- **Zero Unnecessary Motion**: Never animate text paragraphs, pricing numbers, or background tiles continuously.
- **Micro-Scale Over Exaggeration**: Button clicks scale down by `active:scale-[0.98]` or `active:scale-[0.99]`, never bouncy spring overshoots.
- **Short Durations**: Maximum duration 250ms–400ms. Long transitions feel sluggish on mobile.

### B. Standard Motion Classes & Keyframes
```css
/* Entrance Reveal */
@keyframes fadeRise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-rise {
  animation: fadeRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Card Hover Elevation */
.product-card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.product-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px -2px rgba(45, 30, 25, 0.08);
}
```

### C. Cart Addition Feedback Protocol
1. User clicks *"Add to Bag"* / *"Add"*.
2. Button briefly shows subtle scale down and text state change (e.g. *"Adding..."* / check icon).
3. Live cart badge in Navbar pulses gently and increments count.
4. Slide-in Cart Drawer glides in smoothly from the right with a backdrop blur overlay (`bg-stone-900/50 backdrop-blur-xs`).
5. Zero full-page reload or intrusive blocking alert modals.

### D. Accessible Reduced-Motion Compliance
Every animation rule MUST be neutralized when the user enables reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto !important;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
