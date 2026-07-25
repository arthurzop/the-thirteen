"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getMostUsedTags = unstable_cache(
  async (limit = 7) => {
    const tags = await prisma.tag.findMany();

    const withCounts = await Promise.all(
      tags.map(async (tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        count: await prisma.reference.count({
          where: { tagIds: { has: tag.id } },
        }),
      })),
    );

    return withCounts.sort((a, b) => b.count - a.count).slice(0, limit);
  },
  ["most-used-tags"],
  { tags: ["references"] },
);

export const getRecentlyAddedTags = unstable_cache(
  async (limit = 4) => {
    const tags = await prisma.tag.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return Promise.all(
      tags.map(async (tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        count: await prisma.reference.count({
          where: { tagIds: { has: tag.id } },
        }),
      })),
    );
  },
  ["recently-added-tags"],
  { tags: ["references"] },
);
