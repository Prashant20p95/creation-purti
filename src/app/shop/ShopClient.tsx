"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductItem } from "@/types";
import { Search, RotateCcw, Filter, Sparkles, SlidersHorizontal } from "lucide-react";

interface ShopClientProps {
  initialProducts: ProductItem[];
  categories: Array<{ name: string; slug: string }>;
  occasions?: Array<{ name: string; slug: string; query: string }>;
}

export function ShopClient({ initialProducts, categories, occasions }: ShopClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialOccasion = searchParams.get("occasion") || "all";
  const initialQuery = searchParams.get("q") || "";
  const initialMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : "";
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [minPrice, setMinPrice] = useState<number | "">(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | "">(initialMaxPrice);
  const [sortBy, setSortBy] = useState("featured");

  const occasionsList = useMemo(() => {
    const list = [{ label: "All Occasions", value: "all" }];
    if (occasions && occasions.length > 0) {
      occasions.forEach((occ) => {
        list.push({ label: occ.name, value: occ.slug });
      });
    } else {
      list.push(
        { label: "Festivals & Pooja", value: "festivals" },
        { label: "Birthdays & Milestones", value: "birthdays" },
        { label: "Anniversary & Romance", value: "anniversary" },
        { label: "Personalized Gifts", value: "personalized" },
        { label: "Housewarming & Weddings", value: "housewarming" }
      );
    }
    return list;
  }, [occasions]);

  const budgetTiers = [
    { label: "All Budgets", value: "all", min: "", max: "" },
    { label: "Under ₹799", value: "under-799", min: "", max: 799 },
    { label: "₹800 to ₹1,299", value: "800-1299", min: 800, max: 1299 },
    { label: "₹1,300 & above", value: "1300-plus", min: 1300, max: "" },
  ];

  const handleBudgetChange = (tierValue: string) => {
    setSelectedBudget(tierValue);
    const tier = budgetTiers.find((b) => b.value === tierValue);
    if (tier) {
      setMinPrice(tier.min as number | "");
      setMaxPrice(tier.max as number | "");
    }
  };

  // Only display verified, price-confirmed, in-stock products on public storefront
  const verifiedProducts = useMemo(() => {
    return initialProducts.filter(
      (p) => p.price && p.isPriceConfirmed && p.inStock && (p.stock === undefined || p.stock > 0)
    );
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return verifiedProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all") {
          const catObj = categories.find((c) => c.slug === selectedCategory);
          if (catObj && product.category.toLowerCase() !== catObj.name.toLowerCase()) return false;
        }

        // Occasion filter
        if (selectedOccasion !== "all") {
          const occKey = selectedOccasion.toLowerCase();
          const matchesOccasion = product.occasions.some((occ) => {
            const o = occ.toLowerCase();
            if (occKey === "festivals" || occKey === "festive") {
              return (
                o.includes("festive") ||
                o.includes("diwali") ||
                o.includes("pooja") ||
                o.includes("ganesh") ||
                o.includes("navratri") ||
                o.includes("shagun")
              );
            }
            if (occKey === "birthdays" || occKey === "birthday") {
              return o.includes("birthday");
            }
            if (occKey === "anniversary") {
              return (
                o.includes("anniversary") ||
                o.includes("romantic") ||
                o.includes("valentine") ||
                o.includes("love")
              );
            }
            if (occKey === "personalized" || occKey === "personal") {
              return (
                o.includes("personal") ||
                o.includes("custom") ||
                product.customizationAvailable === true
              );
            }
            if (occKey === "housewarming" || occKey === "wedding") {
              return (
                o.includes("housewarming") ||
                o.includes("griha pravesh") ||
                o.includes("wedding") ||
                o.includes("shagun")
              );
            }
            return o.includes(occKey);
          });
          if (!matchesOccasion) return false;
        }

        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const inTitle = product.title.toLowerCase().includes(q);
          const inDesc = product.description.toLowerCase().includes(q);
          const inKeywords = product.keywords?.toLowerCase().includes(q) || false;
          const inCategory = product.category.toLowerCase().includes(q);
          if (!inTitle && !inDesc && !inKeywords && !inCategory) return false;
        }

        // Price filters
        if (minPrice !== "" && (product.price === null || product.price === undefined || product.price < minPrice)) {
          return false;
        }
        if (maxPrice !== "" && (product.price === null || product.price === undefined || product.price > maxPrice)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === "price-high") {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === "newest") {
          return b.id.localeCompare(a.id);
        }
        // "featured" default
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [
    verifiedProducts,
    categories,
    selectedCategory,
    selectedOccasion,
    search,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedOccasion("all");
    setSelectedBudget("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
  };

  const hasActiveFilters = Boolean(
    search ||
      selectedCategory !== "all" ||
      selectedOccasion !== "all" ||
      selectedBudget !== "all" ||
      minPrice !== "" ||
      maxPrice !== ""
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Editorial Catalogue Header (Strict Branding Assertion) */}
        <div className="space-y-2 border-b border-[#EFE9E1] pb-6">
          <span className="text-[11px] font-bold text-burgundy-800 uppercase tracking-widest block">
            GIFT COLLECTION
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy-950">
            Find a Gift They&apos;ll Remember
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-2xl leading-relaxed">
            Explore floral keepsakes, festive hangings and thoughtful gifts for life&apos;s special moments.
          </p>
        </div>

        {/* Streamlined Filter & Discovery Cockpit */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EFE9E1] shadow-xs space-y-5">
          {/* Top Search & Sorting Row */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword, product name, or celebratory occasion..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-burgundy-800 focus:border-transparent transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Occasion & Sort Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">Occasion:</span>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="py-2 px-3 text-xs font-medium bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                >
                  {occasionsList.map((occ) => (
                    <option key={occ.value} value={occ.value}>
                      {occ.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-2 px-3 text-xs font-medium bg-[#FAF8F5] border border-[#DDD5CA] rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="p-2 text-stone-500 hover:text-burgundy-900 rounded-xl hover:bg-stone-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Filter Strips: Categories & Budget Tiers */}
          <div className="pt-4 border-t border-[#F2ECE4] space-y-3.5">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex-shrink-0 mr-1">
                Category:
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-burgundy-900 text-white shadow-xs"
                    : "bg-[#FAF8F5] text-stone-700 border border-[#EFE9E1] hover:border-stone-400"
                }`}
              >
                All Gifts ({verifiedProducts.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === c.slug
                      ? "bg-burgundy-900 text-white shadow-xs"
                      : "bg-[#FAF8F5] text-stone-700 border border-[#EFE9E1] hover:border-stone-400"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Budget Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex-shrink-0 mr-1">
                Budget:
              </span>
              {budgetTiers.map((b) => (
                <button
                  key={b.value}
                  onClick={() => handleBudgetChange(b.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedBudget === b.value
                      ? "bg-stone-900 text-white shadow-xs font-semibold"
                      : "bg-[#FAF8F5] text-stone-600 border border-[#EFE9E1] hover:border-stone-400"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Active Results Summary */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> handcrafted gifts
          </span>
          {hasActiveFilters && (
            <span className="text-burgundy-800 font-medium">
              Filtered view active
            </span>
          )}
        </div>

        {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fade-rise">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-16 bg-white rounded-3xl border border-[#EFE9E1] text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-burgundy-50 text-burgundy-900 mx-auto flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">
              No matching handcrafted gifts found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              We couldn&apos;t find any items matching your current filters. Try resetting the filters or searching for another celebratory item.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-burgundy-900 text-white rounded-xl text-xs font-semibold hover:bg-burgundy-800 transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
