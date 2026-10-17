"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { brandConfig } from "@/config/brand";

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "serviceable" | "invalid">("idle");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setStatus("invalid");
      return;
    }

    setStatus("checking");
    setTimeout(() => {
      // Calculate estimated delivery dates
      const minDays = brandConfig.shippingPolicy.estimatedDaysMin;
      const maxDays = brandConfig.shippingPolicy.estimatedDaysMax;
      
      const now = new Date();
      const minDate = new Date(now);
      minDate.setDate(now.getDate() + minDays);
      const maxDate = new Date(now);
      maxDate.setDate(now.getDate() + maxDays);

      const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
      setDeliveryDate(`${minDate.toLocaleDateString("en-IN", options)} – ${maxDate.toLocaleDateString("en-IN", options)}`);
      setStatus("serviceable");
    }, 450);
  };

  return (
    <div className="p-3.5 bg-ivory-50 rounded-xl border border-ivory-200 text-xs space-y-2">
      <div className="flex items-center gap-1.5 font-semibold text-stone-800">
        <MapPin className="w-3.5 h-3.5 text-burgundy-700" />
        <span>Check Delivery & Cash on Delivery Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Enter 6-digit PIN code"
          className="flex-1 px-3 py-1.5 bg-white border border-ivory-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-burgundy-500"
        />
        <button
          type="submit"
          disabled={status === "checking" || pincode.length !== 6}
          className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition-colors"
        >
          {status === "checking" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Check"}
        </button>
      </form>

      {status === "serviceable" && (
        <div className="flex items-start gap-1.5 text-emerald-800 font-medium pt-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p>Delivery available to {pincode}! Estimated: <strong className="text-stone-900">{deliveryDate}</strong></p>
            <p className="text-[11px] text-stone-500">Cash on Delivery (COD) available for this pincode.</p>
          </div>
        </div>
      )}

      {status === "invalid" && (
        <div className="flex items-center gap-1 text-rose-700 font-medium pt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Please enter a valid 6-digit Indian PIN code.</span>
        </div>
      )}
    </div>
  );
}
