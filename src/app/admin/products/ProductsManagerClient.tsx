"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Save,
  Trash2,
  Upload,
  Check,
  AlertTriangle,
  Sparkles,
  Search,
  Loader2,
  X,
  ExternalLink,
  Edit,
  Copy,
  Layers,
  Tag,
  DollarSign,
  Eye,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  shortDescription?: string;
  description?: string;
  category: string;
  occasions?: string;
  price: number | null;
  compareAtPrice: number | null;
  isPriceConfirmed: boolean;
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  highlights?: string;
  dimensions?: string | null;
  materials?: string | null;
  includedItems?: string | null;
  customizationAvailable?: boolean;
  customizationNote?: string | null;
  images: string[];
  keywords?: string | null;
}

const CATEGORIES = [
  "Floral Dome Gifts",
  "Festive Door Hangings",
  "Teddy & Balloon Gifts",
  "Festive & Housewarming",
];

const OCCASIONS_LIST = [
  "Festivals & Pooja",
  "Birthdays & Milestones",
  "Anniversary & Romance",
  "Personalized Gifts",
  "Housewarming & Weddings",
];

export function ProductsManagerClient({
  initialProducts,
}: {
  initialProducts: any[];
}) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.map((p) => ({
      ...p,
      images: typeof p.images === "string" ? JSON.parse(p.images) : p.images,
    }))
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [priceFilter, setPriceFilter] = useState("ALL");

  // Comprehensive Product Edit / Create Modal state
  const [modalMode, setModalMode] = useState<"edit" | "create" | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Open Edit Modal with full product data
  const handleOpenEdit = (prod: Product) => {
    let parsedHighlights: string[] = [];
    try {
      if (prod.highlights) {
        parsedHighlights = typeof prod.highlights === "string" ? JSON.parse(prod.highlights) : prod.highlights;
      }
    } catch {
      parsedHighlights = [];
    }

    setFormData({
      id: prod.id,
      title: prod.title,
      subtitle: prod.subtitle || "",
      slug: prod.slug,
      category: prod.category,
      occasions: prod.occasions || "",
      price: prod.price !== null ? prod.price : "",
      compareAtPrice: prod.compareAtPrice !== null ? prod.compareAtPrice : "",
      isPriceConfirmed: prod.isPriceConfirmed,
      stock: prod.stock,
      inStock: prod.inStock,
      isFeatured: prod.isFeatured,
      isBestSeller: prod.isBestSeller,
      shortDescription: prod.shortDescription || "",
      description: prod.description || "",
      dimensions: prod.dimensions || "",
      materials: prod.materials || "",
      includedItems: prod.includedItems || "",
      customizationAvailable: Boolean(prod.customizationAvailable),
      customizationNote: prod.customizationNote || "",
      highlights: parsedHighlights,
      images: [...prod.images],
      keywords: prod.keywords || "",
    });
    setModalMode("edit");
  };

  // Open Create Modal with clean defaults
  const handleOpenCreate = () => {
    setFormData({
      title: "",
      subtitle: "",
      slug: "",
      category: "Floral Dome Gifts",
      occasions: "Festivals & Pooja, Personalized Gifts",
      price: "",
      compareAtPrice: "",
      isPriceConfirmed: true,
      stock: 10,
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      shortDescription: "",
      description: "",
      dimensions: "",
      materials: "",
      includedItems: "",
      customizationAvailable: false,
      customizationNote: "",
      highlights: ["Handcrafted with premium materials", "Carefully packaged for safe transit"],
      images: ["/products/shubh-labh-pearl-hanging-1.jpg"],
      keywords: "handmade gifts, luxury gifting, Delhi NCR",
    });
    setModalMode("create");
  };

  // Clone / Duplicate Product
  const handleCloneProduct = (prod: Product) => {
    let parsedHighlights: string[] = [];
    try {
      if (prod.highlights) {
        parsedHighlights = typeof prod.highlights === "string" ? JSON.parse(prod.highlights) : prod.highlights;
      }
    } catch {
      parsedHighlights = [];
    }

    setFormData({
      title: `${prod.title} (Copy)`,
      subtitle: prod.subtitle || "",
      slug: `${prod.slug}-copy`,
      category: prod.category,
      occasions: prod.occasions || "",
      price: prod.price !== null ? prod.price : "",
      compareAtPrice: prod.compareAtPrice !== null ? prod.compareAtPrice : "",
      isPriceConfirmed: false,
      stock: prod.stock,
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      shortDescription: prod.shortDescription || "",
      description: prod.description || "",
      dimensions: prod.dimensions || "",
      materials: prod.materials || "",
      includedItems: prod.includedItems || "",
      customizationAvailable: Boolean(prod.customizationAvailable),
      customizationNote: prod.customizationNote || "",
      highlights: parsedHighlights,
      images: [...prod.images],
      keywords: prod.keywords || "",
    });
    setModalMode("create");
  };

  // Quick In-Stock Toggle
  const handleToggleStock = async (prod: Product) => {
    const updatedInStock = !prod.inStock;
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prod.id, inStock: updatedInStock }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, inStock: updatedInStock } : p))
      );
      showToast(`Stock status updated for ${prod.title}`);
    } catch (e: any) {
      alert(e.message || "Error updating stock");
    }
  };

  // Quick Price Confirmation Toggle
  const handleTogglePriceConfirmed = async (prod: Product) => {
    const updatedStatus = !prod.isPriceConfirmed;
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prod.id, isPriceConfirmed: updatedStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, isPriceConfirmed: updatedStatus } : p))
      );
      showToast(`Price confirmation updated for ${prod.title}`);
    } catch (e: any) {
      alert(e.message || "Error updating price status");
    }
  };

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData((prev: any) => ({
        ...prev,
        images: [...prev.images, data.imageUrl],
      }));
      showToast("Photo uploaded to gallery!");
    } catch (err: any) {
      alert(err.message || "Failed to upload photo");
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image from gallery
  const handleRemoveImage = (index: number) => {
    if (formData.images.length <= 1) {
      alert("A product must have at least 1 image");
      return;
    }
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  // Highlight bullet points
  const handleAddHighlight = () => {
    setFormData((prev: any) => ({
      ...prev,
      highlights: [...(prev.highlights || []), ""],
    }));
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    setFormData((prev: any) => {
      const next = [...prev.highlights];
      next[index] = val;
      return { ...prev, highlights: next };
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      highlights: prev.highlights.filter((_: any, i: number) => i !== index),
    }));
  };

  // Save Modal (Create or Edit)
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload: any = {
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || null,
        slug: formData.slug?.trim() || undefined,
        category: formData.category,
        occasions: formData.occasions,
        price: formData.price === "" ? null : Number(formData.price),
        compareAtPrice: formData.compareAtPrice === "" ? null : Number(formData.compareAtPrice),
        isPriceConfirmed: Boolean(formData.isPriceConfirmed),
        stock: Number(formData.stock),
        inStock: Boolean(formData.inStock),
        isFeatured: Boolean(formData.isFeatured),
        isBestSeller: Boolean(formData.isBestSeller),
        shortDescription: formData.shortDescription || formData.title,
        description: formData.description || formData.shortDescription || formData.title,
        dimensions: formData.dimensions?.trim() || null,
        materials: formData.materials?.trim() || null,
        includedItems: formData.includedItems?.trim() || null,
        customizationAvailable: Boolean(formData.customizationAvailable),
        customizationNote: formData.customizationNote?.trim() || null,
        highlights: formData.highlights.filter((h: string) => h.trim() !== ""),
        images: formData.images,
        keywords: formData.keywords?.trim() || null,
      };

      if (modalMode === "edit") {
        payload.id = formData.id;
        const res = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update product");
        const data = await res.json();

        setProducts((prev) =>
          prev.map((p) =>
            p.id === formData.id
              ? {
                  ...p,
                  ...payload,
                  images: payload.images,
                }
              : p
          )
        );
        showToast("Product updated successfully!");
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create product");
        const data = await res.json();

        const createdProd = {
          ...data.product,
          images:
            typeof data.product.images === "string"
              ? JSON.parse(data.product.images)
              : data.product.images,
        };

        setProducts((prev) => [createdProd, ...prev]);
        showToast("New handcrafted product published!");
      }

      setModalMode(null);
    } catch (err: any) {
      alert(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted");
    } catch (e: any) {
      alert(e.message || "Failed to delete product");
    }
  };

  // Filter products
  const filtered = products.filter((p) => {
    if (categoryFilter !== "ALL" && p.category !== categoryFilter) return false;
    if (stockFilter === "IN_STOCK" && (!p.inStock || p.stock === 0)) return false;
    if (stockFilter === "LOW_STOCK" && (p.stock > 5 || !p.inStock)) return false;
    if (stockFilter === "OUT_OF_STOCK" && p.inStock && p.stock > 0) return false;
    if (priceFilter === "CONFIRMED" && !p.isPriceConfirmed) return false;
    if (priceFilter === "UNCONFIRMED" && p.isPriceConfirmed) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(q);
      const inSlug = p.slug.toLowerCase().includes(q);
      const inCat = p.category.toLowerCase().includes(q);
      const inOcc = (p.occasions || "").toLowerCase().includes(q);
      if (!inTitle && !inSlug && !inCat && !inOcc) return false;
    }
    return true;
  });

  // KPI calculations
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock && p.stock > 0).length;
  const lowStockCount = products.filter((p) => p.inStock && p.stock <= 5 && p.stock > 0).length;
  const unconfirmedPriceCount = products.filter((p) => !p.isPriceConfirmed).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs font-bold rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4 Catalogue Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Total Catalogue</span>
            <Package className="w-4 h-4 text-champagne-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{totalProducts}</div>
          <p className="text-[11px] text-stone-500">Handcrafted product items</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>In Stock & Live</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{inStockCount}</div>
          <p className="text-[11px] text-stone-500">Available for customer checkout</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Low Stock Items (&le;5)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{lowStockCount}</div>
          <p className="text-[11px] text-stone-500">Require atelier replenishment</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Draft / Unconfirmed</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{unconfirmedPriceCount}</div>
          <p className="text-[11px] text-stone-500">Prices awaiting official confirmation</p>
        </div>
      </div>

      {/* Search, Filter Bar & Add Button */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product title, slug, occasion..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-champagne-500"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="w-full sm:w-auto px-4 py-2 bg-burgundy-700 hover:bg-burgundy-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-900/50 p-2.5 rounded-2xl border border-stone-800/80">
          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mr-1">
              Category:
            </span>
            {["ALL", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium text-[11px] whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stock & Price Filters */}
          <div className="flex items-center gap-2">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="py-1 px-2.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-300 focus:outline-none"
            >
              <option value="ALL">All Stock Levels</option>
              <option value="IN_STOCK">In Stock</option>
              <option value="LOW_STOCK">Low Stock (&le;5)</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="py-1 px-2.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-300 focus:outline-none"
            >
              <option value="ALL">All Price States</option>
              <option value="CONFIRMED">Price Confirmed</option>
              <option value="UNCONFIRMED">Draft / Unconfirmed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dense Products Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl text-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Package className="w-8 h-8 mx-auto text-stone-600" />
            <p>No products match your selected criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-stone-800/30 transition-colors"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className="relative w-16 h-20 rounded-xl bg-stone-950 overflow-hidden flex-shrink-0 border border-stone-800">
                    <Image
                      src={prod.images[0] || "/products/shubh-labh-pearl-hanging-1.jpg"}
                      alt={prod.title}
                      fill
                      className="object-cover"
                    />
                    {prod.images.length > 1 && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 text-white text-[9px] font-mono rounded">
                        +{prod.images.length - 1}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{prod.title}</span>
                      {prod.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          Featured
                        </span>
                      )}
                      {prod.isBestSeller && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-burgundy-950 text-champagne-300 border border-burgundy-800">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-400 text-xs">
                      <span className="px-2 py-0.5 bg-stone-800 rounded text-[11px] text-stone-300">
                        {prod.category}
                      </span>
                      <span className="font-mono text-stone-500">/{prod.slug}</span>
                      {prod.occasions && (
                        <span className="text-[11px] text-stone-400">
                          Occasions: {prod.occasions}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stock, Price & Actions */}
                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-5">
                  {/* Stock Pill & Toggle */}
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                      Inventory
                    </span>
                    <button
                      onClick={() => handleToggleStock(prod)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        prod.inStock && prod.stock > 0
                          ? prod.stock <= 5
                            ? "bg-amber-950/80 text-amber-300 border-amber-800"
                            : "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                          : "bg-rose-950/80 text-rose-300 border-rose-800"
                      }`}
                      title="Click to toggle in-stock"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>
                        {prod.inStock && prod.stock > 0
                          ? `${prod.stock} in stock`
                          : "Out of Stock"}
                      </span>
                    </button>
                  </div>

                  {/* Price & Confirmation */}
                  <div className="text-left lg:text-right min-w-[100px]">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                      Price
                    </span>
                    <div className="flex items-center lg:justify-end gap-1.5">
                      <span className="font-mono font-bold text-white text-sm">
                        {prod.price !== null ? formatPrice(prod.price) : "Draft / Set"}
                      </span>
                      {prod.compareAtPrice && (
                        <span className="text-stone-500 line-through text-[11px] font-mono">
                          {formatPrice(prod.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleTogglePriceConfirmed(prod)}
                      className={`text-[10px] font-semibold mt-0.5 flex items-center lg:justify-end gap-1 ${
                        prod.isPriceConfirmed ? "text-emerald-400" : "text-amber-400"
                      }`}
                      title="Click to toggle price confirmation"
                    >
                      {prod.isPriceConfirmed ? "✓ Confirmed" : "⚠ Draft Price"}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5">
                    {/* View Live on Storefront */}
                    <Link
                      href={`/product/${prod.slug}`}
                      target="_blank"
                      className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-colors"
                      title="View on Storefront"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    {/* Full Edit Modal */}
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-2 bg-stone-800 hover:bg-stone-700 text-champagne-300 hover:text-white rounded-xl border border-stone-700 transition-colors"
                      title="Edit Product Details"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Clone / Duplicate */}
                    <button
                      onClick={() => handleCloneProduct(prod)}
                      className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl border border-stone-700 transition-colors"
                      title="Duplicate Product"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.title)}
                      className="p-2 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-xl border border-rose-800 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COMPREHENSIVE PRODUCT EDIT / CREATE MODAL */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 text-stone-200 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-800 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-burgundy-800 flex items-center justify-center text-white">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-white text-base">
                    {modalMode === "edit" ? "Edit Handcrafted Product" : "Create New Product"}
                  </h2>
                  <p className="text-[11px] text-stone-400">
                    All specifications, studio photography, and pricing controls.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalMode(null)}
                className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Basic Details */}
              <div className="space-y-4">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  1. Title, Slug & Category
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-stone-300 font-semibold">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Shubh Labh Pearl Hanging for Festive Home Decor"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Product Subtitle (Optional)</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. Traditional entrance hanging pair"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">URL Slug (Auto-generated if empty)</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g. shubh-labh-pearl-hanging"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Store Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Occasions (Comma-separated)</label>
                    <input
                      type="text"
                      value={formData.occasions}
                      onChange={(e) => setFormData({ ...formData, occasions: e.target.value })}
                      placeholder="e.g. Festivals & Pooja, Housewarming & Weddings"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  2. Pricing, Inventory & Badges
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Official Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="699"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Compare-at Price (₹)</label>
                    <input
                      type="number"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      placeholder="899"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Stock Quantity</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="10"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPriceConfirmed}
                      onChange={(e) =>
                        setFormData({ ...formData, isPriceConfirmed: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
                    />
                    <span className="text-stone-200">Price Confirmed (Live on store)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
                    />
                    <span className="text-stone-200">In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
                    />
                    <span className="text-stone-200">Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
                    />
                    <span className="text-stone-200">Best Seller</span>
                  </label>
                </div>
              </div>

              {/* Gallery Photography */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-stone-800">
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    3. Studio Photography ({formData.images.length} photos)
                  </span>
                  <label className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-champagne-300 font-semibold rounded-lg text-xs cursor-pointer flex items-center gap-1.5 border border-stone-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-32 rounded-xl bg-stone-950 overflow-hidden border border-stone-800 group"
                    >
                      <Image src={img} alt={`Product ${idx}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-white text-[9px] font-mono rounded">
                        Photo {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Descriptions & Stories */}
              <div className="space-y-4">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  4. Artisanal Descriptions
                </span>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Short Summary (Catalogue cards)</label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="A brief 1-2 sentence artisanal overview..."
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Full Product Description</label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed craftsmanship narrative..."
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications: Dimensions, Materials, Included Items */}
              <div className="space-y-4">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  5. Physical Specifications
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      placeholder="e.g. 8x8 inches, 400g"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Materials</label>
                    <input
                      type="text"
                      value={formData.materials}
                      onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                      placeholder="e.g. Faux pearls, velvet, satin"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-stone-300 font-semibold">Included in Box</label>
                    <input
                      type="text"
                      value={formData.includedItems}
                      onChange={(e) => setFormData({ ...formData, includedItems: e.target.value })}
                      placeholder="e.g. 1 Pair Hangings, Gift Box"
                      className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Customization & Highlights */}
              <div className="space-y-4">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  6. Customization & Highlights
                </span>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.customizationAvailable}
                        onChange={(e) =>
                          setFormData({ ...formData, customizationAvailable: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
                      />
                      <span className="text-stone-200">Customer Customization Available</span>
                    </label>

                    {formData.customizationAvailable && (
                      <input
                        type="text"
                        value={formData.customizationNote}
                        onChange={(e) =>
                          setFormData({ ...formData, customizationNote: e.target.value })
                        }
                        placeholder="e.g. Custom letter choice for light"
                        className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                      />
                    )}
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-stone-300 font-semibold">Bullet Highlights</label>
                      <button
                        type="button"
                        onClick={handleAddHighlight}
                        className="text-champagne-400 hover:underline text-[11px]"
                      >
                        + Add Bullet
                      </button>
                    </div>

                    {formData.highlights?.map((hl: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                          placeholder="e.g. Handcrafted with authentic pearls"
                          className="w-full px-3.5 py-1.5 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="p-1.5 text-stone-500 hover:text-rose-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEO Keywords */}
              <div className="space-y-2">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                  7. SEO Keywords
                </span>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="e.g. festive door hanging, shubh labh, diwali gifts, delhi ncr"
                  className="w-full px-3.5 py-2 bg-stone-950 border border-stone-700 rounded-xl text-white text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3 sticky bottom-0 bg-stone-900 pb-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-burgundy-700 hover:bg-burgundy-600 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{modalMode === "edit" ? "Save All Changes" : "Publish Handcrafted Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
