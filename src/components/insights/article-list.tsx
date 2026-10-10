import { ArrowRight, NotebookPen } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/navigation";
import { formatArticleDate, type ArticleSummary } from "@/lib/insights";

function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`${routes.insights}/${article.slug}`}
      className="group flex h-full flex-col border-t-2 border-gold-500 bg-ivory p-8 transition-colors duration-200 hover:bg-white hover:shadow-[0_0_0_1px_var(--color-line)]"
    >
      <p className="flex flex-wrap items-center gap-x-3 text-sm text-slate">
        <span className="text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
          {article.category}
        </span>
        <span aria-hidden="true">·</span>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
      </p>
      <h2 className="mt-4 text-2xl leading-snug text-navy-900">{article.title}</h2>
      <p className="mt-4 flex-1 text-slate">{article.excerpt}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-gold-700">
        Read article
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

function EmptyState() {
  return (
    <Reveal className="mx-auto max-w-3xl border-t-2 border-gold-500 bg-ivory px-6 py-12 text-center sm:px-14 sm:py-16">
      <NotebookPen
        aria-hidden="true"
        strokeWidth={1.25}
        className="mx-auto size-12 text-gold-700"
      />
      <h2 className="mt-6 text-[1.875rem] leading-tight text-navy-900 sm:text-4xl">
        Our first articles are on the way
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-slate">
        We are preparing practical articles on risk, claims, operations and security for businesses
        in Pakistan. In the meantime, we are happy to talk through your questions directly.
      </p>
      <div className="mt-10 flex justify-center">
        <ButtonLink href={routes.contact} arrow>
          Ask Us a Question
        </ButtonLink>
      </div>
    </Reveal>
  );
}

export function ArticleList({ articles }: { articles: ArticleSummary[] }) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        {articles.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState />
        )}
      </Container>
    </section>
  );
}
