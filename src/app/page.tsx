import React from "react";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { AvailableGifts } from "@/components/home/AvailableGifts";
import { getActiveTaxonomy } from "@/lib/taxonomy";
import { ProductItem } from "@/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const dbCategories = await prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
  });

  const products: ProductItem[] = dbProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    isPriceConfirmed: p.isPriceConfirmed,
    category: p.category,
    occasions: p.occasions ? p.occasions.split(",").map((s) => s.trim()) : [],
    stock: p.stock,
    inStock: p.inStock,
    isFeatured: p.isFeatured,
    isBestSeller: p.isBestSeller,
    highlights: JSON.parse(p.highlights || "[]"),
    dimensions: p.dimensions,
    materials: p.materials,
    includedItems: p.includedItems,
    customizationAvailable: p.customizationAvailable,
    customizationNote: p.customizationNote,
    images: JSON.parse(p.images || "[]"),
    keywords: p.keywords,
  }));

  // Genuinely dynamic taxonomy: empty categories & occasions are automatically hidden
  const taxonomy = getActiveTaxonomy(products, dbCategories);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Compact Hero Banner with single primary 'Shop Gifts' CTA */}
      <Hero />

      {/* 2. Shop by Occasion: Dynamic cards based on actual product data */}
      <ShopByOccasion occasions={taxonomy.activeOccasions} />

      {/* 3. Available Gifts: Single clean product grid without redundant duplicates */}
      <AvailableGifts products={taxonomy.activeProducts} />
    </div>
  );
}
