"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <Image
          src="/ty.webp"
          alt="Fabric Texture"
          fill
          className="object-cover opacity-30"
          priority
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 mb-8 backdrop-blur-sm mx-auto"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-sky-400 w-4 h-4" />
            <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
              Premium Quality
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9]">
            OUR <motion.span 
              className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-violet-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              PRODUCTS
            </motion.span>
          </h1>
          
          <p className="text-slate-300 max-w-xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            From infant wear to high-performance sportswear, we manufacture superlative quality garments for global brands.
          </p>
        </motion.div>
      </div>
    </section>
  );
}