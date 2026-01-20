"use client";

import React, { useState } from "react";
import HeroSection from "@/components/sections/product-hero";
import CapacityBanner from "@/components/sections/CapacityBanner";
import CuratedWorks from "@/components/sections/CuratedWorks";
import CategoryTabs from "@/components/sections/CategoryTabs";
import ProductGrid from "@/components/sections/ProductGrid";
import QualityBanner from "@/components/sections/QualityBanner";
import { products } from "@/components/ui/product-data";


export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="bg-slate-950 min-h-screen">
      <HeroSection />
      <CapacityBanner />

      <CuratedWorks />
      
      <CategoryTabs 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      <ProductGrid 
        products={filteredProducts} 
        activeCategory={activeCategory} 
      />
      
      <QualityBanner />
    </main>
  );
}