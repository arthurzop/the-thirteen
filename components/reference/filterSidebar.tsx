"use client";

import { Eraser, LayoutGrid, List, X } from "lucide-react";

import TagInput from "@/components/ui/tagInput";
import type { FilterOption, FilterState, ViewMode } from "@/types/filters";

type FiltersSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  types: FilterOption[];
  tags: FilterOption[];
  draftFilters: FilterState;
  onDraftChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onApply: () => void;
  onClear: () => void;
};

export default function FiltersSidebar({
  isOpen,
  onClose,
  types,
  tags,
  draftFilters,
  onDraftChange,
  viewMode,
  onViewModeChange,
  onApply,
  onClear,
}: FiltersSidebarProps) {
  const isAllSelected = draftFilters.typeSlugs.length === 0;

  function toggleAll() {
    onDraftChange({ ...draftFilters, typeSlugs: [] });
  }

  function toggleType(slug: string) {
    const isSelected = draftFilters.typeSlugs.includes(slug);
    const typeSlugs = isSelected
      ? draftFilters.typeSlugs.filter((s) => s !== slug)
      : [...draftFilters.typeSlugs, slug];

    onDraftChange({ ...draftFilters, typeSlugs });
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-20 bg-overlay"
      />

      <aside className="fixed top-0 right-0 z-30 flex h-screen w-full flex-col justify-between border-l border-gs-800 bg-night-black p-6 sm:w-[320px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-off-white">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="cursor-pointer"
            >
              <X
                size={18}
                strokeWidth={1.5}
                className="text-gs-500 hover:text-off-white"
              />
            </button>
          </div>

          <div className="flex flex-col gap-3 border-t border-gs-800 pt-6">
            <span className="text-xs font-medium tracking-wide text-gs-500 uppercase">
              Types
            </span>

            <label className="flex items-center gap-3 text-sm text-gs-300">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded accent-off-white"
              />
              All
            </label>

            {types.map((type) => (
              <label
                key={type.slug}
                className="flex items-center gap-3 text-sm text-gs-300"
              >
                <input
                  type="checkbox"
                  checked={draftFilters.typeSlugs.includes(type.slug)}
                  onChange={() => toggleType(type.slug)}
                  className="h-4 w-4 rounded accent-off-white"
                />
                {type.name}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-gs-800 pt-6">
            <span className="text-xs font-medium tracking-wide text-gs-500 uppercase">
              Tags
            </span>

            <TagInput
              options={tags}
              selectedSlugs={draftFilters.tagSlugs}
              onChange={(tagSlugs) =>
                onDraftChange({ ...draftFilters, tagSlugs })
              }
              placeholder="Search tags..."
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-gs-800 pt-6">
            <span className="text-xs font-medium tracking-wide text-gs-500 uppercase">
              View
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onViewModeChange("grid")}
                className={`cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  viewMode === "grid"
                    ? "border-off-white text-off-white"
                    : "border-gs-800 text-gs-500 hover:text-off-white"
                }`}
              >
                <LayoutGrid size={14} strokeWidth={1.5} />
                Grid
              </button>

              <button
                type="button"
                onClick={() => onViewModeChange("list")}
                className={`cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  viewMode === "list"
                    ? "border-off-white text-off-white"
                    : "border-gs-800 text-gs-500 hover:text-off-white"
                }`}
              >
                <List size={14} strokeWidth={1.5} />
                List
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-gs-800 pt-6 h-">
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear filters"
            className="cursor-pointer flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gs-800 text-gs-500 transition-colors hover:text-off-white"
          >
            <Eraser size={16} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={onApply}
            className="cursor-pointer flex-1 rounded-full bg-off-white py-3 text-sm font-medium text-true-black transition-colors hover:bg-gs-100"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
