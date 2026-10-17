export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  shortDescription: string;
  description: string;
  price?: number | null; // null if awaiting owner confirmation
  compareAtPrice?: number | null;
  isPriceConfirmed: boolean;
  category: string;
  occasions: string[];
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  highlights: string[];
  dimensions?: string | null;
  materials?: string | null;
  includedItems?: string | null;
  customizationAvailable: boolean;
  customizationNote?: string | null;
  images: string[];
  keywords?: string | null;
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  customization?: string;
  isPriceConfirmed: boolean;
}

export interface OrderData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  deliveryInstructions?: string;
  paymentMethod: "COD" | "WHATSAPP_CONFIRMED" | "TEST_PAYMENT";
  items: Array<{
    productId: string;
    productTitle: string;
    productImage?: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    customization?: string;
  }>;
}
