import { useMutation } from '@tanstack/react-query'
import { adminLoginRequest } from '../api/auth'

export const useAdminLogin = () =>
  useMutation({
    mutationFn: adminLoginRequest,
  })
