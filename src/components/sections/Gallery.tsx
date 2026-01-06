"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Droplets } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useId } from "react";

// --- Types ---
interface Project {
  id: number;
  client: string;
  type: string;
  desc: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    client: "Calvin Klein",
    type: "High-Density Plastisol",
    desc: "Premium tactile prints with sharp edges, exceptional durability, and vibrant color retention.",
    image: "/19.webp",
  },
  {
    id: 2,
    client: "Eddie Bauer",
    type: "Vintage Soft-Hand",
    desc: "Breathable water-based inks perfect for outdoor apparel with eco-friendly performance standards.",
    image: "/21.webp",
  },
  {
    id: 3,
    client: "LILLY",
    type: "Metallic Foil Transfer",
    desc: "Eye-catching reflective finishes for high-end streetwear utilizing premium heat-transfer foils.",
    image: "/lil.webp",
  },
  {
    id: 4,
    client: "Hugo Boss",
    type: "Eco-Friendly Pigment",
    desc: "Sophisticated, sustainable pigment prints that combine luxury aesthetics with eco-conscious production.",
    image: "/boos.webp",
  },
];

// -------------------------------
// 1) MESH BACKGROUND SYSTEM (RECTANGULAR)
// (Modified to remove circular nature)
// -------------------------------
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
    // Removed rounded-full here to allow rectangular shape
    <div 
      className={`absolute pointer-events-none ${className}`} 
      style={{ 
        transform: `rotate(${rotate}deg)`,
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)"
      }}
    >
      {/* Removed rounded-full from the glow background */}
      <div className="absolute inset-0 bg-sky-500/10 blur-[60px]" />

      <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Removed Mask Definition */}

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
        </defs>

        {/* Removed mask attribute from Group */}
        <g opacity={opacity}>
          <rect width="300" height="300" fill={`url(#${patternId})`} />
          <radialGradient id={`innerGlow-${uid}`} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="300" height="300" fill={`url(#innerGlow-${uid})`} />
        </g>

        {/* Removed the <ellipse> stroke outline */}
      </svg>

      {/* Removed the outer ring div */}
    </div>
  );
}

function GalleryMeshOvals() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-indigo-950/20 to-slate-950" />

      <div className="absolute -top-[15%] left-[10%] w-[55%] h-[55%] bg-sky-900/10 blur-[140px] rounded-full mix-blend-screen" />
      <div className="absolute top-[30%] -right-[10%] w-[55%] h-[55%] bg-indigo-900/10 blur-[140px] rounded-full mix-blend-screen" />
      <div className="absolute -bottom-[20%] left-[25%] w-[60%] h-[60%] bg-cyan-900/10 blur-[160px] rounded-full mix-blend-screen" />

      {/* These will now appear as rectangular mesh patches instead of ovals */}
      <MeshOval className="top-10 left-6 w-[320px] h-80" opacity={0.62} rotate={-10} />
      <MeshOval className="top-24 right-10 w-90 h-90" opacity={0.6} rotate={18} />
      <MeshOval className="top-[28%] left-[36%] w-105 h-105" opacity={0.45} rotate={6} />

      <MeshOval className="top-[46%] -left-20 w-115 h-115" opacity={0.5} rotate={-20} />
      <MeshOval className="top-[52%] right-[6%] w-105 h-105" opacity={0.48} rotate={24} />

      <MeshOval className="bottom-24 left-10 w-95 h-95" opacity={0.58} rotate={12} />
      <MeshOval className="bottom-12 right-6 w-85 h-85" opacity={0.62} rotate={-14} />

      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/35" />
    </div>
  );
}

// -------------------------------
// 2) GALLERY ITEM (FIXED SCROLL ANIMATION)
// -------------------------------
const GalleryItem = React.memo(({ item, index }: { item: Project; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }} // ✅ starts animation earlier & smoother
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} // ✅ slower & smooth
      className="relative z-10 py-20"
    >
      {/* Background glow for each item */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-3/4 h-[120%] opacity-20 z-0 pointer-events-none ${
          isReversed ? "right-0" : "left-0"
        }`}
      >
        <div className="w-full h-full bg-sky-500/10 blur-[120px] rounded-full" />
      </div>

      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${isReversed ? "lg:flex-row-reverse" : ""}`}>
        {/* Image container */}
        <motion.div
          className="w-full lg:w-7/12 relative group z-10"
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }} // ✅ appears smoothly while scrolling
          transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-96 md:h-128 lg:h-160 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-900">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-sky-500/30 rounded-tl-lg z-20" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-sky-500/30 rounded-tr-lg z-20" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-sky-500/30 rounded-bl-lg z-20" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-sky-500/30 rounded-br-lg z-20" />

            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-sky-500/30 text-[10px] font-mono text-sky-400">
                CASE_STUDY // 0{index + 1}
              </div>
            </div>

            <Image
              src={item.image}
              alt={item.client}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='42' viewBox='0 0 48 42' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 2 L40 11 V31 L24 40 L8 31 V11 Z' fill='none' stroke='%230ea5e9' stroke-width='0.6' stroke-opacity='0.7'/%3E%3C/svg%3E")`,
                  backgroundSize: "120px 105px",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className={`w-full lg:w-5/12 relative z-20 ${isReversed ? "lg:-mr-20" : "lg:-ml-20"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sky-500/20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sky-500/20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sky-500/20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sky-500/20" />

            <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/10 blur-[60px] rounded-full" />

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
                {item.client}
              </h3>

              <p className="text-sky-400 font-mono text-xs tracking-[0.3em] uppercase mb-8 border-l-2 border-sky-500 pl-4">
                {item.type}
              </p>

              <p className="text-slate-300 text-lg leading-relaxed font-light">{item.desc}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
GalleryItem.displayName = "GalleryItem";

// -------------------------------
// 3) MAIN COMPONENT
// -------------------------------
export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-950 py-32 relative overflow-hidden">
      <GalleryMeshOvals />

      {/* Header */}
      <div className="container mx-auto px-6 relative z-10 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8 backdrop-blur-md"
        >
          <Droplets className="text-sky-400" size={16} />
          <span className="text-sky-400 text-[10px] font-black tracking-[0.4em] uppercase">
            Premium Portfolio
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.95, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8"
        >
          SELECTED <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-indigo-400">
            WORKS.
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-48 h-1 bg-linear-to-r from-transparent via-sky-500 to-transparent mx-auto rounded-full opacity-60"
        />
      </div>

      {/* Gallery items */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Footer button */}
        <motion.div
          className="mt-40 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/products" passHref>
            <motion.button
              className="relative group bg-white text-slate-950 uppercase tracking-[0.2em] text-xs font-black px-14 py-6 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-sky-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4 z-10">
                View Full Archive
                <ArrowUpRight size={18} />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}