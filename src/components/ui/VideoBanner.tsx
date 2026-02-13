"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const VideoBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optimized Parallax:
  // Use a smaller range (-15% to 15%) to avoid needing a huge video scale.
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]); 

  return (
    // CHANGED: Increased height to h-[85vh] on mobile and h-screen on desktop for a "Bigger" look
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-screen z-0 overflow-hidden  group">
      
      {/* Video with Parallax */}
      <motion.div 
        style={{ y }} 
        className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform"
      >
        <video 
          src="/sq.webm" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          // object-cover ensures it fills the space without distortion
          className="w-full h-full object-cover opacity-500 group-hover:opacity-100 transition-opacity duration-700"
        />
      </motion.div>


      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40" />
    </div>
  );
};