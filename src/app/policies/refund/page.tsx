import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Return, Refund & Cancellation Policy | Purti Creations",
  description: "Learn about Purti Creations cancellation terms, transit damage replacement guarantee, and refund procedures.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Link href="/" className="text-xs font-semibold text-burgundy-800 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Return, Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; Operational Draft Policy for {brandConfig.name}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Notice to Store Owner:</strong> This draft policy should be reviewed with your legal advisor to ensure alignment with Consumer Protection (E-Commerce) Rules, 2020.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              1. Nature of Handcrafted Goods
            </h2>
            <p>
              All products at <strong>{brandConfig.name}</strong> are individually assembled by hand by skilled artisans. Because every piece is made individually, slight artistic nuances in beading, ribbon folds, and floral arrangements are the natural hallmarks of authentic handmade creations and are not considered manufacturing defects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              2. Order Cancellations
            </h2>
            <p>
              You may request an order cancellation at no charge <strong>prior to shipment</strong> (typically within 12 hours of placing the order). Once an order has been dispatched or handed over to our courier partner, it cannot be canceled in transit.
            </p>
            <p>
              To request a cancellation, please message us immediately on WhatsApp at <strong>+91 {brandConfig.phone}</strong> with your Order Reference Number.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              3. Transit Damage Guarantee & Free Replacement
            </h2>
            <p>
              Your peace of mind is our priority. If any item arrives damaged, cracked, or broken due to courier transit handling:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Record a clear, continuous unboxing video showing the outer package, label, and the damaged item upon opening.</li>
              <li>Notify our team within <strong>24 hours of package delivery</strong> via WhatsApp at <strong>+91 {brandConfig.phone}</strong>.</li>
              <li>Upon verifying the transit damage, we will promptly dispatch a <strong>free replacement piece</strong> at zero extra charge, or process a full refund.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              4. Non-Returnable Items
            </h2>
            <p>
              Due to their custom and intimate celebration nature, the following items cannot be returned for buyer&apos;s remorse or change of mind:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customized items bearing specific alphabet initials (e.g., marquee letter hampers) or personalized greeting names.</li>
              <li>Ceremonial Shagun Nariyal / sacred festive items that have been unsealed or used in pooja rituals.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              5. Refund Timeline
            </h2>
            <p>
              Approved refunds will be processed to the original payment method (or UPI ID for Cash on Delivery orders) within <strong>5 to 7 business days</strong> following inspection.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
