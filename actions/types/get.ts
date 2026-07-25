"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getTypes = unstable_cache(
  async () => {
    return prisma.type.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    });
  },
  ["types"],
  { tags: ["references"] },
);
