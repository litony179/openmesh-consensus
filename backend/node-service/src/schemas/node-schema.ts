import { z } from "zod";
export const nodeSchema = z.object({
  nodeUserId: z.string(),
  nodePublicKey: z.string(),
  nodeDataSpecialisation: z.string(),
  nodeCreatedAt: z.string(),
  nodeConnectionType: z.string(),
});

export type node = z.infer<typeof nodeSchema>;
