import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, cookieOptions, signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const { username, password } = (body ?? {}) as { username?: unknown; password?: unknown };

  if (!checkCredentials(username, password)) {
    return NextResponse.json(
      { ok: false, error: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signToken(), cookieOptions());
  return res;
}
