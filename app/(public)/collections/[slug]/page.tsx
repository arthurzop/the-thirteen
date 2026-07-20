import { notFound } from "next/navigation";
import { getCollectionBySlug } from "@/actions/collections/get";
import { mapReferenceToDetailData } from "@/lib/mappers/reference";
import CollectionReferenceBrowser from "@/components/collection/collectionReferenceBrowser";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) notFound();

  const references = collection.references.map(mapReferenceToDetailData);

  return (
    <div className="flex flex-col gap-4 md:gap-6 px-4 py-4 md:px-8 md:py-8 ">
      <div className="flex flex-col gap-4">
        <Link
          href="/collections"
          className="flex itemscenter bg-night-black hover:bg-gs-900 borer border-gs-900 rounded-full py-2 px-4 w-fit gap-2"
        >
          <ArrowLeft size={24} strokeWidth={1.25} />
          <p>Back to Collections</p>
        </Link>
      </div>
      <div className="flex flex-col gap-4 bg-gs-900 rounded-2xl border-gs-700 p-4 divide-y divide-gs-700">
        <div className="flex flex-col items-center md:items-start pb-4">
          <h1 className="text-2xl font-medium text-off-white">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-sm text-gs-400">{collection.description}</p>
          )}
        </div>

        {references.length === 0 ? (
          <p className="py-16 text-center text-sm text-gs-500">
            This collection has no references yet.
          </p>
        ) : (
          <CollectionReferenceBrowser references={references} />
        )}
      </div>
    </div>
  );
}
