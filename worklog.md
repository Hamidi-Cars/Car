---
Task ID: 2
Agent: main (Super Z)
Task: SEO for «خودرو/ماشین پلاک منطقه آزاد مازندران» queries + update phone numbers with owner names

Work Log:
- Created `src/lib/site.ts` — central config (SITE_URL, SITE_NAME, PHONES with names امیرحسین حمیدی +989118020409 and سینا حمیدی +989387384240)
- Rewrote `src/app/layout.tsx` metadata:
  - Title: «خودرو و ماشین پلاک منطقه آزاد مازندران | حمیدی کارز Hamidi Cars»
  - Description + 15 keywords targeting both exact query variants
  - robots (index/follow, max-image-preview large), canonical, OpenGraph with hero image, Twitter card
  - JSON-LD AutoDealer schema (address ساری مازندران, both phones as contactPoint, opening hours, areaServed)
- Added `src/app/sitemap.ts` + `src/app/robots.ts`; removed static public/robots.txt to avoid conflict
- Added FAQ section (`FaqSection` in site-contact.tsx) with 6 keyword-rich Q&As + FAQPage JSON-LD schema; shadcn Accordion, id="faq"
- Hero SEO: pill text + H1 sr-only keyword span + description mentions both query variants
- Phones updated everywhere:
  - Contact section: two clickable tel cards with owner names (tel:+989118020409 / tel:+989387384240)
  - Footer: rows with names + tel links
  - Header: desktop CTA now tel link; mobile quick-call button added beside hamburger
  - Mobile menu CTA: «تماس با امیرحسین حمیدی»
  - WhatsApp social link → wa.me/989118020409
- Verified in browser: FAQ accordion opens, contact cards render, footer shows both numbers, mobile header has call button
- Validated page source: AutoDealer JSON-LD valid (phones + contactPoints), FAQPage JSON-LD valid (6 questions), robots.txt + sitemap.xml served correctly
- bun run lint clean, zero console errors

Stage Summary:
- On-page SEO fully maximized for target queries (title/desc/H1/keywords/content/schema/sitemap)
- Both new phone numbers live with owner names, all tel-clickable
- Off-page ranking (Google Search Console, backlinks, domain age) out of code scope — advised user

---
Task ID: 1
Agent: main (Super Z)
Task: Hamidi Cars website — make background simple (remove 3D), fix brand spelling to «حمیدی»

Work Log:
- Initialized fullstack dev environment (init-fullstack.sh)
- Created `src/components/simple-background.tsx` — pure CSS fixed background (dark base #050506, soft golden radial glows, subtle grid pattern with radial mask, vignette). No Three.js/WebGL.
- Updated `src/components/hamidi-site.tsx`:
  - Removed dynamic import of `car-3d-background` and `useScrollTracker` usage
  - Replaced `<Car3DBackground />` with `<SimpleBackground />`
  - Added hero car image (`/cars/hero.png`, black chrome car with gold rims) with golden glow backdrop + entrance animation
- Deleted `src/components/car-3d-background.tsx` (522-line Three.js scene)
- Fixed spelling «همیدی» → «حمیدی» across: hamidi-site.tsx, site-header.tsx (aria-label + subtitle), site-sections.tsx (kicker + services), site-contact.tsx (about, testimonials, contact info, toast, alt text), layout.tsx (metadata title/description/keywords/openGraph)
- Verified with Agent Browser:
  - Desktop (1280px): hero, stats, cars grid, benefits, services, about, testimonials, contact all render correctly
  - Contact form golden path: filled name+phone → submitted → toast «درخواست شما ثبت شد» appeared → record persisted in SQLite via Prisma (checked with bun query)
  - Mobile (390x844): layout stacks correctly, hamburger menu opens/closes with all nav links + CTA
  - No console errors, no page errors
- `bun run lint` passes clean; dev.log shows 200 responses, compiled successfully

Stage Summary:
- Site now uses a simple elegant CSS background (per user request: نه سه‌بعدی)
- Brand name correctly spelled «حمیدی کارز» / Hamidi Cars everywhere
- Hero enhanced with luxury car image fitting the dark-gold 2026 luxury theme
- All interactive flows verified end-to-end in browser
