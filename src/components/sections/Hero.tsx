"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const productSlides = [
  { 
    id: 1, 
    image: "/print.webp", 
    label: "Established 2009", 
    headline: ["SCREEN PRINTING", "Perfection."], 
    description: "From design to finish, we offer the best in exceptional quality for the textile industry.",
    highlightColor: "from-sky-400 to-cyan-300" 
  },
  { 
    id: 2, 
    image: "/pri.webp", 
    label: "Born From Experience", 
    headline: ["MASTERING THE", "TECHNIQUE."],
    description: "Utilizing a wide spectrum of techniques including High Build, Gel, Foil, Flock, and Silicone prints.",
    highlightColor: "from-sky-200 to-cyan-500"
  },
  { 
    id: 3, 
    image: "/ty.webp", 
    label: "Global Export Quality",
    headline: ["TRUSTED BY", "ICONS."],
    description: "The preferred printing partner for global giants like Calvin Klein, Hugo Boss, and Diesel. Exporting excellence to the USA, UK, and Italy.",
    highlightColor: "from-sky-100 to-cyan-700"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 5000); 
    return () => clearInterval(timer); 
  }, []);

  return (
    // OPTIMIZATION: Use h-[100dvh] for better mobile browser support (accounts for address bar)
    <section className="relative h-dvh w-full overflow-hidden flex items-center justify-center bg-slate-950">
      
      {/* --- 1. BACKGROUND IMAGE STACK --- */}
      <div className="absolute inset-0 w-full h-full">
        {productSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{ 
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.1 
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full will-change-transform"
              style={{ zIndex: isActive ? 1 : 0 }} 
            >
              <Image 
                src={slide.image} 
                alt={slide.label}
                fill
                className="object-cover"
                priority={index === 0} 
                sizes="100vw"
                quality={85}
              />
            </motion.div>
          );
        })}
      </div>

      {/* --- 2. STATIC OVERLAYS --- */}
      {/* Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10 pointer-events-none" />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-black/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* --- 3. HERO CONTENT --- */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-16 md:pt-0">
        
        {/* TEXT AREA */}
        {/* OPTIMIZATION: min-h prevents layout jumping when text length changes */}
        <div className="min-h-105 md:min-h-125 flex flex-col justify-center relative w-full"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-5xl will-change-transform"
            >
              {/* Label */}
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-0.5 w-8 bg-white/50"></div>
                 {/* Increased font size for mobile readability */}
                 <span className="text-white/90 font-bold tracking-[0.2em] uppercase text-sm md:text-xs">
                   {productSlides[currentSlide].label}
                 </span>
              </div>
              
              {/* Headline */}
              {/* OPTIMIZED TYPOGRAPHY: Starts at 5xl (mobile) -> 6xl (tablet) -> 7xl (laptop) -> 8xl (desktop) */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl md:text-8xm font-black text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-2xl">
                {productSlides[currentSlide].headline[0]} <br />
                <span className={`text-transparent bg-clip-text bg-linear-to-r ${productSlides[currentSlide].highlightColor}`}>
                  {productSlides[currentSlide].headline[1]}
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-200 text-lg sm:text-xl max-w-lg leading-relaxed drop-shadow-md font-medium">
                {productSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- BUTTONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-12 sm:mb-8"
        >
          <Link href="/contact" className="bg-sky-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-sky-700 transition-all duration-300 flex items-center gap-3 group text-base md:text-lg shadow-lg shadow-sky-900/20">
            Get a Quote
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/products" className="bg-transparent border border-gray-400 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all duration-300 text-base md:text-lg backdrop-blur-sm">
            View Our Work
          </Link>
        </motion.div>

      </div>

      {/* --- 4. SLIDE CONTROLS --- */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 flex gap-4 items-center">
        <span className="text-white/50 text-sm font-bold tracking-widest uppercase hidden md:block">
            0{currentSlide + 1} / 0{productSlides.length}
        </span>
        <div className="flex gap-2">
            {productSlides.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 md:h-1 transition-all duration-500 rounded-full md:rounded-none cursor-pointer ${
                index === currentSlide ? "w-12 bg-sky-500" : "w-6 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
            />
            ))}
        </div>
      </div>

    </section>
  );
}