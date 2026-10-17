---
name: ecommerce-product-photography
description: Standards for studio product photography, asset inventorying, 4:5 aspect ratio cropping, image optimization, color vibrancy enhancement, and authentic product-to-image matching.
---

# Product Photography & Asset Quality Architecture

This skill defines the photographic standards, asset verification protocols, image processing pipelines, and aspect ratio discipline for **Purti Creations**.

---

## 1. When to Apply This Skill
- Auditing or replacing product images in the catalogue.
- Crop or enhance raw photographic assets from camera/WhatsApp uploads.
- Generating multi-angle gallery views (Primary, Close-up Macro, Ambient/In-situ, Base/Craft Details).
- Detecting low-resolution, blurry, stretched, or mismatched product images.
- Ensuring zero marketing text overlays, watermarks, or mobile phone letterbox bars on product photos.

---

## 2. Core Photographic Standards

### A. Dimensional & Aspect Ratio Discipline
- **Mandatory 4:5 Aspect Ratio**: All primary catalogue and gallery images must adhere strictly to a `4:5` aspect ratio (`target_w / target_h = 0.8`).
- **Standard Dimensions**: Minimum `960x1200` pixels at 95% JPEG quality with Lanczos resampling (`Image.Resampling.LANCZOS`).
- **Elimination of Black Letterboxing**: Phone screenshot black bars (top status bars, bottom Android navigation bars) must be cleanly cropped out down to the genuine camera sensor boundaries.

### B. Natural Color Vibrancy & Clarity Enhancement
When processing genuine camera photographs with Python Pillow:
```python
from PIL import Image, ImageEnhance

# 1. Subtle sharpness enhancement (1.10 - 1.15x)
enh_sharp = ImageEnhance.Sharpness(img)
img = enh_sharp.enhance(1.15)

# 2. Natural color saturation recovery (1.03 - 1.05x)
enh_col = ImageEnhance.Color(img)
img = enh_col.enhance(1.04)

# 3. Soft tonal contrast (1.02 - 1.04x)
enh_cont = ImageEnhance.Contrast(img)
img = enh_cont.enhance(1.03)
```

### C. Zero Marketing Text on Product Photographs
- Never use a screenshot of a promotional poster containing phone numbers ("For Order WhatsApp 8130400953"), slogan banners, or price stickers as a product photograph.
- If an authentic photo is taken within an entrance setting (e.g. Evil Eye door hanging or Shubh Labh pair), frame the product cleanly on the natural wood or warm ivory background using seamless blending or soft feathering.

---

## 3. Product-to-Asset Mapping Protocol

Every catalogue record must map strictly to genuine camera photographs of that exact item:

| Product Slug | Product Description | Required Photographic Subject |
| :--- | :--- | :--- |
| `pink-rose-dome-gift` | Preserved rose bouquet in acrylic sphere | Clear sphere with red roses, lilac wrap, and satin ribbon on table |
| `teddy-gold-balloon-gift` | Panda plush holding polka-dot heart | Panda plush holding heart with metallic gold balloons in sphere |
| `panda-silver-balloon-letter-light` | Crate with marquee letter light & panda | Wooden crate, marquee light 'R', panda plush, silver balloons |
| `black-gold-rose-dome` | Statement crystal dome with fairy lights | Dome with gold balloons, red rose wreath, fairy lights, black wrap |
| `festive-shagun-coconut-chowki` | Traditional coconut on Banarasi chowki | Coconut wrapped in blue net on pink brocade chowki with diyas |
| `evil-eye-door-hanging` | Cobalt & white bead Nazar Battu hanging | Authentic blue bead concentric circles with turquoise tassels |
| `shubh-labh-pearl-hanging` | Auspicious pearl ring toran pair | White pearl rings with crimson velvet 'Shubh' and 'Labh' centers |
| `shubh-labh-festive-display` | Festive Shubh Labh collection | Coordinated arrangement of hangings around pink brocade chowki |

---

## 4. Multi-Angle Gallery Protocol (4 Angles Minimum)
1. **Angle 1 (Primary)**: Full-length frontal hero view in 4:5 ratio.
2. **Angle 2 (Detail Macro)**: Close-up on craftsmanship (beading, rose petals, marquee light, or brocade weave).
3. **Angle 3 (Contextual)**: Ambient studio lighting or alternate angle showcasing depth and materials.
4. **Angle 4 (Base & Packaging)**: Supporting base, satin wrap, or hanging tassel detail.
