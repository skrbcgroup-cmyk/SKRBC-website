/**
 * Creates an admin account, or resets its password if the email already exists.
 *
 *   npm run admin:create -- --email owner@example.com --name "Full Name"            (local)
 *   npm run admin:create -- --email owner@example.com --name "Full Name" --remote   (production)
 *
 * A strong random password is generated and printed once. It is never stored in plain text.
 * The hash format matches src/lib/auth/password.ts.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";

const ITERATIONS = 10_000;
const PASSWORD_LENGTH = 24;
// No look-alike characters (0/O, 1/l/I), so the password is easy to copy correctly.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    name: { type: "string" },
    remote: { type: "boolean", default: false },
  },
});

const email = values.email?.trim().toLowerCase();
const name = values.name?.trim();
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name) {
  console.error(
    'Usage: npm run admin:create -- --email you@example.com --name "Full Name" [--remote]',
  );
  process.exit(1);
}

function generatePassword() {
  const limit = 256 - (256 % ALPHABET.length); // avoid modulo bias
  let password = "";
  while (password.length < PASSWORD_LENGTH) {
    for (const byte of crypto.getRandomValues(new Uint8Array(PASSWORD_LENGTH * 2))) {
      if (byte < limit && password.length < PASSWORD_LENGTH)
        password += ALPHABET[byte % ALPHABET.length];
    }
  }
  return password;
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
    key,
    256,
  );
  const b64 = (bytes) => Buffer.from(bytes).toString("base64");
  return ["pbkdf2-sha256", ITERATIONS, b64(salt), b64(new Uint8Array(bits))].join("$");
}

const sqlString = (value) => `'${value.replaceAll("'", "''")}'`;

const password = generatePassword();
const passwordHash = await hashPassword(password);

const sql = `
INSERT INTO admin_users (email, name, password_hash)
VALUES (${sqlString(email)}, ${sqlString(name)}, ${sqlString(passwordHash)})
ON CONFLICT(email) DO UPDATE SET name = excluded.name, password_hash = excluded.password_hash;
DELETE FROM sessions WHERE user_id = (SELECT id FROM admin_users WHERE email = ${sqlString(email)});
`;

const dir = mkdtempSync(path.join(tmpdir(), "skrbc-admin-"));
const file = path.join(dir, "admin.sql");
try {
  writeFileSync(file, sql);
  // Run wrangler through Node directly: no shell, so paths with spaces stay intact.
  const wranglerPackage = createRequire(import.meta.url).resolve("wrangler/package.json");
  const wrangler = path.join(path.dirname(wranglerPackage), "bin", "wrangler.js");
  execFileSync(
    process.execPath,
    [wrangler, "d1", "execute", "skrbc-db", values.remote ? "--remote" : "--local", "--file", file],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log(`
Admin account ready (${values.remote ? "production" : "local"} database)
  Email:    ${email}
  Password: ${password}

Save this password in a password manager now. It is not stored anywhere and will not be shown again.
Run the same command again to reset it.
`);
