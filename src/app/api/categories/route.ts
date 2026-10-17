import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveTaxonomy } from "@/lib/taxonomy";
import { ProductItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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

    const taxonomy = getActiveTaxonomy(products, dbCategories);

    return NextResponse.json({
      success: true,
      categories: taxonomy.activeCategories,
      occasions: taxonomy.activeOccasions,
      totalActiveProducts: taxonomy.totalActiveCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load categories" },
      { status: 500 }
    );
  }
}
