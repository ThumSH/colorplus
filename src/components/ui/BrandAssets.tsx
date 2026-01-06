"use client";

// ... (Keep your existing BaseGrid and AmbientCorners helpers here) ...
export const BaseGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 opacity-[0.73]"
      style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }} 
    />
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />
  </div>
);


// --- UPDATED COMPONENT: APPAREL MESH (With Size Control) ---
export const ApparelMesh = ({ 
  variant = "micro", 
  opacity = 0.15,
  color = "#38bdf8",
  splitCenter = false,
  scale = 1 // <--- NEW DEFAULT SCALE (1 = Normal, 2 = Double Size, etc.)
}: { 
  variant?: "sport" | "micro"; 
  opacity?: number;
  color?: string;
  splitCenter?: boolean;
  scale?: number;
}) => {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        maskImage: splitCenter 
          ? "linear-gradient(to right, black 0%, black 40%, transparent 45%, transparent 55%, black 60%, black 100%)"
          : undefined,
        WebkitMaskImage: splitCenter 
          ? "linear-gradient(to right, black 0%, black 40%, transparent 45%, transparent 55%, black 60%, black 100%)" 
          : undefined
      }}
    >
      <svg className="w-full h-full" style={{ opacity }}>
        <defs>
          {/* VARIANT A: SPORT MESH (Hex/Honeycomb Look) */}
          <pattern 
            id="mesh-sport" 
            x="0" 
            y="0" 
            width="20" 
            height="34" 
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(${scale})`} // <--- THIS CONTROLS THE SIZE
          >
            <path d="M10 0 L20 5 V15 L10 20 L0 15 V5 Z" fill="none" stroke={color} strokeWidth="1" />
            <path d="M10 17 L20 22 V32 L10 37 L0 32 V22 Z" fill="none" stroke={color} strokeWidth="1" transform="translate(10, 17)" />
          </pattern>

          {/* VARIANT B: MICRO MESH (Underwear/Oval Look) */}
          <pattern 
            id="mesh-micro" 
            x="0" 
            y="0" 
            width="12" 
            height="12" 
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(${scale})`} // <--- THIS CONTROLS THE SIZE
          >
            <rect width="100%" height="100%" fill="transparent" />
            <ellipse cx="3" cy="3" rx="1.5" ry="2.5" fill={color} opacity="0.5" />
            <ellipse cx="9" cy="9" rx="1.5" ry="2.5" fill={color} opacity="0.5" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#mesh-${variant})`} />
        
        {/* Edge Fade */}
        <rect width="100%" height="100%" fill="url(#fade-gradient)" />
        <linearGradient id="fade-gradient" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
           <stop offset="20%" stopColor="#020617" stopOpacity="0" />
           <stop offset="80%" stopColor="#020617" stopOpacity="0" />
           <stop offset="100%" stopColor="#020617" stopOpacity="0.8" />
        </linearGradient>
      </svg>
    </div>
  );
};