"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";
// Added specific icons for the new data points
import { Plus, TrendingUp, Factory, Maximize, Globe, Award, LucideIcon, Sparkles } from "lucide-react";

// --- UPDATED STATS DATA: BASED ON COLOUR PLUS PROFILE ---
const stats = [
  { 
    id: 1, 
    label: "Monthly Capacity", 
    value: 300, // Represents 300,000
    suffix: "k+", 
    icon: Factory, 
    color: "blue" // Blue for industrial/production
  },
  { 
    id: 2, 
    label: "Sq. Ft. Facility", 
    value: 7000, 
    suffix: "+", 
    icon: Maximize, 
    color: "emerald" // Emerald for physical space/footprint
  },
  { 
    id: 3, 
    label: "Global Brands Served", 
    value: 15, 
    suffix: "+", 
    icon: Globe, 
    color: "red" // Red for international reach/brands
  },
  { 
    id: 4, 
    label: "Years of Excellence", 
    value: 16, // 2025 - 2009
    suffix: "+", 
    icon: Award, 
    color: "purple" // Purple for prestige/history
  },
];

// --- COUNTER LOGIC (Unchanged) ---
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 60,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return (
    <span className="flex items-baseline">
      <span ref={ref} className="tabular-nums tracking-tight">
        0
      </span>
      <span>{suffix}</span>
    </span>
  );
}

// --- ANIMATION VARIANTS (Unchanged) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      stiffness: 80,
    },
  },
};

type StatColor = "red" | "blue" | "emerald" | "purple";

interface StatCardProps {
  stat: {
    id: number;
    label: string;
    value: number;
    suffix: string;
    icon: LucideIcon;
    color: string;
  };
  index: number;
}

const StatCard = ({ stat }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses: Record<
    StatColor,
    { border: string; glow: string; bg: string; text: string }
  > = {
    red: {
      border: "hover:border-cyan-500/50",
      glow: "group-hover:shadow-cyan-500/20",
      bg: "from-cyan-500/20 via-cyan-500/10 to-transparent",
      text: "text-cyan-500",
    },
    blue: {
      border: "hover:border-blue-500/50",
      glow: "group-hover:shadow-blue-500/20",
      bg: "from-blue-500/20 via-blue-500/10 to-transparent",
      text: "text-blue-500",
    },
    emerald: {
      border: "hover:border-slate-400/50",
      glow: "group-hover:shadow-slate-400/20",
      bg: "from-slate-400/20 via-slate-400/10 to-transparent",
      text: "text-slate-400",
    },
    purple: {
      border: "hover:border-gray-500/50",
      glow: "group-hover:shadow-gray-500/20",
      bg: "from-gray-500/20 via-gray-500/10 to-transparent",
      text: "text-gray-500",
    },
  };

  const colors = colorClasses[stat.color as StatColor];
  const IconComponent = stat.icon;

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`group relative bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 ${colors.border} transition-all duration-300 shadow-2xl ${colors.glow} flex flex-col justify-between min-h-60 overflow-hidden cursor-pointer`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent"
        initial={{ y: "-100%" }}
        animate={isHovered ? { y: "100%" } : { y: "-100%" }}
        transition={{ duration: 1, ease: "linear" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{
              x: `${30 + i * 30}%`,
              y: "100%",
              opacity: 0,
            }}
            animate={
              isHovered
                ? {
                    y: "-20%",
                    opacity: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 2 + i * 0.5,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Static Icons Section */}
      <div className="mb-6 relative z-10 flex items-center gap-3">
        <Plus className={`${colors.text} w-6 h-6 stroke-[4px]`} />
        <IconComponent className={`${colors.text} w-8 h-8`} />
      </div>

      <div className="relative z-10">
        <motion.p
          className="text-gray-400 text-sm font-medium mb-3 leading-relaxed group-hover:text-gray-200 transition-colors"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          {stat.label}
        </motion.p>

        <motion.div
          className="text-4xl md:text-5xl font-black text-white mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Counter value={stat.value} suffix={stat.suffix} />
        </motion.div>
      </div>

      {/* Animated progress bar */}
      <motion.div
        className="relative z-10 w-12 h-1 bg-gray-800 rounded-full overflow-hidden"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className={`h-full ${colors.text.replace("text", "bg")}`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>

      {/* Corner glow */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Trending indicator */}
      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0, rotate: -45 }}
        whileHover={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <TrendingUp className={`w-5 h-5 ${colors.text}`} />
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function Stats() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#121212] pt-12 pb-24 relative overflow-hidden"
    >
      {/* Top edge fade/blend */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-[#121212] to-transparent z-20" />

      {/* Bottom edge fade/blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#121212] to-transparent z-20" />

      {/* Large animated circles */}
      <motion.div
        className="absolute top-1/4 -left-20 w-125 h-125 rounded-full bg-cyan-500/10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-125 h-125 rounded-full bg-slate-500/10 blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Animated Plus Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
        }}
      />

      <motion.div
        className="container mx-auto px-6 md:px-12 relative z-10"
        style={{ y, opacity, scale }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-blue-500 animate-pulse" size={16} />
            <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
              Company Statistics
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
            <div className="overflow-hidden">
              <motion.span
                className="inline-block pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                OUR IMPACT
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600 pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                IN NUMBERS.
              </motion.span>
            </div>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}