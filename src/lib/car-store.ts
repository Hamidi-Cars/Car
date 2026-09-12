/**
 * لایه داده و احراز هویت کاملاً سمت کلاینت (بدون نیاز به سرور)
 * تا «پنل مدیریت» روی نسخه استاتیک GitHub Pages هم فعال باشد.
 *
 * - خودروها: localStorage (فوری) + data/cars.json در مخزن گیت‌هاب (برای همه بازدیدکنندگان)
 * - حساب‌ها: حساب اصلی Admin/Admin-123 + حساب‌های ثبت‌نام‌شده در همان مرورگر
 * - همگام‌سازی: با توکن گیت‌هاب، فایل cars.json روی شاخه‌های gh-pages و main کامیت می‌شود
 */

import { BASE_PATH } from "@/lib/site";
import { DEFAULT_CARS, type SiteCar } from "@/lib/cars";

/* ------------------------------- کلیدها ------------------------------- */

export const LS_CARS = "hamidi_cars_v1";
export const LS_ACCOUNTS = "hamidi_accounts_v1";
export const LS_SESSION = "hamidi_admin_session_v1";
export const LS_GH_TOKEN = "hamidi_gh_token_v1";

/** حساب اصلی پنل مدیریت — نام کاربری در فیلد ایمیل وارد می‌شود */
export const MASTER_USERNAME = "Admin";
export const MASTER_PASSWORD = "Admin-123";

/** مخزنی که فایل داده خودروها در آن کامیت می‌شود */
export const GH_REPO = "Hamidi-Cars/Car";

const SESSION_DAYS = 30;

export type AdminAccount = { username: string; password: string };

/* --------------------------- ابزارهای امن ----------------------------- */

function safeLS(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/* ------------------------------ خودروها ------------------------------- */

/** لیست ذخیره‌شده در این مرورگر؛ null یعنی هنوز لیستی ذخیره نشده */
export function loadLocalCars(): SiteCar[] | null {
  const ls = safeLS();
  if (!ls) return null;
  try {
    const raw = ls.getItem(LS_CARS);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SiteCar[]) : null;
  } catch {
    return null;
  }
}

export type SaveResult = { ok: boolean; error?: string };

export function saveLocalCars(cars: SiteCar[]): SaveResult {
  const ls = safeLS();
  if (!ls) return { ok: false, error: "حافظه مرورگر در دسترس نیست" };
  try {
    ls.setItem(LS_CARS, JSON.stringify(cars));
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "حافظه مرورگر پر شده است. تعداد عکس‌های آپلودی را کمتر کنید یا از آدرس اینترنتی عکس استفاده کنید.",
    };
  }
}

