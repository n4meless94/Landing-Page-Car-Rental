import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to a subpath like username.github.io/repo-name, uncomment:
  // basePath: "/your-repo-name",
  // assetPrefix: "/your-repo-name/",
};

export default nextConfig;
