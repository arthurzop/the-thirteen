"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import AreaForm from "@/components/admin/areaForm";
import AreaTable from "@/components/admin/areaTable";
import ConfirmDialog from "@/components/ui/confirmDialog";
import { createArea } from "@/actions/areas/create";
import { updateArea } from "@/actions/areas/update";
import { deleteArea } from "@/actions/areas/delete";
import type { FilterOption } from "@/types/filters";

type AreaRow = FilterOption & { typeId: string };

export default function AreasManager({
  areas,
  types,
}: {
  areas: AreaRow[];
  types: FilterOption[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<AreaRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AreaRow | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const filteredAreas = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return areas;
    return areas.filter((area) => area.name.toLowerCase().includes(normalized));
  }, [areas, query]);

  async function handleSave({
    name,
    typeId,
  }: {
    name: string;
    typeId: string;
  }) {
    const result = editing
      ? await updateArea(editing.id, { name, typeId })
      : await createArea({ name, typeId });

    if (result?.error) {
      throw new Error(result.error);
    }

    router.refresh();
  }

  async function handleDelete() {
    if (!pendingDelete) return;

    const result = await deleteArea(pendingDelete.id);

    if (result?.error) {
      setDeleteError(result.error);
      return;
    }

    setPendingDelete(null);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gs-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search areas..."
            className="w-full rounded-lg border border-gs-800 bg-night-black py-2 pr-3 pl-9 text-sm text-off-white outline-none focus:border-gs-600"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-off-white px-4 py-2 text-sm font-medium text-true-black hover:bg-gs-100 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2} />
          Add Area
        </button>
      </div>

      <AreaTable
        areas={filteredAreas}
        types={types}
        onEdit={(area) => {
          setEditing(area);
          setIsFormOpen(true);
        }}
        onDelete={(area) => {
          setPendingDelete(area);
          setDeleteError("");
        }}
      />

      <AreaForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        types={types}
        initialName={editing?.name}
        initialTypeId={editing?.typeId}
        title={editing ? "Edit Area" : "New Area"}
      />

      <ConfirmDialog
        isOpen={Boolean(pendingDelete)}
        title="Are you sure?"
        description={
          deleteError ||
          (pendingDelete
            ? `This will permanently delete "${pendingDelete.name}".`
            : undefined)
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => {
          setPendingDelete(null);
          setDeleteError("");
        }}
      />
    </div>
  );
}
