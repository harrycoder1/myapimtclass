// import { json } from 'express';
import jwt from 'jsonwebtoken';
import * as  dotenv from 'dotenv'
const fetchuser =(req,res,next)=>{
const token= req.header('auth-token')
dotenv.config()
if(!token){
    res.status(405).json({success:false ,msg:"Please authenticate Using Valid Token!"}) ;
}

try {
  const data = jwt.verify(token , process.env.VITE_JSION_SECRET)
  if(!data){
    res.status(404).json({success:false , msg:"Your Authentication token is epried please  login again for generate new token "})
  }
req.user = data.user  //for send the data towords the next


next();
    
} catch (error) {
    res.status(500).json({success:false ,msg:"Internal Server Error" })
}

}


export default fetchuser