import SearchInput from "@/components/ui/SearchInput";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import { getTypes } from "@/actions/types/get";
import { getTags } from "@/actions/tags/get";
import { getReferences } from "@/actions/references/get";
import type { ReferenceDetailData } from "@/types/reference";

export default async function Home() {
  const [types, tags, rawReferences] = await Promise.all([
    getTypes(),
    getTags(),
    getReferences(),
  ]);

  const references: ReferenceDetailData[] = rawReferences.map((reference) => ({
    id: reference.id,
    slug: reference.slug,
    title: reference.title,
    subtitle: reference.subtitle ?? undefined,
    description: reference.description ?? undefined,
    mainImage: reference.mainImage,
    gallery: reference.gallery,
    links: reference.links,
    metadata: reference.metadata,
    type: { name: reference.type.name, slug: reference.type.slug },
    areas: reference.areas.map((area) => ({
      name: area.name,
      slug: area.slug,
    })),
    tags: reference.tags.map((tag) => ({ name: tag.name, slug: tag.slug })),
    createdAt: reference.createdAt.toISOString(),
  }));

  return (
    <main className="flex min-h-screen flex-col gap-4 px-8 py-8">
      <SearchInput />
      <ReferenceBrowser types={types} tags={tags} references={references} />
    </main>
  );
}
