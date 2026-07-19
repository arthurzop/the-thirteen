"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { searchSuggestions } from "@/actions/search/suggestions";
import { getTypes } from "@/actions/types/get";
import { getMostUsedTags } from "@/actions/tags/get-with-counts";
import { getCollections } from "@/actions/collections/get";
import type { SearchSuggestion } from "@/types/search";
import type { FilterOption } from "@/types/filters";

type CollectionPreview = {
  id: string;
  slug: string;
  title: string;
  referenceCount: number;
};
type TagWithCount = { id: string; name: string; slug: string; count: number };

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [types, setTypes] = useState<FilterOption[]>([]);
  const [mostUsedTags, setMostUsedTags] = useState<TagWithCount[]>([]);
  const [collections, setCollections] = useState<CollectionPreview[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    Promise.all([getTypes(), getMostUsedTags(8), getCollections(5)]).then(
      ([typesData, tagsData, collectionsData]) => {
        setTypes(typesData);
        setMostUsedTags(tagsData);
        setCollections(collectionsData);
      },
    );
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    searchSuggestions(trimmed).then((results) => {
      if (!cancelled) setSuggestions(results);
    });

    return () => {
      cancelled = true;
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-true-black">
      <div className="flex items-center gap-3 border-b border-gs-900 px-4 py-3">
        <Search size={18} strokeWidth={1.5} className="shrink-0 text-gs-500" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search design references"
          className="flex-1 bg-transparent text-sm text-off-white outline-none placeholder:text-gs-600"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="shrink-0 text-gs-500 hover:text-off-white cursor-pointer"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {query.trim() ? (
          <div className="flex flex-col gap-1">
            {suggestions.length === 0 ? (
              <p className="py-8 text-center text-sm text-gs-500">
                No results found.
              </p>
            ) : (
              suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm text-gs-300 hover:bg-gs-900 cursor-pointer"
                >
                  <span>{suggestion.label}</span>
                  <span className="text-xs text-gs-600 capitalize">
                    {suggestion.type}
                  </span>
                </button>
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {types.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-xs tracking-wide text-gs-500 uppercase">
                  Types
                </h2>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setQuery(type.name)}
                      className="rounded-full border border-gs-800 px-3 py-1.5 text-sm text-gs-300 hover:border-gs-600 hover:text-off-white cursor-pointer"
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {mostUsedTags.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-xs tracking-wide text-gs-500 uppercase">
                  Most Used Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mostUsedTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setQuery(tag.name)}
                      className="rounded-full bg-gs-900 px-3 py-1.5 text-sm text-gs-400 hover:text-off-white cursor-pointer"
                    >
                      #{tag.name}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {collections.length > 0 && (
              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs tracking-wide text-gs-500 uppercase">
                    Curated Collections
                  </h2>
                  <Link
                    href="/collections"
                    onClick={onClose}
                    className="text-xs text-gs-500 hover:text-off-white"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex flex-col divide-y divide-gs-900">
                  {collections.map((collection) => (
                    <Link
                      key={collection.id}
                      href={`/collections/${collection.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 text-sm text-gs-300 hover:text-off-white"
                    >
                      <span>{collection.title}</span>
                      <span className="text-xs text-gs-600">
                        {collection.referenceCount} references
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
