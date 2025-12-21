"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Image from 'next/image';

// --- GALLERY DATA ---
const allProjects = [
  {
    id: 1,
    category: "Screen Print",
    client: "Urban Streetwear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    size: "tall", // Vertical image
  },
  {
    id: 2,
    category: "Embroidery",
    client: "Varsity Jacket Back",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1287&auto=format&fit=crop",
    size: "wide", // Horizontal image
  },
  {
    id: 3,
    category: "Merch",
    client: "Band Tour Tee",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1064&auto=format&fit=crop",
    size: "square",
  },
  {
    id: 4,
    category: "Screen Print",
    client: "Neon Plastisol",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: 5,
    category: "Embroidery",
    client: "Corporate Polo",
    image: "https://images.unsplash.com/photo-1617252829241-11d8820c7585?q=80&w=1470&auto=format&fit=crop",
    size: "square",
  },
  {
    id: 6,
    category: "Merch",
    client: "Tote Bag Print",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=987&auto=format&fit=crop",
    size: "wide",
  },
];

const categories = ["All", "Screen Print", "Embroidery", "Merch"];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <main className="bg-black min-h-screen text-white pt-24 pb-24">
      
      {/* --- HEADER --- */}
      <section className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            SELECTED <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">WORKS.</span>
          </h1>
          
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 border-b-2 pb-1 ${
                  filter === cat 
                    ? "text-red-500 border-red-500" 
                    : "text-gray-500 border-transparent hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="container mx-auto px-6 md:px-12">
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-xl bg-[#1a1a1a] cursor-pointer ${
                  project.size === "tall" ? "row-span-2 h-[600px]" : "h-[400px]"
                }`}
              >
<div className="relative w-full h-full"> {/* Parent must be relative */}
  <Image
    src={project.image}
    alt={project.client}
    fill // This replaces w-full h-full absolute
    className="object-cover transition-transform duration-700 group-hover:scale-110"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: helps performance
  />
</div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {project.client}
                    </h3>
                  </div>
                  
                  {/* Plus Icon */}
                  <div className="absolute top-6 right-6 bg-white text-black p-2 rounded-full rotate-90 group-hover:rotate-0 transition-all duration-300">
                    <Plus size={20} />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

    </main>
  );
}