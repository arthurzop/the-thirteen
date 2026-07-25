"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getCollections = unstable_cache(
  async (limit?: number) => {
    const collections = await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
    });

    return collections.map((collection) => ({
      id: collection.id,
      slug: collection.slug,
      title: collection.title,
      description: collection.description,
      coverImage: collection.coverImage,
      referenceCount: collection.referenceIds.length,
    }));
  },
  ["collections"],
  { tags: ["references"] },
);

export const getCollectionBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.collection.findUnique({
      where: { slug },
      include: {
        references: {
          include: { type: true, areas: true, tags: true },
        },
      },
    });
  },
  ["collection-by-slug"],
  { tags: ["references"] },
);
