"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

    const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we are already on the home page, just scroll to top smoothly.
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
        className={`fixed top-0 left-0 right-0 h-24 flex items-center justify-center transition-colors duration-300
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/5"
            : "bg-linear-to-b from-black/50 to-transparent"
        }
        z-9999`}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute left-6 md:left-12 text-gray-300 hover:text-white transition-colors p-2 cursor-pointer group"
          aria-label="Open Menu"
        >
          <Menu size={32} className="group-hover:scale-110 transition-transform" />
        </button>

        <Link
          href="/"
          className="flex flex-col items-center group select-none"
          onClick={handleLogoClick}
        >
          <div className="relative h-16 w-auto aspect-6/3">
  <Image
    src="/CP.webp" 
    alt="Colour Plus Logo"
    width={180}
    height={100}
    className="object-cover drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.9),0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 hover:scale-105"
    priority
  />
</div>
          <span
            className={`${poppins.className} text-[10px] md:text-[10px] tracking-[0.2em] text-gray-200 mt-1 group-hover:text-white transition-colors`}
          >
            COLOR PLUS PRINTING SYSTEMS
          </span>
        </Link>

        <div className="absolute right-6 md:right-12 hidden md:block">
            <Link 
                href="/contact" 
                className="text-xs font-bold tracking-widest uppercase text-white border border-white/20 px-4 py-2 hover:bg-blue-500 hover:border-blue-500 transition-all"
            >
              Contact us
            </Link>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-9998 bg-black/80 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-100 bg-[#121212] border-r border-white/10 shadow-2xl z-9999
        transform transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full p-8 md:p-12 relative overflow-hidden">
            
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex justify-between items-center mb-12 relative z-10">
            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-all p-2 hover:rotate-180 duration-500"
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
                className="relative group tracking-widest uppercase text-xl font-light text-gray-300 hover:text-white transition-all hover:translate-x-2 flex items-center gap-4"
              >
                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-500 transition-colors">0{i+1}</span>
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <hr className="border-gray-800 my-8 relative z-10" />

          <div className="flex flex-col gap-5 relative z-10">
             <div className="text-gray-400 text-sm flex items-start gap-3 tracking-widest uppercase">
                <MapPin size={16} className="mt-1 text-gray-500" />
                <span>564/A, Athurugiriya Road,<br/>Kottawa, Sri Lanka.</span>
             </div>
             
             <a href="tel:0094112781525" className="text-gray-400 text-sm flex items-center gap-3 tracking-widest uppercase hover:text-white transition-colors">
                <Phone size={16} className="text-gray-500" />
                (+94) 112781525
             </a>

             <a href="mailto:colourplus@sltnet.lk" className="text-gray-400 text-sm flex items-center gap-3 hover:text-white transition-colors tracking-widest uppercase">
                <Mail size={16} className="text-gray-500" />
                colourplus@sltnet.lk
             </a>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-4 relative z-10">
             {secondaryLinks.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 p-4 text-center rounded-sm uppercase tracking-widest transition-colors"
                >
                {link.name}
                </Link>
            ))}
            <div className="text-center text-gray-600 text-[10px] tracking-widest uppercase mt-4">
               © {new Date().getFullYear()} Colour Plus Printing Systems
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}