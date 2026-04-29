import { z } from "zod";
export const addCategorySchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
});
