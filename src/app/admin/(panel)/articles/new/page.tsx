import type { Metadata } from "next";

import { ArticleForm } from "@/components/admin/article-form";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = { title: "New Article" };

export default async function NewArticlePage() {
  await requireAdmin();

  return (
    <ArticleForm
      initial={{
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        coverImageKey: null,
        coverImageAlt: "",
        seoTitle: "",
        seoDescription: "",
        status: "draft",
      }}
      initialEditorJson={{ type: "doc", content: [{ type: "paragraph" }] }}
    />
  );
}
