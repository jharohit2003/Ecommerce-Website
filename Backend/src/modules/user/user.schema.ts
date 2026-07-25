import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('please enter a valid email'),
  password: z.string().min(8, 'password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('please enter a valid email'),
  password: z.string().min(1, 'password is required'),
})

export const adminLoginSchema = z.object({
  email: z.string().email('please enter a valid email'),
  password: z.string().min(1, 'password is required'),
})
