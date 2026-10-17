"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check, ArrowRight } from "lucide-react";
import { ProductItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: ProductItem;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const primaryImage = product.images?.[0] || "/products/shubh-labh-pearl-hanging-1.jpg";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.price || !product.isPriceConfirmed) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: primaryImage,
      isPriceConfirmed: product.isPriceConfirmed,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsCartOpen(true);
    }, 400);
  };

  const hasGenuineDiscount = Boolean(
    product.compareAtPrice && product.price && product.compareAtPrice > product.price
  );

  return (
    <div
      data-product-card={product.slug}
      className="group relative bg-white rounded-2xl border border-[#EFE9E1] hover:border-[#D8CEBF] transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs hover:shadow-md"
    >
      {/* Product Image Container (Strict 4:5 Aspect Ratio) */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative w-full aspect-[4/5] bg-[#F7F4EF] overflow-hidden"
      >
        <Image
          src={primaryImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Single authentic badge */}
        {hasGenuineDiscount ? (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-burgundy-900 text-white rounded-md shadow-xs">
              Special Price
            </span>
          </div>
        ) : product.isBestSeller ? (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-stone-900 text-white rounded-md shadow-xs">
              Best Seller
            </span>
          </div>
        ) : null}
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <p className="text-[10px] sm:text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            {product.category}
          </p>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-burgundy-900 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {product.subtitle && (
            <p className="text-[11px] text-stone-500 line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Pricing & Add to Bag Action */}
        <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-burgundy-950 font-mono">
              {formatPrice(product.price)}
            </span>
            {hasGenuineDiscount && product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through font-mono">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.price && product.isPriceConfirmed ? (
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs active:scale-95 ${
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-burgundy-900 hover:bg-burgundy-800 text-white"
              }`}
              aria-label={`Add ${product.title} to shopping bag`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-champagne-300" />
                  <span>Add</span>
                </>
              )}
            </button>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-semibold text-burgundy-800 hover:underline inline-flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
