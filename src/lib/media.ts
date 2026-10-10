import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Images are resized to WebP in the browser before upload; these are server-side limits. */
export const MAX_UPLOAD_BYTES = 2.5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/** Public URL for a stored media key, served by src/app/media/[...key]/route.ts. */
export function mediaUrl(key: string): string {
  return `/media/${key}`;
}

/** Keys look like "uploads/2026/<uuid>.webp". */
export function isValidMediaKey(key: string): boolean {
  return /^uploads\/\d{4}\/[0-9a-f-]{36}\.(webp|jpg|png)$/.test(key);
}

/** Checks the file's first bytes, so a renamed non-image file is rejected. */
async function hasImageSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes[0] === 0x89 && ascii(1, 4) === "PNG";
  const isWebp = ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP";
  return isJpeg || isPng || isWebp;
}

export type UploadResult = { ok: true; key: string; src: string } | { ok: false; error: string };

export async function storeImage(file: unknown): Promise<UploadResult> {
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Please choose an image to upload." };
  }
  const extension = allowedTypes[file.type];
  if (!extension || !(await hasImageSignature(file))) {
    return { ok: false, error: "Only JPG, PNG and WebP images can be uploaded." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "This image is too large. Please use one under 2.5 MB." };
  }

  const key = `uploads/${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${extension}`;
  const { env } = await getCloudflareContext({ async: true });
  await env.MEDIA.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type,
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return { ok: true, key, src: mediaUrl(key) };
}

export async function deleteImage(key: string | null | undefined): Promise<void> {
  if (!key || !isValidMediaKey(key)) return;
  const { env } = await getCloudflareContext({ async: true });
  await env.MEDIA.delete(key);
}
