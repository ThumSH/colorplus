"use client";

import React, { useRef, useState, useEffect, useMemo, useId } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Target, Lightbulb, Users, ShieldCheck, TrendingUp, Globe, Factory, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

// --- 1. Deterministic Seeded Random Helper ---
const getSeededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- 2. Floating Dots Background ---
const FloatingDotsBackgroundComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo(() => {
    const numDots = 40;
    return Array.from({ length: numDots }).map((_, i) => {
      const seed1 = i + 0.987;
      const seed2 = i + 0.654;
      return {
        x: getSeededRandom(seed1) * 100,
        y: getSeededRandom(seed2) * 100,
        size: 2 + getSeededRandom(seed1 + seed2) * 6,
        opacity: 0.2 + getSeededRandom(seed1 * 2) * 0.5,
        duration: 4 + getSeededRandom(seed2 * 2) * 5,
      };
    });
  }, []);

  if (!mounted) return <div className="absolute inset-0 z-0" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-500/30"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            filter: `blur(${dot.size / 3}px)`,
            boxShadow: `0 0 ${dot.size + 2}px rgba(14, 165, 233, ${dot.opacity * 0.8})`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

const FloatingDotsBackground = React.memo(FloatingDotsBackgroundComponent);
FloatingDotsBackground.displayName = "FloatingDotsBackground";


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
        // ✅ The Signature "Soft Fade" Mask
        maskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
        // ✅ The Signature "Soft Blur"
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

          {/* ✅ THE MICRO DOT PATTERN (Matches Footer/Gallery) */}
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

function AboutMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/50 to-slate-950" />
      
      {/* Placements using the new MeshOval */}
      <MeshOval className="top-32 -left-24 w-72 h-72" opacity={0.65} rotate={-15} />
      <MeshOval className="top-[25%] -right-32 w-96 h-96" opacity={0.5} rotate={20} />
      <MeshOval className="top-[50%] left-[5%] w-56 h-56" opacity={0.7} rotate={45} />
      <MeshOval className="bottom-40 -right-16 w-64 h-64" opacity={0.6} rotate={-10} />
      <MeshOval className="-bottom-20 -left-20 w-72 h-72" opacity={0.5} rotate={10} />
    </div>
  );
}

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- COLOR THEME CONSTANTS ---
const COLOR_THEME = {
  primary: {
    text: "text-sky-500",
    bg: "rgba(14, 165, 233, 0.1)", 
    border: "border-sky-500/30"
  },
  secondary: {
    text: "text-violet-500",
    bg: "rgba(139, 92, 246, 0.1)",
    border: "border-violet-500/30"
  },
  accent: {
    text: "text-emerald-500",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "border-emerald-500/30"
  },
  rose: {
    text: "text-rose-500",
    bg: "rgba(244, 63, 94, 0.1)",
    border: "border-rose-500/30"
  }
};

