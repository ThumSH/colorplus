"use client";

import React from "react";
import { Target, CheckCircle, Factory } from "lucide-react";

export default function QualityBanner() {
  return (
    <section className="container mx-auto px-6 md:px-12 pb-24">
      <div className="bg-linear-to-r from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')] opacity-10 bg-cover bg-center" />
        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-sky-500/20 border border-sky-500/30 mb-4">
              <Target className="text-sky-400" size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Precision Printing</h4>
            <p className="text-slate-400 text-sm">
              Every print undergoes rigorous quality checks for color accuracy and durability.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-4">
              <CheckCircle className="text-emerald-400" size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Export Standards</h4>
            <p className="text-slate-400 text-sm">
              Meeting international quality standards for markets worldwide.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-violet-500/20 border border-violet-500/30 mb-4">
              <Factory className="text-violet-400" size={28} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Modern Facility</h4>
            <p className="text-slate-400 text-sm">
              State-of-the-art equipment for consistent, high-volume production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}