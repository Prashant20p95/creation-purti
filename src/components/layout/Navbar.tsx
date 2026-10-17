"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { brandConfig } from "@/config/brand";
import { Logo } from "@/components/common/Logo";

export function Navbar() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const [activeCategories, setActiveCategories] = useState<Array<{ name: string; slug: string }>>([
    { name: "Floral Domes", slug: "floral-domes" },
    { name: "Shubh Labh & Torans", slug: "festive-hangings" },
    { name: "Teddy & Balloon Hampers", slug: "teddy-and-balloons" },
  ]);

  React.useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.categories)) {
          setActiveCategories(data.categories.map((c: any) => ({ name: c.name, slug: c.slug })));
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Gifts", href: "/shop" },
    ...activeCategories.map((c) => ({
      label: c.name,
      href: `/shop?category=${c.slug}`,
    })),
    { label: "Our Story", href: "/about" },
    { label: "Studio Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFE9E1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile Left: Menu Toggle & Search */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-800 hover:text-burgundy-900 focus:outline-none focus:ring-2 focus:ring-burgundy-800 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-stone-700 hover:text-burgundy-900 focus:outline-none focus:ring-2 focus:ring-burgundy-800 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Open search bar"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Wordmark (Strictly "Purti Creations", serif typography) */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[13px] font-medium tracking-wide text-stone-700">
            <Link
              href="/shop"
              className="hover:text-burgundy-900 transition-colors py-1 relative group"
            >
              <span>All Gifts</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-burgundy-900 transition-all duration-300 group-hover:w-full" />
            </Link>

            {activeCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="hover:text-burgundy-900 transition-colors py-1 relative group"
              >
                <span>{cat.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-burgundy-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/about"
              className="hover:text-burgundy-900 transition-colors py-1 relative group"
            >
              <span>Our Story</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-burgundy-900 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="hover:text-burgundy-900 transition-colors py-1 relative group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-burgundy-900 transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:flex p-2 text-stone-700 hover:text-burgundy-900 hover:bg-stone-100/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy-800"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct Studio WhatsApp Consultation */}
            <a
              href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
                "Hello Purti Creations! I would like to inquire about your handcrafted gift collection."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100/80 text-xs font-medium transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Studio WhatsApp</span>
            </a>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-stone-800 hover:text-burgundy-900 hover:bg-stone-100/60 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-burgundy-800"
              aria-label={`Shopping bag containing ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-burgundy-950" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-burgundy-900 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs animate-scale-up">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Drawer */}
        {searchOpen && (
          <div className="py-3 px-2 border-t border-[#EFE9E1] animate-fade-rise">
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search handcrafted gifts (e.g., Rose Dome, Shubh Labh, Marquee Light, Teddy)..."
                autoFocus
                className="w-full px-4 py-2.5 pl-10 pr-20 bg-white border border-[#DDD5CA] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-burgundy-800 focus:border-transparent"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="submit"
                  className="px-3 py-1 bg-burgundy-900 text-white rounded-lg text-xs font-semibold hover:bg-burgundy-800 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex">
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between p-6 animate-fade-rise overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE9E1]">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-700 hover:text-stone-900"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold text-stone-800 hover:bg-white hover:text-burgundy-900 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </Link>
                ))}
              </nav>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Custom Orders & Consultations</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Chat directly with our studio artisans for bespoke personalization or bulk festival orders.
                </p>
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:underline pt-1"
                >
                  <span>Chat on WhatsApp: +91 {brandConfig.phone}</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[#EFE9E1] text-[11px] text-stone-500 space-y-1">
              <p className="font-semibold text-stone-800">Purti Creations Studio</p>
              <p>Handmade with Care in Delhi NCR, India</p>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
}
