"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

// Updated Data with Real Images
const projects = [
  {
    id: 1,
    client: "Urban Outfitters",
    type: "Discharge Print",
    // Image: Streetwear / Hoodie vibe
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    height: "h-[400px]",
  },
  {
    id: 2,
    client: "Nike Sportswear",
    type: "High-Density Puff",
    // Image: Sporty / Texture focus
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop",
    height: "h-[600px]",
  },
  {
    id: 3,
    client: "Local Brewery",
    type: "Vintage Soft Hand",
    // Image: Lifestyle / Casual tee
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1069&auto=format&fit=crop",
    height: "h-[500px]",
  },
  {
    id: 4,
    client: "Band Merch",
    type: "Halftone CMYK",
    // Image: Dark / Concert vibe
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1064&auto=format&fit=crop",
    height: "h-[400px]",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#121212] py-24 relative">
      
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-2 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-none">
            SELECTED <br /> WORKS.
          </h2>
        </div>
        
        <p className="text-gray-400 max-w-sm text-sm md:text-base">
          A curated selection of our finest prints. Zoom in to see the ink deposit and fabric texture.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative group rounded-xl overflow-hidden cursor-pointer ${item.height} ${index === 1 || index === 2 ? 'md:translate-y-12' : ''}`}
            >
              
              {/* IMAGE CONTAINER */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
                <Image 
                  src={item.image} 
                  alt={item.type}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Subtle dark tint to make white text readable if image is bright */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Overlay (Hidden by default, appears on hover) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
                    {item.type}
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {item.client}
                  </h3>
                </div>
                
                {/* Plus Icon in top right */}
                <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-full rotate-90 group-hover:rotate-0 transition-all duration-300">
                  <Plus size={20} />
                </div>
              </div>

            </motion.div>
          ))}

        </div>
        
        {/* View All Button */}
        <div className="mt-24 flex justify-center">
            <button className="border-b border-gray-600 text-gray-400 pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm">
                View Full Gallery
            </button>
        </div>
      </div>
    </section>
  );
}