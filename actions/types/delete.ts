"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function deleteType(id: string) {
  const [areaCount, referenceCount] = await Promise.all([
    prisma.area.count({ where: { typeId: id } }),
    prisma.reference.count({ where: { typeId: id } }),
  ]);

  if (areaCount > 0 || referenceCount > 0) {
    throw new Error(
      `Can't delete: ${referenceCount} Reference(s) and ${areaCount} Area(s) still use this Type.`,
    );
  }

  await prisma.type.delete({ where: { id } });
  revalidatePath("/admin/taxonomy");
}
