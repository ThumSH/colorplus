"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Droplets, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

// --- Types ---
interface Project {
  id: number;
  client: string;
  type: string;
  desc: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    client: "Calvin Klein",
    type: "High-Density Plastisol",
    desc: "Premium tactile prints with sharp edges, exceptional durability, and vibrant color retention. Engineered for high-fashion durability.",
    image: "/ckj.webp",
  },
  {
    id: 2,
    client: "Eddie Bauer",
    type: "Vintage Soft-Hand",
    desc: "Breathable water-based inks perfect for outdoor apparel. Delivering a soft-touch feel with eco-friendly performance standards.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=987&auto=format&fit=crop",
  },
  {
    id: 3,
    client: "LILLY",
    type: "Metallic Foil Transfer",
    desc: "Eye-catching reflective finishes for high-end streetwear. Utilizing premium heat-transfer foils for a liquid-metal aesthetic.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=987&auto=format&fit=crop",
  },
  {
    id: 4,
    client: "Hugo Boss",
    type: "Eco-Friendly Pigment",
    desc: "Sophisticated, sustainable pigment prints that combine luxury aesthetics with eco-conscious production. Delivering a premium soft-hand feel with exceptional color fastness.",
    image: "/hb.webp",
  },
];

// --- 1. Optimized Background (More Visible) ---
const InkWaveBackground = React.memo(() => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dots = useMemo(() => {
    const numDots = 45; // Slightly more dots
    return Array.from({ length: numDots }).map((_, i) => {
      const t = i / numDots;
      const noise = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      return {
        x: 50 + Math.sin(t * Math.PI * 4) * 40,
        y: t * 100,
        // Increased Size
        size: 6 + Math.abs(noise) * 12, 
        // Increased Opacity for better visibility
        opacity: 0.3 + Math.abs(noise) * 0.5, 
        delay: t * 2,
      };
    });
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-sky-500 will-change-transform animate-pulse-slow mix-blend-screen"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animationDelay: `${dot.delay}s`,
            filter: `blur(${dot.size / 4}px)`,
            boxShadow: `0 0 ${dot.size * 2}px rgba(14, 165, 233, 0.5)`
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translateZ(0); opacity: 0.3; }
          50% { transform: scale(1.3) translateZ(0); opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

InkWaveBackground.displayName = "InkWaveBackground";

// --- 2. Enhanced Gallery Item (Card Layout) ---
// --- 2. Enhanced Gallery Item (Card Layout) ---
const GalleryItem = React.memo(({ item, index }: { item: Project; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-10 py-12"
    >
      {/* Grid Container - Fixed ClassName string */}
      <div className={`flex flex-col lg:flex-row items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* IMAGE SECTION */}
        <div className="w-full lg:w-8/12 relative group perspective-1000">
          <div className="relative h-125 md:h-109.5 lg:h-160.5 w-full overflow-hidden rounded-3xl border border-white/5 shadow-2xl bg-slate-900">
             {/* Decorative Elements */}
             <div className="absolute top-6 left-6 z-20 flex gap-2">
                <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-sky-400">
                  REF: 0{index + 1}
                </div>
             </div>

            <Image 
              src={item.image} 
              alt={item.client}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 will-change-transform"
              sizes="(max-width: 700px) 60vw, 40vw"
            />
          </div>
        </div>

        {/* TEXT BOX SECTION - Fixed ClassName string */}
        <div className={`w-full lg:w-5/12 relative z-20 -mt-12 lg:mt-0 ${isReversed ? 'lg:-mr-24' : 'lg:-ml-24'}`}>
          <motion.div 
            whileHover={{ y: -5 }}
            /* FLATTENED STRING BELOW TO FIX HYDRATION ERROR */
            className="relative overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card"
          >
            {/* Glossy sheen effect */}
            <div className="absolute -inset-full bg-linear-to-br from-white/5 via-transparent to-transparent rotate-12 group-hover/card:translate-y-12 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <span className="flex items-center justify-center w-8 h-8 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold">
                     {index + 1}
                   </span>
                   <div className="h-px w-12 bg-linear-to-r from-sky-500/50 to-transparent" />
                 </div>
                 <Layers className="text-slate-600 group-hover/card:text-sky-500 transition-colors duration-300" size={20} />
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
                {item.client}
              </h3>
              
              <p className="text-sky-400 font-mono text-sm tracking-wider uppercase mb-6 border-l-2 border-sky-500 pl-3">
                {item.type}
              </p>

              <div className="h-px w-full bg-white/10 mb-6" />

              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
});

GalleryItem.displayName = "GalleryItem";

// --- 3. Main Component ---
export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-32 relative overflow-hidden transform-gpu">
      <InkWaveBackground />
      
      {/* Decorative large glows */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-sky-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-2 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-950/30 border border-sky-500/20 backdrop-blur-sm mb-6">
          <Droplets className="text-sky-400" size={14} />
          <span className="text-sky-400 text-xs font-bold tracking-[0.25em] uppercase">Showcase</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
          SELECTED
          <span className="block text-transparent bg-clip-text bg-linear-to-b from-sky-300 via-sky-500 to-sky-800">
            WORKS
          </span>
        </h2>
        
        <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
          Exploring the boundaries of textile printing through precision engineering and artistic direction.
        </p>
      </div>

      {/* GALLERY LIST */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-32">
          {projects.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* FOOTER BUTTON */}
        <div className="mt-40 flex justify-center">
          <Link href="/products" passHref>
            <motion.button 
              className="relative group overflow-hidden bg-white text-slate-950 uppercase tracking-widest text-sm font-bold px-10 py-5 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                View Full Collection
                <ArrowUpRight size={18} />
              </div>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}