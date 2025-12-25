"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useInView, 
  animate, 
} from "framer-motion";

// --- DATA ---
const brands = [
  { name: "Eddie Bauer", src: "/7.svg" },
  { name: "Hugo Boss", src: "/11.svg" },
  { name: "Calvin Klein", src: "/10.svg" },
  { name: "Newport Blue", src: "/13.svg" },
  { name: "True Religion", src: "/1.svg" },
  { name: "Dockers", src: "/3.svg" },
  { name: "Kohls", src: "/6.svg" },
  { name: "Columbia", src: "/9.svg" },
  { name: "Lucky Brand", src: "/8.svg" },
  { name: "Ralph Lauren", src: "/4.svg" },
  { name: "Tommy Hilfiger", src: "/2.svg" },
  { name: "Mothercare", src: "/12.svg" },
];

const stats = [
  { label: "Global Partners", value: 15, suffix: "+" },
  { label: "Quality Assured", value: 100, suffix: "%" },
  { label: "Techniques Mastered", value: 50, suffix: "+" },
];

// --- COMPONENT: OPTIMIZED BACKGROUND ---
// Switched to CSS-based movement or simpler static blurs to save JS thread
const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-600/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-purple-600/20 rounded-full blur-[80px]" />
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ 
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            filter: "contrast(120%) brightness(100%)" 
        }}
      ></div>
    </div>
  );
};

// --- COMPONENT: ANIMATED STAT COUNTER ---
const StatCounter = ({ end, suffix, label }: { end: number, suffix: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration: 2.5, ease: "circOut" });
      return controls.stop;
    }
  }, [isInView, end, count]);

  return (
    <div ref={ref} className="text-center group cursor-default">
      <motion.div 
        className="text-4xl md:text-5xl font-black text-white mb-2 flex justify-center items-baseline"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.span>{rounded}</motion.span>
        <span className="text-indigo-400 ml-1">{suffix}</span>
      </motion.div>
      <motion.p 
        className="text-sm text-gray-500 uppercase tracking-[0.2em] font-medium group-hover:text-indigo-300 transition-colors"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {label}
      </motion.p>
    </div>
  );
};

// --- COMPONENT: HIGH PERFORMANCE TILT CARD ---
const TiltCard = ({ brand, index }: { brand: typeof brands[0], index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  
  // Store bounds in a ref to avoid expensive recalculations on every mouse move
  const bounds = useRef({ width: 0, height: 0, left: 0, top: 0 });

  // Reduced spring stiffness to make it feel smoother and less jittery
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
  
  const glareX = useTransform(rotateY, [-15, 15], ["100%", "0%"]);
  const glareY = useTransform(rotateX, [15, -15], ["0%", "100%"]);

  // PERFORMANCE FIX: Only calculate layout ONCE when mouse enters
  const handleMouseEnter = () => {
    if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        bounds.current = {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top
        };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // PERFORMANCE FIX: Use cached bounds instead of getBoundingClientRect()
    const mouseX = e.clientX - bounds.current.left;
    const mouseY = e.clientY - bounds.current.top;
    
    const xPct = mouseX / bounds.current.width - 0.5;
    const yPct = mouseY / bounds.current.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      // PERFORMANCE FIX: 'will-change-transform' tells browser to prep GPU
      className="relative h-50 w-full perspective-1000 group cursor-pointer will-change-transform"
    >
      {/* PERFORMANCE FIX: Reduced backdrop-blur-xl to backdrop-blur-sm */}
      <div className="absolute inset-0 bg-[#121212]/90 backdrop-blur-sm border border-white/5 rounded-2xl shadow-2xl transition-all duration-300 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden transform-gpu">
        
        {/* Reflection Effect */}
        <motion.div 
          className="absolute inset-0 w-[200%] h-[200%] bg-linear-to-br from-white/10 via-transparent to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            left: "-50%", 
            top: "-50%",
            translateX: glareX,
            translateY: glareY 
          }}
        />

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-indigo-500 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-indigo-500 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-0">
          <div className="relative w-full h-24 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}>
             <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-contain opacity-50 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] invert"
              />
          </div>
          
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-indigo-400 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ transform: "translateZ(10px)" }}>
             {brand.name.toUpperCase()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Brands() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative bg-[#050505] py-32 overflow-hidden perspective-distant">
      <FloatingOrbs />
      
      {/* Background Vignette */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 pointer-events-none"
        style={{ 
          background: "radial-gradient(ellipse at top, rgba(49, 46, 129, 0.2), rgba(17, 24, 39, 0), transparent)" 
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24">
           <motion.div 
             initial={{ opacity: 0, scale: 0.5 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
           >
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-bold text-indigo-200 tracking-widest uppercase">Trusted Partners</span>
           </motion.div>

           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
           >
             Powering the <br/>
             <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 via-white to-gray-400 animate-shimmer bg-size-[200%_auto]">
               World&apos;s Best Brands.
             </span>
           </motion.h2>

           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-400 max-w-2xl"
           >
             [cite_start]From high-end fashion to global sportswear, we are the silent partner behind the brands you trust [cite: 26-42].
           </motion.p>
        </div>

        {/* --- 3D GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-32 px-4">
          {brands.map((brand, i) => (
             <TiltCard key={i} brand={brand} index={i} />
          ))}
        </div>

        {/* --- ANIMATED STATS SECTION --- */}
        <div className="border-t border-white/10 pt-24">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((stat, i) => (
                 <StatCounter 
                    key={i} 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    label={stat.label} 
                 />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}