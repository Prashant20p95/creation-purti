import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { brandConfig } from "@/config/brand";
import { CheckCircle2, MessageCircle, Package, ArrowRight, Home, Phone } from "lucide-react";

interface Props {
  params: {
    orderNumber: string;
  };
}

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({ params }: Props) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  const whatsappInquiryUrl = `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Purti Creations! I am inquiring about my Order #${order.orderNumber} placed for ${order.customerName}. Could you please share the latest update?`
  )}`;

  return (
    <div className="min-h-screen bg-ivory-50/50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-ivory-200 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Success Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-ivory-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950">
              Thank You, {order.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Your order has been received at our studio and is being prepared with artisanal care.
            </p>
            <div className="inline-block px-4 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-xs font-bold text-burgundy-900 mt-2">
              Order Reference: <span className="text-burgundy-700 font-mono text-sm">{order.orderNumber}</span>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="p-4 bg-champagne-50 rounded-2xl border border-champagne-200 space-y-2 text-xs">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <Package className="w-4 h-4 text-champagne-700" />
              <span>What Happens Next?</span>
            </h3>
            <ul className="space-y-1 text-stone-700 list-disc pl-5">
              <li>Our artisans carefully assemble and quality-check each handcrafted item.</li>
              <li>Your package is bubble-wrapped in heavy-duty protective boxes for zero transit damage.</li>
              <li>A courier dispatch confirmation with tracking will be shared to <strong>+91 {order.customerPhone}</strong>.</li>
              <li>Estimated delivery to {order.city}, {order.state} is within {brandConfig.shippingPolicy.estimatedDaysMin}–{brandConfig.shippingPolicy.estimatedDaysMax} business days.</li>
            </ul>
          </div>

          {/* Delivery & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-2">
            <div className="p-4 bg-ivory-50 rounded-2xl border border-ivory-200 space-y-1.5">
              <span className="font-bold text-stone-900 block text-sm">Delivery Address</span>
              <p className="text-stone-700 font-medium">{order.customerName}</p>
              <p className="text-stone-600">{order.addressLine1}</p>
              {order.addressLine2 && <p className="text-stone-600">{order.addressLine2}</p>}
              <p className="text-stone-600">{order.city}, {order.state} — {order.pincode}</p>
              <p className="text-stone-500 pt-1">Phone: +91 {order.customerPhone}</p>
              {order.customerEmail && <p className="text-stone-500">Email: {order.customerEmail}</p>}
            </div>

            <div className="p-4 bg-ivory-50 rounded-2xl border border-ivory-200 space-y-1.5">
              <span className="font-bold text-stone-900 block text-sm">Payment Summary</span>
              <div className="flex justify-between text-stone-600 pt-1">
                <span>Payment Mode:</span>
                <strong className="text-stone-900">{order.paymentMethod}</strong>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Payment Status:</span>
                <span className="font-semibold text-emerald-800">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery:</span>
                <span>{order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-burgundy-950 pt-2 border-t border-ivory-200">
                <span>Total Amount:</span>
                <span className="text-base text-burgundy-900">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif font-bold text-stone-900 text-sm">
              Items in this Order
            </h3>
            <div className="divide-y divide-ivory-200 border border-ivory-200 rounded-2xl overflow-hidden bg-white">
              {order.items.map((item) => (
                <div key={item.id} className="p-3 sm:p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.productImage && (
                      <div className="relative w-12 h-14 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.productImage}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                        {item.productTitle}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} &bull; {formatPrice(item.unitPrice)} each
                      </p>
                      {item.customization && (
                        <p className="text-[10px] text-burgundy-700">
                          {item.customization}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-stone-900">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-ivory-200">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track or Enquire on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-ivory-100 hover:bg-ivory-200 text-stone-800 rounded-xl text-xs font-semibold transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
