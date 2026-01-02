"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Droplets } from "lucide-react";
import Image from "next/image";

// --- HIGHLIGHT ANIMATION (Unchanged) ---
const Highlight = ({ children, gradient }: { children: React.ReactNode; gradient: string }) => {
  return (
    <span className="relative inline-block font-bold">
      <motion.span
        className={`bg-clip-text text-transparent bg-size-[200%_auto] ${gradient}`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

// --- UPDATED: WAVY DOTS PATTERN SVG ---
const WavyDotsPattern = ({ color = "#38bdf8" }: { color?: string }) => {
  const dots = useMemo(() => {
    const rows = 15;
    const cols = 30;
    const items = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const u = j / (cols - 1);
        const v = i / (rows - 1);
        
        const x = u * 100; 
        const wave = Math.sin(u * Math.PI * 3 + v * Math.PI * 2) * 2.5;
        const y = v * 100 + wave;
        const opacity = 0.15 + (Math.sin(u * Math.PI * 2) + 1) * 0.15;

        items.push(
          <circle
            key={`${i}-${j}`}
            cx={`${x.toFixed(4)}%`}
            cy={`${y.toFixed(4)}%`}
            r={2}
            fill={color}
            opacity={opacity.toFixed(4)}
          />
        );
      }
    }
    return items;
  }, [color]);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots}
    </svg>
  );
};


// --- OLD DOTS TEXTURE (KEPT FOR HERO SECTION) ---
const DotsTexture = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #38bdf8 1.5px, transparent 1.5px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 opacity-60 mix-blend-screen filter invert contrast-150">
         <Image
           src="/dots-pattern.jpg"
           alt="Texture Pattern"
           fill
           className="object-cover object-top"
           priority
         />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
    </div>
  );
};

// --- DATA (Unchanged) ---
const howWeWorkSteps = [
  {
    image: "/1-1.webp",
    title: "Versatile Print Techniques",
    description: "We utilize techniques tailored to your requirements, including Pigment, High Build, Puff, Gel, and Flock prints to ensure the best quality and execution in delivering ",
  },
  {
    image: "/1.2.webp",
    title: "Advanced Transfers",
    description: (
      <>
        Specialized transfer printing options including{" "}
        <Highlight gradient="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-400">
          Rubber Hot Split
        </Highlight>
        , Sublimation,{" "}
        <Highlight gradient="bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">
          Flock
        </Highlight>
        ,{" "}
        <Highlight gradient="bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-400">
          Foil
        </Highlight>
        , and{" "}
        <Highlight gradient="bg-gradient-to-r from-indigo-400 via-blue-500 to-sky-300">
          Crystal/Metallic
        </Highlight>{" "}
        transfers.
      </>
    ),
  },
  {
    image: "/1.3.webp",
    title: "Global Compliance",
    description: "We use inks free of hazardous chemicals. Our process meets the demands of exports to the USA, UK, and Italy.",
  },
  {
    image: "/1.4.webp",
    title: "High Capacity Output",
    description: "Our 10,000 sq ft factory delivers a capacity output of 500,000 pieces per month to meet customer demands.",
  },
];

// --- ANIMATION VARIANTS (Unchanged) ---
const cardVariants: Variants = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: (i: number = 0) => ({
    opacity: 10,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 },
  }),
};

// --- COMPONENT: CURVED CONNECTOR (Unchanged) ---
const CurvedConnector = ({ isLeftToRight }: { isLeftToRight: boolean }) => {
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
};

// --- COMPONENT: MOBILE CONNECTOR (Unchanged) ---
const MobileConnector = () => (
    <div className="md:hidden flex justify-center h-20 -my-4 relative z-0">
        <motion.div
          className="h-full border-l-2 border-dotted border-sky-500/60 relative"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
          <motion.div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />
        </motion.div>
    </div>
);

// --- SUB-COMPONENT: HOW WE WORK (UPDATED WITH SCROLL ANIMATION) ---
function HowWeWork() {
  const containerRef = useRef(null);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Start animation when section enters viewport
  });

  // Map scroll progress to x-position and opacity
  // Starts 300px to the left and fades in as you scroll down
  const x = useTransform(scrollYProgress, [0, 0.4], [-300, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="relative z-10 bg-slate-950 px-4 sm:px-6 pb-32 overflow-hidden">
      
      {/* --- UPDATED: ANIMATED WAVY DOTS PATTERN --- */}
      {/* This motion.div holds the SVG and applies the scroll-linked animation */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x, opacity }}
      >
        <WavyDotsPattern color="#0ea5e9" /> {/* Using primary sky color */}
      </motion.div>
      {/* --------------------------------------- */}

      <div className="mx-auto max-w-7xl relative pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative z-10"
        >
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How We <span className="text-sky-500">Work</span>
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our streamlined process ensures quality and efficiency at every step
          </p>
        </motion.div>
        
        <div className="relative">
          {howWeWorkSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === howWeWorkSteps.length - 1;

            return (
              <React.Fragment key={step.title}>
                
                <motion.div
                  custom={index}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-20 will-change-transform
                    ${!isEven ? "md:flex-row-reverse" : ""}`}
                >
                  
                  {/* IMAGE SIDE (Unchanged) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'justify-start md:justify-end' : 'justify-start'} px-4`}>
                      <motion.div
                        className="relative w-full max-w-xl aspect-[4/3] rounded-3xl bg-slate-900 shadow-2xl overflow-hidden group"
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                          {/* Animated Gradient Border */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-sky-500 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          {/* Inner Container */}
                          <div className="absolute inset-[2px] bg-slate-950 rounded-[22px] overflow-hidden z-10">
                              {/* Background Grid Pattern */}
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
                              
                              <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority={index < 2}
                              />
                              
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                              {/* Number Badge */}
                              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-14 h-14 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:border-sky-500/50 transition-colors duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                                <span className="text-2xl font-bold text-white/90 group-hover:text-sky-400 transition-colors">0{index + 1}</span>
                              </div>
                          </div>
                      </motion.div>
                  </div>

                  {/* TEXT SIDE (Unchanged) */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"} px-4 md:px-8`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-100 to-cyan-200">
                          {step.title}
                        </span>
                      </h3>
                      <div className="relative max-w-xl ml-0 p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <div className="relative z-10 text-slate-300 text-lg md:text-xl leading-relaxed font-light">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {!isLast && (
                    <>
                        <CurvedConnector isLeftToRight={isEven} />
                        <MobileConnector />
                    </>
                )}

              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- MAIN EXPORT COMPONENT (Unchanged) ---
export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <>
      <section id="services" className="bg-slate-950 relative overflow-hidden pt-24">
        
        {/* HERO BACKGROUND - Kept the static one for the main hero */}
        <DotsTexture />

        {/* HEADER */}
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-2 px-4 border border-sky-500/30 bg-sky-500/10 rounded-full text-sky-400 text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
              <Droplets size={30} className="animate-pulse" />
              Our Craft
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Mastering<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600">
                the Press.
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Every Print Begins with a Dot
            </p>
          </motion.div>
        </div>

        {/* PARALLAX VIDEO BANNER */}
        <div ref={containerRef} className="relative w-full h-[60vh] md:h-[90vh] z-0 overflow-hidden">
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
          </motion.div>
        </div>
      </section>

      <HowWeWork />
    </>
  );
}