"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ApparelMesh } from "@/components/ui/BrandAssets";

// --- Data ---
const brands = [
    { name: "Hugo Boss", src: "/hugo.svg" },
     { name: "Decathlon", src: "/dec.svg" },
  { name: "Tommy Hilfiger", src: "/tmy.svg" },
  { name: "Michael Kors", src: "/cors.svg" },
  { name: "Lily", src: "/lily.svg" },
  { name: "Calvin Klein", src: "/ckl.svg" },
  { name: "Kohls", src: "/kohl.svg" },
  { name: "Eddie Bauer", src: "/edb.svg" },
  { name: "Columbia", src: "/cp.svg" },
  { name: "Diesel", src: "/die.svg" },
  { name: "Mothercare", src: "/mc.svg" },
  { name: "True Religion", src: "/trueR.svg" },
 
];

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Components ---

const BrandCard = React.memo(({ brand }: { brand: (typeof brands)[0] }) => (
  <div className="group relative">
    <div className="relative h-70 sm:h-52 md:h-52 rounded-3xl overflow-hidden transition-all duration-500 bg-white group-hover:scale-[1.02] group-hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]">
      <div className="relative z-10 w-full h-full">
          <Image
            src={brand.src}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
            className="object-cover" 
            unoptimized
          />
      </div>
    </div>
  </div>
));
BrandCard.displayName = "BrandCard";
  
const DesktopSlider = () => {
  const [index, setIndex] = useState(0);
  const SLIDE_OFFSET = 300; 
  const VISIBLE = 3;
  const maxIndex = Math.max(brands.length - VISIBLE, 0);

  const nextSlide = () => setIndex((p) => (p === maxIndex ? 0 : p + 1));
  const prevSlide = () => setIndex((p) => (p === 0 ? maxIndex : p - 1));

  return (
    <div className="relative hidden lg:block w-full max-w-6xl mx-auto">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-16 -right-16 flex justify-between pointer-events-none z-30">
         <button onClick={prevSlide} className="w-14 h-14 pointer-events-auto rounded-full flex items-center justify-center bg-slate-950/80 border border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 transition-all group shadow-lg">
            <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
         </button>
         <button onClick={nextSlide} className="w-14 h-14 pointer-events-auto rounded-full flex items-center justify-center bg-slate-950/80 border border-white/10 text-white hover:bg-sky-500 hover:border-sky-500 transition-all group shadow-lg">
            <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
         </button>
      </div>

      <div className="overflow-hidden w-full py-10 px-2">
        <motion.div
          className="flex gap-10 will-change-transform"
          animate={{ x: -index * SLIDE_OFFSET }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        >
          {brands.map((b) => (
            <div key={b.name} className="min-w-70 shrink-0">
              <BrandCard brand={b} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Brands() {
  return (
    <section className="relative py-24 overflow-hidden border-t border-white/5 mt-0 bg-slate-950">
      
      {/* Updated: Uses the restored OVAL mesh with the side layout */}
      <ApparelMesh color="#0ea5e9" opacity={0.3} />
      
      <div className="relative z-10 container mx-auto px-5">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-8 backdrop-blur-md">
              <Droplets className="text-sky-400" size={16} />
              <span className="text-sky-400 font-black tracking-[0.3em] text-xs uppercase">Premium Partnerships</span>
            </div>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Powering The <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-indigo-400">Industry Leaders.</span>
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
          >
            From high-end fashion to global sportswear, we are the silent
            partner behind the brands you trust.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500/30 mx-auto rounded-full" />
        </motion.div>
        
        {/* Content */}
        <motion.div
            className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
           {brands.map((brand) => <motion.div key={brand.name} variants={fadeInUp}><BrandCard brand={brand} /></motion.div>)}
        </motion.div>
        
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <DesktopSlider />
        </motion.div>
      </div>
    </section>
  );
}