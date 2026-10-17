"use client";

import React, { useState } from "react";
import { brandConfig } from "@/config/brand";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Mail,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "Custom Gifting Enquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate inquiry recording and generate direct WhatsApp redirection
    setSubmitted(true);
    const waText = `Hello Purti Creations! My name is ${formData.name}. Regarding ${formData.subject}: ${formData.message}`;
    setTimeout(() => {
      window.open(
        `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(waText)}`,
        "_blank"
      );
    }, 1200);
  };

  return (
    <div className="bg-ivory-50/40 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-burgundy-700 uppercase tracking-widest">
            We are here to help
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy-950">
            Contact & Custom Enquiries
          </h1>
          <p className="text-sm text-stone-500">
            Reach out directly for customisations, festive decor bookings, bulk wedding orders, or tracking assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-ivory-200 shadow-sm space-y-6">
              <h2 className="text-xl font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
                Direct Studio Contacts
              </h2>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">WhatsApp (Fastest Response)</span>
                    <a
                      href={`https://wa.me/${brandConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      +91 {brandConfig.phone}
                    </a>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Chat directly with our artisan for custom photos & fast quotes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-burgundy-100 text-burgundy-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-burgundy-700" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Phone Calling</span>
                    <a
                      href={`tel:${brandConfig.phone}`}
                      className="text-stone-800 font-semibold hover:underline"
                    >
                      {brandConfig.displayPhone}
                    </a>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Available during operating hours for urgent queries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-champagne-100 text-stone-800 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-champagne-700" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Operating Hours</span>
                    <span className="text-stone-600">{brandConfig.businessHours}</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Orders placed on Sunday are processed on Monday morning.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-stone-700" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block">Studio Location Notice</span>
                    <span className="text-stone-600">{brandConfig.addressNotice}</span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Online artisan studio. Packages dispatched nationwide via verified couriers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
                    "Hello Purti Creations! I have a question about your handmade gifting collection."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-ivory-200 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-burgundy-950 pb-2 border-b border-ivory-100">
              Send an Enquiry Message
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Your message has been prepared. We are redirecting you to WhatsApp to connect directly with our artisan!
                </p>
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Purti Creations! My name is ${formData.name}. Regarding ${formData.subject}: ${formData.message}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Click here if WhatsApp didn&apos;t open automatically</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Ramesh Verma"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Subject / Occasion
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500 font-medium"
                  >
                    <option value="Custom Floral Dome Design">Custom Floral Dome Design</option>
                    <option value="Festive Shubh Labh Bulk Order">Festive Shubh Labh Bulk Order</option>
                    <option value="Wedding / Griha Pravesh Shagun">Wedding / Griha Pravesh Shagun</option>
                    <option value="Delivery or Tracking Inquiry">Delivery or Tracking Inquiry</option>
                    <option value="Other Question">Other Question</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">
                    Your Message / Requirements <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us what you are looking for (e.g. quantity needed, event date, custom initial letter, preferred colors)..."
                    className="w-full px-3.5 py-2.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-burgundy-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message & Connect on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
