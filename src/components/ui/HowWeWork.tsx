"use client";

import React from "react";
import { ArrowUpRight, Printer } from "lucide-react";
import Link from "next/link";
import { OvalHexMesh, ButtonMeshBackdrop } from "./Backgrounds";
import { WorkCard, type WorkStep } from "./WorkCard";

const Highlight = ({ children, colorClass }: { children: React.ReactNode; colorClass: string }) => (
    <span className={`font-bold ${colorClass}`}>{children}</span>
);

const howWeWorkSteps: WorkStep[] = [
  {
    id: "01",
    image: "/advance.webp",
    plainTitle: "Versatile Print Techniques",
    title: (
      <>
        Versatile Print <Highlight colorClass="text-sky-400">Techniques</Highlight>
      </>
    ),
    description: "We utilize techniques tailored to your requirements, including Pigment, High Build, Puff, Gel, Silicone and Flock prints to ensure the best quality and performance execution.",
  },
  {
    id: "02",
    image: "/heat.webp",
    plainTitle: "Advanced Transfers",
    title: (
      <>
        Advanced <Highlight colorClass="text-cyan-400">Transfers</Highlight>
      </>
    ),
    description: (
      <>
        Specialized transfer printing options including{" "}
        <Highlight colorClass="text-cyan-400">Rubber Hot Split</Highlight>, Silicone,{" "}
        <Highlight colorClass="text-blue-400">Flock</Highlight>,{" "}
        <Highlight colorClass="text-sky-400">Foil</Highlight>, and{" "}
        <Highlight colorClass="text-indigo-400">Crystal/Metallic</Highlight> transfers.
      </>
    ),
  },
  {
    id: "03",
    image: "/certs2.webp",
    plainTitle: "Global Compliance",
    title: (
      <>
        Global <Highlight colorClass="text-blue-400">Compliance</Highlight>
      </>
    ),
    description: "We use inks free of hazardous chemicals. Our process meets our client's demands to export to the USA, UK, and Europe.",
  },
  {
    id: "04",
    image: "/1.4.webp",
    plainTitle: "High Capacity Output",
    title: (
      <>
        High <Highlight colorClass="text-indigo-400">Capacity</Highlight> Output
      </>
    ),
    description: "Our 10,000 sq ft factory delivers a capacity output of 300,000 - 500,000 pieces per month to meet customer demands.",
  },
];

export const HowWeWork = () => {
  return (
    <section className="relative z-10 bg-slate-950 px-4 sm:px-6 pb-40 overflow-hidden">
      <OvalHexMesh />
      
      {/* Static Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-500/10 hidden lg:block z-0" />

      <div className="mx-auto max-w-350 relative pt-24">
        <div className="text-center mb-24 relative z-10">
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            How We <span className="text-sky-400">Work</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            Our streamlined process ensures Quality, Consistency and efficiency at every step
          </p>
        </div>
        
        <div className="relative">
          {howWeWorkSteps.map((step, index) => (
            <WorkCard key={step.id} step={step} index={index} isEven={index % 2 === 0} />
          ))}
        </div>

        {/* View Techniques Button Section */}
        <div className="mt-32 flex justify-center relative z-20">
          {/* New: Localized Mesh Backdrop for the button area */}
          <ButtonMeshBackdrop />
          
          <Link href="/technique">
            <button className="group relative flex items-center gap-3 bg-slate-900 text-white uppercase tracking-[0.2em] text-[11px] font-black px-12 py-6 overflow-hidden border border-white/10 hover:border-sky-500/50 transition-colors duration-300 rounded-sm">
              <div className="absolute inset-0 bg-sky-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center gap-3 z-10">
                <Printer size={16} />
                View Techniques
                <ArrowUpRight size={16} />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};