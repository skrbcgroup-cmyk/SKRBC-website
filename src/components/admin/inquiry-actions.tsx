"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteInquiry, setInquiryStatus } from "@/app/admin/(panel)/inquiries/actions";
import type { inquiryStatus } from "@/db/schema";

type Status = (typeof inquiryStatus)[number];

const buttonClass =
  "min-h-10 cursor-pointer rounded-xs border border-line bg-white px-4 text-sm text-navy-900 transition-colors hover:border-navy-900 disabled:opacity-60";

export function InquiryActions({ id, status }: { id: number; status: Status }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const update = (next: Status) =>
    startTransition(async () => {
      await setInquiryStatus(id, next);
      router.refresh();
    });

  const remove = () =>
    startTransition(async () => {
      const result = await deleteInquiry(id);
      if (result.ok) {
        router.replace("/admin/inquiries");
        router.refresh();
      }
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status !== "new" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => update("new")}
          className={buttonClass}
        >
          Mark as new
        </button>
      )}
      {status === "archived" ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => update("read")}
          className={buttonClass}
        >
          Move out of archive
        </button>
      ) : (
        <button
          type="button"
          disabled={pending}
          onClick={() => update("archived")}
          className={buttonClass}
        >
          Archive
        </button>
      )}
      {confirmDelete ? (
        <span className="flex items-center gap-2">
          <span className="text-sm text-ink">Delete permanently?</span>
          <button
            type="button"
            disabled={pending}
            onClick={remove}
            className="min-h-10 cursor-pointer rounded-xs bg-danger px-4 text-sm font-medium text-white"
          >
            Yes, delete
          </button>
          <button type="button" onClick={() => setConfirmDelete(false)} className={buttonClass}>
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmDelete(true)}
          className="min-h-10 cursor-pointer px-3 text-sm text-danger hover:underline"
        >
          Delete
        </button>
      )}
    </div>
  );
}
