export type ViewMode = "grid" | "list";

export type FilterOption = {
  id: string;
  name: string;
  slug: string;
};

export type FilterState = {
  typeSlugs: string[];
  tagSlugs: string[];
};