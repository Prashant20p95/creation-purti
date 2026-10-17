import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Check against admin user bcrypt hash or configured env variable (no hardcoded fallback)
    const adminUser = await prisma.adminUser.findFirst();
    const envPassword = process.env.ADMIN_PASSWORD;

    let isValid = false;

    if (adminUser?.passwordHash) {
      isValid = await bcrypt.compare(password, adminUser.passwordHash);
    }

    if (!isValid && envPassword && password === envPassword) {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const token = await createAdminToken(adminUser?.username || "admin");

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
    });

    const isHttps = req.url.startsWith("https://");
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Login failed due to a server error." },
      { status: 500 }
    );
  }
}
