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
  { name: "Lily", src: "/lily.svg" },
  { name: "True Religion", src: "/1.svg" },
  { name: "Michael Kors", src: "/kors.svg" },
  { name: "Kohls", src: "/6.svg" },
  { name: "Columbia", src: "/9.svg" },
  { name: "Diesel", src: "/8.svg" },
  { name: "Tommy Hilfiger", src: "/2.svg" },
  { name: "Mothercare", src: "/12.svg" },
  { name: "Decathlon", src: "/deca.svg" }
];

// --- 1. BACKGROUND SYSTEM (Base, Corners, Mesh) ---

const BaseGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
);

const AmbientCorners = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen" />
  </div>
);

const OvalHexMesh = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.05, opacity: 0.5 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <path d="M15 0L28 7.5V22.5L15 30L2 22.5V7.5L15 0Z" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="#38bdf8" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh)" />
        </svg>
      </motion.div>
      <div 
        className="absolute inset-0 bg-sky-500/5 blur-[100px]" 
        style={{
          maskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)"
        }}
      />
    </div>
  );
};

// --- 2. NEW: SCHEMATIC CIRCUIT (The Connectors) ---

// This is the individual connector component from Services.tsx
const CurvedConnector = ({ isLeftToRight }: { isLeftToRight: boolean }) => {
  return (
    <div className="relative w-full h-48 md:h-64 pointer-events-none overflow-visible opacity-30 md:opacity-50">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`grad-${isLeftToRight ? 'l2r' : 'r2l'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="2" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <motion.path
          d={
            isLeftToRight 
              ? "M 300 0 C 300 120, 900 80, 900 200" 
              : "M 900 0 C 900 120, 300 80, 300 200"
          }
          stroke={`url(#grad-${isLeftToRight ? 'l2r' : 'r2l'})`}
          strokeWidth="3"
          strokeDasharray="12 12"
          strokeLinecap="round"
          fill="none"
          filter="url(#glow-line)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

// This container stacks the connectors to create the Zig-Zag flow down the page
const SchematicCircuit = () => {
  return (
    <div className="absolute inset-0 z-0 flex flex-col justify-between py-10 pointer-events-none">
       {/* 1. Right to Left (Connecting Header to Content) */}
       <div className="w-full transform translate-y-12">
          <CurvedConnector isLeftToRight={false} />
       </div>

       {/* 2. Left to Right (Behind Middle Content) */}
       <div className="w-full">
          <CurvedConnector isLeftToRight={true} />
       </div>

       {/* 3. Right to Left (Bottom Fade Out) */}
       <div className="w-full transform -translate-y-12">
          <CurvedConnector isLeftToRight={false} />
       </div>
    </div>
  );
};


// --- 3. EXISTING DOTS BACKGROUND ---
const BrandInkBackgroundComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo(() => {
    const numDots = 18; 
    return Array.from({ length: numDots }).map((_, i) => {
      const t = i / numDots;
      const noise = Math.sin(i * 12.9898) * 43758.5453 % 1;
      
      const x = 85 - (t * 70) + (Math.sin(t * Math.PI * 2) * 10);
      const y = (t * 100) + (noise * 10 - 5);
      const size = Math.max(3, 5 + noise * 6);
      
      return {
        x, y, size,
        opacity: 0.2 + Math.abs(noise) * 0.3, 
        delay: t * 2,
        accent: i % 4 === 0 ? {
          offsetX: (Math.sin(i) * 40),
          offsetY: (Math.cos(i) * 40),
          size: size * 0.5,
          opacity: 0.3
        } : null
      };
    });
  }, []);

  if (!mounted) return <div className="absolute inset-0 z-0 pointer-events-none" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {dots.map((dot, index) => (
        <div key={`bg-dot-${index}`} className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute rounded-full bg-sky-500 will-change-transform animate-brands-pulse"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              boxShadow: `0 0 ${dot.size * 3}px rgba(14, 165, 233, ${dot.opacity})`,
              opacity: dot.opacity,
              animationDelay: `${dot.delay}s`
            }}
          />
          {dot.accent && (
            <div
              className="absolute rounded-full bg-cyan-400 will-change-transform animate-brands-pulse"
              style={{
                left: `calc(${dot.x}% + ${dot.accent.offsetX}px)`,
                top: `calc(${dot.y}% + ${dot.accent.offsetY}px)`,
                width: `${dot.accent.size}px`,
                height: `${dot.accent.size}px`,
                opacity: dot.accent.opacity,
                animationDelay: `${dot.delay + 0.5}s`,
                boxShadow: `0 0 ${dot.accent.size * 2}px rgba(34, 211, 238, 0.4)`
              }}
            />
          )}
        </div>
      ))}
      <style jsx global>{`
        @keyframes brands-pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .animate-brands-pulse {
          animation: brands-pulse 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const BrandInkBackground = React.memo(BrandInkBackgroundComponent);
BrandInkBackground.displayName = "BrandInkBackground";


// --- 4. CARD & SLIDER COMPONENTS ---
const BrandCard = React.memo(({ brand }: { brand: (typeof brands)[0] }) => {
  return (
    <div className="group relative">
      <div className="relative h-80 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:border-sky-500/30 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl backdrop-blur-sm">
        <div className="relative z-10 w-[90%] h-[70%] bg-white rounded-xl flex items-center justify-center p-10 shadow-lg transition-transform duration-500 group-hover:scale-105">
          <div className="relative w-full h-full">
            <Image
              src={brand.src}
              alt={brand.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-contain"
              loading="lazy" 
            />
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-lg font-bold text-slate-500 group-hover:text-sky-400 transition-colors duration-300 uppercase tracking-[0.3em]">
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
        className="absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-slate-950/80 text-white hover:bg-sky-500 hover:border-sky-500 transition-all shadow-2xl backdrop-blur-sm group"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={() => setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))}
        className="absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-slate-950/80 text-white hover:bg-sky-500 hover:border-sky-500 transition-all shadow-2xl backdrop-blur-sm group"
        aria-label="Next Slide"
      >
        <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="overflow-hidden w-full py-10 px-2">
        <motion.div
          className="flex gap-12"
          animate={{ x: -index * SLIDE_OFFSET }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
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

// --- MAIN COMPONENT ---
export default function Brands() {
  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden border-y border-white/5">
      
      {/* 1. Base Textures */}
      <BaseGrid />
      <AmbientCorners />

      {/* 2. Animated Oval Mesh */}
      <OvalHexMesh />

      {/* 3. NEW: Schematic Circuit (Right-Left-Right Connectors) */}
      <SchematicCircuit />

      {/* 4. Dots Overlay */}
      <BrandInkBackground />
      
      {/* 5. Center Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-8 backdrop-blur-md">
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

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Delivering precision, consistency, and scale for brands that demand perfection.
          </p>

          <div className="w-32 h-1 bg-linear-to-r from-transparent via-sky-500 to-transparent mx-auto rounded-full opacity-60" />
        </div>

        {/* Mobile Grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-10">
          {brands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>

        {/* Desktop Slider */}
        <DesktopSlider />
      </div>
    </section>
  );
}