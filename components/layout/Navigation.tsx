"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Shapes,
  LibraryBig,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Scan,
  Tag,
  Settings,
  type LucideIcon,
} from "lucide-react";

import type { NavigationItem, IconName } from "@/lib/navigation";

const icons: Record<IconName, LucideIcon> = {
  House,
  Shapes,
  LibraryBig,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Scan,
  Tag,
  Settings,
};

type NavigationProps = {
  items: NavigationItem[];
};

export default function Navigation({ items }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="w-full">
      <ul className="flex flex-col gap-3">
        {items.map(({ label, href, icon, dividerBefore }) => {
          const Icon = icons[icon];
          const isActive = pathname === href;

          return (
            <div key={href}>
              {dividerBefore && (
                <div
                  role="separator"
                  aria-hidden="true"
                  className="my-2 h-px bg-gs-800"
                />
              )}
              <div className="">
                <Link
                  href={href}
                  className={`flex w-full h-auto items-center gap-2 rounded-sm px-3 py-3 font-normal ${
                    isActive
                      ? "bg-gs-800 text-off-white"
                      : "text-gs-500 hover:bg-night-black hover:text-off-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  <span className="">{label}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}
