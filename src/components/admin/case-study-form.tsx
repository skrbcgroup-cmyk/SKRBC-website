"use client";

import { ExternalLink, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import {
  deleteCaseStudy,
  saveCaseStudy,
  uploadCaseStudyImage,
  type CaseStudyInput,
} from "@/app/admin/(panel)/case-studies/actions";
import { CoverImageField } from "@/components/admin/cover-image-field";
import { AdminField as Field, adminInputClass as inputClass } from "@/components/admin/form-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import {
  caseStudySectionFields,
  serviceOptions,
  type SectionKey,
} from "@/content/case-study-options";
import { cn } from "@/lib/cn";
import { plainText, sanitizeDoc } from "@/lib/rich-text";
import { slugify } from "@/lib/slug";

type FieldErrors = Partial<Record<keyof CaseStudyInput, string[]>>;

export type CaseStudyFormValues = Omit<CaseStudyInput, "intent"> & {
  status: "draft" | "published";
};

export function CaseStudyForm({
  initial,
  initialSections,
  savedNotice,
}: {
  initial: CaseStudyFormValues;
  /** Editor JSON for each of the six sections. */
  initialSections: Record<SectionKey, object>;
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
          text: savedNotice === "published" ? "Case study published." : "Draft saved.",
        }
      : null,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (savedNotice) router.replace(`/admin/case-studies/${initial.id}`, { scroll: false });
  }, [savedNotice, initial.id, router]);

  const set = <K extends keyof CaseStudyFormValues>(key: K, value: CaseStudyFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (key in current ? { ...current, [key]: undefined } : current));
  };

  const sectionLengths = useMemo(
    () =>
      Object.fromEntries(
        caseStudySectionFields.map((field) => [
          field.key,
          plainText(sanitizeDoc(values[field.key])).length,
        ]),
      ) as Record<SectionKey, number>,
    [values],
  );

  const submit = (intent: "draft" | "publish") => {
    setMessage(null);
    startTransition(async () => {
      const result = await saveCaseStudy({ ...values, intent });
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
        text: result.status === "published" ? "Case study published." : "Draft saved.",
      });
      if (!values.id) router.replace(`/admin/case-studies/${result.id}?saved=${result.status}`);
      else router.refresh();
    });
  };

  const remove = () => {
    if (!values.id) return;
    startTransition(async () => {
      const result = await deleteCaseStudy(values.id!);
      if (result.ok) {
        router.replace("/admin/case-studies");
        router.refresh();
      } else {
        setMessage({ tone: "error", text: "This case study could not be deleted." });
      }
    });
  };

  const isPublished = values.status === "published";
  const first = (key: keyof CaseStudyInput) => errors[key]?.[0];

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/case-studies" className="text-sm text-gold-700 hover:underline">
            Back to case studies
          </Link>
          <h1 className="mt-2 text-3xl text-navy-900">
            {values.id ? "Edit case study" : "New case study"}
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
                href={`/case-studies/${values.slug}`}
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
            hint={`Shown on the Case Studies page. At least 20 characters to publish. ${values.summary.trim().length} / 300`}
            error={first("summary")}
          >
            {({ id, describedBy, invalid }) => (
              <textarea
                id={id}
                rows={3}
                maxLength={300}
                value={values.summary}
                aria-describedby={describedBy}
                aria-invalid={invalid || undefined}
                onChange={(event) => set("summary", event.target.value)}
                className={cn(
                  "block w-full resize-y border bg-white px-4 py-3 text-base text-ink focus:border-navy-900",
                  invalid ? "border-danger" : "border-line",
                )}
              />
            )}
          </Field>

          {caseStudySectionFields.map((field, index) => (
            <Field
              key={field.key}
              label={`${String(index + 1).padStart(2, "0")}. ${field.title}`}
              hint={`${field.hint} At least 20 characters to publish. ${sectionLengths[field.key]} so far.`}
              error={first(field.key)}
            >
              {({ id, describedBy, invalid }) => (
                <RichTextEditor
                  id={id}
                  compact
                  label={field.title}
                  initialContent={initialSections[field.key]}
                  describedBy={describedBy}
                  invalid={invalid}
                  uploadImage={uploadCaseStudyImage}
                  onChange={(json) => set(field.key, json)}
                />
              )}
            </Field>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="space-y-3 bg-white p-5 lg:sticky lg:top-6">
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
            <Field label="Client or project" error={first("client")}>
              {({ id, describedBy, invalid }) => (
                <input
                  id={id}
                  value={values.client}
                  maxLength={150}
                  aria-describedby={describedBy}
                  aria-invalid={invalid || undefined}
                  onChange={(event) => set("client", event.target.value)}
                  className={cn(inputClass, invalid ? "border-danger" : "border-line")}
                />
              )}
            </Field>

            <Field label="Service" error={first("service")}>
              {({ id, describedBy, invalid }) => (
                <select
                  id={id}
                  value={values.service}
                  aria-describedby={describedBy}
                  aria-invalid={invalid || undefined}
                  onChange={(event) => set("service", event.target.value)}
                  className={cn(
                    inputClass,
                    "cursor-pointer",
                    invalid ? "border-danger" : "border-line",
                  )}
                >
                  <option value="">Choose a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              label="Web address"
              hint={`/case-studies/${values.slug || "..."}`}
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
              uploadImage={uploadCaseStudyImage}
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
                hint={`Leave empty to use the title. ${values.seoTitle?.length ?? 0} / 70`}
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
                    Delete this case study permanently? This cannot be undone.
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
                  Delete case study
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
