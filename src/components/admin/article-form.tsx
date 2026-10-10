"use client";

import { ExternalLink, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState, useTransition, type ReactNode } from "react";

import {
  deleteArticle,
  saveArticle,
  uploadArticleImage,
  type ArticleInput,
} from "@/app/admin/(panel)/articles/actions";
import { CoverImageField } from "@/components/admin/cover-image-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { insightCategories } from "@/content/insight-categories";
import { cn } from "@/lib/cn";
import { plainText, sanitizeDoc } from "@/lib/rich-text";
import { slugify } from "@/lib/slug";

type FieldErrors = Partial<Record<keyof ArticleInput, string[]>>;

export type ArticleFormValues = Omit<ArticleInput, "intent" | "category"> & {
  category: string;
  status: "draft" | "published";
};

const inputClass =
  "block h-12 w-full border bg-white px-4 text-base text-ink transition-colors hover:border-slate/60 focus:border-navy-900";

function Field({
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

export function ArticleForm({
  initial,
  initialEditorJson,
  savedNotice,
}: {
  initial: ArticleFormValues;
  initialEditorJson: object;
  /** Set after the first save of a new article, which moves to its edit page. */
  savedNotice?: "draft" | "published";
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.id));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(
    savedNotice
      ? {
          tone: "success",
          text: savedNotice === "published" ? "Article published." : "Draft saved.",
        }
      : null,
  );

  // Clear the one-time notice from the address bar.
  useEffect(() => {
    if (savedNotice) router.replace(`/admin/articles/${initial.id}`, { scroll: false });
  }, [savedNotice, initial.id, router]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ArticleFormValues>(key: K, value: ArticleFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Editing a field clears its error message.
    setErrors((current) => (key in current ? { ...current, [key]: undefined } : current));
  };

  const submit = (intent: "draft" | "publish") => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveArticle({
        ...values,
        category: values.category as ArticleInput["category"],
        intent,
      });
      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setMessage({ tone: "error", text: result.error });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setErrors({});
      setValues((current) => ({ ...current, id: result.id, status: result.status }));
      setMessage({
        tone: "success",
        text: result.status === "published" ? "Article published." : "Draft saved.",
      });
      if (!values.id) router.replace(`/admin/articles/${result.id}?saved=${result.status}`);
      else router.refresh();
    });
  };

  const remove = () => {
    if (!values.id) return;
    startTransition(async () => {
      const result = await deleteArticle(values.id!);
      if (result.ok) {
        router.replace("/admin/articles");
        router.refresh();
      } else {
        setMessage({ tone: "error", text: "This article could not be deleted." });
      }
    });
  };

  const isPublished = values.status === "published";
  const articleLength = useMemo(
    () => plainText(sanitizeDoc(values.content)).length,
    [values.content],
  );
  const first = (key: keyof ArticleInput) => errors[key]?.[0];

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/articles" className="text-sm text-gold-700 hover:underline">
            Back to insights
          </Link>
          <h1 className="mt-2 text-3xl text-navy-900">
            {values.id ? "Edit article" : "New article"}
          </h1>
        </div>
        <span
          className={cn(
            "rounded-xs px-3 py-1 text-sm font-medium",
            isPublished ? "bg-[#e6f4ea] text-[#1e6b34]" : "bg-white text-slate",
          )}
        >
          {isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {message && (
        <p
          role={message.tone === "error" ? "alert" : "status"}
          className={cn(
            "mt-6 border-l-2 bg-white px-4 py-3 text-sm",
            message.tone === "error"
              ? "border-danger text-danger"
              : "border-[#1e6b34] text-[#1e6b34]",
          )}
        >
          {message.text}
          {message.tone === "success" && isPublished && (
            <>
              {" "}
              <a
                href={`/insights/${values.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline"
              >
                View on website <ExternalLink aria-hidden="true" className="size-3.5" />
              </a>
            </>
          )}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-7">
          <Field label="Title" error={first("title")}>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                value={values.title}
                maxLength={150}
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                onChange={(event) => {
                  set("title", event.target.value);
                  if (!slugTouched) set("slug", slugify(event.target.value));
                }}
                className={cn(
                  inputClass,
                  "font-serif text-xl",
                  invalid ? "border-danger" : "border-line",
                )}
              />
            )}
          </Field>

          <Field
            label="Summary"
            hint={`Shown on the Insights page and in search results. At least 20 characters to publish. ${values.excerpt.trim().length} / 300`}
            error={first("excerpt")}
          >
            {({ id, describedBy, invalid }) => (
              <textarea
                id={id}
                rows={3}
                maxLength={300}
                value={values.excerpt}
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                onChange={(event) => set("excerpt", event.target.value)}
                className={cn(
                  "block w-full resize-y border bg-white px-4 py-3 text-base text-ink focus:border-navy-900",
                  invalid ? "border-danger" : "border-line",
                )}
              />
            )}
          </Field>

          <Field
            label="Article"
            hint={`At least 50 characters of text to publish. ${articleLength} characters so far.`}
            error={first("content")}
          >
            {({ id, describedBy, invalid }) => (
              <RichTextEditor
                id={id}
                initialContent={initialEditorJson}
                describedBy={describedBy}
                invalid={invalid}
                uploadImage={uploadArticleImage}
                onChange={(json) => set("content", json)}
              />
            )}
          </Field>
        </div>

        <aside className="space-y-6">
          <div className="space-y-3 bg-white p-5">
            <button
              type="button"
              disabled={pending}
              onClick={() => submit("publish")}
              className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xs bg-gold-500 px-5 font-medium text-navy-900 hover:bg-gold-400 disabled:cursor-wait disabled:opacity-70"
            >
              {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
              {isPublished ? "Update" : "Publish"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => submit("draft")}
              className="min-h-11 w-full cursor-pointer rounded-xs border border-line px-5 text-[0.9375rem] text-navy-900 hover:border-navy-900 disabled:opacity-70"
            >
              {isPublished ? "Unpublish (move to drafts)" : "Save draft"}
            </button>
          </div>

          <div className="space-y-6 bg-white p-5">
            <Field label="Category" error={first("category")}>
              {({ id, describedBy, invalid }) => (
                <select
                  id={id}
                  value={values.category}
                  aria-describedby={describedBy}
                  aria-invalid={invalid || undefined}
                  onChange={(event) => set("category", event.target.value)}
                  className={cn(
                    inputClass,
                    "cursor-pointer",
                    invalid ? "border-danger" : "border-line",
                  )}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {insightCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              label="Web address"
              hint={`/insights/${values.slug || "..."}`}
              error={first("slug")}
            >
              {({ id, describedBy, invalid }) => (
                <input
                  id={id}
                  value={values.slug}
                  maxLength={80}
                  aria-describedby={describedBy}
                  aria-invalid={invalid || undefined}
                  onChange={(event) => {
                    setSlugTouched(true);
                    set("slug", slugify(event.target.value) || event.target.value.toLowerCase());
                  }}
                  className={cn(
                    inputClass,
                    "text-[0.9375rem]",
                    invalid ? "border-danger" : "border-line",
                  )}
                />
              )}
            </Field>
          </div>

          <div className="bg-white p-5">
            <p className="mb-3 text-[0.9375rem] font-medium text-navy-900">
              Cover image <span className="ml-1 text-sm font-normal text-slate">(optional)</span>
            </p>
            <CoverImageField
              imageKey={values.coverImageKey}
              alt={values.coverImageAlt ?? ""}
              uploadImage={uploadArticleImage}
              onChange={({ key, alt }) =>
                setValues((current) => ({ ...current, coverImageKey: key, coverImageAlt: alt }))
              }
            />
          </div>

          <details className="bg-white p-5">
            <summary className="cursor-pointer text-[0.9375rem] font-medium text-navy-900">
              Search engine settings
            </summary>
            <div className="mt-5 space-y-6">
              <Field
                label="SEO title"
                optional
                hint={`Leave empty to use the article title. ${values.seoTitle?.length ?? 0} / 70`}
                error={first("seoTitle")}
              >
                {({ id, describedBy }) => (
                  <input
                    id={id}
                    value={values.seoTitle}
                    maxLength={70}
                    aria-describedby={describedBy}
                    onChange={(event) => set("seoTitle", event.target.value)}
                    className={cn(inputClass, "border-line text-[0.9375rem]")}
                  />
                )}
              </Field>
              <Field
                label="SEO description"
                optional
                hint={`Leave empty to use the summary. ${values.seoDescription?.length ?? 0} / 160`}
                error={first("seoDescription")}
              >
                {({ id, describedBy }) => (
                  <textarea
                    id={id}
                    rows={3}
                    maxLength={160}
                    value={values.seoDescription}
                    aria-describedby={describedBy}
                    onChange={(event) => set("seoDescription", event.target.value)}
                    className="block w-full resize-y border border-line bg-white px-3 py-2 text-[0.9375rem] focus:border-navy-900"
                  />
                )}
              </Field>
            </div>
          </details>

          {values.id && (
            <div className="bg-white p-5">
              {confirmDelete ? (
                <div className="space-y-3">
                  <p className="text-sm text-ink">
                    Delete this article permanently? This cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={remove}
                      className="min-h-10 flex-1 cursor-pointer rounded-xs bg-danger px-4 text-sm font-medium text-white"
                    >
                      Yes, delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="min-h-10 flex-1 cursor-pointer rounded-xs border border-line px-4 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="min-h-10 cursor-pointer text-sm text-danger hover:underline"
                >
                  Delete article
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
