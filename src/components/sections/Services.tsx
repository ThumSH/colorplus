"use client";

import React, { useRef, type ComponentType } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ClipboardList, LayoutTemplate, Printer, PackageCheck, DraftingCompass, ArrowUpRight, type LucideProps } from "lucide-react";
import Link from "next/link";

// --- DATA ---
const processSteps: {
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
}[] = [
  {
    icon: ClipboardList,
    title: "Versatile Print Techniques",
    description: "We utilize techniques tailored to your requirements, including Pigment, Plastisol, High Build, Puff, Gel, and Flock prints to ensure the best quality output.",
  },
  {
    icon: LayoutTemplate,
    title: "Advanced Transfers",
    description: "Specialized transfer printing options including Rubber Hot Split, Sublimation, Flock, Foil, and Crystal/Metallic transfers for intricate detailing.",
  },
  {
    icon: Printer,
    title: "Global Compliance & Safety",
    description: "We use inks free of hazardous chemicals from reputed suppliers. Our standards meet the demands of exports to the USA, UK, Italy, and the Middle East.",
  },
  {
    icon: PackageCheck,
    title: "High-Volume Capacity",
    description: "Our 7,000 sq ft factory in Kottawa, staffed by 50 professionals, delivers a capacity output of 300,000 pieces per month to meet large-scale orders.",
  },
];

// --- ANIMATION VARIANTS ---
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const howWeWorkSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: lineProgress } = useScroll({
    target: howWeWorkSectionRef,
    offset: ["start center", "end center"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  // Header animations
  const headerY = useTransform(headerProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(headerProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Line animation
  const linePathOffset = useTransform(lineProgress, [0.15, 0.85], [1, 0]);

  return (
    <section id="services" className="bg-[#121212] relative overflow-hidden pt-12 pb-20">
      
      {/* --- GLOBAL BACKGROUND LAYERS --- */}
      
      {/* 1. The Technical Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* 2. Global Vignette */}
      <div className="absolute inset-0 bg-[#121212] mask-[radial-gradient(transparent_0%,#121212_100%)] z-0 pointer-events-none opacity-80" />

      {/* 3. Static light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-blue-500/20 via-transparent to-transparent opacity-30 z-0" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-linear-to-b from-blue-500/20 via-transparent to-transparent opacity-30 z-0" />


      {/* --- PART 1: HEADER TEXT --- */}
      <motion.div 
        ref={headerRef}
        className="container mx-auto px-6 md:px-10 text-center mb-12 relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <motion.span 
            className="inline-flex items-center gap-2 py-1 px-3 border border-white/10 bg-[#1a1a1a]/80 rounded-full text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <DraftingCompass size={12} />
            Our Craft
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
            <div className="overflow-hidden">
              <motion.span
                className="inline-block pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                MASTERING
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-linear-to-r from-cyan-500 to-gray-600 pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                THE PRESS.
              </motion.span>
            </div>
          </h2>
        </motion.div>
      </motion.div>


      {/* --- PART 2: THE PARALLAX IMAGE BANNER --- */}
      <div 
        ref={containerRef}
        className="relative w-full h-150 md:h-200 z-0 overflow-hidden" 
      >
        <motion.div 
          style={{ y, scale, opacity: imageOpacity }} 
          className="absolute inset-0 w-full h-full"
        >
          <video
            src="/play.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?q=80&w=1170&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-[#121212]/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(107,114,128,0.02),rgba(59,130,246,0.06))] z-10 bg-size-[100%_2px,3px_100%] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#121212] via-[#121212]/80 to-transparent" />
        </motion.div>
      </div>


      {/* --- PART 3: SERVICES LIST (How We Work) --- */}
      <section 
        ref={howWeWorkSectionRef} 
        className="relative z-10 -mt-40 md:-mt-52 px-6"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[100px]"
            animate={{ x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-slate-800/20 blur-[120px]"
            animate={{ x: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* --- CHANGE 1: Increased max-width to 7xl for wider spread --- */}
        <div className="mx-auto max-w-7xl relative">
          
          {/* Connecting Line SVG */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
            <svg width="100%" height="100%" viewBox="0 0 1000 800" preserveAspectRatio="none" className="overflow-visible">
              <motion.path
                className="hidden md:block"
                d="M 250 100 C 250 200, 750 200, 750 350 S 250 500, 250 650 S 750 800, 750 900"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
                strokeDasharray="8 8"
                pathLength="1"
                style={{ strokeDashoffset: linePathOffset }}
              />
              <motion.path
                className="md:hidden"
                d="M 500 0 V 1000"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
                strokeDasharray="8 8"
                pathLength="1"
                style={{ strokeDashoffset: linePathOffset }}
              />
            </svg>
          </div>

          <div className="space-y-24 pt-20 relative z-10">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.title}
                  custom={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  // --- CHANGE 2: Increased gap to md:gap-20 for more breathability ---
                  className={`group flex flex-col items-center gap-10 text-center md:flex-row md:gap-20 md:items-center ${!isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* --- CHANGE 3: Significantly larger Icon Box (h-72 w-72 on desktop) --- */}
                  <motion.div 
                    className="relative flex h-52 w-52 md:h-72 md:w-72 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-[#121212] shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Grid texture */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />
                    
                    <div className="relative z-10">
                      {/* --- CHANGE 4: Larger Icon (w-32 h-32 on desktop) --- */}
                      <IconComponent className="h-24 w-24 md:h-32 md:w-32 text-blue-500/80 group-hover:text-blue-400 transition-colors" />
                    </div>
                    
                    {/* Active Corner Borders */}
                    <div className="absolute top-0 left-0 w-full h-full border border-blue-500/0 group-hover:border-blue-500/50 rounded-3xl transition-all duration-500" />
                  </motion.div>

                  {/* --- CHANGE 5: Expanded Text Area (flex-1, larger padding, larger text) --- */}
                  <motion.div 
                    className={`w-full md:flex-1 bg-[#121212]/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/5 hover:border-white/10 transition-colors ${isEven ? "md:text-left" : "md:text-right"}`}
                  >
                    {/* Larger Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      <span className="text-blue-500 mr-3">0{index + 1}.</span>
                      {step.title}
                    </h3>
                    {/* Larger Description */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-32 mb-10 flex justify-center relative z-20">
            <Link href="/technique">
              <motion.div
                className="group flex cursor-pointer items-center gap-4 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-white uppercase tracking-widest text-sm font-bold">
                  View Our Techniques
                </span>
                <span className="bg-blue-600 text-white rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={20} />
                </span>
              </motion.div>
            </Link>
          </div>

        </div>
      </section>

    </section>
  );
}