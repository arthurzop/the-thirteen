"use client";

import { useState } from "react";
import SearchInput from "@/components/search/SearchInput";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import type { FilterOption } from "@/types/filters";
import type { ReferenceDetailData } from "@/types/reference";

type HomeShellProps = {
  types: FilterOption[];
  tags: FilterOption[];
  references: ReferenceDetailData[];
  initialTypeSlug?: string;
  initialTagSlug?: string;
  initialQuery?: string;
  initialReferenceSlug?: string;
};

export default function HomeShell({
  types,
  tags,
  references,
  initialTypeSlug,
  initialTagSlug,
  initialQuery,
  initialReferenceSlug,
}: HomeShellProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery ?? "");

  return (
    <>
      <SearchInput onQueryChange={setSearchQuery} />
      <ReferenceBrowser
        types={types}
        tags={tags}
        references={references}
        searchQuery={searchQuery}
        initialTypeSlug={initialTypeSlug}
        initialTagSlug={initialTagSlug}
        initialReferenceSlug={initialReferenceSlug}
      />
    </>
  );
}
