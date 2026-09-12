import { HamidiSite } from "@/components/hamidi-site";

/**
 * سایت کاملاً استاتیک است؛ لیست خودروها در سمت مرورگر از
 * localStorage / data/cars.json / خودروهای پیش‌فرض بارگذاری می‌شود
 * (src/lib/car-store.ts). پنل مدیریت نیز بدون سرور کار می‌کند.
 */
export default function Home() {
  return <HamidiSite />;
}
