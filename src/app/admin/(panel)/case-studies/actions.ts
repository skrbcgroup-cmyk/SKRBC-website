"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  caseStudySectionFields,
  sectionKeys,
  serviceOptions,
  type SectionKey,
} from "@/content/case-study-options";
import { getDb } from "@/db/client";
import { caseStudies } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deleteImage, isValidMediaKey, storeImage, type UploadResult } from "@/lib/media";
import { imageKeysIn, plainText, sanitizeDoc, toEditorJson } from "@/lib/rich-text";
import { SLUG_PATTERN } from "@/lib/slug";

/** Minimum lengths (in characters) a case study needs before it can be published. */
const MIN_TITLE = 3;
const MIN_SUMMARY = 20;
const MIN_SECTION = 20;

const section = z.string().max(200_000);

const caseStudySchema = z.object({
  id: z.number().int().positive().optional(),
  intent: z.enum(["draft", "publish"]),
  title: z
    .string()
    .trim()
    .min(MIN_TITLE, { error: `The title needs at least ${MIN_TITLE} characters.` })
    .max(150),
  slug: z
    .string()
    .trim()
    .max(80)
    .regex(SLUG_PATTERN, { error: "Use lowercase letters, numbers and hyphens only." }),
  client: z.string().trim().max(150),
  service: z.string().refine((value) => value === "" || serviceOptions.includes(value), {
    error: "Please choose a service.",
  }),
  summary: z.string().trim().max(300, { error: "Keep the summary under 300 characters." }),
  clientProject: section,
  challenge: section,
  assessment: section,
  recommendations: section,
  consultingSupport: section,
  outcome: section,
  coverImageKey: z.string().nullable(),
  coverImageAlt: z.string().trim().max(200),
  seoTitle: z.string().trim().max(70, { error: "Keep the SEO title under 70 characters." }),
  seoDescription: z
    .string()
    .trim()
    .max(160, { error: "Keep the SEO description under 160 characters." }),
});

export type CaseStudyInput = z.input<typeof caseStudySchema>;
export type SaveResult =
  | { ok: true; id: number; status: "draft" | "published" }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof CaseStudyInput, string[]>> };

const sectionTitles = Object.fromEntries(
  caseStudySectionFields.map((field) => [field.key, field.title]),
) as Record<SectionKey, string>;

function allImageKeys(row: Record<SectionKey, string> & { coverImageKey: string | null }) {
  return [row.coverImageKey, ...sectionKeys.flatMap((key) => imageKeysIn(sanitizeDoc(row[key])))];
}

export async function saveCaseStudy(input: CaseStudyInput): Promise<SaveResult> {
  await requireAdmin();

  const parsed = caseStudySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const data = parsed.data;
  const publishing = data.intent === "publish";
  const docs = Object.fromEntries(
    sectionKeys.map((key) => [key, sanitizeDoc(data[key])]),
  ) as Record<SectionKey, ReturnType<typeof sanitizeDoc>>;

  if (publishing) {
    const missing: Partial<Record<keyof CaseStudyInput, string[]>> = {};
    if (data.client.length < 2) missing.client = ["Add the client or project name to publish."];
    if (!data.service) missing.service = ["Choose the service this case study relates to."];
    if (data.summary.length < MIN_SUMMARY) {
      missing.summary = [
        `The summary needs at least ${MIN_SUMMARY} characters to publish. It has ${data.summary.length} now.`,
      ];
    }
    for (const key of sectionKeys) {
      const length = plainText(docs[key]).length;
      if (length < MIN_SECTION) {
        missing[key] = [
          `"${sectionTitles[key]}" needs at least ${MIN_SECTION} characters to publish. It has ${length} now.`,
        ];
      }
    }
    if (Object.keys(missing).length > 0) {
      return {
        ok: false,
        error: "This case study is not ready to publish yet.",
        fieldErrors: missing,
      };
    }
  }
  if (data.coverImageKey && !isValidMediaKey(data.coverImageKey)) {
    return { ok: false, error: "The cover image could not be found. Please upload it again." };
  }

  const db = await getDb();
  const [clash] = await db
    .select({ id: caseStudies.id })
    .from(caseStudies)
    .where(
      data.id
        ? and(eq(caseStudies.slug, data.slug), ne(caseStudies.id, data.id))
        : eq(caseStudies.slug, data.slug),
    )
    .limit(1);
  if (clash) {
    return {
      ok: false,
      error: "Another case study already uses this web address.",
      fieldErrors: { slug: ["This web address is already in use. Please change it."] },
    };
  }

  const existing = data.id
    ? (await db.select().from(caseStudies).where(eq(caseStudies.id, data.id)).limit(1))[0]
    : undefined;
  if (data.id && !existing) {
    return { ok: false, error: "This case study no longer exists." };
  }

  const values = {
    title: data.title,
    slug: data.slug,
    client: data.client,
    service: data.service,
    summary: data.summary,
    // Each section is stored in the editor's own JSON format.
    ...(Object.fromEntries(
      sectionKeys.map((key) => [key, JSON.stringify(toEditorJson(docs[key]))]),
    ) as Record<SectionKey, string>),
    coverImageKey: data.coverImageKey,
    coverImageAlt: data.coverImageAlt || null,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    status: publishing ? ("published" as const) : ("draft" as const),
    publishedAt: publishing
      ? (existing?.publishedAt ?? new Date())
      : (existing?.publishedAt ?? null),
    updatedAt: new Date(),
  };

  let id: number;
  if (existing) {
    await db.update(caseStudies).set(values).where(eq(caseStudies.id, existing.id));
    id = existing.id;

    const stillUsed = new Set(allImageKeys(values));
    await Promise.all(
      allImageKeys(existing)
        .filter((key) => key && !stillUsed.has(key))
        .map(deleteImage),
    );
    if (existing.slug !== data.slug) revalidatePath(`/case-studies/${existing.slug}`);
  } else {
    const [row] = await db.insert(caseStudies).values(values).returning({ id: caseStudies.id });
    id = row!.id;
  }

  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${data.slug}`);
  return { ok: true, id, status: values.status };
}

export async function deleteCaseStudy(id: number): Promise<{ ok: boolean }> {
  await requireAdmin();
  const db = await getDb();
  const [existing] = await db.select().from(caseStudies).where(eq(caseStudies.id, id)).limit(1);
  if (!existing) return { ok: false };

  await db.delete(caseStudies).where(eq(caseStudies.id, id));
  await Promise.all(allImageKeys(existing).map(deleteImage));

  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${existing.slug}`);
  return { ok: true };
}

export async function uploadCaseStudyImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  return storeImage(formData.get("file"));
}
