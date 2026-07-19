"use client";

import { Menu, Search } from "lucide-react";
import Logo from "@/components/ui/Logo";

type MobileHeaderProps = {
  onMenuClick: () => void;
  onSearchClick: () => void;
};

export default function MobileHeader({
  onMenuClick,
  onSearchClick,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between border rounded-full bg-night-black border-gs-900 mx-4 mt-6 px-4 py-2 md:hidden ">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="text-gs-400 hover:text-off-white cursor-pointer"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      <div className="w-50 flex justify-center">
        <Logo />
      </div>

      <button
        type="button"
        onClick={onSearchClick}
        aria-label="Search"
        className="text-gs-400 hover:text-off-white cursor-pointer"
      >
        <Search size={20} strokeWidth={1.5} />
      </button>
    </header>
  );
}
