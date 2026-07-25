import { z } from 'zod'

export const adminLoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
export type AdminLoginValues = z.infer<typeof adminLoginSchema>

export const addProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  category: z.string().min(1),
  subCategory: z.string().min(1),
})
export type AddProductValues = z.infer<typeof addProductSchema>
