import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { StoreLayout } from "@/components/layout/StoreLayout";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: {
    default: `${brandConfig.name} — Handcrafted Gifts & Festive Decor`,
    template: `%s | ${brandConfig.name}`,
  },
  description:
    "Handmade gifting studio in India specializing in floral dome surprises, Shubh Labh door decor, celebratory teddy arrangements, and auspicious festive keepsakes.",
  keywords: [
    "Purti Creations",
    "handmade gifts India",
    "floral dome gift",
    "Shubh Labh hanging",
    "Diwali door hanging",
    "teddy balloon gift hamper",
    "festive home decor",
    "housewarming gifts",
    "personalised gifts India",
  ],
  authors: [{ name: brandConfig.name }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: `${brandConfig.name} — Gifts That Make Every Moment Special`,
    description: brandConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: brandConfig.name,
    images: [
      {
        url: "/products/shubh-labh-pearl-hanging-1.jpg",
        width: 716,
        height: 955,
        alt: `${brandConfig.name} Artisanal Gifts`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-burgundy-200 selection:text-burgundy-900">
        <CartProvider>
          <StoreLayout>{children}</StoreLayout>
        </CartProvider>
      </body>
    </html>
  );
}
