"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const productSlides = [
  { 
    id: 1, 
    image: "/a.webp", 
    label: "Vibrant Plastisol",
    headline: ["WEAR YOUR", "IDENTITY."], 
    description: "High-definition screen printing for brands that demand perfection. Our plastisol inks deliver bold, opaque colors that last a lifetime.",
    highlightColor: "from-red-200 to-red-500" 
  },
  { 
    id: 2, 
    image: "/b.webp", 
    label: "Soft-Hand Waterbase",
    headline: ["FEEL THE", "DIFFERENCE."],
    description: "Experience the softest touch in the industry. Our water-based eco-inks dye the fabric directly for a vintage, breathable finish.",
    highlightColor: "from-blue-200 to-blue-500"
  },
  { 
    id: 3, 
    image: "/c.webp", 
    label: "Specialty Metallic",
    headline: ["SHINE ABOVE", "THE NOISE."],
    description: "Stand out on the rack with premium metallic foils.",
    highlightColor: "from-emerald-200 to-teal-500"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    }, 4000); // 4000ms is usually better for reading time
    return () => clearInterval(timer); 
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      
      {/* --- 1. OPTIMIZED BACKGROUND STACK --- */}
      {/* Performance Fix: We render ALL images and toggle opacity. 
          This prevents the browser from "destroying" the image node every 3 seconds.
      */}
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
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: isActive ? 1 : 0 }} // Ensure active is clickable if needed
            >
              <Image 
                src={slide.image} 
                alt={slide.label}
                fill
                className="object-cover"
                priority={index === 0} // Only prioritize the first image
                sizes="100vw"
              />
            </motion.div>
          );
        })}
      </div>

      {/* --- 2. STATIC OVERLAYS --- */}
      {/* Texture moved OUTSIDE the loop so it doesn't re-render constantly */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay z-10 pointer-events-none"></div>
      
      {/* Gradient Overlays (Corrected 'bg-linear' to 'bg-gradient') */}
      <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-black/50 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* --- 3. HERO CONTENT --- */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-12">
        
        {/* TEXT AREA */}
        <div className="h-auto min-h-75 flex flex-col justify-center relative w-full"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl"
            >
              {/* Label */}
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-0.5 w-8 bg-white/50"></div>
                 <span className="text-white/80 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                   {productSlides[currentSlide].label}
                 </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl">
                {productSlides[currentSlide].headline[0]} <br />
                {/* Fixed bg-linear to bg-gradient */}
                <span className={`text-transparent bg-clip-text bg-linear-to-r ${productSlides[currentSlide].highlightColor}`}>
                  {productSlides[currentSlide].headline[1]}
                </span>
              </h1>

              {/* Description */}
              <p className="text-gray-200 text-lg md:text-xl max-w-lg leading-relaxed drop-shadow-md">
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
          className="flex flex-wrap gap-4 mt-2"
        >
          <button className="bg-red-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 flex items-center gap-3 group text-sm md:text-base">
            Start Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-transparent border border-gray-400 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all duration-300 text-sm md:text-base">
            View Gallery
          </button>
        </motion.div>

      </div>

      {/* --- 4. SLIDE CONTROLS --- */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex gap-4 items-center">
        <span className="text-white/50 text-sm font-bold tracking-widest uppercase hidden md:block">Select Style</span>
        <div className="flex gap-2">
            {productSlides.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 transition-all duration-500 rounded-none ${
                index === currentSlide ? "w-12 bg-red-600" : "w-6 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
            />
            ))}
        </div>
      </div>

    </section>
  );
}