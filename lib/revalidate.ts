import { revalidatePath, updateTag } from "next/cache";

export function revalidateReferences() {
  updateTag("references");
  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath("/collections");
  revalidatePath("/admin");
  revalidatePath("/admin/references");
  revalidatePath("/admin/collections");
  revalidatePath("/admin/taxonomy");
  revalidatePath("/admin/settings");
}