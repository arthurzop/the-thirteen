import Link from "next/link";
import { getTypes } from "@/actions/types/get";
import { getAreas } from "@/actions/areas/get";
import { getTags } from "@/actions/tags/get";
import TypesManager from "@/components/admin/typesManager";
import AreasManager from "@/components/admin/areasManager";
import TagsManager from "@/components/admin/tagsManager";

const TABS = [
  { key: "types", label: "Types" },
  { key: "areas", label: "Areas" },
  { key: "tags", label: "Tags" },
] as const;

export default async function TaxonomyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = TABS.some((t) => t.key === tab) ? tab : "types";

  const [types, areas, tags] = await Promise.all([
    getTypes(),
    getAreas(),
    getTags(),
  ]);

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      <div>
        <h1 className="text-xl font-medium text-off-white">Taxonomy</h1>
        <p className="text-sm text-gs-500">
          Manage Types, Areas and Tags used across the archive.
        </p>
      </div>
      <div className="flex gap-2 border-b border-gs-800">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/taxonomy?tab=${t.key}`}
            className={`px-4 py-2 text-sm transition-colors ${
              activeTab === t.key
                ? "border-b-2 border-off-white text-off-white"
                : "text-gs-500 hover:text-off-white"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {activeTab === "types" && <TypesManager types={types} />}
      {activeTab === "areas" && <AreasManager areas={areas} types={types} />}
      {activeTab === "tags" && <TagsManager tags={tags} />}
    </div>
  );
}
