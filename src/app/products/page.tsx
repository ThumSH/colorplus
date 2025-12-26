"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Tag, Factory, Shirt, ArrowRight } from "lucide-react";
import Image from "next/image";

// --- PRODUCT DATA FROM PDF  ---
const categories = ["All", "Men", "Ladies", "Kids", "Sports"];

const products = [
  // Men's Wear [cite: 133-136]
  {
    id: 1,
    category: "Men",
    title: "Premium T-Shirts",
    desc: "High-quality cotton and blend tees with custom screen prints.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    category: "Men",
    title: "Casual Shorts",
    desc: "Durable fabrics with precision-printed detailing.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Men",
    title: "Button-Down Shirts",
    desc: "Formal and casual shirts featuring subtle branding or patterns.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"
  },

  // Ladies Wear [cite: 129-132]
  {
    id: 4,
    category: "Ladies",
    title: "Fashion Blouses",
    desc: "Elegant cuts with delicate embellishments and prints.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    category: "Ladies",
    title: "Skirts",
    desc: "Printed skirts ranging from casual wear to fashion-forward styles.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    category: "Ladies",
    title: "Trousers & Pants",
    desc: "Comfortable fits with high-quality fabric finishes.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop"
  },

  // Kids Wear [cite: 125-128]
  {
    id: 7,
    category: "Kids",
    title: "Children's T-Shirts",
    desc: "Safe, chemical-free prints perfect for sensitive skin.",
    image: "https://images.unsplash.com/photo-1519238263496-414d68c36143?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    category: "Kids",
    title: "Kids' Pants & Shorts",
    desc: "Durable playwear designed for movement and comfort.",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop"
  },

  // Sports Wear [cite: 137-140]
  {
    id: 9,
    category: "Sports",
    title: "Performance Tees",
    desc: "Moisture-wicking fabrics with stretchable athletic prints.",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 10,
    category: "Sports",
    title: "Skinnies & Leggings",
    desc: "High-stretch compression wear with durable transfer prints.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 11,
    category: "Sports",
    title: "Tracksuits",
    desc: "Full sets optimized for teams and athletic brands.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen">
      
      {/* --- HERO HEADER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden mb-12">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Abstract Fabric Texture Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2000')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 inline-block border border-blue-500/20 bg-blue-500/5 px-3 py-1 rounded-full">
              Production Capabilities
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">PRODUCTS.</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              From infant wear to high-performance sportswear, we manufacture superlative quality garments for global brands [cite: 123-140].
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CAPACITY BANNER [cite: 141-142] --- */}
      <section className="container mx-auto px-6 md:px-12 mb-20">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Factory className="text-blue-500" />
              Factory Capacity
            </h3>
            <p className="text-gray-400 max-w-md">
              Our 7,000 sq ft facility in Kottawa is staffed by 50 professionals, ensuring timely delivery for large-scale orders.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="text-right">
              <div className="text-4xl font-black text-white">300,000</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Pieces Per Month</div>
            </div>
            <div className="h-12 w-1 bg-white/10" />
            <Shirt className="text-gray-400" size={32} />
          </div>
        </div>
      </section>

      {/* --- CATEGORY TABS --- */}
      <section className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- PRODUCTS GRID --- */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all cursor-pointer"
              >
                {/* Image Area */}
                <div className="relative h-75 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Tag size={12} className="text-blue-500" />
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                       Export Quality
                    </span>
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all text-white">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </section>

    </main>
  );
}