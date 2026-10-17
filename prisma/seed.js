const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Updating Purti Creations database with multi-angle studio photos and detailed descriptions...");

  // 1. Categories
  const categories = [
    {
      name: "Floral Dome Gifts",
      slug: "floral-domes",
      description: "Graceful floral surprise domes and keepsake arrangements crafted with romantic care.",
      image: "/products/pink-rose-dome-1.jpg",
      displayOrder: 1,
    },
    {
      name: "Festive Door Hangings",
      slug: "festive-hangings",
      description: "Traditional Shubh Labh and festive decorative hangings to welcome prosperity.",
      image: "/products/shubh-labh-pearl-hanging-1.jpg",
      displayOrder: 2,
    },
    {
      name: "Teddy & Balloon Gifts",
      slug: "teddy-and-balloons",
      description: "Playful teddy arrangements, balloon domes, and personalized celebration hampers.",
      image: "/products/teddy-gold-balloon-1.jpg",
      displayOrder: 3,
    },
    {
      name: "Festive & Housewarming",
      slug: "festive-and-housewarming",
      description: "Auspicious decor, Shagun coconut sets, and decorative chowki bases for ceremonies.",
      image: "/products/festive-shagun-coconut-1.jpg",
      displayOrder: 4,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // 2. Comprehensive Products with 4 clean camera image angles and deep descriptions
  const products = [
    {
      slug: "shubh-labh-pearl-hanging",
      title: "Shubh Labh Pearl Hanging for Festive Home Decor",
      subtitle: "Traditional pearl-inspired entrance toran pair with velvet medallions",
      shortDescription:
        "Welcome positivity, abundance, and festive charm into your home with this handcrafted Shubh Labh hanging pair, featuring faux pearl beading, rich crimson velvet medallions, golden lace detailing, and auspicious red floral accents.",
      description:
        "Give your home entrance an auspicious and regal festive makeover with this handcrafted Shubh Labh hanging pair from Purti Creations.\n\nIndividually assembled by skilled Indian artisans, each wreath features hundreds of high-luster faux pearl beads woven around a sturdy core ring, crisscrossed with metallic golden gotapatti ribbons. At the center of each ring sits a deep crimson velvet medallion inscribed with sacred 'Shubh' (Auspiciousness) and 'Laabh' (Prosperity) lettering, framed by dual concentric pearl borders.\n\nThe base of each wreath is gracefully finished with an auspicious red rose bloom, clusters of yellow decorative buds, and cascading pearl droplet tassels that sway gently when hung on your door or wall.\n\nWhether styled on your main entryway door for Diwali, framed beside your pooja mandir, or gifted as a heartfelt blessing during a housewarming (Griha Pravesh) ceremony, this hanging pair brings timeless traditional warmth to any celebration.",
      price: 699,
      compareAtPrice: 899,
      isPriceConfirmed: true,
      category: "Festive Door Hangings",
      occasions: "Diwali, Housewarming, Griha Pravesh, Pooja Room, Weddings, New Home Blessing",
      stock: 15,
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      highlights: JSON.stringify([
        "Pair of 2 handcrafted hanging wreaths ('Shubh' and 'Laabh')",
        "Lustrous ivory faux pearl beading with metallic gold gotapatti lace",
        "Deep crimson velvet central medallions with sacred golden Devanagari lettering",
        "Finished with vibrant red rose, yellow accent buds, and dangling pearl tassels",
        "Equipped with built-in top hanging loops for instant door or wall mounting",
        "A cherished, reusable festive decor keepsake for Diwali and family rituals",
      ]),
      dimensions: "Ring Outer Diameter: approx. 15 cm each; Total Hanging Length with Tassels: approx. 32 cm",
      materials: "Faux acrylic pearl beads, crimson velvet fabric, metallic gota lace cord, artificial floral accents, acrylic base frame",
      includedItems: "1 Pair (2 Pieces: 1 Shubh + 1 Laabh) Handcrafted Door Hangings in Protective Box",
      customizationAvailable: true,
      customizationNote: "Complimentary handwritten festive greeting card included upon request.",
      images: JSON.stringify([
        "/products/shubh-labh-pearl-hanging-1.jpg",
        "/products/shubh-labh-pearl-hanging-2.jpg",
        "/products/shubh-labh-pearl-hanging-3.jpg",
        "/products/shubh-labh-pearl-hanging-4.jpg",
      ]),
      keywords: "Shubh Labh hanging, Diwali door hanging, festive home decor, Indian entrance decoration, housewarming gift, toran, griha pravesh",
    },
    {
      slug: "pink-rose-dome-gift",
      title: "Pink Rose Dome Gift — Elegant Floral Surprise",
      subtitle: "Romantic rose display in crystal-clear bubble sphere with lilac wrap",
      shortDescription:
        "Celebrate birthdays, anniversaries, and romantic milestones with an enchanting rose display enclosed inside a crystal-clear acrylic dome, seated upon a pleated lavender wrapping base with an organza bow.",
      description:
        "Express love, appreciation, and heartfelt romance with this breathtaking Pink Rose Dome keepsake by Purti Creations.\n\nCrafted to look stunning from every angle, this centerpiece features a full bouquet of vibrant velvety roses nestled inside an ultra-transparent spherical bubble dome. The arrangement is dressed in layered pleated lavender and white fluted wrap, crowned with a delicate shimmering organza ribbon bow on top.\n\nUnlike traditional cut flowers that wither in days, this enclosed floral dome stays fresh-looking, pristine, and dust-protected for years. It serves as an eye-catching decorative keepsake for bedroom nightstands, vanity tables, coffee tables, or celebration photo backdrops.\n\nEach dome is hand-styled and inspected before being cushioned in multi-layered bubble wrap and a rigid carton to guarantee safe arrival anywhere in India.",
      price: 1299,
      compareAtPrice: 1599,
      isPriceConfirmed: true,
      category: "Floral Dome Gifts",
      occasions: "Birthday, Anniversary, Valentine's Day, Romantic Surprise, Women's Day, Milestone Celebration",
      stock: 10,
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      highlights: JSON.stringify([
        "Lush bouquet of velvety red and pink decorative roses inside a crystal-clear sphere",
        "Dust-free and long-lasting floral keepsake display",
        "Tiered pleated lilac and scalloped white wrapping base",
        "Finished with a coordinated sheer organza ribbon bow on top",
        "Ideal romantic surprise for wives, girlfriends, sisters, and mothers",
        "Packed in reinforced double-walled protective cartons for transit safety",
      ]),
      dimensions: "Dome Sphere Diameter: approx. 20 cm; Total Height: approx. 32 cm; Base Width: approx. 22 cm",
      materials: "Optical-grade clear acrylic bubble dome, premium fabric decorative roses, textured fluted art paper, sheer organza ribbon",
      includedItems: "1 Complete Handcrafted Floral Surprise Dome Gift with Ribbon Bow & Complimentary Gift Card",
      customizationAvailable: true,
      customizationNote: "Personalized greeting message hand-inscribed on an elegant greeting card.",
      images: JSON.stringify([
        "/products/pink-rose-dome-1.jpg",
        "/products/pink-rose-dome-2.jpg",
        "/products/pink-rose-dome-3.jpg",
        "/products/pink-rose-dome-4.jpg",
      ]),
      keywords: "pink rose dome gift, floral dome, anniversary gift, romantic gift for her, birthday floral gift India, flower surprise balloon",
    },
    {
      slug: "teddy-gold-balloon-gift",
      title: "Teddy Bear & Gold Balloon Gift Arrangement",
      subtitle: "Adorable panda plush holding polka-dot heart with 4 golden balloons",
      shortDescription:
        "A delightfully cheerful gift arrangement featuring a cuddly panda teddy bear holding a polka-dot heart, seated upon a pleated black-and-gold gift base with a clear balloon dome housing 4 metallic gold chrome balloons.",
      description:
        "Turn birthdays, achievements, and celebratory surprises into unforgettable memories with this adorable Panda Teddy & Gold Balloon Arrangement from Purti Creations.\n\nAt the center of this playful display is an ultra-soft plush panda teddy holding a monochrome polka-dot heart. The teddy sits gracefully atop an origami-pleated black paper collar accented with shimmering golden borders. Rising above is a crystal-clear bubble balloon filled with four high-gloss metallic golden chrome balloons that catch the light from every direction.\n\nDesigned to make recipients smile the moment they unbox it, this arrangement photographs beautifully and makes a standout tabletop centerpiece for birthday parties, congratulations, graduation milestones, and sweet surprises for kids and adults alike.\n\nEvery arrangement is hand-inflated, sealed, and packed with internal supports so the balloons remain full and taut throughout transit.",
      price: 1199,
      compareAtPrice: 1499,
      isPriceConfirmed: true,
      category: "Teddy & Balloon Gifts",
      occasions: "Birthday, Congratulations, Kids Party, Anniversary, Friendship Day, Just Because",
      stock: 8,
      inStock: true,
      isFeatured: true,
      isBestSeller: false,
      highlights: JSON.stringify([
        "Ultra-soft plush panda teddy bear holding a decorative polka-dot heart",
        "Clear transparent bubble sphere containing 4 high-shine gold chrome mini-balloons",
        "Tiered origami-pleated black paper base with metallic gold border trims",
        "Playful, photogenic celebration gift that looks impressive in party photos",
        "Suitable for recipients of all ages—kids, best friends, and partners",
        "Securely braced and boxed for zero deflation during courier transit",
      ]),
      dimensions: "Total Height: approx. 36 cm; Base Diameter: approx. 20 cm; Teddy Height: approx. 18 cm",
      materials: "Plush polyester panda teddy, clear PVC bubble sphere, metallic latex chrome balloons, heavy-weight pleated cardstock",
      includedItems: "1 Complete Handcrafted Panda Teddy & Gold Balloon Gift Arrangement",
      customizationAvailable: true,
      customizationNote: "Include a personal message card at checkout.",
      images: JSON.stringify([
        "/products/teddy-gold-balloon-1.jpg",
        "/products/teddy-gold-balloon-2.jpg",
        "/products/teddy-gold-balloon-3.jpg",
        "/products/teddy-gold-balloon-4.jpg",
      ]),
      keywords: "teddy bear balloon gift, birthday gift India, teddy gift arrangement, anniversary surprise, cute gift hamper, panda gift",
    },
    {
      slug: "black-gold-rose-dome",
      title: "Black & Gold Rose Dome — Premium Statement Gift",
      subtitle: "Striking black-and-gold dome with golden balloons, red roses & warm fairy lights",
      shortDescription:
        "A dramatic statement gift combining metallic gold balloons inside a clear dome, surrounded by velvety red roses, warm micro-LED fairy lights, a pleated black base, and a luxury gold satin bow.",
      description:
        "Make a bold, luxurious impression with our signature Black & Gold Rose Dome arrangement. Designed for milestone celebrations, luxury gifting, and statement surprises, this masterpiece brings together rich black textures, sparkling gold chrome, and deep romantic red blooms.\n\nInside the crystal-clear sphere float high-gloss golden balloons, crowned with a dual-tone black and gold satin ribbon bow. Encircling the base of the sphere is a lavish collar of rich red roses intertwined with warm micro-LED fairy lights that cast an ethereal golden glow in dim evening settings.\n\nThe entire presentation is supported by an architectural black pleated base with metallic gold foil edging, standing tall on any dining table, console, or party display.\n\nIntegrated with an easily accessible discreet battery pack, you can switch on the glowing fairy lights with a simple click whenever evening celebrations begin.",
      price: 1499,
      compareAtPrice: 1899,
      isPriceConfirmed: true,
      category: "Floral Dome Gifts",
      occasions: "Milestone Birthday (18th, 25th, 50th), 25th Anniversary, Romantic Surprise, Engagement Party, Luxury Corporate Gift",
      stock: 12,
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      highlights: JSON.stringify([
        "Regal black-and-gold color palette with deep velvety red roses",
        "Clear transparent bubble sphere containing metallic gold chrome balloons",
        "Integrated warm white micro-LED fairy lights (battery operated, switch included)",
        "Origami-fluted black base with gold foil gilded borders",
        "Dual-tone gold and black satin bow atop the dome",
        "Sensational illuminated centerpiece for evening dinners and celebrations",
      ]),
      dimensions: "Total Height: approx. 38 cm; Sphere Diameter: approx. 22 cm; Base Width: approx. 24 cm",
      materials: "Optical clear acrylic dome, metallic latex balloons, artificial red rose blossoms, warm LED micro wire, satin ribbon, pleated art card",
      includedItems: "1 Black & Gold Rose Dome with integrated battery-operated LED fairy lights (batteries included)",
      customizationAvailable: true,
      customizationNote: "Complimentary handwritten message card can be included with your gift.",
      images: JSON.stringify([
        "/products/black-gold-rose-dome-1.jpg",
        "/products/black-gold-rose-dome-2.jpg",
        "/products/black-gold-rose-dome-3.jpg",
        "/products/black-gold-rose-dome-4.jpg",
      ]),
      keywords: "black gold rose dome, premium rose gift, elegant anniversary gift, decorative floral gift India, fairy light balloon dome",
    },
    {
      slug: "panda-silver-balloon-letter-light",
      title: "Panda Teddy Gift with Silver Balloon & Letter Light",
      subtitle: "Personalized wooden crate hamper with glowing LED alphabet letter (A-Z)",
      shortDescription:
        "An unforgettable personalized gift hamper featuring a wooden keepsake crate, plush panda teddy, metallic silver balloon cluster, and an illuminated warm LED marquee alphabet initial light of your choice.",
      description:
        "Personalized gifting reaches new heights of thoughtfulness with this bespoke Panda Teddy & Letter Light Hamper from Purti Creations.\n\nPresented in a rustic natural wooden crate cushioned with black crinkle paper, this hamper features a lovable panda plush bear sitting beside an illuminated marquee letter light. You can customize the light with any initial alphabet (A through Z) to celebrate the recipient’s name or special initials.\n\nRising behind the teddy is a floating arch of metallic silver and dark chrome balloon clusters that create an upscale, celebratory party vibe. The marquee letter operates on standard replaceable batteries with a discreet toggle switch, allowing the recipient to keep their illuminated initial glowing on their bedside table long after the party ends.\n\nPerfect for milestone birthdays, romantic name surprises, graduation milestones, or a new baby arrival.",
      price: 1699,
      compareAtPrice: 2099,
      isPriceConfirmed: true,
      category: "Teddy & Balloon Gifts",
      occasions: "Birthday, Name Day, Personalised Surprise, Anniversary, Graduation, Baby Arrival",
      stock: 6,
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      highlights: JSON.stringify([
        "Includes personalized warm LED marquee alphabet light (Choice of A to Z)",
        "Cuddly plush panda teddy bear in black-and-white polka-dot styling",
        "Cluster of metallic silver and dark chrome latex celebration balloons",
        "Reusable natural pine wooden gift crate with decorative black crinkle paper filler",
        "Battery-operated light with easy on/off switch for bedroom nightstand decor",
        "One of our most photogenic, viral gifting arrangements for birthdays",
      ]),
      dimensions: "Wooden Crate: 25 cm x 18 cm x 8 cm; Total Arrangement Height: approx. 32 cm; Marquee Light Height: approx. 16 cm",
      materials: "Natural pine wooden crate, warm LED marquee plastic letter, plush polyester teddy, metallic latex balloons, shredded paper",
      includedItems: "1 Natural Wooden Crate, 1 Plush Panda Teddy, 1 Illuminated Marquee Initial Letter Light (with batteries), Silver Balloon Cluster",
      customizationAvailable: true,
      customizationNote: "Select any initial alphabet (A-Z) during checkout or over WhatsApp.",
      images: JSON.stringify([
        "/products/panda-silver-balloon-letter-light-1.jpg",
        "/products/panda-silver-balloon-letter-light-2.jpg",
        "/products/panda-silver-balloon-letter-light-3.jpg",
        "/products/panda-silver-balloon-letter-light-4.jpg",
      ]),
      keywords: "panda teddy gift, silver balloon gift, letter light gift, birthday surprise, cute gift arrangement India, personalized alphabet hamper",
    },
    {
      slug: "shubh-labh-festive-display",
      title: "Shubh Labh Festive Decorative Collection Display",
      subtitle: "Multi-piece ensemble of traditional handcrafted torans and brocade chowki",
      shortDescription:
        "A grand ensemble of handcrafted festive Shubh Labh designs showcasing traditional Indian gota patti embroidery, mirror work, pearl rings, and a centerpiece pink Banarasi brocade chowki base.",
      description:
        "Celebrate the grandeur of Indian festivals and sacred ceremonies with this comprehensive Shubh Labh Festive Decorative Display Ensemble by Purti Creations.\n\nThis curated collection brings together multiple traditional Indian decorative arts: wooden-stand Shubh Labh rings draped in saffron and emerald silk threads, floral sunburst medallions with dual-tone beadwork, royal blue toran medallions with gold cord fringe, and a magnificent central Banarasi brocade decorative chowki trimmed with handcrafted zari gotapatti balls and pearl clusters.\n\nWhether you are preparing your home for Diwali lakshmi pooja, setting up a lavish Griha Pravesh entryway, or decorating a Ganesh Utsav mandap, this multi-piece ensemble provides endless styling possibilities for walls, pooja altars, and entry doors.\n\nEvery element is individually handcrafted with reinforced backings and durable threads to be stored safely in its protective box and brought out year after year.",
      price: 1899,
      compareAtPrice: 2299,
      isPriceConfirmed: true,
      category: "Festive Door Hangings",
      occasions: "Diwali, Griha Pravesh, Ganesh Utsav, Navratri, Pooja Mandap Decor, Wedding Shagun",
      stock: 5,
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      highlights: JSON.stringify([
        "Curated festive ensemble showcasing diverse traditional Indian border motifs",
        "Includes handcrafted pink Banarasi brocade decorative chowki base with gold zari balls",
        "Multiple Shubh-Labh hanging pairs with yellow gota, orange-red beads, and royal blue accents",
        "Versatile multi-piece arrangement for main doors, pooja walls, and decorative floor rangolis",
        "High durability and reusable for every annual family festival and ritual",
        "Packed in organized compartmental packaging for safe seasonal storage",
      ]),
      dimensions: "Central Chowki: approx. 22 cm diameter; Hanging Pairs: 12 cm to 16 cm each; Assorted ensemble",
      materials: "Banarasi brocade fabric, gota patti lace, pearl-style clusters, zari metallic balls, silk embroidery thread, MDF core",
      includedItems: "Festive Multi-Piece Shubh Labh Collection Display including Central Brocade Chowki & Toran Pairs",
      customizationAvailable: false,
      images: JSON.stringify([
        "/products/shubh-labh-festive-display-1.jpg",
        "/products/shubh-labh-festive-display-2.jpg",
        "/products/shubh-labh-festive-display-3.jpg",
        "/products/shubh-labh-festive-display-4.jpg",
      ]),
      keywords: "festive home decor, Shubh Labh display, pooja wall decor, Diwali backdrop, Indian festive gifts, brocade chowki, toran set",
    },
    {
      slug: "evil-eye-door-hanging",
      title: "Evil Eye Pearl & Bead Door Hanging",
      subtitle: "Auspicious Nazar Battu positive energy protection hanging with blue tassels",
      shortDescription:
        "Welcome good vibes, serenity, and protective energy to your home entrance with this handcrafted two-tier Evil Eye door hanging, intricately woven with white and cobalt beads and flowing blue silk tassels.",
      description:
        "Protect your sacred sanctuary from negative vibrations while adding a touch of artisanal elegance with the Evil Eye Pearl & Bead Door Hanging from Purti Creations.\n\nFeaturing two concentric circular medallions woven from vibrant cobalt blue, sky turquoise, and lustrous ivory pearl beads, this traditional Nazar Battu is accented with diagonal golden cord rays. The medallions are connected by a sturdy braided cord with matching bead spacers, culminating in long, silky cyan tassels that flutter gently with incoming breezes.\n\nIn Indian tradition, displaying an evil eye or nazar protector at the main entrance door, balcony foyer, or office reception welcomes harmony, peace, and abundance while deflecting envy.\n\nLightweight yet highly durable, it includes a sturdy top hanging loop designed to slip easily over any door hook, nail, or door handle without causing marks.",
      price: 799,
      compareAtPrice: 999,
      isPriceConfirmed: true,
      category: "Festive Door Hangings",
      occasions: "Housewarming, Griha Pravesh, New Office Opening, Foyer Wall Decor, Positive Energy Blessing",
      stock: 14,
      inStock: true,
      isFeatured: true,
      isBestSeller: true,
      highlights: JSON.stringify([
        "Two-tier concentric Evil Eye Nazar Battu medallions with silk tassels",
        "Intricate bead weaving in cobalt blue, turquoise, and ivory pearl tones",
        "Accented with diagonal golden metallic cords and decorative blue bead spacers",
        "Flowing silky blue tassels that add graceful vertical length to entry doors",
        "Brings positive energy, protection, and modern aesthetic charm to foyers",
        "Durable, lightweight construction with built-in top hanging loop",
      ]),
      dimensions: "Medallion Diameter: approx. 14 cm each; Total Hanging Length with Tassels: approx. 48 cm",
      materials: "Acrylic bead weave, faux pearls, metallic wire inner ring, braided nylon cord, rayon silk tassels",
      includedItems: "1 Complete Handcrafted Two-Tier Evil Eye Door Hanging with hanging loop",
      customizationAvailable: false,
      images: JSON.stringify([
        "/products/evil-eye-door-hanging-1.jpg",
        "/products/evil-eye-door-hanging-2.jpg",
        "/products/evil-eye-door-hanging-3.jpg",
        "/products/evil-eye-door-hanging-4.jpg",
      ]),
      keywords: "evil eye hanging, nazar battu, housewarming gift, positive vibes decor, entrance door hanging India, blue tassel hanging",
    },
    {
      slug: "festive-shagun-coconut-chowki",
      title: "Festive Shagun Coconut on Handcrafted Brocade Chowki",
      subtitle: "Sacred ceremonial Shagun Nariyal set on Banarasi brocade base with gold gota balls",
      shortDescription:
        "An auspicious ceremonial Shagun Nariyal presentation set, draped in seafoam net wrapping with an auspicious red rose and pearl spray, resting upon a handcrafted pink Banarasi brocade chowki base.",
      description:
        "Elevate auspicious Hindu ceremonies, wedding sagai rituals, Griha Pravesh poojas, and festive celebrations with this royal Shagun Nariyal presentation set by Purti Creations.\n\nIn Indian traditions, the sacred coconut (Nariyal) symbolizes the divine presence, prosperity, and blessings of Goddess Lakshmi. This handcrafted set reimagines the traditional shagun with unmatched artistic refinement: an authentic coconut is swathed in ethereal seafoam net, adorned with an auspicious velvet red rose, pearl sprays, and golden gotapatti ties.\n\nThe coconut rests upon a handcrafted circular chowki base upholstered in rich pink Banarasi floral brocade. The perimeter of the chowki is lavishly bordered with dozens of golden gota balls and pearl droplet clusters, creating a throne of honor for sacred rituals.\n\nA revered heirloom gift for wedding mandaps, housewarmings, Raksha Bandhan thalis, and temple offerings.",
      price: 999,
      compareAtPrice: 1299,
      isPriceConfirmed: true,
      category: "Festive & Housewarming",
      occasions: "Weddings, Sagai / Engagement, Griha Pravesh, Raksha Bandhan, Diwali Laxmi Pooja, Mandap Shagun",
      stock: 8,
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      highlights: JSON.stringify([
        "Sacred ceremonial Shagun Nariyal (decorative coconut) in seafoam net wrap",
        "Embellished with auspicious red velvet rose blossom and pearl spray detailing",
        "Includes handcrafted pink Banarasi brocade chowki base with gold gota ball border",
        "Sacred symbol of abundance, auspicious beginnings, and divine blessings",
        "Revered gift for Indian weddings, housewarmings, and festive pooja rituals",
        "Packed in structured rigid gift packaging to preserve decorative trims in transit",
      ]),
      dimensions: "Chowki Base Diameter: 22 cm; Total Height with Coconut: approx. 22 cm",
      materials: "Natural coconut, Banarasi silk brocade, zari gotapatti balls, faux pearl clusters, net fabric, artificial velvet rose",
      includedItems: "1 Decorative Shagun Coconut, 1 Handcrafted Banarasi Brocade Chowki Base in Rigid Presentation Box",
      customizationAvailable: false,
      images: JSON.stringify([
        "/products/festive-shagun-coconut-1.jpg",
        "/products/festive-shagun-coconut-2.jpg",
        "/products/festive-shagun-coconut-3.jpg",
        "/products/festive-shagun-coconut-4.jpg",
      ]),
      keywords: "shagun nariyal, wedding coconut decor, brocade chowki, griha pravesh gift, pooja shagun India, sagai shagun",
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  console.log("Successfully updated all products with 4 clean camera image angles and deep descriptions!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
