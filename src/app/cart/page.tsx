"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { brandConfig, getWhatsAppCartUrl } from "@/config/brand";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
  } = useCart();

  const whatsappUrl = getWhatsAppCartUrl(items, total);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory-50/50 px-4 py-16 text-center">
        <div className="w-20 h-20 bg-ivory-100 rounded-full flex items-center justify-center text-stone-400 mb-4 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950 mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-stone-500 max-w-md mb-8">
          Explore our handcrafted floral dome surprise gifts, auspicious Shubh Labh door decor, and celebratory teddy hampers.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
        >
          <span>Explore All Gifts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-burgundy-800 mb-3"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Review Your Shopping Bag
          </h1>
          <p className="text-xs text-stone-500">
            {items.reduce((s, i) => s + i.quantity, 0)} item(s) selected
          </p>
        </div>

        {/* Free Shipping Progress Alert */}
        <div className="p-4 bg-champagne-50 border border-champagne-200 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-800">
            <Truck className="w-4 h-4 text-burgundy-800 flex-shrink-0" />
            {isFreeShipping ? (
              <span className="font-semibold text-emerald-800">
                You have qualified for Free Pan-India Delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-burgundy-800">{formatPrice(amountNeededForFreeShipping)}</strong> more to unlock Free Pan-India Delivery!
              </span>
            )}
          </div>
          <div className="w-full sm:w-48 bg-champagne-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-burgundy-700 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  (subtotal / brandConfig.shippingPolicy.freeShippingThreshold) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-ivory-200 shadow-sm overflow-hidden p-6 space-y-6">
            <div className="divide-y divide-ivory-200">
              {items.map((item) => (
                <div key={item.productId} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="relative w-24 h-28 bg-stone-100 rounded-2xl overflow-hidden flex-shrink-0 border border-ivory-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif font-bold text-base text-stone-900 hover:text-burgundy-800 transition-colors"
                    >
                      {item.title}
                    </Link>
                    {item.customization && (
                      <p className="text-xs text-stone-500 font-medium">
                        Customisation: {item.customization}
                      </p>
                    )}
                    <p className="text-xs text-stone-400">
                      Unit Price: {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-ivory-300 rounded-xl bg-ivory-50">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 text-stone-500 hover:text-burgundy-800"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1.5 text-stone-500 hover:text-burgundy-800"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-burgundy-950">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-ivory-200 shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-serif font-bold text-burgundy-950 pb-3 border-b border-ivory-200">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-burgundy-950 pt-3 border-t border-ivory-200">
                <span>Estimated Total</span>
                <span className="text-xl text-burgundy-900">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp (+91 {brandConfig.phone})</span>
              </a>
            </div>

            <div className="pt-4 border-t border-ivory-200 space-y-2 text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Cash on Delivery available on checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-champagne-600 flex-shrink-0" />
                <span>Pan-India transit tracking provided</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
