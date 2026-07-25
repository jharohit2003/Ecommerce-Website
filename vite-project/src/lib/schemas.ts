import { z } from 'zod'

// ponytail: password-strength (min 8) and name-required for Sign Up are enforced
// server-side by the backend Zod schemas, which return clear messages we toast.
export const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
export type AuthValues = z.infer<typeof authSchema>

export const placeOrderSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Enter a valid email'),
  street: z.string().min(1, 'Required'),
  zipcode: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  phone: z.string().min(6, 'Enter a valid phone number'),
})
export type PlaceOrderValues = z.infer<typeof placeOrderSchema>
