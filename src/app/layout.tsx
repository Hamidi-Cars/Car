import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_NAME_EN } from "@/lib/site";

/* ------------------------- SEO metadata ------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "خودرو و ماشین پلاک منطقه آزاد مازندران | حمیدی کارز Hamidi Cars",
  description:
    "خرید و فروش خودرو پلاک منطقه آزاد مازندران از حمیدی کارز؛ ماشین‌های پلاک آزاد صفر و استوک مدل ۲۰۲۶ (لندکروز، لکسوس، مرسدس، بی‌ام‌و) با سند رسمی سراسری، بیمه معتبر و قیمت منصفانه. تماس: 09118020409",
  keywords: [
    "پلاک منطقه آزاد مازندران",
    "خودرو پلاک منطقه آزاد مازندران",
    "ماشین پلاک منطقه آزاد مازندران",
    "ماشین های پلاک منطقه آزاد",
    "خودرو های پلاک منطقه آزاد",
    "خرید خودرو پلاک آزاد",
    "قیمت ماشین پلاک منطقه آزاد",
    "خودروهای لوکس ۲۰۲۶",
    "لندکروز پلاک آزاد",
    "لکسوس پلاک منطقه آزاد",
    "خرید خودرو مازندران",
    "حمیدی کارز",
    "Hamidi Cars",
  ],
  authors: [{ name: SITE_NAME_EN }],
  creator: SITE_NAME_EN,
  publisher: SITE_NAME_EN,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "خودرو و ماشین پلاک منطقه آزاد مازندران | حمیدی کارز",
    description:
      "مرجع تخصصی خرید و فروش خودروهای پلاک منطقه آزاد مازندران — صفر استوک مدل ۲۰۲۶ با سند رسمی سراسری و ضمانت اصالت.",
    url: SITE_URL,
    siteName: `${SITE_NAME} | ${SITE_NAME_EN}`,
    type: "website",
    locale: "fa_IR",
    images: [
      {
        url: "/cars/hero.png",
        width: 1344,
        height: 768,
        alt: "خودرو لوکس پلاک منطقه آزاد مازندران — حمیدی کارز",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "خودرو و ماشین پلاک منطقه آزاد مازندران | حمیدی کارز",
    description:
      "خرید و فروش خودروهای پلاک منطقه آزاد مازندران با سند رسمی و ضمانت اصالت کالا.",
    images: ["/cars/hero.png"],
  },
  category: "automotive",
};

/* --------------------- JSON-LD structured data --------------------- */

const dealerJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${SITE_URL}/#dealer`,
  name: `${SITE_NAME} | ${SITE_NAME_EN}`,
  alternateName: ["حمیدی کارز", "Hamidi Cars", "نمایشگاه حمیدی"],
  description:
    "مرجع تخصصی خرید و فروش خودرو و ماشین پلاک منطقه آزاد مازندران؛ صفر و استوک مدل ۲۰۲۶ با سند رسمی سراسری، بیمه معتبر و کارشناسی بدنه رایگان.",
  url: SITE_URL,
  image: `${SITE_URL}/cars/hero.png`,
  logo: `${SITE_URL}/logo.svg`,
  telephone: ["+989118020409", "+989387384240"],
  priceRange: "$$$",
  currenciesAccepted: "IRR",
  paymentAccepted: "نقدی",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "16:00",
      closes: "22:00",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "مازندران" },
    { "@type": "AdministrativeArea", name: "شمال ایران" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+989118020409",
      contactType: "sales",
      name: "امیرحسین حمیدی",
      areaServed: "IR",
      availableLanguage: ["fa"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+989387384240",
      contactType: "sales",
      name: "سینا حمیدی",
      areaServed: "IR",
      availableLanguage: ["fa"],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#050506] text-zinc-100 font-[Vazirmatn,system-ui,sans-serif]">
        {children}
      </body>
    </html>
  );
}
