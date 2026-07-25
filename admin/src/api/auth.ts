import { api } from './client'
import type { AdminLoginValues } from '../lib/schemas'

export const adminLoginRequest = async (values: AdminLoginValues) => {
  const { data } = await api.post('/api/user/admin', values)
  if (!data.success) throw new Error(data.message)
  return data.token as string
}
