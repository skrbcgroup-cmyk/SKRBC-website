import "server-only";

import { and, eq, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { getDb } from "@/db/client";
import { adminUsers, sessions } from "@/db/schema";

export const SESSION_COOKIE = "skrbc_admin_session";
const SESSION_DAYS = 7;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

export type AdminSession = { userId: number; name: string; email: string };

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** SHA-256 hex digest. Used so raw tokens and IPs are never stored. */
export async function sha256(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

/** Creates a session row and sets the httpOnly cookie that holds its token. */
export async function createSession(userId: number): Promise<void> {
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
  const expiresAt = new Date(Date.now() + SESSION_MS);
  const db = await getDb();

  await db.insert(sessions).values({ id: await sha256(token), userId, expiresAt });
  // Opportunistic clean-up of expired sessions, so the table stays small.
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    expires: expiresAt,
  });
}

/**
 * Returns the signed-in admin, or null. Checked against the database on every call,
 * and cached for the duration of a single request.
 */
export const getSession = cache(async (): Promise<AdminSession | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getDb();
  const [row] = await db
    .select({ userId: adminUsers.id, name: adminUsers.name, email: adminUsers.email })
    .from(sessions)
    .innerJoin(adminUsers, eq(sessions.userId, adminUsers.id))
    .where(and(eq(sessions.id, await sha256(token)), gt(sessions.expiresAt, new Date())))
    .limit(1);

  return row ?? null;
});

/** Use at the top of every admin page and admin server action. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDb();
    await db.delete(sessions).where(eq(sessions.id, await sha256(token)));
  }
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
}
