/**
 * Browser-side image preparation for admin uploads: scales the image down to at most
 * `maxWidth` pixels wide and re-encodes it as WebP (JPEG where WebP is unsupported).
 * This keeps uploads small and means the Worker never has to process images.
 */
export async function compressImage(
  file: File,
  maxWidth = 1600,
): Promise<{ file: File; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image processing is not supported in this browser.");
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const toBlob = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.82));

  let blob = await toBlob("image/webp");
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg");
  if (!blob) throw new Error("The image could not be processed.");

  const extension = blob.type === "image/webp" ? "webp" : "jpg";
  const name = file.name.replace(/\.[^.]+$/, "") + "." + extension;
  return { file: new File([blob], name, { type: blob.type }), width, height };
}
