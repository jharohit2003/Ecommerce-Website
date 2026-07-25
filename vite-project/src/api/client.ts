import axios from 'axios'

// Single axios instance; baseURL comes from the Vite env.
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})
