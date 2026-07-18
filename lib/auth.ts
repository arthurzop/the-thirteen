import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

const secret = new TextEncoder().encode(env.JWT_SECRET);

export const SESSION_COOKIE_NAME = "thirteen_admin_session";
const SESSION_DURATION = "7d";

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}