"use client";

import React from "react";
import { motion } from "framer-motion";

// 1. Optimized Base Grid (Static)
export const BaseGrid = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none">
    <div 
      className="absolute inset-0 opacity-[0.02]" 
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          transform: 'translateZ(0)'
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
));
BaseGrid.displayName = "BaseGrid";

// 2. DotsTexture (Services/Hero Section)
export const DotsTexture = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    
    {/* A. Ambient Glows */}
    <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
    <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-sky-900/10 blur-[150px] rounded-full mix-blend-screen" />

    {/* B. The Dots */}
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        maskImage: `
            radial-gradient(circle at 0% 0%, black 0%, transparent 60%),
            radial-gradient(circle at 100% 100%, black 0%, transparent 60%)
        `,
        WebkitMaskImage: `
            radial-gradient(circle at 0% 0%, black 0%, transparent 60%),
            radial-gradient(circle at 100% 100%, black 0%, transparent 60%)
        `
      }}
    >
      <svg className="w-full h-full opacity-40"> 
        <defs>
          <pattern id="bg-micro-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="transparent" />
            <circle cx="2" cy="2" r="1.5" fill="#38bdf8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-micro-dots)" />
      </svg>
    </div>
  </div>
));
DotsTexture.displayName = "DotsTexture";

// 3. OvalHexMesh (How We Work Section)
// FIX: Changed mask from Linear (vertical only) to Radial (fades all edges)
export const OvalHexMesh = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
      
      {/* Container */}
      <div className="relative w-full max-w-4xl h-full">
        
        {/* Vertical Gradient Beam */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-sky-900/05 to-transparent blur-3xl" />

        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            // CHANGED: Using a radial gradient to blur Left/Right edges as well as Top/Bottom
            maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 40%, transparent 100%)"
          }}
        >
          <motion.div 
            className="w-full h-full"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <MeshSVG patternId="mesh-center" opacity={0.9} />
          </motion.div>
        </div>
      </div>
    </div>
  );
});
OvalHexMesh.displayName = "OvalHexMesh";

// Helper
const MeshSVG = ({ patternId, opacity }: { patternId: string, opacity: number }) => (
  <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern 
        id={patternId}
        x="0" 
        y="0" 
        width="30" 
        height="30" 
        patternUnits="userSpaceOnUse"
      >
          <rect width="100%" height="100%" fill="transparent" />
          <circle cx="2" cy="2" r="1.5" fill="#0ea5e9" opacity={opacity} />
          <circle cx="17" cy="17" r="1.5" fill="#0ea5e9" opacity={opacity} />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
  </svg>
);

export const ButtonMeshBackdrop = React.memo(() => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 pointer-events-none z-0">
    <div className="absolute inset-0 bg-radial-[closest-side] from-sky-500/10 via-transparent to-transparent opacity-50" />
    <div 
      className="absolute inset-0"
      style={{
        maskImage: "radial-gradient(closest-side, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(closest-side, black 40%, transparent 100%)"
      }}
    >
      <MeshSVG patternId="mesh-button" opacity={0.5} />
    </div>
  </div>
));
ButtonMeshBackdrop.displayName = "ButtonMeshBackdrop";