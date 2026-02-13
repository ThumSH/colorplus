import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    // Enable AVIF for better compression (fallback to WebP automatically if not supported)
    formats: ['image/avif', 'image/webp'],
    // Optional: Increase device sizes to prevent generating too many unnecessary sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;