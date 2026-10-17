"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  MessageCircle,
  Phone,
  Printer,
  Download,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  CreditCard,
  FileText,
  MapPin,
  Calendar,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { brandConfig } from "@/config/brand";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-950/80 text-amber-300 border-amber-800",
  CONFIRMED: "bg-blue-950/80 text-blue-300 border-blue-800",
  PROCESSING: "bg-purple-950/80 text-purple-300 border-purple-800",
  DISPATCHED: "bg-indigo-950/80 text-indigo-300 border-indigo-800",
  DELIVERED: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
  CANCELLED: "bg-rose-950/80 text-rose-300 border-rose-800",
};

const paymentStatusColors: Record<string, string> = {
  PENDING: "bg-amber-950 text-amber-300 border-amber-800",
  PAID: "bg-emerald-950 text-emerald-300 border-emerald-800",
  COD_ON_DELIVERY: "bg-stone-800 text-stone-300 border-stone-700",
  REFUNDED: "bg-rose-950 text-rose-300 border-rose-800",
};

const COURIER_OPTIONS = [
  "Delhivery",
  "Blue Dart",
  "DTDC",
  "India Post Speed Post",
  "Shadowfax",
  "Xpressbees",
  "Shiprocket",
  "Other Local Courier",
];

export function OrdersManagerClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterPayment, setFilterPayment] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Tracking edit form state
  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [trackingForm, setTrackingForm] = useState({
    courierPartner: "Delhivery",
    trackingNumber: "",
    trackingUrl: "",
    adminNotes: "",
  });

  // Shipping Label modal state
  const [labelOrder, setLabelOrder] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleUpdateOrder = async (orderId: string, payload: any) => {
    setSavingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, ...payload }),
      });

      if (!res.ok) throw new Error("Failed to update order");
      const data = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, ...payload, ...data.order } : o))
      );
      if (editingTrackingId === orderId) {
        setEditingTrackingId(null);
      }
    } catch (e: any) {
      alert(e.message || "Error updating order");
    } finally {
      setSavingId(null);
    }
  };

  const startEditTracking = (order: any) => {
    setEditingTrackingId(order.id);
    setTrackingForm({
      courierPartner: order.courierPartner || "Delhivery",
      trackingNumber: order.trackingNumber || "",
      trackingUrl: order.trackingUrl || "",
      adminNotes: order.adminNotes || "",
    });
  };

  const saveTracking = async (orderId: string) => {
    await handleUpdateOrder(orderId, {
      ...trackingForm,
      orderStatus: "DISPATCHED",
      dispatchDate: new Date().toISOString(),
    });
  };

  // Filter
  const filtered = orders.filter((o) => {
    if (filterStatus !== "ALL" && o.orderStatus !== filterStatus) return false;
    if (filterPayment !== "ALL" && o.paymentStatus !== filterPayment) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const inNum = o.orderNumber.toLowerCase().includes(q);
      const inName = o.customerName.toLowerCase().includes(q);
      const inPhone = o.customerPhone.includes(q);
      const inCity = o.city.toLowerCase().includes(q);
      const inAwb = o.trackingNumber?.toLowerCase().includes(q);
      if (!inNum && !inName && !inPhone && !inCity && !inAwb) return false;
    }
    return true;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Order Number",
      "Order Date",
      "Customer Name",
      "Customer Phone",
      "Customer Email",
      "Address Line 1",
      "Address Line 2",
      "City",
      "State",
      "Pincode",
      "Landmark",
      "Gift Note / Instructions",
      "Items Count",
      "Subtotal",
      "Shipping Fee",
      "Total Amount",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Courier Partner",
      "Tracking Number (AWB)",
      "Tracking URL",
      "Admin Notes",
    ];

    const rows = filtered.map((o) => [
      `"${o.orderNumber}"`,
      `"${new Date(o.createdAt).toLocaleDateString("en-IN")}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail || ""}"`,
      `"${(o.addressLine1 || "").replace(/"/g, '""')}"`,
      `"${(o.addressLine2 || "").replace(/"/g, '""')}"`,
      `"${o.city}"`,
      `"${o.state}"`,
      `"${o.pincode}"`,
      `"${(o.landmark || "").replace(/"/g, '""')}"`,
      `"${(o.deliveryInstructions || "").replace(/"/g, '""')}"`,
      o.items?.length || 0,
      o.subtotal,
      o.shippingFee,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`,
      `"${o.courierPartner || ""}"`,
      `"${o.trackingNumber || ""}"`,
      `"${o.trackingUrl || ""}"`,
      `"${(o.adminNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `purti_creations_orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search, Filter, and Export Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order #, customer name, phone, city, AWB..."
              className="w-full pl-10 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-champagne-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-xs text-stone-400">
              Showing <span className="font-bold text-white font-mono">{filtered.length}</span> of{" "}
              <span className="font-mono">{orders.length}</span> orders
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download Orders Ledger as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Pills for Order Status & Payment Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-stone-900/50 p-2.5 rounded-2xl border border-stone-800/80">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mr-1">
              Status:
            </span>
            {["ALL", "PENDING", "CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED", "CANCELLED"].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-[11px] whitespace-nowrap transition-colors ${
                    filterStatus === st
                      ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {st}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <span className="text-stone-500 text-[11px] font-semibold uppercase tracking-wider mr-1">
              Payment:
            </span>
            {["ALL", "PENDING", "PAID", "COD_ON_DELIVERY", "REFUNDED"].map((pm) => (
              <button
                key={pm}
                onClick={() => setFilterPayment(pm)}
                className={`px-2 py-0.5 rounded-lg font-medium text-[10px] whitespace-nowrap transition-colors ${
                  filterPayment === pm
                    ? "bg-stone-800 text-champagne-300 font-bold border border-stone-700"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Ledger List */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-xl text-xs">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-stone-600" />
            <p>No customer orders match the selected filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {filtered.map((o) => {
              const isExpanded = expandedId === o.id;
              const isEditingTracking = editingTrackingId === o.id;

              return (
                <div key={o.id} className="hover:bg-stone-800/30 transition-colors">
                  {/* Order Card Summary Row */}
                  <div className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Customer & Order Reference */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-bold text-champagne-300 text-sm">
                          {o.orderNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            statusColors[o.orderStatus] || "bg-stone-800 text-stone-300"
                          }`}
                        >
                          {o.orderStatus}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            paymentStatusColors[o.paymentStatus] || "bg-stone-800 text-stone-300"
                          }`}
                        >
                          {o.paymentMethod}: {o.paymentStatus}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {new Date(o.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="font-bold text-white">{o.customerName}</span>
                        <span className="text-stone-400 font-mono">+91 {o.customerPhone}</span>
                        <span className="text-stone-500">&bull;</span>
                        <span className="text-stone-400">
                          {o.city}, {o.state} ({o.pincode})
                        </span>
                        {o.trackingNumber && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                            <Truck className="w-3 h-3" />
                            {o.courierPartner}: {o.trackingNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Financials & Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 text-xs">
                      {/* Price */}
                      <div className="text-left lg:text-right min-w-[90px]">
                        <span className="font-mono font-bold text-white text-sm block">
                          {formatPrice(o.totalAmount)}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          {o.items?.length || 0} item(s) &bull; Ship: {formatPrice(o.shippingFee)}
                        </span>
                      </div>

                      {/* Order Status Select */}
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrder(o.id, { orderStatus: e.target.value })}
                        disabled={savingId === o.id}
                        className="py-1.5 px-2 bg-stone-950 border border-stone-700 rounded-xl text-xs font-semibold text-stone-200 focus:outline-none focus:ring-1 focus:ring-champagne-500"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="DISPATCHED">DISPATCHED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      {/* Payment Status Select */}
                      <select
                        value={o.paymentStatus}
                        onChange={(e) => handleUpdateOrder(o.id, { paymentStatus: e.target.value })}
                        disabled={savingId === o.id}
                        className="py-1.5 px-2 bg-stone-950 border border-stone-700 rounded-xl text-xs font-semibold text-stone-300 focus:outline-none focus:ring-1 focus:ring-champagne-500"
                      >
                        <option value="PENDING">Pay: PENDING</option>
                        <option value="PAID">Pay: PAID</option>
                        <option value="COD_ON_DELIVERY">Pay: COD</option>
                        <option value="REFUNDED">Pay: REFUNDED</option>
                      </select>

                      {/* Print Label Button */}
                      <button
                        onClick={() => setLabelOrder(o)}
                        className="p-2 bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-stone-700 rounded-xl transition-colors"
                        title="Print Shipping Label & Carton Slip"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {/* WhatsApp trigger */}
                      <a
                        href={`https://wa.me/91${o.customerPhone}?text=${encodeURIComponent(
                          `Hello ${o.customerName}! Regarding your Purti Creations handcrafted order #${o.orderNumber}: your order status is now ${o.orderStatus}.${
                            o.trackingNumber
                              ? ` It has been dispatched via ${o.courierPartner} with tracking AWB: ${o.trackingNumber}.`
                              : ""
                          }`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 rounded-xl transition-colors"
                        title="Contact customer on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      {/* Expand Button */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : o.id)}
                        className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="px-4 pb-6 pt-3 sm:px-6 bg-stone-950/70 border-t border-stone-800 space-y-5 text-xs">
                      {/* Top Action Ribbon: Courier Tracking Bar & Gift Note */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Courier Dispatch & Tracking Card */}
                        <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                            <span className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                              <Truck className="w-4 h-4 text-champagne-400" />
                              Courier & Tracking Dispatch
                            </span>
                            {!isEditingTracking ? (
                              <button
                                onClick={() => startEditTracking(o)}
                                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-champagne-300 font-semibold rounded-lg text-[11px] border border-stone-700"
                              >
                                {o.trackingNumber ? "Edit Tracking" : "+ Add Courier / AWB"}
                              </button>
                            ) : (
                              <button
                                onClick={() => setEditingTrackingId(null)}
                                className="text-stone-400 hover:text-white text-[11px]"
                              >
                                Cancel
                              </button>
                            )}
                          </div>

                          {!isEditingTracking ? (
                            <div className="space-y-1.5 text-stone-300 text-xs">
                              {o.trackingNumber ? (
                                <>
                                  <div className="flex items-center justify-between">
                                    <span className="text-stone-400">Courier Partner:</span>
                                    <span className="font-bold text-white">{o.courierPartner}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-stone-400">AWB Tracking Consignment:</span>
                                    <span className="font-mono font-bold text-indigo-400">{o.trackingNumber}</span>
                                  </div>
                                  {o.trackingUrl && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-stone-400">Online Tracking URL:</span>
                                      <a
                                        href={o.trackingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-champagne-400 underline truncate max-w-[200px]"
                                      >
                                        Track Package &rarr;
                                      </a>
                                    </div>
                                  )}
                                  {o.dispatchDate && (
                                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                                      <span>Dispatch Timestamp:</span>
                                      <span>{new Date(o.dispatchDate).toLocaleString("en-IN")}</span>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className="text-stone-500 italic py-2">
                                  No tracking info recorded yet. Click &ldquo;+ Add Courier / AWB&rdquo; once handed to courier.
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2.5 pt-1">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] text-stone-400 block mb-1">Courier Partner</label>
                                  <select
                                    value={trackingForm.courierPartner}
                                    onChange={(e) =>
                                      setTrackingForm({ ...trackingForm, courierPartner: e.target.value })
                                    }
                                    className="w-full px-2.5 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-white text-xs"
                                  >
                                    {COURIER_OPTIONS.map((c) => (
                                      <option key={c} value={c}>
                                        {c}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[10px] text-stone-400 block mb-1">Tracking # (AWB)</label>
                                  <input
                                    type="text"
                                    value={trackingForm.trackingNumber}
                                    onChange={(e) =>
                                      setTrackingForm({ ...trackingForm, trackingNumber: e.target.value })
                                    }
                                    placeholder="e.g. 142093849182"
                                    className="w-full px-2.5 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-white font-mono text-xs"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-[10px] text-stone-400 block mb-1">Tracking Link (Optional)</label>
                                <input
                                  type="url"
                                  value={trackingForm.trackingUrl}
                                  onChange={(e) =>
                                    setTrackingForm({ ...trackingForm, trackingUrl: e.target.value })
                                  }
                                  placeholder="https://delhivery.com/track/package/..."
                                  className="w-full px-2.5 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-white text-xs"
                                />
                              </div>

                              <button
                                onClick={() => saveTracking(o.id)}
                                disabled={savingId === o.id}
                                className="w-full py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Save Tracking & Mark Dispatched</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Customer Gift Note / Instructions Box */}
                        <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                            <span className="font-bold text-champagne-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                              <FileText className="w-4 h-4 text-champagne-400" />
                              Complimentary Handwritten Gift Note
                            </span>
                            {o.deliveryInstructions && (
                              <button
                                onClick={() => copyToClipboard(o.deliveryInstructions, `note-${o.id}`)}
                                className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[11px] flex items-center gap-1"
                              >
                                {copiedId === `note-${o.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Note</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {o.deliveryInstructions ? (
                            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800/80 font-serif italic text-stone-200 text-xs leading-relaxed">
                              &ldquo;{o.deliveryInstructions}&rdquo;
                            </div>
                          ) : (
                            <p className="text-stone-500 italic py-2">
                              No special gift card message was requested by customer.
                            </p>
                          )}

                          {/* Internal Staff Notes */}
                          <div className="pt-2 border-t border-stone-800">
                            <label className="text-[10px] text-stone-400 block mb-1 font-semibold uppercase tracking-wider">
                              Internal Staff Memo:
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                defaultValue={o.adminNotes || ""}
                                onBlur={(e) => {
                                  if (e.target.value !== (o.adminNotes || "")) {
                                    handleUpdateOrder(o.id, { adminNotes: e.target.value });
                                  }
                                }}
                                placeholder="Add internal notes (e.g., requested purple packaging)..."
                                className="w-full px-2.5 py-1.5 bg-stone-950 border border-stone-700 rounded-lg text-white text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Full Address Block & Items List */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                        {/* Address */}
                        <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-stone-800">
                            <span className="font-bold text-stone-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-rose-400" />
                              Recipient Shipping Destination
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  `${o.customerName}\n${o.addressLine1}${
                                    o.addressLine2 ? ", " + o.addressLine2 : ""
                                  }\n${o.city}, ${o.state} - ${o.pincode}\nPhone: ${o.customerPhone}`,
                                  `addr-${o.id}`
                                )
                              }
                              className="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[11px] flex items-center gap-1"
                            >
                              {copiedId === `addr-${o.id}` ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Address</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="text-stone-300 space-y-0.5 leading-relaxed">
                            <p className="font-bold text-white">{o.customerName}</p>
                            <p className="font-mono text-stone-400">+91 {o.customerPhone}</p>
                            {o.customerEmail && <p className="text-stone-400">{o.customerEmail}</p>}
                            <p className="pt-1">{o.addressLine1}</p>
                            {o.addressLine2 && <p>{o.addressLine2}</p>}
                            <p className="font-semibold text-white">
                              {o.city}, {o.state} &mdash; <span className="font-mono text-champagne-300">{o.pincode}</span>
                            </p>
                            {o.landmark && <p className="text-stone-400">Landmark: {o.landmark}</p>}
                          </div>
                        </div>

                        {/* Order Items Breakdown */}
                        <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 space-y-2">
                          <span className="font-bold text-stone-200 uppercase tracking-wider text-[11px] block pb-1 border-b border-stone-800">
                            Ordered Handcrafted Items ({o.items?.length || 0})
                          </span>

                          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                            {o.items?.map((item: any) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800/80"
                              >
                                <div className="flex items-center gap-2.5">
                                  {item.productImage && (
                                    <div className="relative w-9 h-11 rounded-lg bg-stone-900 overflow-hidden flex-shrink-0">
                                      <Image
                                        src={item.productImage}
                                        alt={item.productTitle}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-bold text-white block">
                                      {item.productTitle}
                                    </span>
                                    <span className="text-[10px] text-stone-400">
                                      Qty: {item.quantity} &bull; Unit: {formatPrice(item.unitPrice)}
                                    </span>
                                    {item.customization && (
                                      <span className="text-[10px] text-champagne-300 block">
                                        Custom: {item.customization}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span className="font-mono font-bold text-white">
                                  {formatPrice(item.totalPrice)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PRINTABLE SHIPPING CARTON LABEL MODAL */}
      {labelOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-stone-300 font-sans">
            {/* Modal Controls (Not Printed) */}
            <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
              <span className="font-bold text-sm text-stone-800 flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-burgundy-700" />
                Shipping Label & Packing Slip Preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setLabelOrder(null)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Carton Slip Sheet */}
            <div className="p-6 sm:p-8 space-y-6 text-xs bg-white text-stone-950 printable-area">
              {/* Slip Header */}
              <div className="flex items-start justify-between border-b-2 border-stone-950 pb-4">
                <div>
                  <h1 className="font-serif text-2xl font-bold tracking-tight">Purti Creations</h1>
                  <p className="text-[11px] text-stone-600 mt-0.5">Handcrafted Gifting & Festive Atelier</p>
                  <p className="text-[10px] text-stone-500 font-mono">Delhi NCR, India &bull; Studio: +91 8130400953</p>
                </div>
                <div className="text-right">
                  <div className="inline-block border-2 border-stone-950 px-3 py-1 font-mono font-bold text-sm bg-stone-50">
                    {labelOrder.orderNumber}
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    Date: {new Date(labelOrder.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Courier & COD Strip */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-100 border border-stone-300 rounded-lg font-mono">
                <div>
                  <span className="text-[9px] text-stone-500 block uppercase">Logistics Courier:</span>
                  <span className="font-bold text-xs">
                    {labelOrder.courierPartner || "STANDARD HANDCRAFTED DISPATCH"}
                  </span>
                  {labelOrder.trackingNumber && (
                    <span className="block text-[10px] text-stone-600">AWB: {labelOrder.trackingNumber}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-stone-500 block uppercase">Payment Mode:</span>
                  <span className="font-bold text-xs">
                    {labelOrder.paymentMethod === "COD" ? (
                      <span className="text-amber-800">CASH ON DELIVERY (COLLECT: {formatPrice(labelOrder.totalAmount)})</span>
                    ) : (
                      <span className="text-emerald-800">PREPAID &mdash; DO NOT COLLECT</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Delivery Address Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-stone-300 p-4 rounded-lg">
                <div>
                  <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    SHIP TO (RECIPIENT):
                  </span>
                  <p className="font-bold text-sm text-stone-950">{labelOrder.customerName}</p>
                  <p className="font-mono text-stone-700 text-xs font-semibold">+91 {labelOrder.customerPhone}</p>
                  <p className="text-stone-700 mt-1">{labelOrder.addressLine1}</p>
                  {labelOrder.addressLine2 && <p className="text-stone-700">{labelOrder.addressLine2}</p>}
                  <p className="font-bold text-stone-950 mt-1">
                    {labelOrder.city}, {labelOrder.state} &mdash;{" "}
                    <span className="font-mono text-base">{labelOrder.pincode}</span>
                  </p>
                  {labelOrder.landmark && (
                    <p className="text-stone-600 text-[11px] mt-0.5">Landmark: {labelOrder.landmark}</p>
                  )}
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-stone-200 sm:pl-4 pt-3 sm:pt-0">
                  <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    DISPATCHED FROM:
                  </span>
                  <p className="font-bold text-xs text-stone-950">Purti Creations Studio</p>
                  <p className="text-stone-700 text-[11px]">Handcrafted Atelier Workshop</p>
                  <p className="text-stone-700 text-[11px]">Delhi NCR, India</p>
                  <p className="font-mono text-stone-700 text-[11px]">Helpline: +91 8130400953</p>
                  <p className="text-[10px] text-stone-500 mt-2 italic">
                    Fragile decorative handcrafted items inside. Handle with care.
                  </p>
                </div>
              </div>

              {/* Items Summary Table */}
              <div>
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                  Package Contents:
                </span>
                <table className="w-full text-left border-collapse border border-stone-300 text-[11px]">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-300">
                      <th className="p-2">Item Description</th>
                      <th className="p-2 text-center w-16">Qty</th>
                      <th className="p-2 text-right w-24">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {labelOrder.items?.map((it: any) => (
                      <tr key={it.id}>
                        <td className="p-2">
                          <span className="font-semibold">{it.productTitle}</span>
                          {it.customization && (
                            <span className="block text-[10px] text-stone-600 italic">
                              Custom: {it.customization}
                            </span>
                          )}
                        </td>
                        <td className="p-2 text-center font-mono">{it.quantity}</td>
                        <td className="p-2 text-right font-mono">{formatPrice(it.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-stone-950 font-bold bg-stone-50">
                      <td className="p-2">Total Amount (Incl. Taxes & Delivery)</td>
                      <td className="p-2 text-center font-mono">
                        {labelOrder.items?.reduce((s: number, i: any) => s + i.quantity, 0)}
                      </td>
                      <td className="p-2 text-right font-mono">{formatPrice(labelOrder.totalAmount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Gift Note on Carton */}
              {labelOrder.deliveryInstructions && (
                <div className="p-3 bg-stone-50 border border-stone-300 rounded-lg">
                  <span className="text-[9px] font-bold text-stone-600 uppercase tracking-wider block mb-0.5">
                    Customer Handwritten Gift Note:
                  </span>
                  <p className="font-serif italic text-stone-900 text-xs">
                    &ldquo;{labelOrder.deliveryInstructions}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
