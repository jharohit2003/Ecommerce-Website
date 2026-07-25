import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const queryClient = useQueryClient()

  const { data: list = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(backendUrl + '/api/product/list')
      if (!data.success) throw new Error(data.message)
      return data.products
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (!data.success) throw new Error(data.message)
      return data.message as string
    },
    onSuccess: (message) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : 'Failed to remove'),
  })

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2 '>
        {/* -------List Table title------------ */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200  bg-gray-100 text-sm  '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* ---------Product List---------- */}
        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => removeMutation.mutate(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
