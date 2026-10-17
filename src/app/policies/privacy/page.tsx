import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { AlertCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Purti Creations",
  description: "Learn how Purti Creations collects, uses, and protects customer personal and delivery data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <Link href="/" className="text-xs font-semibold text-burgundy-800 hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-burgundy-950">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 &bull; Operational Draft for {brandConfig.name}
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Notice to Store Owner:</strong> Draft privacy statement. Store owner should consult legal counsel to ensure compliance with the Digital Personal Data Protection Act (DPDP), 2023.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200 shadow-sm space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              1. Information We Collect
            </h2>
            <p>
              When you purchase or inquire about gifts on <strong>{brandConfig.name}</strong>, we collect necessary personal details including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Customer full name and recipient name.</li>
              <li>Shipping address, city, state, and 6-digit postal PIN code.</li>
              <li>Contact telephone and WhatsApp number for order confirmation and courier dispatch intimation.</li>
              <li>Email address (optional) for sending digital invoices and tracking receipts.</li>
              <li>Custom gift message text or letter selections.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              2. How We Use Your Information
            </h2>
            <p>
              Your personal information is used exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process, assemble, and handcraft your personalized gifting orders.</li>
              <li>Generate courier shipping waybills and coordinate doorstep delivery.</li>
              <li>Communicate order status updates and tracking numbers via WhatsApp or SMS.</li>
              <li>Provide dedicated customer support and address any queries or feedback.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              3. Data Sharing & Security
            </h2>
            <p>
              <strong>We do not sell, rent, or trade your personal information</strong> with third-party advertisers or data brokers. Your contact and address details are shared only with our trusted courier and logistics partners for the sole purpose of delivering your parcel.
            </p>
            <p>
              We do not store your credit/debit card numbers, CVVs, or online banking passwords on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-serif font-bold text-stone-900">
              4. Contact for Data Requests
            </h2>
            <p>
              If you wish to review, update, or request the deletion of your order records, please contact our privacy coordinator via WhatsApp at <strong>+91 {brandConfig.phone}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
