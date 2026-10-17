"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function WhatsAppButton() {
  const pathname = usePathname();

  // Do not render floating button on checkout, cart, or admin pages to prevent covering form inputs or order CTA buttons
  if (
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/cart") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  // Only render if whatsappNumber is configured
  if (!brandConfig.whatsappNumber || brandConfig.whatsappNumber.includes("REPLACE")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 print:hidden">
      <a
        href={`https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(
          "Hello Purti Creations! I am browsing your online store and would like to ask about gift availability and custom orders."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg border border-emerald-500 transition-all active:scale-95 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        aria-label="Enquire on WhatsApp with Purti Creations"
      >
        <MessageCircle className="w-4 h-4 text-white flex-shrink-0" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>
    </div>
  );
}
