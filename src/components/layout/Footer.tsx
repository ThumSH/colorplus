"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* TOP SECTION: CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-20 mb-16 gap-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              LETS PRINT <br />
              <span className="text-red-600">SOMETHING.</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Ready to elevate your brand merchandise? Get a quote today and see the difference quality makes.
            </p>
          </div>
          
          <button className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center gap-3">
            Get a Quote <ArrowRight />
          </button>
        </div>

        {/* MIDDLE SECTION: Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-1 mb-6">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-10 border-b-red-600 border-r-[6px] border-r-transparent" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-10 border-b-red-600 border-r-[6px] border-r-transparent -ml-1" />
                <span className="text-xl font-bold tracking-widest text-gray-200">
                  COLOR<span className="text-white">PLUS</span>
                </span>
             </div>
             <p className="text-gray-500 text-sm">
               Premium screen printing services based in Sri Lanka. delivering worldwide.
             </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Screen Printing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Embroidery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Relabeling</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Fulfillment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="text-gray-500 text-sm">hello@colorplus.com</p>
            <p className="text-gray-500 text-sm">+94 77 123 4567</p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 text-gray-600 text-xs uppercase tracking-wider">
          <p>&copy; 2025 ColorPlus Printing. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}