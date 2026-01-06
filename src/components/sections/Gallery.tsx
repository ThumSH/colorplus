"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Droplets, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

// --- Types ---
interface Project {
  id: number;
  client: string;
  desc: string;
  image: string;
  year: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    client: "Calvin Klein",
    desc: "Premium tactile prints with sharp edges, exceptional durability, and vibrant color retention.",
    image: "/19.webp",
    year: "2024",
    tags: ["Tactile", "Durability", "Fashion"],
  },
  {
    id: 2,
    client: "Eddie Bauer",
    desc: "Breathable water-based inks perfect for outdoor apparel with eco-friendly performance standards.",
    image: "/21.webp",
    year: "2023",
    tags: ["Eco-Ink", "Outdoor", "Soft-Feel"],
  },
  {
    id: 3,
    client: "LILLY",
    desc: "Eye-catching reflective finishes for high-end streetwear utilizing premium heat-transfer foils.",
    image: "/lil.webp",
    year: "2023",
    tags: ["Reflective", "Premium", "Transfer"],
  },
  {
    id: 4,
    client: "Hugo Boss",
    desc: "Sophisticated, sustainable pigment prints that combine luxury aesthetics with eco-conscious production.",
    image: "/boos.webp",
    year: "2024",
    tags: ["Sustainable", "Luxury", "Pigment"],
  },
];

// -------------------------------
// 1) MESH PATCH (With Blurred Edges)
// -------------------------------
function MeshPatch({
  idSuffix,
  className = "",
  opacity = 0.95,
  rotate = 0,
}: {
  idSuffix: string | number;
  className?: string;
  opacity?: number;
  rotate?: number;
}) {
  const patternId = `meshPattern-${idSuffix}`;
  const gradId = `meshGrad-${idSuffix}`;
  const innerGlowId = `innerGlow-${idSuffix}`;

  return (
    <div
      className={`absolute pointer-events-none ${className} will-change-transform`}
      style={{
        transform: `rotate(${rotate}deg)`,
        // 1. Fade the edges with a mask
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        // 2. Blur the structure slightly for that soft look
        filter: "blur(2px)", 
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-sky-500/10 blur-[50px]" />

      <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="45%" stopColor="#0ea5e9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.55" />
          </linearGradient>

          <pattern id={patternId} x="0" y="0" width="48" height="42" patternUnits="userSpaceOnUse">
            <path
              d="M24 2 L40 11 V31 L24 40 L8 31 V11 Z"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="1"
              strokeOpacity="0.55"
            />
            <circle cx="24" cy="21" r="1.6" fill="#38bdf8" opacity="0.35" />
          </pattern>

          <radialGradient id={innerGlowId} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g opacity="1">
          <rect width="300" height="300" fill={`url(#${patternId})`} />
          <rect width="300" height="300" fill={`url(#${innerGlowId})`} />
        </g>
      </svg>
    </div>
  );
}

function GalleryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-indigo-950/15 to-slate-950" />

      {/* Ambient blobs */}
      <div className="absolute -top-[18%] left-[8%] w-[58%] h-[58%] bg-sky-900/10 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute top-[22%] -right-[14%] w-[58%] h-[58%] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute -bottom-[22%] left-[22%] w-[66%] h-[66%] bg-cyan-900/10 blur-[100px] rounded-full mix-blend-screen" />

      {/* Mesh patches (Now with blurred edges) */}
      <MeshPatch idSuffix="bg-1" className="top-10 left-6 w-90 h-80" opacity={0.92} rotate={-10} />
      <MeshPatch idSuffix="bg-2" className="top-20 right-8 w-90 h-90" opacity={0.7} rotate={18} />
      <MeshPatch idSuffix="bg-3" className="top-[30%] left-[34%] w-105 h-105" opacity={0.85} rotate={6} />
      <MeshPatch idSuffix="bg-4" className="top-[50%] -left-28 w-115 h-115" opacity={0.5} rotate={-20} />
      <MeshPatch idSuffix="bg-5" className="top-[55%] right-[4%] w-105 h-105" opacity={0.48} rotate={24} />
      <MeshPatch idSuffix="bg-6" className="bottom-24 left-10 w-95 h-95" opacity={0.58} rotate={12} />
      <MeshPatch idSuffix="bg-7" className="bottom-10 right-6 w-85 h-85" opacity={0.62} rotate={-14} />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/55" />
    </div>
  );
}

