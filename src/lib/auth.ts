import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "purti-creations-secure-jwt-admin-secret-2026"
);

const COOKIE_NAME = "purti_admin_token";

export async function createAdminToken(username: string = "admin"): Promise<string> {
  return await new SignJWT({ username, role: "ADMIN" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.role === "ADMIN";
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return await verifyAdminToken(token);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
