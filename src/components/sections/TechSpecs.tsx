"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
import React from "react";

// --- DATA ---
const inkData = [
  { label: "Water Base / Rubber", percentage: 50, color: "bg-sky-500" },
  { label: "Silicone ", percentage: 40, color: "bg-purple-600" },
  { label: "Glitter", percentage: 10, color: "bg-green-600" },
  { label: "Specialty (Foil/Flock)", percentage: 20, color: "bg-cyan-500" },
];

const features = [
  { id: 1, title: "Eco-Friendly Inks", desc: "Hazardous-chemical free.", icon: <Leaf className="text-cyan-400" size={24} />, titleColor: "text-cyan-400" },
  { id: 2, title: "Global Standard", desc: "Trusted by USA & EU brands.", icon: <Globe className="text-sky-400" size={24} />, titleColor: "text-sky-400" },
  { id: 3, title: "Supply Chain", desc: "4-month raw material stock.", icon: <Database className="text-emerald-400" size={24} />, titleColor: "text-emerald-400" },
];

// --- COMPONENTS ---

// 1. Skill Bar (Optimized)
const SkillBar = ({ label, percentage, color, delay }: { label: string, percentage: number, color: string, delay: number }) => {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-slate-300 font-medium text-xs uppercase tracking-wider">{label}</span>
        <span className="text-sky-400 text-xs font-mono">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          className={`h-full ${color} relative`}
          initial={{ scaleX: 0 }}
          whileInView={{ width: percentage / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay }}
        >
             {/* Texture Overlay */}
             <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        </motion.div>
      </div>
    </div>
  );
};

const FloatingMeshAccent = () => (
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 opacity-90 pointer-events-none will-change-transform"
    animate={{ rotate: 360 }}
    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
  >
    <svg className="w-full h-full">
      <defs>
        <radialGradient id="tech-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <pattern id="tech-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
           <rect width="100%" height="100%" fill="transparent" />
           <ellipse cx="7" cy="7" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.8" />
        </pattern>
      </defs>
      {/* Soft Glow Base */}
      <rect width="100%" height="100%" fill="url(#tech-glow)" />
      {/* Rotating Dot Ring */}
      <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#tech-dots)" strokeWidth="60" strokeOpacity="0.5" 
        style={{ maskImage: "radial-gradient(circle, black 40%, transparent 80%)" }}
      />
    </svg>
  </motion.div>
);


// 3. Main TechSpecs Section
export default function TechSpecs() {
  return (
    <section className="bg-slate-950 py-24 relative overflow-hidden">
      
      {/* --- BACKGROUND: Mesh Design --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         {/* Deep Blue Ambient Gradient */}
         <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950 to-cyan-950/20" />
         
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sky-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                The Chemistry
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Quality starts with <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-cyan-600">
                  the perfect drop.
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                We don&apos;t just print; we engineer the ink. Using our internal expertise, our dots connect to form the bigger picture.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {features.map((item, i) => (
                <motion.div 
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-sky-500/10 bg-sky-900/5 hover:bg-sky-900/10 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className="bg-sky-500/10 p-3 rounded-full text-sky-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg ${item.titleColor}`}>{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: SPECS CARD */}
          <div className="relative">
             <FloatingMeshAccent />
            <motion.div 
              className="bg-[#0F172A]/90 backdrop-blur-xl border border-sky-500/20 p-8 rounded-3xl shadow-2xl relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Card Header */}
              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Ink Composition</h3>
                  <p className="text-gray-500 text-xs">Monthly Output Distribution</p>
                </div>
                <ShieldCheck className="text-sky-500" size={32} />
              </div>

              <div className="space-y-2">
                {inkData.map((data, index) => (
                  <SkillBar key={index} {...data} delay={index * 0.2} />
                ))}
              </div>

              <div className="mt-6 pt-6 flex items-start gap-3 bg-sky-500/5 p-4 rounded-lg">
                 <CheckCircle2 className="text-sky-500 shrink-0" size={18} />
                 <p className="text-gray-400 text-xs leading-relaxed">
                   All inks are Oeko-Tex Standard 100 compliant & hazardous-chemical free.
                 </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}