"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, Droplets } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { name: "Home", href: "/" },
  { name: "Company Profile", href: "/about" }, 
  { name: "Our Services", href: "/services" }, 
  { name: "Products", href: "/products" },    
  { name: "Techniques", href: "/technique" }, 
];

const secondaryLinks = [
  { name: "Contact Us", href: "/contact" },
];

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

// Ink Drop Indicator
const InkDrops = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-1 ${className}`}>
    {[0, 0.1, 0.2].map((delay, i) => (
      <div 
        key={i}
        className="w-1 h-1 rounded-full bg-sky-400 animate-pulse"
        style={{ 
          animationDelay: `${delay}s`,
          boxShadow: '0 0 4px rgba(14, 165, 233, 0.6)'
        }}
      />
    ))}
  </div>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
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

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Body/Nav Padding locking
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const navElement = navRef.current;

    if (!open) {
      body.style.overflow = "";
      body.style.paddingRight = "";
      if (navElement) navElement.style.paddingRight = "";
      return;
    }

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;
    
    if (navElement) navElement.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
      if (navElement) navElement.style.paddingRight = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* TOP BAR */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 h-24 flex items-center justify-center transition-all duration-300 z-9999
        ${isScrolled
            ? "backdrop-blur-lg border-b border-sky-500/20 shadow-lg shadow-sky-500/5"
            : "bg-transparent"
          }`}
      >
        {/* Simplified background: The complex gradients and patterns have been removed. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute left-6 md:left-12 text-gray-300 hover:text-sky-400 transition-colors p-2 cursor-pointer group"
          aria-label="Open Menu"
        >
          <Menu size={32} className="group-hover:scale-110 transition-transform" />
          <InkDrops className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <Link
          href="/"
          className="flex flex-col items-center group select-none"
          onClick={handleLogoClick}
        >
          <div className="flex items-center justify-center relative h-20 w-auto aspect-6/2">
            <Image
              src="/CP.webp" 
              alt="Colour Plus Logo"
              width={200}
              height={100}
              className="object-cover  hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3),0_0_30px_rgba(14,165,233,0.3)] transition-all duration-500 hover:scale-105"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <InkDrops className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <span
              className={`${poppins.className} text-[10px] md:text-[10px] tracking-[0.2em] text-gray-200 mt-1 group-hover:text-sky-300 transition-colors`}
            >
              COLOUR PLUS PRINTING SYSTEM (PVT) LTD
            </span>
            <InkDrops className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>

        <div className="absolute right-6 md:right-12 hidden md:block">
          <Link 
            href="/contact" 
            className="group relative text-xs font-bold tracking-widest uppercase text-white border border-white/20 px-5 py-2.5 hover:bg-sky-500/20 hover:border-sky-400/50 transition-all duration-300"
          >
            <span className="relative z-10">Contact us</span>
          </Link>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-9998 bg-black/80 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-100 bg-[#0a0f1a] border-r border-sky-500/10 shadow-2xl z-9999
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full p-8 md:p-12 relative overflow-hidden">
          {/* Simplified background: The complex gradients, patterns, and blurred shapes have been removed. */}
          <div className="flex justify-between items-center mb-12 relative z-10">
            <div className="flex items-center gap-3">
              <InkDrops />
              <Droplets className="text-sky-400" size={14} />
              <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Menu</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-all p-2 hover:rotate-180 duration-500 group"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            {primaryLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative group tracking-widest uppercase text-md font-light text-gray-300 hover:text-white transition-all hover:translate-x-2 flex items-center gap-4"
              >
                <span className="text-xs font-bold text-gray-700 group-hover:text-sky-400 transition-colors">0{i+1}</span>
                <InkDrops className="opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <hr className="border-sky-900/30 my-8 relative z-10" />

          <div className="flex flex-col gap-5 relative z-10">
            <div className="text-gray-400 text-sm flex items-start gap-3 tracking-widest uppercase">
              <MapPin size={16} className="mt-1 text-sky-500" />
              <span>564/A, Athurugiriya Road,<br/>Kottawa, Sri Lanka.</span>
            </div>
            
            <a href="tel:0094112781525" className="text-gray-400 text-sm flex items-center gap-3 tracking-widest uppercase hover:text-sky-400 transition-colors group">
              <Phone size={16} className="text-sky-500" />
              (+94) 112781525
              <InkDrops className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a href="mailto:colourplus@sltnet.lk" className="text-gray-400 text-sm flex items-center gap-3 hover:text-sky-400 transition-colors tracking-widest uppercase group">
              <Mail size={16} className="text-sky-500" />
              colourplus@sltnet.lk
              <InkDrops className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-4 relative z-10">
            {secondaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group relative text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 p-4 text-center rounded-sm uppercase tracking-widest transition-colors duration-300"
              >
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
            
            <div className="text-center text-gray-600 text-[10px] tracking-widest uppercase mt-4 flex items-center justify-center gap-2">
              <InkDrops />
              <span>© {new Date().getFullYear()} Colour Plus Printing Systems</span>
              <InkDrops />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}