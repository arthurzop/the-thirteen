"use server";

import { prisma } from "@/lib/prisma";

export async function getAreas() {
  return prisma.area.findMany({
    select: { id: true, name: true, slug: true, typeId: true },
    orderBy: { name: "asc" },
  });
}
