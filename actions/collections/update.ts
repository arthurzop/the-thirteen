"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
import { collectionSchema } from "@/lib/validations/collection";

export async function updateCollection(
  id: string,
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
  const newCoverImageFile = formData.get("coverImage") as File | null;

  const existing = await prisma.collection.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Collection not found." };
  }

  let coverImage = existing.coverImage;

  if (newCoverImageFile && newCoverImageFile.size > 0) {
    coverImage = await uploadImage(newCoverImageFile);
    if (existing.coverImage.publicId) {
      await deleteImage(existing.coverImage.publicId);
    }
  }

  await prisma.collection.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      description: description || null,
      coverImage,
      referenceIds,
    },
  });

  revalidateReferences();
  return {};
}
