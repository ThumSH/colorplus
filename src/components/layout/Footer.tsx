"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Linkedin, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Footer() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-20 mb-16 gap-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              LETS PRINT <br />
              <span className="text-blue-500">EXCELLENCE.</span>
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
                <span className="bg-white text-black rounded-full p-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                   <ArrowRight size={24} />
                </span>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="col-span-1 md:col-span-1">
             <Link
                href="/"
                className="block relative h-16 w-auto aspect-5/3 mb-4"
                onClick={handleLogoClick}
              >
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
                className={`${poppins.className} text-[10px] tracking-[0.2em] text-gray-400 block mb-6`}
             >
                COLOR PLUS PRINTING SYSTEMS (PVT) LTD
             </span>
             <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Screen printing at its finest. Established in 2009, serving global brands with superlative quality and compliance.
             </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Our Services</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Product Portfolio</Link></li>
              <li><Link href="/technique" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Print Techniques</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Capabilities</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/services#direct-printing" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Direct Screen Printing</Link></li>
              <li><Link href="/services#transfer-systems" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Heat Transfers</Link></li>
              <li><Link href="/services#value-added" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Designing Services</Link></li>
              <li><Link href="/services#value-added" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Accessory Sourcing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <div className="space-y-4 text-gray-400 text-sm">
               <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-blue-500" />
                  <span className="leading-relaxed">
                     564/A, Athurugiriya Road, <br/>Kottawa, Sri Lanka.
                  </span>
               </div>
               
               <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-blue-500" />
                  <a href="tel:0094112781525" className="hover:text-white transition-colors">
                     (+94) 112781525
                  </a>
               </div>

               <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-slate-400" />
                  <a href="mailto:colourplus@sltnet.lk" className="hover:text-white transition-colors">
                     colourplus@sltnet.lk
                  </a>
               </div>
            </div>

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
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-8 mt-16 border-t border-gray-800 text-gray-500 text-xs">
          <p className="mb-4 md:mb-0 order-2 md:order-1">
            &copy; {new Date().getFullYear()} Colour Plus Printing Systems (Pvt) Ltd. All Rights Reserved.
          </p>
          <p className="order-1 md:order-2 mb-4 md:mb-0">
            Developed by <a href="https://tranzixglobalimpex.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-400 hover:text-white transition-colors">Tranzix Global Impex</a>
          </p>
          </div>
        </div>
    </footer>
  );
}