import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  experimental: {
    appDir: true,
  },
  distDir: "dist",
  trailingSlash: true, 
};

export default nextConfig;
