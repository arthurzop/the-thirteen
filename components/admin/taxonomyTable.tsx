"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { FilterOption } from "@/types/filters";

type TaxonomyTableProps = {
  items: FilterOption[];
  onEdit: (item: FilterOption) => void;
  onDelete: (item: FilterOption) => void;
};

export default function TaxonomyTable({
  items,
  onEdit,
  onDelete,
}: TaxonomyTableProps) {
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gs-500">Nothing here yet.</p>
    );
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gs-800 px-2 py-3 hover:bg-night-black"
        >
          <div>
            <p className="text-sm text-off-white">{item.name}</p>
            <p className="text-xs text-gs-600">{item.slug}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEdit(item)}
              className="text-gs-500 hover:text-off-white cursor-pointer"
              aria-label="Edit"
            >
              <Pencil size={14} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="text-gs-500 hover:text-red-400 cursor-pointer"
              aria-label="Delete"
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
