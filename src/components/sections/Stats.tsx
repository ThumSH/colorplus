"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";

// --- DATA ---
const stats = [
  {
    id: 1,
    label: "Active Clients & Partners",
    value: 58,
    suffix: "k+",
  },
  {
    id: 2,
    label: "Printing Projects Delivered",
    value: 3654,
    suffix: "+",
  },
  {
    id: 3,
    label: "Custom Designs Created",
    value: 8630,
    suffix: "+",
  },
  {
    id: 4,
    label: "Years of Printing Excellence",
    value: 24,
    suffix: "+",
  },
];

// --- SUB-COMPONENT: Animated Counter ---
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 75,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
    return () => unsubscribe();
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

// --- MAIN COMPONENT ---
export default function Stats() {
  return (
    <section className="bg-[#121212] py-24 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
            <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
              Company Statistics
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              OUR IMPACT <span className="text-gray-600">IN NUMBERS.</span>
            </h2>
        </div>

        {/* Grid Layout matching the reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              // Card Styling: Dark background, light border, hover glow
              className="group bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 hover:border-red-600/50 hover:-translate-y-2 transition-all duration-300 shadow-xl flex flex-col justify-between min-h-60"
            >
              
              {/* Top: Plus Icon */}
              <div className="mb-6">
                <Plus className="text-red-600 w-6 h-6 stroke-[4px]" />
              </div>

              {/* Middle: Text Content */}
              <div>
                <p className="text-gray-400 text-sm font-medium mb-3 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {stat.label}
                </p>
                
                {/* Large Number */}
                <div className="text-5xl font-black text-white mb-6">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
              </div>

              {/* Bottom: Bar Line */}
              {/* Default gray, turns red and grows slightly on hover */}
              <div className="w-12 h-1 bg-gray-800 rounded-full group-hover:w-20 group-hover:bg-red-600 transition-all duration-500" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}