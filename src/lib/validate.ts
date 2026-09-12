/** اعتبارسنجی ورودی خودرو از پنل مدیریت */

/** حداکثر حجم عکس base64 — حدود ۳.۵ مگابایت */
const MAX_IMAGE_LENGTH = 3_500_000;

export type CarInput = {
  name: string;
  imageUrl: string;
  speed: string;
  mileage: string;
  description: string;
};

export function validateCarInput(body: unknown): CarInput | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const imageUrl = typeof b.imageUrl === "string" ? b.imageUrl.trim() : "";
  const speed = typeof b.speed === "string" ? b.speed.trim().slice(0, 120) : "";
  const mileage = typeof b.mileage === "string" ? b.mileage.trim().slice(0, 120) : "";
  const description =
    typeof b.description === "string" ? b.description.trim().slice(0, 3000) : "";

  if (!name || name.length > 200) return null;

  // عکس: مسیر داخلی، URL بیرونی یا data URL تصویر
  const isPath = /^\/[\w\-./]*$/.test(imageUrl);
  const isHttp = /^https?:\/\/\S+$/.test(imageUrl);
  const isData = /^data:image\/(png|jpe?g|webp|gif);base64,/.test(imageUrl);
  if (!isPath && !isHttp && !isData) return null;
  if (imageUrl.length > MAX_IMAGE_LENGTH) return null;

  return { name, imageUrl, speed, mileage, description };
}
