"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/search/SearchInput";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import type { FilterOption } from "@/types/filters";
import type { ReferenceDetailData } from "@/types/reference";

type HomeShellProps = {
  types: FilterOption[];
  tags: FilterOption[];
  references: ReferenceDetailData[];
};

export default function HomeShell({ types, tags, references }: HomeShellProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");

  return (
    <>
      <SearchInput onQueryChange={setSearchQuery} />
      <ReferenceBrowser
        types={types}
        tags={tags}
        references={references}
        searchQuery={searchQuery}
        initialTypeSlug={searchParams.get("type") ?? undefined}
        initialTagSlug={searchParams.get("tag") ?? undefined}
        initialReferenceSlug={searchParams.get("ref") ?? undefined}
      />
    </>
  );
}
