import mongoose from "mongoose";

const { Schema } = mongoose;

const FormAnswersSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
    formId :{type:Schema.Types.ObjectId , ref:'quizeForm'},
    solved: [
        {
            question_id: { type: Schema.Types.ObjectId, ref: 'quizeForm.questions' },
            choose_id: { type: Schema.Types.ObjectId, ref: 'quizeForm.questions.answers' },
           
        },
        
    ],
    score :{
        type:Number
    },


})
const FormAnswers = mongoose.model('formAnswers', FormAnswersSchema);
export default FormAnswers;
