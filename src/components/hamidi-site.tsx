"use client";

import { motion } from "framer-motion";
import { ChevronDown, Clock, FileCheck2, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleBackground } from "./simple-background";
import { SiteHeader } from "./site-header";
import { CarsSection, BenefitsSection, ServicesSection } from "./site-sections";
import { AboutSection, ContactSection, FaqSection } from "./site-contact";
import { AdminPanel } from "./admin-panel";
import { BASE_PATH } from "@/lib/site";
import type { SiteCar } from "@/lib/cars";

// نسخه استاتیک (GitHub Pages) پنل مدیریت ندارد
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/* ------------------------------- hero -------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* readability veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#d4af37]/35 bg-black/50 px-4 py-2 text-center text-[10px] md:text-xs font-bold leading-5 text-[#f0d68a] backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">خودرو پلاک منطقه آزاد مازندران | مرجع تخصصی ماشین‌های پلاک آزاد در شمال کشور</span>
            <span className="sm:hidden">خودرو پلاک منطقه آزاد مازندران</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight"
        >
          <span className="bg-gradient-to-l from-[#f5d67b] via-[#e9c765] to-[#b8860b] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            Hamidi Cars
          </span>
          <span className="sr-only">حمیدی کارز — خرید و فروش خودرو و ماشین پلاک منطقه آزاد مازندران</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-4 text-lg sm:text-xl md:text-3xl font-extrabold text-white"
        >
          تجربه رانندگی لوکس ۲۰۲۶ با پلاک منطقه آزاد
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mx-auto mt-5 max-w-2xl text-[13px] md:text-base leading-7 md:leading-8 text-zinc-300"
        >
          اگر به دنبال خرید خودرو پلاک منطقه آزاد مازندران هستید، جدیدترین ماشین‌های
          پلاک آزاد صفر استوک مدل ۲۰۲۶؛ از لندکروز و لکسوس تا مرسدس و بی‌ام‌و،
          با سند رسمی سراسری، بیمه معتبر و قیمتی که جای هیچ نگرانی ندارد.
          در حمیدی کارز، لوکس بودن با هوشمندی همراه است.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] px-10 text-base font-black text-black border-0 shadow-[0_10px_45px_rgba(212,175,55,0.4)] hover:shadow-[0_10px_60px_rgba(212,175,55,0.6)] hover:scale-[1.04] transition-all"
          >
            <a href="#cars">
              <Sparkles className="ml-2 h-5 w-5" />
              مشاهده خودروهای ۲۰۲۶
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 rounded-full border-[#d4af37]/40 bg-black/40 px-10 text-base font-bold text-[#f0d68a] backdrop-blur-md hover:bg-[#d4af37]/15 hover:text-[#ffe9a8] transition-all"
          >
            <a href="#contact">
              <Phone className="ml-2 h-5 w-5" />
              مشاوره رایگان
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] md:text-xs text-zinc-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
            ضمانت اصالت کالا
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileCheck2 className="h-4 w-4 text-[#d4af37]" />
            سند رسمی سراسری
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#d4af37]" />
            پشتیبانی همه‌روزه
          </span>
        </motion.div>

        {/* hero car image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-10 max-w-4xl"
        >
          <div className="absolute inset-x-10 bottom-0 h-24 rounded-full bg-[#d4af37]/20 blur-[70px]" />
          <img
            src={`${BASE_PATH}/cars/hero.png`}
            alt="خودروی لوکس کرومه با رینگ‌های طلایی — حمیدی کارز"
            className="relative w-full rounded-3xl border border-[#d4af37]/15 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#stats"
        aria-label="اسکرول به پایین"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[#d4af37]/80"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ------------------------------- stats ------------------------------- */

const STATS = [
  { value: "۱۲+", label: "سال تجربه درخشان" },
  { value: "۵۰۰+", label: "خودروی موجود و استوک" },
  { value: "۱۰۰٪", label: "سند رسمی سراسری" },
  { value: "۲۴/۷", label: "پشتیبانی همه‌روزه" },
];

function StatsBar() {
  return (
    <section id="stats" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-[#d4af37]/15 bg-black/55 p-6 md:p-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="bg-gradient-to-l from-[#f5d67b] to-[#b8860b] bg-clip-text text-2xl sm:text-3xl md:text-5xl font-black text-transparent">
                {s.value}
              </p>
              <p className="mt-2 text-[11px] md:text-sm text-zinc-400">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ footer ------------------------------- */

function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-[#d4af37]/15 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f5d67b] via-[#d4af37] to-[#8a6d1f]">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-black" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 17h-2v-5l2-5h11l4 5h1v5h-2" />
                  <circle cx="7.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
                  <circle cx="16.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
                  <path d="M7 12h10" />
                </svg>
              </span>
              <div>
                <p className="text-lg font-black bg-gradient-to-l from-[#f5d67b] to-[#b8860b] bg-clip-text text-transparent">
                  Hamidi Cars
                </p>
                <p className="text-[11px] text-zinc-500">حمیدی کارز | مازندران</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-xs leading-6 text-zinc-500">
              مرجع تخصصی خرید و فروش خودروهای لوکس پلاک منطقه آزاد مازندران؛
              با ضمانت اصالت، سند رسمی و پشتیبانی مادام‌العمر.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold text-[#f0d68a]">دسترسی سریع</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
              {[
                ["#cars", "خودروهای ۲۰۲۶"],
                ["#benefits", "پلاک منطقه آزاد"],
                ["#services", "خدمات ما"],
                ["#about", "درباره حمیدی کارز"],
                ["#faq", "سوالات متداول"],
                ["#contact", "تماس با ما"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-[#f0d68a]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold text-[#f0d68a]">اطلاعات تماس</h3>
            <ul className="space-y-3 text-xs leading-6 text-zinc-400">
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
                  امیرحسین حمیدی
                </span>
                <a
                  href="tel:+989118020409"
                  dir="ltr"
                  className="font-bold text-zinc-300 transition-colors hover:text-[#f0d68a]"
                >
                  0911 802 0409
                </a>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
                  سینا حمیدی
                </span>
                <a
                  href="tel:+989387384240"
                  dir="ltr"
                  className="font-bold text-zinc-300 transition-colors hover:text-[#f0d68a]"
                >
                  0938 738 4240
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-[11px] text-zinc-600 sm:flex-row">
          <p>© ۲۰۲۶ Hamidi Cars — تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-4">
            <span>طراحی‌شده با عشق برای دوستداران خودرو در مازندران</span>
            {!IS_STATIC && (
              <a
                href="#admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-bold text-zinc-500 transition-colors hover:border-[#d4af37]/40 hover:text-[#f0d68a]"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                پنل مدیریت
              </a>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- assembly ------------------------------ */

export function HamidiSite({ initialCars = [] }: { initialCars?: SiteCar[] }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#050506] text-zinc-100">
      <SimpleBackground />
      <SiteHeader />

      <main className="relative z-10 flex-1">
        <Hero />
        <StatsBar />
        <CarsSection initialCars={initialCars} />
        <BenefitsSection />
        <ServicesSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <AdminPanel />
    </div>
  );
}
