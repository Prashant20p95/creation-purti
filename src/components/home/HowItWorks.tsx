import React from "react";
import { Search, PenLine, PackageCheck, Truck, ArrowRight } from "lucide-react";
import { brandConfig } from "@/config/brand";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Browse & Personalize",
    description: "Select from floral domes, pearl torans, or marquee hampers with optional letter personalization.",
  },
  {
    num: "02",
    icon: PenLine,
    title: "Complimentary Gift Note",
    description: "Add a free personalized handwritten message to express your feelings directly to the recipient.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Cushioned Rigid Packing",
    description: "Wrapped in multi-layered protective cushioning and packed in rigid shock-absorbing cartons.",
  },
  {
    num: "04",
    icon: Truck,
    title: "Doorstep Pan-India Transit",
    description: `Dispatched from our Delhi studio via trusted express couriers in ${brandConfig.shippingPolicy.estimatedDaysMin}–${brandConfig.shippingPolicy.estimatedDaysMax} business days.`,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EFE9E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-semibold text-burgundy-800 uppercase tracking-widest block">
            THE PURTI CREATIONS PROMISE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-burgundy-950">
            Friction-Free Ordering & Safe Delivery
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            From our artisan studio table straight to your loved one’s doorstep with care at every stage.
          </p>
        </div>

        {/* 4 Connected Process Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#FAF8F5] border border-[#EFE9E1] shadow-2xs hover:shadow-xs transition-shadow space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-2xl text-burgundy-900/40">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-burgundy-900 text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-champagne-300" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {s.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-normal">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EFE9E1] flex items-center gap-1.5 text-[10px] font-semibold text-burgundy-800 uppercase tracking-wider">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
