"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";

export async function updateCollection(
  id: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const referenceIds = formData.getAll("referenceIds") as string[];
  const newCoverImageFile = formData.get("coverImage") as File | null;

  if (!title) {
    return { error: "Title is required." };
  }

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
