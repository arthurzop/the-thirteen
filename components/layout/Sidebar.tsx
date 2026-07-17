import Navigation from "@/components/layout/Navigation";
import { publicNavigation } from "@/lib/navigation";
import Logo from "../ui/Logo";

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen px-4 py-8 border-gs-900 border-r flex flex-col justify-between">
      <div className="flex flex-col w-full gap-8">
        <Logo />
        <Navigation items={publicNavigation}></Navigation>
      </div>
      <div className="flex flex-col gap-2 ">
        <p className="text-sm font-light text-gs-600">
          The Thirteen is a visual archive of selected design.
        </p>
        <p className="text-gs-700 text-[12px]">
          2026 © <span className="font-medium">Artur Medeiros</span>
        </p>
      </div>
    </aside>
  );
}
