"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { deleteReference } from "@/actions/references/delete";
import { formatRelativeDate } from "@/lib/utils";
import type { AdminReferenceRow } from "@/types/reference";

type ReferenceTableProps = {
  references: AdminReferenceRow[];
  onDeleted: () => void;
};

export default function ReferenceTable({
  references,
  onDeleted,
}: ReferenceTableProps) {
  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteReference(id);
    onDeleted();
  }

  if (references.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gs-500">
        No references found.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] gap-4 border-b border-gs-800 px-2 pb-3 text-xs tracking-wide text-gs-500 uppercase">
        <span>Item</span>
        <span className="w-24">Type</span>
        <span className="w-28">Area</span>
        <span className="w-24">Added</span>
        <span className="w-28">Last Updated</span>
        <span className="w-16" />
      </div>

      {references.map((reference) => (
        <div
          key={reference.id}
          className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] items-center gap-4 border-b border-gs-800 px-2 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gs-900">
              <Image
                src={reference.mainImage.url}
                alt={reference.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-off-white">
                {reference.title}
              </p>
              <p className="text-xs text-gs-500">{reference.type.name}</p>
            </div>
          </div>

          <span className="w-24 text-xs tracking-wide text-gs-400 uppercase">
            {reference.type.name}
          </span>
          <span className="w-28 text-xs tracking-wide text-gs-400 uppercase">
            {reference.areas[0]?.name ?? "—"}
            {reference.areas.length > 1 && ` +${reference.areas.length - 1}`}
          </span>
          <span className="w-24 text-xs text-gs-500">
            {new Date(reference.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="w-28 text-xs text-gs-500">
            {formatRelativeDate(new Date(reference.updatedAt))}
          </span>

          <div className="flex w-16 items-center gap-3">
            <button
              type="button"
              className="text-gs-500 hover:text-off-white cursor-pointer"
              aria-label="Edit"
            >
              <Pencil size={14} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(reference.id, reference.title)}
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
