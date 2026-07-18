"use client";

import { useState } from "react";
import { X } from "lucide-react";

import ImageDropzone from "@/components/ui/imageDropzone";
import SelectDropdown from "@/components/ui/selectDropdown";
import AdminTagInput from "@/components/admin/adminTagInput";
import { createReference } from "@/actions/references/create";
import type { FilterOption } from "@/types/filters";

type ReferenceFormPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  types: FilterOption[];
  areas: (FilterOption & { typeId: string })[];
  tags: FilterOption[];
};

export default function ReferenceFormPanel({
  isOpen,
  onClose,
  onCreated,
  types,
  areas,
  tags,
}: ReferenceFormPanelProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState<string[]>([]);
  const [areaIds, setAreaIds] = useState<string[]>([]);
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<File[]>([]);
  const [gallery, setGallery] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const availableAreas = areas.filter((area) => area.typeId === typeId[0]);

  function reset() {
    setTitle("");
    setDescription("");
    setTypeId([]);
    setAreaIds([]);
    setTagNames([]);
    setMainImage([]);
    setGallery([]);
    setError("");
  }

  async function handleSubmit() {
    if (!title || typeId.length === 0 || mainImage.length === 0) {
      setError("Title, Type and Main Image are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("typeId", typeId[0]);
      areaIds.forEach((id) => formData.append("areaIds", id));
      tagNames.forEach((name) => formData.append("tagNames", name));
      formData.set("mainImage", mainImage[0]);
      gallery.forEach((file) => formData.append("gallery", file));

      await createReference(formData);

      reset();
      onCreated();
      onClose();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-overlay" />

      <aside className="fixed top-0 right-0 z-50 flex h-screen w-[480px] flex-col justify-between border-l border-gs-800 bg-true-black">
        <div className="flex flex-col gap-6 overflow-y-auto p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-off-white">New Reference</h2>
              <p className="text-sm text-gs-500">Add a new design reference to the archive.</p>
            </div>
            <button type="button" onClick={onClose} className="text-gs-500 hover:text-off-white cursor-pointer">
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">Title*</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Neue Haas Grotesk"
              className="rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this reference..."
              rows={4}
              className="resize-none rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">Main Image*</label>
            <ImageDropzone files={mainImage} onChange={setMainImage} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">Additional Images (max 5)</label>
            <ImageDropzone multiple maxFiles={5} files={gallery} onChange={setGallery} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-wide text-gs-500 uppercase">Type</label>
              <SelectDropdown
                options={types.map((t) => ({ label: t.name, value: t.slug === t.slug ? t.id ?? t.slug : t.slug }))}
                selected={typeId}
                onChange={(values) => {
                  setTypeId(values);
                  setAreaIds([]);
                }}
                placeholder="Select Type"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-wide text-gs-500 uppercase">Area</label>
              <SelectDropdown
                options={availableAreas.map((a) => ({ label: a.name, value: a.id ?? a.slug }))}
                selected={areaIds}
                onChange={setAreaIds}
                placeholder="Select Area"
                multiple
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-wide text-gs-500 uppercase">Tags</label>
            <AdminTagInput options={tags} value={tagNames} onChange={setTagNames} />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <div className="flex items-center gap-3 border-t border-gs-800 p-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-gs-800 py-3 text-sm text-gs-300 hover:border-gs-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 rounded-full bg-off-white py-3 text-sm font-medium text-true-black hover:bg-gs-100 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Publishing..." : "Publish Reference"}
          </button>
        </div>
      </aside>
    </>
  );
}