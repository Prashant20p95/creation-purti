import React from "react";
import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { Heart, Sparkles, Scissors, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Purti Creations — Our Handcrafted Gifting Story",
  description:
    "Learn about Purti Creations, an artisan gifting and decorative studio in India dedicated to crafting floral surprise domes, Shubh Labh door decor, and heartfelt keepsakes.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-burgundy-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-champagne-700" />
            <span>Our Artisanal Journey</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-burgundy-950">
            About {brandConfig.name}
          </h1>
          <p className="text-sm sm:text-base text-burgundy-700 font-serif italic">
            &ldquo;{brandConfig.tagline}&rdquo;
          </p>
        </div>

        {/* Brand Sign Visual */}
        <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white aspect-[21/9] bg-stone-900">
          <Image
            src="/brand/purti-creations-badge.jpg"
            alt="Purti Creations Handcrafted Wooden Studio Sign"
            fill
            className="object-cover"
          />
        </div>

        {/* Core Narrative */}
        <div className="bg-white p-8 sm:p-10 rounded-xl border border-ivory-200 shadow-sm space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl font-serif font-bold text-burgundy-950">
            Where Thoughtfulness Meets Handcrafted Elegance
          </h2>

          <p>
            Welcome to <strong className="text-stone-900">{brandConfig.name}</strong>. We started our studio with a simple belief: gifts should feel personal, emotional, and genuinely handmade. In a market crowded with mass-produced items, handmade gifts carry warmth, individuality, and soulful care.
          </p>

          <p>
            Whether you are welcoming prosperity into a new home with our handcrafted <em>Shubh Labh</em> pearl hangings, creating an unforgettable anniversary surprise with a delicate <em>Floral Dome</em>, or celebrating a birthday with a joyful <em>Teddy & Balloon Hamper</em>, each product is individually styled in our studio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-ivory-50 rounded-2xl border border-ivory-200 space-y-1">
              <span className="font-bold text-stone-900 text-sm block">Artisanal Honesty</span>
              <p className="text-xs text-stone-600">
                We present authentic photographs of our actual creations. Every piece is handcrafted; natural artistic variations in beading and ribbons make each creation unique.
              </p>
            </div>
            <div className="p-4 bg-ivory-50 rounded-2xl border border-ivory-200 space-y-1">
              <span className="font-bold text-stone-900 text-sm block">Celebrations Across India</span>
              <p className="text-xs text-stone-600">
                From Diwali, Griha Pravesh, and Raksha Bandhan to birthdays, engagements, and milestones—our creations are designed to grace your family memories.
              </p>
            </div>
          </div>

          <p>
            Every order is carefully inspected, securely cushioned in multi-layer bubble wrap, and packed in reinforced cartons so it reaches you or your loved ones in pristine condition.
          </p>
        </div>

        {/* Gallery of creations */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold text-burgundy-950 text-center">
            Moments from Our Workshop
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-ivory-200">
              <Image
                src="/products/shubh-labh-pearl-hanging-1.jpg"
                alt="Shubh Labh door decor"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-ivory-200">
              <Image
                src="/products/pink-rose-dome-1.jpg"
                alt="Pink rose dome surprise"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-ivory-200">
              <Image
                src="/products/teddy-gold-balloon-1.jpg"
                alt="Teddy and balloon hamper"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-ivory-200">
              <Image
                src="/products/handcrafted-brocade-chowki-1.jpg"
                alt="Brocade detailing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Direct Connect */}
        <div className="p-8 rounded-xl bg-burgundy-900 text-white text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-serif font-bold text-ivory-50">
            Have a Custom Gift Idea in Mind?
          </h3>
          <p className="text-xs sm:text-sm text-ivory-200 max-w-lg mx-auto">
            We love crafting personalized arrangements! Connect directly with our artisan on WhatsApp to discuss customized color themes, letters, and celebration hampers.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
                "Hello Purti Creations! I would like to discuss a custom gifting requirement."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 {brandConfig.phone})</span>
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-ivory-100 text-stone-900 font-semibold rounded-xl text-xs sm:text-sm transition-all"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
