import { z } from "zod";

export const taxonomyNameSchema = z
  .string()
  .trim()
  .min(1, "Name is required.")
  .max(30, "Name must be 30 characters or less.");

export const areaSchema = z.object({
  name: taxonomyNameSchema,
  typeId: z.string().min(1, "Type is required."),
});
