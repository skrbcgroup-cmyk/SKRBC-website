import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/** Unix time in seconds, set by the database when a row is created. */
const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

const updatedAt = () =>
  integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

export const publishStatus = ["draft", "published"] as const;
export const inquiryStatus = ["new", "read", "archived"] as const;

// ---------------------------------------------------------------------------
// Admin access
// ---------------------------------------------------------------------------

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  /** Format: pbkdf2-sha256$<iterations>$<salt b64>$<hash b64>. */
  passwordHash: text("password_hash").notNull(),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
  createdAt: createdAt(),
});

export const sessions = sqliteTable(
  "sessions",
  {
    /** SHA-256 of the session token; the raw token lives only in the cookie. */
    id: text("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: createdAt(),
  },
  (table) => [index("sessions_user_idx").on(table.userId)],
);

/** Failed sign-in attempts, used to slow down password guessing. */
export const loginAttempts = sqliteTable(
  "login_attempts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    /** SHA-256 of the client IP, so raw addresses are never stored. */
    ipHash: text("ip_hash").notNull(),
    email: text("email").notNull(),
    attemptedAt: createdAt(),
  },
  (table) => [index("login_attempts_ip_time_idx").on(table.ipHash, table.attemptedAt)],
);

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export const articles = sqliteTable(
  "articles",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    category: text("category").notNull().default(""),
    /** Editor document as JSON, sanitised by src/lib/rich-text.ts on save and on render. */
    content: text("content").notNull().default(""),
    coverImageKey: text("cover_image_key"),
    coverImageAlt: text("cover_image_alt"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    status: text("status", { enum: publishStatus }).notNull().default("draft"),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [index("articles_status_published_idx").on(table.status, table.publishedAt)],
);

/** Case studies follow the six-part structure in spec section 12. */
export const caseStudies = sqliteTable(
  "case_studies",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    client: text("client").notNull().default(""),
    service: text("service").notNull().default(""),
    summary: text("summary").notNull().default(""),
    clientProject: text("client_project").notNull().default(""),
    challenge: text("challenge").notNull().default(""),
    assessment: text("assessment").notNull().default(""),
    recommendations: text("recommendations").notNull().default(""),
    consultingSupport: text("consulting_support").notNull().default(""),
    outcome: text("outcome").notNull().default(""),
    coverImageKey: text("cover_image_key"),
    coverImageAlt: text("cover_image_alt"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    status: text("status", { enum: publishStatus }).notNull().default("draft"),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [index("case_studies_status_published_idx").on(table.status, table.publishedAt)],
);

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("full_name").notNull(),
    companyName: text("company_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    service: text("service").notNull(),
    message: text("message").notNull(),
    contactMethod: text("contact_method"),
    bestTime: text("best_time"),
    status: text("status", { enum: inquiryStatus }).notNull().default("new"),
    /** SHA-256 of the sender's IP, used only to limit how often one visitor can submit. */
    ipHash: text("ip_hash"),
    createdAt: createdAt(),
  },
  (table) => [
    index("inquiries_status_created_idx").on(table.status, table.createdAt),
    index("inquiries_ip_created_idx").on(table.ipHash, table.createdAt),
  ],
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type Inquiry = typeof inquiries.$inferSelect;
