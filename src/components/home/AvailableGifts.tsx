"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductItem } from "@/types";

interface AvailableGiftsProps {
  products: ProductItem[];
}

export function AvailableGifts({ products }: AvailableGiftsProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-16 bg-[#FAF8F5] text-center border-b border-[#EFE9E1]">
        <div className="max-w-md mx-auto px-4 space-y-3">
          <Sparkles className="w-6 h-6 text-champagne-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Artisanal Batches Currently in Production
          </h3>
          <p className="text-xs text-stone-500">
            Our studio is preparing the next collection of handcrafted gifts. Reach out directly on WhatsApp for custom orders.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy-900 hover:underline pt-2"
          >
            <span>Contact Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="available-gifts" className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-burgundy-800 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>Direct Studio Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950">
              Available Handcrafted Gifts
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              Authentic handmade keepsakes, door torans, and celebratory hampers ready for prompt, safe pan-India dispatch.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors self-start sm:self-auto"
          >
            <span>View Full Catalogue ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean Single Product Grid (Every product appears strictly once) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
