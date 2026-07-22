"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
import { COLLECTION_PLACEHOLDER } from "@/lib/cloudinary/placeholders";

export async function createCollection(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const referenceIds = formData.getAll("referenceIds") as string[];
  const coverImageFile = formData.get("coverImage") as File;

  if (!title) {
    return { error: "Title is required." };
  }

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
      publishedAt: new Date(),
    },
  });

  revalidateReferences();
}