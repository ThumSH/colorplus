"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";

// --- 1. NEW: BUTTON DOT MATRIX (Replaces Ink Gestures) ---
// This surrounds the button with a dot grid as shown in the image.
const ButtonDotMatrix = React.memo(() => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none z-0">
      
      {/* Radial Mask to fade edges */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "radial-gradient(closest-side, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 80%)"
        }}
      >
        <svg className="w-full h-full opacity-60">
          <defs>
            {/* The Dot Pattern */}
            <pattern 
              id="footer-btn-dots" 
              x="0" 
              y="0" 
              width="24" 
              height="24" 
              patternUnits="userSpaceOnUse"
            >
               <rect width="100%" height="100%" fill="transparent" />
               <circle cx="2" cy="2" r="1.5" fill="#0ea5e9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-btn-dots)" />
        </svg>
      </div>
      
      {/* Optional: Subtle blue glow behind the dots for depth */}
      <div className="absolute inset-0 bg-radial-[closest-side] from-sky-500/10 to-transparent opacity-50" />
    </div>
  );
});
ButtonDotMatrix.displayName = "ButtonDotMatrix";


// --- 2. HEX MESH BACKGROUND (Kept as is) ---
const HexMeshBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
      
      {/* A. Deep Background Gradient */}
      <div className="absolute inset-0 bg-radial-[at_top_center] from-slate-900 via-slate-950 to-slate-950 opacity-10" />

      {/* B. The Hex Grid with Perspective Transform */}
      <div 
        className="absolute inset-0 w-full h-[150%] -top-[30%]"
        style={{
          // This transform creates the "Floor/Landscape" effect seen in the image
          transform: "perspective(1000px) rotateX(60deg) scale(2)",
          transformOrigin: "center 80%", // Anchor near bottom for better depth
          maskImage: "radial-gradient(ellipse at center bottom, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center bottom, black 40%, transparent 80%)"
        }}
      >
        <svg className="w-full h-full opacity-20">
          <defs>
            {/* The Honeycomb Pattern */}
            <pattern 
              id="hex-floor" 
              width="24" 
              height="40" 
              patternUnits="userSpaceOnUse" 
              patternTransform="scale(1)"
            >
               {/* Hexagon Path */}
               <path 
                 d="M12 0 L24 7 V21 L12 28 L0 21 V7 Z" 
                 fill="none" 
                 stroke="#0ea5e9" 
                 strokeWidth="0.5" 
               />
               
               {/* Glowing Vertices (Dots) - Adds that "Data/Tech" sparkle */}
               <circle cx="12" cy="0" r="1.5" fill="#38bdf8" className="animate-pulse" opacity="0.1"/>
               <circle cx="12" cy="28" r="1.5" fill="#38bdf8" className="animate-pulse" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-floor)" />
        </svg>
      </div>

      {/* C. Blue Glow Overlay (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-sky-600/10 via-sky-900/05 to-transparent blur-3xl pointer-events-none" />
      
      {/* D. Center "CP" Watermark (Kept from original) */}
      <div className="absolute top-10 left-10 text-[20rem] font-black text-white/[0.02] leading-none select-none pointer-events-none z-0">
        CP
      </div>
    </div>
  );
});
HexMeshBackground.displayName = "HexMeshBackground";


// --- 3. MAIN FOOTER ---
export default function Footer() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-32 pb-10 overflow-hidden text-white">
      
      <HexMeshBackground />
      
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- CTA SECTION --- */}
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              LET&apos;S PRINT <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-cyan-300">
                EXCELLENCE.
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg text-lg font-light leading-relaxed">
              Ready to elevate your brand with export-quality printing? 
              Partner with the industry leaders today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 relative z-10"
          >
             {/* The Dot Matrix surrounds this specific button */}
             <ButtonDotMatrix />

             <Link 
                href="/contact" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] z-20"
             >
                <span className="text-lg font-bold tracking-widest uppercase">Start a Project</span>
                <span className="bg-white/20 rounded-full p-2 group-hover:bg-white group-hover:text-sky-500 transition-colors duration-300">
                   <ArrowRight size={20} />
                </span>
             </Link>
          </motion.div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/5 pt-16 mb-20 relative z-10">
          
          {/* BRAND */}
          <div className="md:col-span-4">
             <Link
                href="/"
                className="block relative h-12 w-40 mb-6"
                onClick={handleLogoClick}
              >
                 <Image
                    src="/CP.webp" 
                    alt="Colour Plus Logo"
                    fill
                    className="object-contain object-left opacity-90 hover:opacity-100 transition-opacity"
                    sizes="160px"
                 />
             </Link>
             <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                Established in 2009. We define the standard for screen printing in Sri Lanka, serving global fashion giants with precision and compliance.
             </p>
             <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS 1 */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-light">
              <li><Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Services</Link></li>
              <li><Link href="/products" className="hover:text-sky-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/technique" className="hover:text-sky-400 transition-colors">Techniques</Link></li>
            </ul>
          </div>

          {/* LINKS 2 */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Expertise</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-light">
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Screen Printing</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Heat Transfers</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Embellishments</Link></li>
              <li><Link href="/services" className="hover:text-sky-400 transition-colors">Sourcing</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-4">
             <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group/card">
                <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs flex items-center gap-2 relative z-10">
                   <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                   Contact Hub
                </h4>
                <div className="space-y-5 text-sm relative z-10">
                   <div className="flex items-start gap-4 group">
                      <div className="p-2 bg-slate-800 rounded-lg text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <MapPin size={18} />
                      </div>
                      <span className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                        564/A, Athurugiriya Road, <br/>Kottawa, Sri Lanka.
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-4 group">
                      <div className="p-2 bg-slate-800 rounded-lg text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                         <Phone size={18} />
                      </div>
                      <a href="tel:0094112781525" className="text-slate-300 group-hover:text-white transition-colors tracking-wide">
                        (+94) 11 278 1525
                      </a>
                   </div>

                   <div className="flex items-center gap-4 group">
                      <div className="p-2 bg-slate-800 rounded-lg text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                         <Mail size={18} />
                      </div>
                      <a href="mailto:colourplus@sltnet.lk" className="text-slate-300 group-hover:text-white transition-colors">
                        colourplus@sltnet.lk
                      </a>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-8 border-t border-white/5 text-slate-500 text-[10px] uppercase tracking-widest">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Colour Plus Printing Systems (Pvt) Ltd.
          </p>
          <p>
            Developed by <a href="https://tranzixglobalimpex.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors ml-1">Tranzix Global Impex</a>
          </p>
        </div>
      </div>
    </footer>
  );
}