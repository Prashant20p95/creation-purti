import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { OrdersManagerClient } from "./OrdersManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const isAuthed = await isAuthenticatedAdmin();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const dbOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">
          Customer Orders & Dispatch Ledger
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Track customer orders, prepare dispatch waybills, update shipping status, and notify customers on WhatsApp.
        </p>
      </div>

      <OrdersManagerClient initialOrders={dbOrders} />
    </div>
  );
}
