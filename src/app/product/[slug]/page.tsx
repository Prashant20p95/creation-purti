import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductItem } from "@/types";
import { brandConfig } from "@/config/brand";

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const images = JSON.parse(product.images || "[]");
  const mainImage = images[0] || "/products/shubh-labh-pearl-hanging-1.jpg";

  return {
    title: `${product.title} | ${brandConfig.name}`,
    description: product.shortDescription,
    keywords: product.keywords ? product.keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title: `${product.title} — ${brandConfig.name}`,
      description: product.shortDescription,
      images: [
        {
          url: mainImage,
          width: 716,
          height: 955,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const dbProduct = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!dbProduct) {
    notFound();
  }

  const relatedDbProducts = await prisma.product.findMany({
    where: {
      id: { not: dbProduct.id },
      category: dbProduct.category,
    },
    take: 4,
  });

  const transformProduct = (p: typeof dbProduct): ProductItem => ({
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
  });

  const product = transformProduct(dbProduct);
  const relatedProducts = relatedDbProducts.map(transformProduct);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: brandConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
