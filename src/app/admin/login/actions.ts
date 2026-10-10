"use server";

import { and, count, eq, gt, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getDb } from "@/db/client";
import { adminUsers, loginAttempts } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, sha256 } from "@/lib/auth/session";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

const loginSchema = z.object({
  email: z.email().trim().toLowerCase().max(254),
  password: z.string().min(1).max(200),
});

export type LoginState = { error: string | null };

// Compared against when the email is unknown, so both paths take the same time.
// Created lazily: Workers do not allow random values outside a request.
let dummyHash: Promise<string> | undefined;
const getDummyHash = () => (dummyHash ??= hashPassword("not-a-real-password"));

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Please enter your email and password." };
  }

  const { email, password } = parsed.data;
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const ipHash = await sha256(ip);
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
  const db = await getDb();

  const [recent] = await db
    .select({ total: count() })
    .from(loginAttempts)
    .where(and(eq(loginAttempts.ipHash, ipHash), gt(loginAttempts.attemptedAt, windowStart)));

  if ((recent?.total ?? 0) >= MAX_ATTEMPTS) {
    return {
      error: `Too many failed attempts. Please wait ${WINDOW_MINUTES} minutes and try again.`,
    };
  }

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  const valid = await verifyPassword(password, user?.passwordHash ?? (await getDummyHash()));

  if (!user || !valid) {
    await db.insert(loginAttempts).values({ ipHash, email });
    return { error: "The email or password is incorrect." };
  }

  await db.delete(loginAttempts).where(eq(loginAttempts.ipHash, ipHash));
  // Keep the attempts table small: anything older than a day is no longer useful.
  await db
    .delete(loginAttempts)
    .where(lt(loginAttempts.attemptedAt, new Date(Date.now() - 24 * 60 * 60 * 1000)));
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));
  await createSession(user.id);

  redirect("/admin");
}
