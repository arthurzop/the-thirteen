import { LogOut } from "lucide-react";

import Navigation from "@/components/layout/Navigation";
import Logo from "@/components/ui/Logo";
import { adminNavigation } from "@/lib/navigation";
import { logout } from "@/actions/auth/logout";

export default function AdminSidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col justify-between border-r border-gs-800 px-6 py-8">
      <div className="flex w-full flex-col gap-8">
        <Logo />
        <Navigation items={adminNavigation} />
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gs-500 transition-colors hover:text-off-white cursor-pointer"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Log out
        </button>
      </form>
    </aside>
  );
}