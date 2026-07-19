"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { revalidateReferences } from "@/lib/revalidate";
export async function deleteArea(id: string) {
  const referenceCount = await prisma.reference.count({
    where: { areaIds: { has: id } },
  });
  if (referenceCount > 0) {
    throw new Error(
      `Can't delete: ${referenceCount} Reference(s) still use this Area.`,
    );
  }
  await prisma.area.delete({ where: { id } });
  revalidateReferences();
}
