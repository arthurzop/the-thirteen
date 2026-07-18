"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { verifyPassword } from "@/lib/auth-password";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({ password: formData.get("password") });

  if (!parsed.success) {
    return { error: "Password is required." };
  }

  const isValid = await verifyPassword(parsed.data.password);

  if (!isValid) {
    return { error: "Incorrect password." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}