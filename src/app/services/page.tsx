"use client";

import React, { useRef } from "react";
// 1. Added 'Variants' to import to fix the first error type
import { motion, Variants } from "framer-motion";
// 2. Imported 'LucideIcon' type for safer typing
import { Layers, Palette, Zap, Sparkles, Feather, Maximize, Droplets, Scissors, Globe, CheckCircle2, LucideIcon } from "lucide-react";
import Image from "next/image";

// --- DATA FROM PDF ---
const printTechniques = [
  {
    title: "Pigment Prints",
    desc: "Soft-hand feel, ideal for light-colored fabrics. Soaks into the fabric for breathable durability.",
    icon: <Feather size={32} className="text-emerald-400" />,
    color: "emerald"
  },
  {
    title: "Plastisol Prints",
    desc: "Vibrant, opaque colors with a heavier hand. The industry standard for bold, durable graphics.",
    icon: <Droplets size={32} className="text-blue-400" />,
    color: "blue"
  },
  {
    title: "High Build / Puff",
    desc: "Adds a 3D dimensional effect to designs, creating a raised texture that stands out.",
    icon: <Maximize size={32} className="text-orange-400" />,
    color: "orange"
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
    icon: <Zap size={32} className="text-blue-400" />,
    color: "blue"
  }
];

const transferSystems = [
  "Rubber Hot Split",
  "Sublimation Transfers",
  "Flock Transfers",
  "Foil Transfers",
  "Crystal & Metallic Transfers"
];

// --- FIX 2: REFACTORED VALUE ADDED SECTION ---
// We define an interface to tell TS that 'icon' is a component, not a JSX element
interface ServiceItem {
  title: string;
  desc: string;
  icon: LucideIcon; // Stores the component reference (e.g., Palette)
}

const valueAdded: ServiceItem[] = [
  {
    title: "In-House Designing",
    desc: "Our creative team helps visualize concepts and prepare artwork for separation.",
    icon: Palette // Pass the component itself, no < >
  },
  {
    title: "Accessory Sourcing",
    desc: "We supply value-added accessories sourced directly from China and Hong Kong.",
    icon: Globe
  },
  {
    title: "Cost Engineering",
    desc: "We strive to keep costs to a bare minimum while offering superlative quality.",
    icon: Scissors
  }
];

// --- FIX 1: ADDED ': Variants' TYPE ---
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
    <main ref={containerRef} className="bg-[#050505] min-h-screen">
      
      {/* --- HERO HEADER --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1766191327403-ac1f4947e8f8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Screen printing machine detail"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight"
          >
            Print <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Solutions.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl"
          >
            We utilize techniques as per your requirement that are both affordable and ideal when it comes to ensuring the best quality output.
          </motion.p>
        </div>
      </section>

      {/* --- PRINT TECHNIQUES GRID --- */}
      <section className="py-12 md:py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Direct Screen Printing</h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full" />
          </div>

          <motion.div 
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {printTechniques.map((tech, i) => (
              <motion.div 
                key={i}
                variants={itemVar}
                whileHover={{ y: -5 }}
                className="group relative bg-[#121212] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br from-${tech.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- TRANSFER SYSTEMS --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
                Advanced <br/>
                <span className="text-blue-500">Transfer Systems.</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                For complex artworks or specific fabric constraints, we offer a specialized range of heat transfer solutions.
              </p>
              
              <div className="space-y-4">
                {transferSystems.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors"
                  >
                    <CheckCircle2 className="text-blue-500" size={20} />
                    <span className="text-white font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-125 w-full bg-[#151515] rounded-2xl overflow-hidden border border-white/10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop"
                alt="Heat Transfer Printing"
                fill
                className="object-cover opacity-60 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] to-transparent" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- VALUE ADDED SERVICES --- */}
      <section className="py-24 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Value-Added Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              In today&apos;s competitive world, we look for ways to increase your profit and reduce costs.
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
                className="p-8 bg-[#121212] rounded-2xl border border-white/5 hover:border-white/20 transition-all group"
              >
                {/* FIX 2 APPLIED HERE:
                   Render the component directly from the variable.
                   No cloneElement needed. 
                */}
                <div className="w-16 h-16 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <service.icon size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
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