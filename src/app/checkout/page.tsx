"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  CreditCard,
  Banknote,
  ChevronLeft,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { brandConfig } from "@/config/brand";

const indianStates = [
  "Delhi NCR",
  "Maharashtra",
  "Uttar Pradesh",
  "Karnataka",
  "Haryana",
  "Rajasthan",
  "Gujarat",
  "Punjab",
  "Madhya Pradesh",
  "West Bengal",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "Kerala",
  "Bihar",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Assam",
  "Odisha",
  "Jharkhand",
  "Chhattisgarh",
  "Chandigarh",
  "Other State / UT",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Delhi NCR",
    pincode: "",
    landmark: "",
    deliveryInstructions: "",
    paymentMethod: "COD" as "COD" | "WHATSAPP_CONFIRMED" | "TEST_PAYMENT",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your bag is empty. Please add items before checkout.");
      return;
    }

    if (!formData.customerName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.customerPhone.trim())) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number (starting with 6-9).");
      return;
    }

    if (!formData.addressLine1.trim()) {
      setErrorMessage("Please provide flat/house number and building/street.");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please provide your city.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setErrorMessage("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please agree to our store policies to continue.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerEmail: formData.customerEmail.trim() || undefined,
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode.trim(),
        landmark: formData.landmark.trim() || undefined,
        deliveryInstructions: formData.deliveryInstructions.trim() || undefined,
        paymentMethod: formData.paymentMethod,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          customization: i.customization,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // If user selected WhatsApp confirmed flow, open WhatsApp in background
      if (formData.paymentMethod === "WHATSAPP_CONFIRMED") {
        const waMsg = `Hello Purti Creations! I just placed order #${data.orderNumber} for ₹${data.totalAmount} for ${formData.customerName}. Please confirm order dispatch details!`;
        window.open(
          `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(waMsg)}`,
          "_blank"
        );
      }

      clearCart();
      router.push(`/order-success/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-ivory-50 px-4 text-center">
        <h1 className="text-2xl font-serif font-bold text-burgundy-950 mb-2">
          Your Bag is Empty
        </h1>
        <p className="text-xs text-stone-500 mb-6">
          Add handcrafted items to your bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 bg-burgundy-800 text-white rounded-xl text-xs font-semibold"
        >
          Explore Gifts
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-burgundy-800 mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Checkout & Delivery Details
          </h1>
          <p className="text-xs text-stone-500">
            Safe pan-India delivery straight from our artisan workshop.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Delivery & Customer Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
                  1. Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g., Ananya Sharma"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Mobile Number (WhatsApp) <span className="text-rose-600">*</span>
                    </label>
                    <div className="flex">
                      <span className="px-3 py-2.5 bg-ivory-100 border border-r-0 border-ivory-300 rounded-l-xl text-xs font-bold text-stone-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="customerPhone"
                        required
                        maxLength={10}
                        value={formData.customerPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData((p) => ({ ...p, customerPhone: val }));
                        }}
                        placeholder="10-digit number"
                        className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-r-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700">
                      Email Address <span className="text-stone-400 font-normal">(Optional, for tracking receipts)</span>
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      placeholder="ananya@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
                  2. Shipping Address (India)
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Flat / House No. & Building <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="e.g., Flat 402, Rosewood Heights, Sector 45"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Street / Area / Locality
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="e.g., Near City Center Mall"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">
                        City <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., New Delhi"
                        className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">
                        State <span className="text-rose-600">*</span>
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500 font-medium"
                      >
                        {indianStates.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">
                        PIN Code <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setFormData((p) => ({ ...p, pincode: val }));
                        }}
                        placeholder="6 digits"
                        className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Gift Note / Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="deliveryInstructions"
                      rows={2}
                      value={formData.deliveryInstructions}
                      onChange={handleChange}
                      placeholder="e.g., Please write 'Happy Anniversary Mom & Dad' on the card, or call before delivery."
                      className="w-full px-3.5 py-2 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-4">
                <h2 className="text-base font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
                  3. Select Payment Mode
                </h2>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "COD"
                        ? "border-burgundy-700 bg-burgundy-50/50"
                        : "border-ivory-200 hover:bg-ivory-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: "COD" }))}
                      className="mt-1 text-burgundy-800 focus:ring-burgundy-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-burgundy-800" />
                        <span className="text-xs font-bold text-stone-900">
                          Cash on Delivery (COD)
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                          Available
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Pay in cash or via UPI directly to the courier agent when your handcrafted parcel arrives.
                      </p>
                    </div>
                  </label>

                  {/* WhatsApp Order Confirmation */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "WHATSAPP_CONFIRMED"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-ivory-200 hover:bg-ivory-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="WHATSAPP_CONFIRMED"
                      checked={formData.paymentMethod === "WHATSAPP_CONFIRMED"}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: "WHATSAPP_CONFIRMED" }))}
                      className="mt-1 text-emerald-700 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-stone-900">
                          Confirm & Pay via WhatsApp (+91 {brandConfig.phone})
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Connect directly with our artisan on WhatsApp to finalize your order, share custom details, and pay via UPI QR.
                      </p>
                    </div>
                  </label>

                  {/* Test Payment */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "TEST_PAYMENT"
                        ? "border-stone-800 bg-stone-50"
                        : "border-ivory-200 hover:bg-ivory-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="TEST_PAYMENT"
                      checked={formData.paymentMethod === "TEST_PAYMENT"}
                      onChange={() => setFormData((p) => ({ ...p, paymentMethod: "TEST_PAYMENT" }))}
                      className="mt-1 text-stone-800 focus:ring-stone-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-stone-700" />
                        <span className="text-xs font-bold text-stone-900">
                          Online Gateway (Demo / Test Mode)
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        Instant simulated checkout for testing store ordering flow without charging real cards.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData((p) => ({ ...p, consent: e.target.checked }))}
                      className="mt-0.5 rounded text-burgundy-800 focus:ring-burgundy-500"
                    />
                    <span>
                      I understand that each item is individually handcrafted and agree to the{" "}
                      <Link href="/policies/shipping" target="_blank" className="underline text-burgundy-800">
                        Shipping
                      </Link>{" "}
                      and{" "}
                      <Link href="/policies/refund" target="_blank" className="underline text-burgundy-800">
                        Cancellation
                      </Link>{" "}
                      policies.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-6">
              <h2 className="text-base font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
                Order Review ({items.length} item{items.length === 1 ? "" : "s"})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-ivory-100 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.productId} className="py-3 flex gap-3 items-center">
                    <div className="relative w-14 h-16 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0 border border-ivory-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} &bull; {formatPrice(item.price)} each
                      </p>
                      {item.customization && (
                        <p className="text-[10px] text-burgundy-700 truncate">
                          {item.customization}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-bold text-burgundy-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-ivory-200 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Pan-India Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-burgundy-950 pt-2 border-t border-ivory-200">
                  <span>Total Amount</span>
                  <span className="text-xl text-burgundy-900">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-burgundy-800 hover:bg-burgundy-900 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg transition-all active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {formData.paymentMethod === "COD"
                        ? "Place Cash on Delivery Order"
                        : formData.paymentMethod === "WHATSAPP_CONFIRMED"
                        ? "Confirm Order via WhatsApp"
                        : "Complete Test Order"}
                    </span>
                  </>
                )}
              </button>

              <div className="space-y-2 text-[11px] text-stone-500 pt-2 border-t border-ivory-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Your details are stored securely. No card data saved.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-burgundy-700 flex-shrink-0" />
                  <span>Ships in sturdy multi-layer protective packaging.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
