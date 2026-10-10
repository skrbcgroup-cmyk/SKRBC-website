"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { insightCategories } from "@/content/insight-categories";
import { getDb } from "@/db/client";
import { articles } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { deleteImage, isValidMediaKey, storeImage, type UploadResult } from "@/lib/media";
import { imageKeysIn, plainText, sanitizeDoc, toEditorJson } from "@/lib/rich-text";
import { SLUG_PATTERN } from "@/lib/slug";

/** Minimum lengths (in characters) an article needs before it can be published. */
const MIN_TITLE = 3;
const MIN_SUMMARY = 20;
const MIN_CONTENT = 50;

const articleSchema = z.object({
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
  category: z.enum(insightCategories, { error: "Please choose a category." }),
  excerpt: z.string().trim().max(300, { error: "Keep the summary under 300 characters." }),
  content: z.string().max(500_000),
  coverImageKey: z.string().nullable(),
  coverImageAlt: z.string().trim().max(200),
  seoTitle: z.string().trim().max(70, { error: "Keep the SEO title under 70 characters." }),
  seoDescription: z
    .string()
    .trim()
    .max(160, { error: "Keep the SEO description under 160 characters." }),
});

export type ArticleInput = z.input<typeof articleSchema>;
export type SaveResult =
  | { ok: true; id: number; status: "draft" | "published" }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof ArticleInput, string[]>> };

export async function saveArticle(input: ArticleInput): Promise<SaveResult> {
  await requireAdmin();

  const parsed = articleSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  const data = parsed.data;
  const doc = sanitizeDoc(data.content);
  const publishing = data.intent === "publish";

  if (publishing) {
    const missing: Partial<Record<keyof ArticleInput, string[]>> = {};
    const summaryLength = data.excerpt.length;
    const contentLength = plainText(doc).length;
    if (summaryLength < MIN_SUMMARY) {
      missing.excerpt = [
        `The summary needs at least ${MIN_SUMMARY} characters to publish. It has ${summaryLength} now.`,
      ];
    }
    if (contentLength < MIN_CONTENT) {
      missing.content = [
        `The article needs at least ${MIN_CONTENT} characters of text to publish. It has ${contentLength} now.`,
      ];
    }
    if (Object.keys(missing).length > 0) {
      return {
        ok: false,
        error: "This article is not ready to publish yet.",
        fieldErrors: missing,
      };
    }
  }
  if (data.coverImageKey && !isValidMediaKey(data.coverImageKey)) {
    return { ok: false, error: "The cover image could not be found. Please upload it again." };
  }

  const db = await getDb();
  const [clash] = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      data.id
        ? and(eq(articles.slug, data.slug), ne(articles.id, data.id))
        : eq(articles.slug, data.slug),
    )
    .limit(1);
  if (clash) {
    return {
      ok: false,
      error: "Another article already uses this web address.",
      fieldErrors: { slug: ["This web address is already in use. Please change it."] },
    };
  }

  const existing = data.id
    ? (await db.select().from(articles).where(eq(articles.id, data.id)).limit(1))[0]
    : undefined;
  if (data.id && !existing) {
    return { ok: false, error: "This article no longer exists." };
  }

  const values = {
    title: data.title,
    slug: data.slug,
    category: data.category,
    excerpt: data.excerpt,
    // Stored in the editor's own JSON format, so it can be read back by sanitizeDoc().
    content: JSON.stringify(toEditorJson(doc)),
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
    await db.update(articles).set(values).where(eq(articles.id, existing.id));
    id = existing.id;

    // Remove files that are no longer used by this article.
    const stillUsed = new Set([data.coverImageKey, ...imageKeysIn(doc)]);
    const previous = [existing.coverImageKey, ...imageKeysIn(sanitizeDoc(existing.content))];
    await Promise.all(previous.filter((key) => key && !stillUsed.has(key)).map(deleteImage));

    if (existing.slug !== data.slug) revalidatePath(`/insights/${existing.slug}`);
  } else {
    const [row] = await db.insert(articles).values(values).returning({ id: articles.id });
    id = row!.id;
  }

  revalidatePath("/insights");
  revalidatePath(`/insights/${data.slug}`);
  return { ok: true, id, status: values.status };
}

export async function deleteArticle(id: number): Promise<{ ok: boolean }> {
  await requireAdmin();
  const db = await getDb();
  const [existing] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!existing) return { ok: false };

  await db.delete(articles).where(eq(articles.id, id));
  await Promise.all(
    [existing.coverImageKey, ...imageKeysIn(sanitizeDoc(existing.content))].map(deleteImage),
  );

  revalidatePath("/insights");
  revalidatePath(`/insights/${existing.slug}`);
  return { ok: true };
}

export async function uploadArticleImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  return storeImage(formData.get("file"));
}
