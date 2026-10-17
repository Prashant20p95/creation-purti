import React from "react";
import { Sparkles, MessageCircle } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function AnnouncementBar() {
  if (!brandConfig.announcement) return null;

  return (
    <div className="bg-burgundy-950 text-ivory-100 text-[11px] sm:text-xs py-2 px-4 border-b border-burgundy-900/60 tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left">
          <Sparkles className="w-3.5 h-3.5 text-champagne-300 flex-shrink-0" />
          <span className="sm:hidden font-medium">Handcrafted Gifting Atelier • Free Delivery above ₹999</span>
          <span className="hidden sm:inline">{brandConfig.announcement}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-stone-300">
          <span>Free Pan-India Delivery on orders above ₹999</span>
          <span className="text-burgundy-800">•</span>
          <a
            href={`https://wa.me/${brandConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp Studio: +91 {brandConfig.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
