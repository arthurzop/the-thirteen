"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
import { referenceSchema } from "@/lib/validations/reference";

async function findOrCreateTag(name: string) {
  const slug = slugify(name);
  const existing = await prisma.tag.findUnique({ where: { slug } });
  if (existing) return existing.id;
  const created = await prisma.tag.create({ data: { name, slug } });
  return created.id;
}

export async function updateReference(
  id: string,
  formData: FormData,
): Promise<{ error?: string }> {
  const parsed = referenceSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    typeId: formData.get("typeId"),
    areaIds: formData.getAll("areaIds"),
    tagNames: formData.getAll("tagNames"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { title, subtitle, description, typeId, areaIds, tagNames } =
    parsed.data;

  const metadataRaw = formData.get("metadata") as string | null;
  const keepGalleryRaw = formData.get("keepGalleryPublicIds") as string | null;
  const newMainImageFile = formData.get("mainImage") as File | null;
  const newGalleryFiles = formData.getAll("gallery") as File[];
  const linksRaw = formData.get("links") as string | null;

  const existing = await prisma.reference.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Reference not found." };
  }

  const mainImage =
    newMainImageFile && newMainImageFile.size > 0
      ? await uploadImage(newMainImageFile)
      : existing.mainImage;

  if (
    newMainImageFile &&
    newMainImageFile.size > 0 &&
    existing.mainImage.publicId
  ) {
    await deleteImage(existing.mainImage.publicId);
  }

  const links = linksRaw ? JSON.parse(linksRaw) : [];

  const keepPublicIds: string[] = keepGalleryRaw
    ? JSON.parse(keepGalleryRaw)
    : existing.gallery.map((g) => g.publicId);

  const removedImages = existing.gallery.filter(
    (g) => !keepPublicIds.includes(g.publicId),
  );
  await Promise.all(removedImages.map((g) => deleteImage(g.publicId)));

  const keptGallery = existing.gallery.filter((g) =>
    keepPublicIds.includes(g.publicId),
  );

  const newGalleryImages = await Promise.all(
    newGalleryFiles
      .filter((file) => file.size > 0)
      .map(async (file) => ({ ...(await uploadImage(file)), alt: null })),
  );

  const tagIds = await Promise.all(tagNames.map(findOrCreateTag));
  const metadata = metadataRaw ? JSON.parse(metadataRaw) : [];

  await prisma.reference.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      subtitle: subtitle || null,
      description: description || null,
      mainImage,
      gallery: [...keptGallery, ...newGalleryImages],
      typeId,
      areaIds,
      tagIds,
      links,
      metadata,
    },
  });

  revalidateReferences();
  return {};
}
