"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Minus,
  Plus,
  Share2,
  MessageCircle,
  Sparkles,
  ChevronRight,
  PackageCheck,
  Layers,
  HelpCircle,
  Ruler,
  Clock,
  Heart,
} from "lucide-react";
import { ProductItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { brandConfig, getWhatsAppProductUrl } from "@/config/brand";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedInitial, setSelectedInitial] = useState<string>("R");
  const [customNote, setCustomNote] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "shipping" | "care">("specs");

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/products/shubh-labh-pearl-hanging-1.jpg"];

  // Determine if this product genuinely uses an alphabet letter marquee (e.g. letter light)
  const isMarqueeLetterProduct =
    product.slug.includes("letter-light") ||
    (product.customizationNote && product.customizationNote.toLowerCase().includes("letter"));

  const handleAddToCart = () => {
    if (!product.price || !product.isPriceConfirmed) return;

    let customizationText = customNote.trim();
    if (isMarqueeLetterProduct && selectedInitial) {
      customizationText = `Illuminated Letter: ${selectedInitial}${customNote ? ` | Message: ${customNote}` : ""}`;
    }

    addItem(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: images[0],
        customization: customizationText || undefined,
        isPriceConfirmed: product.isPriceConfirmed,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setPincodeChecked(true);
    }
  };

  const whatsappUrl = getWhatsAppProductUrl({
    id: product.id,
    title: product.title,
    price: product.price,
  });

  const hasGenuineDiscount = Boolean(
    product.compareAtPrice && product.price && product.compareAtPrice > product.price
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center space-x-2 text-xs text-stone-500 overflow-x-auto pb-1"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-burgundy-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link href="/shop" className="hover:text-burgundy-900 transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category.toLowerCase().replace(/\s+/g, "-"))}`}
            className="hover:text-burgundy-900 transition-colors whitespace-nowrap"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Master Showcase: 4:5 Gallery (Left) + Buy Box (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Master Photo Display */}
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-white border border-[#EFE9E1] shadow-sm">
              <Image
                src={images[selectedImageIndex] || images[0]}
                alt={`${product.title} - Studio Angle ${selectedImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-all duration-300"
              />

              {/* Genuine Discount Badge */}
              {hasGenuineDiscount && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-burgundy-900 text-white rounded-lg shadow-sm">
                    Special Offer
                  </span>
                </div>
              )}

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-sm transition-all active:scale-95"
                title="Copy product link"
                aria-label="Share product"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>

              {/* View counter pill */}
              <div className="absolute bottom-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-medium">
                Photo {selectedImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* 4-Angle Thumbnail Row */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all p-0.5 bg-white shadow-2xs ${
                      selectedImageIndex === idx
                        ? "border-burgundy-900 ring-2 ring-burgundy-300/60"
                        : "border-[#EFE9E1] hover:border-stone-400 opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View photo angle ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} detail angle ${idx + 1}`}
                      fill
                      sizes="15vw"
                      className="object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buy Box & Product Specifications (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Title & Category */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-burgundy-800 uppercase tracking-widest block">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950 leading-tight">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Price & In-Stock Status Card */}
            <div className="p-5 bg-white rounded-2xl border border-[#EFE9E1] shadow-2xs space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-serif font-bold text-burgundy-950 font-mono">
                  {formatPrice(product.price)}
                </span>
                {hasGenuineDiscount && product.compareAtPrice && (
                  <span className="text-sm text-stone-400 line-through font-mono">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {hasGenuineDiscount && product.compareAtPrice && product.price && (
                  <span className="px-2 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-md">
                    Save ₹{product.compareAtPrice - product.price}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                <span>Inclusive of all taxes</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock • Ready to Dispatch</span>
                </span>
              </div>
            </div>

            {/* Product Short Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Conditional Personalization Box */}
            {product.customizationAvailable && (
              <div className="p-5 bg-white rounded-2xl border border-champagne-300/80 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-burgundy-800" />
                  <span className="text-xs font-bold text-burgundy-950 uppercase tracking-wider">
                    {isMarqueeLetterProduct ? "Personalized Marquee Initial" : "Complimentary Gift Note"}
                  </span>
                </div>

                {isMarqueeLetterProduct ? (
                  <div className="space-y-2">
                    <p className="text-xs text-stone-600">
                      Select the illuminated alphabet letter light to include in the wooden crate:
                    </p>
                    {/* Alphabet initial picker */}
                    <div className="flex flex-wrap gap-1.5 pt-1 max-h-28 overflow-y-auto pr-1">
                      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => setSelectedInitial(letter)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            selectedInitial === letter
                              ? "bg-burgundy-900 text-white shadow-xs"
                              : "bg-[#FAF8F5] text-stone-700 border border-[#EFE9E1] hover:border-stone-400"
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Free Handwritten Gift Note */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-700 block">
                    Handwritten message for the recipient:
                  </label>
                  <textarea
                    rows={2}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="E.g., Wishing you a very Happy Birthday! With love, Ritu & Rohit"
                    className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                  />
                </div>
              </div>
            )}

            {/* Quantity Stepper & Dual Buy Box CTAs */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-[#DDD5CA] rounded-xl bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-4 bg-white hover:bg-stone-50 text-burgundy-950 font-bold border-2 border-burgundy-900 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-burgundy-900" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-4 bg-burgundy-900 hover:bg-burgundy-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md hover:shadow-lg"
                >
                  <span>Buy Now</span>
                  <ChevronRight className="w-4 h-4 text-champagne-300" />
                </button>
              </div>

              {/* Direct Studio WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Ask Studio via WhatsApp (+91 {brandConfig.phone})</span>
              </a>
            </div>

            {/* PIN Code Delivery Checker */}
            <div className="p-4 bg-white rounded-2xl border border-[#EFE9E1] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-burgundy-900" />
                <span>Estimated Doorstep Delivery</span>
              </span>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ""));
                    setPincodeChecked(false);
                  }}
                  placeholder="Enter 6-digit PIN Code"
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-800 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex-shrink-0 transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Express delivery available to PIN <strong>{pincode}</strong> in 4–7 business days.
                  </span>
                </div>
              )}
            </div>

            {/* Product Specifications & Care Tabs */}
            <div className="border border-[#EFE9E1] rounded-2xl overflow-hidden bg-white shadow-2xs">
              <div className="flex border-b border-[#EFE9E1] bg-[#FAF8F5]">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                    activeTab === "specs"
                      ? "border-burgundy-900 text-burgundy-950 bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                    activeTab === "shipping"
                      ? "border-burgundy-900 text-burgundy-950 bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Shipping & Guarantee
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
                    activeTab === "care"
                      ? "border-burgundy-900 text-burgundy-950 bg-white"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Care Guide
                </button>
              </div>

              <div className="p-5 text-xs text-stone-600 space-y-3 leading-relaxed">
                {activeTab === "specs" && (
                  <div className="space-y-2">
                    {product.dimensions && (
                      <div className="flex items-start gap-2">
                        <Ruler className="w-4 h-4 text-burgundy-800 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900">Dimensions:</strong> {product.dimensions}
                        </div>
                      </div>
                    )}
                    {product.materials && (
                      <div className="flex items-start gap-2">
                        <Layers className="w-4 h-4 text-burgundy-800 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900">Materials:</strong> {product.materials}
                        </div>
                      </div>
                    )}
                    {product.includedItems && (
                      <div className="flex items-start gap-2">
                        <PackageCheck className="w-4 h-4 text-burgundy-800 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900">Included in Package:</strong> {product.includedItems}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Pan-India Express Dispatch:</strong> Shipped directly from our studio within 1–2 business days. Estimated transit is 4–7 business days.
                    </p>
                    <p>
                      <strong>Rigid Carton Protection:</strong> Packed with multi-layered shock-absorbing bubble cushioning inside heavy corrugated cartons.
                    </p>
                    <p className="text-emerald-800 font-semibold">
                      ✓ Free Pan-India Delivery on orders above ₹999.
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      Transit Damage Guarantee: In the rare event of transit damage, share unboxing photos on WhatsApp for an immediate free replacement.
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-2">
                    <p>
                      • Keep away from direct exposure to moisture or continuous direct sunlight.
                    </p>
                    <p>
                      • Gently dust the acrylic dome or pearl beads using a clean, soft micro-fiber cloth.
                    </p>
                    <p>
                      • For arrangements with warm micro-LED lights, replace button coin cells when brightness dims.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curated Related Gifts Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-[#EFE9E1] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-burgundy-800 uppercase tracking-widest block">
                  RECOMMENDED FOR YOU
                </span>
                <h2 className="text-2xl font-serif font-bold text-burgundy-950">
                  Complementary Handcrafted Gifts
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold text-burgundy-900 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
