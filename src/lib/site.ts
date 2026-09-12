/**
 * Central site config — used by metadata, sitemap, robots and JSON-LD.
 * آدرس نهایی سایت (GitHub Pages). اگر دامنه اختصاصی داشتید، NEXT_PUBLIC_SITE_URL را تنظیم کنید.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hamidi-cars.github.io/Car";

/**
 * پیشوند مسیر هنگام استقرار زیرپوشه (GitHub Pages repo site).
 * برای بیلد استاتیک: STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/Car
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_NAME = "حمیدی کارز";
export const SITE_NAME_EN = "Hamidi Cars";

export const PHONES = [
  {
    name: "امیرحسین حمیدی",
    display: "0911 802 0409",
    tel: "+989118020409",
  },
  {
    name: "سینا حمیدی",
    display: "0938 738 4240",
    tel: "+989387384240",
  },
] as const;
