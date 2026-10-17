import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { Truck, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | Purti Creations",
  description: "Learn about Purti Creations delivery timelines, pan-India courier shipping, free delivery thresholds, and packaging guarantees.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Link href="/" className="text-xs font-semibold text-burgundy-800 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; Operational Policy for {brandConfig.name}
          </p>
        </div>

        {/* Legal Review Disclaimer */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Notice to Store Owner:</strong> This policy draft outlines our operational practices for handmade items. Store owner should review delivery partnerships and state transit regulations before final publication.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              1. Pan-India Delivery Coverage
            </h2>
            <p>
              <strong>{brandConfig.name}</strong> ships handcrafted decorative products and gift arrangements to serviceable PIN codes across all Indian states and Union Territories through reputed national courier partners (including Delhivery, BlueDart, DTDC, and India Post Speed Post).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              2. Processing & Handcrafting Time
            </h2>
            <p>
              Because each gift, floral dome, and Shubh Labh door decor piece is handcrafted, orders require <strong>1 to 2 business days</strong> for artisanal assembly, inspection, and protective packing before dispatch.
            </p>
            <p>
              For customized orders with specific letter lights or custom messages, please allow up to <strong>3 business days</strong> for dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              3. Delivery Timelines
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Delhi NCR & Metro Cities:</strong> 3 to 5 business days after dispatch.</li>
              <li><strong>Tier 2 / Tier 3 Cities & Regional Centers:</strong> 4 to 7 business days after dispatch.</li>
              <li><strong>Northeast & Remote Locations:</strong> 7 to 10 business days after dispatch.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              4. Shipping Charges
            </h2>
            <p>
              We believe in honest, fair shipping charges:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Free Delivery:</strong> All prepaid or COD orders with an items subtotal of <strong>₹{brandConfig.shippingPolicy.freeShippingThreshold} or more</strong> qualify for 100% Free Shipping.
              </li>
              <li>
                <strong>Standard Shipping:</strong> For orders below ₹{brandConfig.shippingPolicy.freeShippingThreshold}, a flat fee of <strong>₹{brandConfig.shippingPolicy.standardShippingFee}</strong> is applied at checkout to cover protective packing and logistics.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              5. Protective Packaging Guarantee
            </h2>
            <p>
              We recognize the delicate nature of floral domes, shagun decor, and balloon keepsakes. Each item is packed inside heavy-duty corrugated cartons lined with multi-layered bubble cushions and clearly labeled with <em>Fragile / Handle With Care</em> markers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              6. Order Tracking & Enquiries
            </h2>
            <p>
              Once your parcel is handed over to the courier service, we will share the AWB Tracking Number with you over WhatsApp (+91 {brandConfig.phone}) or SMS. You can also message our WhatsApp concierge anytime for status updates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
