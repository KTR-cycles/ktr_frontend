import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  actualPrice: z.number(),
  discount: z.number().optional(),
  currentPrice: z.number(),
  description: z.string().optional(),
  specifications: z.string().optional(),
  features: z.string().optional(),
  images: z.string(),
  stock: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
