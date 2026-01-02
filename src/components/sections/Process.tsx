"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, PenTool, ArrowRight, Droplets, Factory, Globe } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// Ink Drop Indicator
const InkDrops = () => (
  <div className="flex gap-1.5">
    {[0, 0.15, 0.3].map((delay, i) => (
      <div 
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"
        style={{ 
          animationDelay: `${delay}s`,
          boxShadow: '0 0 6px rgba(14, 165, 233, 0.6)'
        }}
      />
    ))}
  </div>
);

const steps = [
  {
    id: "01",
    title: "Consultation & Sourcing",
    desc: "We start by understanding your needs and vision. Beyond printing, we offer value-added services like sourcing accessories from China & Hong Kong to complete your product line.",
    icon: <FileText size={28} />,
  },
  {
    id: "02",
    title: "In-House Design",
    desc: "Our internal design team prepares your concept with precision. We handle everything from artwork separation to color matching using using our internal experties.",
    icon: <PenTool size={28} />,
  },
  {
    id: "03",
    title: "Vertical Production",
    desc: "All operations—from mixing inks to printing and finishing—are conducted entirely within our 10,000 sq ft state-of-the-art factory in Sri Lanka.",
    icon: <Factory size={28} />,
  },
  {
    id: "04",
    title: "QC & Global Export",
    desc: "After rigorous Quality Control and safety testing, we hand over to Our customers and deliver Precisely. We regularly export to the USA, UK, Italy, and the Middle East with full compliance.",
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
      {/* Connecting Line (Desktop Only) with ink drops */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-8 left-8 w-full h-0.5 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-sky-400/20 to-transparent" />
          <motion.div
            className="h-full bg-linear-to-r from-sky-400 to-sky-500 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeInOut" }}
          />
          
          {/* Ink drops along the line */}
          {[0.3, 0.6].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400"
              style={{ left: `${pos * 100}%`, boxShadow: '0 0 6px rgba(14, 165, 233, 0.8)' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.2 + i * 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Icon Bubble */}
      <div className="relative z-10 mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-sky-200/50 group-hover:text-white group-hover:border-sky-400/50 transition-all duration-300 shadow-2xl relative overflow-hidden"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          {/* Ink dot pattern on hover */}
          <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.5px,transparent_0.5px)] bg-size-[8px_8px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          
          {/* Blue glow background on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/80 to-sky-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div 
            className="relative z-10"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            {step.icon}
          </motion.div>
        </motion.div>

        <div className="absolute -bottom-3 -right-3 bg-[#020617] border border-white/10 text-xs font-bold text-gray-500 py-1 px-2 rounded-md group-hover:text-sky-400 group-hover:border-sky-500/50 group-hover:shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-all duration-300">
          {step.id}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xs">
        <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3 flex items-center gap-2 md:justify-start justify-center group-hover:text-sky-400 transition-colors duration-300">
          {step.title}
          <motion.div
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {step.desc}
        </p>
        
        {/* Ink drop decoration */}
        <div className="mt-4 flex md:justify-start justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1">
            {[0, 0.1].map((delay, i) => (
              <div 
                key={i}
                className="w-1 h-1 rounded-full bg-sky-400"
                style={{ 
                  animationDelay: `${delay}s`,
                  boxShadow: '0 0 4px rgba(14, 165, 233, 0.6)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Process() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(imageProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(imageProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} id="process" className="bg-slate-950 py-24 relative overflow-hidden border-t border-white/5">
      
      {/* Ink Drop Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-size-[32px_32px] opacity-10 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-sky-500/10 via-cyan-600/5 to-transparent" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.7)_100%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <InkDrops />
            <Droplets className="text-sky-400" size={16} />
            <span className="text-sky-400 text-xs font-bold tracking-[0.25em] uppercase">THE WORKFLOW</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-cyan-500">Process.</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
            From the first consultation to global export, every step is controlled with precision and care.
          </p>
          
          {/* Decorative ink line */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-linear-to-r from-transparent via-sky-400 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
            <div className="h-px w-12 bg-linear-to-r from-transparent via-sky-400 to-transparent" />
          </div>
        </motion.div>

        {/* Cinematic Image */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-75 md:h-112.5 rounded-2xl overflow-hidden mb-24 border border-white/10 shadow-2xl group"
        >
          <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY, scale: imageScale }}>
            <Image 
              src="https://images.unsplash.com/photo-1544013679-25117c6fab34?w=1600&auto=format&fit=crop&q=80"
              alt="Industrial Screen Printing Workflow"
              fill
              className="object-cover"
              sizes="90vw"
            />
          </motion.div>
          
          {/* Ink dot overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-size-[24px_24px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay" />
          
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/20 via-transparent to-transparent mix-blend-overlay" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
          
          {/* Scanning line effect */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.6)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </motion.div>

        {/* Steps Grid */}
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