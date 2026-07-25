import mongoose from "mongoose";

const connectDB = async () => {
   const uri = process.env.MONGODB_URI
   if (!uri) {
      throw new Error("MONGODB_URI is not set — copy .env.example to .env and fill it in")
   }
   mongoose.connection.on('connected', () => {
      console.log("DB connected")
   })
   await mongoose.connect(`${uri}/e-commerce`)
}

export default connectDB;
