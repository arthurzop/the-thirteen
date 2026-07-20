"use server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";

export async function updateType(
  id: string,
  { name }: { name: string },
): Promise<{ error?: string }> {
  await prisma.type.update({
    where: { id },
    data: { name, slug: slugify(name) },
  });
  revalidateReferences();
  return {};
}
