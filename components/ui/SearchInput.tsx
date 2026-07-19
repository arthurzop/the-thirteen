"use client";

import { useEffect, useRef, useState } from "react";
import * as L from "lucide-react";

import { useDebounce } from "@/hooks/use-debounce";
import { searchSuggestions } from "@/actions/search/suggestions";
import type { SearchSuggestion, SearchSuggestionType } from "@/types/search";

type SearchInputProps = {
  onSearch?: (query: string) => Promise<SearchSuggestion[]>;
  onSelect?: (suggestion: SearchSuggestion) => void;
};

const typeIcons: Record<SearchSuggestionType, L.LucideIcon> = {
  reference: L.Image,
  collection: L.LibraryBig,
  tag: L.Tag,
  area: L.Scan,
  type: L.LayoutGrid,
};

const typeLabels: Record<SearchSuggestionType, string> = {
  reference: "Reference",
  collection: "Collection",
  tag: "Tag",
  area: "Area",
  type: "Type",
};

function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="font-semibold text-off-white">{match}</span>
      {after}
    </>
  );
}

export default function SearchInput({
  onSearch = searchSuggestions,
  onSelect,
}: SearchInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedValue = useDebounce(value, 250);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const shortcutPressed =
        (isMac ? event.metaKey : event.ctrlKey) &&
        event.key.toLowerCase() === "k";

      if (shortcutPressed) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = debouncedValue.trim();

    if (!query) {
      setSuggestions([]);
      setHasSearched(false);
      return;
    }

    let cancelled = false;

    onSearch(query).then((results) => {
      if (!cancelled) {
        setSuggestions(results);
        setHasSearched(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedValue, onSearch]);

  function handleClear() {
    setValue("");
    setSuggestions([]);
    setHasSearched(false);
    inputRef.current?.focus();
  }

  function handleSelect(suggestion: SearchSuggestion) {
    setValue(suggestion.label);
    setIsFocused(false);
    onSelect?.(suggestion);
  }

  const showDropdown = isFocused && value.trim().length > 0;

  return (
    <div ref={containerRef} className="hidden md:relative w-full">
      <div
        className={`flex w-full items-center gap-3 rounded-full border bg-night-black px-4 py-2 transition-colors ${
          isFocused ? "border-gs-600" : "border-gs-800"
        }`}
      >
        <L.Search
          size={16}
          strokeWidth={1.5}
          className="shrink-0 text-gs-500"
        />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search design references"
          className="flex-1 bg-transparent text-sm text-off-white outline-none placeholder:text-gs-600"
        />

        {value.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 text-gs-500 transition-colors hover:text-off-white cursor-pointer"
          >
            <L.XCircle size={16} strokeWidth={1.5} />
          </button>
        ) : (
          <kbd className="hidden shrink-0 items-center rounded-md border border-gs-800 px-1.5 py-0.5 text-xs text-gs-500 sm:inline-flex">
            ⌘K
          </kbd>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-2xl border border-gs-600 bg-night-black">
          {suggestions.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion) => {
                const Icon = typeIcons[suggestion.type];

                return (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(suggestion)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gs-400 transition-colors hover:bg-gs-800 cursor-pointer"
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className="shrink-0 text-gs-600"
                      />
                      <span className="flex-1">
                        {highlightMatch(suggestion.label, value)}
                      </span>
                      <span className="shrink-0 text-xs text-gs-600">
                        {typeLabels[suggestion.type]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            hasSearched && (
              <p className="px-4 py-3 text-sm text-gs-600">No results found.</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
