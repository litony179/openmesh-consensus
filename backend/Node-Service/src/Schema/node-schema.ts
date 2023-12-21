import { z } from "zod";

export const bucketSchema = z.object({
  fileName: z.string(),
  fileExtension: z.string(),
  fileContent: z.string(),
});

export const nodeCreateSchema = z.object({
  userId: z.string(),
  dataType: z.string(),
  createDate: z.string(),
  connectionType: z.string(),
  bucket: bucketSchema,
});

export type nodeCreate = z.infer<typeof nodeCreateSchema>;
