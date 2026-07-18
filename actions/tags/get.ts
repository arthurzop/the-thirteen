"use server";

import { prisma } from "@/lib/prisma";

export async function getTags() {
  return prisma.tag.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}