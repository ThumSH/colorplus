"use client";

import React from "react";
import { motion,Variants } from "framer-motion";
import Image from "next/image";

export type WorkStep = {
  id: string;
  image: string;
  title: React.ReactNode;
  plainTitle: string;
  description: React.ReactNode;
};

// OPTIMIZATION: Use 'tween' instead of 'spring'. 
// Springs require physics calculations every frame. Tweens are predictable and smooth.
const cardVariants:Variants = {
  offscreen: { 
    opacity: 0, 
    y: 40 // Reduced movement distance (less pixels to repaint)
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "tween", 
      ease: "easeOut", 
      duration: 0.6 
    },
  },
};

export const WorkCard = React.memo(({ step, isEven }: { step: WorkStep, index: number, isEven: boolean }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }} // Run once to prevent "stutter" when scrolling back up
      variants={cardVariants}
      className={`relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 last:mb-0 ${!isEven ? "lg:flex-row-reverse" : ""}`}
    >
      {/* --- IMAGE SECTION --- */}
      <div className="w-full lg:w-[60%] group perspective-1000">
        {/* Added 'will-change-transform' to force GPU layer promotion */}
       <div className="relative h-100 lg:h-125 w-full transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.01]">
          
          <div className="absolute inset-0 bg-slate-900 rounded-sm overflow-hidden border border-white/10 shadow-2xl group-hover:border-sky-500/40 transition-colors duration-500">
            {/* Static Corners (Cheap to render) */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 z-20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 z-20" />

            <Image
              src={step.image}
              alt={step.plainTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              loading="lazy"
              quality={80} // Reduce quality slightly for speed
            />
            
            {/* Simple Gradient (Faster than blur) */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent z-10 opacity-70" />
            
            <div className="absolute top-4 right-4 z-20 bg-slate-950/80 border border-white/10 px-3 py-1 text-xs font-mono text-sky-400">
              SEQ_{step.id}
            </div>
          </div>
        </div>
      </div>

      {/* --- TEXT SECTION --- */}
      <div className={`w-full lg:w-[40%] ${isEven ? "lg:text-left" : "lg:text-right"}`}>
        {/* Removed nested motion.divs to reduce React tree depth */}
       <div className={`flex items-center gap-3 mb-6 ${!isEven ? "justify-end" : ""}`}>
            <div className="h-px w-12 bg-sky-500/50" />
            <span className="text-sky-500 font-mono text-sm tracking-widest uppercase">Step {step.id}</span>
        </div>

        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[0.9] tracking-tight">
          {step.title}
        </h3>

        {/* Removed backdrop-blur here as it causes lag on scroll over heavy backgrounds */}
        <div className={`relative p-8 border border-white/5 bg-slate-900/50 rounded-sm ${isEven ? "border-l-sky-500/50 border-l-2" : "border-r-sky-500/50 border-r-2"}`}>
            <div className="text-slate-300 text-lg leading-relaxed font-light">
              {step.description}
            </div>
        </div>
      </div>
    </motion.div>
  );
});
WorkCard.displayName = "WorkCard";