"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = { label: string; value: string };

type SelectDropdownProps = {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  multiple?: boolean;
};

export default function SelectDropdown({
  options,
  selected,
  onChange,
  placeholder,
  multiple = false,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleValue(value: string) {
    if (multiple) {
      const isSelected = selected.includes(value);
      onChange(
        isSelected ? selected.filter((v) => v !== value) : [...selected, value],
      );
    } else {
      onChange([value]);
      setIsOpen(false);
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
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className="shrink-0 text-gs-500"
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-1 max-h-56 w-full min-w-[180px] overflow-y-auto rounded-lg border border-gs-800 bg-night-black">
          {options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gs-600">No options</li>
          ) : (
            options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gs-300 hover:bg-gs-800 cursor-pointer"
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={selected.includes(option.value)}
                      readOnly
                      className="h-3.5 w-3.5 accent-off-white"
                    />
                  )}
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
