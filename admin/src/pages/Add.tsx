import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { addProductSchema, type AddProductValues } from '../lib/schemas'
import { useAddProduct } from '../hooks/useProductMutations'

const Add = () => {
  const [image1, setImage1] = useState<any>(false)
  const [image2, setImage2] = useState<any>(false)
  const [image3, setImage3] = useState<any>(false)
  const [image4, setImage4] = useState<any>(false)
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState<string[]>([])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddProductValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { category: 'Men', subCategory: 'Topwear' },
  })
  const mutation = useAddProduct()

  const onSubmit = (values: AddProductValues) => {
    if (!image1 && !image2 && !image3 && !image4) {
      toast.error('Please upload at least one image')
      return
    }
    if (sizes.length === 0) {
      toast.error('Please select at least one size')
      return
    }

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('category', values.category)
    formData.append('subCategory', values.subCategory)
    formData.append('bestSeller', String(bestSeller))
    formData.append('price', values.price)
    formData.append('sizes', JSON.stringify(sizes))
    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)

    mutation.mutate(formData, {
      onSuccess: (message) => {
        toast.success(message)
        reset()
        setImage1(false); setImage2(false); setImage3(false); setImage4(false)
        setSizes([]); setBestSeller(false)
      },
      onError: (err) => toast.error(err instanceof Error ? err.message : 'Failed to add product'),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 ' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => { setImage1(e.target.files![0]) }} type="file" id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 ' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => { setImage2(e.target.files![0]) }} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 ' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => { setImage3(e.target.files![0]) }} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 ' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => { setImage4(e.target.files![0]) }} type="file" id='image4' hidden />
          </label>
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input {...register('name')} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' />
          {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <input {...register('description')} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write content here ' />
          {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product category</p>
            <select {...register('category')} className='w-full px-3 py-2' >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Product category</p>
            <select {...register('subCategory')} className='w-full px-3 py-2' >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className='mb-2 '>Product Price</p>
            <input {...register('price')} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
          </div>
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
            <div key={s} onClick={() => setSizes((prev) => prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s])}>
              <p className={`${sizes.includes(s) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller((prev) => !prev)} checked={bestSeller} type="checkbox" id="bestSeller" />
        <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
      </div>
      <button disabled={mutation.isPending} type="submit" className='w-28 py-3 px-4 bg-black text-white disabled:opacity-60'>ADD</button>
    </form>
  )
}

export default Add
