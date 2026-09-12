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

export async function GET() {
  try {
    const cars = await db.car.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        speed: true,
        mileage: true,
        description: true,
      },
    });
    return NextResponse.json({ cars });
  } catch {
    return NextResponse.json({ cars: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "دسترسی غیرمجاز" }, { status: 401 });
  }

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
    const car = await db.car.create({ data });
    return NextResponse.json({ ok: true, car }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "خطا در ذخیره خودرو" }, { status: 500 });
  }
}
