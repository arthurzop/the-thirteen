"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
export async function createType({ name }: { name: string }) {
  const slug = slugify(name);
  const existing = await prisma.type.findUnique({ where: { slug } });
  if (existing) throw new Error("A Type with this name already exists.");
  await prisma.type.create({ data: { name, slug } });

  revalidateReferences();
}
