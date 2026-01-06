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

/* ------------------------------------------------------------------ */
/* REUSED OVAL HEX MESH (For Top-Right Corner)                       */
/* ------------------------------------------------------------------ */

const OvalHexMesh = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.05, opacity: 0.8 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black 30%, transparent 70%)"
        }}
      >
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh-stats" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
              <path d="M15 0L28 7.5V22.5L15 30L2 22.5V7.5L15 0Z" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="15" cy="15" r="1.5" fill="#38bdf8" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-mesh-stats)" />
        </svg>
      </motion.div>
      <div 
        className="absolute inset-0 bg-sky-500/5 blur-[100px]" 
        style={{
          maskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 40% at 50% 50%, black 40%, transparent 80%)"
        }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* DOT COMPONENT (Updated with Lower Opacity)                        */
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
  // UPDATED: Reduced max opacity from 1 to 0.6
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
        // UPDATED: Reduced shadow opacity from 0.55 to 0.3
        boxShadow: `0 0 ${dot.size * 2}px rgba(56,189,248,0.3)`,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* SCROLL-DRIVEN S-CURVE BACKGROUND                                   */
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

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-10 overflow-hidden border-y border-white/5"
    >
      {/* 1. MESH OVAL (Top Right Corner) */}
      {/* Positioned absolute top/right, slightly shifted to act as an accent */}
      <div className="absolute -top-1/4 -right-10 w-200 h-150 opacity-60 pointer-events-none z-0">
         <OvalHexMesh />
      </div>

      {/* 2. Scroll-driven dotted S-curve */}
      <SCurveDotsBackground progress={scrollYProgress} />

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-slate-950 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent z-10" />

      <motion.div
        className="container mx-auto px-6 md:px-12 relative z-20"
        style={{ y, opacity }}
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