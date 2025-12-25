"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants, useMotionValue, useSpring } from "framer-motion";
import { Layers, Droplets, ShieldCheck, ArrowUpRight, Sparkles, Feather, Globe, Factory, Palette } from "lucide-react";
import Image from "next/image";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80, 
    scale: 0.9,
    rotateX: 15,
    rotateY: 5
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 20,
      mass: 1.2
    } 
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

type ServiceColor = "red" | "blue" | "emerald" | "purple" | "orange";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan: string;
  color: ServiceColor;
}

// --- UPDATED DATA: BASED ON COLOUR PLUS COMPANY PROFILE ---
const services: Service[] = [
  {
    id: "01",
    title: "Versatile Print Techniques",
    description: "We utilize techniques tailored to your requirements, including Pigment, Plastisol, High Build, Puff, Gel, and Flock prints to ensure the best quality output .",
    icon: <Palette className="w-8 h-8" />,
    colSpan: "md:col-span-2", 
    color: "red" 
  },
  {
    id: "02",
    title: "Advanced Transfers",
    description: "Specialized transfer printing options including Rubber Hot Split, Sublimation, Flock, Foil, and Crystal/Metallic transfers for intricate detailing .",
    icon: <Layers className="w-8 h-8" />,
    colSpan: "md:col-span-1", 
    color: "blue" 
  },
  {
    id: "03",
    title: "Global Compliance & Safety",
    description: "We use inks free of hazardous chemicals from reputed suppliers. Our standards meet the demands of exports to the USA, UK, Italy, and the Middle East.",
    icon: <ShieldCheck className="w-8 h-8" />,
    colSpan: "md:col-span-1", 
    color: "emerald" 
  },
  {
    id: "04",
    title: "High-Volume Capacity",
    description: "Our 7,000 sq ft factory in Kottawa, staffed by 50 professionals, delivers a capacity output of 300,000 pieces per month to meet large-scale orders .",
    icon: <Factory className="w-8 h-8" />,
    colSpan: "md:col-span-2", 
    color: "purple" 
  },
  {
    id: "05",
    title: "Value-Added Services",
    description: "Beyond printing, we offer designing, quality control, and accessory sourcing. We strive to reduce your costs while maintaining superlative customer service and quality.",
    icon: <Sparkles className="w-8 h-8" />,
    colSpan: "md:col-span-3", 
    color: "orange" 
  },
];

const ServiceCard = ({ service, index }: { service: Service, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const colorClasses: Record<ServiceColor, string> = {
    red: "from-red-500/20 via-red-500/10 to-transparent hover:shadow-red-500/20",
    blue: "from-blue-500/20 via-blue-500/10 to-transparent hover:shadow-blue-500/20",
    emerald: "from-emerald-500/20 via-emerald-500/10 to-transparent hover:shadow-emerald-500/20",
    purple: "from-purple-500/20 via-purple-500/10 to-transparent hover:shadow-purple-500/20",
    orange: "from-orange-500/20 via-orange-500/10 to-transparent hover:shadow-orange-500/20",
  };

  const iconColorClasses: Record<ServiceColor, string> = {
    red: "group-hover:bg-red-500 group-hover:shadow-red-500/50",
    blue: "group-hover:bg-blue-500 group-hover:shadow-blue-500/50",
    emerald: "group-hover:bg-emerald-500 group-hover:shadow-emerald-500/50",
    purple: "group-hover:bg-purple-500 group-hover:shadow-purple-500/50",
    orange: "group-hover:bg-orange-500 group-hover:shadow-orange-500/50",
  };

  const glowColors: Record<ServiceColor, string> = {
    red: 'rgba(239, 68, 68, 0.3)',
    blue: 'rgba(59, 130, 246, 0.3)',
    emerald: 'rgba(16, 185, 129, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    orange: 'rgba(249, 115, 22, 0.3)',
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      className={`group relative bg-[#1a1a1a]/90 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-3xl ${service.colSpan} cursor-pointer overflow-hidden`}
    >
      {/* Animated gradient background - ONLY on hover */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[service.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`}
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated border glow - ONLY on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: `0 0 40px ${glowColors[service.color]}`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Scanning line effect - ONLY on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        initial={{ y: "-100%" }}
        whileHover={{ y: "100%" }}
        transition={{ duration: 1.5, ease: "linear" }}
      />

      {/* Floating particles - ONLY on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{ 
              x: `${20 + i * 20}%`, 
              y: "100%",
              opacity: 0 
            }}
            whileHover={{
              y: "-20%",
              opacity: [0, 1, 0],
              transition: {
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2
              }
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between gap-12" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start">
          <motion.div 
            className={`p-3 bg-black/40 rounded-lg border border-white/5 transition-all duration-500 ${iconColorClasses[service.color]}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {service.icon}
          </motion.div>
          
          {/* Number */}
          <motion.span 
            className="text-gray-800 font-black text-4xl select-none transition-all duration-500"
            initial={{ opacity: 0.3 }}
            whileHover={{ 
              opacity: 0.1,
              scale: 1.2,
              rotate: 5
            }}
          >
            {service.id}
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
            {service.description}
          </p>
        </motion.div>

        {/* Arrow - ONLY on hover */}
        <motion.div 
          className="absolute top-8 right-8"
          initial={{ opacity: 0, x: -10, y: 10 }}
          whileHover={{ 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowUpRight className="text-white" />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accent - ONLY on hover */}
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);
  
  // Header animations
  const headerY = useTransform(headerProgress, [0, 1], [100, -100]);
  const headerOpacity = useTransform(headerProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="services" className="bg-[#121212] relative overflow-hidden pt-12 pb-1">
      
      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#121212] to-transparent z-20 pointer-events-none" />
      
      {/* Static dots pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{ 
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Static gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(239,68,68,0.08),transparent_50%)]" />
      
      {/* Static light beams */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-red-500/10 via-transparent to-transparent opacity-30" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-30" />

      {/* --- PART 1: HEADER TEXT --- */}
      <motion.div 
        ref={headerRef}
        className="container mx-auto px-6 md:px-10 text-center mb-12 relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={textVariants}
        >
          <motion.span 
            className="inline-flex items-center gap-2 py-1 px-3 border border-red-500/30 bg-red-500/10 rounded-full text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md"
            whileHover={{ scale: 1.05, borderColor: "rgba(239, 68, 68, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles size={12} />
            Our Craft
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
            <div className="overflow-hidden">
              <motion.span
                className="inline-block pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                MASTERING
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 pb-2"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                THE PRESS.
              </motion.span>
            </div>
          </h2>
        </motion.div>
      </motion.div>

      {/* --- PART 2: THE PARALLAX IMAGE BANNER --- */}
      <div 
        ref={containerRef}
        className="relative w-full h-[600px] md:h-[800px] mb-[-150px] z-0 overflow-hidden" 
      >
        <motion.div 
          style={{ y, scale, opacity: imageOpacity }} 
          className="absolute inset-0 w-full h-full"
        >
          <video
            src="/play.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?q=80&w=1170&auto=format&fit=crop"
          />
          
          {/* Static vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-[#121212] opacity-60" />

          {/* Static scan line texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </motion.div>
      </div>

      {/* --- PART 3: SERVICES GRID --- */}
      <div className="container mx-auto px-6 md:px-12 pb-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>

    </section>
  );
}