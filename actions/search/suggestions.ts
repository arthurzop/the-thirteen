"use server";

import { search } from "@/lib/search";
import type { SearchSuggestion } from "@/types/search";

export async function searchSuggestions(
  query: string
): Promise<SearchSuggestion[]> {
  return search(query);
}