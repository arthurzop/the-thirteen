"use server";

import { search } from "@/lib/search";

export async function searchSuggestions(query: string) {
  return search(query);
}
