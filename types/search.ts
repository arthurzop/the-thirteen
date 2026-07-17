export type SearchSuggestionType =
  | "reference"
  | "collection"
  | "tag"
  | "area"
  | "type";

export interface SearchSuggestion {
  id: string;
  label: string;
  slug: string;
  type: SearchSuggestionType;
}

export interface SearchResult {
  query: string;
  results: SearchSuggestion[];
}