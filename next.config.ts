import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old models page was replaced by the standalone 3D portfolio
  async redirects() {
    return [{ source: "/models", destination: "/3d", permanent: true }];
  },
};

export default nextConfig;
