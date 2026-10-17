"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  ArrowUpDown,
  Download,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  status: string;
  itemsCount: number;
}

interface Customer {
  phone: string;
  name: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  ordersCount: number;
  totalSpend: number;
  lastOrderDate: string;
  lastOrderNumber: string;
  orders: CustomerOrder[];
}

export function CustomersClient({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"spend" | "orders" | "recent">("spend");
  const [expandedPhone, setExpandedPhone] = useState<string | null>(null);

  // Filter
  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "spend") return b.totalSpend - a.totalSpend;
    if (sortBy === "orders") return b.ordersCount - a.ordersCount;
    if (sortBy === "recent") return new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime();
    return 0;
  });

  // Metrics
  const totalCustomers = customers.length;
  const repeatCustomers = customers.filter((c) => c.ordersCount > 1).length;
  const totalSpendAll = customers.reduce((acc, c) => acc + c.totalSpend, 0);
  const avgCustomerSpend = totalCustomers > 0 ? totalSpendAll / totalCustomers : 0;

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Customer Name",
      "Phone",
      "Email",
      "City",
      "State",
      "Pincode",
      "Total Orders",
      "Total Spend (INR)",
      "Last Order Ref",
      "Last Order Date",
    ];
    const rows = sorted.map((c) => [
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email}"`,
      `"${c.city}"`,
      `"${c.state}"`,
      `"${c.pincode}"`,
      c.ordersCount,
      c.totalSpend,
      `"${c.lastOrderNumber}"`,
      `"${new Date(c.lastOrderDate).toLocaleDateString("en-IN")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `purti_creations_customers_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 4 Customer KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-champagne-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{totalCustomers}</div>
          <p className="text-[11px] text-stone-500">Unique phone numbers on record</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Customer Lifetime Value</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{formatPrice(totalSpendAll)}</div>
          <p className="text-[11px] text-stone-500">Gross spend across all buyers</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Repeat Buyers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{repeatCustomers}</div>
          <p className="text-[11px] text-stone-500">
            {totalCustomers > 0 ? ((repeatCustomers / totalCustomers) * 100).toFixed(0) : 0}% repeat order rate
          </p>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs">
            <span>Average Spend / Buyer</span>
            <ArrowUpDown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white">{formatPrice(avgCustomerSpend)}</div>
          <p className="text-[11px] text-stone-500">Per verified buyer account</p>
        </div>
      </div>

      {/* Search, Filter & Export */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, phone, city..."
            className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-champagne-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-stone-500 mr-1 hidden sm:inline">Sort:</span>
            <button
              onClick={() => setSortBy("spend")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                sortBy === "spend"
                  ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Highest Spend
            </button>
            <button
              onClick={() => setSortBy("orders")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                sortBy === "orders"
                  ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Most Orders
            </button>
            <button
              onClick={() => setSortBy("recent")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                sortBy === "recent"
                  ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Recent
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            title="Download Customer List as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl text-xs">
        {sorted.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <Users className="w-8 h-8 mx-auto text-stone-600" />
            <p>No customers found matching your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {sorted.map((c) => {
              const isExpanded = expandedPhone === c.phone;

              return (
                <div key={c.phone} className="hover:bg-stone-800/30 transition-colors">
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Customer Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{c.name}</span>
                        {c.ordersCount > 1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                            Repeat Buyer ({c.ordersCount})
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-400 text-xs">
                        <span className="font-mono text-stone-300 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-stone-500" />
                          +91 {c.phone}
                        </span>
                        {c.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-stone-500" />
                            {c.email}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-500" />
                          {c.city}, {c.state} ({c.pincode})
                        </span>
                      </div>
                    </div>

                    {/* Spend & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-5">
                      <div className="text-left md:text-right">
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                          Lifetime Spend
                        </span>
                        <span className="text-sm font-bold font-mono text-champagne-300">
                          {formatPrice(c.totalSpend)}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {c.ordersCount} order{c.ordersCount > 1 ? "s" : ""} &bull; Last:{" "}
                          {new Date(c.lastOrderDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Contact & Expand Buttons */}
                      <div className="flex items-center gap-2">
                        {/* WhatsApp Message */}
                        <a
                          href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(
                            `Hello ${c.name}! Thank you for being a valued customer of Purti Creations. We are reaching out from our Delhi NCR handcrafted studio to check if you loved your recent order!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 rounded-xl transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Phone Call */}
                        <a
                          href={`tel:+91${c.phone}`}
                          className="p-2 bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-4 h-4" />
                        </a>

                        {/* Accordion Toggle */}
                        <button
                          onClick={() => setExpandedPhone(isExpanded ? null : c.phone)}
                          className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
                          title="View Order History"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order History */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 bg-stone-950/70 border-t border-stone-800 space-y-3">
                      <div className="flex items-center justify-between text-stone-400 text-xs">
                        <span className="font-bold text-stone-200">
                          Order History for {c.name} ({c.orders.length} order{c.orders.length > 1 ? "s" : ""}):
                        </span>
                        <span>Full Address: {c.address}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {c.orders.map((ord) => (
                          <div
                            key={ord.id}
                            className="p-3 bg-stone-900 rounded-xl border border-stone-800 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-champagne-300 text-xs">
                                {ord.orderNumber}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 border border-stone-700">
                                {ord.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-stone-400">
                              <span>
                                {new Date(ord.date).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span>{ord.itemsCount} item(s)</span>
                            </div>
                            <div className="text-right font-mono font-bold text-white text-xs">
                              {formatPrice(ord.amount)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
