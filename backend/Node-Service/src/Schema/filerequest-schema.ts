import { z } from "zod";

export const fileRetrieveSchema = z.object({
  userId: z.string(),
  nodeId: z.string(),
  dataType: z.string(),
  fileName: z.string(),
  fileExtension: z.string(),
});

export type fileRetrieve = z.infer<typeof fileRetrieveSchema>;
