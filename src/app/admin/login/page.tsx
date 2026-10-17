"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { brandConfig } from "@/config/brand";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-burgundy-900/60 border border-burgundy-700/60 rounded-2xl flex items-center justify-center text-champagne-300 mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
            {brandConfig.name}
          </h1>
          <p className="text-xs text-stone-400">
            Store Owner Operations & Product Catalogue Admin
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-950/60 border border-rose-800 rounded-xl flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-300 block">
              Admin Access Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin access key"
                className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-champagne-500 font-mono"
              />
              <Lock className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-stone-500">
              Authorized personnel only. Authenticated via environment session token.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-burgundy-700 hover:bg-burgundy-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Enter Admin Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-800 text-center">
          <a
            href="/"
            className="text-xs text-stone-400 hover:text-white transition-colors"
          >
            &larr; Return to Public Storefront
          </a>
        </div>
      </div>
    </div>
  );
}
