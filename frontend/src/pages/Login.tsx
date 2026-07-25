import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// ponytail: password-strength (min 8) and name-required for Sign Up are enforced
// server-side by the backend Zod schemas, which return clear messages we toast.
const schema = z.object({
  name: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const { data } = await axios.post(backendUrl + endpoint, values)
      if (!data.success) throw new Error(data.message)
      return data.token as string
    },
    onSuccess: (t) => {
      setToken(t)
      localStorage.setItem('token', t)
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : 'Something went wrong'),
  })

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <div className='w-full'>
          <input {...register('name')} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />
          {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
        </div>
      )}
      <div className='w-full'>
        <input {...register('email')} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
      </div>
      <div className='w-full'>
        <input {...register('password')} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
        {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
      </div>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forget your password?</p>
        {currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>}
      </div>
      <button disabled={mutation.isPending} className='bg-black text-white font-light px-8 py-2 mt-4 disabled:opacity-60'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login
