"use client";

import { motion } from "framer-motion";
import { Clock, Instagram, MessageCircle, Phone, Send } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "./site-sections";
import { BASE_PATH, PHONES } from "@/lib/site";

/* --------------------------- about section --------------------------- */

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#f0d68a] backdrop-blur">
              داستان ما
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-black leading-snug text-white">
              حمیدی کارز؛ اعتماد شما،
              <span className="bg-gradient-to-l from-[#f5d67b] to-[#d4af37] bg-clip-text text-transparent">
                {" "}
                سرمایه ماست
              </span>
            </h2>
            <div className="mt-6 space-y-5 text-sm md:text-[15px] leading-8 text-zinc-400">
              <p>
                مجموعه حمیدی کارز بیش از یک دهه است که در قلب مازندران، پلی مطمئن میان
                خودروسازان جهان و دوستداران خودرو در ایران بوده است. ما کار خود را با یک
                نمایشگاه کوچک در شمال کشور آغاز کردیم و امروز با افتخار، یکی از بزرگ‌ترین
                مجموعه‌های فروش خودروهای پلاک منطقه آزاد در شمال کشور هستیم.
              </p>
              <p>
                تمرکز ما همیشه بر یک اصل ساده بوده است: <strong className="text-zinc-200">شفافیت کامل</strong>.
                هر خودرویی که وارد نمایشگاه ما می‌شود، پیش از عرضه کارشناسی ۲۱۷ نکته‌ای
                می‌شود، تاریخچه کامل آن استعلام می‌گیرد و با قیمت منصفانه روز عرضه می‌گردد.
              </p>
              <p>
                تیم ما شامل کارشناسان رسمی خودرو، مشاوران مالی و کارشناسان بیمه،
                از لحظه اول تا تحویل سند و حتی پس از آن، در کنار شما خواهند بود تا تجربه
                خرید خودروی لوکس، بی‌دغدغه‌ترین خرید عمرتان باشد.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { num: "۱۲+", label: "سال تجربه" },
                { num: "۲۱", label: "کارشناس متخصص" },
                { num: "۱۰۰٪", label: "سند رسمی" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/8 bg-black/45 p-4 text-center backdrop-blur"
                >
                  <p className="text-2xl font-black text-[#f0d68a]">{s.num}</p>
                  <p className="mt-1 text-[11px] text-zinc-400">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-[#d4af37]/20 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
              <img
                src={`${BASE_PATH}/cars/lux1.png`}
                alt="نمایشگاه حمیدی کارز - خودروهای لوکس پلاک منطقه آزاد"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 left-6 rounded-2xl border border-[#d4af37]/25 bg-black/80 p-5 backdrop-blur-xl md:right-10 md:left-10">
              <p className="text-center text-sm font-bold leading-7 text-[#f0d68a]">
                «ما خودرو نمی‌فروشیم؛ اعتماد و آسایش خاطر هدیه می‌دهیم.»
              </p>
              <p className="mt-2 text-center text-[11px] text-zinc-400">— مدیر مجموعه حمیدی کارز</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ (SEO) ------------------------------ */

const FAQS = [
  {
    q: "پلاک منطقه آزاد مازندران چیست؟",
    a: "پلاک منطقه آزاد (پلاک پ) به خودروهایی تعلق می‌گیرد که از طریق مناطق آزاد تجاری کشور وارد و ثبت شده‌اند. این خودروها در بازار مازندران و سراسر شمال کشور طرفداران زیادی دارند؛ چون قیمت تمام‌شده آن‌ها به‌مراتب پایین‌تر از مدل‌های مشابه پلاک ملی است و خرید و فروش آن‌ها کاملاً قانونی و دارای سند رسمی است.",
  },
  {
    q: "خودرو پلاک منطقه آزاد چه مزایایی نسبت به پلاک ملی دارد؟",
    a: "مهم‌ترین مزیت، قیمت پایین‌تر به دلیل معافیت از بسیاری مالیات‌ها و عوارض ثبتی است. علاوه بر این، سند خودرو رسمی و قابل نقل و انتقال در سراسر کشور است، بیمه شخص ثالث و بدنه معتبر دارد و هنگام فروش مجدد نیز به دلیل تقاضای بالای بازار شمال کشور، سریع‌تر و با افت قیمت کمتر به فروش می‌رسد.",
  },
  {
    q: "آیا ماشین پلاک منطقه آزاد در سراسر ایران قابل استفاده است؟",
    a: "بله؛ خودروهای دارای پلاک منطقه آزاد با سند رسمی سراسری و بیمه معتبر، در تمام استان‌های کشور بدون هیچ محدودیتی قابل رانندگی هستند. فرایند نقل و انتقال نیز کاملاً قانونی است و تیم حقوقی حمیدی کارز تمام مراحل را در کوتاه‌ترین زمان ممکن برای شما انجام می‌دهد.",
  },
  {
    q: "قیمت ماشین‌های پلاک منطقه آزاد در مازندران چقدر است؟",
    a: "قیمت بسته به مدل، سال و آپشن متفاوت است؛ از حدود ۳ میلیارد تومان برای کیا اسپورتیج تا بیش از ۲۴ میلیارد تومان برای لکسوس LX ۶۰۰ مدل ۲۰۲۶. برای اطلاع از قیمت لحظه‌ای و نوسانات روز بازار، با کارشناسان ما به شماره 09118020409 تماس بگیرید.",
  },
  {
    q: "چرا خرید ماشین پلاک منطقه آزاد از حمیدی کارز؟",
    a: "حمیدی کارز با بیش از ۱۲ سال تجربه در بازار خودرو مازندران، تمام خودروها را پیش از عرضه کارشناسی ۲۱۷ نکته‌ای می‌کند و تاریخچه کامل آن‌ها استعلام می‌شود. تمرکز ما بر شفافیت کامل و قیمت منصفانه است؛ اعتمادی که در طول سال‌ها ساخته‌ایم.",
  },
];

export function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="سوالات متداول"
          title="هر آنچه درباره خودرو پلاک منطقه آزاد باید بدانید"
          desc="پاسخ پرتکرارترین سوالات شما درباره خرید ماشین پلاک منطقه آزاد مازندران؛ اگر سوال دیگری دارید، کارشناسان ما همه‌روزه پاسخگوی شما هستند."
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-white/8 bg-black/45 px-5 py-2 backdrop-blur-md md:px-7"
          >
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/8">
                <AccordionTrigger className="py-5 text-right text-sm font-bold text-zinc-100 hover:text-[#f0d68a] hover:no-underline md:text-[15px] [&>svg]:shrink-0 [&>svg]:text-[#d4af37]">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[13px] leading-7 text-zinc-400">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- contact section ------------------------- */

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="ارتباط با ما"
          title="همین حالا تماس بگیرید"
          desc="برای استعلام قیمت لحظه‌ای، رزرو خودرو و مشاوره رایگان خرید ماشین پلاک منطقه آزاد مازندران، مستقیم با کارشناسان ما در تماس باشید؛ پاسخگویی همه‌روزه."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PHONES.map((p, i) => (
            <motion.a
              key={p.tel}
              href={`tel:${p.tel}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-white/8 bg-black/45 p-6 text-center backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/45 hover:bg-black/60 hover:shadow-[0_16px_50px_rgba(212,175,55,0.12)]"
            >
              <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 ring-1 ring-[#d4af37]/30 transition-transform duration-300 group-hover:scale-110">
                <Phone className="h-6 w-6 text-[#f0d68a]" />
              </span>
              <h3 className="text-base font-extrabold text-white">{p.name}</h3>
              <p
                dir="ltr"
                className="mt-3 bg-gradient-to-l from-[#f5d67b] to-[#d4af37] bg-clip-text text-2xl font-black tracking-wider text-transparent"
              >
                {p.display}
              </p>
              <p className="mt-3 text-[11px] text-zinc-500">تماس مستقیم — مشاوره رایگان</p>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/8 bg-black/45 p-6 text-center backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/30"
          >
            <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 ring-1 ring-[#d4af37]/30">
              <Clock className="h-6 w-6 text-[#f0d68a]" />
            </span>
            <h3 className="text-base font-extrabold text-white">ساعات کاری</h3>
            <p className="mt-3 text-xs leading-6 text-zinc-400">شنبه تا پنجشنبه: ۹ صبح تا ۱۰ شب</p>
            <p className="mt-1 text-xs leading-6 text-zinc-400">جمعه‌ها: ۴ عصر تا ۱۰ شب</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/8 bg-black/45 p-5 backdrop-blur-md sm:flex-row"
        >
          <span className="text-xs font-bold text-zinc-400">واتساپ و شبکه‌های اجتماعی:</span>
          <div className="flex gap-2">
            {[
              { icon: Instagram, label: "اینستاگرام", href: "#contact" },
              { icon: MessageCircle, label: "واتساپ", href: "https://wa.me/989118020409" },
              { icon: Send, label: "تلگرام", href: "#contact" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/5 text-[#f0d68a] transition-all hover:bg-[#d4af37] hover:text-black"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
