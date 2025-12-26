"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, PenTool, ArrowRight, Sparkles, Factory, Globe } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// --- UPDATED DATA: BASED ON COLOUR PLUS WORKFLOW ---
const steps = [
  {
    id: "01",
    title: "Consultation & Sourcing",
    desc: "We start by understanding your needs. Beyond printing, we offer value-added services like sourcing accessories from China & Hong Kong to reduce your costs.",
    icon: <FileText size={28} />,
  },
  {
    id: "02",
    title: "In-House Design",
    desc: "Our internal design team prepares your concept. We handle everything from artwork separation to color matching using chemical-free inks.",
    icon: <PenTool size={28} />,
  },
  {
    id: "03",
    title: "Vertical Production",
    desc: "All operations—from mixing inks to printing and finishing—are conducted entirely within our 7,000 sq ft factory in Kottawa to ensure consistency.",
    icon: <Factory size={28} />,
  },
  {
    id: "04",
    title: "QC & Global Export",
    desc: "After rigorous Quality Control, we pack and ship. We regularly export to the USA, UK, Italy, and the Middle East, meeting international standards.",
    icon: <Globe size={28} />,
  },
];

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  totalSteps: number;
}

const StepCard = ({ step, index, totalSteps }: StepCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col items-center text-center md:items-start md:text-left"
    >
      {/* --- CONNECTING LINE (Desktop Only) --- */}
      {/* Placed behind the icon. It spans to the right to connect to the next item */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-8 left-8 w-full h-0.5 bg-white/5 z-0">
          {/* Animated Progress Line moving right */}
          <motion.div
            className="h-full bg-linear-to-r from-blue-600/50 to-transparent w-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* --- ICON BUBBLE --- */}
      <div className="relative z-10 mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-2xl relative overflow-hidden"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          {/* Blue Glow Background on Hover */}
          <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon (scales slightly on hover) */}
          <motion.div 
            className="relative z-10"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            {step.icon}
          </motion.div>
        </motion.div>

        {/* Small hanging number badge */}
        <div className="absolute -bottom-3 -right-3 bg-[#121212] border border-white/10 text-xs font-bold text-gray-500 py-1 px-2 rounded-md group-hover:text-blue-500 group-hover:border-blue-500/50 transition-colors duration-300">
           {step.id}
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-xs">
        <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3 flex items-center gap-2 md:justify-start justify-center group-hover:text-blue-500 transition-colors duration-300">
          {step.title}
          <motion.div
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {step.desc}
        </p>
      </div>

    </motion.div>
  );
};

export default function Process() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  // Smooth Parallax for the Image
  const imageY = useTransform(imageProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(imageProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} id="process" className="bg-[#121212] py-24 relative overflow-hidden border-t border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-white/5 via-[#121212] to-[#121212] opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 py-1 px-3 border border-blue-500/20 bg-blue-500/5 rounded-sm">
            <Sparkles size={12} />
            The Workflow
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">Process.</span>
          </h2>
        </motion.div>

        {/* --- CINEMATIC IMAGE --- */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-75 md:h-112.5 rounded-2xl overflow-hidden mb-24 border border-white/10 shadow-2xl group"
        >
          {/* Parallax Image Layer */}
          <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY, scale: imageScale }}>
            <Image 
              src="https://images.unsplash.com/photo-1544013679-25117c6fab34?w=1600&auto=format&fit=crop&q=80"
              alt="Industrial Screen Printing Workflow"
              fill
              className="object-cover"
              sizes="90vw"
            />
          </motion.div>
          
          {/* Cinematic Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
          
          {/* Animated Scan Line */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-0.5 bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        {/* --- STEPS GRID --- */}
        {/* Changed gap to allow connecting lines to look correct */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <StepCard 
              key={step.id} 
              step={step} 
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}