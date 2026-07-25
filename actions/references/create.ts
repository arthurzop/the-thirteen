"use server";

import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary/upload";
import { slugify } from "@/lib/utils";
import { revalidateReferences } from "@/lib/revalidate";
import { REFERENCE_PLACEHOLDER } from "@/lib/cloudinary/placeholders";
import { referenceSchema } from "@/lib/validations/reference";

async function findOrCreateTag(name: string) {
  const slug = slugify(name);
  const existing = await prisma.tag.findUnique({ where: { slug } });
  if (existing) return existing.id;
  const created = await prisma.tag.create({ data: { name, slug } });
  return created.id;
}

export async function createReference(
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
  const mainImageFile = formData.get("mainImage") as File;
  const galleryFiles = formData.getAll("gallery") as File[];
  const linksRaw = formData.get("links") as string | null;

  const mainImage =
    mainImageFile && mainImageFile.size > 0
      ? await uploadImage(mainImageFile)
      : REFERENCE_PLACEHOLDER;

  const gallery = await Promise.all(
    galleryFiles
      .filter((file) => file.size > 0)
      .map(async (file) => ({ ...(await uploadImage(file)), alt: null })),
  );

  const resolvedTagIds = await Promise.all(tagNames.map(findOrCreateTag));
  const tagIds = [...new Set(resolvedTagIds)];
  const metadata = metadataRaw ? JSON.parse(metadataRaw) : [];
  const links = linksRaw ? JSON.parse(linksRaw) : [];

  await prisma.reference.create({
    data: {
      title,
      slug: slugify(title),
      subtitle: subtitle || null,
      description: description || null,
      mainImage,
      gallery,
      typeId,
      areaIds,
      tagIds,
      collectionIds: [],
      links,
      metadata,
      publishedAt: new Date(),
    },
  });

  revalidateReferences();
  return {};
}
