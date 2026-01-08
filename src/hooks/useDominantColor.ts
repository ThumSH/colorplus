"use client";

import { useEffect, useState } from "react";

export function useDominantColor(src: string) {
  const [color, setColor] = useState("rgba(255,255,255,0.35)");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const buckets: Record<string, number> = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 80) continue;

        // Ignore near-black & near-white
        if (
          (r < 30 && g < 30 && b < 30) ||
          (r > 230 && g > 230 && b > 230)
        )
          continue;

        const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }

      const dominant = Object.entries(buckets).sort((a, b) => b[1] - a[1])[0];

      if (dominant) {
        setColor(`rgba(${dominant[0]},0.45)`);
      }
    };
  }, [src]);

  return color;
}
