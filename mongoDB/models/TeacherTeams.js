import mongoose, { Schema } from "mongoose";

const TeachersSchema = new Schema({
    institude_id: {
        type: Schema.Types.ObjectId,
        ref: 'institute'
    },

    teacher_name: { type: String },
    age: { type: Date,  required: true },
    contact_number: { type: Number, minLength: 10, maxLength: 10, required: true },
    email: { type: String, required: true },
    achivements: {
        type: [String]
    }


});

const TeachersTeams = mongoose.model('teacher_teams', TeachersSchema)

export default TeachersTeams



















