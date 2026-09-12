import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  const admin = verifyToken(store.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ admin });
}
