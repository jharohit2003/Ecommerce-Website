import axios from 'axios'

// Single axios instance; baseURL from Vite env. The request interceptor attaches
// the admin token (kept in localStorage by App) so callers don't thread it around.
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = token
  return config
})
