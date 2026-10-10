import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

import imageWidths from "./src/config/image-widths.json";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Images are pre-optimized at build time (scripts/optimize-images.mjs),
    // so the Worker never has to transform images at runtime.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: imageWidths.deviceSizes,
    imageSizes: imageWidths.imageSizes,
    qualities: [75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Exposes Cloudflare bindings (D1, R2, env vars) to `next dev`.
initOpenNextCloudflareForDev();
