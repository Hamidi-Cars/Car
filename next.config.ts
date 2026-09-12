import type { NextConfig } from "next";

/**
 * - حالت عادی (پیش‌فرض): standalone برای اجرای سرور
 * - حالت استاتیک (STATIC_EXPORT=1): خروجی out/ برای میزبانی روی GitHub Pages
 *   همراه با basePath زیرپوشه ریپو (NEXT_PUBLIC_BASE_PATH=/Car)
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : { output: "standalone" as const }),
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
