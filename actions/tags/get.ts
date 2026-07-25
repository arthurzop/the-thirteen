"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getTags = unstable_cache(
  async () => {
    return prisma.tag.findMany({
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    });
  },
  ["tags"],
  { tags: ["references"] },
);
