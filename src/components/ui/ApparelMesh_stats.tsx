"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ApparelMesh_stats() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: 1.05, opacity: 0.9 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh-stats" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <path d="M15 0L28 7.5V22.5L15 30L2 22.5V7.5L15 0Z" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="#38bdf8" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh-stats)" />
        </svg>
      </motion.div>
      <div 
        className="absolute inset-0 bg-sky-500/5 blur-[100px]" 
        style={{
          maskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)"
        }}
      />
    </div>
  );
}