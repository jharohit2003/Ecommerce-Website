import axios from 'axios';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormValues = z.infer<typeof schema>

const Login = ({ setToken }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data } = await axios.post(backendUrl + '/api/user/admin', values)
      if (!data.success) throw new Error(data.message)
      return data.token as string
    },
    onSuccess: (token) => setToken(token),
    onError: (err) => toast.error(err instanceof Error ? err.message : 'Login failed'),
  })

  return (
    <div className="min-h-screen flex items-center justify-center w-full ">
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={handleSubmit((v) => mutation.mutate(v))}>
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
