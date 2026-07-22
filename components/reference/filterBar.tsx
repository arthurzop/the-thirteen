"use client";

import { useState } from "react";

import TypesMenu from "@/components/reference/typesMenu";
import FiltersSidebar from "@/components/reference/filterSidebar";
import type { FilterOption, FilterState, ViewMode } from "@/types/filters";

type FilterBarProps = {
  types: FilterOption[];
  tags: FilterOption[];
  onFiltersChange?: (filters: FilterState) => void;
  onViewModeChange?: (mode: ViewMode) => void;
};

const EMPTY_FILTERS: FilterState = { typeSlugs: [], tagSlugs: [] };

export default function FilterBar({
  types,
  tags,
  onFiltersChange,
  onViewModeChange,
}: FilterBarProps) {
  const [committedFilters, setCommittedFilters] =
    useState<FilterState>(EMPTY_FILTERS);
  const [draftFilters, setDraftFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function updateCommitted(filters: FilterState) {
    setCommittedFilters(filters);
    onFiltersChange?.(filters);
  }

  function handleQuickToggleType(slug: string) {
    const isSelected = committedFilters.typeSlugs.includes(slug);
    const typeSlugs = isSelected
      ? committedFilters.typeSlugs.filter((s) => s !== slug)
      : [...committedFilters.typeSlugs, slug];

    updateCommitted({ ...committedFilters, typeSlugs });
  }

  function handleOpenSidebar() {
    setDraftFilters(committedFilters);
    setIsSidebarOpen(true);
  }

  function handleApply() {
    updateCommitted(draftFilters);
    setIsSidebarOpen(false);
  }

  function handleClearDraft() {
    setDraftFilters(EMPTY_FILTERS);
  }

  function handleViewModeChange(mode: ViewMode) {
    setViewMode(mode);
    onViewModeChange?.(mode);
  }

  return (
    <div>
      <TypesMenu
        types={types}
        selectedSlugs={committedFilters.typeSlugs}
        activeFilterCount={
          committedFilters.typeSlugs.length + committedFilters.tagSlugs.length
        }
        onToggle={handleQuickToggleType}
        onOpenFilters={handleOpenSidebar}
      />

      <FiltersSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        types={types}
        tags={tags}
        draftFilters={draftFilters}
        onDraftChange={setDraftFilters}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onApply={handleApply}
        onClear={handleClearDraft}
      />
    </div>
  );
}