// --- DATA ---
const values = [
  {
    title: "Designing",
    desc: "We offer unique screen printing solutions and creative ideas to add value to your products.",
    icon: Lightbulb,
    colorClass: COLOR_THEME.accent.text,
    bgStyle: COLOR_THEME.accent.bg,
    borderClass: COLOR_THEME.accent.border
  },
  {
    title: "Competitive Pricing",
    desc: "Ensuring costs are kept to meet competitive advantage while offering superlative quality.",
    icon: TrendingUp,
    colorClass: COLOR_THEME.secondary.text,
    bgStyle: COLOR_THEME.secondary.bg,
    borderClass: COLOR_THEME.secondary.border
  },
  {
    title: "Quality Control",
    desc: "Export-grade standards from ink mixing to finishing, ensuring export-grade output.",
    icon: ShieldCheck,
    colorClass: COLOR_THEME.primary.text,
    bgStyle: COLOR_THEME.primary.bg,
    borderClass: COLOR_THEME.primary.border
  },
  {
    title: "Customer Service",
    desc: "Superlative service that builds long-term partnerships with global brands.",
    icon: Users,
    colorClass: COLOR_THEME.rose.text,
    bgStyle: COLOR_THEME.rose.bg,
    borderClass: COLOR_THEME.rose.border
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="bg-slate-950 min-h-screen relative overflow-hidden">
      
      {/* Background Dots */}
      <FloatingDotsBackground />
      
      {/* NEW: Mesh Background Diagrams */}
      <AboutMeshBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-900/40 to-sky-950/40 z-10" />
          <Image
            src="/io.webp" 
            alt="Colour Plus Factory"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 mb-8 backdrop-blur-sm mx-auto shadow-lg shadow-sky-500/10"
            >
              <Sparkles className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
                Established 2009
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp} 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9]"
            >
              SCREEN PRINTING <br />
              {/* Replaced CSS animation with Framer Motion span */}
              <motion.span 
                className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-violet-400"
                style={{ backgroundSize: "300% 300%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                AT ITS FINEST.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp} 
              className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light"
            >
              Colour Plus Printing Systems (Pvt) Ltd is a premier textile printer in Sri Lanka, offering unique solutions and value-added services to the global fashion industry.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-sky-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-sky-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* --- VISION & MISSION --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:border-sky-500/50 transition-all duration-500 shadow-2xl shadow-sky-500/5">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-sky-500/20 rounded-full blur-md" />
                <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-4 uppercase tracking-tight">
                  <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/30">
                    <Target className="text-sky-400" size={24} />
                  </div>
                  Our Mission
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg font-light pl-1">
                  To achieve and produce <span className="text-sky-400 font-semibold">superlative results</span> in screen printing solutions by utilizing and employing resources that are par excellence.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:border-violet-500/50 transition-all duration-500 shadow-2xl shadow-violet-500/5">
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-violet-500/20 rounded-full blur-md" />
                <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-4 uppercase tracking-tight">
                  <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/30">
                    <Lightbulb className="text-violet-400" size={24} />
                  </div>
                  Our Vision
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg font-light pl-1">
                  To offer the best when it comes to <span className="text-sky-400 font-semibold">exceptional quality</span> in the screen print industry.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- OPERATIONAL EXCELLENCE GRID --- */}
      <section className="py-24 bg-linear-to-b from-slate-950 via-slate-900/50 to-slate-950 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-bold tracking-widest text-sky-500 uppercase">
                Operational Excellence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Why <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Choose Us?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
              Built on a foundation of capacity, compliance, and quality that sets industry standards.
            </p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
             {[
               { 
                 label: "Factory Area", 
                 value: "10,000", 
                 suffix: "sq ft", 
                 icon: Factory, 
                 bgGradient: "from-sky-500/10",
                 iconBox: "bg-sky-500/20 border-sky-500/30",
                 iconColor: "text-sky-400"
               },
               { 
                 label: "Monthly Output", 
                 value: "500k", 
                 suffix: "pcs", 
                 icon: TrendingUp, 
                 bgGradient: "from-violet-500/10",
                 iconBox: "bg-violet-500/20 border-violet-500/30",
                 iconColor: "text-violet-400"
               },
               { 
                 label: "Workforce", 
                 value: "50+", 
                 suffix: "Staff", 
                 icon: Users, 
                 bgGradient: "from-emerald-500/10",
                 iconBox: "bg-emerald-500/20 border-emerald-500/30",
                 iconColor: "text-emerald-400"
               },
               { 
                 label: "Established", 
                 value: "2009", 
                 suffix: "", 
                 icon: Clock, 
                 bgGradient: "from-amber-500/10",
                 iconBox: "bg-amber-500/20 border-amber-500/30",
                 iconColor: "text-amber-400"
               },
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 className="group relative"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <div className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500`} />
                 <div className="relative p-8 bg-slate-900/60 backdrop-blur-md rounded-2xl text-center border border-white/10 hover:border-sky-500/30 transition-all duration-500">
                   <div className={`inline-flex p-4 rounded-xl ${stat.iconBox} border mb-6`}>
                     <stat.icon className={stat.iconColor} size={28} />
                   </div>
                   <div className="text-2xl font-black text-white mb-2 tracking-tight">
                     {stat.value}
                     {stat.suffix && <span className="text-sm text-slate-400 font-bold ml-1">{stat.suffix}</span>}
                   </div>
                   <div className="text-sm uppercase tracking-wider text-slate-500 font-bold">
                     {stat.label}
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>

          {/* Values Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((val, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                <div className={`relative bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:${val.borderClass} transition-all duration-500 h-full`}>
                  <div 
                    className={`mb-6 w-fit p-4 rounded-xl border ${val.borderClass}`}
                    style={{ backgroundColor: val.bgStyle }}
                  >
                    <val.icon size={24} className={val.colorClass} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform">
                    {val.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
              <motion.div
                className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-sky-400/50 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10"
                animate={{ top: ["0%", "100%"], opacity: [0, 0.5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
      </section>

      {/* --- GLOBAL REACH & SAFETY --- */}
      <section className="py-24 relative z-10">
         <div className="container mx-auto px-6 md:px-12">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <div className="mb-8">
                  <span className="text-sm font-bold tracking-widest text-sky-500 uppercase">
                    Global Presence
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                  Worldwide <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Excellence.</span>
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-sky-500/20 border border-sky-500/30 mt-1">
                      <Globe className="text-sky-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Global Network</h4>
                      <p className="text-slate-400 leading-relaxed">
                        Grown into a localized service provider, serving through local clients to global markets like
                        <strong className="text-sky-400 font-semibold"> USA, UK, Italy, and the Middle East</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 mt-1">
                      <ShieldCheck className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Safety & Compliance</h4>
                      <p className="text-slate-400 leading-relaxed">
                       We prioritize safety, consistency and sustainability. All our inks are imported from reputed suppliers and are  
                        <strong className="text-sky-400 font-semibold"> free of hazardous chemicals</strong>, 
                        ensuring compliance with strict international regulations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30 mt-1">
                      <Factory className="text-amber-400" size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">Stock Management</h4>
                      <p className="text-slate-400 leading-relaxed">
                        We maintain a 
                        <strong className="text-sky-400 font-semibold">  two months rolling stock  </strong> 
                          of all raw materials to guarantee uninterrupted production.
                      </p>
                    </div>
                  </div>
                </div>
             </motion.div>

             <motion.div 
               className="relative h-150 rounded-3xl overflow-hidden"
               initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
               whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <div className="absolute inset-0 bg-linear-to-tr from-sky-500/20 via-transparent to-violet-500/20 z-10" />
                <Image 
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
                  alt="Global Logistics"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end justify-center p-12 z-20">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                      {/* Replaced CSS animation with Framer Motion wrapper */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Globe className="text-sky-400" size={20} />
                      </motion.div>
                      <span className="text-white font-bold tracking-widest text-sm">
                        EXPORTING WORLDWIDE
                      </span>
                    </div>
                    <p className="text-slate-300 text-lg font-light">
                      Connecting quality with global fashion markets
                    </p>
                  </div>
                </div>
             </motion.div>

           </div>
         </div>
      </section>
    </main>
  );
}