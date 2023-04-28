import mongoose,{Schema} from "mongoose";

const CoursesSchema = new Schema({
    institude_id: {type:Schema.Types.ObjectId ,
        ref:'institute'} ,
    
    title:{type:String},
    description :{type:String}  ,
    startDate:{type:Date},
    endDate:{type:Date},
teachers :{
   id: {type:[Schema.Types.ObjectId]},
   subject:{type:String}
}

});
const Courses = mongoose.model('courses',CoursesSchema);

export default Courses ;

// Institude_id:”fds”
// courseTitle:string
// CourseId:unique
// descrition :text

// Startdate:   	endDate:


// Teachers :arrary = [
// {teacher_Id:”my_id 1“ ,subject:”physic” },  
// {teacher_Id:”my_id4 “ ,subject:”physic” },  
// {teacher_Id:”my_id 3“ ,subject:”physic” }, {teacher_Id:”my_idn “ ,subject:”physic” },  
//    ] ;
