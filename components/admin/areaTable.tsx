"use client";

import { Pencil, Trash2 } from "lucide-react";
import Chip from "@/components/ui/chip";

type AreaRow = { id: string; name: string; slug: string; typeId: string };

type AreaTableProps = {
  areas: AreaRow[];
  types: { id: string; name: string }[];
  onEdit: (area: AreaRow) => void;
  onDelete: (area: AreaRow) => void;
};

export default function AreaTable({
  areas,
  types,
  onEdit,
  onDelete,
}: AreaTableProps) {
  if (areas.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-gs-500">Nothing here yet.</p>
    );
  }

  return (
    <div className="flex flex-col">
      {areas.map((area) => (
        <div
          key={area.id}
          className="flex items-center justify-between border-b border-gs-800 px-2 py-3 hover:bg-night-black"
        >
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-off-white">{area.name}</p>
              <p className="text-xs text-gs-600">{area.slug}</p>
            </div>
            <Chip
              label={types.find((t) => t.id === area.typeId)?.name ?? "—"}
              variant="outline"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEdit(area)}
              className="text-gs-500 hover:text-off-white cursor-pointer"
              aria-label="Edit"
            >
              <Pencil size={14} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(area)}
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
