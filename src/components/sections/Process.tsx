"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, PenTool, ArrowRight, Droplets, Factory, Globe } from "lucide-react";
import Image from "next/image";

// Ink Drop Indicator
const InkDrops = () => (
  <div className="flex gap-1.5">
    {[0, 0.15, 0.3].map((delay, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"
        style={{
          animationDelay: `${delay}s`,
          boxShadow: "0 0 6px rgba(14, 165, 233, 0.6)",
        }}
      />
    ))}
  </div>
);

const steps = [
  {
    id: "01",
    title: "Consultation & Sourcing",
    desc: "We start by understanding your needs and vision. Beyond printing, we offer value-added services like sourcing accessories from China & Hong Kong to complete your product line.",
    icon: <FileText size={28} />,
  },
  {
    id: "02",
    title: "In-House Design",
    desc: "Our internal design team prepares your concept with precision. We handle everything from artwork separation to color matching using using our internal experties.",
    icon: <PenTool size={28} />,
  },
  {
    id: "03",
    title: "Vertical Production",
    desc: "All operations—from mixing inks to printing and finishing—are conducted entirely within our 10,000 sq ft state-of-the-art factory in Sri Lanka.",
    icon: <Factory size={28} />,
  },
  {
    id: "04",
    title: "QC & Global Export",
    desc: "After rigorous Quality Control and safety testing, we hand over to Our customers and deliver Precisely with full compliance.",
    icon: <Globe size={28} />,
  },
];

interface StepCardProps {
  step: (typeof steps)[0];
  index: number;
  totalSteps: number;
}

const StepCard = ({ step, index, totalSteps }: StepCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col items-center text-center md:items-start md:text-left"
    >
      {/* Connecting Line (Desktop Only) with ink drops */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-8 left-8 w-full h-0.5 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-sky-400/20 to-transparent" />
          <motion.div
            className="h-full bg-linear-to-r from-sky-400 to-sky-500 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: "easeInOut" }}
          />

          {/* Ink drops along the line */}
          {[0.3, 0.6].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400"
              style={{
                left: `${pos * 100}%`,
                boxShadow: "0 0 6px rgba(14, 165, 233, 0.8)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + index * 0.2 + i * 0.2 }}
            />
          ))}
        </div>
      )}

      {/* Icon Bubble */}
      <div className="relative z-10 mb-6">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center text-sky-200/50 group-hover:text-white group-hover:border-sky-400/50 transition-all duration-300 shadow-2xl relative overflow-hidden"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          {/* Ink dot pattern on hover */}
          <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.5px,transparent_0.5px)] bg-size-[8px_8px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

          <div className="absolute inset-0 bg-linear-to-br from-sky-500/80 to-sky-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <motion.div className="relative z-10" animate={isHovered ? { scale: 1.1 } : { scale: 1 }}>
            {step.icon}
          </motion.div>
        </motion.div>

        <div className="absolute -bottom-3 -right-3 bg-[#020617] border border-white/10 text-xs font-bold text-gray-500 py-1 px-2 rounded-md group-hover:text-sky-400 group-hover:border-sky-500/50 group-hover:shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-all duration-300">
          {step.id}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xs">
        <h3 className="text-xl font-black text-white uppercase tracking-wide mb-3 flex items-center gap-2 md:justify-start justify-center group-hover:text-sky-400 transition-colors duration-300">
          {step.title}
          <motion.div animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}>
            <ArrowRight size={16} />
          </motion.div>
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
};

// --- Deterministic random (stable “random” placements) ---
const seeded = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- UPDATED: Mesh Oval Diagram (Using Micro Dots) ---
const MeshOvalDiagram = React.memo(
  ({
    size,
    left,
    top,
    rotate,
    opacity,
    idSuffix,
  }: {
    size: number;
    left: number; // percent
    top: number; // percent
    rotate: number;
    opacity: number;
    idSuffix: string | number;
  }) => {
    const gradId = `process-grad-${idSuffix}`;
    const patId = `process-pat-${idSuffix}`;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          opacity,
          // ✅ UPDATED: Softer Mask for blurred edges
          // "closest-side" ensures it fits the box perfectly.
          // Changing stops from 55%->78% to 30%->85% creates a much longer, softer fade.
          WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 85%)",
          maskImage: "radial-gradient(closest-side, black 30%, transparent 85%)",
          // ✅ UPDATED: Slightly stronger blur to soften the dot pixels
          filter: "blur(0.6px)",
        }}
        aria-hidden="true"
      >
        {/* soft glow behind the mesh */}
        <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-[80px]" />

        <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
            </linearGradient>

            {/* Micro Dots Pattern */}
            <pattern id={patId} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="100%" height="100%" fill="transparent" />
              <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.5" />
              <ellipse cx="9" cy="9" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.5" />
            </pattern>
          </defs>

          {/* Oval Shape */}
          <g>
            <ellipse cx="150" cy="150" rx="130" ry="105" fill={`url(#${patId})`} opacity="0.9" />
            <ellipse
              cx="150"
              cy="150"
              rx="130"
              ry="105"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeOpacity="0.15" // Reduced stroke opacity to blend better
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    );
  }
);
MeshOvalDiagram.displayName = "MeshOvalDiagram";

