import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/gaming-psyche" : "",
  assetPrefix: isProd ? "/gaming-psyche/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
