"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image"; // <--- Import added

// --- UPDATED DATA WITH IMAGE URLS ---
const productSlides = [
  { 
    id: 1, 
    // Image: Red Streetwear Hoodie Texture
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1920&auto=format&fit=crop", 
    label: "Vibrant Plastisol",
    headline: ["WEAR YOUR", "IDENTITY."], 
    description: "High-definition screen printing for brands that demand perfection. Our plastisol inks deliver bold, opaque colors that last a lifetime.",
    highlightColor: "from-red-200 to-red-500" 
  },
  { 
    id: 2, 
    // Image: Blue Washed Cotton Fabric Texture
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1920&auto=format&fit=crop", 
    label: "Soft-Hand Waterbase",
    headline: ["FEEL THE", "DIFFERENCE."],
    description: "Experience the softest touch in the industry. Our water-based eco-inks dye the fabric directly for a vintage, breathable finish.",
    highlightColor: "from-blue-200 to-blue-500"
  },
  { 
    id: 3, 
    // Image: Dark Metallic Abstract Texture
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1920&auto=format&fit=crop", 
    label: "Specialty Metallic",
    headline: ["SHINE ABOVE", "THE NOISE."],
    description: "Stand out on the rack with premium metallic foils .",
    highlightColor: "from-emerald-200 to-teal-500"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productSlides.length);
    },3000); 
    return () => clearInterval(timer); 
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      
      {/* --- 1. FULL SCREEN BACKGROUND SLIDER (NOW WITH IMAGES) --- */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* The Real Image Implementation */}
          <Image 
            src={productSlides[currentSlide].image} 
            alt={productSlides[currentSlide].label}
            fill
            className="object-cover"
            priority // Loads this image first as it's above the fold
          />
          
          {/* Texture Overlay (Kept for vintage feel) */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        </motion.div>
      </AnimatePresence>

      {/* --- 2. DARK OVERLAYS (ADJUSTED FOR IMAGES) --- */}
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-black/50 z-10" />
      {/* Overall tint to make text pop over photos */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* --- 3. HERO CONTENT --- */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pt-12">
        
        {/* TEXT AREA */}
        <div className="h-105 flex flex-col justify-center relative"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
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
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-4 mt-2"
        >
          {/* Button 1 */}
          <button className="bg-red-600 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 flex items-center gap-3 group text-sm md:text-base">
            Start Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Button 2 */}
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
            />
            ))}
        </div>
      </div>

    </section>
  );
}