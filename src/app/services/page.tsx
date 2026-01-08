"use client";

import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Layers, Palette, Zap, Sparkles, Feather, Maximize, Droplets, Scissors, Globe, CheckCircle2, LucideIcon } from "lucide-react";
import Image from "next/image";

// --- 1. MESH BACKGROUND COMPONENT (Consistent with About Page) ---
const MeshBackgroundComponent = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none mix-blend-screen">
      {/* Radial gradient mask */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--color-slate-950)_90%)]" />

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex-mesh-pattern-services" // Unique ID to avoid conflicts if pages transition
            x="0"
            y="0"
            width="56"
            height="96"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.2)"
            className="animate-mesh-drift"
          >
            <path
              d="M28 0 L56 16 V48 L28 64 L0 48 V16 Z"
              fill="none"
              className="text-sky-500/25"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M28 48 L56 64 V96 L28 112 L0 96 V64 Z"
              fill="none"
              className="text-sky-500/25"
              stroke="currentColor"
              strokeWidth="0.5"
              transform="translate(28, 48)" 
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh-pattern-services)" />
      </svg>
    </div>
  );
};

const MeshBackground = React.memo(MeshBackgroundComponent);
MeshBackground.displayName = "MeshBackground";

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
      
      {/* Background Animation - Replaced Dots with Mesh */}
      <MeshBackground />

      {/* --- HERO HEADER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1766191327403-ac1f4947e8f8?q=80&w=1170&auto=format&fit=crop"
          alt="Screen printing machine detail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />

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
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- VALUE ADDED SERVICES --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 text-center">
          
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
                className="p-10 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-sky-500/40 transition-all group hover:-translate-y-2"
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