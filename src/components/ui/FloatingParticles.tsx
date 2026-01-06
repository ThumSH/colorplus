"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Deterministic random helper (same on Server & Client)
const getSeededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const FloatingParticles = React.memo(({ 
  count = 30, 
  color = "bg-sky-500" 
}: { 
  count?: number; 
  color?: string; 
}) => {
  // Generate stable data based on index (Zero Hydration Mismatch)
  const dots = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seed1 = i * 1.123;
      const seed2 = i * 2.456;
      return {
        id: i,
        left: `${getSeededRandom(seed1) * 100}%`,
        top: `${getSeededRandom(seed2) * 100}%`,
        size: 3 + getSeededRandom(seed1 + seed2) * 6,
        duration: 15 + getSeededRandom(seed1) * 20, // Slower, smoother float
        delay: -getSeededRandom(seed2) * 20, // Negative delay to start mid-animation
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${color} opacity-20`}
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";