import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const VideoBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reduced parallax range for performance
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]); 

  return (
    <div ref={containerRef} className="relative w-full h-[65vh] md:h-[85vh] z-0 overflow-hidden border-y border-white/5 bg-slate-900 group">
      

      <motion.div 
        style={{ y }} 
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <video 
          src="/play.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        {/* Simple Gradient Overlays (Cheap to render) */}

      </motion.div>
    </div>
  );
};