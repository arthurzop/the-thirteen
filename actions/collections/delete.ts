"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary/upload";
import { revalidateReferences } from "@/lib/revalidate";
export async function deleteCollection(id: string) {
  const collection = await prisma.collection.findUnique({ where: { id } });
  if (!collection) return;

  await prisma.collection.delete({ where: { id } });

  if (collection.coverImage.publicId) {
    await deleteImage(collection.coverImage.publicId);
  }

  revalidateReferences();
}
