import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const VideoBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reduced parallax range for performance
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]); 

  return (
    <div ref={containerRef} className="relative w-full h-[65vh] md:h-[85vh] z-0 overflow-hidden bg-slate-500 group">
      
      {/* Video with Parallax */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <video 
          src="/qa.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-800 group-hover:opacity-200 transition-opacity duration-700"
        />
      </motion.div>

      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/10 via-transparent to-slate-950/20" />
    </div>
  );
};