"use client";

import { useEffect, useState } from "react";

export type LogoTone = "dark" | "light";

export function useLogoTone(src: string) {
  const [tone, setTone] = useState<LogoTone>("dark");

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

      let total = 0;
      let count = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        if (alpha > 50) {
          total += (r + g + b) / 3;
          count++;
        }
      }

      const avg = total / count;
      setTone(avg < 140 ? "dark" : "light");
    };
  }, [src]);

  return tone;
}
