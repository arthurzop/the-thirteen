"use client";

import { useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import type { FilterOption } from "@/types/filters";

type TagInputProps = {
  options: FilterOption[];
  selectedSlugs: string[];
  onChange: (slugs: string[]) => void;
  placeholder?: string;
};

export default function TagInput({
  options,
  selectedSlugs,
  onChange,
  placeholder = "Add tags...",
}: TagInputProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedSlugs.includes(option.slug)),
    [options, selectedSlugs],
  );

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.trim().toLowerCase();
    return options.filter(
      (option) =>
        !selectedSlugs.includes(option.slug) &&
        option.name.toLowerCase().includes(normalized),
    );
  }, [options, query, selectedSlugs]);

  function addTag(slug: string) {
    onChange([...selectedSlugs, slug]);
    setQuery("");
    inputRef.current?.focus();
  }

  function removeTag(slug: string) {
    onChange(selectedSlugs.filter((s) => s !== slug));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && query === "" && selectedSlugs.length > 0) {
      removeTag(selectedSlugs[selectedSlugs.length - 1]);
    }

    if (event.key === "Enter" && suggestions.length > 0) {
      event.preventDefault();
      addTag(suggestions[0].slug);
    }
  }

  return (
    <div className="relative">
      <div className="flex max-h-28 flex-wrap content-start items-center gap-2 overflow-y-auto rounded-lg border border-gs-800 bg-night-black px-3 py-2 focus-within:border-gs-600 cursor-pointer">
        {selectedOptions.map((option) => (
          <span
            key={option.slug}
            className="flex items-center gap-1.5 rounded-full bg-gs-800 px-2.5 py-1 text-xs text-off-white"
            onClick={() => removeTag(option.slug)}
          >
            {option.name}
            <button
              type="button"
              onClick={() => removeTag(option.slug)}
              aria-label={`Remove ${option.name}`}
              className="text-gs-500 hover:text-off-white cursor-pointer"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          onKeyDown={handleKeyDown}
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
          className="min-w-20 max-h-20 flex-1 bg-transparent text-sm text-off-white outline-none placeholder:text-gs-600"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gs-800 bg-night-black">
          {suggestions.map((option) => (
            <li key={option.slug}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addTag(option.slug)}
                className="w-full px-3 py-2 text-left text-sm text-gs-400 hover:bg-gs-800 "
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
