import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function verifyPassword(password: string): Promise<boolean> {
  const settings = await prisma.settings.findFirst();
  if (!settings) return false;

  return bcrypt.compare(password, settings.passwordHash);
}