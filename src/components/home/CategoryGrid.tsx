import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const collections = [
  {
    title: "Floral Dome Keepsakes",
    slug: "floral-domes",
    subtitle: "Crystal surprise spheres with preserved roses & fairy lights",
    image: "/products/pink-rose-dome-1.jpg",
    itemCount: "3 Gifts",
    priceStarts: "From ₹1,299",
  },
  {
    title: "Shubh Labh & Festive Torans",
    slug: "festive-hangings",
    subtitle: "Faux pearl rings, velvet medallions & auspicious door decor",
    image: "/products/shubh-labh-pearl-hanging-1.jpg",
    itemCount: "3 Gifts",
    priceStarts: "From ₹699",
  },
  {
    title: "Celebration Hampers & Letter Lights",
    slug: "teddy-and-balloons",
    subtitle: "Wooden crates with illuminated marquee letters & cuddly plush",
    image: "/products/panda-silver-balloon-letter-light-1.jpg",
    itemCount: "2 Gifts",
    priceStarts: "From ₹1,199",
  },
  {
    title: "Ceremonial Shagun & Chowki Gifts",
    slug: "festive-and-housewarming",
    subtitle: "Banarasi silk brocade chowkis for rituals & festive blessings",
    image: "/products/festive-shagun-coconut-1.jpg",
    itemCount: "2 Gifts",
    priceStarts: "From ₹799",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-burgundy-800 uppercase tracking-widest block">
              ATELIER CURATION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy-950">
              Explore Our Signature Collections
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              Each collection is designed and assembled by hand in our studio, pairing traditional Indian celebratory warmth with contemporary elegance.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Atelier Architectural Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={`/shop?category=${col.slug}`}
              className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#EFE9E1] hover:border-burgundy-300 transition-all duration-300 flex flex-col shadow-xs hover:shadow-md"
            >
              {/* Image Container in 4:5 ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating pill badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-semibold text-burgundy-950 tracking-wider uppercase shadow-2xs">
                  {col.priceStarts}
                </div>
              </div>

              {/* Text Information */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-burgundy-800 uppercase tracking-widest block">
                    {col.itemCount}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-burgundy-900 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE9E1] flex items-center justify-between text-xs font-semibold text-burgundy-900 group-hover:text-burgundy-700">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
