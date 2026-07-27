import { v2 as cloudinary } from 'cloudinary'
import { env } from './env.js'

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_SECRET_KEY,
  })
}

export default connectCloudinary
