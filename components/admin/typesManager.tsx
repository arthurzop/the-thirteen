"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import TaxonomyForm from "@/components/admin/taxonomyForm";
import TaxonomyTable from "@/components/admin/taxonomyTable";
import ConfirmDialog from "@/components/ui/confirmDialog";
import { createType } from "@/actions/types/create";
import { updateType } from "@/actions/types/update";
import { deleteType } from "@/actions/types/delete";
import type { FilterOption } from "@/types/filters";

export default function TypesManager({ types }: { types: FilterOption[] }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<FilterOption | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FilterOption | null>(null);
  const [deleteError, setDeleteError] = useState("");

  async function handleSave({ name }: { name: string }) {
    if (editing) await updateType(editing.id, { name });
    else await createType({ name });
    router.refresh();
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    try {
      await deleteType(pendingDelete.id);
      setPendingDelete(null);
      router.refresh();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-off-white px-4 py-2 text-sm font-medium text-true-black hover:bg-gs-100 cursor-pointer"
        >
          <Plus size={16} strokeWidth={2} />
          Add Type
        </button>
      </div>

      <TaxonomyTable
        items={types}
        onEdit={(item) => {
          setEditing(item);
          setIsFormOpen(true);
        }}
        onDelete={(item) => {
          setPendingDelete(item);
          setDeleteError("");
        }}
      />

      <TaxonomyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        initialName={editing?.name}
        title={editing ? "Edit Type" : "New Type"}
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
