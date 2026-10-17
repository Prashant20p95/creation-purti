import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.storeSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { settings, newPassword } = body;

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.storeSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }

    if (newPassword && newPassword.trim().length >= 6) {
      const passwordHash = await bcrypt.hash(newPassword.trim(), 12);
      await prisma.adminUser.upsert({
        where: { username: "admin" },
        update: { passwordHash },
        create: {
          username: "admin",
          passwordHash,
          name: "Store Owner",
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
