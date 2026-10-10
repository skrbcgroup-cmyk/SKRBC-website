import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "@/db/schema";

/** Drizzle client bound to the D1 database of the current request. */
export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}

export type Database = Awaited<ReturnType<typeof getDb>>;
