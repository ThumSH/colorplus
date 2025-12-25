"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* TOP SECTION: CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-20 mb-16 gap-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              LETS PRINT <br />
              <span className="text-red-600">EXCELLENCE.</span>
            </h2>
            <p className="text-gray-400 max-w-md text-lg">
              Ready to elevate your brand with export-quality printing? Get a quote today and experience the difference.
            </p>
          </div>
          <div className="mb-2">
             <Link 
                href="/contact" 
                className="group flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:gap-6 transition-all"
             >
                Start a Project
                <span className="bg-white text-black rounded-full p-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                   <ArrowRight size={24} />
                </span>
             </Link>
          </div>
        </div>

        {/* MIDDLE SECTION: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="block relative h-16 w-auto aspect-5/3 mb-4">
                 <Image
                    src="/CP.webp" 
                    alt="Colour Plus Logo"
                    width={160}
                    height={100}
                    className="object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                    priority
                 />
             </Link>
             <span
                className={`${cinzel.className} text-[10px] tracking-[0.2em] text-gray-400 block mb-6`}
             >
                PRINTING SYSTEMS (PVT) LTD
             </span>
             <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Screen printing at its finest. Established in 2009, serving global brands with superlative quality and compliance.
             </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Our Services</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Product Portfolio</Link></li>
              <li><Link href="/techniques" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Print Techniques</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Capabilities</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/techniques" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Direct Screen Printing</Link></li>
              <li><Link href="/techniques" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Heat Transfers</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Designing Services</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Accessory Sourcing</Link></li>
            </ul>
          </div>

          {/* Contact Column  */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <div className="space-y-4 text-gray-400 text-sm">
               <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-red-600" />
                  <span className="leading-relaxed">
                     564/A, Athurugiriya Road, <br/>Kottawa, Sri Lanka.
                  </span>
               </div>
               
               <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-blue-600" />
                  <a href="tel:0094112781525" className="hover:text-white transition-colors">
                     (00 94) 112781525
                  </a>
               </div>

               <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-emerald-600" />
                  <a href="mailto:colourplus@sltnet.lk" className="hover:text-white transition-colors">
                     colourplus@sltnet.lk
                  </a>
               </div>
            </div>

            {/* Social Icons Placeholder */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR 
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 text-gray-600 text-xs uppercase tracking-wider">
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
        */}
        <p>&copy; 2025 Colour Plus Printing Systems (Pvt) Ltd.</p>

      </div>
    </footer>
  );
}