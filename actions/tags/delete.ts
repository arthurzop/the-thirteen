"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteTag(id: string) {
  const referenceCount = await prisma.reference.count({
    where: { tagIds: { has: id } },
  });
  if (referenceCount > 0) {
    throw new Error(
      `Can't delete: ${referenceCount} Reference(s) still use this Tag.`,
    );
  }
  await prisma.tag.delete({ where: { id } });
  revalidatePath("/admin/taxonomy");
}
