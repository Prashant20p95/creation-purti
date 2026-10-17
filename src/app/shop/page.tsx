import React, { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ShopClient } from "./ShopClient";
import { ProductItem } from "@/types";
import { getActiveTaxonomy } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop Handcrafted Gifts & Festive Decor",
  description:
    "Explore our complete range of floral dome surprise gifts, Shubh Labh festive hangings, teddy balloon hampers, and auspicious decor by Purti Creations.",
};

export default async function ShopPage() {
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

  // Dynamically compute active categories & occasions so empty ones are hidden
  const taxonomy = getActiveTaxonomy(products, dbCategories);

  const activeCategories = taxonomy.activeCategories.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  const activeOccasions = taxonomy.activeOccasions.map((o) => ({
    name: o.name,
    slug: o.slug,
    query: o.query,
  }));

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ivory-50">
          <p className="text-sm font-medium text-stone-500 animate-pulse">
            Loading Purti Creations catalogue...
          </p>
        </div>
      }
    >
      <ShopClient
        initialProducts={products}
        categories={activeCategories}
        occasions={activeOccasions}
      />
    </Suspense>
  );
}
