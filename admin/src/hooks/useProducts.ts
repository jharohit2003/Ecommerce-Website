import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
