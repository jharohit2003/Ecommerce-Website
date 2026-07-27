import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from '../utils/logger.js'

const connectDB = async () => {
  mongoose.connection.on('connected', () => logger.info('DB connected'))
  await mongoose.connect(`${env.MONGODB_URI}/e-commerce`)
}

export default connectDB
