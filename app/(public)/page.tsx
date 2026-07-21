import HomeShell from "@/components/reference/homeShell";
import { getTypes } from "@/actions/types/get";
import { getTags } from "@/actions/tags/get";
import { getReferences } from "@/actions/references/get";
import { mapReferenceToDetailData } from "@/lib/mappers/reference";

type HomeSearchParams = {
  type?: string;
  tag?: string;
  q?: string;
  ref?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<HomeSearchParams>;
}) {
  const params = await searchParams;

  const [types, tags, rawReferences] = await Promise.all([
    getTypes(),
    getTags(),
    getReferences(),
  ]);

  const references = rawReferences.map(mapReferenceToDetailData);

  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 py-4 md:px-8 md:py-8">
      <HomeShell
        types={types}
        tags={tags}
        references={references}
        initialTypeSlug={params.type}
        initialTagSlug={params.tag}
        initialQuery={params.q}
        initialReferenceSlug={params.ref}
      />
    </main>
  );
}
