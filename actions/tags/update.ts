"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function updateTag(id: string, { name }: { name: string }) {
  await prisma.tag.update({
    where: { id },
    data: { name, slug: slugify(name) },
  });
  revalidatePath("/admin/taxonomy");
}
