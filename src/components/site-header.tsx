"use client";

import { useEffect, useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "#home", label: "خانه" },
  { href: "#cars", label: "خودروهای ۲۰۲۶" },
  { href: "#benefits", label: "پلاک منطقه آزاد" },
  { href: "#services", label: "خدمات" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-[#d4af37]/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" aria-label="حمیدی کارز - صفحه اصلی">
            <span className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f5d67b] via-[#d4af37] to-[#8a6d1f] shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-black" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17h-2v-5l2-5h11l4 5h1v5h-2" />
                <circle cx="7.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
                <circle cx="16.5" cy="17" r="1.8" fill="currentColor" stroke="none" />
                <path d="M7 12h10" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black tracking-tight bg-gradient-to-l from-[#f5d67b] via-[#d4af37] to-[#f5d67b] bg-clip-text text-transparent">
                Hamidi Cars
              </span>
              <span className="text-[11px] md:text-xs text-zinc-400 mt-1">حمیدی کارز | مازندران</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="ناوبری اصلی">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-[#f0d68a] transition-colors after:absolute after:bottom-0 after:right-4 after:left-4 after:h-px after:bg-gradient-to-l after:from-transparent after:via-[#d4af37] after:to-transparent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] text-black font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-[1.03] transition-all rounded-full px-6 border-0"
            >
              <a href="#contact">
                <PhoneCall className="ml-2 h-4 w-4" />
                مشاوره رایگان
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-black/40 text-[#f0d68a] backdrop-blur"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="lg:hidden border-t border-[#d4af37]/10 bg-black/95 backdrop-blur-xl"
          aria-label="ناوبری موبایل"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-[#d4af37]/10 hover:text-[#f0d68a] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] text-black font-bold rounded-full border-0"
            >
              <a href="#contact" onClick={() => setOpen(false)}>
                <PhoneCall className="ml-2 h-4 w-4" />
                مشاوره رایگان
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
