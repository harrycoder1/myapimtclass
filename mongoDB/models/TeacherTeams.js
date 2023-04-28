import mongoose, { Schema } from "mongoose";

const TeachersSchema = new Schema({
institude_id: {type:Schema.Types.ObjectId ,
ref:'institute'} ,

teacher_name :{type:String} ,
age:{type: Number, min: 18, max: 70 ,required:true },
contact_number:{type:String ,minLength:10 , maxLength:10 ,required:true},
email :{type:String ,required:true  },
achivements:{
    type :[String]
}


});

const TeachersTeams = mongoose.model('teacher_teams' , TeachersSchema)





















// Institude_id:”fds”
// Teacher_name:string
// Teacher_id : adher card no. of teacher
// age:”’
// contact_number :”sdffsfsd
// Email_id:”Sdfsdfsd”
// achivements:arrary = [“bca”, “ca” ,”dbms”] ;
