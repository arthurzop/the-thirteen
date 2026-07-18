"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";

async function findOrCreateTag(name: string) {
  const slug = slugify(name);
  const existing = await prisma.tag.findUnique({ where: { slug } });
  if (existing) return existing.id;

  const created = await prisma.tag.create({ data: { name, slug } });
  return created.id;
}

export async function createReference(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const typeId = formData.get("typeId") as string;
  const areaIds = formData.getAll("areaIds") as string[];
  const tagNames = formData.getAll("tagNames") as string[];
  const mainImageFile = formData.get("mainImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];

  if (!title || !typeId || !mainImageFile || mainImageFile.size === 0) {
    throw new Error("Title, Type and Main Image are required.");
  }

  const mainImage = await uploadImage(mainImageFile);

  const gallery = await Promise.all(
    galleryFiles
      .filter((file) => file.size > 0)
      .map(async (file) => ({ ...(await uploadImage(file)), alt: null })),
  );

  const tagIds = await Promise.all(tagNames.map(findOrCreateTag));

  await prisma.reference.create({
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      mainImage,
      gallery,
      links: [],
      typeId,
      areaIds,
      tagIds,
      collectionIds: [],
      publishedAt: new Date(),
    },
  });

  revalidatePath("/admin");
}
