"use client";

import React from "react";
import { motion } from "framer-motion";

// --- 1. Base Grid (Subtle Technical Texture) ---
export const BaseGrid = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none select-none">
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
));
BaseGrid.displayName = "BaseGrid";

// --- 2. Ambient Corners (Color Depth) ---
// OPTIMIZATION: Reduced blur radius slightly to save GPU memory
export const AmbientCorners = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen will-change-transform" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[100px] rounded-full mix-blend-screen will-change-transform" />
  </div>
));
AmbientCorners.displayName = "AmbientCorners";

// --- 3. Oval Hex Mesh (The Centerpiece) ---
// OPTIMIZATION: Removed heavy mask animations on scroll. 
// Uses purely CSS transforms for smoother 60fps animation.
export const OvalHexMesh = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0 will-change-transform"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: 1.05, opacity: 0.5 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh-shared" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <path d="M15 0L28 7.5V22.5L15 30L2 22.5V7.5L15 0Z" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="#38bdf8" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh-shared)" />
        </svg>
      </motion.div>
      
      {/* Static Glow - Cheaper than animating shadows */}
      <div 
        className="absolute inset-0 bg-sky-500/5 blur-[80px]" 
        style={{
          maskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)"
        }}
      />
    </div>
  );
});
OvalHexMesh.displayName = "OvalHexMesh";

// --- 4. Curved Connector (The Circuit Lines) ---
export const CurvedConnector = React.memo(({ isLeftToRight }: { isLeftToRight: boolean }) => {
    return (
      <div className="relative w-full h-48 pointer-events-none hidden md:block -my-16 z-0 overflow-visible">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* TAILWIND v4 FIX: Used hex codes instead of tailwind classes in SVG defs */}
            <linearGradient id={`grad-${isLeftToRight ? 'l2r' : 'r2l'}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="2" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.path
            d={
              isLeftToRight 
                ? "M 300 0 C 300 120, 900 80, 900 200" 
                : "M 900 0 C 900 120, 300 80, 300 200"
            }
            stroke={`url(#grad-${isLeftToRight ? 'l2r' : 'r2l'})`}
            strokeWidth="3"
            strokeDasharray="12 12"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow-line)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    );
});
CurvedConnector.displayName = "CurvedConnector";