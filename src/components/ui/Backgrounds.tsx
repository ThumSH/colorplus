import React from "react";
import { motion } from "framer-motion";

// Optimized Base Grid (Static)
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

// Optimized Ambient Corners (Static Images or simple divs)
export const AmbientCorners = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[80px] rounded-full mix-blend-screen transform-gpu" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[80px] rounded-full mix-blend-screen transform-gpu" />
  </div>
));
AmbientCorners.displayName = "AmbientCorners";

// Optimized Dots Texture
export const DotsTexture = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
    <div 
      className="absolute inset-0 opacity-20"
      style={{ 
        backgroundImage: 'radial-gradient(circle, #38bdf8 1.5px, transparent 1.5px)', 
        backgroundSize: '40px 40px',
        willChange: 'transform'
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/40 to-slate-950" />
  </div>
));
DotsTexture.displayName = "DotsTexture";

// Optimized Mesh (Reduced animation complexity)
export const OvalHexMesh = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.02, opacity: 0.5 }} // Reduced scale range
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        {/* SVG remains same */}
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <path d="M15 0L28 7.5V22.5L15 30L2 22.5V7.5L15 0Z" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="#38bdf8" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh)" />
        </svg>
      </motion.div>
    </div>
  );
});
OvalHexMesh.displayName = "OvalHexMesh";