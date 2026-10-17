"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { brandConfig } from "@/config/brand";

const faqs = [
  {
    category: "Handcrafted Creations & Materials",
    questions: [
      {
        q: "Are all products at Purti Creations actually handmade?",
        a: "Yes! Every single floral dome, Shubh Labh door hanging, and festive shagun set is assembled and finished by hand in our studio. Minor artistic variations in bead placement, ribbons, or floral arrangement are the genuine mark of authentic artisanal work.",
      },
      {
        q: "What materials are used for the Shubh Labh hangings?",
        a: "Our Shubh Labh and door hangings feature high-grade acrylic base rings, faux pearl beads, metallic gota patti lace, golden cord tassels, and decorative fabric floral accents designed for durable festive display.",
      },
      {
        q: "How long do the floral dome gifts last?",
        a: "The floral dome arrangements are crafted as long-lasting decorative keepsakes. Kept indoors away from direct outdoor moisture and harsh sunlight, they will remain beautiful for years.",
      },
    ],
  },
  {
    category: "Personalisation & Custom Orders",
    questions: [
      {
        q: "Can I choose a specific initial letter for the marquee letter hamper?",
        a: "Yes! When ordering the Panda Teddy & Letter Light Hamper, you can choose any alphabet initial from A to Z. Each marquee light is battery-operated and glows with warm LED light.",
      },
      {
        q: "Can I include a personalized gift greeting message?",
        a: "Absolutely! You can provide your complimentary greeting text at checkout or share it with us on WhatsApp. We will neatly hand-inscribe it onto an elegant gift card at no extra charge.",
      },
      {
        q: "Do you take bulk orders for weddings, Diwali corporate gifts, or housewarming events?",
        a: "Yes, we specialize in bulk and ceremonial orders. Please message our artisan on WhatsApp (+91 8130400953) with your required quantity and delivery deadline for customized pricing.",
      },
    ],
  },
  {
    category: "Shipping, Packaging & COD",
    questions: [
      {
        q: "How do you protect delicate floral domes during shipping?",
        a: "We understand that delicate gifts require exceptional care. Every dome and arrangement is wrapped in inner protective tissue, surrounded by multi-layered air bubble wraps, and sealed inside a sturdy corrugated box clearly labeled with 'FRAGILE' transit stickers.",
      },
      {
        q: "What are your delivery charges and timelines?",
        a: `Orders above ₹${brandConfig.shippingPolicy.freeShippingThreshold} qualify for Free Delivery across India. For orders below this threshold, a flat delivery fee of ₹${brandConfig.shippingPolicy.standardShippingFee} applies. Delivery typically takes ${brandConfig.shippingPolicy.estimatedDaysMin} to ${brandConfig.shippingPolicy.estimatedDaysMax} business days depending on your PIN code.`,
      },
      {
        q: "Is Cash on Delivery (COD) available?",
        a: "Yes, Cash on Delivery is available for all standard serviceable PIN codes across India. You can also pay via UPI to the courier agent upon arrival.",
      },
      {
        q: "What if an item arrives damaged in transit?",
        a: "While our packaging is extremely robust, in the rare event of transit damage, please record a short unboxing video within 24 hours of receiving the parcel and share it with us on WhatsApp at +91 8130400953. We will immediately arrange a replacement or refund.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    "0-0": true,
    "1-0": true,
    "2-0": true,
  });

  const toggle = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-burgundy-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-champagne-700" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy-950">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-stone-500 max-w-lg mx-auto">
            Everything you need to know about our handmade products, customization, packaging, and pan-India delivery.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {faqs.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-burgundy-900 pb-2 border-b border-ivory-200">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.questions.map((faq, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = openItems[key];
                  return (
                    <div
                      key={faq.q}
                      className="bg-white rounded-2xl border border-ivory-200 shadow-sm overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 hover:text-burgundy-800 text-sm sm:text-base transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-burgundy-700" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-ivory-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="p-8 rounded-3xl bg-white border border-ivory-200 text-center space-y-4 shadow-sm">
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Still Have a Question?
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Our artisan is always happy to answer your queries, share close-up product photos, or help you pick the right gift.
          </p>
          <a
            href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
              "Hello Purti Creations! I have a question about one of your products."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp (+91 {brandConfig.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
