"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CarFront,
  CloudUpload,
  Download,
  Gauge,
  ImagePlus,
  Link2,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  Pencil,
  PlugZap,
  Plus,
  Route,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { carImageSrc } from "./site-sections";
import type { SiteCar } from "@/lib/cars";
import {
  GH_REPO,
  checkLogin,
  clearSession,
  fetchCloudCars,
  getEffectiveCars,
  getGhToken,
  getSession,
  loadLocalCars,
  pushCarsToGitHub,
  registerAccount,
  saveLocalCars,
  setGhToken,
  setSession,
  testGhToken,
} from "@/lib/car-store";

/* ----------------------------- helpers ------------------------------- */

/** فشرده‌سازی عکس انتخاب‌شده در مرورگر (حداکثر عرض ۱۲۸۰px، JPEG ۸۰٪) */
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
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const EMPTY_FORM = { name: "", imageUrl: "", speed: "", mileage: "", description: "" };

const inputClass =
  "border-white/10 bg-white/[0.04] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#d4af37]/40 focus-visible:border-[#d4af37]/50 h-11";

type Msg = { type: "ok" | "err"; text: string } | null;

/* ------------------------------ component ---------------------------- */

export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<"loading" | "yes" | "no">("loading");

  // تب‌های صفحه ورود: ورود | ثبت‌نام
  const [tab, setTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("Admin");
  const [password, setPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginErr, setLoginErr] = useState<string | null>(null);

  // فرم افزودن / ویرایش خودرو
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formMsg, setFormMsg] = useState<Msg>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // لیست خودروها
  const [cars, setCars] = useState<SiteCar[]>([]);

  // تنظیمات همگام‌سازی گیت‌هاب
  const [showSettings, setShowSettings] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [syncBusy, setSyncBusy] = useState(false);
  const [syncMsg, setSyncMsg] = useState<Msg>(null);

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

  /* ---------- بررسی نشست + بارگذاری خودروها هنگام باز شدن ---------- */
  const loadCars = useCallback(async () => {
    setCars(await getEffectiveCars());
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    // خواندن نشست و توکن پس از نصب (خارج از رندر اولیه)
    const t = setTimeout(() => {
      if (cancelled) return;
      setTokenInput(getGhToken());
      const session = getSession();
      if (session) {
        setAuthed("yes");
        loadCars();
      } else {
        setAuthed("no");
      }
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [open, loadCars]);

  /* --------------------------- ورود / ثبت‌نام -------------------------- */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginBusy(true);
    setLoginErr(null);
    // تأخیر جزئی برای حس امنیتی و نمایش حالت «در حال ورود»
    await new Promise((r) => setTimeout(r, 350));
    if (checkLogin(username, password)) {
      setSession(username.trim());
      setAuthed("yes");
      setPassword("");
      loadCars();
    } else {
      setLoginErr("نام کاربری یا رمز عبور اشتباه است");
    }
    setLoginBusy(false);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr(null);
    if (regPass !== regPass2) {
      setLoginErr("رمز عبور و تکرار آن یکسان نیستند");
      return;
    }
    const res = registerAccount(regName, regPass);
    if (!res.ok) {
      setLoginErr(res.error || "ثبت‌نام ناموفق بود");
      return;
    }
    setSession(regName.trim());
    setAuthed("yes");
    setRegName("");
    setRegPass("");
    setRegPass2("");
    loadCars();
  }

  function handleLogout() {
    clearSession();
    setAuthed("no");
    setTab("login");
    setUsername("Admin");
    setPassword("");
    setForm(EMPTY_FORM);
    setImageUrlInput("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ------------------------ عملیات CRUD خودرو ------------------------ */

  function startEdit(car: SiteCar) {
    setEditingId(car.id);
    setForm({
      name: car.name,
      imageUrl: car.imageUrl,
      speed: car.speed,
      mileage: car.mileage,
      description: car.description,
    });
    setImageUrlInput(car.imageUrl.startsWith("data:") ? "" : car.imageUrl);
    setFormMsg(null);
    document.getElementById("admin-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageUrlInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /** ذخیره لیست در مرورگر + ارسال اختیاری به مخزن گیت‌هاب */
  async function persistCars(list: SiteCar[], withPush: boolean) {
    const saved = saveLocalCars(list);
    if (!saved.ok) {
      return { ok: false, error: saved.error || "ذخیره ناموفق بود", pushed: false as const };
    }
    setCars(list);
    window.dispatchEvent(new Event("cars-updated")); // به‌روزرسانی زنده بخش خودروهای سایت
    if (!withPush) return { ok: true as const, pushed: false as const };
    setSyncBusy(true);
    setSyncMsg({ type: "ok", text: "در حال انتشار در سایت برای همه بازدیدکنندگان..." });
    const res = await pushCarsToGitHub(getGhToken(), list);
    setSyncBusy(false);
    setSyncMsg(
      res.ok
        ? { type: "ok", text: "انتشار انجام شد؛ خودروها برای همه بازدیدکنندگان نمایش داده می‌شوند." }
        : { type: "err", text: `ذخیره محلی انجام شد اما انتشار ناموفق بود: ${res.error}` },
    );
    return { ok: true as const, pushed: res.ok };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormMsg(null);

    const name = form.name.trim();
    if (!name) {
      setFormMsg({ type: "err", text: "اسم ماشین را وارد کنید" });
      return;
    }
    // عکس: اولویت با فایل آپلودی، در غیر این صورت آدرس اینترنتی
    const finalImage = form.imageUrl || imageUrlInput.trim();
    if (!finalImage) {
      setFormMsg({ type: "err", text: "عکس خودرو را انتخاب یا آدرس اینترنتی آن را وارد کنید" });
      return;
    }

    setSaving(true);
    const car: SiteCar = {
      id: editingId ?? `car-${Date.now().toString(36)}`,
      name,
      imageUrl: finalImage,
      speed: form.speed.trim(),
      mileage: form.mileage.trim(),
      description: form.description.trim(),
    };
    const list = editingId
      ? cars.map((c) => (c.id === editingId ? car : c))
      : [car, ...cars];

    const res = await persistCars(list, Boolean(getGhToken()));
    setSaving(false);

    if (res.ok) {
      setFormMsg({
        type: "ok",
        text: editingId
          ? "تغییرات خودرو ذخیره شد"
          : "خودرو با موفقیت به سایت اضافه شد",
      });
      cancelEdit();
    } else {
      setFormMsg({ type: "err", text: res.error || "ذخیره ناموفق بود" });
    }
  }

  async function handleDelete(car: SiteCar) {
    if (!window.confirm(`«${car.name}» از سایت حذف شود؟`)) return;
    const list = cars.filter((c) => c.id !== car.id);
    const res = await persistCars(list, Boolean(getGhToken()));
    if (!res.ok) {
      setSyncMsg({ type: "err", text: res.error || "حذف ناموفق بود" });
      return;
    }
    if (editingId === car.id) cancelEdit();
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

  /* ----------------------- تنظیمات همگام‌سازی ------------------------ */

  async function handleSaveToken() {
    setSyncMsg(null);
    const t = tokenInput.trim();
    if (!t) {
      setGhToken("");
      setSyncMsg({ type: "ok", text: "توکن پاک شد؛ تغییرات فقط در همین مرورگر ذخیره می‌شود." });
      return;
    }
    setSyncBusy(true);
    const ok = await testGhToken(t);
    setSyncBusy(false);
    if (ok) {
      setGhToken(t);
      setSyncMsg({ type: "ok", text: "توکن ذخیره و اتصال به مخزن تأیید شد" });
    } else {
      setSyncMsg({ type: "err", text: "اتصال با این توکن برقرار نشد؛ دسترسی Contents کافی نیست" });
    }
  }

  async function handlePushNow() {
    setSyncMsg(null);
    setSyncBusy(true);
    setSyncMsg({ type: "ok", text: "در حال انتشار..." });
    const res = await pushCarsToGitHub(getGhToken(), cars);
    setSyncBusy(false);
    setSyncMsg(
      res.ok
        ? { type: "ok", text: "انتشار انجام شد؛ خودروها برای همه بازدیدکنندگان نمایش داده می‌شوند." }
        : { type: "err", text: res.error || "انتشار ناموفق بود" },
    );
  }

  async function handlePull() {
    setSyncMsg(null);
    setSyncBusy(true);
    const cloud = await fetchCloudCars();
    setSyncBusy(false);
    if (!cloud) {
      setSyncMsg({ type: "err", text: "دریافت لیست از سایت ناموفق بود" });
      return;
    }
    const saved = saveLocalCars(cloud);
    if (!saved.ok) {
      setSyncMsg({ type: "err", text: saved.error || "ذخیره ناموفق بود" });
      return;
    }
    setCars(cloud);
    window.dispatchEvent(new Event("cars-updated"));
    setSyncMsg({ type: "ok", text: "لیست خودروها از سایت بارگیری و جایگزین شد" });
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
          {authed === "loading" ? (
            <div className="flex justify-center py-24">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37]" />
            </div>
          ) : authed === "no" ? (
            /* ------------------ صفحه ورود و ثبت‌نام ------------------ */
            <div className="mx-auto mt-10 max-w-md sm:mt-16">
              <div className="rounded-3xl border border-[#d4af37]/25 bg-black/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
                <div className="mb-6 text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5d67b] via-[#d4af37] to-[#8a6d1f] shadow-[0_0_35px_rgba(212,175,55,0.35)]">
                    <LockKeyhole className="h-7 w-7 text-black" />
                  </span>
                  <h1 className="text-xl font-black text-white">پنل مدیریت</h1>
                  <p className="mt-2 text-xs leading-6 text-zinc-500">
                    ورود مدیران مجموعه حمیدی کارز برای افزودن و ویرایش خودروها
                  </p>
                </div>

                {/* تب ورود / ثبت‌نام */}
                <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
                  {(
                    [
                      ["login", "ورود", <LogIn key="l" className="h-4 w-4" />],
                      ["register", "ثبت‌نام", <UserPlus key="r" className="h-4 w-4" />],
                    ] as const
                  ).map(([key, label, icon]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setTab(key);
                        setLoginErr(null);
                      }}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-black transition-all ${
                        tab === key
                          ? "bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] text-black"
                          : "text-zinc-400 hover:text-[#f0d68a]"
                      }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>

                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="admin-username" className="text-xs font-bold text-zinc-300">
                        ایمیل یا نام کاربری
                      </Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="admin-username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Admin"
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
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-name" className="text-xs font-bold text-zinc-300">
                        ایمیل یا نام کاربری
                      </Label>
                      <div className="relative">
                        <UserRound className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="reg-name"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="مثلاً: Sina-Hamidi"
                          autoComplete="username"
                          className={`${inputClass} pr-10`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="reg-pass" className="text-xs font-bold text-zinc-300">
                        رمز عبور
                      </Label>
                      <div className="relative">
                        <LockKeyhole className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="reg-pass"
                          type="password"
                          value={regPass}
                          onChange={(e) => setRegPass(e.target.value)}
                          placeholder="حداقل ۶ کاراکتر"
                          autoComplete="new-password"
                          className={`${inputClass} pr-10`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="reg-pass2" className="text-xs font-bold text-zinc-300">
                        تکرار رمز عبور
                      </Label>
                      <div className="relative">
                        <LockKeyhole className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          id="reg-pass2"
                          type="password"
                          value={regPass2}
                          onChange={(e) => setRegPass2(e.target.value)}
                          placeholder="تکرار رمز عبور"
                          autoComplete="new-password"
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
                      className="h-12 w-full rounded-xl bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] text-base font-black text-black shadow-[0_10px_40px_rgba(212,175,55,0.35)] transition-all hover:shadow-[0_10px_55px_rgba(212,175,55,0.55)]"
                    >
                      <UserPlus className="ml-2 h-5 w-5" />
                      ایجاد حساب مدیر
                    </Button>

                    <p className="text-center text-[10px] leading-5 text-zinc-600">
                      حساب اصلی مدیر: نام کاربری Admin و رمز Admin-123
                    </p>
                  </form>
                )}
              </div>
            </div>
          ) : (
            /* ------------------------ داشبورد ------------------------ */
            <div className="space-y-6">
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
                      {/* یا آدرس اینترنتی عکس */}
                      <div className="relative">
                        <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          placeholder="یا آدرس اینترنتی عکس (اختیاری)"
                          dir="ltr"
                          className={`${inputClass} pr-10 text-left text-xs`}
                        />
                      </div>
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
                      {cars.length} خودرو
                    </span>
                  </div>

                  {cars.length === 0 ? (
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

              {/* تنظیمات انتشار (همگام‌سازی گیت‌هاب) */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6">
                <button
                  type="button"
                  onClick={() => setShowSettings((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 text-right"
                >
                  <span className="flex items-center gap-2 text-base font-black text-white">
                    <Settings className="h-5 w-5 text-[#d4af37]" />
                    تنظیمات انتشار خودروها
                  </span>
                  <span
                    className={`rounded-full border border-white/10 px-3 py-1 text-[11px] font-bold ${
                      getGhToken()
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {getGhToken() ? "متصل به گیت‌هاب" : "فقط ذخیره محلی"}
                  </span>
                </button>

                {showSettings && (
                  <div className="mt-5 space-y-4">
                    <p className="text-xs leading-6 text-zinc-400">
                      بدون تنظیم، خودروها فقط در <b className="text-zinc-200">همین مرورگر</b> ذخیره می‌شوند.
                      برای اینکه همه بازدیدکنندگان خودروها را ببینند، یک بار توکن گیت‌هاب با دسترسی
                      <b className="text-zinc-200"> Contents: Read and write</b> روی مخزن
                      <span className="mx-1 font-bold text-[#f0d68a]" dir="ltr">
                        {GH_REPO}
                      </span>
                      بسازید و اینجا ذخیره کنید.
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative flex-1">
                        <ShieldCheck className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <Input
                          value={tokenInput}
                          onChange={(e) => setTokenInput(e.target.value)}
                          placeholder="ghp_... یا توکن fine-grained"
                          dir="ltr"
                          type="password"
                          autoComplete="off"
                          className={`${inputClass} pr-10 text-left text-xs`}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleSaveToken}
                        disabled={syncBusy}
                        className="h-11 rounded-xl bg-gradient-to-l from-[#b8860b] via-[#d4af37] to-[#f5d67b] font-black text-black"
                      >
                        <Save className="ml-1.5 h-4 w-4" />
                        ذخیره و آزمون
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        onClick={handlePushNow}
                        disabled={syncBusy}
                        className="h-10 rounded-xl border-0 bg-[#d4af37]/15 text-xs font-black text-[#f0d68a] hover:bg-[#d4af37]/25"
                        variant="outline"
                      >
                        <CloudUpload className="ml-1.5 h-4 w-4" />
                        انتشار لیست فعلی برای همه
                      </Button>
                      <Button
                        type="button"
                        onClick={handlePull}
                        disabled={syncBusy}
                        className="h-10 rounded-xl border-white/10 bg-white/[0.03] text-xs font-bold text-zinc-300"
                        variant="outline"
                      >
                        <Download className="ml-1.5 h-4 w-4" />
                        بارگیری لیست از سایت
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          setGhToken("");
                          setTokenInput("");
                          setSyncMsg({ type: "ok", text: "توکن پاک شد" });
                        }}
                        className="h-10 rounded-xl border-red-500/20 bg-red-500/5 text-xs font-bold text-red-300 hover:bg-red-500/15"
                        variant="outline"
                      >
                        <PlugZap className="ml-1.5 h-4 w-4" />
                        قطع اتصال
                      </Button>
                    </div>

                    {syncMsg && (
                      <p
                        className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${
                          syncMsg.type === "ok"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : "border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {syncMsg.text}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
