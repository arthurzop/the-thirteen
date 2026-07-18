import SearchInput from "@/components/ui/SearchInput";
import Filterbar from "@/components/reference/filterBar";
import { getTypes } from "@/actions/types/get";
import { getTags } from "@/actions/tags/get";
import ReferenceBrowser from "@/components/reference/referenceBrowser";
import { mockReferences } from "@/lib/mock/reference";
import { mock } from "node:test";

const [types, tags] = await Promise.all([getTypes(), getTags()]);

export default function Home() {
  return (
    <main className="px-8 py-8 gap-4 flex flex-col min-h-screen">
      <SearchInput />
      <ReferenceBrowser
        types={types}
        tags={tags}
        references={mockReferences}
      ></ReferenceBrowser>
    </main>
  );
}
