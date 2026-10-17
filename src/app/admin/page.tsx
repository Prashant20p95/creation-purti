import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Truck,
  Users,
  CheckCircle2,
  DollarSign,
  Printer,
  ChevronRight,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isAuthed = await isAuthenticatedAdmin();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const [allOrders, products] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Operational metrics
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter((o) => ["PENDING", "CONFIRMED"].includes(o.orderStatus));
  const processingOrders = allOrders.filter((o) => ["PROCESSING", "DISPATCHED"].includes(o.orderStatus));
  const deliveredOrders = allOrders.filter((o) => o.orderStatus === "DELIVERED");
  const cancelledOrders = allOrders.filter((o) => o.orderStatus === "CANCELLED");

  // Financial metrics
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const codRevenue = allOrders.filter((o) => o.paymentMethod === "COD").reduce((sum, o) => sum + o.totalAmount, 0);
  const prepaidRevenue = totalRevenue - codRevenue;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Inventory metrics
  const activeProducts = products.filter((p) => p.inStock && p.stock > 0);
  const unconfirmedPriceProducts = products.filter((p) => !p.isPriceConfirmed);
  const lowStockProducts = products.filter((p) => p.stock <= 5 && p.inStock);
  const outOfStockProducts = products.filter((p) => !p.inStock || p.stock === 0);

  // Unique customer count
  const uniquePhones = new Set(allOrders.map((o) => o.customerPhone.trim()));
  const totalCustomers = uniquePhones.size;

  const recentOrders = allOrders.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Cockpit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Operations Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Storefront Cockpit & Executive Ledger
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Real-time fulfillment metrics, financial reconciliation, and inventory tracking for {brandConfig.name}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-3.5 py-2 bg-burgundy-700 hover:bg-burgundy-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Manage Products ({products.length})</span>
          </Link>
          <Link
            href="/admin/orders"
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders Ledger ({totalOrders})</span>
          </Link>
          <Link
            href="/admin/customers"
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customers ({totalCustomers})</span>
          </Link>
        </div>
      </div>

      {/* Urgent Action Banners */}
      {(pendingOrders.length > 0 || unconfirmedPriceProducts.length > 0) && (
        <div className="space-y-3">
          {pendingOrders.length > 0 && (
            <div className="p-4 bg-amber-950/60 border border-amber-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <strong className="text-amber-200 block text-xs">
                    {pendingOrders.length} Order(s) Awaiting Packing & Courier Dispatch
                  </strong>
                  <span className="text-amber-300/80 text-[11px]">
                    Customer packages pending fulfillment. Prepare cartons, print labels, and assign courier AWB tracking.
                  </span>
                </div>
              </div>
              <Link
                href="/admin/orders"
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs whitespace-nowrap self-start sm:self-auto"
              >
                Fulfill Orders &rarr;
              </Link>
            </div>
          )}

          {unconfirmedPriceProducts.length > 0 && (
            <div className="p-4 bg-purple-950/60 border border-purple-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <strong className="text-purple-200 block text-xs">
                    {unconfirmedPriceProducts.length} Product(s) Marked as Draft / Unconfirmed
                  </strong>
                  <span className="text-purple-300/80 text-[11px]">
                    Confirm official selling prices in Products Manager to ensure they display live on the storefront.
                  </span>
                </div>
              </div>
              <Link
                href="/admin/products"
                className="px-3.5 py-1.5 bg-purple-500 hover:bg-purple-400 text-stone-950 font-bold rounded-lg text-xs whitespace-nowrap self-start sm:self-auto"
              >
                Confirm Prices &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {/* 4 Core Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium">
            <span>Total Orders Volume</span>
            <ShoppingBag className="w-4 h-4 text-burgundy-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalOrders}</div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-800/80">
            <span>{pendingOrders.length} pending action</span>
            <span className="text-emerald-400">{deliveredOrders.length} delivered</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium">
            <span>Gross Recorded Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{formatPrice(totalRevenue)}</div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-800/80">
            <span>COD: {formatPrice(codRevenue)}</span>
            <span>Prepaid: {formatPrice(prepaidRevenue)}</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium">
            <span>Average Order Value (AOV)</span>
            <DollarSign className="w-4 h-4 text-champagne-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{formatPrice(avgOrderValue)}</div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-800/80">
            <span>Across {totalOrders} orders</span>
            <span className="text-stone-400 font-mono">{totalCustomers} buyers</span>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-medium">
            <span>Catalogue Health</span>
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{products.length}</div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-800/80">
            <span className="text-emerald-400">{activeProducts.length} live in stock</span>
            <span className={lowStockProducts.length > 0 ? "text-amber-400" : ""}>
              {lowStockProducts.length} low stock
            </span>
          </div>
        </div>
      </div>

      {/* Operational Breakdown Matrix & Inventory Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Fulfillment Pipeline Breakdown */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h2 className="font-serif font-bold text-white text-sm flex items-center gap-2">
              <Truck className="w-4 h-4 text-champagne-400" />
              Fulfillment Pipeline
            </h2>
            <Link href="/admin/orders" className="text-champagne-400 hover:underline text-[11px]">
              Ledger &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Pending / Confirmed:
              </span>
              <span className="font-mono font-bold text-white text-sm">{pendingOrders.length}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                In Processing / Dispatched:
              </span>
              <span className="font-mono font-bold text-white text-sm">{processingOrders.length}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Delivered / Fulfilled:
              </span>
              <span className="font-mono font-bold text-white text-sm">{deliveredOrders.length}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Cancelled / Returned:
              </span>
              <span className="font-mono font-bold text-white text-sm">{cancelledOrders.length}</span>
            </div>
          </div>
        </div>

        {/* Low Stock Replenishment Strip */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <h2 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Atelier Inventory Alert Tracker
              </h2>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Items requiring replenishment or price confirmation.
              </p>
            </div>
            <Link href="/admin/products" className="text-champagne-400 hover:underline text-[11px]">
              All Products &rarr;
            </Link>
          </div>

          {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
            <div className="py-8 text-center text-stone-500 space-y-1">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
              <p className="text-stone-300 font-semibold">Inventory Levels Healthy</p>
              <p className="text-[11px]">All active products have more than 5 units in stock.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              {[...lowStockProducts, ...outOfStockProducts].slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between gap-3"
                >
                  <div className="truncate">
                    <span className="font-bold text-white block truncate">{p.title}</span>
                    <span className="text-[10px] text-stone-400">{p.category}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.inStock && p.stock > 0
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-rose-950 text-rose-300 border border-rose-800"
                      }`}
                    >
                      {p.inStock && p.stock > 0 ? `${p.stock} units left` : "Out of stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div>
            <h2 className="text-base font-serif font-bold text-white">Recent Customer Orders</h2>
            <p className="text-xs text-stone-400">
              Incoming purchases and delivery updates requiring action.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs text-champagne-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Orders Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center space-y-2 text-stone-500 text-xs">
            <ShoppingBag className="w-8 h-8 mx-auto text-stone-600" />
            <p>No customer orders recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs text-stone-300">
            <table className="w-full text-left">
              <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Order Ref</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4 text-right">Quick WhatsApp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-champagne-300">
                      {o.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-white block">{o.customerName}</span>
                      <span className="text-stone-400 text-[11px] font-mono">+91 {o.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {o.city}, {o.state} &bull; <span className="font-mono text-stone-400">{o.pincode}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {o.items.length} item{o.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {formatPrice(o.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 text-stone-300 border border-stone-700">
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          o.orderStatus === "DELIVERED"
                            ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                            : o.orderStatus === "DISPATCHED"
                            ? "bg-indigo-950 text-indigo-300 border-indigo-800"
                            : "bg-amber-950 text-amber-300 border-amber-800"
                        }`}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/91${o.customerPhone}?text=${encodeURIComponent(
                          `Hello ${o.customerName}! We have received your Purti Creations handcrafted order #${o.orderNumber}. Our Delhi NCR studio is preparing your package.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 rounded-lg inline-flex items-center gap-1 text-[11px]"
                        title="Chat with Customer on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
