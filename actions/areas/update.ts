"use server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";

export async function updateArea(
  id: string,
  { name, typeId }: { name: string; typeId: string },
): Promise<{ error?: string }> {
  await prisma.area.update({
    where: { id },
    data: { name, slug: slugify(name), typeId },
  });
  revalidateReferences();
  return {};
}
