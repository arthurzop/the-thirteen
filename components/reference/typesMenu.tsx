"use client";

import { SlidersHorizontal } from "lucide-react";

import type { FilterOption } from "@/types/filters";

type TypesMenuProps = {
  types: FilterOption[];
  selectedSlugs: string[];
  activeFilterCount: number;
  onToggle: (slug: string) => void;
  onOpenFilters: () => void;
};

export default function TypesMenu({
  types,
  selectedSlugs,
  activeFilterCount,
  onToggle,
  onOpenFilters,
}: TypesMenuProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex flex-1 gap-2 overflow-x-auto items-center scrollbar-none [&::-webkit-scrollbar]:hidden  ">
        <p className="text-sm text-gs-500 uppercase hidden md:block">Types: </p>
        <p className="text-nowrap text-sm text-gs-500 uppercase block md:hidden">
          Filter by:{" "}
        </p>
        {types.map((type) => {
          const isSelected = selectedSlugs.includes(type.slug);

          return (
            <button
              key={type.slug}
              type="button"
              onClick={() => onToggle(type.slug)}
              className={`cursor-pointer shrink-0 rounded-full border px-4 py-1.5 whitespace-nowrap transition-colors ${
                isSelected
                  ? "border-off-white bg-off-white text-true-black"
                  : "bg-night-black border-gs-800 text-gs-400 hover:border-gs-600 hover:text-off-white"
              }`}
            >
              {type.name}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onOpenFilters}
        aria-label={
          activeFilterCount > 0
            ? `Open filters, ${activeFilterCount} active`
            : "Open filters"
        }
        className={`cursor-pointer flex shrink-0 items-center gap-2 rounded-full border px-3 py-3 md:py-2 text-sm transition-colors bg-night-black ${
          activeFilterCount > 0
            ? "border-gs-800 text-gs-300 hover:border-gs-600 hover:text-gs-100"
            : "border-gs-900 text-gs-400 hover:border-gs-600 hover:text-gs-100"
        }`}
      >
        {activeFilterCount <= 0 && (
          <span className="flex gap-2 items-center">
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            <p className="hidden md:block">More Filters</p>
          </span>
        )}
        {activeFilterCount > 0 && (
          <span className="flex gap-2 items-center">
            <p className="p-2 text-sm bg-gs-700 h-4 w-4 flex items-center justify-center rounded-full border border-gs-600">
              {activeFilterCount}
            </p>
            <p className="hidden md:block">Filters Applied</p>
          </span>
        )}
      </button>
    </div>
  );
}
