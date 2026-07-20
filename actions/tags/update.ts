"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";

export async function updateTag(
  id: string,
  { name }: { name: string },
): Promise<{ error?: string }> {
  await prisma.tag.update({
    where: { id },
    data: { name, slug: slugify(name) },
  });
  revalidateReferences();
  return {};
}
