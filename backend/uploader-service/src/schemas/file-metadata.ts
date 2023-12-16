import { z } from "zod";

export const fileMetadataSchema = z.object({
  userEmail: z.string(),
  nodeId: z.string(),
  dataType: z.string(),
  fileName: z.string(),
  fileExtension: z.string(),
});

export type FileMetadata = z.infer<typeof fileMetadataSchema>;
