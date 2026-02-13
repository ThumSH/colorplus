"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { DotsTexture } from "../ui/Backgrounds";
import { VideoBanner } from "../ui/VideoBanner";
import { HowWeWork } from "../ui/HowWeWork";

export default function Services() {
  return (
    <>
      <section id="services" className="bg-slate-950 relative overflow-hidden pt-40">
        <DotsTexture />

        <div className="container mx-auto px-6 text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            // Optional: Add will-change-transform here to help the GPU prepare for the movement
            className="will-change-transform" 
          >
            {/* OPTIMIZED: Removed `backdrop-blur-md` to prevent heavy frame drops during the Y-axis animation. 
                Increased the opacity of the background slightly to compensate (bg-sky-500/10 instead of 5) */}
            <div className="inline-flex items-center gap-2 py-2 px-4 border border-sky-500/20 bg-sky-500/10 rounded-full mb-8">
              <Droplets size={16} className="text-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-bold tracking-[0.3em] uppercase">
                Our Craft
              </span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
              Mastering<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-500 to-blue-600">
                the Press.
              </span>
            </h2>
            <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">
              Every Print Begins with a Dot
            </p>
          </motion.div>
        </div>

        <VideoBanner />
      </section>

      <HowWeWork />
    </>
  );
}