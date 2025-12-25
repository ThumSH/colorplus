"use client";

import { motion, useInView } from "framer-motion";
import { Leaf, Globe, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

// --- DATA FROM PROFILE  ---
const inkData = [
  { label: "Water Base / Rubber", percentage: 50, color: "bg-blue-500" },
  { label: "Plastisol", percentage: 20, color: "bg-red-500" },
  { label: "Glitter", percentage: 10, color: "bg-purple-500" },
  { label: "Specialty (Foil/Flock)", percentage: 20, color: "bg-emerald-500" }, // Aggregated small % for cleaner UI
];

// --- FEATURES FROM PROFILE [cite: 24, 65, 66] ---
const features = [
  {
    id: 1,
    title: "Eco-Friendly Inks",
    desc: "All inks are free of hazardous chemicals and imported from reputed suppliers.",
    icon: <Leaf className="text-emerald-400" size={24} />,
  },
  {
    id: 2,
    title: "Global Export Standard",
    desc: "Trusted by brands in the USA, UK, Italy, and the Middle East.",
    icon: <Globe className="text-blue-400" size={24} />,
  },
  {
    id: 3,
    title: "Supply Chain Security",
    desc: "We maintain a guaranteed 4-month stock of raw materials at all times.",
    icon: <Database className="text-amber-400" size={24} />,
  },
];

// --- ANIMATED BAR COMPONENT ---
const SkillBar = ({ label, percentage, color, delay }: { label: string, percentage: number, color: string, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Small timeout to ensure smoother start
      setTimeout(() => setWidth(percentage), delay * 1000); 
    }
  }, [isInView, percentage, delay]);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium text-sm tracking-wide">{label}</span>
        <span className="text-gray-400 text-sm font-mono">{width}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function TechSpecs() {
  return (
    <section className="bg-[#0a0a0a] py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: TEXT & FEATURES */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Technical Mastery
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Quality that meets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  International Standards.
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                In todays competitive world, we prioritize value-added services. From chemical-free safety to supply chain reliability, we are built for the global market [cite: 60-65].
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="flex flex-col gap-6">
              {features.map((item, i) => (
                <motion.div 
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  <div className="mt-1 bg-white/5 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: CHART VISUALIZATION */}
          <div className="relative">
            {/* Glassmorphic Card */}
            <motion.div 
              className="bg-[#121212] border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Production Composition</h3>
                  <p className="text-gray-500 text-sm">Monthly Output Distribution [cite: 69]</p>
                </div>
                <ShieldCheck className="text-white/20" size={48} />
              </div>

              {/* Data Bars */}
              <div className="space-y-2">
                {inkData.map((data, index) => (
                  <SkillBar 
                    key={index}
                    label={data.label}
                    percentage={data.percentage}
                    color={data.color}
                    delay={index * 0.2}
                  />
                ))}
              </div>

              {/* Bottom Quote/Badge */}
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
                 <CheckCircle2 className="text-green-500" />
                 <p className="text-gray-400 text-sm">
                   Certified safe & hazardous-chemical free inks.
                 </p>
              </div>
            </motion.div>

            {/* Decorative Elements behind card */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -z-0" />
          </div>

        </div>
      </div>
    </section>
  );
}