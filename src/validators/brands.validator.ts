import { z } from "zod";
export const addBrandSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
});
