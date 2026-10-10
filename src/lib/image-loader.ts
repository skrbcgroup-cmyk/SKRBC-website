import type { ImageLoaderProps } from "next/image";

/**
 * Maps a next/image request to a pre-built WebP file from scripts/optimize-images.mjs,
 * e.g. ("/images/hero", 1920) becomes "/images/hero-1920.webp".
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  return `${src}-${width}.webp`;
}
