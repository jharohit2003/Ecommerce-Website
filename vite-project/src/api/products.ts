import { api } from './client'

export const fetchProducts = async () => {
  const { data } = await api.get('/api/product/list')
  if (!data.success) throw new Error(data.message)
  return data.products
}
