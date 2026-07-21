"use client";

import { useEffect, useMemo, useState } from "react";

import FilterBar from "@/components/reference/filterBar";
import ReferenceGrid from "@/components/reference/referenceGrid";
import ReferenceModal from "@/components/reference/referenceModal";
import type { FilterOption, FilterState, ViewMode } from "@/types/filters";
import type { ReferenceDetailData } from "@/types/reference";

type ReferenceBrowserProps = {
  types: FilterOption[];
  tags: FilterOption[];
  references: ReferenceDetailData[];
  searchQuery?: string;
  initialTypeSlug?: string;
  initialTagSlug?: string;
  initialReferenceSlug?: string;
};

export default function ReferenceBrowser({
  types,
  tags,
  references,
  searchQuery = "",
  initialTypeSlug,
  initialTagSlug,
  initialReferenceSlug,
}: ReferenceBrowserProps) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    typeSlugs: initialTypeSlug ? [initialTypeSlug] : [],
    tagSlugs: initialTagSlug ? [initialTagSlug] : [],
  }));

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [selected, setSelected] = useState<ReferenceDetailData | null>(() =>
    initialReferenceSlug
      ? (references.find((r) => r.slug === initialReferenceSlug) ?? null)
      : null,
  );

  // Roda de novo toda vez que você navega pra Home com parâmetros diferentes
  // (ex: clicando num link do SearchOverlay), mesmo sem desmontar o componente.
  useEffect(() => {
    setFilters({
      typeSlugs: initialTypeSlug ? [initialTypeSlug] : [],
      tagSlugs: initialTagSlug ? [initialTagSlug] : [],
    });
  }, [initialTypeSlug, initialTagSlug]);

  useEffect(() => {
    if (!initialReferenceSlug) return;
    const found = references.find((r) => r.slug === initialReferenceSlug);
    if (found) setSelected(found);
  }, [initialReferenceSlug, references]);

  const filteredReferences = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return references.filter((reference) => {
      const matchesType =
        filters.typeSlugs.length === 0 ||
        filters.typeSlugs.includes(reference.type.slug);

      const matchesTags =
        filters.tagSlugs.length === 0 ||
        reference.tags.some((tag) => filters.tagSlugs.includes(tag.slug));

      const matchesQuery =
        normalizedQuery === "" ||
        reference.title.toLowerCase().includes(normalizedQuery) ||
        (reference.subtitle?.toLowerCase().includes(normalizedQuery) ??
          false) ||
        (reference.description?.toLowerCase().includes(normalizedQuery) ??
          false) ||
        reference.type.name.toLowerCase().includes(normalizedQuery) ||
        reference.areas.some((area) =>
          area.name.toLowerCase().includes(normalizedQuery),
        ) ||
        reference.tags.some((tag) =>
          tag.name.toLowerCase().includes(normalizedQuery),
        );

      return matchesType && matchesTags && matchesQuery;
    });
  }, [references, filters, searchQuery]);

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
