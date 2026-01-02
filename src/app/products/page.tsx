"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Tag, Factory, Shirt, ArrowRight, Sparkles, Target, CheckCircle, Package } from "lucide-react";
import Image from "next/image";

// --- PRODUCT DATA FROM PDF ---
const categories = [
  { id: "All", label: "All Products", icon: Package },
  { id: "Men", label: "Men's Wear", icon: Shirt },
  { id: "Ladies", label: "Ladies Wear", icon: Shirt },
  { id: "Kids", label: "Kids Wear", icon: Shirt },
  { id: "Sports", label: "Sports Wear", icon: Target }
];

const products = [
  // Men's Wear [cite: 133-136]
  {
    id: 1,
    category: "Men",
    title: "Premium T-Shirts",
    desc: "High-quality cotton and blend tees with custom screen prints for lasting comfort and style.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    features: ["100% Cotton", "Custom Prints", "Export Quality"]
  },
  {
    id: 2,
    category: "Men",
    title: "Casual Shorts",
    desc: "Durable fabrics with precision-printed detailing for everyday comfort and style.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
    features: ["Quick Dry", "Multiple Colors", "Durable"]
  },
  {
    id: 3,
    category: "Men",
    title: "Button-Down Shirts",
    desc: "Formal and casual shirts featuring subtle branding or patterns for versatile wear.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    features: ["Premium Fabric", "Formal Fit", "Iron-Free"]
  },

  // Ladies Wear [cite: 129-132]
  {
    id: 4,
    category: "Ladies",
    title: "Fashion Blouses",
    desc: "Elegant cuts with delicate embellishments and prints for sophisticated styling.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1000&auto=format&fit=crop",
    features: ["Designer Cut", "Elegant Prints", "Premium Finish"]
  },
  {
    id: 5,
    category: "Ladies",
    title: "Skirts",
    desc: "Printed skirts ranging from casual wear to fashion-forward styles for every occasion.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop",
    features: ["Comfort Fit", "Vibrant Prints", "Easy Care"]
  },
  {
    id: 6,
    category: "Ladies",
    title: "Trousers & Pants",
    desc: "Comfortable fits with high-quality fabric finishes for all-day comfort.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    features: ["Stretch Fabric", "Modern Fit", "Durable"]
  },

  // Kids Wear [cite: 125-128]
  {
    id: 7,
    category: "Kids",
    title: "Children's T-Shirts",
    desc: "Safe, chemical-free prints perfect for sensitive skin with fun designs.",
    image: "https://images.unsplash.com/photo-1519238263496-414d68c36143?q=80&w=1000&auto=format&fit=crop",
    features: ["Chemical-Free", "Soft Fabric", "Fun Designs"]
  },
  {
    id: 8,
    category: "Kids",
    title: "Kids' Pants & Shorts",
    desc: "Durable playwear designed for movement and comfort during active play.",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop",
    features: ["Reinforced Seams", "Stretchable", "Easy Wash"]
  },

  // Sports Wear [cite: 137-140]
  {
    id: 9,
    category: "Sports",
    title: "Performance Tees",
    desc: "Moisture-wicking fabrics with stretchable athletic prints for optimal performance.",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=1000&auto=format&fit=crop",
    features: ["Moisture-Wicking", "Breathable", "Team Colors"]
  },
  {
    id: 10,
    category: "Sports",
    title: "Skinnies & Leggings",
    desc: "High-stretch compression wear with durable transfer prints for athletic wear.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    features: ["Compression Fit", "High Stretch", "Durable Prints"]
  },
  {
    id: 11,
    category: "Sports",
    title: "Tracksuits",
    desc: "Full sets optimized for teams and athletic brands with coordinated designs.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    features: ["Full Set", "Team Branding", "Performance Fabric"]
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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <main ref={containerRef} className="bg-slate-950 min-h-screen">
      
      {/* --- HERO HEADER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Clean background without particles */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Solid gradient background */}
          
          {/* Fabric texture with subtle overlay */}
          <Image
            src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=2000"
            alt="Fabric Texture"
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 mb-8 backdrop-blur-sm mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
                Premium Quality
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9]">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-violet-400 animate-gradient">
                PRODUCTS
              </span>
            </h1>
            
            <p className="text-slate-300 max-w-xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              From infant wear to high-performance sportswear, we manufacture superlative quality garments for global brands.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CAPACITY BANNER [cite: 141-142] --- */}
      <section className="container mx-auto px-6 md:px-12 mb-20 -mt-10 relative z-20">
        <motion.div 
          className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Clean gradient background without animated dots */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-violet-500/5" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-sky-500/20 border border-sky-500/30">
                <Factory className="text-sky-400" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Manufacturing Capacity
              </h3>
            </div>
            <p className="text-slate-400 max-w-lg text-lg font-light">
              Our 1,000 sq ft facility in Kottawa is staffed by 50+ professionals, ensuring timely delivery for large-scale orders with export-grade precision.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">500K</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">
                Pieces Per Month
              </div>
            </div>
            <div className="h-16 w-1 bg-gradient-to-b from-sky-500 to-violet-500 rounded-full" />
            <div className="p-4 rounded-xl bg-sky-500/20 border border-sky-500/30">
              <Shirt className="text-sky-400" size={32} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- CATEGORY TABS --- */}
      <section className="container mx-auto px-6 md:px-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">Collections</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto font-light">
            Browse through our premium garment categories, each crafted with precision and care.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-sky-500 to-violet-500 shadow-lg shadow-sky-500/25"
                    : "text-slate-500 bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-600 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full -z-10"
                  />
                )}
                <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                {cat.label}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* --- PRODUCTS GRID --- */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <AnimatePresence mode="wait">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={activeCategory}
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                {/* Product Card */}
                <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-sky-500/30 transition-all duration-500 h-full flex flex-col">
                  {/* Image Area */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <Tag size={12} className="text-sky-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          {product.category}
                        </span>
                      </span>
                    </div>

                    {/* Features Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle size={12} className="text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400">
                          Export Quality
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1 font-light leading-relaxed">
                      {product.desc}
                    </p>
                    
                    {/* Features List */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features?.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full border border-slate-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Footer */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                        Screen Printed
                      </span>
                      <motion.button 
                        className="p-2 rounded-full bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white transition-all duration-300 group/btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex p-6 rounded-2xl bg-slate-900/50 border border-slate-800 mb-6">
              <Package className="text-slate-600" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Were currently updating this category with new products. Please check back soon or browse other categories.
            </p>
          </motion.div>
        )}
      </section>

      {/* --- QUALITY ASSURANCE BANNER --- */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-sky-500/20 border border-sky-500/30 mb-4">
                <Target className="text-sky-400" size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Precision Printing</h4>
              <p className="text-slate-400 text-sm">
                Every print undergoes rigorous quality checks for color accuracy and durability.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 mb-4">
                <CheckCircle className="text-emerald-400" size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Export Standards</h4>
              <p className="text-slate-400 text-sm">
                Meeting international quality standards for markets worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-violet-500/20 border border-violet-500/30 mb-4">
                <Factory className="text-violet-400" size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Modern Facility</h4>
              <p className="text-slate-400 text-sm">
                State-of-the-art equipment for consistent, high-volume production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </main>
  );
}