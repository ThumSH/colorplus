"use client";

import React, { useRef, useId } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Zap, Droplets, Sparkles, Feather, Maximize, CheckCircle, PieChart as PieIcon, ArrowRight } from "lucide-react";
import Image from "next/image";

// --- 1. MESH BACKGROUND SYSTEM (New Micro Dot Design) ---

function MeshOval({
  className = "",
  opacity = 0.55,
  rotate = 0,
}: {
  className?: string;
  opacity?: number;
  rotate?: number;
}) {
  const uid = useId();
  const patternId = `meshPattern-${uid}`;
  const gradId = `meshGrad-${uid}`;

  return (
    <div 
      className={`absolute pointer-events-none ${className}`} 
      style={{ 
        transform: `rotate(${rotate}deg)`,
        // ✅ Signature Soft Fade Mask
        maskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
        // ✅ Signature Soft Blur
        filter: "blur(0.5px)",
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-sky-600/10 blur-[60px]" />

      <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient for the Ring Stroke */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
          </linearGradient>

          {/* ✅ THE MICRO DOT PATTERN */}
          <pattern id={patternId} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="transparent" />
            <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.6" />
            <ellipse cx="9" cy="9" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.5" />
          </pattern>
        </defs>

        <g opacity={opacity}>
          {/* Filled Body */}
          <ellipse cx="150" cy="150" rx="130" ry="105" fill={`url(#${patternId})`} opacity="0.9" />
          
          {/* Stroke Ring */}
          <ellipse
            cx="150"
            cy="150"
            rx="130"
            ry="105"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

// Updated: Retained specific positioning for this page's layout
function TechniquesMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Behind Ink Composition (Left) */}
      <MeshOval className="top-[90vh] -left-32 w-96 h-96" opacity={0.6} rotate={-20} />
      
      {/* 2. Middle Section (Right) */}
      <MeshOval className="top-[180vh] -right-20 w-80 h-80" opacity={0.5} rotate={15} />
      
      {/* 3. Bottom/Transfer Section (Left) */}
      <MeshOval className="bottom-20 left-10 w-72 h-72" opacity={0.5} rotate={-10} />
    </div>
  );
}

// --- DATA FROM PDF: INK COMPOSITION CHART  ---
const inkStats = [
  { label: "Water Base", value: 50, color: "bg-sky-500" },
  { label: "Silicone ", value: 40, color: "bg-violet-500" },
  { label: "Glitter", value: 3, color: "bg-purple-500" },
  { label: "Pigment", value: 3, color: "bg-emerald-500" },
  { label: "Foil", value: 2, color: "bg-amber-500" },
  { label: "Flock", value: 1, color: "bg-pink-500" },
  { label: "Other", value: 2, color: "bg-slate-500" },
];

// --- DATA FROM PDF: PRINT TECHNIQUES ---
const techniques = [
  {
    id: "tech-01",
    title: "Pigment Prints",
    desc: "Soaks into the fabric for a 'zero-hand' feel. Best for vintage looks on light fabrics.",
    image: "/pigment.webp",
    icon: <Feather />,
    color: "from-sky-500/20 to-sky-500/5",
    iconColor: "text-sky-400"
  },
  {
    id: "tech-02",
    title: "Silicone Prints",
    desc: "The industry standard. Ink sits on top of the fabric, offering vibrant, opaque colors.",
    image: "/silicone.webp",
    icon: <Droplets />,
    color: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-400"
  },
  {
    id: "tech-03",
    title: "High Build / Puff",
    desc: "Ink rises during curing to create a 3D relief texture. Adds dimension to branding.",
    image: "/puff print.webp",
    icon: <Maximize />,
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400"
  },
  {
    id: "tech-04",
    title: "Foil & Metallic",
    desc: "Heat-pressed foil sheets create a mirror-like shiny finish. Ideal for fashion wear.",
    image: "/foil & metal.webp",
    icon: <Zap />,
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-400"
  },
  {
    id: "tech-05",
    title: "Glitter & Shimmer",
    desc: "Suspended metallic flakes in clear base ink. Catches light for a sparkling effect.",
    image: "/'glitter.webp",
    icon: <Sparkles />,
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-400"
  },
  {
    id: "tech-06",
    title: "Flock Prints",
    desc: "Velvet-like texture created by adhering small fibers to the ink surface.",
    image: "/flock.webp",
    icon: <Layers />,
    color: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-400"
  },
];

// --- DATA FROM PDF: TRANSFER SYSTEMS ---
const transfers = [
  "Rubber Hot Split",
  "Pigment Prints",
  "Flock Transfers",
  "Foil Transfers",
  "Crystal & Metallic"
];

const StatBar = ({ label, value, color, delay }: { label: string, value: number, color: string, delay: number }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <div className="flex justify-between text-sm mb-2 font-medium tracking-wide">
        <span className="text-slate-300">{label}</span>
        <span className="text-white font-bold">{value}%</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div 
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default function TechniquesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  return (
    <main ref={containerRef} className="bg-slate-950 min-h-screen relative overflow-hidden">
      
      {/* ✅ NEW: Techniques Mesh Background */}
      <TechniquesMeshBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <Image
            src="/techni.webp"
            alt="Ink Patterns"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 mb-8 backdrop-blur-sm mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <Layers className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
                Print Technology
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9]">
              MASTERING THE <br />
              <motion.span 
                className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-violet-400"
                style={{ backgroundSize: "300% 300%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                ART OF INK.
              </motion.span>
            </h1>
            
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              From water-based eco-inks to Silicone prints, we utilize print techniques that ensure the best quality output for your brand.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-sky-500/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-sky-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* --- INK COMPOSITION CHART  --- */}
      <section className="py-24 bg-linear-to-b from-slate-950 via-slate-900/50 to-slate-950 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-500/30">
                  <PieIcon className="text-sky-400" size={24} />
                </div>
                <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">Technical Breakdown</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                What Goes Into <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">
                  Our Production?
                </span>
              </h2>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                We maintain a precise balance of ink technologies to cater to diverse fashion needs. Our production is dominated by eco-friendly water-based and rubber inks, ensuring softness and sustainability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div
                  className="p-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-emerald-500/30 flex-1"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      <CheckCircle className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Chemical Free</div>
                      <div className="text-slate-500 text-sm">Free of hazardous chemicals</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="p-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-sky-500/30 flex-1"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/30">
                      <Sparkles className="text-sky-400" size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg mb-1">Eco-Friendly</div>
                      <div className="text-slate-500 text-sm">50% water-based inks</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Data Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-violet-500/10 rounded-3xl blur-xl" />
              <div className="relative bg-slate-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl shadow-sky-500/5">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                  <div className="w-3 h-8 bg-linear-to-b from-sky-500 to-violet-500 rounded-full" />
                  <h3 className="text-white font-bold text-2xl">
                    Ink Usage Distribution
                  </h3>
                </div>
                
                <div>
                  {inkStats.map((stat, i) => (
                    <StatBar 
                      key={i} 
                      label={stat.label} 
                      value={stat.value} 
                      color={stat.color} 
                      delay={i * 0.1} 
                    />
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-slate-500 text-sm font-light">
                    Based on monthly consumption analysis
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- TECHNIQUES SHOWCASE --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Print Techniques</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
              Explore our specialized capabilities that bring creativity to life on fabric.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techniques.map((tech, i) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Background Glow - Fixed Gradient */}
                <div className={`absolute inset-0 bg-linear-to-br ${tech.color} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-sky-500/30 transition-all duration-500 h-full flex flex-col">
                  
                  {/* Image */}
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image 
                      src={tech.image} 
                      alt={tech.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay - Fixed Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 ${tech.iconColor}`}>
                        {tech.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 font-light">
                      {tech.desc}
                    </p>
                    
                    {/* Action Footer */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                        Specialized
                      </span>
                      <motion.button 
                        className="p-2 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSFER SECTION --- */}
      <section className="py-24 bg-linear-to-b from-slate-950 via-slate-900/50 to-slate-950 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="text-violet-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-violet-400 uppercase">
                Advanced Solutions
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Heat Transfer <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Systems</span>
            </h2>
            
            <p className="text-slate-500 max-w-2xl mx-auto mb-12 text-lg font-light">
              State-of-the-art transfer technologies for precise and durable applications.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {transfers.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-slate-900/60 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full text-slate-400 hover:text-white hover:border-sky-500/50 transition-all duration-300 cursor-default group-hover:bg-slate-800/40">
                  {item}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div 
            className="mt-20 p-8 bg-linear-to-r from-slate-900 to-slate-950 rounded-3xl border border-white/10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4 justify-center">
              <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-500/30">
                <CheckCircle className="text-sky-400" size={20} />
              </div>
              <h4 className="text-white font-bold text-lg">Quality Assurance</h4>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              All transfer processes undergo rigorous quality checks to ensure durability, color fastness, and precise application. Our transfer systems are compatible with various fabrics and meet international quality standards.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}