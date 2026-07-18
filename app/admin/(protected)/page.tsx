import AdminDashboard from "@/components/admin/adminDashboard";
import { getReferences } from "@/actions/references/get";
import { getTypes } from "@/actions/types/get";
import { getAreas } from "@/actions/areas/get";
import { getTags } from "@/actions/tags/get";
import type { AdminReferenceRow } from "@/types/reference";

export default async function AdminDashboardPage() {
  const [references, types, areas, tags] = await Promise.all([
    getReferences(),
    getTypes(),
    getAreas(),
    getTags(),
  ]);

  return (
    <AdminDashboard
      initialReferences={references as AdminReferenceRow[]}
      types={types}
      areas={areas}
      tags={tags}
    />
  );
}