import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "حمیدی کارز | Hamidi Cars — خرید خودروهای لوکس پلاک منطقه آزاد مازندران",
  description:
    "حمیدی کارز، مرجع تخصصی خرید و فروش خودروهای لوکس مدل ۲۰۲۶ با پلاک منطقه آزاد مازندران. لندکروز، لکسوس، مرسدس، بی‌ام‌و و ده‌ها مدل دیگر با سند رسمی سراسری و ضمانت اصالت کالا.",
  keywords: [
    "حمیدی کارز",
    "Hamidi Cars",
    "خودرو پلاک منطقه آزاد",
    "مازندران",
    "خودروهای لوکس ۲۰۲۶",
    "لندکروز پلاک آزاد",
    "خرید خودرو مازندران",
    "نمایشگاه خودرو ساری",
  ],
  authors: [{ name: "Hamidi Cars" }],
  openGraph: {
    title: "حمیدی کارز | Hamidi Cars",
    description: "تجربه رانندگی لوکس ۲۰۲۶ با پلاک منطقه آزاد مازندران",
    siteName: "Hamidi Cars",
    type: "website",
    locale: "fa_IR",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23d4af37'/%3E%3Cpath d='M7 20h-2v-6l2.5-6h14l3 6h1.5v6h-2' stroke='%23000' stroke-width='2.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='10' cy='20' r='2.4' fill='%23000'/%3E%3Ccircle cx='22' cy='20' r='2.4' fill='%23000'/%3E%3C/svg%3E"
        />
      </head>
      <body className="antialiased bg-[#050506] text-zinc-100 font-[Vazirmatn,system-ui,sans-serif]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
