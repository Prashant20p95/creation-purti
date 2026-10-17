export interface BrandConfig {
  name: string;
  tagline: string;
  taglineHindi?: string;
  description: string;
  phone: string;
  whatsappNumber: string; // digits only with country code for wa.me links
  displayPhone: string;
  email: string;
  emailConfigured: boolean;
  addressNotice: string;
  locationCity: string;
  businessHours: string;
  announcement: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  badges: string[];
  shippingPolicy: {
    freeShippingThreshold: number; // e.g. ₹999 or 0 for free
    standardShippingFee: number; // e.g. ₹60
    estimatedDaysMin: number;
    estimatedDaysMax: number;
    codAvailable: boolean;
    codExtraFee: number;
  };
  policiesNotice: string;
}

export const brandConfig: BrandConfig = {
  name: "Purti Creations",
  tagline: "Crafted with heart • Inspired by life",
  taglineHindi: "सजावट और उपहार, दिल से अपनों के लिए",
  description:
    "Handcrafted decorative gifts, festive door hangings, floral domes, and personalized celebratory arrangements made with warmth, love, and fine artisanal care.",
  // Verified from authentic product images: 8130400953
  phone: "8130400953",
  displayPhone: "+91 8130400953",
  whatsappNumber: "918130400953",
  // Clearly documented placeholders for unverified details
  email: "support@purticreations.com",
  emailConfigured: false, // Flag to indicate email needs owner review
  addressNotice: "Handmade Studio Workshop, Delhi NCR, India (Online Studio — Orders shipped Pan-India)",
  locationCity: "Delhi NCR, India",
  businessHours: "Monday to Sunday: 9:00 AM – 8:00 PM IST",
  announcement: "Handcrafted Festive Decor & Personalized Gift Keepsakes • Direct Studio WhatsApp: +91 8130400953",
  socialLinks: {
    instagram: "https://instagram.com/purti_creations", // Placeholder: update with your official handle
    facebook: "",
    whatsapp: "https://wa.me/918130400953",
  },
  badges: [
    "100% Handcrafted with Love",
    "Direct Artisan Studio",
    "Secure Pan-India Delivery",
    "Direct WhatsApp Support",
  ],
  shippingPolicy: {
    freeShippingThreshold: 999, // Orders above ₹999 get free delivery
    standardShippingFee: 70, // Nominal ₹70 standard delivery fee
    estimatedDaysMin: 4,
    estimatedDaysMax: 7,
    codAvailable: true,
    codExtraFee: 0,
  },
  policiesNotice:
    "All handcrafted items are individually finished. Minor natural variations in handmade pearl, fabric, and floral arrangement are the hallmark of artisanal craftsmanship.",
};

export function getWhatsAppProductUrl(product: {
  id: string | number;
  title: string;
  price?: number | null;
}, customText?: string): string {
  const priceText = product.price ? ` (Price: ₹${product.price})` : "";
  const baseMsg = customText 
    ? customText 
    : `Hello Purti Creations! I am interested in ordering: "${product.title}"${priceText}. Could you please share availability and delivery details?`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(baseMsg)}`;
}

export function getWhatsAppCartUrl(items: Array<{ title: string; quantity: number; price?: number | null }>, total: number): string {
  const itemList = items
    .map((item, idx) => `${idx + 1}. ${item.title} (Qty: ${item.quantity}${item.price ? ` @ ₹${item.price}` : ''})`)
    .join("\n");
  
  const text = `Hello Purti Creations! I would like to place an order from your website:\n\n${itemList}\n\nEstimated Total: ₹${total}\n\nPlease let me know the payment and delivery procedure.`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
