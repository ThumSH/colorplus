"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { motion } from "framer-motion";

// --- Data ---
const brands = [
  { name: "Eddie Bauer", src: "/ed.svg" },
  { name: "Hugo Boss", src: "/11.svg" },
  { name: "Calvin Klein", src: "/10.svg" },
  { name: "Newport Blue", src: "/13.svg" },
  { name: "True Religion", src: "/1.svg" },
  { name: "RBK", src: "/3.svg" },
  { name: "Kohls", src: "/6.svg" },
  { name: "Columbia", src: "/9.svg" },
  { name: "Diesel", src: "/8.svg" },
  { name: "Ralph Lauren", src: "/4.svg" },
  { name: "Tommy Hilfiger", src: "/2.svg" },
  { name: "Mothercare", src: "/12.svg" },
];

// --- 1. OPTIMIZED BACKGROUND (GPU Accelerated) ---
const BrandInkBackgroundComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting slightly to prioritize main content paint
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo(() => {
    const numDots = 35; // Optimized count
    return Array.from({ length: numDots }).map((_, i) => {
      // Deterministic pseudo-random positions based on index
      const t = i / numDots;
      const noise = Math.sin(i * 12.9898) * 43758.5453 % 1;
      
      const x = 80 - (t * 70) + (Math.sin(t * Math.PI * 2) * 15) + (noise * 10);
      const y = (t * 100) + (noise * 10 - 5);
      const size = Math.max(4, 6 + noise * 10);
      
      return {
        x, y, size,
        opacity: 0.3 + Math.abs(noise) * 0.4,
        delay: t * 1.5,
        accent: i % 5 === 0 ? {
          offsetX: (Math.sin(i) * 50),
          offsetY: (Math.cos(i) * 50),
          size: size * 0.6,
          opacity: 0.4
        } : null
      };
    });
  }, []);

  if (!mounted) return <div className="absolute inset-0 z-0 pointer-events-none" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {dots.map((dot, index) => (
        <div key={`bg-dot-${index}`} className="absolute top-0 left-0 w-full h-full">
          {/* Main Dot - Pure CSS Animation */}
          <div
            className="absolute rounded-full bg-sky-400 will-change-transform animate-pulse-slow"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              boxShadow: `0 0 ${dot.size * 2}px rgba(56, 189, 248, ${dot.opacity})`,
              opacity: dot.opacity,
              animationDelay: `${dot.delay}s`
            }}
          />
          {/* Accent Dot */}
          {dot.accent && (
            <div
              className="absolute rounded-full bg-cyan-300 will-change-transform animate-pulse-slow"
              style={{
                left: `calc(${dot.x}% + ${dot.accent.offsetX}px)`,
                top: `calc(${dot.y}% + ${dot.accent.offsetY}px)`,
                width: `${dot.accent.size}px`,
                height: `${dot.accent.size}px`,
                opacity: dot.accent.opacity,
                animationDelay: `${dot.delay + 0.5}s`,
                boxShadow: `0 0 ${dot.accent.size}px rgba(34, 211, 238, 0.5)`
              }}
            />
          )}
        </div>
      ))}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Memoize to prevent re-renders on parent updates
const BrandInkBackground = React.memo(BrandInkBackgroundComponent);
BrandInkBackground.displayName = "BrandInkBackground";


// --- 2. OPTIMIZED COMPONENTS ---
const BrandCard = React.memo(({ brand }: { brand: (typeof brands)[0] }) => {
  return (
    <div className="group relative">
      <div className="relative h-80 rounded-2xl bg-slate-900/60 border border-white/10 group-hover:border-sky-500/40 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl backdrop-blur-sm">
        <div className="relative z-10 w-[90%] h-[70%] bg-white rounded-xl flex items-center justify-center p-10 shadow-lg transition-transform duration-500 group-hover:scale-105">
          <div className="relative w-full h-full">
            <Image
              src={brand.src}
              alt={brand.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain"
              // Only load priority if critical (e.g., first few items), otherwise lazy load
              loading="lazy" 
            />
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-lg font-bold text-slate-400 group-hover:text-sky-300 transition-colors duration-300 uppercase tracking-[0.3em]">
        {brand.name}
      </p>
    </div>
  );
});
BrandCard.displayName = "BrandCard";

const DesktopSlider = () => {
  const [index, setIndex] = useState(0);
  const SLIDE_OFFSET = 380;
  const VISIBLE = 3;
  const maxIndex = Math.max(brands.length - VISIBLE, 0);

  return (
    <div className="relative hidden lg:block w-full max-w-300 mx-auto">
      <button
        onClick={() => setIndex((prev) => (prev === 0 ? maxIndex : prev - 1))}
        className="absolute -left-24 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-slate-950/80 text-white hover:bg-sky-500 hover:border-sky-500 transition-all shadow-2xl backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))}
        className="absolute -right-24 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-slate-950/80 text-white hover:bg-sky-500 hover:border-sky-500 transition-all shadow-2xl backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="overflow-hidden w-full py-10 px-2">
        <motion.div
          className="flex gap-12"
          animate={{ x: -index * SLIDE_OFFSET }}
          transition={{ type: "tween", ease: "circOut", duration: 0.6 }}
        >
          {brands.map((b) => (
            <div key={b.name} className="min-w-85 shrink-0">
              <BrandCard brand={b} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Brands Component ---
export default function Brands() {
  return (
    <section className="relative bg-slate-950 py-20 overflow-hidden border-y border-white/5">
      <BrandInkBackground />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-5">
        
        {/* Updated Header with Description */}
        <div className="text-center mb-2 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-8">
            <Droplets className="text-sky-400" size={16} />
            <span className="text-sky-400 font-black tracking-[0.3em] text-xs uppercase">
              Premium Partnerships
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Powering The <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-indigo-400">
              Industry Leaders.
            </span>
          </h2>

          {/* New Description Item */}
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Delivering precision, consistency, and scale for brands that demand perfection.
          </p>

          <div className="w-32 h-1.5 bg-linear-to-r from-transparent via-sky-500 to-transparent mx-auto rounded-full opacity-60" />
        </div>

        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-10">
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>

        <DesktopSlider />
      </div>
    </section>
  );
}