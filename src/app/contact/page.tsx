"use client";

import React, { useState, useEffect, useMemo, useId } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

// --- 1. Deterministic Seeded Random Helper ---
const getSeededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- 2. Floating Dots Background (Framer Motion) ---
const FloatingDotsBackgroundComponent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const dots = useMemo(() => {
    const numDots = 40;
    return Array.from({ length: numDots }).map((_, i) => {
      const seed1 = i + 0.987;
      const seed2 = i + 0.654;
      return {
        x: getSeededRandom(seed1) * 100,
        y: getSeededRandom(seed2) * 100,
        size: 2 + getSeededRandom(seed1 + seed2) * 6,
        opacity: 0.2 + getSeededRandom(seed1 * 2) * 0.5,
        duration: 4 + getSeededRandom(seed2 * 2) * 5,
      };
    });
  }, []);

  if (!mounted) return <div className="absolute inset-0 z-0" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-400/40"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            filter: `blur(${dot.size / 3}px)`,
            boxShadow: `0 0 ${dot.size + 2}px rgba(56, 189, 248, ${dot.opacity})`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

const FloatingDotsBackground = React.memo(FloatingDotsBackgroundComponent);
FloatingDotsBackground.displayName = "FloatingDotsBackground";

// --- 3. MESH BACKGROUND SYSTEM ---
function MeshOval({
  className = "",
  opacity = 0.55,
  rotate = 0,
}: {
  className?: string;
  opacity?: number;
  rotate?: number;
}) {
  const uid = useId();
  const patternId = `meshPattern-${uid}`;
  const gradId = `meshGrad-${uid}`;

  return (
    <div 
      className={`absolute pointer-events-none ${className}`} 
      style={{ 
        transform: `rotate(${rotate}deg)`,
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%)"
      }}
    >
      <div className="absolute inset-0 bg-sky-500/10 blur-[60px]" />

      <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#0ea5e9" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.75" />
          </linearGradient>

          <pattern id={patternId} x="0" y="0" width="48" height="42" patternUnits="userSpaceOnUse">
            <path
              d="M24 2 L40 11 V31 L24 40 L8 31 V11 Z"
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
            <circle cx="24" cy="21" r="2" fill="#38bdf8" opacity="0.6" />
          </pattern>
        </defs>

        <g opacity={opacity}>
          <rect width="300" height="300" fill={`url(#${patternId})`} />
          <radialGradient id={`innerGlow-${uid}`} cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <rect width="300" height="300" fill={`url(#innerGlow-${uid})`} />
        </g>
      </svg>
    </div>
  );
}

function ContactMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <MeshOval className="top-10 -left-20 w-96 h-96" opacity={0.6} rotate={-10} />
      <MeshOval className="top-[30%] -right-32 w-[500px] h-[500px]" opacity={0.5} rotate={20} />
      <MeshOval className="bottom-0 left-10 w-80 h-80" opacity={0.5} rotate={5} />
    </div>
  );
}

// --- CONTACT DATA ---
const contactInfo = [
  {
    id: 1,
    title: "Office & Factory",
    content: "564/A, Athurugiriya Road, Kottawa, Sri Lanka.",
    link: "https://maps.google.com/?q=564/A,+Athurugiriya+Road,+Kottawa,+Sri+Lanka",
    icon: <MapPin size={24} />,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "group-hover:border-sky-500/50",
  },
  {
    id: 2,
    title: "Call Us",
    content: "(+94) 112781525",
    link: "tel:0094112781525",
    icon: <Phone size={24} />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
  },
  {
    id: 3,
    title: "Email Inquiries",
    content: "colourplus@sltnet.lk",
    link: "mailto:colourplus@sltnet.lk",
    icon: <Mail size={24} />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "group-hover:border-indigo-500/50",
  },
];

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <main className="bg-slate-950 min-h-screen pt-24 relative overflow-hidden">
      
      {/* Backgrounds */}
      <FloatingDotsBackground />
      <ContactMeshBackground />
      <div className="absolute top-0 right-0 w-150 h-150 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8 backdrop-blur-sm">
              <Sparkles className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
                Get In Touch
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
              START YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-400">
                NEXT PROJECT.
              </span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
              Whether you need a quote for export-quality screen printing or have a question about our techniques, our team in Kottawa is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT INFO GRID --- */}
      <section className="container mx-auto px-6 md:px-12 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((item, i) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 ${item.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              <div className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{item.title}</h3>
              <p className="text-slate-400 font-medium group-hover:text-white transition-colors">
                {item.content}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-sky-400 transition-colors">
                Connect <ArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* --- FORM & MAP SECTION --- */}
      <section className="container mx-auto px-6 md:px-12 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          
          {/* LEFT: Contact Form */}
          <div className="p-8 md:p-12 lg:border-r border-white/5">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">SEND A MESSAGE</h2>
            <p className="text-slate-400 mb-8 text-sm">We usually respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Name</label>
                  <input type="text" required className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500/50 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Company</label>
                  <input type="text" className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500/50 transition-colors" placeholder="Brand Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Email Address</label>
                <input type="email" required className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500/50 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Service Interest</label>
                <select className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500/50 transition-colors">
                  <option>Screen Printing</option>
                  <option>Heat Transfers</option>
                  <option>Designing Services</option>
                  <option>Bulk Manufacturing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-sky-500/50 transition-colors" placeholder="Tell us about your project requirements..." />
              </div>

              <button 
                disabled={formStatus === "sending" || formStatus === "success"}
                className={`w-full py-4 rounded-lg font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-2
                  ${formStatus === "success" 
                    ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                    : "bg-white text-black hover:bg-sky-400 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                  }`}
              >
                {formStatus === "idle" && (
                  <>Send Message <Send size={16} /></>
                )}
                {formStatus === "sending" && (
                  <span className="animate-pulse">Sending...</span>
                )}
                {formStatus === "success" && (
                  <>Message Sent <CheckCircle size={16} /></>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Map */}
          <div className="relative min-h-100 lg:min-h-full bg-slate-900">
            {/* Updated iframe src to a valid Google Maps Embed query */}
            <iframe 
              src="https://maps.google.com/maps?q=564/A,+Athurugiriya+Road,+Kottawa,+Sri+Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(85%) opacity(0.8)" }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Colour Plus Location"
              className="absolute inset-0"
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 text-white">
                <div className="p-2 bg-sky-500/20 rounded-lg text-sky-400">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm tracking-wide">OPERATING HOURS</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Mon - Fri: 8:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}