import { NextResponse } from "next/server";
import { createAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  const target = url.searchParams.get("target") || "/admin";

  if (!key || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await createAdminToken("admin");
  const redirectUrl = new URL(target, req.url);

  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: req.url.startsWith("https://"),
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
