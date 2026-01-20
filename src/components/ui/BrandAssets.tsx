"use client";

import React from "react";

// 1. Base Grid (Kept subtle background)
export const BaseGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px' 
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
);

// 2. ApparelMesh (Updated: Smaller Size & Radial Blurred Edges)
export const ApparelMesh = ({ 
  color = "#0ea5e9", 
  opacity = 0.4 
}: { 
  color?: string;
  opacity?: number;
}) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* A. Vertical Glows (Left & Right only) - Softened */}
      <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-900/10 blur-[100px]" />
      <div className="absolute top-0 bottom-0 right-0 w-1/3 bg-sky-900/10 blur-[100px]" />

      {/* B. The Side Mesh Structure */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          // MASK CHANGE: Using Radial Gradients at the edges.
          // This creates a curved, soft blur instead of a straight vertical line.
          maskImage: `
            radial-gradient(ellipse 40% 80% at 0% 50%, black 0%, transparent 100%),
            radial-gradient(ellipse 40% 80% at 100% 50%, black 0%, transparent 100%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 40% 80% at 0% 50%, black 0%, transparent 100%),
            radial-gradient(ellipse 40% 80% at 100% 50%, black 0%, transparent 100%)
          `,
          maskComposite: "add",
          WebkitMaskComposite: "source-over"
        }}
      >
        <svg className="w-full h-full" style={{ opacity }}>
          <defs>
            {/* OVAL PATTERN: Scaled DOWN for smaller structure */}
            <pattern 
              id="mesh-side-ovals" 
              x="0" 
              y="0" 
              width="14" 
              height="14" 
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.75)" 
            >
              {/* Scale changed from 1.5 -> 0.75 (50% smaller) */}
              <rect width="100%" height="100%" fill="transparent" />
              <ellipse cx="3.5" cy="3.5" rx="1.8" ry="3" fill={color} />
              <ellipse cx="10.5" cy="10.5" rx="1.8" ry="3" fill={color} />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#mesh-side-ovals)" />
        </svg>
      </div>
    </div>
  );
};