/* eslint-disable @next/next/no-img-element -- previews of uploaded media */
"use client";

import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { useId, useRef, useState } from "react";

import { compressImage } from "@/lib/compress-image";
import type { UploadResult } from "@/lib/media";

type CoverImageFieldProps = {
  imageKey: string | null;
  alt: string;
  onChange: (value: { key: string | null; alt: string }) => void;
  uploadImage: (formData: FormData) => Promise<UploadResult>;
};

export function CoverImageField({ imageKey, alt, onChange, uploadImage }: CoverImageFieldProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const altId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const prepared = await compressImage(file, 1920);
      const formData = new FormData();
      formData.set("file", prepared.file);
      const result = await uploadImage(formData);
      if (result.ok) onChange({ key: result.key, alt });
      else setError(result.error);
    } catch {
      setError("The image could not be uploaded. Please try another file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {imageKey ? (
        <div className="space-y-4">
          <img
            src={`/media/${imageKey}`}
            alt=""
            className="aspect-[16/9] w-full border border-line object-cover"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 border border-line bg-white px-4 text-sm text-navy-900 hover:border-navy-900"
            >
              {uploading ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <ImagePlus aria-hidden="true" strokeWidth={1.75} className="size-4" />
              )}
              Replace image
            </button>
            <button
              type="button"
              onClick={() => onChange({ key: null, alt: "" })}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 px-4 text-sm text-danger"
            >
              <Trash2 aria-hidden="true" strokeWidth={1.75} className="size-4" />
              Remove
            </button>
          </div>
          <div>
            <label htmlFor={altId} className="mb-2 block text-sm font-medium text-navy-900">
              Image description
            </label>
            <input
              id={altId}
              type="text"
              value={alt}
              maxLength={200}
              onChange={(event) => onChange({ key: imageKey, alt: event.target.value })}
              placeholder="Describe the image for screen readers and search engines"
              className="block h-11 w-full border border-line bg-white px-3 text-[0.9375rem] focus:border-navy-900"
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="flex aspect-[16/9] w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-slate/50 bg-white text-slate transition-colors hover:border-navy-900 hover:text-navy-900"
        >
          {uploading ? (
            <LoaderCircle aria-hidden="true" className="size-6 animate-spin" />
          ) : (
            <ImagePlus aria-hidden="true" strokeWidth={1.5} className="size-7" />
          )}
          <span className="text-sm">{uploading ? "Uploading..." : "Upload a cover image"}</span>
          <span className="text-xs">JPG, PNG or WebP</span>
        </button>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void upload(file);
        }}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
