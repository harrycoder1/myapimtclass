import express from 'express'
import mongoose from 'mongoose'

export  const connectDB =async()=>{
    try {
        mongoose.set('strictQuery',true) //for search functionality
        await mongoose.connect("mongodb+srv://harish14gdscjdcoem:VIrYrL0HRqVbLc6R@cluster0.vijea5l.mongodb.net/test")
        console.log("MongoDB connected Successfully")  
    } catch (error) {
        console.log(error)
    }

}