import express from 'express';
import cors from 'cors'
import *as dotenv from 'dotenv'
import {connectDB} from './mongoDB/connect.js';
import { userRoute ,institutionRoute ,teachersRoutes ,formquizeRoutes ,quizeAnswerRoutes} from './routes/index.js';
const app = express();
dotenv.config();
connectDB()
app.use(cors());
app.use(express.json())


app.use('/api/v1/user', userRoute);
app.use('/api/v1/institution' , institutionRoute);
app.use('/api/v1/institution/teachers' ,teachersRoutes );
app.use('/api/v1/institution/form',formquizeRoutes);
app.use('/api/v2/formreacords' ,quizeAnswerRoutes)

app.get('/',(req,res)=>{
    res.send("Hi There !\n This is Harish Hedau")
})
app.listen(8080,()=>{
    console.log("api are started Successfully !\n Port : http://localhost:8080")
})