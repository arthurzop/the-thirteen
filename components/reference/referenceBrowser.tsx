"use client";

import { useMemo, useState } from "react";

import FilterBar from "@/components/reference/filterBar";
import ReferenceGrid from "@/components/reference/referenceGrid";
import ReferenceModal from "@/components/reference/referenceModal";
import type { FilterOption, FilterState, ViewMode } from "@/types/filters";
import type { ReferenceDetailData } from "@/types/reference";

type ReferenceBrowserProps = {
  types: FilterOption[];
  tags: FilterOption[];
  references: ReferenceDetailData[];
};

const EMPTY_FILTERS: FilterState = { typeSlugs: [], tagSlugs: [] };

export default function ReferenceBrowser({
  types,
  tags,
  references,
}: ReferenceBrowserProps) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selected, setSelected] = useState<ReferenceDetailData | null>(null);

  const filteredReferences = useMemo(() => {
    return references.filter((reference) => {
      const matchesType =
        filters.typeSlugs.length === 0 ||
        filters.typeSlugs.includes(reference.type.slug);

      const matchesTags =
        filters.tagSlugs.length === 0 ||
        reference.tags.some((tag) => filters.tagSlugs.includes(tag.slug));

      return matchesType && matchesTags;
    });
  }, [references, filters]);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        types={types}
        tags={tags}
        onFiltersChange={setFilters}
        onViewModeChange={setViewMode}
      />

      <ReferenceGrid
        references={filteredReferences}
        viewMode={viewMode}
        onOpen={(reference) => {
          const full = references.find((item) => item.id === reference.id);
          if (full) setSelected(full);
        }}
      />

      <ReferenceModal reference={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
