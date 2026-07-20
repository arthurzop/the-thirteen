"use server";
import { prisma } from "@/lib/prisma";
import { revalidateReferences } from "@/lib/revalidate";

export async function deleteArea(id: string): Promise<{ error?: string }> {
  const referenceCount = await prisma.reference.count({
    where: { areaIds: { has: id } },
  });

  if (referenceCount > 0) {
    return {
      error: `Can't delete: ${referenceCount} Reference(s) still use this Area.`,
    };
  }

  await prisma.area.delete({ where: { id } });
  revalidateReferences();
  return {};
}
