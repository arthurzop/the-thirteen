"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function updateArea(
  id: string,
  { name, typeId }: { name: string; typeId: string },
) {
  await prisma.area.update({
    where: { id },
    data: { name, slug: slugify(name), typeId },
  });
  revalidatePath("/admin/taxonomy");
}
