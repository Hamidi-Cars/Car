import { HamidiSite } from "@/components/hamidi-site";
import { getCars } from "@/lib/cars";

/**
 * - next dev / preview: هر درخواست مستقیماً از دیتابیس خوانده می‌شود
 *   (تا خودروهای افزوده‌شده از پنل مدیریت بلافاصله نمایش داده شوند)
 * - حالت استاتیک (GitHub Pages): در زمان build رندر و در خروجی ثبت می‌شود
 */
export default async function Home() {
  const initialCars = await getCars();
  return <HamidiSite initialCars={initialCars} />;
}
