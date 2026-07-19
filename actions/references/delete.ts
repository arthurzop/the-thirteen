"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary/upload";
import { revalidateReferences } from "@/lib/revalidate";
export async function deleteReference(id: string) {
  const reference = await prisma.reference.findUnique({ where: { id } });
  if (!reference) return;

  await prisma.reference.delete({ where: { id } });

  const publicIds = [
    reference.mainImage.publicId,
    ...reference.gallery.map((g) => g.publicId),
  ];
  await Promise.all(publicIds.filter(Boolean).map(deleteImage));

  revalidateReferences();
}
