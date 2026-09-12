"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Instagram,
  MapPin,
  Phone,
  Quote,
  Send,
  Star,
  MessageCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionTitle } from "./site-sections";

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
                نمایشگاه کوچک در ساری آغاز کردیم و امروز با افتخار، یکی از بزرگ‌ترین
                مجموعه‌های فروش خودروهای پلاک منطقه آزاد در شمال کشور هستیم.
              </p>
              <p>
                تمرکز ما همیشه بر یک اصل ساده بوده است: <strong className="text-zinc-200">شفافیت کامل</strong>.
                هر خودرویی که وارد نمایشگاه ما می‌شود، پیش از عرضه کارشناسی ۲۱۷ نکته‌ای
                می‌شود، تاریخچه کامل آن استعلام می‌گیرد و با قیمت منصفانه روز عرضه می‌گردد.
                به همین دلیل بیش از ۷۰٪ فروش ما حاصل معرفی مشتریان قبلی است.
              </p>
              <p>
                تیم ۲۴ نفره ما شامل کارشناسان رسمی خودرو، مشاوران مالی و کارشناسان بیمه،
                از لحظه اول تا تحویل سند و حتی پس از آن، در کنار شما خواهند بود تا تجربه
                خرید خودروی لوکس، بی‌دغدغه‌ترین خرید عمرتان باشد.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { num: "۱۲+", label: "سال تجربه" },
                { num: "۲۱", label: "کارشناس متخصص" },
                { num: "۹۸٪", label: "رضایت مشتری" },
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
                src="/cars/lux1.png"
                alt="نمایشگاه حمیدی کارز - خودروهای لوکس پلاک منطقه آزاد"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 left-6 rounded-2xl border border-[#d4af37]/25 bg-black/80 p-5 backdrop-blur-xl md:right-10 md:left-10">
              <p className="text-center text-sm font-bold leading-7 text-[#f0d68a]">
                «ما خودرو نمی‌فروشیم؛ اعتماد و آسایش خاطر تحویل می‌دهیم.»
              </p>
              <p className="mt-2 text-center text-[11px] text-zinc-400">— مدیر مجموعه حمیدی کارز</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- testimonials section ---------------------- */

const TESTIMONIALS = [
  {
    name: "مهدی احمدی",
    city: "ساری",
    car: "خرید لندکروز ۳۰۰ مدل ۲۰۲۶",
    text: "از حمیدی کارز لندکروز ۲۰۲۶ خریدم؛ هم قیمت منصفانه‌تر از همه‌جا بود و هم مدارک سند و بیمه کاملاً کامل و رسمی تحویل دادند. کارشناسی بدنه هم در حضور خودم انجام شد. واقعاً حرفه‌ای هستند.",
    rating: 5,
  },
  {
    name: "رضا موسوی",
    city: "بابل",
    car: "خرید بی‌ام‌و سری ۷",
    text: "بهترین مجموعه خودروهای پلاک آزاد در مازندران. مشاوره‌هاشون صادقانه بود و هیچ‌وقت برای فروش بیشتر اصرار نکردن؛ حتی پیشنهاد دادن مدل ارزون‌تر که به شرایطم می‌خورد. دستشون درد نکنه.",
    rating: 5,
  },
  {
    name: "سارا کریمی",
    city: "آمل",
    car: "خرید اقساطی کیا اسپورتیج",
    text: "اولین بار بود خودرو قسطی می‌گرفتم و استرس داشتم، ولی فرایند کاملاً شفاف پیش رفت. همه‌چیز از قرارداد تا بیمه و تحویل، دقیقاً همون‌طور شد که توافق کردیم. به همه پیشنهاد می‌کنم.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="نظرات مشتریان"
          title="اعتماد شما، افتخار ماست"
          desc="بخشی از تجربه واقعی مشتریانی که خودروی خود را از حمیدی کارز تهیه کرده‌اند."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="relative h-full rounded-2xl border border-white/8 bg-black/45 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/35 hover:shadow-[0_16px_50px_rgba(212,175,55,0.1)]">
                <Quote className="absolute left-5 top-5 h-8 w-8 text-[#d4af37]/15" />
                <div className="mb-4 flex gap-1" aria-label={`امتیاز ${t.rating} از ۵`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <p className="text-[13px] leading-7 text-zinc-300">{t.text}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 text-sm font-black text-[#f0d68a] ring-1 ring-[#d4af37]/30">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-[11px] text-zinc-500">{t.car} — {t.city}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- contact section ------------------------- */

export function ContactSection() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, carModel, message }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "درخواست شما ثبت شد",
          description: "کارشناسان حمیدی کارز در سریع‌ترین زمان با شما تماس می‌گیرند.",
        });
        setName("");
        setPhone("");
        setCarModel("");
        setMessage("");
      } else {
        toast({
          title: "خطا در ثبت درخواست",
          description: data.error ?? "لطفاً اطلاعات را بررسی و دوباره تلاش کنید.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "خطای ارتباط",
        description: "اتصال برقرار نشد؛ لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="ارتباط با ما"
          title="رایگان مشاوره بگیرید"
          desc="فرم زیر را پر کنید یا مستقیم تماس بگیرید؛ کارشناسان ما همه‌روزه پاسخگوی شما هستند."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-4">
              {[
                {
                  icon: MapPin,
                  title: "آدرس نمایشگاه",
                  lines: ["مازندران، ساری، بلوار خزر، جنب مجتمع تجاری آفتاب", "نمایشگاه مرکزی حمیدی کارز"],
                },
                {
                  icon: Phone,
                  title: "تماس مستقیم",
                  lines: ["۰۹۱۱-۱۱۱-۲۲۳۳ (واتساپ)", "۰۱۱-۳۳۳۳-۴۴۵۵ (ثابت)"],
                },
                {
                  icon: Clock,
                  title: "ساعات کاری",
                  lines: ["شنبه تا پنجشنبه: ۹ صبح تا ۱۰ شب", "جمعه‌ها: ۴ عصر تا ۱۰ شب"],
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-black/45 p-5 backdrop-blur-md transition-colors hover:border-[#d4af37]/30"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 ring-1 ring-[#d4af37]/30">
                    <c.icon className="h-5 w-5 text-[#f0d68a]" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-sm font-extrabold text-white">{c.title}</h3>
                    {c.lines.map((l) => (
                      <p key={l} className="text-xs leading-6 text-zinc-400">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/45 p-5 backdrop-blur-md">
                <span className="text-xs font-bold text-zinc-400">ما را دنبال کنید:</span>
                <div className="flex gap-2">
                  {[
                    { icon: Instagram, label: "اینستاگرام" },
                    { icon: MessageCircle, label: "واتساپ" },
                    { icon: Send, label: "تلگرام" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#contact"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/5 text-[#f0d68a] transition-all hover:bg-[#d4af37] hover:text-black"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/8 bg-black/55 p-6 md:p-8 backdrop-blur-md"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold text-zinc-300">
                    نام و نام خانوادگی <span className="text-[#d4af37]">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً علی محمدی"
                    required
                    minLength={2}
                    className="border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold text-zinc-300">
                    شماره تماس <span className="text-[#d4af37]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۱ ××× ××××"
                    required
                    className="border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/50"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="car" className="text-xs font-bold text-zinc-300">
                    خودروی مورد نظر (اختیاری)
                  </Label>
                  <Input
                    id="car"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    placeholder="مثلاً لندکروز ۳۰۰ مدل ۲۰۲۶"
                    className="border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/50"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message" className="text-xs font-bold text-zinc-300">
                    توضیحات (اختیاری)
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="سوال یا نیاز خود را بنویسید؛ مثل امکان خرید اقساطی، مبادله خودرو و..."
                    rows={4}
                    className="resize-none border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/50"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] py-6 text-base font-black text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] transition-all border-0 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                    ثبت درخواست مشاوره رایگان
                  </>
                )}
              </Button>
              <p className="mt-4 text-center text-[11px] leading-5 text-zinc-500">
                با ثبت فرم، کارشناسان ما حداکثر ظرف ۲ ساعت کاری با شما تماس می‌گیرند.
                اطلاعات شما نزد ما محفوظ است.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
