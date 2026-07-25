import { z } from "zod";

export const collectionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(40, "Title must be 40 characters or less."),
  description: z
    .string()
    .trim()
    .max(200, "Description must be 200 characters or less.")
    .optional()
    .nullable(),
  referenceIds: z.array(z.string()).default([]),
});
