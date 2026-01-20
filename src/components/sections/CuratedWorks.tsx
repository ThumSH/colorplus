"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Dummy data for the curated section
const curatedItems = [
  { id: 1, title: "Summer Edition", image: "/qwe.webp" },
  { id: 2, title: "Urban Tech", image: "/hs.webp" },
  { id: 3, title: "Kids Holiday", image: "/liu.webp" },
  { id: 4, title: "Classy", image: "/ed_a.webp" },
];

export default function CuratedWorks() {
  return (
    <section className="container mx-auto px-6 md:px-12 mb-24">
      {/* Section Header */}
      <motion.div 
        className="flex items-end justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Curated <span className="text-slate-500">Works</span>
          </h2>
          <div className="h-1 w-20 bg-sky-500 mt-2 rounded-full" />
        </div>
        
        <div className="hidden md:block text-slate-500 text-sm font-medium">
          Handpicked highlights from this season
        </div>
      </motion.div>

      {/* Horizontal Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {curatedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              sizes="(max-width: 768px) 50vw, 25vw"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Content (Title & Arrow) */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-bold text-white text-lg md:text-xl">
                  {item.title}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="text-white w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}