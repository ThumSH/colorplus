"use client";

import { motion } from "framer-motion";
import { Layers, Shirt, Palette, ScanLine, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Screen Printing",
    description: "The gold standard for durability and vibrancy. Perfect for bulk orders and bold designs using Plastisol or Water-based inks.",
    icon: <Layers className="w-8 h-8 text-red-500" />,
    colSpan: "md:col-span-2",
  },
  {
    id: "02",
    title: "Embroidery",
    description: "Premium textured stitching for corporate branding, caps, and polo shirts.",
    icon: <Shirt className="w-8 h-8 text-blue-500" />,
    colSpan: "md:col-span-1",
  },
  {
    id: "03",
    title: "Heat Transfer",
    description: "Ideal for complex gradients and small-batch custom runs.",
    icon: <ScanLine className="w-8 h-8 text-emerald-500" />,
    colSpan: "md:col-span-1",
  },
  {
    id: "04",
    title: "Custom Dyeing",
    description: "Bespoke fabric dyeing to match your exact brand Pantone colors.",
    icon: <Palette className="w-8 h-8 text-purple-500" />,
    colSpan: "md:col-span-2",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#121212] relative overflow-hidden pt-24">
      
      {/* --- PART 1: HEADER TEXT --- */}
      <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 border border-red-500/30 bg-red-500/10 rounded-full text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
            PRECISION IN <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">
              EVERY PRINT.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* --- PART 2: THE FULL, BRIGHT IMAGE BANNER --- */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        // The negative margin ensures the grid below overlaps it
        className="relative w-full h-125 md:h-175 mb-37.5 z-0" 
      >
        <Image 
          src="https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?q=80&w=1170&auto=format&fit=crop"
          alt="Craftsman working on intricate machine embroidery"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* --- OVERLAYS REMOVED --- */}
        {/* The dark tint and gradient fades have been deleted so the image is fully bright. */}
      </motion.div>


      {/* --- PART 3: SERVICES GRID --- */}
      {/* z-10 ensures this sits ON TOP of the bright image */}
      <div className="container mx-auto px-6 md:px-12 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              // Added '/90' opacity to background so you can slightly see the bright image behind the cards
              className={`group relative bg-[#1a1a1a]/90 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-2xl ${service.colSpan}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-black/40 rounded-lg border border-white/5 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <span className="text-gray-800 font-black text-4xl select-none group-hover:text-white/10 transition-colors">
                    {service.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>

                <div className="absolute top-8 right-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="text-white" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}