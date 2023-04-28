import mongoose, { SchemaType } from "mongoose";
const { Schema } = mongoose
const InstituteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    address: {
        type: [String],


    },
    social_links: {
        type_link : {type:String ,
        enum :  ['youtube', 'facebook', 'linkdin' ,'instagram' ,'whatapp','website'],
        },
        description:{type:String}


    },
    joining_date: {
        type: Date,
        default: Date.now
    },
    teachers_teams: {
        type: [Schema.Types.ObjectId],
        ref: 'teacher_teams'
    }
    ,
    courses: {
        type: [Schema.Types.ObjectId],
        ref: 'courses'
    }
    ,
    updated: {
        type:Date ,
        default:Date.now
    }



});
const Institution = mongoose.model('institute', InstituteSchema)

export default Institution ;
// name_institution :String ,
// password :String ,

// address_of_institution: [],
// map_of_instituaion :String ,
// social_links :[{type:”ex:youtubeChannel or install”} , ….]  ---in Form of Array of Objects
// date_joining  :Date.now   ---currentDate
// teachers _teams :[ “teacher._id”]  ---Array of the String -- teacherID come from teacher database

// courses:[ “courses._id”]  ---Array of the String  --coursesId comes from courses databses
// }
// {
//     "type": "array",
//     "items": {
//       "type": "number"
//     }
//   }