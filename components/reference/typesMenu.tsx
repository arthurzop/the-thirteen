"use client";

import { SlidersHorizontal } from "lucide-react";

import type { FilterOption } from "@/types/filters";

type TypesMenuProps = {
  types: FilterOption[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
  onOpenFilters: () => void;
};

export default function TypesMenu({
  types,
  selectedSlugs,
  onToggle,
  onOpenFilters,
}: TypesMenuProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex flex-1 gap-2 overflow-x-auto items-center">
      <p className="text-sm text-gs-500 uppercase">Types: </p>
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
        aria-label="Open filters"
        className="cursor-pointer flex shrink-0 items-center gap-2 rounded-full border border-gs-900 px-4 py-2 text-sm text-gs-400 transition-colors hover:border-gs-600 hover:text-off-white bg-night-black"
      >
        <SlidersHorizontal size={14} strokeWidth={1.5} />
        More Filters
      </button>
    </div>
  );
}
