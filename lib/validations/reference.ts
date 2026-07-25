import { z } from "zod";

export const referenceSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title must be 100 characters or less."),
  subtitle: z
    .string()
    .trim()
    .max(40, "Subtitle must be 40 characters or less.")
    .optional()
    .nullable(),
  description: z
    .string()
    .trim()
    .max(600, "Description must be 600 characters or less.")
    .optional()
    .nullable(),
  typeId: z.string().min(1, "Type is required."),
  areaIds: z.array(z.string()).default([]),
  tagNames: z.array(z.string()).default([]),
});
