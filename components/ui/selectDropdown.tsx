"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";

type Option = { label: string; value: string };

type SelectDropdownProps = {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  multiple?: boolean;
  align?: "left" | "right";
};

export default function SelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
  multiple = false,
  align = "left",
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    if (highlightedIndex < 0) return;
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  function toggleValue(value: string) {
    if (multiple) {
      const isSelected = selected.includes(value);
      onChange(
        isSelected ? selected.filter((v) => v !== value) : [...selected, value],
      );
    } else {
      onChange([value]);
      setIsOpen(false);
      setQuery("");
    }
  }

  function handleClear(event: React.MouseEvent) {
    event.stopPropagation();
    onChange([]);
    setIsOpen(false);
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option) toggleValue(option.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setQuery("");
    }
  }

  const label =
    selected.length === 0
      ? placeholder
      : multiple
        ? `${selected.length} selected`
        : (options.find((o) => o.value === selected[0])?.label ?? placeholder);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-gs-800 bg-night-black px-3 py-2 text-left text-sm text-gs-300 hover:border-gs-600 cursor-pointer"
      >
        <span className={selected.length === 0 ? "text-gs-600" : ""}>
          {label}
        </span>

        <span className="flex shrink-0 items-center gap-1.5">
          {selected.length > 0 && (
            <span
              role="button"
              onClick={handleClear}
              aria-label="Clear selection"
              className="text-gs-500 hover:text-red-500 cursor-pointer"
            >
              <X size={13} strokeWidth={1.5} />
            </span>
          )}
          <ChevronDown size={14} strokeWidth={1.5} className="text-gs-500" />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full z-10 mt-1 w-full min-w-45 overflow-hidden rounded-lg border border-gs-800 bg-night-black ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full border-b border-gs-800 bg-transparent px-3 py-2 text-sm text-off-white outline-none placeholder:text-gs-600"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gs-600">
                No options found
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => toggleValue(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm cursor-pointer ${
                      index === highlightedIndex
                        ? "bg-gs-800 text-off-white"
                        : "text-gs-300 hover:bg-gs-800"
                    }`}
                  >
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={selected.includes(option.value)}
                        readOnly
                        className="w-4 h-4 cursor-pointer appearance-none rounded border border-gs-700 bg-night-black checked:bg-off-white checked:border-off-white transition"
                      />
                    )}
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
