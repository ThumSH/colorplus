"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
  id: number | string;
  image: string | StaticImport;
  category: string;
  features?: string[];
}

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
}

export default function ProductGrid({ products, activeCategory }: ProductGridProps) {
  return (
    <section className="container mx-auto px-6 md:px-12 pb-24">
      <AnimatePresence mode="wait">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          key={activeCategory}
        >
          {products.map((product) => (
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
                    alt={`${product.category} Wear Product`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {products.length === 0 && (
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
            We&apos;re currently updating this category with new products. Please check back soon or browse other categories.
          </p>
        </motion.div>
      )}
    </section>
  );
}