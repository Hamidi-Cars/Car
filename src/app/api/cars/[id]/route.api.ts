import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { validateCarInput } from "@/lib/validate";

export const dynamic = "force-dynamic";

async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const { id } = await ctx.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const data = validateCarInput(body);
  if (!data) {
    return NextResponse.json(
      { ok: false, error: "اطلاعات خودرو کامل نیست (نام و عکس الزامی است)" },
      { status: 400 }
    );
  }

  try {
    const car = await db.car.update({ where: { id }, data });
    return NextResponse.json({ ok: true, car });
  } catch {
    return NextResponse.json({ ok: false, error: "خودرو پیدا نشد" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const { id } = await ctx.params;

  try {
    await db.car.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "خودرو پیدا نشد" }, { status: 404 });
  }
}
