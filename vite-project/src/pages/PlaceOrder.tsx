import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { placeOrderSchema, type PlaceOrderValues } from '../lib/schemas'

const fieldError = 'text-red-500 text-xs'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate } = useContext(ShopContext);
  const { register, handleSubmit, formState: { errors } } = useForm<PlaceOrderValues>({
    resolver: zodResolver(placeOrderSchema),
  })

  // ponytail: no order endpoint exists yet; on a valid form we just navigate as before.
  // Wire a useMutation POST here once the backend exposes /api/order.
  const onSubmit = (_values: PlaceOrderValues) => {
    navigate('/orders')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* ----------Left Side--------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3 ">
          <div className='w-full'>
            <input {...register('firstName')} type="text" placeholder='First Name' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
            {errors.firstName && <p className={fieldError}>{errors.firstName.message}</p>}
          </div>
          <div className='w-full'>
            <input {...register('lastName')} type="text" placeholder='Last Name' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
            {errors.lastName && <p className={fieldError}>{errors.lastName.message}</p>}
          </div>
        </div>
        <input {...register('email')} type="email" placeholder='Email Address' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
        {errors.email && <p className={fieldError}>{errors.email.message}</p>}
        <input {...register('street')} type="text" placeholder='Street' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
        {errors.street && <p className={fieldError}>{errors.street.message}</p>}
        <div className="flex gap-3 ">
          <div className='w-full'>
            <input {...register('zipcode')} type="text" placeholder='Zipcode' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
            {errors.zipcode && <p className={fieldError}>{errors.zipcode.message}</p>}
          </div>
          <div className='w-full'>
            <input {...register('country')} type="text" placeholder='Country' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
            {errors.country && <p className={fieldError}>{errors.country.message}</p>}
          </div>
        </div>
        <input {...register('phone')} type="text" placeholder='Phone' className='border-gray-300 border rounded py-1.5 px-3.5 w-full' />
        {errors.phone && <p className={fieldError}>{errors.phone.message}</p>}
      </div>
      {/* -----------Right Side--------------- */}
      <div className=" mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={'METHOD'} />
          {/* ------------------Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className='bg-black text-white text-sm px-16 py-3'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
