import mongoose from "mongoose";
const {Schema} = mongoose ;

const User = new Schema({
    name:{
        type:String , 
        required:true,
    }, 
    email:{
        type:String ,
        required:true,
        unique:true
    },
    
    password:{
        type:String ,
        required :true
    },
    date:{
        type:Date ,
        default: Date.now
    }
})
const UserSchema = mongoose.model('User', User) ;

export default UserSchema ;