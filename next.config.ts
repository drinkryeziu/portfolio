import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are plain files in /public and are shown exactly as designed (no resizing or recompression).
  images: { unoptimized: true },
};

export default nextConfig;
