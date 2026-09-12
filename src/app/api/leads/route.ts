import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, carModel, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "نام و نام خانوادگی معتبر وارد کنید" },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== "string" || !/^[\d\s+\-()۰-۹]{8,15}$/.test(phone.trim())) {
      return NextResponse.json(
        { success: false, error: "شماره تماس معتبر وارد کنید" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        carModel: typeof carModel === "string" ? carModel.trim() : null,
        message: typeof message === "string" ? message.trim() : null,
      },
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err) {
    console.error("Lead creation failed:", err);
    return NextResponse.json(
      { success: false, error: "خطای سرور، لطفاً دوباره تلاش کنید" },
      { status: 500 }
    );
  }
}
