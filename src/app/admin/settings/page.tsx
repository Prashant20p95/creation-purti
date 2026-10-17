import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { SettingsClient } from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const isAuthed = await isAuthenticatedAdmin();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const dbSettings = await prisma.storeSetting.findMany();
  const settingsMap: Record<string, string> = {};
  dbSettings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white">
          Store & Checkout Settings
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Update store phone number, WhatsApp contact link, shipping charges, free delivery thresholds, and policies.
        </p>
      </div>

      <SettingsClient initialSettings={settingsMap} />
    </div>
  );
}
