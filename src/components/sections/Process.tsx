"use client";

import { motion } from "framer-motion";
import { FileText, PenTool, Printer, PackageCheck } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Request Quote",
    desc: "Send us your vector artwork and garment preferences. We reply with a detailed estimate within 24h.",
    icon: <FileText size={24} />,
  },
  {
    id: 2,
    title: "Digital Proof",
    desc: "We create a high-fidelity mockup for approval. Nothing gets printed until you are 100% satisfied.",
    icon: <PenTool size={24} />,
  },
  {
    id: 3,
    title: "Production",
    desc: "Our automatic presses run your order with precision alignment, consistent ink deposit, and proper curing.",
    icon: <Printer size={24} />,
  },
  {
    id: 4,
    title: "Quality Check & Ship",
    desc: "Every single garment is inspected for defects, expertly folded, boxed, and shipped directly to you.",
    icon: <PackageCheck size={24} />,
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#121212] py-24 relative overflow-hidden border-t border-white/5">
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* --- 1. HEADER --- */}
        <div className="text-center mb-12">
          <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            HOW WE WORK
          </h2>
        </div>

        {/* --- 2. NEW INTERMEDIATE IMAGE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-75 md:h-100 rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl"
        >
          {/* Cinematic Process Image */}
          <Image 
            src="https://images.unsplash.com/photo-1544013679-25117c6fab34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNjcmVlbiUyMHByaW50aW5nfGVufDB8fDB8fHww"
            alt="Industrial Screen Printing Workflow"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          
          {/* Dark Overlay for mood */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Optional: Subtle connecting line animation overlay */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
        </motion.div>


        {/* --- 3. STEPS GRID (Matching your screenshot) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              {/* Icon Bubble */}
              <div className="w-16 h-16 bg-[#1a1a1a] border border-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-6 group-hover:border-red-600 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                  {step.id}. {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}