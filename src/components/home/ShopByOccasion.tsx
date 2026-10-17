"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { ActiveOccasion } from "@/lib/taxonomy";

interface ShopByOccasionProps {
  occasions: ActiveOccasion[];
}

export function ShopByOccasion({ occasions }: ShopByOccasionProps) {
  // If no active occasions have products, hide the section automatically
  if (!occasions || occasions.length === 0) {
    return null;
  }

  return (
    <section id="occasions" className="py-12 sm:py-16 bg-white border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-burgundy-800 uppercase tracking-widest block">
              Celebrating Life’s Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950">
              Shop by Occasion
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              Handcrafted gifts thoughtfully designed for festivals, birthdays, romantic milestones, and personalized celebrations.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors self-start sm:self-auto"
          >
            <span>All Occasions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Occasion Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              href={`/shop?occasion=${occ.slug}`}
              className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#EFE9E1] hover:border-burgundy-300 transition-all duration-300 flex flex-col shadow-2xs hover:shadow-md"
            >
              {/* 4:5 Aspect Ratio Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <Image
                  src={occ.image}
                  alt={occ.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

                {/* Starting Price Pill */}
                {occ.startingPrice > 0 && (
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-semibold text-burgundy-950 shadow-2xs">
                    From ₹{occ.startingPrice}
                  </div>
                )}

                {/* Bottom Image Overlay Text for Mobile & Fast Scanning */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                  <span className="text-[9px] sm:text-[10px] font-bold text-champagne-300 uppercase tracking-wider block">
                    {occ.productCount} {occ.productCount === 1 ? "Gift" : "Gifts"}
                  </span>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-champagne-200 transition-colors leading-tight">
                    {occ.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer Microcopy */}
              <div className="p-3 sm:p-3.5 bg-white flex items-center justify-between border-t border-[#EFE9E1]">
                <p className="text-[10px] sm:text-xs text-stone-500 line-clamp-1">
                  {occ.description}
                </p>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-burgundy-900 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
