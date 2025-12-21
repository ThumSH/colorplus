"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        isScrolled ? "bg-black/60 backdrop-blur-md" : "bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left: Logo */}
      <Link href="/" className="flex flex-col items-start group">
          <div className="flex items-center gap-1">
            {/* The Red Icon Element */}
            <div className="w-0 h-0 border-l-8 border-l-transparent border-b-14 border-b-red-600 border-r-8 border-r-transparent" />
            <div className="w-0 h-0 border-l-8 border-l-transparent border-b-14 border-b-red-600 border-r-8 border-r-transparent -ml-1" />
            <span className="text-2xl font-sans tracking-widest font-bold text-gray-200 group-hover:text-white transition-colors">
              COLOR<span className="text-white">PLUS</span>
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 ml-1">
            Printing Excellence
          </span>
        </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-bold text-gray-300 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right: Contact Button */}
     <div className="flex justify-end">
  <Link 
    href="/contact" 
    // Changes: rounded-sm (industrial), added shadow glow, adjusted padding
    className="group flex items-center gap-3 bg-red-600 text-white px-4 py-5 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-red-700 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]"
  >
    {/* Icon rotates slightly on hover */}
    <Phone size={16} className="group-hover:rotate-12 transition-transform duration-300" />
    <span>Contact Us</span>
  </Link>
</div>
    </nav>
  );
}