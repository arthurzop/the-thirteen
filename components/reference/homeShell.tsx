"use client";

import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import type { FilterOption } from "@/types/filters";
import type { ReferenceDetailData } from "@/types/reference";

type HomeShellProps = {
  types: FilterOption[];
  tags: FilterOption[];
  references: ReferenceDetailData[];
};

export default function HomeShell({ types, tags, references }: HomeShellProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <SearchInput onQueryChange={setSearchQuery} />
      <ReferenceBrowser
        types={types}
        tags={tags}
        references={references}
        searchQuery={searchQuery}
      />
    </>
  );
}