// --- Random-ish (but stable) mesh placements across the Process section ---
const ProcessMeshDiagrams = React.memo(() => {
  const diagrams = useMemo(() => {
    const count = 4;
    // Define zones to prevent overlap. Each zone is a [min, max] range for x and y percentages.
    const zones = [
      { x: [10, 35], y: [10, 40] },   // Top-left
      { x: [65, 90], y: [15, 45] },   // Top-right
      { x: [15, 40], y: [60, 90] },   // Bottom-left
      { x: [60, 85], y: [55, 85] },   // Bottom-right
    ];

    return Array.from({ length: count }).map((_, i) => {
      const zone = zones[i % zones.length]; // Use modulo for safety if count > zones.length

      const s1 = seeded(10.13 + i * 1.17);
      const s2 = seeded(42.77 + i * 2.03);
      const s3 = seeded(99.91 + i * 3.11);

      // Calculate position within the assigned zone to ensure they don't stack
      const leftRange = zone.x[1] - zone.x[0];
      const topRange = zone.y[1] - zone.y[0];
      const left = Number((zone.x[0] + s1 * leftRange).toFixed(4));
      const top = Number((zone.y[0] + s2 * topRange).toFixed(4));

      const size = Number((260 + s3 * 260).toFixed(2)); // 260..520
      const rotate = Number((-22 + seeded(7.77 + i * 1.9) * 44).toFixed(2)); // -22..22

      const opacity = Number((0.28 + seeded(55.5 + i * 1.6) * 0.22).toFixed(4)); // 0.28..0.50

      return { left, top, size, rotate, opacity };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
      {diagrams.map((d, idx) => (
        <MeshOvalDiagram
          key={idx}
          idSuffix={idx}
          left={d.left}
          top={d.top}
          size={d.size}
          rotate={d.rotate}
          opacity={d.opacity}
        />
      ))}
    </div>
  );
});
ProcessMeshDiagrams.displayName = "ProcessMeshDiagrams";


// --- UPDATED BACKGROUND: Replaced grid with dots ---
const ProcessMeshBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none">
      {/* 1. Base Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-[#0a1020] to-slate-950" />

      {/* 2. Floating Mesh Diagrams (Now with dots) */}
      <ProcessMeshDiagrams />

      {/* 3. UPDATED: Micro Dot Pattern (Replacing the old square Grid) */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="process-bg-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="100%" height="100%" fill="transparent" />
              <ellipse cx="7" cy="7" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#process-bg-dots)" />
        </svg>
      </div>

      {/* 4. Secondary Diagonal Weave (Fabric undertone) - Kept for texture depth */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, #fff 0, #fff 0.5px, transparent 0.5px, transparent 10px)
          `,
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      {/* 5. Scanning Line Animation */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-sky-400/50 to-transparent shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10"
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* 6. Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/50 to-slate-950" />
    </div>
  );
});
ProcessMeshBackground.displayName = "ProcessMeshBackground";

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(imageProgress, [0, 1], ["-10%", "10%"]);
  const imageScale = useTransform(imageProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={sectionRef} id="process" className="bg-slate-950 py-24 relative overflow-hidden">
      <ProcessMeshBackground />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <InkDrops />
            <Droplets className="text-sky-400" size={16} />
            <span className="text-sky-400 text-xs font-bold tracking-[0.25em] uppercase">THE WORKFLOW</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-cyan-500">
              Process.
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-base leading-relaxed">
            From the first consultation to global export, every step is controlled with precision and care.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-linear-to-r from-transparent via-sky-400 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.6)]" />
            <div className="h-px w-12 bg-linear-to-r from-transparent via-sky-400 to-transparent" />
          </div>
        </motion.div>

        {/* Cinematic Image */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-75 md:h-112.5 rounded-2xl overflow-hidden mb-24 border border-white/10 shadow-2xl group"
        >
          <motion.div className="absolute inset-0 w-full h-full" style={{ y: imageY, scale: imageScale }}>
            <Image
              src="https://images.unsplash.com/photo-1544013679-25117c6fab34?w=1600&auto=format&fit=crop&q=80"
              alt="Industrial Screen Printing Workflow"
              fill
              className="object-cover"
              sizes="90vw"
            />
          </motion.div>

          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}