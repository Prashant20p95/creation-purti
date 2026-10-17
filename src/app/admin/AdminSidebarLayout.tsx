"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Layers,
  Image as ImageIcon,
  Users,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

interface AdminSidebarLayoutProps {
  children: React.ReactNode;
}

export function AdminSidebarLayout({ children }: AdminSidebarLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on login page, do not render admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products & Stock", href: "/admin/products", icon: Package },
    { label: "Customer Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Customer Directory", href: "/admin/customers", icon: Users },
    { label: "Store & Policies", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-stone-900 border-b border-stone-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle admin navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-burgundy-800 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-white text-sm">
              {brandConfig.name} Admin
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="p-1.5 text-stone-400 hover:text-white rounded-md text-xs flex items-center gap-1"
            title="View live storefront"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="p-1.5 text-rose-400 hover:text-rose-300 rounded-md"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persistent Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 border-r border-stone-800 flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Cockpit Identity Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-stone-800">
            <div className="w-9 h-9 rounded-lg bg-burgundy-800 flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-white text-base block leading-tight">
                {brandConfig.name}
              </span>
              <span className="text-[10px] text-champagne-400 font-mono tracking-wider uppercase">
                Operations Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest px-3 block mb-2">
              Management
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-burgundy-900/50 text-white border border-burgundy-700/60 font-semibold"
                      : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Storefront Link & Logout */}
        <div className="p-4 border-t border-stone-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-400 hover:text-white bg-stone-800/60 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono">public</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Operational Workspace Content */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
