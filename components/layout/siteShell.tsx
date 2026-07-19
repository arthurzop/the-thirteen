"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/mobileHeader";
import MobileDrawer from "@/components/layout/mobileDrawer";
import SearchOverlay from "@/components/search/searchOverlay";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader
          onMenuClick={() => setIsDrawerOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
