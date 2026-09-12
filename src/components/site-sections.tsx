"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Banknote,
  CarFront,
  FileCheck2,
  Gauge,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
  PackageSearch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BASE_PATH } from "@/lib/site";
import { DEFAULT_CARS, type SiteCar } from "@/lib/cars";

/* --------------------------- car image src --------------------------- */

export function carImageSrc(imageUrl: string): string {
  if (imageUrl.startsWith("data:") || imageUrl.startsWith("http")) return imageUrl;
  return `${BASE_PATH}${imageUrl}`;
}

/* ------------------------------ car card ----------------------------- */

function CarCard({ car, index }: { car: SiteCar; index: number }) {
  return (
    <motion.article
      custom={index % 3}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="h-full"
    >
      <Card className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-black/45 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/45 hover:shadow-[0_20px_70px_rgba(212,175,55,0.16)] hover:-translate-y-1.5">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={carImageSrc(car.imageUrl)}
            alt={`${car.name} — خودرو پلاک منطقه آزاد مازندران`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <Badge className="absolute top-3 right-3 rounded-full border border-[#d4af37]/40 bg-black/70 px-3 py-1 text-[11px] font-bold text-[#f0d68a] backdrop-blur">
            پلاک منطقه آزاد
          </Badge>
          <h3 className="absolute bottom-3 right-4 left-4 text-base leading-7 font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-lg">
            {car.name}
          </h3>
        </div>

        <CardContent className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
              <Gauge className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <div className="min-w-0">
                <p className="text-[10px] text-zinc-500">سرعت</p>
                <p className="truncate text-xs font-bold text-zinc-200" title={car.speed}>
                  {car.speed || "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
              <Route className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <div className="min-w-0">
                <p className="text-[10px] text-zinc-500">کارکرد</p>
                <p className="truncate text-xs font-bold text-zinc-200" title={car.mileage}>
                  {car.mileage || "—"}
                </p>
              </div>
            </div>
          </div>

          <p className="text-[13px] leading-7 text-zinc-400 line-clamp-3">
            {car.description || "برای دریافت اطلاعات کامل این خودرو با کارشناسان ما تماس بگیرید."}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
            <p className="text-[11px] text-zinc-500">سند رسمی سراسری</p>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-[#d4af37]/40 bg-[#d4af37]/5 text-[#f0d68a] hover:bg-[#d4af37] hover:text-black transition-all"
            >
              <a href={`#contact`}>استعلام و رزرو</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

/* ------------------------------ section ------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
    >
      <span className="inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#f0d68a] backdrop-blur">
        {kicker}
      </span>
      <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-black leading-tight bg-gradient-to-l from-[#f5d67b] via-[#e9c765] to-[#d4af37] bg-clip-text text-transparent">
        {title}
      </h2>
      {desc && <p className="mt-4 text-[13px] md:text-base leading-7 md:leading-8 text-zinc-400">{desc}</p>}
    </motion.div>
  );
}

export function CarsSection({ initialCars = [] }: { initialCars?: SiteCar[] }) {
  const [cars, setCars] = useState<SiteCar[]>(initialCars);

  // به‌روزرسانی زنده پس از تغییر خودروها در پنل مدیریت
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("/api/cars", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { cars?: SiteCar[] };
        if (Array.isArray(data.cars)) setCars(data.cars);
      } catch {
        /* حالت استاتیک — لیست پیش‌فرض باقی می‌ماند */
      }
    };
    window.addEventListener("cars-updated", refresh);
    return () => window.removeEventListener("cars-updated", refresh);
  }, []);

  const list = cars.length > 0 ? cars : DEFAULT_CARS;

  return (
    <section id="cars" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="ناوگان ۲۰۲۶"
          title="خودروهای لوکس مدل ۲۰۲۶"
          desc="کالکشن جدیدترین خودروهای صفر استوک با پلاک منطقه آزاد مازندران؛ همه با ضمانت اصالت، کارشناسی بدنه و امکان معاینه حضوری."
        />

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center text-xs text-zinc-500"
        >
          * قیمت‌ها بر اساس نوسانات ارز به‌روزرسانی می‌شوند؛ برای قیمت لحظه‌ای با کارشناسان ما در تماس باشید.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------- benefits section -------------------------- */

const BENEFITS = [
  {
    icon: Banknote,
    title: "معافیت از مالیات و عوارض",
    desc: "خودروهای ثبت‌شده در منطقه آزاد از بسیاری مالیات‌ها و عوارض ثبتی معاف هستند؛ در نتیجه قیمت تمام‌شده نهایی به‌مراتب پایین‌تر از مدل‌های مشابه پلاک ملی است و شما همان کیفیت جهانی را با هزینه کمتر تجربه می‌کنید.",
  },
  {
    icon: FileCheck2,
    title: "سند رسمی و انتقال سراسری",
    desc: "همه خودروهای ما دارای سند رسمی و قابل نقل و انتقال در سراسر کشور هستند. فرایند انتقال کاملاً قانونی، شفاف و در کمترین زمان ممکن توسط تیم حقوقی ما انجام می‌شود.",
  },
  {
    icon: ShieldCheck,
    title: "بیمه معتبر سراسری",
    desc: "تمام خودروها با بیمه شخص ثالث و بیمه بدنه معتبر شرکتی تحویل داده می‌شوند تا خیال شما در هر نقطه از ایران راحت باشد. خدمات خسارت به‌صورت سراسری پوشش داده می‌شود.",
  },
  {
    icon: TrendingUp,
    title: "نقدشوندگی بالا در شمال کشور",
    desc: "بازار خودروهای پلاک منطقه آزاد در مازندران و سراسر شمال کشور داغ و پویاست؛ یعنی اگر روزی قصد فروش داشتید، در کوتاه‌ترین زمان و با کمترین افت قیمت به فروش می‌رسد.",
  },
  {
    icon: PackageSearch,
    title: "صفر کیلومتر، بدون رنگ و تصادف",
    desc: "کلیه خودروهای استوک ما مستقیماً از دبی، اروپا و کشورهای حاشیه خلیج فارس تأمین می‌شوند. کارشناسی فنی و بدنه پیش از تحویل به‌صورت رایگان در حضور شما انجام می‌شود.",
  },
  {
    icon: BadgeCheck,
    title: "مشاوره تخصصی خرید",
    desc: "کارشناسان باسواد ما با مقایسه دقیق مدل‌ها، امکانات و هزینه نگهداری، بهترین انتخاب را متناسب با بودجه و سبک زندگی شما پیشنهاد می‌دهند؛ بدون واسطه و بدون هزینه.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="چرا حمیدی کارز؟"
          title="مزایای خرید خودرو با پلاک منطقه آزاد مازندران"
          desc="پلاک منطقه آزاد یعنی هم‌قیمتی هوشمندانه، هم آزادی اقدام کامل. این مزیت‌ها باعث شده خریداران حرفه‌ای، خرید با پلاک منطقه آزاد را به گزینه اول تبدیل کنند."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              custom={i % 3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Card className="h-full rounded-2xl border border-white/8 bg-black/45 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/40 hover:bg-black/60 hover:shadow-[0_16px_50px_rgba(212,175,55,0.12)]">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 ring-1 ring-[#d4af37]/30">
                  <b.icon className="h-6 w-6 text-[#f0d68a]" />
                </span>
                <h3 className="mb-3 text-base font-extrabold text-white">{b.title}</h3>
                <p className="text-[13px] leading-7 text-zinc-400">{b.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- services section -------------------------- */

const SERVICES = [
  {
    icon: CarFront,
    title: "خرید و فروش تخصصی",
    desc: "خرید خودروی صفر و کارکرده با پلاک منطقه آزاد، با قیمت‌گذاری منصفانه روز و تسویه فوری.",
  },
  {
    icon: Wrench,
    title: "کارشناسی و بازرسی فنی",
    desc: "بازرسی ۲۱۷ نکته‌ای بدنه، موتور و شاسی توسط کارشناس رسمی، پیش از هر معامله.",
  },
  {
    icon: Sparkles,
    title: "واردات سفارشی",
    desc: "سفارش مدل و رنگ دلخواه از دبی و ترکیه با اعلام قیمت شفاف از ابتدا تا تحویل پلاک.",
  },
  {
    icon: ShieldCheck,
    title: "خدمات پس از فروش",
    desc: "سه ماه گارانتی موتور و گیربکس + تخفیف دائمی خدمات نمایندگی برای مشتریان حمیدی کارز.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="خدمات یکپارچه"
          title="از انتخاب تا تحویل، کنار شما هستیم"
          desc="هر آنچه برای خرید یک خودروی لوکس نیاز دارید، زیر یک سقف در قلب مازندران گردآوری شده است."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i % 3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-black/45 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/40 hover:shadow-[0_16px_50px_rgba(212,175,55,0.12)]">
                <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[#d4af37]/8 blur-2xl transition-all duration-500 group-hover:bg-[#d4af37]/16" />
                <div className="mb-5 flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 ring-1 ring-[#d4af37]/30">
                    <s.icon className="h-6 w-6 text-[#f0d68a]" />
                  </span>
                  <h3 className="text-base font-extrabold text-white">{s.title}</h3>
                </div>
                <p className="text-[13px] leading-7 text-zinc-400">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
