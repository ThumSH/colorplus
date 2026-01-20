"use client";

import React from "react";
import { motion } from "framer-motion";
import { Factory, Shirt } from "lucide-react";

export default function CapacityBanner() {
  return (
    <section className="container mx-auto px-6 md:px-12 mb-20 -mt-10 relative z-20">
      <motion.div 
        className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-sky-500/5 via-transparent to-violet-500/5" />
        
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-500/30">
              <Factory className="text-sky-400" size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Manufacturing Capacity
            </h3>
          </div>
          <p className="text-slate-400 max-w-lg text-lg font-light">
            Our 10,000 sq ft facility is staffed by 50+ Well trained and experienced staff, ensuring timely delivery for large-scale orders with precision.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-5xl font-black text-white mb-2">500K</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">
              Pieces Per Month
            </div>
          </div>
          <div className="h-16 w-1 bg-linear-to-b from-sky-500 to-violet-500 rounded-full" />
          <div className="p-4 rounded-xl bg-sky-500/20 border border-sky-500/30">
            <Shirt className="text-sky-400" size={32} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}