"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { brandConfig, getWhatsAppCartUrl } from "@/config/brand";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const whatsappUrl = getWhatsAppCartUrl(items, total);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-ivory-200 flex items-center justify-between bg-ivory-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-burgundy-800" />
              <h2 className="text-lg font-serif font-bold text-burgundy-950">
                Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-ivory-200 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-4 py-2.5 bg-champagne-50 border-b border-champagne-200 text-xs">
            {isFreeShipping ? (
              <p className="text-emerald-800 font-medium text-center">
                🎉 Congratulations! You have unlocked <span className="font-bold">Free Pan-India Delivery</span>!
              </p>
            ) : (
              <div>
                <p className="text-stone-700 text-center mb-1">
                  Add <span className="font-bold text-burgundy-800">{formatPrice(amountNeededForFreeShipping)}</span> more for <span className="font-semibold">Free Delivery</span>
                </p>
                <div className="w-full bg-champagne-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-burgundy-700 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / brandConfig.shippingPolicy.freeShippingThreshold) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Explore our handcrafted floral domes, Shubh Labh door decor, and celebratory gift hampers.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-burgundy-800 hover:bg-burgundy-900 text-white text-xs font-semibold rounded-full shadow-sm transition-colors"
                >
                  Start Exploring
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-3 bg-ivory-50/70 border border-ivory-200 rounded-xl"
                >
                  <div className="relative w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {item.title}
                      </h4>
                      {item.customization && (
                        <p className="text-[11px] text-stone-500 truncate">
                          Note: {item.customization}
                        </p>
                      )}
                      <p className="text-xs font-bold text-burgundy-800 mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-ivory-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-burgundy-800"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-burgundy-800"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-ivory-200 bg-ivory-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-burgundy-950 pt-2 border-t border-ivory-200">
                  <span>Estimated Total</span>
                  <span className="text-base text-burgundy-900">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Order via WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm & Order via WhatsApp</span>
              </a>

              <p className="text-[10px] text-center text-stone-500">
                🔒 Safe & secure checkout. Cash on Delivery available across India.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
