import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { CustomersClient } from "./CustomersClient";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const isAuthed = await isAuthenticatedAdmin();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  // Group orders by customer phone number
  const customerMap = new Map<string, any>();

  for (const order of orders) {
    const phone = order.customerPhone.trim();
    if (!customerMap.has(phone)) {
      customerMap.set(phone, {
        phone,
        name: order.customerName,
        email: order.customerEmail || "",
        city: order.city,
        state: order.state,
        pincode: order.pincode,
        address: order.addressLine1 + (order.addressLine2 ? `, ${order.addressLine2}` : ""),
        ordersCount: 1,
        totalSpend: order.totalAmount,
        lastOrderDate: order.createdAt.toISOString(),
        lastOrderNumber: order.orderNumber,
        orders: [
          {
            id: order.id,
            orderNumber: order.orderNumber,
            date: order.createdAt.toISOString(),
            amount: order.totalAmount,
            status: order.orderStatus,
            itemsCount: order.items.length,
          },
        ],
      });
    } else {
      const existing = customerMap.get(phone);
      existing.ordersCount += 1;
      existing.totalSpend += order.totalAmount;
      existing.orders.push({
        id: order.id,
        orderNumber: order.orderNumber,
        date: order.createdAt.toISOString(),
        amount: order.totalAmount,
        status: order.orderStatus,
        itemsCount: order.items.length,
      });
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => b.totalSpend - a.totalSpend
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Customer Directory & CRM
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Verified customer relationships, lifetime spending value, and direct WhatsApp re-engagement.
          </p>
        </div>
      </div>

      <CustomersClient initialCustomers={customers} />
    </div>
  );
}
