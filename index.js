import express from 'express';
import cors from 'cors'
import *as dotenv from 'dotenv'
import {connectDB} from './mongoDB/connect.js';
import { userRoute } from './routes/index.js';
const app = express();
dotenv.config();
connectDB()
app.use(cors());
app.use(express.json())


app.use('/api/v1/user', userRoute)
app.get('/',(req,res)=>{
    res.send("we are connected")
})
app.listen(8080,()=>{
    console.log("api are started Successfully !\n Port : http://localhost:8080")
})