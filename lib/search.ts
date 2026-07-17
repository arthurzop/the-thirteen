import { SearchSuggestion } from "@/types/search";

export async function search(query: string): Promise<SearchSuggestion[]> {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const [references, collections, tags, areas, types] = await Promise.all([
    searchReferences(normalized),
    searchCollections(normalized),
    searchTags(normalized),
    searchAreas(normalized),
    searchTypes(normalized),
  ]);

  const results = [...references, ...collections, ...tags, ...areas, ...types];

  return sortResults(removeDuplicates(results)).slice(0, 8);
}

async function searchReferences(query: string): Promise<SearchSuggestion[]> {
  return [];
}

async function searchCollections(query: string): Promise<SearchSuggestion[]> {
  return [];
}

async function searchTags(query: string): Promise<SearchSuggestion[]> {
  return [];
}

async function searchAreas(query: string): Promise<SearchSuggestion[]> {
  return [];
}

async function searchTypes(query: string): Promise<SearchSuggestion[]> {
  return [];
}

function removeDuplicates(suggestions: SearchSuggestion[]): SearchSuggestion[] {
  return suggestions.filter(
    (suggestion, index, array) =>
      array.findIndex((item) => item.id === suggestion.id) === index,
  );
}

function sortResults(suggestions: SearchSuggestion[]): SearchSuggestion[] {
  return suggestions.sort((a, b) => a.label.localeCompare(b.label));
}
