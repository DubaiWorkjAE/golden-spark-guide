import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // For now the home page shows the approved design sample (public/sample.html) while the full site is rebuilt.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/sample.html" }] };
  },
};

export default nextConfig;
