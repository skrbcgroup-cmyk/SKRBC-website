import { defineConfig } from "drizzle-kit";

/**
 * Drizzle generates SQL migrations from src/db/schema.ts.
 * Wrangler applies them to D1 (see the db:migrate scripts in package.json).
 */
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
});
