import { api } from './client'

export const fetchProducts = async () => {
  const { data } = await api.get('/api/product/list')
  if (!data.success) throw new Error(data.message)
  return data.products
}

export const addProductRequest = async (formData: FormData) => {
  const { data } = await api.post('/api/product/add', formData)
  if (!data.success) throw new Error(data.message)
  return data.message as string
}

export const removeProductRequest = async (id: string) => {
  const { data } = await api.post('/api/product/remove', { id })
  if (!data.success) throw new Error(data.message)
  return data.message as string
}
