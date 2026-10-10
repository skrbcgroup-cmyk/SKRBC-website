import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/admin/article-form";
import { getDb } from "@/db/client";
import { articles } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { sanitizeDoc, toEditorJson } from "@/lib/rich-text";

export const metadata: Metadata = { title: "Edit Article" };

export default async function EditArticlePage({
  params,
  searchParams,
}: PageProps<"/admin/articles/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const db = await getDb();
  const [article] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!article) notFound();

  const doc = sanitizeDoc(article.content);
  const saved = (await searchParams).saved;

  return (
    <ArticleForm
      savedNotice={saved === "draft" || saved === "published" ? saved : undefined}
      initial={{
        id: article.id,
        title: article.title,
        slug: article.slug,
        category: article.category,
        excerpt: article.excerpt,
        content: JSON.stringify(toEditorJson(doc)),
        coverImageKey: article.coverImageKey,
        coverImageAlt: article.coverImageAlt ?? "",
        seoTitle: article.seoTitle ?? "",
        seoDescription: article.seoDescription ?? "",
        status: article.status,
      }}
      initialEditorJson={
        doc.length > 0 ? toEditorJson(doc) : { type: "doc", content: [{ type: "paragraph" }] }
      }
    />
  );
}
