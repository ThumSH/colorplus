"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion,type Variants } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";

// --- 1. NEW COMPONENT: INK GESTURES (The "Pen Swing" Effect) ---
const InkGestures = () => {
  // Animation variants for the drawing effect
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 },
      },
    }),
  };

  return (
    <div className="absolute top-[-20%] right-[-10%] md:right-[5%] w-75 md:w-125 h-125 pointer-events-none z-0 rotate-12 opacity-80">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 500 400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        style={{ overflow: "visible" }}
      >
        {/* Stroke 1: The big sweep */}
        <motion.path
          d="M 50 350 Q 150 50 450 100"
          fill="transparent"
          stroke="#0ea5e9"
          strokeWidth="4"
          strokeLinecap="round"
          variants={draw}
          custom={0}
        />
        
        {/* Stroke 2: The sharp return */}
        <motion.path
          d="M 420 80 Q 300 150 100 200"
          fill="transparent"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
          variants={draw}
          custom={0.2}
          style={{ opacity: 0.7 }}
        />

        {/* Stroke 3: Chaos line */}
        <motion.path
          d="M 120 220 C 200 180, 350 300, 480 50"
          fill="transparent"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinecap="round"
          variants={draw}
          custom={0.4}
        />

        {/* Stroke 4: Fast flick */}
        <motion.path
          d="M 300 300 Q 400 250 450 350"
          fill="transparent"
          stroke="#38bdf8"
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
          custom={0.5}
          style={{ opacity: 0.5 }}
        />

        {/* Ink Splatters (Circles appearing) */}
        <motion.circle 
          cx="460" cy="90" r="4" fill="#0ea5e9" 
          initial={{ scale: 0 }} 
          whileInView={{ scale: 1 }} 
          transition={{ delay: 0.8, type: "spring" }} 
        />
        <motion.circle 
          cx="40" cy="360" r="3" fill="#38bdf8" 
          initial={{ scale: 0 }} 
          whileInView={{ scale: 1 }} 
          transition={{ delay: 0.2, type: "spring" }} 
        />
        <motion.circle 
          cx="200" cy="180" r="6" fill="#0ea5e9" 
          initial={{ scale: 0 }} 
          whileInView={{ scale: 1 }} 
          transition={{ delay: 0.5, type: "spring" }} 
          style={{ opacity: 0.6 }}
        />
      </motion.svg>
    </div>
  );
};

// --- 2. EXISTING MESH OVAL COMPONENT ---
const FooterMeshOval = React.memo(
  ({
    size,
    left,
    top,
    rotate,
    opacity,
    idSuffix,
  }: {
    size: number;
    left: number;
    top: number;
    rotate: number;
    opacity: number;
    idSuffix: string | number;
  }) => {
    const gradId = `footer-grad-${idSuffix}`;
    const patId = `footer-pat-${idSuffix}`;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          opacity,
          WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
          maskImage: "radial-gradient(closest-side, black 30%, transparent 90%)",
          filter: "blur(0.5px)",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-sky-600/10 blur-[80px]" />

        <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
            </linearGradient>

            <pattern id={patId} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="100%" height="100%" fill="transparent" />
              <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.6" />
              <ellipse cx="9" cy="9" rx="1.5" ry="2.5" fill="#0ea5e9" opacity="0.5" />
            </pattern>
          </defs>

          <g>
            <ellipse cx="150" cy="150" rx="130" ry="105" fill={`url(#${patId})`} opacity="0.9" />
            <ellipse
              cx="150"
              cy="150"
              rx="130"
              ry="105"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    );
  }
);
FooterMeshOval.displayName = "FooterMeshOval";

// --- 3. FOOTER BACKGROUND ---
const FooterBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute bottom-0 left-0 right-0 h-150 bg-linear-to-t from-sky-900/10 to-transparent" />

      {/* Corners */}
      <FooterMeshOval 
        idSuffix="corner-left"
        size={500}         
        left={0}           
        top={90}          
        rotate={30}        
        opacity={0.4}      
      />
      <FooterMeshOval 
        idSuffix="corner-right"
        size={500}         
        left={100}         
        top={90}          
        rotate={-30}       
        opacity={0.4}      
      />
      {/* Center Keystone */}
      <FooterMeshOval 
        idSuffix="center-bottom"
        size={290}         
        left={50}          
        top={80}          
        rotate={0}         
        opacity={0.4}      
      />

      <div className="absolute top-10 left-10 text-[20rem] font-black text-white/2 leading-none select-none pointer-events-none z-0">
        CP
      </div>
    </div>
  );
});
FooterBackground.displayName = "FooterBackground";

// --- 4. MAIN FOOTER ---
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
      <FooterBackground />
      
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- CTA SECTION WITH INK GESTURES --- */}
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          
          {/* ✅ ADDED: The Ink Gesture Animation */}
          <InkGestures />

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
             <Link 
                href="/contact" 
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)]"
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