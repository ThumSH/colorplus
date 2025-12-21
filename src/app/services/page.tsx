"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="bg-black min-h-screen text-white pt-24">
      
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-6 md:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Our Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            WORLD CLASS <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">PRODUCTION.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We dont just print; we manufacture premium apparel. From custom dye lots to retail-ready finishing, we handle the entire supply chain.
          </p>
        </motion.div>
      </section>

      {/* --- SERVICE 1: SCREEN PRINTING (Left Text, Right Image) --- */}
      <section className="py-20 bg-[#121212] border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black text-white mb-6">High-Definition Screen Printing</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our automatic presses can handle up to 14 colors with pinpoint registration. Whether you need heavy opaque plastisol or breathable water-based inks, we have the chemistry perfected.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-2 rounded-full"><Check className="text-red-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Plastisol & High Density Puff</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-2 rounded-full"><Check className="text-red-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Discharge & Waterbase (Soft Hand)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/10 p-2 rounded-full"><Check className="text-red-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Metallic Foils & Gel Coats</span>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative h-125 w-full rounded-2xl overflow-hidden"
            >
              <Image 
                src="https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1920&auto=format&fit=crop"
                alt="Screen Printing Press"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SERVICE 2: EMBROIDERY (Right Text, Left Image) --- */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image (Order 2 on Mobile, Order 1 on Desktop) */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative h-125 w-full rounded-2xl overflow-hidden order-2 lg:order-1"
            >
              <Image 
                src="https://images.unsplash.com/photo-1617252829241-11d8820c7585?q=80&w=1470&auto=format&fit=crop"
                alt="Detailed Embroidery"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Text Content (Order 1 on Mobile, Order 2 on Desktop) */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-black text-white mb-6">Premium Embroidery</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Thread adds dimension and perceived value that ink simply cannot match. From corporate polos to 3D puff snapbacks, our multi-head machines deliver retail quality at scale.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-full"><Check className="text-blue-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">3D Puff (Structured Caps)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-full"><Check className="text-blue-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Direct-to-Garment Stitching</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-full"><Check className="text-blue-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Appliqué & Patch Sewing</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SERVICE 3: FINISHING (Left Text, Right Image) --- */}
      <section className="py-20 bg-[#121212] border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black text-white mb-6">Finishing & Fulfillment</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The job isnt done when the shirt comes off the press. We offer full private-label services so your product arrives ready for the store shelf or the customers mailbox.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 p-2 rounded-full"><Check className="text-emerald-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Custom Neck Tag Relabeling</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 p-2 rounded-full"><Check className="text-emerald-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Folding, Bagging & Barcoding</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/10 p-2 rounded-full"><Check className="text-emerald-500 w-5 h-5" /></div>
                  <span className="font-bold text-gray-300">Split Shipping to Multiple Locations</span>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative h-125 w-full rounded-2xl overflow-hidden"
            >
              <Image 
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1287&auto=format&fit=crop"
                alt="Finishing and Packaging"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white">FREQUENTLY ASKED QUESTIONS</h2>
           </div>

           <div className="space-y-6">
              {[
                { q: "What is your minimum order quantity (MOQ)?", a: "Our standard MOQ is 24 pieces per design. For complex specialty prints, the MOQ starts at 50 pieces." },
                { q: "What file formats do you accept?", a: "We require vector artwork (AI, EPS, PDF) or high-resolution raster files (PSD, TIFF) at 300 DPI or higher sized to print." },
                { q: "What is your standard turnaround time?", a: "Standard turnaround is 10-14 business days from payment and artwork approval. Rush services are available upon request." },
              ].map((faq, i) => (
                <div key={i} className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5">
                   <h3 className="text-xl font-bold text-white mb-2">{faq.q}</h3>
                   <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 bg-[#121212] border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              READY TO PRINT?
            </h2>
            <Link 
              href="/#contact-us" 
              className="group bg-red-600 text-white px-10 py-5 rounded-sm font-bold uppercase hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              Start Your Project <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>

    </main>
  );
}