import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | Purti Creations",
  description: "Terms and Conditions governing the use and purchase of products on the Purti Creations online store.",
};

export default function TermsPage() {
  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Link href="/" className="text-xs font-semibold text-burgundy-800 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Terms & Conditions
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; Operational Draft for {brandConfig.name}
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Notice to Store Owner:</strong> Draft terms for online purchases. Please review with legal counsel before official business launch.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or placing an order on the <strong>{brandConfig.name}</strong> website or over our official WhatsApp channel (+91 {brandConfig.phone}), you agree to be bound by these Terms and Conditions and associated store policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              2. Products & Artisanal Characteristics
            </h2>
            <p>
              Each item displayed is an authentic handcrafted artistic work. While we make every effort to display accurate photographs and realistic representations of colors and decorations, slight natural variations in bead luster, hand-stitched borders, fabric dyes, and floral trims are inherent to artisanal production.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              3. Pricing & Order Confirmation
            </h2>
            <p>
              Prices are displayed in Indian National Rupees (INR) and are inclusive of applicable taxes. In the event of an inadvertent typographical error or draft price awaiting confirmation, we reserve the right to contact you to confirm the correct price or cancel the order before dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              4. Payment & Cash on Delivery
            </h2>
            <p>
              We offer Cash on Delivery (COD), UPI payments, and verified direct WhatsApp payment options. Customers choosing COD must ensure they or an authorized representative are available at the delivery address with the exact order amount. Refusal of legitimate COD orders without valid transit damage may result in restriction of future COD privileges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Delhi NCR, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
