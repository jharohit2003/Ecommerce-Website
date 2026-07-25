import express from 'express'
import cors from 'cors'
import { pinoHttp } from 'pino-http'
import swaggerUi from 'swagger-ui-express'
import { logger } from './utils/logger.js'
import { swaggerSpec } from './config/swagger.js'
import userRouter from './modules/user/user.routes.js'
import productRouter from './modules/product/product.routes.js'
import { notFound, errorHandler } from './middleware/error.js'

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(pinoHttp({ logger }))

// health check
app.get('/', (req, res) => {
  res.send('API Working')
})

// api docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

// 404 + global error handler (must be last)
app.use(notFound)
app.use(errorHandler)

export default app
