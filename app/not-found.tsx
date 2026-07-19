import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="text-9xl font-medium animate-pulse          ">404</h2>
      <h2>Not Found :/</h2>
      <Link
        href="/"
        className="flex gap-2 mt-4 bg-night-black px-4 py-2 border border-gs-900 rounded-full items-center hover:bg-gs-900"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Voltar para a Home
      </Link>
    </div>
  );
}
