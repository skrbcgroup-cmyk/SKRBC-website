import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { siteImages } from "@/content/images.generated";
import { getSession } from "@/lib/auth/session";

import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign In" };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-navy-900 px-8 py-7">
          <Image
            {...siteImages.logoHorizontalOnDark}
            alt="SK Risk & Business Consulting"
            sizes="240px"
            loading="eager"
            className="h-11 w-auto"
          />
        </div>
        <div className="border-t-2 border-gold-500 bg-white p-8 shadow-[0_18px_40px_-20px_rgb(10_20_34/0.25)] sm:p-10">
          <h1 className="text-3xl text-navy-900">Admin sign in</h1>
          <p className="mt-2 mb-8 text-slate">Manage insights, case studies and inquiries.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
