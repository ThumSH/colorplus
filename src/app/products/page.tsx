"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Factory, Shirt, Sparkles, Target, CheckCircle, Package } from "lucide-react";
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
    title: "High-Density Silicone Print",
    desc: "Precision high-density silicone printing on premium denim for raised, durable logos on heavy fabrics.",
    image: "/boss.webp",
    features: ["3D Raised Effect", "Wash Resistant", "Silicone Ink"]
  },
  {
    id: 2,
    category: "Men",
    title: "Stretch Denim Discharge",
    desc: "Soft-hand discharge printing on stretch fabrics that maintains elasticity without cracking.",
    image: "/ckj.webp",
    features: ["Soft Hand Feel", "Stretch Compatible", "Breathable"]
  },
  {
    id: 3,
    category: "Men",
    title: "Vintage Wash Effects",
    desc: "Distressed screen printing techniques designed to weather perfectly alongside heavy stone washes.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=987&auto=format&fit=crop",
    features: ["Distressed Look", "Stone Wash Safe", "Pigment Ink"]
  },
  {
    id: 12,
    category: "Men",
    title: "Metallic & Foil Applications",
    desc: "Industrial-grade metallic foil transfer and printing on denim for bold, reflective fashion statements.",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop",
    features: ["Metallic Finish", "Heat Transfer", "Industrial Style"]
  },
  {
    id: 13,
    category: "Men",
    title: "Multi-Layer Plastisol",
    desc: "Vibrant, multi-colored logo printing with high opacity on dark indigo denim backgrounds.",
    image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1000&auto=format&fit=crop",
    features: ["High Opacity", "Color Vibrancy", "Sharp Edges"]
  },

  // Ladies Wear [cite: 129-132]
  {
    id: 4,
    category: "Ladies",
    title: "Water-Based Placement Prints",
    desc: "Intricate floral and abstract placement prints using eco-friendly water-based inks on ladies' denim.",
    image: "https://images.unsplash.com/photo-1584370848010-d7cc637703ef?q=80&w=1000&auto=format&fit=crop",
    features: ["Eco-Friendly Ink", "Fine Detail", "Soft Finish"]
  },
  {
    id: 5,
    category: "Ladies",
    title: "Formal Trouser Branding",
    desc: "Subtle, tonal branding and interior waistband printing for sophisticated formal trousers.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    features: ["Tonal Print", "Waistband Detail", "Minimalist"]
  },
  {
    id: 6,
    category: "Ladies",
    title: "All-Over Chino Patterns",
    desc: "Seamless rotary and screen printed patterns on chino fabric for versatile casual wear.",
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1000&auto=format&fit=crop",
    features: ["All-Over Print", "Rotary Screen", "Color Fast"]
  },
  {
    id: 14,
    category: "Ladies",
    title: "Pocket & Waist Embellishment",
    desc: "Specialized small-area screen printing for pockets, loops, and waistbands on high-fashion denim.",
    image: "https://images.unsplash.com/photo-1551852307-5490291221d7?q=80&w=1000&auto=format&fit=crop",
    features: ["Precision Placement", "Glitter/Shimmer", "Fashion Accent"]
  },
  {
    id: 15,
    category: "Ladies",
    title: "Heavy-Duty Cargo Prints",
    desc: "Abrasion-resistant lettering and technical data prints on rugged cargo and utility fabrics.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
    features: ["Abrasion Resistant", "Technical Look", "Heavy Ink"]
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
              OUR <motion.span 
                className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-300 to-violet-400"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                PRODUCTS
              </motion.span>
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
          <div className="absolute inset-0 bg-linear-to-r from-sky-500/5 via-transparent to-violet-500/5" />
          
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
              Our 10,000 sq ft facility in Kottawa is staffed by 50+ professionals, ensuring timely delivery for large-scale orders with export-grade precision.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">500K</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold">
                Pieces Per Month
              </div>
            </div>
            <div className="h-16 w-1 bg-linear-to-b from-sky-500 to-violet-500 rounded-full" />
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
            Explore Our <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-violet-400">Collections</span>
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
                    ? "text-white bg-linear-to-r from-sky-500 to-violet-500 shadow-lg shadow-sky-500/25"
                    : "text-slate-500 bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-slate-600 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-linear-to-r from-sky-500 to-violet-500 rounded-full -z-10"
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
                <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-violet-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                {/* Product Card */}
                <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-sky-500/30 transition-all duration-500 h-full">
                  {/* Image Area */}
                  <div className="relative aspect-3/4 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title || "Product Image"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Title Overlay on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-lg font-bold text-white text-center drop-shadow-lg">
                        {product.title}
                      </h3>
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
        <div className="bg-linear-to-r from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
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
    </main>
  );
}