"use client";

import { Plus, Trash2 } from "lucide-react";

export type MetadataField = { label: string; value: string };

type MetadataInputProps = {
  fields: MetadataField[];
  onChange: (fields: MetadataField[]) => void;
};

export default function MetadataInput({
  fields,
  onChange,
}: MetadataInputProps) {
  function updateField(index: number, key: keyof MetadataField, value: string) {
    onChange(
      fields.map((field, i) =>
        i === index ? { ...field, [key]: value } : field,
      ),
    );
  }

  function addField() {
    onChange([...fields, { label: "", value: "" }]);
  }

  function removeField(index: number) {
    onChange(fields.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-2 w-full"
        >
          <input
            value={field.label}
            onChange={(e) => updateField(index, "label", e.target.value)}
            placeholder="Label (e.g. Occupation)"
            className="flex-1 max-w-48 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
          />
          <input
            value={field.value}
            onChange={(e) => updateField(index, "value", e.target.value)}
            placeholder="Value (e.g. Designer)"
            className="flex-1 max-w-48 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-sm text-off-white outline-none focus:border-gs-600"
          />
          <button
            type="button"
            onClick={() => removeField(index)}
            className="shrink-0 text-gs-500 hover:text-red-400 cursor-pointer"
            aria-label="Remove field"
          >
            <Trash2 size={14} strokeWidth={1.5} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="flex w-fit items-center gap-1.5 text-xs text-gs-500 hover:text-off-white cursor-pointer"
      >
        <Plus size={12} strokeWidth={2} />
        Add field
      </button>
    </div>
  );
}
