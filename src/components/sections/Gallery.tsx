"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// --- UPDATED DATA: BASED ON COLOUR PLUS PORTFOLIO & TECHNIQUES ---
const projects = [
  {
    id: 1,
    client: "Calvin Klein", // [cite: 27]
    type: "High-Density Plastisol", // [cite: 89, 93]
    desc: "Premium tactile prints with sharp edges and durability.",
    // Image: Minimalist/Fashion
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop",
    height: "h-[500px] md:h-[600px]",
    colSpan: "col-span-1",
  },
  {
    id: 2,
    client: "Eddie Bauer", // [cite: 26]
    type: "Vintage Soft-Hand", // [cite: 85]
    desc: "Breathable water-based inks perfect for outdoor apparel.",
    // Image: Outdoor/Lifestyle
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1069&auto=format&fit=crop",
    height: "h-[400px] md:h-[500px]",
    colSpan: "col-span-1",
  },
  {
    id: 3,
    client: "True Religion", // [cite: 30]
    type: "Metallic Foil Transfer", // [cite: 92, 101]
    desc: "Eye-catching reflective finishes for high-end streetwear.",
    // Image: Edgy/Urban
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    height: "h-[400px] md:h-[500px]",
    colSpan: "col-span-1",
  },
  {
    id: 4,
    client: "Mothercare", // [cite: 42]
    type: "Eco-Friendly Pigment", // [cite: 88]
    desc: "Chemical-free, safe prints for baby and children's wear.",
    // Image: Soft/Bright
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1064&auto=format&fit=crop",
    height: "h-[500px] md:h-[600px]",
    colSpan: "col-span-1",
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="gallery" className="bg-[#121212] py-24 relative overflow-hidden">
      
      {/* Background Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(90deg, #FFF 1px, transparent 0), linear-gradient(180deg, #FFF 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Header */}
      <motion.div 
        className="container mx-auto px-6 md:px-12 mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div>
          <motion.span 
            className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9]">
            SELECTED
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-800">
              WORKS.
            </span>
          </h2>
        </div>
        
        <motion.p 
          className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From high-density plastisols for Calvin Klein to safe, eco-friendly pigments for Mothercare. A showcase of our technical versatility.
        </motion.p>
      </motion.div>

      {/* --- ZIG-ZAG LAYOUT --- */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-24 md:gap-48">
          {projects.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>

        <Link href= "/products">
        <div className="mt-32 flex justify-center">
          <motion.button 
            className="group flex items-center gap-3 text-white uppercase tracking-widest text-sm font-bold"
            whileHover={{ gap: "20px" }}
          >
            View Full Products
            <span className="bg-white text-black rounded-full p-2 transition-all group-hover:bg-blue-500 group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </motion.button>
        </div>
      </Link>
      </div>
    </section>
  );
}

// --- SUB-COMPONENT FOR INDIVIDUAL ITEMS ---
function GalleryItem({ item, index }: { item: typeof projects[0], index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 // Slight delay for everything
      }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      {/* Image Card */}
      <div 
        className={`relative w-full ${item.height} overflow-hidden rounded-sm bg-gray-900 cursor-pointer ${isReversed ? 'md:order-2' : ''}`}
      >
        <Image 
          src={item.image} 
          alt={item.client}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Plus Icon Floating */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full text-white">
            <Plus size={24} />
          </div>
        </div>
      </div>

      {/* Info Content (Outside Image for cleaner look) */}
      <div className={`relative ${isReversed ? 'md:order-1' : ''}`}>
        <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-1 block">
           0{index + 1} / {item.type}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
          {item.client}
        </h3>
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}