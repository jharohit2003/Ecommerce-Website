import { api } from './client'
import type { AuthValues } from '../lib/schemas'

export type AuthMode = 'Login' | 'Sign Up'

export const authRequest = async (mode: AuthMode, values: AuthValues) => {
  const endpoint = mode === 'Sign Up' ? '/api/user/register' : '/api/user/login'
  const { data } = await api.post(endpoint, values)
  if (!data.success) throw new Error(data.message)
  return data.token as string
}
