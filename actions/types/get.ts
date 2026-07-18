"use server";

import { prisma } from "@/lib/prisma";

export async function getTypes() {
  return prisma.type.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}