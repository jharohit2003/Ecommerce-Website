import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'



// App Config
const app = express()
const port = process.env.PORT || 4000 

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/',(req,res)=>{
res.send("API Working");
})

const start = async () => {
  try {
    await connectDB()
    await connectCloudinary()
    app.listen(port, () => console.log(`server started on PORT: ` + port))
  } catch (err) {
    console.error("Startup failed:", err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

start()