// -------------------------------
// 2) GALLERY ITEM (Increased Size)
// -------------------------------
const GalleryItem = React.memo(({ item, index }: { item: Project; index: number }) => {
  const isReversed = index % 2 !== 0;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, bounce: 0 });
  const y = useTransform(smoothY, [0, 1], [-25, 25]);
  const scale = useTransform(smoothY, [0, 1], [1.05, 1]);

  return (
    <div ref={containerRef} className="relative z-10 py-16 md:py-24 group">
      <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
        
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 relative group z-10"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* INCREASED HEIGHT HERE: h-[700px] for Desktop */}
          <div className="relative h-100 md:h-137.5 lg:h-175 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-black/55 to-transparent" />
            </div>

            {/* Tech Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-sky-500/30 rounded-tl-lg z-20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-sky-500/30 rounded-tr-lg z-20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-sky-500/30 rounded-bl-lg z-20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-sky-500/30 rounded-br-lg z-20" />

            {/* Label */}
            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <div className="bg-slate-950/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-sky-300">
                CASE_STUDY // 0{index + 1}
              </div>
            </div>

            {/* Parallax Image */}
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full will-change-transform">
               <Image
                src={item.image}
                alt={item.client}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </motion.div>

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 shadow-[0_0_0_1px_rgba(56,189,248,0.28),0_0_40px_rgba(56,189,248,0.16)]" />
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          className={`w-full lg:w-1/2 relative z-20 ${isReversed ? "lg:-mr-20" : "lg:-ml-20"}`}
          initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="relative bg-slate-900/55 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden hover:border-sky-500/30 transition-colors duration-500">
            
            {/* Glow Blob */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-sky-500/10 blur-[80px] rounded-full" />

            {/* Corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sky-500/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sky-500/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sky-500/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sky-500/20" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                 <span className="h-px w-8 bg-white/10" />
                 <span className="text-slate-500 text-xs font-bold tracking-widest flex items-center gap-1">
                    <Calendar size={12} /> {item.year}
                 </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-white mb-5 tracking-tighter uppercase leading-[0.9]">
                {item.client}
              </h3>

              <p className="text-slate-300/90 text-sm md:text-base leading-relaxed font-light mb-8">{item.desc}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-white/5 px-3 py-1 rounded-full bg-white/5">
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-slate-400 group-hover:text-sky-300 transition-colors">
                View case details <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
GalleryItem.displayName = "GalleryItem";

// -------------------------------
// 3) MAIN COMPONENT
// -------------------------------
export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-24 relative overflow-hidden">
      <GalleryBackground />

      {/* Subtle vertical “rail” */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/8 to-transparent pointer-events-none z-1" />

      {/* Header */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-white/10 mb-6 backdrop-blur-md"
        >
          <Droplets className="text-sky-400" size={16} />
          <span className="text-sky-300 text-[10px] font-black tracking-[0.4em] uppercase">
            Premium Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter mb-6"
        >
          SELECTED <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-indigo-400">
            WORKS.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-light"
        >
          A curated selection of A-grade screen printing projects—built for clarity, durability, and premium finish.
        </motion.p>
      </div>

      {/* Gallery items */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-20">
          {projects.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Footer button */}
         <motion.div
        className="container mx-auto px-6 mt-32 lg:mt-4 flex flex-col items-center relative z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p className="text-slate-400 text-lg font-light uppercase tracking-[0.2em] mb-8 text-center">
          More work coming soon
        </p>
        <Link href="/products" className="group relative">
          <motion.button
            className="relative bg-white/95 text-slate-950 uppercase tracking-[0.15em] text-sm font-black px-12 lg:px-16 py-7 rounded-3xl overflow-hidden shadow-2xl hover:shadow-white/20 transition-all duration-500"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255,255,255,0.25)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-sky-400 via-cyan-400 to-sky-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3 z-10">
              View Products
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
      </div>
    </section>
  );
}