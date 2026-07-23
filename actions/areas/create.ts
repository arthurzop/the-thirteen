"use server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";

export async function createArea({
  name,
  typeId,
}: {
  name: string;
  typeId: string;
}): Promise<{ error?: string; id?: string }> {
  const slug = slugify(name);
  const existing = await prisma.area.findFirst({ where: { typeId, slug } });

  if (existing) {
    return { error: "An Area with this name already exists for this Type." };
  }

  const created = await prisma.area.create({ data: { name, slug, typeId } });
  revalidateReferences();
  return { id: created.id };
}
