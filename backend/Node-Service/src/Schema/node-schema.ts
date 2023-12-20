import { z } from "zod";

export const nodeCreateSchema = z.object({
    userId: z.string(),
    dataType: z.string(),
    createDate: z.string(),
    connectionType: z.string(),
});

export type nodeCreate = z.infer<typeof nodeCreateSchema>;
