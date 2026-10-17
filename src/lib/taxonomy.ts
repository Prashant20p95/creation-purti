import { ProductItem } from "@/types";

export interface ActiveCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  productCount: number;
  startingPrice: number;
}

export interface ActiveOccasion {
  name: string;
  slug: string;
  query: string;
  description: string;
  image: string;
  productCount: number;
  startingPrice: number;
}

export interface TaxonomyResult {
  activeCategories: ActiveCategory[];
  activeOccasions: ActiveOccasion[];
  activeProducts: ProductItem[];
  totalActiveCount: number;
}

/**
 * Standard occasions catalog for Purti Creations.
 * Evaluated against actual product data to determine real availability.
 */
export const OCCASION_TAXONOMY = [
  {
    name: "Festivals & Pooja",
    slug: "festivals",
    query: "festive",
    description: "Auspicious Shubh Labh torans, velvet medallions & ceremonial decor",
    matchKeywords: ["diwali", "festive", "ganesh", "navratri", "pooja", "mandap", "shagun"],
    fallbackImage: "/products/shubh-labh-pearl-hanging-1.jpg",
  },
  {
    name: "Birthdays & Milestones",
    slug: "birthdays",
    query: "birthday",
    description: "Handcrafted celebration hampers, plush teddies & glowing marquee lights",
    matchKeywords: ["birthday"],
    fallbackImage: "/products/panda-silver-balloon-letter-light-1.jpg",
  },
  {
    name: "Anniversary & Romance",
    slug: "anniversary",
    query: "anniversary",
    description: "Preserved rose bouquets in crystal domes with ambient fairy lights",
    matchKeywords: ["anniversary", "romantic", "romance", "valentine", "love"],
    fallbackImage: "/products/pink-rose-dome-1.jpg",
  },
  {
    name: "Personalized Gifts",
    slug: "personalized",
    query: "personalized",
    description: "Custom illuminated marquee letter hampers & bespoke keepsakes",
    matchKeywords: ["personal", "personalised", "personalized", "custom", "name day"],
    fallbackImage: "/products/panda-silver-balloon-letter-light-1.jpg",
  },
  {
    name: "Housewarming & Weddings",
    slug: "housewarming",
    query: "housewarming",
    description: "Handcrafted brocade chowkis, coconut sets & protective wall hangings",
    matchKeywords: ["housewarming", "griha pravesh", "wedding", "shagun"],
    fallbackImage: "/products/festive-shagun-coconut-1.jpg",
  },
];

/**
 * Validates whether a product is currently active, confirmed, and publishable.
 * Consistent across all storefront grids, category counts, and filters.
 */
export function isProductActive(p: {
  price?: number | null;
  isPriceConfirmed?: boolean;
  inStock?: boolean;
  stock?: number;
}): boolean {
  return Boolean(
    p.price !== null &&
    p.price !== undefined &&
    p.price > 0 &&
    p.isPriceConfirmed === true &&
    p.inStock === true &&
    (p.stock === undefined || p.stock > 0)
  );
}

/**
 * Computes active categories and active occasions dynamically from actual product data.
 * Zero hardcoded product counts; hides empty categories and occasions automatically.
 */
export function getActiveTaxonomy(
  allProducts: ProductItem[],
  dbCategories: Array<{
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    displayOrder?: number;
  }>
): TaxonomyResult {
  const activeProducts = allProducts.filter(isProductActive);

  // 1. Compute Active Categories
  const activeCategories: ActiveCategory[] = [];

  for (const cat of dbCategories) {
    const matchingProducts = activeProducts.filter(
      (p) => p.category.toLowerCase().trim() === cat.name.toLowerCase().trim()
    );

    if (matchingProducts.length > 0) {
      const prices = matchingProducts
        .map((p) => p.price)
        .filter((price): price is number => typeof price === "number" && price > 0);

      const startingPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const primaryImage =
        cat.image ||
        (matchingProducts[0].images && matchingProducts[0].images[0]) ||
        "/products/pink-rose-dome-1.jpg";

      activeCategories.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: primaryImage,
        productCount: matchingProducts.length,
        startingPrice,
      });
    }
  }

  // 2. Compute Active Occasions
  const activeOccasions: ActiveOccasion[] = [];

  for (const occ of OCCASION_TAXONOMY) {
    const matchingProducts = activeProducts.filter((p) => {
      // Check customizationAvailable for personalized
      if (occ.slug === "personalized" && p.customizationAvailable) {
        return true;
      }

      // Check occasions field
      const occasionString = (p.occasions || []).join(" ").toLowerCase();
      const titleAndDesc = `${p.title} ${p.shortDescription || ""}`.toLowerCase();

      return occ.matchKeywords.some(
        (kw) => occasionString.includes(kw) || titleAndDesc.includes(kw)
      );
    });

    if (matchingProducts.length > 0) {
      const prices = matchingProducts
        .map((p) => p.price)
        .filter((price): price is number => typeof price === "number" && price > 0);

      const startingPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const hasDesignatedImage = matchingProducts.some(
        (p) => p.images && p.images.includes(occ.fallbackImage)
      );
      const primaryImage = hasDesignatedImage
        ? occ.fallbackImage
        : (matchingProducts[0].images && matchingProducts[0].images[0]) ||
          occ.fallbackImage;

      activeOccasions.push({
        name: occ.name,
        slug: occ.slug,
        query: occ.query,
        description: occ.description,
        image: primaryImage,
        productCount: matchingProducts.length,
        startingPrice,
      });
    }
  }

  return {
    activeCategories,
    activeOccasions,
    activeProducts,
    totalActiveCount: activeProducts.length,
  };
}
