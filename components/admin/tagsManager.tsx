"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import TaxonomyForm from "@/components/admin/taxonomyForm";
import TaxonomyTable from "@/components/admin/taxonomyTable";
import ConfirmDialog from "@/components/ui/confirmDialog";
import { createTag } from "@/actions/tags/create";
import { updateTag } from "@/actions/tags/update";
import { deleteTag } from "@/actions/tags/delete";
import type { FilterOption } from "@/types/filters";

export default function TagsManager({ tags }: { tags: FilterOption[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<FilterOption | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FilterOption | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const filteredTags = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tags;
    return tags.filter((tag) => tag.name.toLowerCase().includes(normalized));
  }, [tags, query]);

  async function handleSave({ name }: { name: string }) {
    if (editing) await updateTag(editing.id, { name });
    else await createTag({ name });
    router.refresh();
  }

  async function handleDelete() {
    if (!pendingDelete) return;
    try {
      await deleteTag(pendingDelete.id);
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
            placeholder="Search tags..."
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
          Add Tag
        </button>
      </div>

      <TaxonomyTable
        items={filteredTags}
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
        title={editing ? "Edit Tag" : "New Tag"}
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
