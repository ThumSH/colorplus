"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Plus,
  Factory,
  Maximize,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

// --- REMOVED OLD MESH IMPORT ---
// import ApparelMesh_stats from "@/components/ui/ApparelMesh_stats";

/* ------------------------------------------------------------------ */
/* NEW COMPONENT: MESH PATCH (Oval/Dot Structure)                     */
/* ------------------------------------------------------------------ */

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
  const patternId = `meshPattern-stats-${idSuffix}`;

  return (
    <div
      className={`absolute pointer-events-none ${className} will-change-transform`}
      style={{
        transform: `rotate(${rotate}deg)`,
        // Radial mask to fade edges
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-sky-500/10 blur-[50px]" />

      <svg className="w-full h-full">
        <defs>
          {/* THE "MICRO" OVAL PATTERN */}
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="transparent" />
            <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#38bdf8" opacity="0.3" />
            <ellipse cx="9" cy="9" rx="1.5" ry="2.5" fill="#38bdf8" opacity="0.3" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CARD MESH (Preserved)                                              */
/* ------------------------------------------------------------------ */

const CardMesh = ({ idSuffix }: { idSuffix: string | number }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`card-mesh-${idSuffix}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="12" cy="12" r="1" fill="#38bdf8" fillOpacity="0.8" />
          </pattern>
          <mask id={`card-mask-${idSuffix}`}>
            <radialGradient id={`card-grad-${idSuffix}`} cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <rect width="100%" height="100%" fill={`url(#card-grad-${idSuffix})`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#card-mesh-${idSuffix})`} mask={`url(#card-mask-${idSuffix})`} />
      </svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* DOT COMPONENT (Preserved - Ink Drops)                              */
/* ------------------------------------------------------------------ */

type CurveDot = {
  t: number;
  x: number;
  y: number;
  size: number;
};

type DotProps = {
  dot: CurveDot;
  progress: MotionValue<number>;
};

const SCurveDot = ({ dot, progress }: DotProps) => {
  const opacity = useTransform(
    progress,
    [dot.t - 0.08, dot.t],
    [0, 0.6] 
  );

  const scale = useTransform(
    progress,
    [dot.t - 0.08, dot.t],
    [0.3, 1]
  );

  return (
    <motion.div
      className="absolute rounded-full bg-sky-400"
      style={{
        left: `${dot.x}%`,
        top: `${dot.y}%`,
        width: dot.size,
        height: dot.size,
        opacity,
        scale,
        transform: "translate(-50%, -50%)",
        boxShadow: `0 0 ${dot.size * 2}px rgba(56,189,248,0.3)`,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* SCROLL-DRIVEN S-CURVE BACKGROUND (Preserved - Ink Drops)           */
/* ------------------------------------------------------------------ */

const SCurveDotsBackground = ({
  progress,
}: {
  progress: MotionValue<number>;
}) => {
  const dots = useMemo<CurveDot[]>(() => {
    const totalDots = 26;

    return Array.from({ length: totalDots }).map((_, i) => {
      const t = i / (totalDots - 1);
      const x = -10 + t * 120;
      const baseY = -10 + t * 120;
      const sway = Math.sin(t * Math.PI * 2) * 18;
      const y = baseY + sway;
      const size = 5 + Math.sin(t * Math.PI) * 6;

      return { t, x, y, size };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {dots.map((dot, i) => (
        <SCurveDot key={i} dot={dot} progress={progress} />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* STATS DATA                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  {
    id: 1,
    label: "Monthly Capacity",
    value: 500,
    suffix: "k+",
    icon: Factory,
  },
  {
    id: 2,
    label: "Sq. Ft. Facility",
    value: 10000,
    suffix: "+",
    icon: Maximize,
  },
  {
    id: 3,
    label: "Global Brands Served",
    value: 15,
    suffix: "+",
    icon: Globe,
  },
  {
    id: 4,
    label: "Years of Excellence",
    value: 16,
    suffix: "+",
    icon: Award,
  },
];

/* ------------------------------------------------------------------ */
/* COUNTER                                                            */
/* ------------------------------------------------------------------ */

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 60,
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span className="flex items-baseline gap-1">
      <span ref={ref} className="tabular-nums tracking-tight">0</span>
      <span>{suffix}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-10 overflow-hidden border-y border-white/5"
    >
      {/* 1. MESH OVAL (Top Right Corner - REPLACED) */}
      <div className="absolute -top-1/4 -right-10 w-200 h-150 opacity-80 pointer-events-none z-0">
         <MeshPatch idSuffix="stats-bg" className="w-full h-full" rotate={-15} />
      </div>

      {/* 2. Scroll-driven dotted S-curve (Ink Drops - PRESERVED) */}
      <SCurveDotsBackground progress={scrollYProgress} />

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-slate-950 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-10" />

      <motion.div
        className="container mx-auto px-6 md:px-12 relative z-20"
      >
        {/* Header */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="text-sky-400 w-4 h-4" />
            <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
              Impact Metrics
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
            Scale and <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-200 to-indigo-400">
              Reliability.
            </span>
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-350 mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="group relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-sky-500/50 transition-all duration-500 min-h-65 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Mesh Design Inside Cards (Preserved) */}
                <CardMesh idSuffix={stat.id} />

                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-sky-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Plus className="text-sky-500/50 w-4 h-4" />
                </div>

                <div className="relative z-10 mt-auto">
                  <p className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-widest group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}