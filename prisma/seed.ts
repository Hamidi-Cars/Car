/**
 * Seed — درج خودروهای پیش‌فرض سایت در دیتابیس پنل مدیریت
 * اجرا: bun prisma/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const DEFAULT_CARS = [
  {
    name: "تویوتا لندکروز ۳۰۰ | GXR دوقلو توربو",
    imageUrl: "/cars/suv1.png",
    speed: "۲۱۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۳.۵ لیتر V6 توئین‌توربو با سیستم چهارچرخ محرک ۴WD تمام‌وقت. پرفروش‌ترین شاسی‌بلند پلاک منطقه آزاد مازندران با قیمت پایه ۱۸.۹ میلیارد تومان، سند رسمی سراسری و بیمه معتبر.",
  },
  {
    name: "لکسوس LX ۶۰۰ | Signature اسپورت",
    imageUrl: "/cars/suv2.png",
    speed: "۲۲۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۳.۵ لیتر V6 توئین‌توربو، صندلی‌های برقی مجلل و امکانات لوکس کامل. لوکس‌ترین خودروی استوک نمایشگاه با قیمت پایه ۲۴.۵ میلیارد تومان و ضمانت اصالت کالا.",
  },
  {
    name: "مرسدس‌بنز کلاس S | S 580 طولانی 4MATIC",
    imageUrl: "/cars/sedan1.png",
    speed: "۲۵۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ استوک اروپا — موتور ۴.۰ لیتر V8 بیتوربو با سیستم تعلیق جادویی و سواری آرام‌تر از آرام. قیمت پایه ۲۲.۸ میلیارد تومان با کارشناسی ۲۱۷ نکته‌ای.",
  },
  {
    name: "بی‌ام‌و سری ۷ | 760i xDrive",
    imageUrl: "/cars/sedan2.png",
    speed: "۲۵۰ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۴.۴ لیتر V8 توئین‌توربو، نمایشگر سینمایی ۳۱ اینچ و طراحی ورزشی مجلل. قیمت پایه ۱۹.۶ میلیارد تومان، پلاک منطقه آزاد مازندران.",
  },
  {
    name: "کیا اسپورتیج | X-Line توربو",
    imageUrl: "/cars/suv3.png",
    speed: "۱۹۵ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۱.۶ لیتر توربوشارژ با دیفرانسیل کامل؛ گزینه اقتصادی و به‌صرفه خانواده‌ها. قیمت پایه ۳.۲ میلیارد تومان با سند رسمی سراسری.",
  },
  {
    name: "پورشه کاین S | E-Hybrid",
    imageUrl: "/cars/suv4.png",
    speed: "۲۵۵ کیلومتر بر ساعت",
    mileage: "صفر کیلومتر",
    description:
      "مدل ۲۰۲۶ — موتور ۲.۹ لیتر V6 بیتوربو همراه با سیستم هیبرید برقی و ۵۲۰ اسب بخار قدرت. قیمت پایه ۱۶.۴ میلیارد تومان، بیمه معتبر و ضمانت اصالت.",
  },
];

async function main() {
  const count = await db.car.count();
  if (count > 0) {
    console.log(`دیتابیس از قبل ${count} خودرو دارد — seed رد شد.`);
    return;
  }
  for (const car of DEFAULT_CARS) {
    await db.car.create({ data: car });
  }
  console.log(`${DEFAULT_CARS.length} خودروی پیش‌فرض در دیتابیس ثبت شد.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
