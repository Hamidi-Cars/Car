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
