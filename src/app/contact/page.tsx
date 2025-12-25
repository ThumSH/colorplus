"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";

// --- CONTACT DATA FROM PDF [cite: 149-151] ---
const contactInfo = [
  {
    id: 1,
    title: "Office & Factory",
    content: "564/A, Athurugiriya Road, Kottawa, Sri Lanka.",
    link: "https://maps.google.com/?q=564/A, Athurugiriya Road, Kottawa, Sri Lanka",
    icon: <MapPin size={24} />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Call Us",
    content: "(00 94) 112781525",
    link: "tel:0094112781525",
    icon: <Phone size={24} />,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Email Inquiries",
    content: "colourplus@sltnet.lk",
    link: "mailto:colourplus@sltnet.lk",
    icon: <Mail size={24} />,
    color: "bg-red-500",
  },
];

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    // Simulate network request
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <main className="bg-[#050505] min-h-screen pt-24">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              START YOUR <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
                NEXT PROJECT.
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Whether you need a quote for export-quality screen printing or have a question about our techniques, our team in Kottawa is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT INFO GRID [cite: 149-151] --- */}
      <section className="container mx-auto px-6 md:px-12 mb-24">
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
              className="group bg-[#121212] p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} bg-opacity-20 flex items-center justify-center text-white mb-6 group-hover:bg-opacity-100 transition-all`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                {item.content}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                Connect <ArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* --- MAP & FORM SECTION --- */}
      <section className="container mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5">
          
          {/* LEFT: Contact Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-8">We usually respond within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Name</label>
                  <input type="text" required className="w-full bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company</label>
                  <input type="text" className="w-full bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Brand Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <input type="email" required className="w-full bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service Interest</label>
                <select className="w-full bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors">
                  <option>Screen Printing</option>
                  <option>Heat Transfers</option>
                  <option>Designing Services</option>
                  <option>Bulk Manufacturing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us about your project requirements..." />
              </div>

              <button 
                disabled={formStatus === "sending" || formStatus === "success"}
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2
                  ${formStatus === "success" 
                    ? "bg-green-500 text-white" 
                    : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                {formStatus === "idle" && (
                  <>Send Message <Send size={18} /></>
                )}
                {formStatus === "sending" && (
                  <span className="animate-pulse">Sending...</span>
                )}
                {formStatus === "success" && (
                  <>Message Sent <CheckCircle size={18} /></>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Google Maps Embed */}
          <div className="relative min-h-100 lg:min-h-full bg-[#151515]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.166258079089!2d79.9654!3d6.8706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTInMTQuMiJOIDc5wrA1Nyc1NS40IkU!5e0!3m2!1sen!2slk!4v1634567890123!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(85%)" }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Colour Plus Location"
              className="absolute inset-0"
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 text-white">
                <Clock className="text-blue-500" size={20} />
                <div>
                  <div className="font-bold text-sm">Operating Hours</div>
                  <div className="text-xs text-gray-400">Mon - Fri: 8:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}