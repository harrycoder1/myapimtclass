import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
export  const connectDB =async()=>{
    try {
        mongoose.set('strictQuery',true) //for search functionality
        await mongoose.connect(process.env.VITE_CONNECT_URL)
        console.log("MongoDB connected Successfully")  
    } catch (error) {
        console.log(error)
    }

}