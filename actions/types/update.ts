"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function updateType(id: string, { name }: { name: string }) {
  await prisma.type.update({
    where: { id },
    data: { name, slug: slugify(name) },
  });
  revalidatePath("/admin/taxonomy");
}
