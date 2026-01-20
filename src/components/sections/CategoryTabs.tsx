"use client";

import React from "react";
import { motion } from "framer-motion";
import { categories } from "../ui/product-data";

export default function CategoryTabs({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (category: string) => void }) {
  return (
    <section className="container mx-auto px-6 md:px-12 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Explore Our <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Collections</span>
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto font-light">
          Browse through our premium garment categories, each crafted with precision and care.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 ${
                isActive
                  ? "text-white bg-linear-to-r from-sky-500 to-violet-500 shadow-lg shadow-sky-500/25"
                  : "text-slate-500 bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-600 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-linear-to-r from-sky-500 to-violet-500 rounded-full -z-10"
                />
              )}
              <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
              {cat.label}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}