/** واکشی لیست عمومی خودروها از فایل داده مخزن (بدون نیاز به توکن) */
export async function fetchCloudCars(): Promise<SiteCar[] | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch(`${BASE_PATH}/data/cars.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { cars?: SiteCar[] };
    return Array.isArray(data.cars) && data.cars.length > 0 ? data.cars : null;
  } catch {
    return null;
  }
}

/**
 * لیست فعلی سایت: ذخیره محلی → فایل عمومی مخزن → خودروهای پیش‌فرض
 */
export async function getEffectiveCars(): Promise<SiteCar[]> {
  const local = loadLocalCars();
  if (local !== null) return local;
  const cloud = await fetchCloudCars();
  if (cloud) return cloud;
  return DEFAULT_CARS;
}

/* --------------------------- حساب‌های مدیر ---------------------------- */

export function getAccounts(): AdminAccount[] {
  const ls = safeLS();
  if (!ls) return [];
  try {
    const parsed = JSON.parse(ls.getItem(LS_ACCOUNTS) || "[]");
    return Array.isArray(parsed) ? (parsed as AdminAccount[]) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: AdminAccount[]): boolean {
  const ls = safeLS();
  if (!ls) return false;
  try {
    ls.setItem(LS_ACCOUNTS, JSON.stringify(accounts));
    return true;
  } catch {
    return false;
  }
}

/** آیا این حساب مجاز به ورود است؟ (حساب اصلی یا حساب‌های ثبت‌نام‌شده) */
export function checkLogin(username: string, password: string): boolean {
  const name = username.trim();
  if (!name || !password) return false;
  if (name.toLowerCase() === MASTER_USERNAME.toLowerCase()) {
    return password === MASTER_PASSWORD;
  }
  return getAccounts().some(
    (a) => a.username.toLowerCase() === name.toLowerCase() && a.password === password,
  );
}

export type RegisterResult = { ok: boolean; error?: string };

export function registerAccount(username: string, password: string): RegisterResult {
  const name = username.trim();
  if (name.length < 3) return { ok: false, error: "نام کاربری حداقل باید ۳ حرف باشد" };
  if (name.toLowerCase() === MASTER_USERNAME.toLowerCase()) {
    return { ok: false, error: "این نام کاربری رزرو شده است" };
  }
  if (password.length < 6) return { ok: false, error: "رمز عبور حداقل باید ۶ کاراکتر باشد" };
  const accounts = getAccounts();
  if (accounts.some((a) => a.username.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: "این نام کاربری قبلاً ثبت شده است" };
  }
  accounts.push({ username: name, password });
  if (!saveAccounts(accounts)) return { ok: false, error: "حافظه مرورگر در دسترس نیست" };
  return { ok: true };
}

/* ------------------------------- نشست -------------------------------- */

export function getSession(): { username: string } | null {
  const ls = safeLS();
  if (!ls) return null;
  try {
    const parsed = JSON.parse(ls.getItem(LS_SESSION) || "null");
    if (!parsed || typeof parsed.username !== "string") return null;
    if (typeof parsed.exp !== "number" || Date.now() > parsed.exp) return null;
    return { username: parsed.username };
  } catch {
    return null;
  }
}

export function setSession(username: string): void {
  const ls = safeLS();
  if (!ls) return;
  try {
    ls.setItem(
      LS_SESSION,
      JSON.stringify({ username, exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 }),
    );
  } catch {
    /* ignore */
  }
}

export function clearSession(): void {
  const ls = safeLS();
  try {
    ls?.removeItem(LS_SESSION);
  } catch {
    /* ignore */
  }
}

/* ------------------------ همگام‌سازی گیت‌هاب -------------------------- */

export function getGhToken(): string {
  return safeLS()?.getItem(LS_GH_TOKEN) || "";
}

export function setGhToken(token: string): void {
  const ls = safeLS();
  try {
    if (token) ls?.setItem(LS_GH_TOKEN, token);
    else ls?.removeItem(LS_GH_TOKEN);
  } catch {
    /* ignore */
  }
}

const GH_API = "https://api.github.com";

async function ghFetch(token: string, path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${GH_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

/**
 * کامیت یک فایل متنی در یک شاخه با Git Data API
 * (پایدارتر از Contents API برای فایل‌های بزرگ مثل عکس‌های base64)
 */
async function commitFile(
  token: string,
  branch: string,
  path: string,
  text: string,
  message: string,
): Promise<void> {
  const enc = encodeURIComponent; // خوانایی مسیرها
  // ۱) ساخت blob
  const blobRes = await ghFetch(token, `/repos/${GH_REPO}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content: text, encoding: "utf-8" }),
  });
  if (!blobRes.ok) {
    throw new Error(
      blobRes.status === 401
        ? "توکن گیت‌هاب نامعتبر است (کد 401)"
        : `خطای گیت‌هاب در ساخت blob (کد ${blobRes.status})`,
    );
  }
  const { sha: blobSha } = (await blobRes.json()) as { sha: string };

  // ۲) اشاره‌گر سر شاخه
  const refRes = await ghFetch(token, `/repos/${GH_REPO}/git/ref/heads/${enc(branch)}`);
  if (!refRes.ok) throw new Error(`شاخه ${branch} پیدا نشد (کد ${refRes.status})`);
  const { object } = (await refRes.json()) as { object: { sha: string } };

  // ۳) درختِ کامیت سر شاخه
  const commitRes = await ghFetch(token, `/repos/${GH_REPO}/git/commits/${object.sha}`);
  if (!commitRes.ok) throw new Error(`خطای خواندن کامیت (کد ${commitRes.status})`);
  const {
    tree: { sha: baseTree },
  } = (await commitRes.json()) as { tree: { sha: string } };

  // ۴) درخت جدید با فایل به‌روزشده
  const treeRes = await ghFetch(token, `/repos/${GH_REPO}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseTree,
      tree: [{ path, mode: "100644", type: "blob", sha: blobSha }],
    }),
  });
  if (!treeRes.ok) throw new Error(`خطای ساخت درخت (کد ${treeRes.status})`);
  const { sha: newTree } = (await treeRes.json()) as { sha: string };

  // ۵) کامیت جدید
  const newCommitRes = await ghFetch(token, `/repos/${GH_REPO}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree, parents: [object.sha] }),
  });
  if (!newCommitRes.ok) throw new Error(`خطای ساخت کامیت (کد ${newCommitRes.status})`);
  const { sha: newCommit } = (await newCommitRes.json()) as { sha: string };

  // ۶) جابه‌جایی سر شاخه
  const patchRes = await ghFetch(token, `/repos/${GH_REPO}/git/refs/heads/${enc(branch)}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommit }),
  });
  if (!patchRes.ok) throw new Error(`خطای به‌روزرسانی شاخه (کد ${patchRes.status})`);
}

/** آزمون اعتبار توکن (دسترسی خواندن مخزن) */
export async function testGhToken(token: string): Promise<boolean> {
  try {
    const res = await ghFetch(token, `/repos/${GH_REPO}`);
    return res.ok;
  } catch {
    return false;
  }
}

export type SyncResult = { ok: boolean; error?: string };

/**
 * ارسال لیست خودروها به مخزن:
 * - gh-pages/data/cars.json → بلافاصله برای همه بازدیدکنندگان
 * - main/public/data/cars.json → منبع ساخت‌های بعدی
 */
export async function pushCarsToGitHub(token: string, cars: SiteCar[]): Promise<SyncResult> {
  if (!token) return { ok: false, error: "توکن گیت‌هاب تنظیم نشده است" };
  try {
    const payload = JSON.stringify(
      { version: 1, updated: new Date().toISOString(), cars },
      null,
      2,
    );
    const message = "به‌روزرسانی خودروها از پنل مدیریت حمیدی کارز";
    await commitFile(token, "gh-pages", "data/cars.json", payload, `${message} (انتشار زنده)`);
    await commitFile(token, "main", "public/data/cars.json", payload, `${message} (منبع)`);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "ارسال به گیت‌هاب ناموفق بود",
    };
  }
}
