"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Zap, Droplets, Sparkles, Feather, Maximize, CheckCircle, PieChart as PieIcon } from "lucide-react";
import Image from "next/image";

// --- DATA FROM PDF: INK COMPOSITION CHART  ---
const inkStats = [
  { label: "Water Base / Rubber", value: 50, color: "bg-blue-500" },
  { label: "Plastisol", value: 20, color: "bg-red-500" },
  { label: "Glitter", value: 10, color: "bg-purple-500" },
  { label: "Pigment", value: 5, color: "bg-emerald-500" },
  { label: "Foil", value: 5, color: "bg-yellow-500" },
  { label: "Flock", value: 5, color: "bg-pink-500" },
  { label: "Other", value: 5, color: "bg-gray-500" },
];

// --- DATA FROM PDF: PRINT TECHNIQUES [cite: 86-96] ---
const techniques = [
  {
    id: "tech-01",
    title: "Pigment Prints",
    desc: "Soaks into the fabric for a 'zero-hand' feel. Best for vintage looks on light fabrics.",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000",
    icon: <Feather />
  },
  {
    id: "tech-02",
    title: "Plastisol Prints",
    desc: "The industry standard. Ink sits on top of the fabric, offering vibrant, opaque colors.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000",
    icon: <Droplets />
  },
  {
    id: "tech-03",
    title: "High Build / Puff",
    desc: "Ink rises during curing to create a 3D relief texture. Adds dimension to branding.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000",
    icon: <Maximize />
  },
  {
    id: "tech-04",
    title: "Foil & Metallic",
    desc: "Heat-pressed foil sheets create a mirror-like shiny finish. Ideal for fashion wear.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    icon: <Zap />
  },
  {
    id: "tech-05",
    title: "Glitter & Shimmer",
    desc: "Suspended metallic flakes in clear base ink. Catches light for a sparkling effect.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000",
    icon: <Sparkles />
  },
  {
    id: "tech-06",
    title: "Flock Prints",
    desc: "Velvet-like texture created by adhering small fibers to the ink surface.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    icon: <Layers />
  },
];

// --- DATA FROM PDF: TRANSFER SYSTEMS [cite: 97-102] ---
const transfers = [
  "Rubber Hot Split",
  "Sublimation Transfers",
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
        <span className="text-gray-300">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
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
    <main ref={containerRef} className="bg-[#050505] min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-linear-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
               <Layers size={48} className="text-blue-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              MASTERING THE <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                ART OF INK.
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From water-based eco-inks to high-density plastisols, we utilize print techniques that ensure the best quality output for your brand[cite: 86].
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- INK COMPOSITION CHART  --- */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Introduction */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <PieIcon className="text-red-500" />
                 <span className="text-red-500 font-bold tracking-widest uppercase text-xs">Technical Breakdown</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                What Goes Into <br/>
                Our Production?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We maintain a precise balance of ink technologies to cater to diverse fashion needs. Our production is dominated by eco-friendly water-based and rubber inks, ensuring softness and sustainability[cite: 85].
              </p>
              
              <div className="p-6 bg-[#151515] rounded-xl border border-white/5 inline-block">
                <div className="flex items-center gap-4">
                   <CheckCircle className="text-green-500" size={32} />
                   <div>
                      <div className="text-white font-bold">Chemical Free</div>
                      <div className="text-gray-500 text-sm">Free of hazardous chemicals [cite: 65]</div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right: Data Visualization */}
            <div className="bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl relative">
              <h3 className="text-white font-bold text-xl mb-8 border-b border-white/10 pb-4">
                Ink Usage Distribution
              </h3>
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
            </div>

          </div>
        </div>
      </section>

      {/* --- TECHNIQUES SHOWCASE [cite: 86-96] --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Print Techniques</h2>
            <p className="text-gray-500">Explore our specialized capabilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techniques.map((tech, i) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-100 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <Image 
                  src={tech.image} 
                  alt={tech.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-4 bg-white/10 w-fit p-3 rounded-full backdrop-blur-md text-white border border-white/20">
                    {tech.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tech.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRANSFER SECTION [cite: 97-102] --- */}
      <section className="py-24 bg-[#080808] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-900/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Advanced Solutions
             </span>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-12">
               Heat Transfer Systems
             </h2>
           </motion.div>

           <div className="flex flex-wrap justify-center gap-4">
             {transfers.map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-[#151515] border border-white/10 px-6 py-4 rounded-full text-gray-300 hover:text-white hover:border-blue-500 transition-colors cursor-default"
               >
                 {item}
               </motion.div>
             ))}
           </div>
        </div>
      </section>

    </main>
  );
}