/**
 * لایه داده خودروها — shared بین سرور و کلاینت
 * SiteCar: شکل واحد خودرو در کل سایت (پنل مدیریت + بخش خودروها)
 */

export type SiteCar = {
  id: string;
  name: string;
  imageUrl: string;
  speed: string;
  mileage: string;
  description: string;
};

/** خودروهای پیش‌فرض — وقتی دیتابیس خالی است یا API در دسترس نیست (حالت استاتیک) */
export const DEFAULT_CARS: SiteCar[] = [
  {
    id: "land-cruiser",
    name: "تویوتا لندکروز ۳۰۰ | GXR دوقلو توربو",
    imageUrl: "/cars/suv1.png",
    speed: "۲۱۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۳.۵ لیتر V6 توئین‌توربو با سیستم چهارچرخ محرک ۴WD تمام‌وقت. پرفروش‌ترین شاسی‌بلند پلاک منطقه آزاد مازندران با قیمت پایه ۱۸.۹ میلیارد تومان، سند رسمی سراسری و بیمه معتبر.",
  },
  {
    id: "lexus-lx",
    name: "لکسوس LX ۶۰۰ | Signature اسپورت",
    imageUrl: "/cars/suv2.png",
    speed: "۲۲۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۳.۵ لیتر V6 توئین‌توربو، صندلی‌های برقی مجلل و امکانات لوکس کامل. لوکس‌ترین خودروی استوک نمایشگاه با قیمت پایه ۲۴.۵ میلیارد تومان و ضمانت اصالت کالا.",
  },
  {
    id: "benz-s",
    name: "مرسدس‌بنز کلاس S | S 580 طولانی 4MATIC",
    imageUrl: "/cars/sedan1.png",
    speed: "۲۵۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ استوک اروپا — موتور ۴.۰ لیتر V8 بیتوربو با سیستم تعلیق جادویی و سواری آرام‌تر از آرام. قیمت پایه ۲۲.۸ میلیارد تومان با کارشناسی ۲۱۷ نکته‌ای.",
  },
  {
    id: "bmw-7",
    name: "بی‌ام‌و سری ۷ | 760i xDrive",
    imageUrl: "/cars/sedan2.png",
    speed: "۲۵۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۴.۴ لیتر V8 توئین‌توربو، نمایشگر سینمایی ۳۱ اینچ و طراحی ورزشی مجلل. قیمت پایه ۱۹.۶ میلیارد تومان، پلاک منطقه آزاد مازندران.",
  },
  {
    id: "kia-sportage",
    name: "کیا اسپورتیج | X-Line توربو",
    imageUrl: "/cars/suv3.png",
    speed: "۱۹۵ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۱.۶ لیتر توربوشارژ با دیفرانسیل کامل؛ گزینه اقتصادی و به‌صرفه خانواده‌ها. قیمت پایه ۳.۲ میلیارد تومان با سند رسمی سراسری.",
  },
  {
    id: "cayenne",
    name: "پورشه کاین S | E-Hybrid",
    imageUrl: "/cars/suv4.png",
    speed: "۲۵۵ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۲.۹ لیتر V6 بیتوربو همراه با سیستم هیبرید برقی و ۵۲۰ اسب بخار قدرت. قیمت پایه ۱۶.۴ میلیارد تومان، بیمه معتبر و ضمانت اصالت.",
  },
];

/**
 * واکشی خودروها از دیتابیس (سمت سرور).
 * در حالت استاتیک در زمان build اجرا می‌شود؛ هر خطا → لیست پیش‌فرض.
 */
export async function getCars(): Promise<SiteCar[]> {
  try {
    const { db } = await import("@/lib/db");
    const rows = await db.car.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        speed: true,
        mileage: true,
        description: true,
      },
    });
    return rows;
  } catch {
    return [];
  }
}
