"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Droplets, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";


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
    image: "/ed_b.webp",
    year: "2023",
    tags: ["Eco-Ink", "Outdoor", "Soft-Feel"],
  },
  {
    id: 3,
    client: "LILLY",
    desc: "Eye-catching reflective finishes for high-end streetwear utilizing premium heat-transfer foils.",
    image: "/liu.webp",
    year: "2023",
    tags: ["Reflective", "Premium", "Transfer"],
  },
  {
    id: 4,
    client: "Hugo Boss",
    desc: "Sophisticated, sustainable pigment prints that combine luxury aesthetics with eco-conscious production.",
    image: "/hugo_boss.webp",
    year: "2024",
    tags: ["Sustainable", "Luxury", "Pigment"],
  },
];


function MeshPatch({
  idSuffix,
  className = "",
  opacity = 0.8,
  rotate = 0,
  scale = 1,
}: {
  idSuffix: string | number;
  className?: string;
  opacity?: number;
  rotate?: number;
  scale?: number;
}) {
  const patternId = `meshPattern-${idSuffix}`;

  return (
    <div
      className={`absolute pointer-events-none ${className} will-change-transform`}
      style={{
        transform: `rotate(${rotate}deg) scale(${scale})`,
        maskImage: "radial-gradient(closest-side, black 20%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(closest-side, black 20%, transparent 90%)",
        filter: "blur(0.5px)",
        opacity,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-sky-500/10 blur-[60px]" />

      <svg className="w-full h-full">
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="transparent" />
            <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.6" />
            <ellipse cx="10" cy="10" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

function GalleryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

      <div className="absolute inset-0 bg-slate-950" />

      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-sky-950/10 to-slate-950" />

      <MeshPatch idSuffix="bg-1" className="top-0 left-[-10%] w-160 h-160" opacity={0.9} rotate={-15} />
      <MeshPatch idSuffix="bg-2" className="top-0 right-[-10%] w-160 h-160" opacity={0.8} rotate={-15} />
      <MeshPatch idSuffix="bg-3" className="top-[20%] right-[-5%] w-140 h-140" opacity={0.8} rotate={20} />
      
      <MeshPatch idSuffix="bg-4" className="top-[40%] left-[20%] w-180 h-180" opacity={0.8} rotate={0} />
      <MeshPatch idSuffix="bg-5" className="top-[60%] left-[20%] w-180 h-180" opacity={0.8} rotate={0} />
      
      <MeshPatch idSuffix="bg-6" className="bottom-[10%] left-[-5%] w-140 h-140" opacity={0.8} rotate={10} />
      <MeshPatch idSuffix="bg-7" className="bottom-0 right-[-10%] w-160 h-160" opacity={0.8} rotate={-25} />


      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/80" />
    </div>
  );
}


const GalleryItem = React.memo(({ item, index }: { item: Project; index: number }) => {
  const isReversed = index % 2 !== 0;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, bounce: 0 });
  
  const y = useTransform(smoothY, [0, 1], [-30, 30]);
  const scale = useTransform(smoothY, [0, 1], [1.01, 1]);

  return (
    <div ref={containerRef} className="relative z-10 py-20 group">
      
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[70%] h-px bg-linear-to-r from-transparent via-sky-500/10 to-transparent -z-10" />

      <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
        
        <motion.div
          className="w-full lg:w-[55%] relative z-10"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative h-100 md:h-150.5 w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 shadow-2xl group-hover:shadow-[0_0_50px_rgba(14,165,233,0.15)] transition-shadow duration-700">
            
            <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-sky-500/50 z-20" />
            <div className="absolute top-4 right-4 w-2 h-2 border-r border-t border-sky-500/50 z-20" />
            <div className="absolute bottom-4 left-4 w-2 h-2 border-l border-b border-sky-500/50 z-20" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-sky-500/50 z-20" />
            
            <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
              <span className="text-sky-400 text-[10px] font-bold tracking-widest">{item.year}</span>
            </div>
            
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full will-change-transform">
              <Image 
                src={item.image} 
                alt={item.client} 
                fill 
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                quality={90}
              />
            </motion.div>
          
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          className={`w-full lg:w-[45%] relative z-20 ${isReversed ? "lg:text-right" : "lg:text-left"}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className={`relative p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm 
            ${isReversed ? "lg:mr-auto" : "lg:ml-auto"}`}>
            
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 group-hover:text-sky-400 transition-colors duration-300">
              {item.client}
            </h3>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light mb-8 max-w-md">
              {item.desc}
            </p>
            
            <div className={`flex flex-wrap gap-2 mb-8 ${isReversed ? "justify-end" : "justify-start"}`}>
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-sky-500/5 border border-sky-500/20 text-sky-300 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className={`flex items-center gap-2 text-sky-500 text-xs font-bold uppercase tracking-widest ${isReversed ? "justify-end" : "justify-start"}`}>
              <span>Case Study</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
GalleryItem.displayName = "GalleryItem";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-24 lg:py-40 relative overflow-hidden">
      <GalleryBackground />

      {/* Center Line Decoration */}
      <div className="absolute left-1/2 top-0 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent -translate-x-1/2" />

      {/* Header */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/5 mb-8"
        >
          <Droplets className="text-sky-400" size={14} />
          <span className="text-sky-300 text-[10px] font-black tracking-[0.3em] uppercase">
            Curated Works
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]"
        >
          SELECTED <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-200 to-white">
            PROJECTS.
          </span>
        </motion.h2>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col gap-12">
          {projects.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
         <motion.div

          className="mt-24 lg:mt-10 flex flex-col items-center relative z-20"

          initial={{ opacity: 0, y: 30 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true, amount: 0.4 }}

          transition={{ duration: 0.8, delay: 0.2 }}

        >

          <p className="text-slate-400 text-sm lg:text-base font-light uppercase tracking-[0.25em] mb-20 text-center">

            More work coming soon

          </p>

         

          <Link href="/products">

            <button className="group relative flex items-center gap-3 bg-slate-900 text-white uppercase tracking-[0.2em] text-[10px] lg:text-[11px] font-black px-10 lg:px-12 py-5 lg:py-6 overflow-hidden border border-white/10 hover:border-sky-500/50 transition-colors duration-300 rounded-sm">

              <div className="absolute inset-0 bg-linear-to-r from-sky-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              <div className="relative flex items-center gap-3 z-10">

                <Printer size={15} />

                View Products

                <ArrowUpRight size={15} />

              </div>

            </button>

          </Link>

        </motion.div>
      </div>
    </section>
  );
}