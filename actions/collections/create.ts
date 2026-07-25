"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
import { COLLECTION_PLACEHOLDER } from "@/lib/cloudinary/placeholders";
import { collectionSchema } from "@/lib/validations/collection";

export async function createCollection(
  formData: FormData,
): Promise<{ error?: string }> {
  const parsed = collectionSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    referenceIds: formData.getAll("referenceIds"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { title, description, referenceIds } = parsed.data;
  const coverImageFile = formData.get("coverImage") as File;

  const coverImage =
    coverImageFile && coverImageFile.size > 0
      ? await uploadImage(coverImageFile)
      : COLLECTION_PLACEHOLDER;

  await prisma.collection.create({
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      coverImage,
      referenceIds,
    },
  });

  await prisma.collection.create({
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      coverImage,
      referenceIds,
      publishedAt: new Date(),
    },
  });

  revalidateReferences();
  return {};
}
