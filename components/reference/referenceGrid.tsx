"use client";

export const dynamic = "force-dynamic";

import type { ReferenceCardData } from "@/types/reference";
import type { ViewMode } from "@/types/filters";
import ReferenceCard from "@/components/reference/referenceCard";
import ReferenceListRow from "@/components/reference/referenceList";

type ReferenceGridProps = {
  references: ReferenceCardData[];
  viewMode: ViewMode;
  onOpen: (reference: ReferenceCardData) => void;
};

export default function ReferenceGrid({
  references,
  viewMode,
  onOpen,
}: ReferenceGridProps) {
  if (references.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gs-500">
        No references found.
      </p>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col divide-y divide-gs-800">
        {references.map((reference) => (
          <ReferenceListRow
            key={reference.id}
            reference={reference}
            onClick={() => onOpen(reference)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-5">
      {references.map((reference) => (
        <div key={reference.id} className="mb-4 break-inside-avoid">
          <ReferenceCard
            reference={reference}
            onClick={() => onOpen(reference)}
          />
        </div>
      ))}
    </div>
  );
}
