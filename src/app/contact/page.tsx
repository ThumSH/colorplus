"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate network request
    setTimeout(() => setFormStatus("success"), 2000);
  };

  return (
    <main className="bg-black min-h-screen text-white pt-24">
      
      {/* --- HEADER --- */}
      <section className="container mx-auto px-6 md:px-12 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
            Start Your Project
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            LETS MAKE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-600">HISTORY.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Ready to elevate your brand merchandise? Fill out the form below or drop by our showroom.
          </p>
        </motion.div>
      </section>

      {/* --- SPLIT CONTENT SECTION --- */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- LEFT: CONTACT FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#121212] p-8 md:p-12 rounded-2xl border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm p-4 text-white focus:border-red-500 focus:outline-none transition-colors" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input type="email" placeholder="john@brand.com" className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm p-4 text-white focus:border-red-500 focus:outline-none transition-colors" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Interest</label>
                <select className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm p-4 text-white focus:border-red-500 focus:outline-none transition-colors appearance-none cursor-pointer">
                  <option>Screen Printing</option>
                  <option>Embroidery</option>
                  <option>Merchandise Fulfillment</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                 <textarea rows={4} placeholder="Tell us about your project quantity and timeline..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-sm p-4 text-white focus:border-red-500 focus:outline-none transition-colors"></textarea>
              </div>

              <button 
                disabled={formStatus !== "idle"}
                className="w-full bg-red-600 text-white py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "idle" && <>Send Request <ArrowRight size={20} /></>}
                {formStatus === "submitting" && "Sending..."}
                {formStatus === "success" && <>Message Sent <Send size={20} /></>}
              </button>

            </form>
          </motion.div>


          {/* --- RIGHT: INFO & MAP --- */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="space-y-12 flex flex-col justify-center"
          >
            {/* Info Cards */}
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 group-hover:border-red-500/50 transition-colors">
                  <MapPin className="text-red-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Visit Our Showroom</h3>
                  <p className="text-gray-400 leading-relaxed">
                    123 Industrial Ave, Suite 400<br />
                    Colombo, Sri Lanka 10100
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 group-hover:border-blue-500/50 transition-colors">
                  <Mail className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
                  <p className="text-gray-400 mb-1">Quotes: sales@colorplus.com</p>
                  <p className="text-gray-400">Support: help@colorplus.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 group-hover:border-emerald-500/50 transition-colors">
                  <Phone className="text-emerald-500 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Call Us</h3>
                  <p className="text-gray-400">Mon-Fri from 8am to 5pm.</p>
                  <p className="text-white font-bold text-lg mt-1">+94 77 123 4567</p>
                </div>
              </div>
            </div>

            {/* Map Image Placeholder */}
            <div className="relative h-62.5 w-full rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" 
                 alt="Map Location" 
                 fill
                 className="object-cover opacity-60"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-red-600 p-3 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] animate-pulse">
                    <MapPin className="text-white w-6 h-6" />
                 </div>
               </div>
            </div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}