import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors, Sparkles, PackageCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function ArtisanStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#FBF9F6] border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Authentic Studio Photography Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-white aspect-[4/5] group">
                <Image
                  src="/products/handcrafted-brocade-chowki-1.jpg"
                  alt="Purti Creations Handcrafted Banarasi Brocade & Zari Detailing"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                {/* Floating caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-sm">
                  <span className="text-[10px] font-bold text-burgundy-800 uppercase tracking-widest block">
                    ATELIER ETHOS
                  </span>
                  <p className="text-xs font-serif font-bold text-stone-900">
                    Handmade with Heart • Inspired by Life
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Philosophy & Integrity */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-burgundy-800 uppercase tracking-widest block">
                OUR HANDCRAFTED PHILOSOPHY
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-burgundy-950 leading-tight">
                Authentic Artisanal Care in Every Fold, Bead, & Ribbon.
              </h2>
            </div>

            <div className="space-y-4 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <p>
                At <strong className="text-stone-900 font-semibold">{brandConfig.name}</strong>, we believe gifting is an art form. Rather than offering mass-produced plastics, our boutique studio in Delhi NCR individually crafts celebratory pieces that reflect genuine sentiment.
              </p>
              <p>
                From hand-stringing lustrous faux pearls onto auspicious Shubh Labh torans to assembling crystal balloon surprise domes and crafting Banarasi brocade chowkis with zari gotapatti balls, every creation undergoes patient, meticulous hand-assembly.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#EFE9E1] shadow-2xs space-y-1.5">
                <Scissors className="w-5 h-5 text-burgundy-900" />
                <h4 className="text-xs font-bold text-stone-900">Patient Crafting</h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Each arrangement is individually assembled with attention to beading, ribbon flairs, and neat finishes.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#EFE9E1] shadow-2xs space-y-1.5">
                <Sparkles className="w-5 h-5 text-champagne-600" />
                <h4 className="text-xs font-bold text-stone-900">Honest Materials</h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Genuine Banarasi brocades, optical-grade acrylic domes, and solid pine wood crates.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#EFE9E1] shadow-2xs space-y-1.5">
                <PackageCheck className="w-5 h-5 text-emerald-700" />
                <h4 className="text-xs font-bold text-stone-900">Rigid Box Transit</h4>
                <p className="text-[11px] text-stone-500 leading-normal">
                  Multi-layer bubble wrap & heavy corrugated outer cartons for 100% damage-free delivery.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-burgundy-900 hover:text-burgundy-700 transition-colors"
              >
                <span>Discover Our Complete Atelier Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
