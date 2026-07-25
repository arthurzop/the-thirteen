"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getRecentReferences = unstable_cache(
  async (limit = 7) => {
    return prisma.reference.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { type: true, areas: true, tags: true },
    });
  },
  ["recent-references"],
  { tags: ["references"] },
);
