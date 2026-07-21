"use client";

import Image from "next/image";
import type { ReferenceCardData } from "@/types/reference";

type ReferenceCardProps = {
  reference: ReferenceCardData;
  onClick: () => void;
};

export default function ReferenceCard({
  reference,
  onClick,
}: ReferenceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl bg-gs-900 cursor-pointer"
    >
      <Image
        src={reference.mainImage.url}
        alt={reference.mainImage.alt ?? reference.title}
        width={reference.mainImage.width}
        height={reference.mainImage.height}
        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div className="opacity-100 md:opacity-0 absolute inset-x-0 bottom-0 md:m-2 flex items-start md:rounded-full bg-true-black/45 px-2 md:px-4 py-1 md:py-2 backdrop-blur-xl transition-opacity duration-200 group-hover:opacity-100 border border-gs-900/20">
        <h3 className="line-clamp-2 flex flex-col text-sm font-medium text-off-white items-start">
          <p className="text-true-white text-sm">{reference.title}</p>
        </h3>
      </div>
    </button>
  );
}
