import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { ProductsManagerClient } from "./ProductsManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const isAuthed = await isAuthenticatedAdmin();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const dbProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">
          Product Catalogue & Inventory Management
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Review prices, confirm draft listings, upload actual product photographs, and update inventory counts.
        </p>
      </div>

      <ProductsManagerClient initialProducts={dbProducts} />
    </div>
  );
}
