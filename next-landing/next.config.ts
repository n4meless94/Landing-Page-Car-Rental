import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Landing-Page-Car-Rental",
  assetPrefix: "/Landing-Page-Car-Rental/",
  trailingSlash: true,
};

export default nextConfig;
