"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, useWatch, type FieldError } from "react-hook-form";

import { submitInquiry } from "@/app/(site)/contact/actions";
import { Turnstile, type TurnstileHandle } from "@/components/contact/turnstile";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  bestTimeOptions,
  contactMethodOptions,
  inquirySchema,
  serviceOptions,
  type Inquiry,
  type InquiryInput,
} from "@/lib/inquiry-schema";

const controlClass = cn(
  "block w-full border border-line bg-white px-4 text-base text-ink transition-colors",
  "placeholder:text-slate/70 hover:border-slate/60 focus:border-navy-900",
  "aria-invalid:border-danger",
);

type FieldProps = {
  label: string;
  required?: boolean;
  error?: FieldError;
  hint?: ReactNode;
  className?: string;
  children: (ids: { id: string; describedBy: string | undefined }) => ReactNode;
};

/** Label, control, hint and error message, wired together for screen readers. */
function Field({ label, required, error, hint, className, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium text-navy-900">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-gold-700">
            *
          </span>
        ) : (
          <span className="ml-2 text-sm font-normal text-slate">(optional)</span>
        )}
      </label>
      {children({ id, describedBy })}
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-slate">
          {hint}
        </p>
      )}
      {error?.message && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}

const defaultValues: InquiryInput = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  contactMethod: "",
  bestTime: "",
  website: "",
};

export function InquiryForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const turnstile = useRef<TurnstileHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Move focus to the confirmation so keyboard and screen reader users land on it.
  useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues,
    mode: "onTouched",
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const submitValues = async (values: Inquiry) => {
    setFormError(null);
    if (!turnstileToken) {
      setFormError("Please complete the security check above the button, then submit again.");
      return;
    }
    try {
      const result = await submitInquiry(values, turnstileToken);
      if (result.ok) {
        setSentTo(values.fullName.split(" ")[0] ?? values.fullName);
        reset(defaultValues);
        turnstile.current?.reset();
        return;
      }
      if (result.resetChallenge) turnstile.current?.reset();
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages?.[0]) {
          setError(field as keyof InquiryInput, { message: messages[0] }, { shouldFocus: true });
        }
      }
      setFormError(result.message);
    } catch {
      setFormError(
        `Something went wrong while sending your inquiry. Please try again, or message us on WhatsApp at ${siteConfig.contact.whatsapp.display}.`,
      );
    }
  };

  if (sentTo) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="scroll-mt-28 border-t-2 border-gold-500 bg-ivory p-8 outline-none sm:p-12"
      >
        <CircleCheck aria-hidden="true" strokeWidth={1.5} className="size-12 text-gold-700" />
        <h2 className="mt-6 text-3xl text-navy-900">Thank you, {sentTo}.</h2>
        <p className="mt-4 max-w-lg text-lg text-slate">
          Your inquiry has been received. We will review it and get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-8 inline-flex min-h-12 cursor-pointer items-center border border-navy-900/30 px-6 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:border-navy-900"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(submitValues)(event)}
      noValidate
      className="relative grid gap-x-6 gap-y-7 sm:grid-cols-2"
    >
      <p className="text-sm text-slate sm:col-span-2">
        Fields marked <span className="text-gold-700">*</span> are required.
      </p>

      <Field label="Full Name" required error={errors.fullName}>
        {({ id, describedBy }) => (
          <input
            id={id}
            type="text"
            autoComplete="name"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "h-12")}
            {...register("fullName")}
          />
        )}
      </Field>

      <Field label="Company Name" required error={errors.companyName}>
        {({ id, describedBy }) => (
          <input
            id={id}
            type="text"
            autoComplete="organization"
            aria-invalid={errors.companyName ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "h-12")}
            {...register("companyName")}
          />
        )}
      </Field>

      <Field label="Email" required error={errors.email}>
        {({ id, describedBy }) => (
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "h-12")}
            {...register("email")}
          />
        )}
      </Field>

      <Field label="Phone" required error={errors.phone}>
        {({ id, describedBy }) => (
          <input
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "h-12")}
            {...register("phone")}
          />
        )}
      </Field>

      <Field label="Service Required" required error={errors.service} className="sm:col-span-2">
        {({ id, describedBy }) => (
          <select
            id={id}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "h-12 cursor-pointer")}
            {...register("service")}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="Message"
        required
        error={errors.message}
        className="sm:col-span-2"
        hint={`Tell us about your business and what you need help with. ${messageLength} / 3000`}
      >
        {({ id, describedBy }) => (
          <textarea
            id={id}
            rows={6}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy}
            aria-required="true"
            className={cn(controlClass, "resize-y py-3")}
            {...register("message")}
          />
        )}
      </Field>

      <Field label="Preferred Contact Method" error={errors.contactMethod}>
        {({ id, describedBy }) => (
          <select
            id={id}
            aria-describedby={describedBy}
            className={cn(controlClass, "h-12 cursor-pointer")}
            {...register("contactMethod")}
          >
            <option value="">No preference</option>
            {contactMethodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Best Time to Contact" error={errors.bestTime}>
        {({ id, describedBy }) => (
          <select
            id={id}
            aria-describedby={describedBy}
            className={cn(controlClass, "h-12 cursor-pointer")}
            {...register("bestTime")}
          >
            <option value="">No preference</option>
            {bestTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Field>

      {/* Honeypot for spam bots: hidden from people and from screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="sm:col-span-2">
        <Turnstile
          ref={turnstile}
          siteKey={siteConfig.turnstileSiteKey}
          onToken={setTurnstileToken}
        />
      </div>

      {formError && (
        <p
          role="alert"
          className="border-l-2 border-danger bg-white px-4 py-3 text-sm text-danger sm:col-span-2"
        >
          {formError}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xs bg-gold-500 px-8 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:bg-gold-400 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
}
