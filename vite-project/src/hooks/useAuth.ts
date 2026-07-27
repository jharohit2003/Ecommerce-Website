import { useMutation } from '@tanstack/react-query'
import { authRequest, type AuthMode } from '../api/auth'
import type { AuthValues } from '../lib/schemas'

export const useAuthMutation = () =>
  useMutation({
    mutationFn: ({ mode, values }: { mode: AuthMode; values: AuthValues }) => authRequest(mode, values),
  })
