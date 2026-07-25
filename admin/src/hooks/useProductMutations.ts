import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProductRequest, removeProductRequest } from '../api/products'

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addProductRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}

export const useRemoveProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeProductRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}
