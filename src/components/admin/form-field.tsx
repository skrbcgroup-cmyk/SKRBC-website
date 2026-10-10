"use client";

import { useId, type ReactNode } from "react";

export const adminInputClass =
  "block h-12 w-full border bg-white px-4 text-base text-ink transition-colors hover:border-slate/60 focus:border-navy-900";

/** Label, hint and error wired to a control for screen readers. */
export function AdminField({
  label,
  hint,
  error,
  optional,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ");
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium text-navy-900">
        {label}
        {optional && <span className="ml-2 text-sm font-normal text-slate">(optional)</span>}
      </label>
      {children({ id, describedBy: describedBy || undefined, invalid: !!error })}
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
