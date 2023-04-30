import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const fetchInstitutor=(req,res,next)=>{
const token = req.header('inst-token')
if(!token){
    // when token has not been send to the url then execute
    return res.status(408).json({success:false , msg:"Please Authenticate wiht Valid Token !"});
}
try {
    

const iuser=  jwt.verify(token , process.env.VITE_JSION_SECRET);
req.institutor = iuser.institutor //for send towords the next 
next() ;
} catch (error) {
    res.status(504).json({success:false , msg:"Internal Server Error Occured"})
}

}
export default fetchInstitutor