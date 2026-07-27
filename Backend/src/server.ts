import app from './app.js'
import { env } from './config/env.js'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import { logger } from './utils/logger.js'

const start = async () => {
  try {
    await connectDB()
    await connectCloudinary()
    app.listen(env.PORT, () => logger.info(`server started on PORT: ${env.PORT}`))
  } catch (err) {
    logger.error(err, 'Startup failed')
    process.exit(1)
  }
}

start()
