"use client";

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
  onNavigate?: () => void;
};

export default function Navigation({ items, onNavigate }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col gap-2">
        {items.map(({ label, href, icon, dividerBefore }) => {
          const Icon = icons[icon];
          const isActive = pathname === href;

          return (
            <li key={href}>
              {dividerBefore && <div className="my-2 h-px bg-gs-800" />}
              <Link
                href={href}
                onClick={onNavigate}
                className={`flex h-auto items-center gap-2 rounded-lg px-3 py-3 font-normal transition-colors duration-200 ${
                  isActive
                    ? "bg-gs-800 text-off-white"
                    : "text-gs-500 hover:bg-night-black hover:text-off-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
