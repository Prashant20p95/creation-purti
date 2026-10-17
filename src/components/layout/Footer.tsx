import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, MapPin, Heart, Shield, Sparkles } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-serif font-bold text-ivory-50 tracking-tight block">
              Purti Creations
            </span>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {brandConfig.description}
            </p>
            
            {/* Direct Contact */}
            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne-400 flex-shrink-0" />
                <a
                  href={`tel:${brandConfig.phone}`}
                  className="hover:text-champagne-300 transition-colors"
                >
                  {brandConfig.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: +91 {brandConfig.phone}
                </a>
              </div>
              <div className="flex items-start gap-2 text-stone-400">
                <MapPin className="w-4 h-4 text-burgundy-400 flex-shrink-0 mt-0.5" />
                <span>{brandConfig.addressNotice}</span>
              </div>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-ivory-100 tracking-wider text-xs uppercase">
              Gifting Collections
            </h3>
            <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
              <li>
                <Link href="/shop?category=floral-domes" className="hover:text-ivory-50 transition-colors">
                  Floral Dome Gifts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=festive-hangings" className="hover:text-ivory-50 transition-colors">
                  Shubh Labh & Hangings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=teddy-and-balloons" className="hover:text-ivory-50 transition-colors">
                  Teddy & Balloon Gifts
                </Link>
              </li>
              <li>
                <Link href="/shop?category=festive-and-housewarming" className="hover:text-ivory-50 transition-colors">
                  Gifts for Special Occasions
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-ivory-50 transition-colors">
                  All Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-ivory-100 tracking-wider text-xs uppercase">
              Customer Care
            </h3>
            <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-ivory-50 transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory-50 transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ivory-50 transition-colors">
                  FAQs & Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-ivory-50 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ivory-50 transition-colors text-stone-500">
                  Store Owner Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Transparency */}
          <div className="space-y-3 text-sm">
            <h3 className="font-semibold text-ivory-100 tracking-wider text-xs uppercase">
              Store Policies
            </h3>
            <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
              <li>
                <Link href="/policies/shipping" className="hover:text-ivory-50 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-ivory-50 transition-colors">
                  Return & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-ivory-50 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-ivory-50 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Honest Artisan Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {brandConfig.name}. Crafted for your special moments.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>Secure Packaging</span>
            <span>&bull;</span>
            <span>Customer Support</span>
            <span>&bull;</span>
            <span>Verified Orders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
