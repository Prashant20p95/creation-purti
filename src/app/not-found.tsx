import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory-50/50 px-4 py-16 text-center space-y-6">
      <div className="space-y-2">
        <span className="text-4xl sm:text-5xl font-serif font-extrabold text-champagne-600 block">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-950">
          Gift Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          The handcrafted gift or page you are looking for may have been moved, renamed, or is currently being updated in our studio.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy-800 hover:bg-burgundy-900 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-ivory-100 text-stone-800 border border-ivory-300 rounded-xl text-xs font-semibold transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Explore All Gifts</span>
        </Link>
      </div>
    </div>
  );
}
