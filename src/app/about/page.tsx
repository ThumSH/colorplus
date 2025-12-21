"use client";

import { motion } from "framer-motion";
import { Award, Droplet, Zap } from "lucide-react";
import Link from "next/link"; // <--- Import Link here

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-24">
      
      {/* --- SECTION 1: HERO & STORY --- */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              MORE THAN <br />
              JUST <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">INK.</span>
            </h1>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Founded on the belief that merchandise is the physical embodiment of a brands soul, ColorPlus has evolved from a single manual press into a premier industrial printing house.
              </p>
              <p>
                We dont just print shirts; we engineer lasting impressions. By combining old-school craftsmanship with modern automation, we deliver retail-ready products that global brands trust.
              </p>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1470&auto=format&fit=crop"
              alt="Team working in the print shop"
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </motion.div>

        </div>
      </section>

      {/* --- SECTION 2: VALUES GRID --- */}
      <section className="bg-[#121212] py-24 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-wider">
              The ColorPlus Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] p-10 rounded-xl border border-white/5 hover:border-red-500/30 transition-all duration-300">
              <Award className="text-red-500 w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold mb-3">Obsessive Quality</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We inspect every single garment. If the print isnt crisp, opaque, and perfectly cured, it never leaves our shop.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-10 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all duration-300">
              <Droplet className="text-blue-500 w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold mb-3">Eco-Conscious Inks</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our water-based and phthalate-free plastisol inks ensure your merch is safe for your customers and the planet.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-10 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all duration-300">
              <Zap className="text-yellow-500 w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold mb-3">Industrial Speed</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deadlines are sacred. Our automated presses allow us to churn out thousands of units per day without sacrificing detail.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: WIDE VISUAL FOOTER --- */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1581093458791-9f302e6d8359?q=80&w=1470&auto=format&fit=crop"
          alt="Industrial Factory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            READY TO SCALE?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join the hundreds of brands that trust ColorPlus with their identity.
          </p>
          
          {/* FIXED: Replaced <a> with <Link> */}
          <Link 
            href="/#contact" 
            className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all inline-block"
          >
            Get in Touch
          </Link>
          
        </div>
      </section>

    </main>
  );
}