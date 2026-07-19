"use client";

import { PanelLeftClose } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Navigation from "@/components/layout/Navigation";
import { publicNavigation } from "@/lib/navigation";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div onClick={onClose} className="absolute inset-0 bg-overlay" />

      <aside className="relative flex h-full w-[280px] flex-col justify-between border-r border-gs-800 bg-true-black px-6 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="text-gs-500 hover:text-off-white cursor-pointer"
            >
              <PanelLeftClose size={18} strokeWidth={1.5} />
            </button>
          </div>

          <Navigation items={publicNavigation} onNavigate={onClose} />
        </div>

        <div>
          <p className="text-xs text-gs-500">
            The Thirteen is a visual archive of selected design.
          </p>
          <p className="mt-1 text-xs text-gs-600">2026 © Artur Medeiros</p>
        </div>
      </aside>
    </div>
  );
}
