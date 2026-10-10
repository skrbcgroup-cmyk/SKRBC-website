import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Confirms with Cloudflare that a Turnstile token came from a real visitor.
 * Tokens are single use and expire after five minutes.
 */
export async function verifyTurnstile(
  token: string,
  secret: string | undefined,
  ip?: string,
): Promise<boolean> {
  if (!token || !secret) return false;

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  try {
    const response = await fetch(VERIFY_URL, { method: "POST", body });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
