"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, PackageCheck, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F8F4EE] to-[#FAF8F5] border-b border-[#EFE9E1] py-10 sm:py-14 lg:py-16">
      {/* Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-burgundy-900/10 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-champagne-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Atelier Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200/60 text-burgundy-900 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400 flex-shrink-0" />
              <span>Handcrafted in India • Artisanal Studio</span>
            </div>

            {/* Display Headline & Short Tagline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight leading-[1.15]">
                <span>Thoughtful Gifts.</span>{" "}
                <span className="block sm:inline italic font-normal text-burgundy-900">
                  Beautifully Remembered.
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover handcrafted floral surprise domes, auspicious pearl door hangings, and bespoke celebration hampers — lovingly assembled in our Delhi NCR studio for life’s most meaningful moments.
              </p>
            </div>

            {/* Single Primary "Shop Gifts" CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-burgundy-900 hover:bg-burgundy-800 active:scale-[0.99] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <span>Shop Gifts</span>
                <ArrowRight className="w-4 h-4 text-champagne-300" />
              </Link>
            </div>

            {/* Compact Trust Indicators */}
            <div className="pt-3 border-t border-[#EFE9E1] grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-3.5 h-3.5 text-burgundy-800 flex-shrink-0" />
                <div className="text-[10px] sm:text-[11px] leading-tight">
                  <p className="font-bold text-stone-900">Handmade Quality</p>
                  <p className="text-stone-500 hidden sm:block">Authentic materials</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <PackageCheck className="w-3.5 h-3.5 text-burgundy-800 flex-shrink-0" />
                <div className="text-[10px] sm:text-[11px] leading-tight">
                  <p className="font-bold text-stone-900">Protected Transit</p>
                  <p className="text-stone-500 hidden sm:block">Rigid gift cartons</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Heart className="w-3.5 h-3.5 text-burgundy-800 flex-shrink-0" />
                <div className="text-[10px] sm:text-[11px] leading-tight">
                  <p className="font-bold text-stone-900">Free Gift Note</p>
                  <p className="text-stone-500 hidden sm:block">Handwritten message</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Banner Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-white aspect-[4/5] group">
                <Image
                  src="/products/pink-rose-dome-1.jpg"
                  alt="Purti Creations Handcrafted Gift Keepsake"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Studio Label */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/70 shadow-md flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-semibold tracking-wider text-burgundy-800 uppercase block">
                      Handcrafted Atelier
                    </span>
                    <h3 className="text-xs font-serif font-bold text-stone-900 leading-tight">
                      Artisanal Keepsakes & Decor
                    </h3>
                  </div>
                  <Link
                    href="/shop"
                    className="text-[10px] font-semibold text-burgundy-800 hover:text-burgundy-950 flex items-center gap-0.5"
                  >
                    <span>Browse</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
