import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function verifyPassword(password: string): Promise<boolean> {
  const settings = await prisma.settings.findFirst();
  if (!settings) return false;
  return bcrypt.compare(password, settings.passwordHash);
}

export async function changePasswordInDb(
  currentPassword: string,
  newPassword: string,
): Promise<{ error?: string }> {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    return { error: "Settings not found." };
  }

  const isValid = await bcrypt.compare(currentPassword, settings.passwordHash);
  if (!isValid) {
    return { error: "Current password is incorrect." };
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await prisma.settings.update({
    where: { id: settings.id },
    data: { passwordHash: newHash },
  });

  return {};
}
