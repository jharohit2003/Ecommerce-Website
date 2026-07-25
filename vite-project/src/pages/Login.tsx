import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { authSchema, type AuthValues } from '../lib/schemas'
import { useAuthMutation } from '../hooks/useAuth'
import type { AuthMode } from '../api/auth'

const Login = () => {
  const [currentState, setCurrentState] = useState<AuthMode>('Login')
  const { token, setToken, navigate } = useContext(ShopContext)
  const { register, handleSubmit, formState: { errors } } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
  })
  const mutation = useAuthMutation()

  const onSubmit = (values: AuthValues) => {
    mutation.mutate(
      { mode: currentState, values },
      {
        onSuccess: (t) => {
          setToken(t)
          localStorage.setItem('token', t)
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : 'Something went wrong'),
      }
    )
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
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
