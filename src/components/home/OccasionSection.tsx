import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, Home, Gift, ArrowRight } from "lucide-react";

const occasions = [
  {
    name: "Diwali & Festive Blessings",
    desc: "Auspicious pearl torans, velvet Shubh Labh medallions & ceremonial chowkis",
    query: "festive",
    image: "/products/shubh-labh-pearl-hanging-1.jpg",
    icon: Sparkles,
  },
  {
    name: "Weddings & Housewarming",
    desc: "Shagun nariyal on Banarasi chowkis & Nazar Battu protective door hangings",
    query: "housewarming",
    image: "/products/festive-shagun-coconut-1.jpg",
    icon: Home,
  },
  {
    name: "Birthdays & Personal Milestones",
    desc: "Illuminated marquee letter lights in rustic pine crates & plush teddy hampers",
    query: "birthday",
    image: "/products/panda-silver-balloon-letter-light-1.jpg",
    icon: Gift,
  },
  {
    name: "Anniversaries & Romance",
    desc: "Preserved rose bouquets in crystal bubble spheres with ambient micro lights",
    query: "anniversary",
    image: "/products/pink-rose-dome-1.jpg",
    icon: Heart,
  },
];

export function OccasionSection() {
  return (
    <section id="occasions" className="py-16 sm:py-24 bg-white border-b border-[#EFE9E1] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-burgundy-800 uppercase tracking-widest block">
              CELEBRATING LIFE’S MOMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy-950">
              Shop by Celebratory Occasion
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xl">
              From auspicious house blessings to birthdays and romantic milestones, discover handcrafted keepsakes designed for authentic Indian sentiments.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors"
          >
            <span>Browse All Occasions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Rich Visual Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => {
            const Icon = occ.icon;
            return (
              <Link
                key={occ.name}
                href={`/shop?q=${occ.query}`}
                className="group relative bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#EFE9E1] hover:border-burgundy-400 transition-all duration-300 flex flex-col shadow-xs hover:shadow-md"
              >
                {/* 16:9 Image container with overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={occ.image}
                    alt={occ.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center text-burgundy-900 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-burgundy-900 transition-colors">
                      {occ.name}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                      {occ.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE9E1] flex items-center justify-between text-xs font-semibold text-burgundy-900 group-hover:text-burgundy-700">
                    <span>Explore Gifts</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
