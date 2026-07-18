"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function createArea({
  name,
  typeId,
}: {
  name: string;
  typeId: string;
}) {
  const slug = slugify(name);
  const existing = await prisma.area.findFirst({ where: { typeId, slug } });
  if (existing)
    throw new Error("An Area with this name already exists for this Type.");
  await prisma.area.create({ data: { name, slug, typeId } });
  revalidatePath("/admin/taxonomy");
}
