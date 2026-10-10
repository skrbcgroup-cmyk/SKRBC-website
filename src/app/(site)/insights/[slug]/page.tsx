/* eslint-disable @next/next/no-img-element -- media images are served as-is from R2 */
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { RichText } from "@/components/rich-text/rich-text";
import { ContactCta } from "@/components/sections/contact-cta";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/navigation";
import { formatArticleDate, getPublishedArticle } from "@/lib/insights";

export const dynamic = "force-dynamic";

const loadArticle = cache(getPublishedArticle);

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = await loadArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: { type: "article", publishedTime: article.publishedAt },
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = await loadArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <section className="bg-navy-900 text-white">
        <Container className="pt-36 pb-14 sm:pt-44 sm:pb-20">
          <Link
            href={routes.insights}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-mist transition-colors hover:text-gold-400"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4" />
            All insights
          </Link>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 text-sm text-mist">
            <span className="text-xs font-semibold tracking-[0.16em] text-gold-500 uppercase">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {article.excerpt}
            </p>
          )}
        </Container>
        <div
          aria-hidden="true"
          className="h-px bg-linear-to-r from-gold-500/70 via-gold-500/20 to-transparent"
        />
      </section>

      <article className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          {article.coverImage && (
            <figure className="mb-12">
              <img
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          )}
          <RichText doc={article.doc} />
        </Container>
      </article>

      <ContactCta />
    </>
  );
}
