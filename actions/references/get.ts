"use server";

import { prisma } from "@/lib/prisma";

export async function getReferences() {
  return prisma.reference.findMany({
    include: { type: true, areas: true, tags: true },
    orderBy: { createdAt: "desc" },
  });
}