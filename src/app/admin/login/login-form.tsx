"use client";

import { LoaderCircle } from "lucide-react";
import { useActionState } from "react";

import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

const inputClass =
  "block h-12 w-full border border-line bg-white px-4 text-base text-ink transition-colors hover:border-slate/60 focus:border-navy-900";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="mb-2 block text-[0.9375rem] font-medium text-navy-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-[0.9375rem] font-medium text-navy-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>

      {state.error && (
        <p role="alert" className="border-l-2 border-danger bg-white px-4 py-3 text-sm text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xs bg-navy-900 px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-800 disabled:cursor-wait disabled:opacity-70"
      >
        {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
