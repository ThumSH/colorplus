"use client";

import React from "react";
import { motion } from "framer-motion";

// Optimized Base Grid (Static) - Kept as requested
export const BaseGrid = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none">
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'translateZ(0)' // Force GPU
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
));
BaseGrid.displayName = "BaseGrid";

// 2. Ambient Corners (Kept for deep color atmosphere)
export const AmbientCorners = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-900/05 blur-[80px] rounded-full mix-blend-screen" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/05 blur-[80px] rounded-full mix-blend-screen" />
  </div>
));
AmbientCorners.displayName = "AmbientCorners";

// 3. NEW: DotsTexture (The "Unique Design")
// Instead of filling the space, this creates a "Spotlight" and a "Floating Accent"
export const DotsTexture = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
    
    {/* A. CENTRAL GLOW: Subtle dots behind the text, fading to black edges */}
    <div 
      className="absolute w-[120%] h-[120%] opacity-40"
      style={{
        maskImage: "radial-gradient(circle at center, black 0%, transparent 60%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 60%)"
      }}
    >
      <svg className="w-full h-full">
        <defs>
          <pattern id="bg-micro-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="transparent" />
            {/* Standard Micro Dot */}
            <ellipse cx="7" cy="7" rx="1.5" ry="2.5" fill="#38bdf8" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-micro-dots)" />
      </svg>
    </div>

    {/* B. FLOATING ACCENT: A denser, rotating ring to add uniqueness */}
    <motion.div
      className="absolute w-150 h-150 opacity-30"
      initial={{ rotate: 0, scale: 1 }}
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{ 
        rotate: { duration: 120, repeat: Infinity, ease: "linear" },
        scale: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
      }}
      style={{
        // Off-center positioning to look organic
        top: "-10%",
        right: "-5%",
        maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 70%)"
      }}
    >
      <svg className="w-full h-full">
        <defs>
          <pattern id="bg-micro-accent" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <rect width="100%" height="100%" fill="transparent" />
             {/* Slightly brighter/denser dots for the accent */}
             <ellipse cx="5" cy="5" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-micro-accent)" />
      </svg>
    </motion.div>

  </div>
));
DotsTexture.displayName = "DotsTexture";

// --- UPDATED: OvalHexMesh (Now uses the Micro Oval SVG Pattern) ---
export const OvalHexMesh = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.02, opacity: 0.5 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          // Radial mask for the "spotlight" effect
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* The Micro Oval Pattern (Animated Version) */}
            <pattern 
              id="bg-mesh-anim" 
              x="0" 
              y="0" 
              width="14" 
              height="14" 
              patternUnits="userSpaceOnUse"
              patternTransform="scale(1.2)"
            >
               <rect width="100%" height="100%" fill="transparent" />
               {/* Slightly larger/brighter for the mesh spotlight */}
               <ellipse cx="3.5" cy="3.5" rx="1.8" ry="3" fill="#0ea5e9" opacity="0.5" />
               <ellipse cx="10.5" cy="10.5" rx="1.8" ry="3" fill="#0ea5e9" opacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#bg-mesh-anim)" />
        </svg>
      </motion.div>
    </div>
  );
});
OvalHexMesh.displayName = "OvalHexMesh";