"use client";

import React, { useState } from "react";
import {
  Save,
  Check,
  Lock,
  Store,
  Phone,
  Truck,
  ShieldCheck,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  RotateCcw,
} from "lucide-react";
import { brandConfig } from "@/config/brand";

export function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState({
    store_name: initialSettings.store_name || brandConfig.name,
    phone_number: initialSettings.phone_number || brandConfig.phone,
    whatsapp_number: initialSettings.whatsapp_number || brandConfig.whatsappNumber,
    support_email: initialSettings.support_email || "purticreations@gmail.com",
    studio_address:
      initialSettings.studio_address ||
      "Purti Creations Handcrafted Atelier, Delhi NCR, India (Pincode: 110001)",
    announcement_banner:
      initialSettings.announcement_banner ||
      "Free Pan-India Delivery on orders above ₹999 • Studio WhatsApp: +91 8130400953",
    free_shipping_threshold:
      initialSettings.free_shipping_threshold ||
      String(brandConfig.shippingPolicy.freeShippingThreshold),
    standard_shipping_fee:
      initialSettings.standard_shipping_fee ||
      String(brandConfig.shippingPolicy.standardShippingFee),
    enable_cod: initialSettings.enable_cod || "true",
    enable_whatsapp_orders: initialSettings.enable_whatsapp_orders || "true",
    return_window_days: initialSettings.return_window_days || "7",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.trim()) {
      if (newPassword.trim().length < 8) {
        setPasswordError("New password must be at least 8 characters");
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }
    }

    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings,
          newPassword: newPassword.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSaved(true);
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      alert(e.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl text-xs text-stone-300">
      {saved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-300 font-bold animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Operational settings saved successfully!</span>
        </div>
      )}

      {/* 1. Store Identity & Contact Information */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2 pb-2 border-b border-stone-800">
          <Store className="w-4 h-4 text-champagne-400" />
          <span>1. Store Identity & Verified Contact Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Store Brand Name (Strict)</label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-serif font-bold"
            />
            <p className="text-[10px] text-stone-500">Official wordmark: Purti Creations</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Verified Business Calling Phone</label>
            <input
              type="text"
              value={settings.phone_number}
              onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
            <p className="text-[10px] text-stone-500">Official phone: 8130400953</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">WhatsApp Link Number (with 91 country code)</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
            <p className="text-[10px] text-stone-500">Used for 1-click WhatsApp checkout & customer support</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Studio Support Email</label>
            <input
              type="email"
              value={settings.support_email}
              onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="font-semibold text-stone-300">
              Studio Dispatch Origin Address (Printed on shipping carton slips)
            </label>
            <textarea
              rows={2}
              value={settings.studio_address}
              onChange={(e) => setSettings({ ...settings, studio_address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Announcement Banner & Public Messaging */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2 pb-2 border-b border-stone-800">
          <Megaphone className="w-4 h-4 text-champagne-400" />
          <span>2. Storefront Announcement Strip</span>
        </h2>

        <div className="space-y-1">
          <label className="font-semibold text-stone-300">Top Header Announcement Strip Text</label>
          <input
            type="text"
            value={settings.announcement_banner}
            onChange={(e) => setSettings({ ...settings, announcement_banner: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white"
          />
          <p className="text-[10px] text-stone-500">
            Displays at the very top of every storefront page for customer trust and offers.
          </p>
        </div>
      </div>

      {/* 3. Shipping & Payment Gateways */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2 pb-2 border-b border-stone-800">
          <Truck className="w-4 h-4 text-burgundy-400" />
          <span>3. Shipping Thresholds & Payment Options</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-stone-300">
              Free Pan-India Delivery Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.free_shipping_threshold}
              onChange={(e) =>
                setSettings({ ...settings, free_shipping_threshold: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
            <p className="text-[10px] text-stone-500">Orders at or above this value get free delivery</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Standard Delivery Fee (₹)</label>
            <input
              type="number"
              value={settings.standard_shipping_fee}
              onChange={(e) =>
                setSettings({ ...settings, standard_shipping_fee: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
            <p className="text-[10px] text-stone-500">Charged on orders below free threshold</p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enable_cod === "true"}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enable_cod: e.target.checked ? "true" : "false",
                  })
                }
                className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
              />
              <span className="font-semibold text-stone-200">
                Enable Cash on Delivery (COD) Checkout
              </span>
            </label>
            <p className="text-[10px] text-stone-500 pl-6.5">
              Allows customers to place orders without upfront payment.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enable_whatsapp_orders === "true"}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    enable_whatsapp_orders: e.target.checked ? "true" : "false",
                  })
                }
                className="w-4 h-4 rounded text-champagne-500 focus:ring-0 bg-stone-950 border-stone-700"
              />
              <span className="font-semibold text-stone-200">
                Enable 1-Click WhatsApp Quick Ordering
              </span>
            </label>
            <p className="text-[10px] text-stone-500 pl-6.5">
              Allows buyers to finalize orders directly with the atelier on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Security & Admin Password */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2 pb-2 border-b border-stone-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>4. Admin Security & Password Change</span>
        </h2>

        {passwordError && (
          <p className="text-rose-400 font-bold text-xs">{passwordError}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-stone-300">
              New Admin Password (Leave blank to keep current)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-300">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-burgundy-700 hover:bg-burgundy-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Configuration...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save All Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
