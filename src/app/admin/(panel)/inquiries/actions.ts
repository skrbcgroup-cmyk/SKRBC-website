"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getDb } from "@/db/client";
import { inquiries, inquiryStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";

const idSchema = z.number().int().positive();

export async function setInquiryStatus(
  id: number,
  status: (typeof inquiryStatus)[number],
): Promise<{ ok: boolean }> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success || !inquiryStatus.includes(status)) return { ok: false };

  const db = await getDb();
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteInquiry(id: number): Promise<{ ok: boolean }> {
  await requireAdmin();
  if (!idSchema.safeParse(id).success) return { ok: false };

  const db = await getDb();
  await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}
