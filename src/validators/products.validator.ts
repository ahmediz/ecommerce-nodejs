import { z } from "zod";
export const addProductSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  description: z.string().nonempty({ error: "Description is required" }),
  price: z.number().positive({ error: "Price is required" }),
  imageUrl: z.string().nonempty({ error: "Image URL is required" }),
  brandId: z.string().nonempty({ error: "Brand ID is required" }),
  categories: z.array(z.string()).nonempty({ error: "Categories are required" }),
  availableStock: z.number().positive({ error: "Available stock is required" }),
  isActive: z.boolean().default(true),
});
