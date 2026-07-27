import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { adminLoginSchema, type AdminLoginValues } from '../lib/schemas'
import { useAdminLogin } from '../hooks/useAdminLogin'

const Login = ({ setToken }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
  })
  const mutation = useAdminLogin()

  const onSubmit = (values: AdminLoginValues) => {
    mutation.mutate(values, {
      onSuccess: (token) => setToken(token),
      onError: (err) => toast.error(err instanceof Error ? err.message : 'Login failed'),
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full ">
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3 min-w-72' >
            <p className='text-sm font-medium text-gray-700 mb-2' >Email Address</p>
            <input {...register('email')} className='rounded w-full px-3 py-2 border border-gray-300 online-none' type="email" placeholder='your@email.com' />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input {...register('password')} className='rounded w-full px-3 py-2 border border-gray-300 online-none' type="password" placeholder='enter your password' />
            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
          </div>
          <button disabled={mutation.isPending} className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black disabled:opacity-60' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
