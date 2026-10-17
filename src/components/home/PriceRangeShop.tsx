import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const priceRanges = [
  {
    label: "Under ₹799",
    description: "Festive Shubh Labh door hangings, evil eye charms & traditional shagun",
    href: "/shop?maxPrice=799",
  },
  {
    label: "₹800 to ₹1,299",
    description: "Keepsake rose domes, teddy balloon arrangements & ceremonial chowkis",
    href: "/shop?minPrice=800&maxPrice=1299",
  },
  {
    label: "₹1,300 and Above",
    description: "Statement black & gold domes, illuminated teddy letter lights & festive sets",
    href: "/shop?minPrice=1300",
  },
];

export function PriceRangeShop() {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-semibold text-burgundy-800 uppercase tracking-widest block">
            GIFTS FOR EVERY BUDGET
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950">
            Shop by Budget
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Thoughtful handmade gifts crafted with beauty, whatever your price point.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {priceRanges.map((range) => (
            <Link
              key={range.label}
              href={range.href}
              className="p-5 rounded-xl bg-ivory-50/70 border border-ivory-200 hover:border-stone-300 hover:bg-white hover:shadow-xs transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-burgundy-800 uppercase tracking-wider block">
                  Budget Selection
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-burgundy-900 transition-colors">
                  {range.label}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {range.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-ivory-200 flex items-center justify-between text-xs font-semibold text-burgundy-900 group-hover:text-burgundy-700">
                <span>View items</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
