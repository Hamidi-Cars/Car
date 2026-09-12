"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CarFront,
  Gauge,
  ImagePlus,
  LockKeyhole,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  Route,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { carImageSrc } from "./site-sections";
import type { SiteCar } from "@/lib/cars";

/* ----------------------------- helpers ------------------------------- */

/** فشرده‌سازی عکس انتخاب‌شده در مرورگر (حداکثر عرض ۱۲۸۰px، JPEG ۸۵٪) */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("خطا در خواندن فایل"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("فایل تصویر معتبر نیست"));
      img.onload = () => {
        const maxW = 1280;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("خطا در پردازش تصویر"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const EMPTY_FORM = { name: "", imageUrl: "", speed: "", mileage: "", description: "" };

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

const inputClass =
  "border-white/10 bg-white/[0.04] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/40 focus-visible:border-[#d4af37]/50 h-11";

/* ------------------------------ component ---------------------------- */

export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<"loading" | "yes" | "no">("loading");

  // فرم افزودن / ویرایش
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formMsg, setFormMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ورود
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginErr, setLoginErr] = useState<string | null>(null);

  const [cars, setCars] = useState<SiteCar[]>([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---------- باز و بسته شدن با هش #admin ---------- */
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#admin");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setOpen(false);
  }, []);

  // قفل اسکرول صفحه پشت پنل + کلید Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  /* ---------- بررسی وضعیت ورود هنگام باز شدن ---------- */
  const loadCars = useCallback(async () => {
    setCarsLoading(true);
    try {
      const res = await fetch("/api/cars", { cache: "no-store" });
      const data = (await res.json()) as { cars?: SiteCar[] };
      setCars(Array.isArray(data.cars) ? data.cars : []);
    } catch {
      setCars([]);
    } finally {
      setCarsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    if (isStaticExport) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = (await res.json()) as { admin?: boolean };
        if (cancelled) return;
        if (data.admin) {
          setAuthed("yes");
          loadCars();
        } else {
          setAuthed("no");
        }
      } catch {
        if (!cancelled) setAuthed("no");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, loadCars]);

  /* ---------- ورود / خروج ---------- */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginBusy(true);
    setLoginErr(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setAuthed("yes");
        setPassword("");
        loadCars();
      } else {
        setLoginErr(data.error || "ورود ناموفق بود");
      }
    } catch {
      setLoginErr("ارتباط با سرور برقرار نشد");
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setAuthed("no");
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  /* ---------- عملیات CRUD خودرو ---------- */
  function startEdit(car: SiteCar) {
    setEditingId(car.id);
    setForm({
      name: car.name,
      imageUrl: car.imageUrl,
      speed: car.speed,
      mileage: car.mileage,
      description: car.description,
    });
    setFormMsg(null);
    document.getElementById("admin-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function announceAfterSave(ok: boolean) {
    if (!ok) return;
    window.dispatchEvent(new Event("cars-updated")); // به‌روزرسانی زنده بخش خودروهای سایت
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormMsg(null);

    if (!form.name.trim()) {
      setFormMsg({ type: "err", text: "اسم ماشین را وارد کنید" });
      return;
    }
    if (!form.imageUrl.trim()) {
      setFormMsg({ type: "err", text: "عکس خودرو را انتخاب کنید" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(editingId ? `/api/cars/${editingId}` : "/api/cars", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        announceAfterSave(true);
        setFormMsg({
          type: "ok",
          text: editingId ? "تغییرات خودرو ذخیره شد" : "خودرو با موفقیت به سایت اضافه شد",
        });
        cancelEdit();
        loadCars();
      } else {
        setFormMsg({ type: "err", text: data.error || "ذخیره ناموفق بود" });
      }
    } catch {
      setFormMsg({ type: "err", text: "ارتباط با سرور برقرار نشد" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(car: SiteCar) {
    if (!window.confirm(`«${car.name}» از سایت حذف شود؟`)) return;
    try {
      const res = await fetch(`/api/cars/${car.id}`, { method: "DELETE" });
      if (res.ok) {
        announceAfterSave(true);
        loadCars();
        if (editingId === car.id) cancelEdit();
      }
    } catch {
      /* ignore */
    }
  }

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFormMsg({ type: "err", text: "فقط فایل تصویر انتخاب کنید" });
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setForm((f) => ({ ...f, imageUrl: dataUrl }));
      setFormMsg(null);
    } catch (err) {
      setFormMsg({ type: "err", text: err instanceof Error ? err.message : "خطا در تصویر" });
    }
  }

  /* ------------------------------ render ------------------------------ */

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#050506]/98 backdrop-blur-md">
      <div className="min-h-full">
        {/* نوار بالای پنل */}
        <div className="sticky top-0 z-10 border-b border-[#d4af37]/15 bg-black/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f5d67b] via-[#d4af37] to-[#8a6d1f]">
                <CarFront className="h-5 w-5 text-black" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-black text-[#f0d68a]">پنل مدیریت حمیدی کارز</p>
                <p className="text-[10px] text-zinc-500">مدیریت خودروهای سایت</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {authed === "yes" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-full border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-red-500/15 hover:text-red-300"
                >
                  <LogOut className="ml-1.5 h-4 w-4" />
                  خروج
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={close}
                className="rounded-full border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f0d68a] hover:bg-[#d4af37] hover:text-black"
              >
                <X className="ml-1 h-4 w-4" />
                بستن
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {isStaticExport ? (
            <div className="mx-auto mt-16 max-w-md rounded-2xl border border-[#d4af37]/25 bg-black/60 p-8 text-center">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#d4af37]" />
              <p className="text-sm leading-7 text-zinc-300">
                پنل مدیریت روی نسخه استاتیک فعال نیست.
                <br />
                از آدرس اصلی سایت استفاده کنید.
              </p>
            </div>
          ) : authed === "loading" ? (
            <div className="flex justify-center py-24">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37]" />
            </div>
          ) : authed === "no" ? (
            /* ------------------------ صفحه ورود ------------------------ */
            <div className="mx-auto mt-10 max-w-md sm:mt-16">
              <div className="rounded-3xl border border-[#d4af37]/25 bg-black/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
                <div className="mb-7 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5d67b] via-[#d4af37] to-[#8a6d1f] shadow-[0_0_35px_rgba(212,175,55,0.35)]">
                    <LockKeyhole className="h-7 w-7 text-black" />
                  </span>
                  <h1 className="text-xl font-black text-white">ورود به پنل مدیریت</h1>
                  <p className="mt-2 text-xs leading-6 text-zinc-500">
                    دسترسی ویژه مدیران مجموعه حمیدی کارز
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="admin-username" className="text-xs font-bold text-zinc-300">
                      نام کاربری
                    </Label>
                    <div className="relative">
                      <UserRound className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="admin-username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="admin-password" className="text-xs font-bold text-zinc-300">
                      رمز عبور
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>

                  {loginErr && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300">
                      {loginErr}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loginBusy}
                    className="h-12 w-full rounded-xl bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] text-base font-black text-black shadow-[0_10px_40px_rgba(212,175,55,0.35)] transition-all hover:shadow-[0_10px_55px_rgba(212,175,55,0.55)] disabled:opacity-60"
                  >
                    {loginBusy ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        در حال ورود...
                      </span>
                    ) : (
                      <>
                        <LogIn className="ml-2 h-5 w-5" />
                        ورود به پنل
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            /* ------------------------ داشبورد ------------------------ */
            <div className="grid items-start gap-6 lg:grid-cols-5">
              {/* فرم خودرو */}
              <form
                onSubmit={handleSave}
                id="admin-form-top"
                className="rounded-3xl border border-[#d4af37]/20 bg-black/60 p-5 backdrop-blur-xl sm:p-6 lg:col-span-2"
              >
                <h2 className="mb-1 flex items-center gap-2 text-base font-black text-[#f0d68a]">
                  {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-5 w-5" />}
                  {editingId ? "ویرایش خودرو" : "افزودن خودرو جدید"}
                </h2>
                <p className="mb-5 text-[11px] leading-5 text-zinc-500">
                  خودروی ذخیره‌شده بلافاصله در بخش «خودروهای ۲۰۲۶» سایت نمایش داده می‌شود.
                </p>

                <div className="space-y-4">
                  {/* عکس */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-zinc-300">عکس خودرو</Label>
                    {form.imageUrl ? (
                      <div className="relative overflow-hidden rounded-2xl border border-white/10">
                        <img
                          src={carImageSrc(form.imageUrl)}
                          alt="پیش‌نمایش عکس خودرو"
                          className="aspect-[16/10] w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setForm((f) => ({ ...f, imageUrl: "" }));
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute left-2 top-2 rounded-lg bg-black/70 p-2 text-red-300 backdrop-blur transition-colors hover:bg-red-500/25"
                          aria-label="حذف عکس"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d4af37]/35 bg-[#d4af37]/[0.04] text-zinc-400 transition-colors hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 hover:text-[#f0d68a]"
                      >
                        <ImagePlus className="h-8 w-8" />
                        <span className="text-xs font-bold">انتخاب عکس از دستگاه</span>
                        <span className="text-[10px] text-zinc-600">JPG یا PNG — تا ۱۰ مگابایت</span>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </div>

                  {/* اسم ماشین */}
                  <div className="space-y-1.5">
                    <Label htmlFor="car-name" className="text-xs font-bold text-zinc-300">
                      اسم ماشین <span className="text-[#d4af37]">*</span>
                    </Label>
                    <Input
                      id="car-name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="مثلاً: تویوتا لندکروز ۳۰۰ GXR"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* سرعت */}
                    <div className="space-y-1.5">
                      <Label htmlFor="car-speed" className="text-xs font-bold text-zinc-300">
                        سرعت
                      </Label>
                      <div className="relative">
                        <Gauge className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="car-speed"
                          value={form.speed}
                          onChange={(e) => setForm((f) => ({ ...f, speed: e.target.value }))}
                          placeholder="۲۲۰ کیلومتر بر ساعت"
                          className={`${inputClass} pr-10 text-xs`}
                        />
                      </div>
                    </div>
                    {/* کارکرد */}
                    <div className="space-y-1.5">
                      <Label htmlFor="car-mileage" className="text-xs font-bold text-zinc-300">
                        کارکرد
                      </Label>
                      <div className="relative">
                        <Route className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="car-mileage"
                          value={form.mileage}
                          onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                          placeholder="صفر کیلومتر"
                          className={`${inputClass} pr-10 text-xs`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* توضیحات */}
                  <div className="space-y-1.5">
                    <Label htmlFor="car-desc" className="text-xs font-bold text-zinc-300">
                      توضیحات
                    </Label>
                    <Textarea
                      id="car-desc"
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="مدل، موتور، آپشن‌ها، قیمت و هر توضیحی که می‌خواهید در کارت خودرو نمایش داده شود..."
                      rows={4}
                      className="border-white/10 bg-white/[0.04] text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/40"
                    />
                  </div>

                  {formMsg && (
                    <p
                      className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${
                        formMsg.type === "ok"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-red-500/30 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {formMsg.text}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="h-11 flex-1 rounded-xl bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] font-black text-black shadow-[0_8px_30px_rgba(212,175,55,0.3)] disabled:opacity-60"
                    >
                      {saving ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                          در حال ذخیره...
                        </span>
                      ) : (
                        <>
                          <Plus className="ml-1.5 h-4 w-4" />
                          {editingId ? "ذخیره تغییرات" : "افزودن به سایت"}
                        </>
                      )}
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelEdit}
                        className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-zinc-300"
                      >
                        انصراف
                      </Button>
                    )}
                  </div>
                </div>
              </form>

              {/* لیست خودروها */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6 lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-base font-black text-white">
                    <CarFront className="h-5 w-5 text-[#d4af37]" />
                    خودروهای سایت
                  </h2>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-bold text-zinc-400">
                    {carsLoading ? "..." : `${cars.length} خودرو`}
                  </span>
                </div>

                {carsLoading ? (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
                    ))}
                  </div>
                ) : cars.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-xs leading-6 text-zinc-500">
                    هنوز خودرویی ثبت نشده است؛ با فرم کنار صفحه اولین خودرو را اضافه کنید.
                  </p>
                ) : (
                  <ul className="max-h-[70vh] space-y-3 overflow-y-auto pl-1">
                    {cars.map((car) => (
                      <li
                        key={car.id}
                        className={`flex gap-3 rounded-2xl border p-3 transition-colors ${
                          editingId === car.id
                            ? "border-[#d4af37]/50 bg-[#d4af37]/[0.06]"
                            : "border-white/8 bg-white/[0.02] hover:border-[#d4af37]/25"
                        }`}
                      >
                        <img
                          src={carImageSrc(car.imageUrl)}
                          alt={car.name}
                          className="h-20 w-28 shrink-0 rounded-xl border border-white/10 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-extrabold text-zinc-100">{car.name}</p>
                          <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-zinc-500">
                            <span>سرعت: {car.speed || "—"}</span>
                            <span>کارکرد: {car.mileage || "—"}</span>
                          </p>
                          {car.description && (
                            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-zinc-500">
                              {car.description}
                            </p>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(car)}
                            aria-label={`ویرایش ${car.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f0d68a] transition-colors hover:bg-[#d4af37] hover:text-black"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(car)}
                            aria-label={`حذف ${car.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 transition-colors hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
