"use client";

import React, { useRef, useId } from "react";
import { motion, Variants } from "framer-motion";
import { Layers, Palette, Zap, Sparkles, Feather, Maximize, Droplets, Scissors, Globe, CheckCircle2, LucideIcon } from "lucide-react";
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
            <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.4" />
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

const ServicesMeshBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/50 to-slate-950" />
      
      {/* Distributed Mesh Ovals */}
      <MeshOval className="top-20 -left-32 w-md h-112" opacity={0.6} rotate={-10} />
      <MeshOval className="top-[20%] -right-40 w-lg h-128" opacity={0.5} rotate={15} />
      <MeshOval className="top-[45%] left-[-10%] w-96 h-96" opacity={0.55} rotate={30} />
      <MeshOval className="top-[70%] right-[-5%] w-md h-112" opacity={0.5} rotate={-20} />
      <MeshOval className="-bottom-32 left-[20%] w-140 h-140" opacity={0.6} rotate={5} />
    </div>
  );
});
ServicesMeshBackground.displayName = "ServicesMeshBackground";

// --- DATA FROM PDF ---
const printTechniques = [
  {
    title: "Pigment Prints",
    desc: "Soft-hand feel, ideal for light-colored fabrics. Soaks into the fabric for breathable durability.",
    icon: <Feather size={32} className="text-emerald-400" />,
    color: "emerald"
  },
  {
    title: "Silicone  Prints",
    desc: "Vibrant, opaque colors with a heavier hand. The industry standard for bold, durable graphics.",
    icon: <Droplets size={32} className="text-sky-400" />,
    color: "sky"
  },
  {
    title: "High Build / Puff",
    desc: "Adds a 3D dimensional effect to designs, creating a raised texture that stands out.",
    icon: <Maximize size={32} className="text-amber-400" />,
    color: "amber"
  },
  {
    title: "Gel & Flock",
    desc: "Specialty finishes ranging from glossy, wet-look gels to soft, velvet-like flock textures.",
    icon: <Layers size={32} className="text-purple-400" />,
    color: "purple"
  },
  {
    title: "Glitter & Shimmer",
    desc: "Incorporating metallic flakes for sparkling effects that catch the light.",
    icon: <Sparkles size={32} className="text-yellow-400" />,
    color: "yellow"
  },
  {
    title: "Foil Prints",
    desc: "Heat-pressed metallic foil for a mirror-like, premium reflective finish.",
    icon: <Zap size={32} className="text-rose-400" />,
    color: "rose"
  }
];

const transferSystems = [
  "Rubber Hot Split",
  "Sublimation Transfers",
  "Flock Transfers",
  "Foil Transfers",
  "Crystal & Metallic Transfers"
];

interface ServiceItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

const valueAdded: ServiceItem[] = [
  {
    title: "In-House Designing",
    desc: "Our creative team helps visualize concepts and prepare artwork for separation.",
    icon: Palette
  },
  {
    title: "Accessory Sourcing",
    desc: "We import related accessories and other equipment sourced directly from China.",
    icon: Globe
  },
  {
    title: "Cost Engineering",
    desc: "We strive to keep costs to a competitive advantage while offering superlative quality.",
    icon: Scissors
  }
];

const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
  const containerRef = useRef(null);
  
  return (
    <main ref={containerRef} className="bg-slate-950 min-h-screen relative overflow-hidden">
      
      {/* ✅ NEW: Services Mesh Background */}
      <ServicesMeshBackground />

      {/* --- HERO HEADER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/ryo.webp"
          alt="Screen printing machine detail"
          fill
          className="object-cover"
          priority
        />
       <div className="absolute inset-0 bg-linear-to-b from-slate-900/30 to-slate-900/70" />

        {/* Adjusted globs to sit behind content but above background */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8 backdrop-blur-sm">
              <Sparkles className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
                Expert Capabilities
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
              Print <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-indigo-500">Solutions.</span>
            </h1>
            
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              We utilize techniques as per your requirement that are both affordable and ideal when it comes to ensuring the best quality output.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- PRINT TECHNIQUES GRID --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="mb-20">
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-wide">Direct Screen Printing</h2>
            <div className="h-1.5 w-24 bg-linear-to-r from-sky-500 to-indigo-500 rounded-full" />
          </div>

          <motion.div 
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {printTechniques.map((tech, i) => (
              <motion.div 
                key={i}
                variants={itemVar}
                whileHover={{ y: -8 }}
                className="group relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-sky-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br from-${tech.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-slate-950/50 rounded-2xl w-fit group-hover:bg-slate-950 transition-colors border border-white/5">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{tech.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- TRANSFER SYSTEMS --- */}
      <section className="py-24 relative overflow-hidden bg-slate-900/20 border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                Advanced <br/>
                <span className="text-sky-500">Transfer Systems.</span>
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                For complex artworks or specific fabric constraints, we offer a specialized range of heat transfer solutions designed for durability and detail.
              </p>
              
              <div className="space-y-4">
                {transferSystems.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-900/60 rounded-xl border border-white/5 hover:border-sky-500/50 transition-all group cursor-default"
                  >
                    <CheckCircle2 className="text-sky-500 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-slate-200 font-bold tracking-wide text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-125 w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image 
                src="/bn.webp"
                alt="Heat Transfer Printing"
                fill
                className="object-cover opacity-80 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
                <motion.div
                  className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-sky-400/50 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10"
                  animate={{ top: ["0%", "100%"], opacity: [0, 2, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
            

          </div>
        </div>
      </section>

      {/* --- VALUE ADDED SERVICES --- */}
{/* --- VALUE ADDED SERVICES --- */}
      {/* Added overflow-hidden so the background image doesn't bleed outside the section */}
      <section className="py-24 relative z-10 overflow-hidden">
        
        {/* --- SECTION BACKGROUND IMAGE --- */}
        {/* mix-blend-luminosity and low opacity create the "transparent/see-through" watermark effect */}
        <div className=" opacity-[1] pointer-events-none">
          <Image
            src="/pxl.webp" // Replace with your desired background image
            alt="Value Added Services"
            fill
            className="object-cover"
            sizes="90vw"
            quality={95}
          />
        </div>
        
        {/* Gradient Overlay: Fades the top and bottom edges into the slate-950 background so it blends seamlessly */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-950/60 to-slate-950 z-0 pointer-events-none" />


        {/* Added 'relative z-10' to the container so the content stays above the image and gradient */}
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Value-Added Services</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              In today&apos;s competitive world, we look for ways to increase your profit and reduce costs through intelligent engineering.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueAdded.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                // OPTIMIZATION NOTE: I removed backdrop-blur-xl here because blurring over an image background on 3 separate cards can cause scroll lag on mobile. 
                // Increased the bg opacity from 40 to 60 (bg-slate-900/60) to compensate and keep text readable!
                className="p-10 bg-slate-900/60 rounded-3xl border border-white/10 hover:border-sky-500/40 transition-all group hover:-translate-y-2 transform-gpu"
              >
                <div className="w-20 h-20 mx-auto mb-8 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <service.icon size={36} />
                </div>
                
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}