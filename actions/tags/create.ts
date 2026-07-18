"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function createTag({ name }: { name: string }) {
  const slug = slugify(name);
  const existing = await prisma.tag.findUnique({ where: { slug } });
  if (existing) throw new Error("A Tag with this name already exists.");
  await prisma.tag.create({ data: { name, slug } });
  revalidatePath("/admin/taxonomy");
}
