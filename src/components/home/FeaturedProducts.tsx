import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductItem } from "@/types";

interface FeaturedProductsProps {
  products: ProductItem[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Only display products with confirmed pricing and in-stock status
  const activeProducts = products
    .filter((p) => p.price && p.isPriceConfirmed && p.inStock)
    .slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-burgundy-800 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-champagne-400" />
              <span>HANDMADE ATELIER HIGHLIGHTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy-950">
              Curated Customer Favourites
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              From illuminated letter hampers to auspicious Shubh Labh torans and rose surprise domes, explore our most cherished handmade gifts.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors"
          >
            <span>Explore All Gifts ({activeProducts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4:5 Responsive Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {activeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Editorial Callout Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-white rounded-3xl border border-[#EFE9E1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-base sm:text-lg text-burgundy-950">
              Need a Custom Alphabet Light or Bulk Shagun Order?
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Personalized initial lights (A–Z) and festive chowki arrangements can be crafted to order.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-900 hover:bg-burgundy-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex-shrink-0"
          >
            <span>Custom Order Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
