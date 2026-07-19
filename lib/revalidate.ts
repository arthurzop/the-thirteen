// lib/revalidate.ts

import { revalidatePath } from "next/cache";

export function revalidateReferences() {
  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath("/collections");
  revalidatePath("/admin");
  revalidatePath("/admin/references");
  revalidatePath("/admin/collections");
  revalidatePath("/admin/taxonomy");
  revalidatePath("/admin/settings");
}
