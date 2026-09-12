import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * احراز هویت ساده مدیر — توکن امضاشده HMAC در کوکی httpOnly
 * نام کاربری و رمز از متغیرهای محیطی (با مقدار پیش‌فرض خواسته‌شده)
 */

export const ADMIN_COOKIE = "hamidi_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // ۳۰ روز

function secret(): string {
  return process.env.AUTH_SECRET || "hamidi-cars-admin-secret-2026";
}

export function adminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || "Admin",
    password: process.env.ADMIN_PASSWORD || "Admin-123",
  };
}

export function signToken(): string {
  const iat = Date.now().toString();
  const mac = createHmac("sha256", secret()).update(`admin|${iat}`).digest("hex");
  return `${iat}.${mac}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const iat = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(iat)) return false;

  // انقضای توکن بعد از ۳۰ روز
  const issued = Number(iat);
  if (!Number.isFinite(issued) || Date.now() - issued > MAX_AGE_SECONDS * 1000) {
    return false;
  }

  const expected = createHmac("sha256", secret()).update(`admin|${iat}`).digest("hex");
  const a = Buffer.from(mac, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function checkCredentials(username: unknown, password: unknown): boolean {
  const c = adminCredentials();
  return (
    typeof username === "string" &&
    typeof password === "string" &&
    username.trim() === c.username &&
    password === c.password
  );
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: false, // پیش‌نمایش روی HTTP سرو می‌شود؛ در production با HTTPS مقدار true
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

/** خواندن کوکی در Server Components / Route Handlers */
export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
