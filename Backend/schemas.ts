import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("please enter a valid email"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(1, "password is required"),
});

export const adminLoginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(1, "password is required"),
});

export const removeProductSchema = z.object({
  id: z.string().min(1, "product id is required"),
});

export const singleProductSchema = z.object({
  productId: z.string().min(1, "product id is required"),
});

// runs after multer, so text fields arrive as strings
export const addProductSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  price: z.coerce.number().positive("price must be a positive number"),
  category: z.string().min(1, "category is required"),
  subCategory: z.string().min(1, "subCategory is required"),
  sizes: z.string().min(1, "sizes is required"),
  bestSeller: z.string().optional(),
});
