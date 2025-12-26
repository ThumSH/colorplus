"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform,Variants } from "framer-motion";
import { Target, Lightbulb, Users, ShieldCheck, TrendingUp, Globe, Factory, Clock } from "lucide-react";
import Image from "next/image";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- DATA FROM PDF ---
const values = [
  {
    title: "Designing",
    desc: "We offer unique screen printing solutions and creative ideas to add value to your products.",
    icon: Lightbulb,
    color: "text-yellow-400",
    border: "group-hover:border-yellow-400/50"
  },
  {
    title: "Competitive Pricing",
    desc: "Ensuring costs are kept to a bare minimum while offering superlative quality.",
    icon: TrendingUp,
    color: "text-green-400",
    border: "group-hover:border-green-400/50"
  },
  {
    title: "Quality Control",
    desc: "Rigorous standards from ink mixing to finishing, ensuring export-grade output.",
    icon: ShieldCheck,
    color: "text-blue-400",
    border: "group-hover:border-blue-400/50"
  },
  {
    title: "Customer Service",
    desc: "Superlative service that builds long-term partnerships with global brands.",
    icon: Users,
    color: "text-red-400",
    border: "group-hover:border-red-400/50"
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Colour Plus Factory"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-gradient(to-to-b from-[#050505]/30 via-[#050505]/60 to-[#050505]" />
        </motion.div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-gray-300 mb-6 backdrop-blur-md">
              Established 2009
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              SCREEN PRINTING <br />
              <span className="text-transparent bg-clip-text bg-linear-gradientto-r from-blue-400 to-emerald-400">
                AT ITS FINEST.
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Colour Plus Printing Systems (Pvt) Ltd is a premier textile printer in Sri Lanka, offering unique solutions and value-added services to the global fashion industry.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- VISION & MISSION [cite: 13-17] --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#121212] p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={120} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Target className="text-blue-500" />
                Our Mission
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To achieve and produce <span className="text-white font-medium">superlative results</span> in screen printing solutions by utilizing and employing resources that are par excellence.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#121212] p-10 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Lightbulb size={120} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Lightbulb className="text-emerald-500" />
                Our Vision
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To offer the best when it comes to <span className="text-white font-medium">exceptional quality</span> in the screen print industry.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- OPERATIONAL EXCELLENCE GRID [cite: 54-66, 141-142] --- */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Why Choose Us?</h2>
            <p className="text-gray-500">Built on a foundation of capacity, compliance, and quality.</p>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
             {[
               { label: "Factory Area", value: "7,000", suffix: "sq ft", icon: Factory },
               { label: "Monthly Output", value: "300k", suffix: "pcs", icon: TrendingUp },
               { label: "Workforce", value: "50+", suffix: "Staff", icon: Users },
               { label: "Established", value: "2009", suffix: "", icon: Clock },
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 className="p-6 bg-[#151515] rounded-xl text-center border border-white/5"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
               >
                 <stat.icon className="mx-auto mb-3 text-gray-500" size={24} />
                 <div className="text-3xl font-bold text-white mb-1">{stat.value}<span className="text-sm text-gray-500 ml-1">{stat.suffix}</span></div>
                 <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
               </motion.div>
             ))}
          </div>

          {/* Values Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((val, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`group bg-[#121212] p-8 rounded-xl border border-white/5 ${val.border} transition-colors duration-300`}
              >
                <div className={`mb-6 ${val.color} bg-white/5 w-fit p-3 rounded-lg`}>
                  <val.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{val.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- GLOBAL REACH & SAFETY [cite: 23-24, 65] --- */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
         
         <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                 Global Standards. <br/>
                 <span className="text-gray-500">Local Excellence.</span>
               </h2>
               <div className="space-y-6 text-gray-400 leading-relaxed">
                 <p>
                   Established in 2009, Colour Plus Printing Systems has grown into a key exporter, serving markets in the <strong>USA, UK, Italy, and the Middle East</strong>.
                 </p>
                 <p>
                   We prioritize safety and sustainability. All our inks are imported from reputed suppliers and are <strong>free of hazardous chemicals</strong>, ensuring compliance with strict international safety regulations.
                 </p>
                 <p>
                   To guarantee uninterrupted production, we maintain a <strong>four-month rolling stock</strong> of all raw materials in-house.
                 </p>
               </div>
            </motion.div>

            <motion.div 
              className="w-full md:w-1/2 relative h-100 rounded-2xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
               <Image 
                 src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
                 alt="Global Logistics"
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center">
                    <Globe size={64} className="text-white mx-auto mb-4 opacity-80" />
                    <span className="text-white font-bold tracking-widest uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                      Exporting Worldwide
                    </span>
                  </div>
               </div>
            </motion.div>

         </div>
      </section>

    </main>
  );
}